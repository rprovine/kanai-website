import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sofa,
  Refrigerator,
  BedDouble,
  Monitor,
  TreePine,
  Dumbbell,
  HardHat,
  Package,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Junk Removal on Oahu | Kana'i's Roll Off & Junk Removal",
  description:
    "Full-service junk removal across Oahu. We haul furniture, appliances, construction debris, yard waste, and more. Estimated starting prices from $187 — firm price confirmed on-site.",
};

const categories = [
  {
    icon: Sofa,
    title: "Furniture",
    items: "Couches, desks, tables, chairs, bookshelves",
  },
  {
    icon: Refrigerator,
    title: "Appliances",
    items: "Fridges, washers, dryers, stoves, ACs, water heaters",
  },
  {
    icon: BedDouble,
    title: "Mattresses & Beds",
    items: "All sizes — twin through California king",
  },
  {
    icon: Monitor,
    title: "Electronics",
    items: "TVs, computers, monitors, printers",
  },
  {
    icon: TreePine,
    title: "Outdoor",
    items: "Grills, patio sets, hot tubs, trampolines, playsets",
  },
  {
    icon: Dumbbell,
    title: "Exercise Equipment",
    items: "Treadmills, ellipticals, weight benches",
  },
  {
    icon: HardHat,
    title: "Construction Debris",
    items: "Drywall, carpet, cabinets, concrete",
  },
  {
    icon: Package,
    title: "General",
    items: "Trash bags, boxes, misc piles, yard waste",
  },
];

export default function JunkRemovalPage() {
  return (
    <main>
      <JsonLd
        data={getServiceSchema(
          "Junk Removal on Oahu",
          "Full-service junk removal for homes, businesses, and job sites across Oahu. We haul furniture, appliances, construction debris, yard waste, and more. Estimated starting prices from $187.",
          "/junk-removal",
        )}
      />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Junk Removal", url: "/junk-removal" },
        ])}
      />
      {/* Hero */}
      <section className="relative bg-brand-dark py-16 md:py-24 overflow-hidden">
        <img src="/images/hero-junk-removal.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-brand-dark/50" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-cream mb-6">
            Junk Removal on Oahu
          </h1>
          <p className="text-lg md:text-xl text-brand-cream/70 max-w-2xl mx-auto">
            Full-service junk removal for homes, businesses, and job sites
            across Oahu. We do all the heavy lifting — you just point and it
            disappears.
          </p>
        </div>
      </section>

      {/* What We Take */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-4">
            What We Take
          </h2>
          <p className="text-brand-cream/60 text-center mb-12 max-w-xl mx-auto">
            If you can point to it, we can haul it. Here are the most common
            items we remove.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl p-6 hover:border-brand-amber/40 transition-colors"
              >
                <cat.icon className="size-8 text-brand-amber mb-4" />
                <h3 className="font-heading text-lg font-semibold text-brand-cream mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-brand-cream/60">{cat.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Quick Reference */}
      <section className="bg-[#1A1A18] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-4">
            Pricing Quick Reference
          </h2>
          <p className="text-brand-cream/60 text-center mb-12 max-w-xl mx-auto">
            Simple, transparent pricing based on how much space your items take
            in our truck.
          </p>
          <div className="max-w-md mx-auto bg-brand-dark border border-[#2A2A27] rounded-xl p-8">
            <div className="flex justify-between items-center py-3 border-b border-[#2A2A27]">
              <span className="text-brand-cream/70">Minimum load</span>
              <span className="font-heading font-bold text-brand-amber text-lg">
                $187
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#2A2A27]">
              <span className="text-brand-cream/70">Half truck</span>
              <span className="font-heading font-bold text-brand-amber text-lg">
                $675
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-brand-cream/70">Full truck</span>
              <span className="font-heading font-bold text-brand-amber text-lg">
                $980
              </span>
            </div>
            <p className="text-sm text-brand-cream/50 mt-6 text-center">
              These are estimated starting prices. Your team lead confirms the
              firm price on-site before any work begins. No obligation if you decline.
            </p>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-brand-amber hover:text-brand-amber-light underline underline-offset-4 transition-colors"
            >
              View full pricing breakdown
            </Link>
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-4">
            See the Difference
          </h2>
          <p className="text-brand-cream/60 text-center mb-12 max-w-xl mx-auto">
            Real results from real jobs across Oahu.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#2A2A27]">
                <Image
                  src={`/images/jobsite-${i}.jpg`}
                  alt={`Kanai's junk removal job site ${i}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A18] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream mb-4">
            Ready to Clear the Clutter?
          </h2>
          <p className="text-brand-cream/60 mb-8 max-w-lg mx-auto">
            Get a free, no-obligation estimate in minutes. We&apos;ll give you
            an honest price — guaranteed.
          </p>
          <Link
            href="/estimate"
            className="inline-flex items-center justify-center h-12 px-8 bg-brand-amber text-brand-dark font-heading font-semibold rounded-lg hover:bg-brand-amber-dark transition-colors text-lg"
          >
            Get Instant Estimate
          </Link>
        </div>
      </section>
    </main>
  );
}
