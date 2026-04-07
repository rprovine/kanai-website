import { NextRequest, NextResponse } from "next/server";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

async function createGhlContact(data: {
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  tags?: string[];
}) {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) return null;

  const nameParts = (data.name || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const res = await fetch(`${GHL_API_BASE}/contacts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationId,
      firstName,
      lastName,
      phone: data.phone || undefined,
      email: data.email || undefined,
      source: data.source || "Website",
      tags: data.tags || [],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[GHL] Contact creation failed:", res.status, err);
    return null;
  }

  const result = await res.json();
  return result.contact?.id || null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, items, volume, ntePrice, source } = body;

    if (!phone && !email) {
      return NextResponse.json(
        { error: "At least phone or email is required" },
        { status: 400 }
      );
    }

    const leadId = crypto.randomUUID();

    // Determine tags based on source
    const tags: string[] = ["Website Lead"];
    if (source === "quick-quote") tags.push("Quick Quote");
    else if (source === "contact-form") tags.push("Contact Form");
    else if (source === "ai-estimator") tags.push("AI Estimator");

    // Create contact in GHL
    const ghlContactId = await createGhlContact({
      name,
      phone,
      email,
      source: source === "quick-quote" ? "Quick Quote - Website" : "Website",
      tags,
    });

    console.log("[GHL_LEAD]", {
      leadId,
      ghlContactId,
      name: name || null,
      phone: phone || null,
      email: email || null,
      source: source || "website",
      volume: volume || null,
      ntePrice: ntePrice || null,
      items: items ? `${items.length} items` : null,
    });

    return NextResponse.json({ success: true, leadId, ghlContactId });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
