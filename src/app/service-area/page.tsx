import Link from "next/link";
import { MapPin } from "lucide-react";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Area | Kana'i's Roll Off & Junk Removal",
  description: "Kana'i's Roll Off serves all of Oahu — Kapolei, Pearl City, Kailua, Kaneohe, Honolulu, Hawaii Kai, and more. Find junk removal and dumpster rental near you.",
};

export default function ServiceAreaPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-black text-brand-cream">
            Serving All of Oahu
          </h1>
          <p className="mt-4 text-lg text-brand-cream/60 max-w-xl mx-auto">
            From Kapolei to Hawaii Kai, Wahiawa to Kailua — our crew covers every corner of the island.
          </p>
        </div>
      </section>

      {/* Oahu Coverage Map */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-xl border border-white/5 overflow-hidden h-72 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d119750!2d-157.97!3d21.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kana'i's service area — all of Oahu"
            />
          </div>
          <p className="text-center text-xs text-brand-cream/30 mt-3">
            We serve all of Oahu — from Kapolei to Hawaii Kai, North Shore to Waikiki.
          </p>
        </div>
      </section>

      {/* Neighborhood Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-cream mb-8 text-center">
            Neighborhoods We Serve
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NEIGHBORHOODS.map((n) => (
              <Link
                key={n.slug}
                href={`/service-area/${n.slug}`}
                className="group bg-[#1A1A18] rounded-xl border border-white/5 hover:border-brand-amber/30 p-5 transition-all"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-amber mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-brand-cream group-hover:text-brand-amber transition-colors">
                      {n.name}
                    </h3>
                    <p className="text-xs text-brand-cream/40 mt-1 line-clamp-2">
                      {n.description}
                    </p>
                    <span className="text-xs text-brand-amber/60 mt-2 inline-block group-hover:text-brand-amber transition-colors">
                      Learn More &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-cream mb-4">
            Ready to Book?
          </h2>
          <p className="text-brand-cream/50 mb-6">
            We serve your neighborhood. Get a free estimate in seconds.
          </p>
          <Link
            href="/estimate"
            className="inline-block bg-brand-amber hover:bg-brand-amber-dark text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors"
          >
            Get Your Free Estimate
          </Link>
        </div>
      </section>
    </>
  );
}
