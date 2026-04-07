import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cache stats for 1 hour
let cache: { data: Stats; expiresAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

interface Stats {
  jobsCompleted: number;
  tonsDiverted: number;
  googleRating: number;
}

export async function GET() {
  if (cache && Date.now() < cache.expiresAt) {
    return NextResponse.json(cache.data);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ jobsCompleted: 0, tonsDiverted: 0, googleRating: 4.9 });
  }

  const sb = createClient(supabaseUrl, supabaseKey);

  try {
    // Count 2026 JR jobs from EOD reports (residential + commercial)
    const { data: eodReports } = await sb
      .from("eod_reports")
      .select("residential_jobs, commercial_jobs")
      .gte("report_date", "2026-01-01");

    let totalJobs = 0;
    for (const r of eodReports || []) {
      totalJobs += (parseInt(r.residential_jobs) || 0) + (parseInt(r.commercial_jobs) || 0);
    }

    // Count 2026 DR reports as additional jobs
    const { count: drCount } = await sb
      .from("dumpster_reports")
      .select("id", { count: "exact" })
      .gte("report_date", "2026-01-01");

    totalJobs += drCount || 0;

    // Get 2026 tons from JR trucks
    const { data: jrReports2026 } = await sb
      .from("eod_reports")
      .select("id")
      .gte("report_date", "2026-01-01");

    const jrIds = new Set((jrReports2026 || []).map((r) => r.id));

    const { data: jrTrucks } = await sb
      .from("eod_trucks")
      .select("tons_dumped, report_id");

    let totalTons = 0;
    for (const t of jrTrucks || []) {
      if (jrIds.has(t.report_id)) {
        totalTons += parseFloat(t.tons_dumped) || 0;
      }
    }

    // Get 2026 tons from DR trucks
    const { data: drReports2026 } = await sb
      .from("dumpster_reports")
      .select("id")
      .gte("report_date", "2026-01-01");

    const drIds = new Set((drReports2026 || []).map((r) => r.id));

    const { data: drTrucks } = await sb
      .from("dumpster_trucks")
      .select("tons_dumped, report_id");

    for (const t of drTrucks || []) {
      if (drIds.has(t.report_id)) {
        totalTons += parseFloat(t.tons_dumped) || 0;
      }
    }

    const stats: Stats = {
      jobsCompleted: totalJobs,
      tonsDiverted: Math.round(totalTons),
      googleRating: 4.9,
    };

    cache = { data: stats, expiresAt: Date.now() + CACHE_TTL_MS };
    return NextResponse.json(stats);
  } catch (err) {
    console.error("Stats fetch error:", err);
    return NextResponse.json({ jobsCompleted: 0, tonsDiverted: 0, googleRating: 4.9 });
  }
}
