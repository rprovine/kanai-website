import { NextRequest, NextResponse } from "next/server";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

function ghlHeaders() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
  };
}

// In-memory code store (resets on cold start — fine for short-lived verification codes)
const codes: Map<string, { code: string; expiresAt: number }> = new Map();

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

async function findGhlContact(phone: string) {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId) return null;

  const params = new URLSearchParams({ locationId, query: phone });
  const res = await fetch(`${GHL_API_BASE}/contacts/search?${params}`, {
    headers: ghlHeaders(),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.contacts?.[0] || null;
}

async function sendSmsViaGhl(contactId: string, message: string) {
  const res = await fetch(`${GHL_API_BASE}/conversations/messages`, {
    method: "POST",
    headers: ghlHeaders(),
    body: JSON.stringify({ type: "SMS", contactId, message }),
  });
  return res.ok;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, code, action } = body;

    if (!phone) {
      return NextResponse.json({ error: "Phone required" }, { status: 400 });
    }

    const normalized = normalizePhone(phone);

    // Step 1: Send verification code
    if (action === "send" || !code) {
      // First verify this phone has jobs in Workiz
      const workizToken = process.env.WORKIZ_API_TOKEN;
      if (workizToken) {
        const phone10 = normalized.length === 10 ? normalized : normalized.slice(-10);
        const wRes = await fetch(
          `https://api.workiz.com/api/v1/${workizToken}/job/all/?phone=${phone10}&records=1`,
          { headers: { "User-Agent": "KanaiPortal/1.0", Accept: "application/json" } }
        );
        if (wRes.ok) {
          const wData = await wRes.json();
          const jobs = wData.data || [];
          if (jobs.length === 0) {
            return NextResponse.json({
              success: false,
              error: "We couldn't find any jobs with that phone number. Please use the phone number from your booking.",
            }, { status: 404 });
          }
        }
      }

      const verifyCode = String(Math.floor(100000 + Math.random() * 900000));
      codes.set(normalized, { code: verifyCode, expiresAt: Date.now() + 10 * 60 * 1000 });

      if (process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID) {
        // Try to find existing GHL contact
        let contact = await findGhlContact(normalized);

        // If not in GHL, create a contact so we can send SMS
        if (!contact?.id) {
          const locationId = process.env.GHL_LOCATION_ID;
          const createRes = await fetch(`${GHL_API_BASE}/contacts/`, {
            method: "POST",
            headers: ghlHeaders(),
            body: JSON.stringify({
              locationId,
              phone: normalized,
              tags: ["Portal User"],
            }),
          });
          if (createRes.ok) {
            const createData = await createRes.json();
            contact = createData.contact;
          }
        }

        if (contact?.id) {
          await sendSmsViaGhl(
            contact.id,
            `Your Kana'i's verification code is: ${verifyCode}\n\nThis code expires in 10 minutes.`
          );
          return NextResponse.json({ success: true, sent: true });
        }
      }

      // GHL not configured or SMS failed — dev mode
      return NextResponse.json({ success: true, sent: false, devCode: verifyCode });
    }

    // Step 2: Verify code
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: "Invalid code format." }, { status: 400 });
    }

    const stored = codes.get(normalized);
    if (!stored) {
      return NextResponse.json({ error: "No code requested. Please try again." }, { status: 400 });
    }

    if (Date.now() > stored.expiresAt) {
      codes.delete(normalized);
      return NextResponse.json({ error: "Code expired. Please request a new one." }, { status: 400 });
    }

    if (stored.code !== code) {
      return NextResponse.json({ error: "Invalid code. Please try again." }, { status: 400 });
    }

    codes.delete(normalized);

    return NextResponse.json({
      success: true,
      verified: true,
      sessionId: crypto.randomUUID(),
      phone: normalized,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
