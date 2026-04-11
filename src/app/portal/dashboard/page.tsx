"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Truck,
  Container,
  Star,
  LogOut,
  Loader2,
  Calendar,
  X as XIcon,
  Check,
  Clock,
  MapPin,
} from "lucide-react";

interface Job {
  id: string;
  type: string;
  date: string | null;
  time: string | null;
  status: string;
  rawStatus: string;
  address: string;
  amount: number | null;
  customerName: string;
  source?: "workiz" | "dispatch";
  size?: string | null;
  rentalEndDate?: string | null;
  materialType?: string | null;
}

interface OutstandingPayment {
  id: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  stripe_payment_url?: string;
}

interface Session {
  sessionId: string;
  phone: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  scheduled: { label: "Scheduled", color: "text-brand-amber", bg: "bg-brand-amber/10" },
  "en-route": { label: "En Route", color: "text-blue-400", bg: "bg-blue-400/10" },
  completed: { label: "Completed", color: "text-green-400", bg: "bg-green-400/10" },
  invoiced: { label: "Invoiced", color: "text-brand-cream/50", bg: "bg-brand-cream/5" },
  cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-400/10" },
};

export default function PortalDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionDone, setActionDone] = useState<string | null>(null);
  const [outstandingPayments, setOutstandingPayments] = useState<OutstandingPayment[]>([]);
  const [rescheduleJob, setRescheduleJob] = useState<Job | null>(null);
  const [extendJob, setExtendJob] = useState<Job | null>(null);
  const [extendDays, setExtendDays] = useState(7);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("portal_session");
    if (!stored) {
      router.push("/portal");
      return;
    }

    const sess: Session = JSON.parse(stored);
    setSession(sess);

    fetch(`/api/portal/jobs?phone=${sess.phone}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setOutstandingPayments(data.outstandingPayments || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  function signOut() {
    localStorage.removeItem("portal_session");
    router.push("/portal");
  }

  function formatPhone(digits: string) {
    if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    return digits;
  }

  async function handleAction(
    jobId: string,
    action: "reschedule" | "cancel" | "request-pickup" | "extend",
    job?: Job,
    extraBody?: Record<string, unknown>
  ) {
    if (!session) return;
    setActionLoading(jobId);

    try {
      const res = await fetch("/api/portal/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: session.phone,
          jobId,
          action,
          source: job?.source || "workiz",
          newDate: action === "reschedule" ? newDate : undefined,
          newTime: action === "reschedule" ? newTime : undefined,
          ...extraBody,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setActionDone(`${action}-${jobId}`);
        setRescheduleJob(null);
        setExtendJob(null);
        setExtendDays(7);
        setNewDate("");
        setNewTime("");
      }
    } catch {
      // silent
    } finally {
      setActionLoading(null);
    }
  }

  const activeJobs = jobs.filter((j) => ["scheduled", "en-route"].includes(j.status));
  const pastJobs = jobs.filter((j) => ["completed", "invoiced", "cancelled"].includes(j.status));

  if (!session) return null;

  return (
    <main className="bg-brand-dark min-h-screen">
      {/* Header */}
      <section className="border-b border-[#2A2A27]">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-brand-cream/50">Welcome back</p>
            <p className="font-heading font-bold text-brand-cream">{formatPhone(session.phone)}</p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm text-brand-cream/40 hover:text-brand-cream transition-colors"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Active Jobs */}
        <div>
          <h2 className="font-heading text-xl font-bold text-brand-cream mb-4">Active Jobs</h2>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-6 animate-spin text-brand-amber" />
              <span className="ml-2 text-sm text-brand-cream/50">Loading your jobs...</span>
            </div>
          ) : activeJobs.length === 0 ? (
            <div className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl p-8 text-center">
              <p className="text-brand-cream/40 text-sm">No active jobs right now.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeJobs.map((job) => (
                <JobCard
                  key={`${job.source}-${job.id}`}
                  job={job}
                  actionLoading={actionLoading}
                  actionDone={actionDone}
                  onReschedule={() => setRescheduleJob(job)}
                  onCancel={() => handleAction(job.id, "cancel", job)}
                  onRequestPickup={job.source === "dispatch" ? () => handleAction(job.id, "request-pickup", job) : undefined}
                  onExtend={job.source === "dispatch" ? () => setExtendJob(job) : undefined}
                />
              ))}
            </div>
          )}
        </div>

        {/* Outstanding Payments */}
        {outstandingPayments.length > 0 && (
          <div>
            <h2 className="font-heading text-xl font-bold text-brand-cream mb-4">Outstanding Payments</h2>
            <div className="space-y-2">
              {outstandingPayments.map((payment) => (
                <div key={payment.id} className="bg-[#1A1A18] border border-brand-amber/20 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-cream">{payment.description}</p>
                    <p className="text-xs text-brand-cream/40 mt-0.5">${payment.amount.toFixed(2)}</p>
                  </div>
                  {payment.stripe_payment_url ? (
                    <a
                      href={payment.stripe_payment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-4 text-sm bg-brand-amber text-brand-dark font-heading font-semibold rounded-lg hover:bg-brand-amber-dark transition-colors flex items-center"
                    >
                      Pay Now
                    </a>
                  ) : (
                    <span className="text-xs text-brand-amber">Invoice pending</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Jobs */}
        {pastJobs.length > 0 && (
          <div>
            <h2 className="font-heading text-xl font-bold text-brand-cream mb-4">Past Jobs</h2>
            <div className="space-y-2">
              {pastJobs.map((job) => (
                <div key={`${job.source}-${job.id}`} className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {job.type.includes("Dumpster") ? (
                      <Container className="size-5 text-brand-cream/30" />
                    ) : (
                      <Truck className="size-5 text-brand-cream/30" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-brand-cream">
                        {job.type}
                        {job.size && <span className="text-brand-cream/40 font-normal"> — {job.size}</span>}
                      </p>
                      <p className="text-xs text-brand-cream/40">{job.date || "No date"} &middot; Job #{job.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={job.status} />
                    {job.amount != null && job.amount > 0 && (
                      <p className="text-xs text-brand-cream/40 mt-1">${job.amount.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No jobs at all */}
        {!loading && jobs.length === 0 && (
          <div className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl p-8 text-center">
            <p className="text-brand-cream/50 text-sm mb-2">No jobs found for this phone number.</p>
            <p className="text-brand-cream/30 text-xs">If you recently booked, it may take a few minutes to appear.</p>
          </div>
        )}

        {/* Leave a Review */}
        <div className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl p-6 text-center">
          <Star className="size-8 text-brand-amber mx-auto mb-3" />
          <h3 className="font-heading font-bold text-brand-cream mb-2">Had a Great Experience?</h3>
          <p className="text-brand-cream/50 text-sm mb-5">
            Your review helps other Oahu families find reliable junk removal.
          </p>
          <a
            href="https://g.page/r/CSPVqkUojBN8EBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-6 bg-brand-amber text-brand-dark font-heading font-semibold rounded-lg hover:bg-brand-amber-dark transition-colors"
          >
            Leave a Google Review
          </a>
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleJob && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl max-w-sm w-full p-6">
            <h3 className="font-heading font-bold text-brand-cream mb-1">Reschedule Job #{rescheduleJob.id}</h3>
            <p className="text-xs text-brand-cream/40 mb-5">{rescheduleJob.type} &middot; Currently: {rescheduleJob.date}</p>

            <label className="block text-sm font-medium text-brand-cream/70 mb-1.5">New Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full h-11 px-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream mb-4 focus:outline-none focus:border-brand-amber"
            />

            <label className="block text-sm font-medium text-brand-cream/70 mb-1.5">Preferred Time</label>
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full h-11 px-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream mb-6 focus:outline-none focus:border-brand-amber"
            >
              <option value="">Select...</option>
              <option value="8-10 AM">8:00 – 10:00 AM</option>
              <option value="10-12 PM">10:00 AM – 12:00 PM</option>
              <option value="12-2 PM">12:00 – 2:00 PM</option>
              <option value="2-4 PM">2:00 – 4:00 PM</option>
              <option value="4-6 PM">4:00 – 6:00 PM</option>
              <option value="Anytime">Anytime</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => { setRescheduleJob(null); setNewDate(""); setNewTime(""); }}
                className="flex-1 h-11 border border-[#2A2A27] rounded-lg text-brand-cream hover:border-brand-cream/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(rescheduleJob.id, "reschedule")}
                disabled={!newDate || actionLoading === rescheduleJob.id}
                className={`flex-1 h-11 rounded-lg font-heading font-semibold transition-colors ${
                  newDate && actionLoading !== rescheduleJob.id
                    ? "bg-brand-amber text-brand-dark hover:bg-brand-amber-dark"
                    : "bg-[#2A2A27] text-brand-cream/30 cursor-not-allowed"
                }`}
              >
                {actionLoading === rescheduleJob.id ? "Submitting..." : "Request Reschedule"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Extend Rental Modal */}
      {extendJob && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl max-w-sm w-full p-6">
            <h3 className="font-heading font-bold text-brand-cream mb-1">Extend Rental</h3>
            <p className="text-xs text-brand-cream/40 mb-5">
              {extendJob.size || "Dumpster"} at {extendJob.address}
              {extendJob.rentalEndDate && (
                <> &middot; Current end: {extendJob.rentalEndDate}</>
              )}
            </p>

            <label className="block text-sm font-medium text-brand-cream/70 mb-1.5">Extension Days</label>
            <select
              value={extendDays}
              onChange={(e) => setExtendDays(Number(e.target.value))}
              className="w-full h-11 px-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream mb-6 focus:outline-none focus:border-brand-amber"
            >
              {[1, 2, 3, 5, 7, 14, 21, 30].map((d) => (
                <option key={d} value={d}>
                  {d} day{d > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => { setExtendJob(null); setExtendDays(7); }}
                className="flex-1 h-11 border border-[#2A2A27] rounded-lg text-brand-cream hover:border-brand-cream/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(extendJob.id, "extend", extendJob, { days: extendDays })}
                disabled={actionLoading === extendJob.id}
                className={`flex-1 h-11 rounded-lg font-heading font-semibold transition-colors ${
                  actionLoading !== extendJob.id
                    ? "bg-brand-amber text-brand-dark hover:bg-brand-amber-dark"
                    : "bg-[#2A2A27] text-brand-cream/30 cursor-not-allowed"
                }`}
              >
                {actionLoading === extendJob.id ? "Submitting..." : "Extend Rental"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function daysRemaining(endDate: string | null | undefined): number | null {
  if (!endDate) return null;
  const end = new Date(endDate + "T23:59:59");
  const now = new Date();
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

function JobCard({ job, actionLoading, actionDone, onReschedule, onCancel, onRequestPickup, onExtend }: {
  job: Job;
  actionLoading: string | null;
  actionDone: string | null;
  onReschedule: () => void;
  onCancel: () => void;
  onRequestPickup?: () => void;
  onExtend?: () => void;
}) {
  const isDone = actionDone === `cancel-${job.id}` || actionDone === `reschedule-${job.id}`
    || actionDone === `request-pickup-${job.id}` || actionDone === `extend-${job.id}`;

  const isDispatchDumpster = job.source === "dispatch";
  const remaining = isDispatchDumpster ? daysRemaining(job.rentalEndDate) : null;

  return (
    <div className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {job.type.includes("Dumpster") ? (
            <div className="size-10 rounded-lg bg-brand-amber/10 flex items-center justify-center">
              <Container className="size-5 text-brand-amber" />
            </div>
          ) : (
            <div className="size-10 rounded-lg bg-brand-amber/10 flex items-center justify-center">
              <Truck className="size-5 text-brand-amber" />
            </div>
          )}
          <div>
            <p className="font-heading font-bold text-brand-cream text-sm">
              {job.type}
              {job.size && <span className="text-brand-cream/50 font-normal"> — {job.size}</span>}
            </p>
            <p className="text-xs text-brand-cream/40">Job #{job.id}</p>
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="space-y-1.5 text-sm mb-4">
        {job.date && (
          <div className="flex items-center gap-2 text-brand-cream/60">
            <Calendar className="size-3.5 shrink-0" />
            <span>{job.date}{job.time ? ` at ${job.time}` : ""}</span>
          </div>
        )}
        {job.address && (
          <div className="flex items-center gap-2 text-brand-cream/60">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{job.address}</span>
          </div>
        )}
        {job.amount != null && job.amount > 0 && (
          <div className="flex items-center gap-2 text-brand-cream/60">
            <Clock className="size-3.5 shrink-0" />
            <span>${job.amount.toFixed(2)}</span>
          </div>
        )}
        {/* Dumpster rental details */}
        {isDispatchDumpster && job.materialType && (
          <div className="flex items-center gap-2 text-brand-cream/60">
            <Container className="size-3.5 shrink-0" />
            <span>Material: {job.materialType}</span>
          </div>
        )}
        {isDispatchDumpster && job.rentalEndDate && (
          <div className="flex items-center gap-2 text-brand-cream/60">
            <Clock className="size-3.5 shrink-0" />
            <span>
              Rental ends: {job.rentalEndDate}
              {remaining != null && (
                <span className={remaining <= 2 ? " text-red-400 font-semibold" : remaining <= 5 ? " text-brand-amber" : ""}>
                  {" "}({remaining > 0 ? `${remaining} day${remaining !== 1 ? "s" : ""} left` : remaining === 0 ? "ends today" : "overdue"})
                </span>
              )}
            </span>
          </div>
        )}
      </div>

      {isDone ? (
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <Check className="size-4" />
          <span>Request submitted — we&apos;ll confirm shortly.</span>
        </div>
      ) : isDispatchDumpster ? (
        /* Dumpster rental actions */
        <div className="flex gap-2 flex-wrap">
          {onRequestPickup && (
            <button
              onClick={onRequestPickup}
              disabled={actionLoading === job.id}
              className="flex-1 h-9 text-sm bg-brand-amber/10 border border-brand-amber/30 rounded-lg text-brand-amber hover:bg-brand-amber/20 transition-colors flex items-center justify-center gap-1.5"
            >
              {actionLoading === job.id ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Truck className="size-3.5" />
              )}
              Request Pickup
            </button>
          )}
          {onExtend && (
            <button
              onClick={onExtend}
              disabled={actionLoading === job.id}
              className="flex-1 h-9 text-sm border border-[#2A2A27] rounded-lg text-brand-cream/70 hover:border-brand-amber hover:text-brand-amber transition-colors flex items-center justify-center gap-1.5"
            >
              <Clock className="size-3.5" />
              Extend Rental
            </button>
          )}
        </div>
      ) : (
        /* Junk removal actions */
        <div className="flex gap-2">
          <button
            onClick={onReschedule}
            disabled={actionLoading === job.id}
            className="flex-1 h-9 text-sm border border-[#2A2A27] rounded-lg text-brand-cream/70 hover:border-brand-amber hover:text-brand-amber transition-colors flex items-center justify-center gap-1.5"
          >
            <Calendar className="size-3.5" />
            Reschedule
          </button>
          <button
            onClick={onCancel}
            disabled={actionLoading === job.id}
            className="flex-1 h-9 text-sm border border-[#2A2A27] rounded-lg text-brand-cream/70 hover:border-red-400 hover:text-red-400 transition-colors flex items-center justify-center gap-1.5"
          >
            {actionLoading === job.id ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <XIcon className="size-3.5" />
            )}
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.scheduled;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.color} ${config.bg}`}>
      {config.label}
    </span>
  );
}
