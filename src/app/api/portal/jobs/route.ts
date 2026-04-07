import { NextRequest, NextResponse } from "next/server";

const WORKIZ_API_BASE = "https://api.workiz.com/api/v1";

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("phone");
  if (!phone) {
    return NextResponse.json({ error: "Phone required" }, { status: 400 });
  }

  const token = process.env.WORKIZ_API_TOKEN;
  if (!token) {
    return NextResponse.json({ jobs: [], error: "Workiz not configured" });
  }

  const digits = phone.replace(/\D/g, "");
  const phone10 = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  try {
    const res = await fetch(
      `${WORKIZ_API_BASE}/${token}/job/all/?phone=${phone10}&records=50`,
      {
        headers: { "User-Agent": "KanaiPortal/1.0", Accept: "application/json" },
      }
    );

    if (!res.ok) {
      console.error("[Portal] Workiz fetch error:", res.status);
      return NextResponse.json({ jobs: [] });
    }

    const data = await res.json();
    const rawJobs = data.data || [];

    const jobs = rawJobs.map((job: Record<string, unknown>) => {
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
      };
    });

    // Sort: active jobs first (scheduled, en-route), then completed/invoiced, then cancelled
    const statusOrder: Record<string, number> = { "en-route": 0, scheduled: 1, completed: 2, invoiced: 3, cancelled: 4 };
    jobs.sort((a: { status: string; date: string }, b: { status: string; date: string }) => {
      const orderDiff = (statusOrder[a.status] ?? 5) - (statusOrder[b.status] ?? 5);
      if (orderDiff !== 0) return orderDiff;
      return (b.date || "").localeCompare(a.date || "");
    });

    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("[Portal] Workiz error:", err);
    return NextResponse.json({ jobs: [] });
  }
}
