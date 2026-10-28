import { NextRequest, NextResponse } from "next/server";
import { sendLeadToHolo } from "@/lib/holo-lead";

const FORM_NAMES: Record<string, string> = {
  "quick-quote": "Website Quick Quote",
  "contact-form": "Website Contact Form",
  "ai-estimator": "Website AI Estimator",
};

// Contact-form <select> values → the label the customer actually picked.
const SERVICE_LABELS: Record<string, string> = {
  "junk-removal": "Junk Removal",
  "dumpster-rental": "Dumpster Rental",
  "estate-cleanout": "Estate Cleanout",
  commercial: "Commercial",
  other: "Other",
};

type LeadItem = { name?: string; qty?: number };

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const phone = str(body.phone);
  const email = str(body.email);
  const message = str(body.message);
  const source = str(body.source);
  const volume = Number(body.volume) || null;
  const ntePrice = Number(body.ntePrice) || null;
  const priceTier = str(body.priceTier);

  if (!phone && !email) {
    return NextResponse.json(
      { error: "At least phone or email is required" },
      { status: 400 }
    );
  }

  const items = Array.isArray(body.items)
    ? (body.items as LeadItem[])
        .filter((i) => i && typeof i.name === "string")
        .map((i) => `${i.name} x${Number(i.qty) || 1}`)
        .join(", ")
    : "";

  // The quick quote and AI estimator are junk-removal tools; the contact form
  // asks which service.
  const rawService = str(body.service);
  const service =
    SERVICE_LABELS[rawService] ||
    rawService ||
    (source === "quick-quote" || source === "ai-estimator" ? "Junk Removal" : "");

  const priceText = ntePrice
    ? `estimated starting price $${ntePrice}${priceTier ? ` (${priceTier})` : ""}`
    : "";
  const quoteSummary =
    source === "quick-quote" && items
      ? `Quick Quote: ${items}${volume ? ` — about ${volume} cu ft` : ""}${priceText ? `, ${priceText}` : ""}`
      : "";

  const result = await sendLeadToHolo({
    "Form Name": FORM_NAMES[source] || "Website",
    Name: name,
    Phone: phone,
    Email: email,
    Service: service,
    Message: [quoteSummary, message].filter(Boolean).join("\n"),
    Items: items,
    "Estimated Volume": volume ? `${volume} cu ft` : null,
    "Estimated Starting Price": ntePrice ? `$${ntePrice}${priceTier ? ` (${priceTier})` : ""}` : null,
    "Page URL": request.headers.get("referer"),
  });

  if (!result.ok) {
    if (result.reason === "no_contact") {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number or email address." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "We couldn't send your request. Please call (808) 201-2668." },
      { status: result.reason === "not_configured" ? 503 : 502 }
    );
  }

  return NextResponse.json({ success: true, leadId: result.leadId });
}
