import { NextRequest, NextResponse } from "next/server";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const DISPATCH_API_BASE = "https://kanai-dispatch.vercel.app";

function ghlHeaders() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
  };
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

async function addNoteToContact(contactId: string, note: string) {
  await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes/`, {
    method: "POST",
    headers: ghlHeaders(),
    body: JSON.stringify({ body: note }),
  });
}

async function sendSmsViaGhl(contactId: string, message: string) {
  await fetch(`${GHL_API_BASE}/conversations/messages`, {
    method: "POST",
    headers: ghlHeaders(),
    body: JSON.stringify({ type: "SMS", contactId, message }),
  });
}

async function handleDispatchAction(
  action: string,
  body: Record<string, unknown>
): Promise<NextResponse> {
  const { jobId } = body;

  try {
    if (action === "request-pickup") {
      const res = await fetch(`${DISPATCH_API_BASE}/api/portal/request-pickup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_id: jobId }),
      });
      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json({ error: data.error || "Pickup request failed" }, { status: res.status });
      }
      return NextResponse.json({ success: true, action: "request-pickup" });
    }

    if (action === "extend") {
      const days = Number(body.days) || 7;
      const res = await fetch(`${DISPATCH_API_BASE}/api/portal/extend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_id: jobId, days }),
      });
      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json({ error: data.error || "Extension failed" }, { status: res.status });
      }
      return NextResponse.json({
        success: true,
        action: "extend",
        new_end_date: data.new_end_date,
        extension_charge: data.extension_charge,
      });
    }

    // For reschedule/cancel of dispatch tasks, create a GHL note as fallback
    // (dispatch system doesn't have these endpoints yet)
    // Fall through to GHL note flow below
    return NextResponse.json({ error: "Action not supported for dumpster rentals" }, { status: 400 });
  } catch (err) {
    console.error("[Portal] Dispatch action error:", err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, jobId, action, newDate, newTime } = body;

    if (!phone || !jobId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!["reschedule", "cancel", "request-pickup", "extend"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Dispatch dumpster actions — route to dispatch API
    if (body.source === "dispatch" && ["request-pickup", "extend", "reschedule", "cancel"].includes(action)) {
      return handleDispatchAction(action, body);
    }

    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const digits = phone.replace(/\D/g, "");
    const contact = await findGhlContact(digits);

    if (!contact?.id) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    const customerName = `${contact.firstName || ""} ${contact.lastName || ""}`.trim() || "Customer";

    if (action === "reschedule") {
      const note = `PORTAL RESCHEDULE REQUEST\nJob #${jobId}\nCustomer: ${customerName}\nNew Date: ${newDate || "Not specified"}\nNew Time: ${newTime || "Not specified"}\n\nACTION: Update job in Workiz and confirm with customer.`;
      await addNoteToContact(contact.id, note);

      // Notify office via SMS to manager
      const managerPhone = process.env.MANAGER_PHONE_NUMBER;
      if (managerPhone) {
        const managerContact = await findGhlContact(managerPhone);
        if (managerContact?.id) {
          await sendSmsViaGhl(
            managerContact.id,
            `Portal reschedule: ${customerName} wants to move Job #${jobId} to ${newDate || "TBD"}. Please update in Workiz.`
          );
        }
      }

      // Confirm to customer
      await sendSmsViaGhl(
        contact.id,
        `We received your reschedule request for Job #${jobId}. A team member will confirm your new date shortly.`
      );

      return NextResponse.json({ success: true, action: "reschedule" });
    }

    if (action === "cancel") {
      const note = `PORTAL CANCELLATION REQUEST\nJob #${jobId}\nCustomer: ${customerName}\n\nACTION: Cancel job in Workiz and confirm with customer.`;
      await addNoteToContact(contact.id, note);

      const managerPhone = process.env.MANAGER_PHONE_NUMBER;
      if (managerPhone) {
        const managerContact = await findGhlContact(managerPhone);
        if (managerContact?.id) {
          await sendSmsViaGhl(
            managerContact.id,
            `Portal cancellation: ${customerName} wants to cancel Job #${jobId}. Please update in Workiz.`
          );
        }
      }

      await sendSmsViaGhl(
        contact.id,
        `We received your cancellation request for Job #${jobId}. A team member will confirm shortly. Call (808) 201-2668 if you have questions.`
      );

      return NextResponse.json({ success: true, action: "cancel" });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
