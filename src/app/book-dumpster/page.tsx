"use client";

import Script from "next/script";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CreditCard, FileText } from "lucide-react";

const DUMPSTER_SIZES = [
  { value: "7", label: "7-yard", price: "$600", tons: "4 tons", desc: "Concrete, aggregate, stone, dirt ONLY", restricted: true },
  { value: "15", label: "15-yard", price: "$800", tons: "2 tons", desc: "Garage cleanouts, small renovations" },
  { value: "20", label: "20-yard", price: "$850", tons: "3 tons", desc: "Home remodels, medium projects", popular: true },
  { value: "25", label: "25-yard", price: "$900", tons: "3 tons", desc: "Large renovations, roofing" },
  { value: "30", label: "30-yard", price: "$950", tons: "5 tons", desc: "Commercial, full estate cleanouts" },
];

export default function BookDumpsterPage() {
  return (
    <main className="bg-brand-dark min-h-screen">
      {/* Docket Shop Embed Scripts */}
      <Script
        src="https://embed.survcart.com/embed.js"
        strategy="afterInteractive"
      />
      <link rel="stylesheet" href="https://embed.survcart.com/embed.css" />
      <Script
        id="survcart-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var survcartConfig = {
              "id": "jJm4hVTnWR14mIGfIZBc",
              "staged": false,
              "selectors": [
                {
                  "id": "CIT0YGIfLHf2Cvyd3TAV",
                  "workflowId": "pnkCxYLcnRxbMQyxzmiA",
                  "configId": "LNs28KXGqWEMeP8SbZBx",
                  "classes": "survcart-embed-presenter",
                  "ga4_tags": [],
                  "default": true,
                  "tokens": ["Book Now", "Book Now!", "BOOK NOW"]
                }
              ],
              "companyId": "LmIXfUyLy5H6AoP9uhKW",
              "embedName": "Embed Configuration 1"
            };
          `,
        }}
      />

      {/* Hero */}
      <section className="bg-brand-dark py-12 md:py-16 border-b border-[#2A2A27]">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/dumpster-rental"
            className="inline-flex items-center gap-1.5 text-sm text-brand-cream/50 hover:text-brand-amber transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dumpster Rental
          </Link>
          <h1 className="font-heading text-3xl md:text-5xl font-black text-brand-cream mb-3">
            Book Your Dumpster Online
          </h1>
          <p className="text-brand-cream/60 max-w-2xl mb-6">
            Pick your size, choose your dates, sign the agreement, and pay
            securely — everything in one place. Your delivery will be confirmed
            shortly after booking.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-xs text-brand-cream/60">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-amber" />
              Secure payment
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-brand-amber" />
              E-sign agreement
            </div>
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-brand-amber" />
              Instant confirmation
            </div>
          </div>
        </div>
      </section>

      {/* Size Selector */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-cream text-center mb-2">
            Choose Your Size
          </h2>
          <p className="text-center text-brand-cream/60 mb-10">
            Click your size to start booking. You&apos;ll sign the rental agreement and pay during checkout.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {DUMPSTER_SIZES.map((d) => (
              <button
                key={d.value}
                type="button"
                className={`survcart-embed-presenter relative bg-[#1A1A18] border rounded-xl p-5 text-left transition-all hover:border-brand-amber hover:shadow-[0_0_24px_rgba(212,133,10,0.15)] hover:-translate-y-1 cursor-pointer ${
                  d.popular
                    ? "border-brand-amber shadow-[0_0_16px_rgba(212,133,10,0.1)]"
                    : d.restricted
                      ? "border-brand-amber/30"
                      : "border-[#2A2A27]"
                }`}
              >
                {d.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-amber text-brand-dark text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                {d.restricted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-amber/20 text-brand-amber text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                    HEAVY MATERIAL ONLY
                  </span>
                )}
                <div className="aspect-[3/2] bg-brand-dark border-2 border-[#2A2A27] rounded-lg flex items-center justify-center mb-4">
                  <span className="font-heading text-3xl font-bold text-brand-amber">
                    {d.value}
                    <span className="text-lg text-brand-cream/50"> yd</span>
                  </span>
                </div>
                <div className="text-center mb-3">
                  <span className="font-heading text-2xl font-bold text-brand-cream">
                    {d.price}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between text-brand-cream/70">
                    <span>Included</span>
                    <span className="text-brand-cream font-medium">{d.tons}</span>
                  </div>
                  <div className="flex justify-between text-brand-cream/70">
                    <span>Overage</span>
                    <span className="text-brand-cream font-medium">$160/ton</span>
                  </div>
                </div>
                <p className="text-xs text-brand-cream/50 mb-3 text-center">{d.desc}</p>
                <div className="text-center text-sm font-bold text-brand-amber">
                  Book Now
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-brand-cream/30 mt-8">
            Booking powered by Docket. Need help? Call{" "}
            <a href="tel:+18082012668" className="text-brand-amber hover:underline">
              (808) 201-2668
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
