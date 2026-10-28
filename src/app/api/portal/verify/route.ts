import { NextRequest, NextResponse } from "next/server";

// In-memory code store (resets on cold start — fine for short-lived verification codes)
const codes: Map<string, { code: string; expiresAt: number }> = new Map();

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
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

      // The code used to be texted through GoHighLevel, which is being shut
      // down, and this site has no other SMS sender. Fail closed: handing the
      // code back in the response would let anyone sign in as any phone.
      if (process.env.NODE_ENV === "production") {
        console.error("[Portal] Verification SMS unavailable — no SMS sender configured");
        return NextResponse.json({
          success: false,
          error: "We can't text sign-in codes right now. Please call (808) 201-2668 for help with your job.",
        }, { status: 503 });
      }

      // Local dev only: show the code instead of texting it.
      const verifyCode = String(Math.floor(100000 + Math.random() * 900000));
      codes.set(normalized, { code: verifyCode, expiresAt: Date.now() + 10 * 60 * 1000 });
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
