"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight, ShieldCheck } from "lucide-react";

export default function PortalPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
    setError("");
  }

  function handleCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(digits);
    setError("");
  }

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/portal/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: digits, action: "send" }),
      });

      const data = await res.json();

      if (data.success) {
        setStep("code");
      } else {
        setError(data.error || "Could not send verification code.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/portal/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.replace(/\D/g, ""),
          code,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem(
          "portal_session",
          JSON.stringify({
            sessionId: data.sessionId,
            phone: data.phone,
          })
        );
        router.push("/portal/dashboard");
      } else {
        setError(data.error || "Invalid code. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-brand-dark min-h-[80vh] flex items-center justify-center py-12 md:py-20">
      <div className="w-full max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="size-14 rounded-full bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="size-7 text-brand-amber" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream mb-2">
            Customer Portal
          </h1>
          <p className="text-brand-cream/50 text-sm">
            Check your job status, reschedule, or leave a review.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#1A1A18] border border-white/5 rounded-xl p-6 md:p-8">
          {step === "phone" ? (
            <form onSubmit={handleSendCode}>
              <label
                htmlFor="portal-phone"
                className="block text-sm font-medium text-brand-cream/70 mb-1.5"
              >
                Phone Number
              </label>
              <div className="relative mb-4">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brand-cream/30" />
                <input
                  type="tel"
                  id="portal-phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  autoFocus
                  className="w-full h-12 pl-10 pr-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-colors text-lg tracking-wide"
                  placeholder="(808) 555-1234"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-brand-amber text-brand-dark font-heading font-semibold rounded-lg hover:bg-brand-amber-dark transition-colors flex items-center justify-center gap-2"
              >
                Send Verification Code
                <ArrowRight className="size-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <p className="text-brand-cream/70 text-sm mb-4">
                We sent a 6-digit code to{" "}
                <span className="text-brand-cream font-medium">{phone}</span>
              </p>

              <label
                htmlFor="portal-code"
                className="block text-sm font-medium text-brand-cream/70 mb-1.5"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="portal-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={handleCodeChange}
                autoFocus
                maxLength={6}
                className="w-full h-14 px-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream text-center text-2xl font-mono tracking-[0.5em] placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-colors mb-4"
                placeholder="------"
              />

              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className={`w-full h-12 rounded-lg font-heading font-semibold transition-colors flex items-center justify-center gap-2 ${
                  code.length === 6 && !loading
                    ? "bg-brand-amber text-brand-dark hover:bg-brand-amber-dark"
                    : "bg-[#2A2A27] text-brand-cream/30 cursor-not-allowed"
                }`}
              >
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setCode("");
                  setError("");
                }}
                className="w-full mt-3 text-sm text-brand-cream/40 hover:text-brand-cream/60 transition-colors"
              >
                Use a different number
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-brand-cream/30 text-xs mt-6">
          Need help? Call{" "}
          <a
            href="tel:+18082012668"
            className="text-brand-amber hover:underline"
          >
            (808) 201-2668
          </a>
        </p>
      </div>
    </section>
  );
}
