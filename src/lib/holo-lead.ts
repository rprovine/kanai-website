/**
 * Website lead → Holo (kanai-dispatch) lead intake.
 *
 * Holo's `/api/webhooks/web-form` files the lead (deduped by phone), rings the
 * on-duty CSRs, and has Kai text the customer if nobody could be rung. Its
 * parser (kanai-dispatch src/lib/web-form-lead.ts) matches fields loosely by
 * name, so we send human-readable keys it recognizes:
 *
 *   Name / Phone / Email   → contact
 *   Service                → the explicit service answer ("Junk Removal",
 *                            "Dumpster Rental", "Estate Cleanout"…) — the only
 *                            field Holo trusts to set service_type outright
 *   Message                → free text shown on the lead card
 *   Address                → job address
 *   Form Name / Page URL   → which form it came from
 *   source: "website"      → dispatch_leads.source = "web"
 *
 * Every other key we send (Items, Preferred Date, …) still lands on the lead
 * card as a form answer. Keys matching Holo's noise filter (token, action,
 * submit, …) are dropped there, so don't use them.
 *
 * The token is server-only (HOLO_WEB_FORM_TOKEN, equal to Holo's
 * WEB_FORM_WEBHOOK_TOKEN). Never import this from a client component.
 */

const HOLO_LEAD_URL = "https://kanai-dispatch.vercel.app/api/webhooks/web-form";

export type HoloLeadFields = Record<string, string | number | null | undefined>;

export type HoloLeadResult =
  | { ok: true; leadId: string | null }
  | { ok: false; reason: "not_configured" | "no_contact" | "failed" };

function clean(fields: HoloLeadFields): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v == null) continue;
    const s = String(v).trim();
    if (s) out[k] = s;
  }
  return out;
}

export async function sendLeadToHolo(fields: HoloLeadFields): Promise<HoloLeadResult> {
  const payload = clean({ source: "website", ...fields });

  const token = (process.env.HOLO_WEB_FORM_TOKEN || "").trim();
  if (!token) {
    // Loud on purpose: the lead is NOT in Holo. The payload is logged so it
    // can be recovered from the Vercel logs.
    console.error("[HOLO_LEAD] HOLO_WEB_FORM_TOKEN is not set — lead NOT delivered to Holo:", payload);
    return { ok: false, reason: "not_configured" };
  }

  try {
    const res = await fetch(`${HOLO_LEAD_URL}?token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20_000),
    });

    const text = await res.text();
    let data: { ok?: boolean; lead_id?: string; error?: string; skipped?: string } = {};
    try {
      data = JSON.parse(text);
    } catch {
      /* non-JSON body — handled by the checks below */
    }

    // Holo answers 200 with `skipped` / `error` when it didn't file the lead
    // (no usable phone/email, or a database failure) — those are failures too.
    if (!res.ok || !data.ok || data.error || data.skipped) {
      console.error("[HOLO_LEAD] Holo did not file the lead:", res.status, text.slice(0, 300), payload);
      return { ok: false, reason: data.skipped === "no_contact" ? "no_contact" : "failed" };
    }

    return { ok: true, leadId: data.lead_id || null };
  } catch (err) {
    console.error("[HOLO_LEAD] Request to Holo failed:", err, payload);
    return { ok: false, reason: "failed" };
  }
}
