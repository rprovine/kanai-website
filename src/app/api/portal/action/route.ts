import { NextRequest, NextResponse } from "next/server";

const DISPATCH_API_BASE = "https://kanai-dispatch.vercel.app";

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

    // Reschedule/cancel of dispatch tasks isn't wired up here
    return NextResponse.json({ error: "Action not supported for dumpster rentals" }, { status: 400 });
  } catch (err) {
    console.error("[Portal] Dispatch action error:", err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, jobId, action } = body;

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

    // Workiz (junk removal) reschedule/cancel used to be a GoHighLevel note +
    // SMS to the office. GHL is being shut down, so ask the customer to call
    // rather than accept a request nobody would see.
    return NextResponse.json({
      error: `Please call (808) 201-2668 to ${action === "cancel" ? "cancel" : "reschedule"} Job #${jobId}.`,
    }, { status: 503 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
