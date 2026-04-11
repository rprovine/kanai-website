import { NextRequest, NextResponse } from "next/server";

const WORKIZ_API_BASE = "https://api.workiz.com/api/v1";
const DISPATCH_API_BASE = "https://kanai-dispatch.vercel.app";

interface PortalJob {
  id: string;
  type: string;
  date: string | null;
  time: string | null;
  status: string;
  rawStatus: string;
  address: string;
  amount: number | null;
  customerName: string;
  source: "workiz" | "dispatch";
  // Dispatch dumpster fields
  size?: string | null;
  rentalEndDate?: string | null;
  materialType?: string | null;
}

/** Fetch junk removal jobs from Workiz */
async function fetchWorkizJobs(phone10: string): Promise<PortalJob[]> {
  const token = process.env.WORKIZ_API_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `${WORKIZ_API_BASE}/${token}/job/all/?phone=${phone10}&records=50`,
      {
        headers: { "User-Agent": "KanaiPortal/1.0", Accept: "application/json" },
      }
    );

    if (!res.ok) {
      console.error("[Portal] Workiz fetch error:", res.status);
      return [];
    }

    const data = await res.json();
    const rawJobs = data.data || [];

    return rawJobs.map((job: Record<string, unknown>) => {
      const status = String(job.Status || "").toLowerCase();
      let portalStatus = "scheduled";
      if (status.includes("completed") || status.includes("done")) portalStatus = "completed";
      else if (status.includes("cancel")) portalStatus = "cancelled";
      else if (status.includes("en route") || status.includes("on the way")) portalStatus = "en-route";
      else if (status.includes("invoice") || status.includes("paid")) portalStatus = "invoiced";

      const jobType = String(job.JobType || "");
      const isDumpster = jobType.toLowerCase().includes("dumpster") || jobType.toLowerCase().includes("rental");

      return {
        id: String(job.SerialId || job.UUID || ""),
        type: isDumpster ? "Dumpster Rental" : "Junk Removal",
        date: String(job.JobDateTime || "").split(" ")[0] || null,
        time: String(job.JobDateTime || "").split(" ").slice(1).join(" ") || null,
        status: portalStatus,
        rawStatus: String(job.Status || ""),
        address: String(job.JobAddress || ""),
        amount: parseFloat(String(job.SubTotal || job.JobTotalPrice || 0)) || null,
        customerName: `${job.FirstName || ""} ${job.LastName || ""}`.trim(),
        source: "workiz" as const,
      };
    });
  } catch (err) {
    console.error("[Portal] Workiz error:", err);
    return [];
  }
}

/** Map dispatch task status to portal status */
function mapDispatchStatus(status: string): string {
  const map: Record<string, string> = {
    scheduled: "scheduled",
    assigned: "scheduled",
    en_route: "en-route",
    completed: "completed",
    cancelled: "cancelled",
  };
  return map[status] || "scheduled";
}

/** Fetch dumpster rental tasks from the dispatch system */
async function fetchDispatchTasks(phone10: string): Promise<{
  jobs: PortalJob[];
  outstandingPayments: Array<{ id: string; amount: number; type: string; status: string; description: string; stripe_payment_url?: string }>;
}> {
  try {
    const res = await fetch(
      `${DISPATCH_API_BASE}/api/portal/lookup?phone=${phone10}`,
      { headers: { Accept: "application/json" } }
    );

    if (!res.ok) {
      // 404 means no customer found — not an error
      if (res.status !== 404) {
        console.error("[Portal] Dispatch fetch error:", res.status);
      }
      return { jobs: [], outstandingPayments: [] };
    }

    const data = await res.json();
    const allTasks = [...(data.active_rentals || []), ...(data.completed_tasks || [])];

    // Deduplicate by task id (a completed task could appear in both lists)
    const seen = new Set<string>();
    const uniqueTasks = allTasks.filter((t: Record<string, unknown>) => {
      const id = String(t.id);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    const jobs: PortalJob[] = uniqueTasks.map((task: Record<string, unknown>) => ({
      id: String(task.id || ""),
      type: "Dumpster Rental",
      date: String(task.scheduled_date || "") || null,
      time: null,
      status: mapDispatchStatus(String(task.status || "")),
      rawStatus: String(task.status || ""),
      address: String(task.job_address || ""),
      amount: task.total_price != null ? Number(task.total_price) : null,
      customerName: String(task.customer_name || ""),
      source: "dispatch" as const,
      size: task.asset_size ? String(task.asset_size) : null,
      rentalEndDate: task.rental_end_date ? String(task.rental_end_date) : null,
      materialType: task.material_type ? String(task.material_type) : null,
    }));

    return {
      jobs,
      outstandingPayments: data.outstanding_payments || [],
    };
  } catch (err) {
    console.error("[Portal] Dispatch error:", err);
    return { jobs: [], outstandingPayments: [] };
  }
}

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("phone");
  if (!phone) {
    return NextResponse.json({ error: "Phone required" }, { status: 400 });
  }

  const digits = phone.replace(/\D/g, "");
  const phone10 = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  // Fetch from both sources in parallel
  const [workizJobs, dispatchResult] = await Promise.all([
    fetchWorkizJobs(phone10),
    fetchDispatchTasks(phone10),
  ]);

  const allJobs: PortalJob[] = [...workizJobs, ...dispatchResult.jobs];

  // Sort: active jobs first (scheduled, en-route), then completed/invoiced, then cancelled
  const statusOrder: Record<string, number> = { "en-route": 0, scheduled: 1, completed: 2, invoiced: 3, cancelled: 4 };
  allJobs.sort((a, b) => {
    const orderDiff = (statusOrder[a.status] ?? 5) - (statusOrder[b.status] ?? 5);
    if (orderDiff !== 0) return orderDiff;
    return (b.date || "").localeCompare(a.date || "");
  });

  return NextResponse.json({
    jobs: allJobs,
    outstandingPayments: dispatchResult.outstandingPayments,
  });
}
