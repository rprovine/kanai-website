import Image from "next/image";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DumpsterPreview } from "@/components/sections/DumpsterPreview";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { GuaranteeBanner } from "@/components/sections/GuaranteeBanner";
import { CTASection } from "@/components/sections/CTASection";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { QuoteCalculator } from "@/components/ui/QuoteCalculator";
import { siteConfig } from "@/data/site";
import { generateLocalBusinessSchema } from "@/lib/metadata";

const whyChooseUs = [
  "Same-day & next-day service",
  "Upfront pricing — no hidden fees",
  "Eco-friendly disposal & recycling",
  "Fully licensed & insured",
  `${siteConfig.reviews.count}+ five-star Google reviews`,
  "We do all the heavy lifting",
];

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* 1. Hero — dark, full bleed */}
      <HeroSection />

      {/* 2. Stats — dark bar */}
      <StatsBar />

      {/* 3. Services — white bg */}
      <ServicesOverview />

      {/* 4. Process — light gray bg */}
      <ProcessSteps />

      {/* 4.5. Instant Quote Calculator — white bg */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-brand-red font-semibold">
                Quick Quote
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900 mt-3 leading-snug">
                Get an Instant Estimate
              </h2>
              <p className="mt-4 text-brand-gray-500 leading-relaxed">
                Select the items you need removed and get an immediate price range.
                Our estimates are based on typical Oahu junk removal pricing so
                you know what to expect before we arrive.
              </p>
              <p className="mt-4 text-brand-gray-500 leading-relaxed">
                Need something not on the list? No problem &mdash; just give us a call
                or book online and we&apos;ll provide a custom quote within the hour.
              </p>
            </div>
            <QuoteCalculator />
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us — dark bg */}
      <section className="bg-brand-gray-950 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/services/loading-dumpster.jpg"
                alt="Kana'i's crew loading a dumpster"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-brand-red font-semibold">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 leading-snug">
                Oahu&apos;s most trusted junk removal crew
              </h2>
              <p className="mt-4 text-brand-gray-400 leading-relaxed">
                We&apos;ve built our reputation one job at a time — showing up on time,
                pricing honestly, and leaving every space spotless.
              </p>
              <ul className="mt-8 space-y-4">
                {whyChooseUs.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-brand-gray-300">
                    <svg className="w-5 h-5 text-brand-red shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Dumpster Rentals — white bg */}
      <DumpsterPreview />

      {/* 7. Reviews — light gray bg */}
      <ReviewsCarousel />

      {/* 7.5 Guarantee Banner — dark bg */}
      <GuaranteeBanner />

      {/* 8. Estimate Form — white bg */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-brand-red font-semibold">
                Free Estimate
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900 mt-3 leading-snug">
                Tell us what needs to go
              </h2>
              <p className="mt-4 text-brand-gray-500 leading-relaxed">
                Fill out the form and we&apos;ll respond within 1 hour with a no-obligation quote.
              </p>
              <ul className="mt-8 space-y-4">
                {["No obligation, no hidden fees", "Response within 1 hour", "Same-day service available", "We do all the heavy lifting"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-brand-gray-600">
                    <svg className="w-5 h-5 text-brand-red shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="bg-brand-gray-50 rounded-2xl p-8 border border-brand-gray-200">
                <EstimateForm source="homepage" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA — red bg */}
      <CTASection />
    </>
  );
}
