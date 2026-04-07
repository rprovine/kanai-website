"use client";

import { Camera, Zap, DollarSign } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    num: 1,
    icon: Camera,
    title: "Take a Photo",
    desc: "Take one photo per item or pile. Don't photograph the same items multiple times — it will count them twice.",
  },
  {
    num: 2,
    icon: Zap,
    title: "AI Analyzes It",
    desc: "Our AI identifies every item and calculates the volume.",
  },
  {
    num: 3,
    icon: DollarSign,
    title: "Get Your Price",
    desc: "Get an estimated starting price in seconds. Your team lead confirms the firm price on-site.",
  },
];

export default function EstimatePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-black text-brand-cream mb-4">
            AI-Powered Junk Estimator
          </h1>
          <p className="text-lg md:text-xl text-brand-cream/60 max-w-2xl mx-auto mb-4">
            Snap a photo of your junk pile. Get an estimated starting price in
            under 15 seconds. Your team lead gives the firm price on-site.
          </p>
          <div className="inline-flex items-center gap-2 bg-brand-amber/10 border border-brand-amber/20 rounded-lg px-4 py-2 mb-4">
            <span className="text-sm text-brand-amber font-semibold">Tip:</span>
            <span className="text-sm text-brand-cream/60">Take one photo per item or pile — don&apos;t photograph the same items from multiple angles.</span>
          </div>
          <p className="text-sm text-brand-cream/40">
            No phone call needed &middot; Available 24/7 &middot;{" "}
            <Link href="/quote" className="text-brand-amber hover:underline">
              Prefer no photos? Try Quick Quote
            </Link>
          </p>
        </div>
      </section>

      {/* Iframe */}
      <section className="bg-brand-dark px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <iframe
            src="https://kanai-estimator-tool.vercel.app"
            title="Kana'i AI Junk Estimator"
            className="w-full rounded-xl"
            style={{ minHeight: "80vh", border: "none" }}
            allow="camera"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-[#1A1A18]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-brand-cream text-center mb-14">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-brand-amber/20" />

            {STEPS.map(({ num, icon: Icon, title, desc }) => (
              <div key={num} className="relative text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-amber/10 border border-brand-amber/20 mb-5">
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-amber flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{num}</span>
                  </div>
                  <Icon className="w-10 h-10 text-brand-amber" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-cream mb-2">
                  {title}
                </h3>
                <p className="text-sm text-brand-cream/50 leading-relaxed max-w-xs mx-auto">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
