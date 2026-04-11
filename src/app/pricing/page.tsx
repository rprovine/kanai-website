import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Transparent Pricing | Kana'i's Roll Off & Junk Removal",
  description:
    "Honest, upfront pricing for junk removal and dumpster rental on Oahu. Get an estimated starting price online — your team lead confirms the firm price on-site. No hidden fees.",
};

const junkPricing = [
  { label: "Minimum", price: "$187" },
  { label: "1/8 load", price: "$315" },
  { label: "1/4 load", price: "$455" },
  { label: "1/2 load", price: "$675" },
  { label: "3/4 load", price: "$855" },
  { label: "Full load", price: "$980" },
];

const dumpsterPricing = [
  { size: "7-yard", price: "From $400", tons: "By material", note: "Concrete, aggregate, stone, dirt ONLY" },
  { size: "15-yard", price: "$800", tons: "2 tons" },
  { size: "20-yard", price: "$850", tons: "3 tons" },
  { size: "25-yard", price: "$850", tons: "3 tons" },
  { size: "30-yard", price: "$950", tons: "5 tons" },
];

const pricingFaqs = [
  {
    q: "How does your pricing work?",
    a: "Our online tools give you an estimated starting price based on the items you describe or photograph. When our team lead arrives on-site, they assess the actual load and give you a firm price before any work starts. If you approve, we get to work. If not, you owe nothing.",
  },
  {
    q: "How much does junk removal cost on Oahu?",
    a: "Junk removal starts at $187 for a minimum load and goes up to $980 for a full truck load. Pricing is based on how much space your items take in our 15-cubic-yard truck.",
  },
  {
    q: "How much does dumpster rental cost on Oahu?",
    a: "Dumpster rentals range from $400 for a 7-yard container (heavy materials only) to $950 for a 30-yard container. All rentals include delivery, pickup, and disposal within the included tonnage. Concrete, aggregate, stone, and dirt must go in a 7-yard dumpster.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No hidden fees. Environmental and special disposal fees for items like mattresses, tires, and e-waste are always disclosed before you book.",
  },
  {
    q: "What is the overage rate for dumpster rentals?",
    a: "Overage beyond included tonnage is billed at $160/ton. Extended rental beyond the standard 1-2 day period is $50/day.",
  },
];

export default function PricingPage() {
  return (
    <main>
      <JsonLd data={getFAQSchema(pricingFaqs)} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" },
        ])}
      />
      {/* Hero */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-cream mb-6">
            Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-brand-cream/70 max-w-2xl mx-auto">
            No hidden fees. No surprises. Just honest pricing.
          </p>
        </div>
      </section>

      {/* NTE Explainer */}
      <section className="bg-[#1A1A18] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream mb-6">
              How Our Pricing Works
            </h2>
            <p className="text-brand-cream/70 text-lg mb-6">
              Our online tools give you an{" "}
              <strong className="text-brand-cream">estimated starting price</strong>{" "}
              based on the photos or information you provide. This is not a firm quote — photos alone can&apos;t tell the whole story.
            </p>
            <p className="text-brand-cream/70 text-lg mb-6">
              When our team lead arrives on-site, they&apos;ll assess the actual load and give you a{" "}
              <strong className="text-brand-cream">firm price before any work begins</strong>.
              You approve it on the spot. If you&apos;re good with the price, we get to work right then and there.
              If not, you owe absolutely nothing.
            </p>
            <p className="text-brand-cream/70 text-lg">
              No hidden fees, no surprise charges, no obligation. You&apos;re always in control.
            </p>
          </div>
        </div>
      </section>

      {/* Junk Removal Pricing */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-4">
            Junk Removal Pricing
          </h2>
          <p className="text-brand-cream/60 text-center mb-12 max-w-xl mx-auto">
            Pricing is based on how much space your items take in our 15-cubic-yard truck
            (12&apos;L x 7&apos;W x 4&apos;H).
          </p>
          <div className="max-w-lg mx-auto bg-[#1A1A18] border border-[#2A2A27] rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 bg-brand-amber/10 border-b border-[#2A2A27]">
              <div className="px-6 py-3 font-heading font-semibold text-brand-amber text-sm">
                Load Size
              </div>
              <div className="px-6 py-3 font-heading font-semibold text-brand-amber text-sm text-right">
                Price
              </div>
            </div>
            {junkPricing.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-2 ${
                  i < junkPricing.length - 1 ? "border-b border-[#2A2A27]" : ""
                }`}
              >
                <div className="px-6 py-4 text-brand-cream/80">
                  {row.label}
                </div>
                <div className="px-6 py-4 text-right font-heading font-bold text-brand-cream">
                  {row.price}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-brand-cream/40 text-center mt-4">
            15-cubic-yard truck (12&apos;L x 7&apos;W x 4&apos;H)
          </p>
        </div>
      </section>

      {/* Dumpster Rental Pricing */}
      <section className="bg-[#1A1A18] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-4">
            Dumpster Rental Pricing
          </h2>
          <p className="text-brand-cream/60 text-center mb-12 max-w-xl mx-auto">
            All rentals include delivery, pickup, and disposal within the
            included tonnage.
          </p>
          <div className="max-w-2xl mx-auto bg-brand-dark border border-[#2A2A27] rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-brand-amber/10 border-b border-[#2A2A27]">
              <div className="px-6 py-3 font-heading font-semibold text-brand-amber text-sm">
                Size
              </div>
              <div className="px-6 py-3 font-heading font-semibold text-brand-amber text-sm text-center">
                Included
              </div>
              <div className="px-6 py-3 font-heading font-semibold text-brand-amber text-sm text-right">
                Price
              </div>
            </div>
            {dumpsterPricing.map((row, i) => (
              <div
                key={row.size}
                className={`grid grid-cols-3 ${
                  i < dumpsterPricing.length - 1
                    ? "border-b border-[#2A2A27]"
                    : ""
                }`}
              >
                <div className="px-6 py-4 text-brand-cream/80">
                  {row.size}
                  {row.note && <span className="block text-[10px] text-brand-amber/70 mt-0.5">{row.note}</span>}
                </div>
                <div className="px-6 py-4 text-center text-brand-cream/80">
                  {row.tons}
                </div>
                <div className="px-6 py-4 text-right font-heading font-bold text-brand-cream">
                  {row.price}
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto mt-6 space-y-2 text-sm text-brand-cream/50 text-center">
            <p>
              Overage rate:{" "}
              <span className="text-brand-cream/80 font-medium">
                $160/ton
              </span>{" "}
              beyond included tonnage
            </p>
            <p>
              Extended rental:{" "}
              <span className="text-brand-cream/80 font-medium">
                +$50/day
              </span>{" "}
              beyond standard 1-2 day rental
            </p>
          </div>
        </div>
      </section>

      {/* Environmental Fees */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-[#1A1A18] border border-[#2A2A27] rounded-xl p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-brand-cream mb-4">
              Environmental &amp; Special Disposal Fees
            </h2>
            <p className="text-brand-cream/70 mb-4">
              Some items require special disposal and carry additional fees.
              These include:
            </p>
            <ul className="list-disc list-inside text-brand-cream/60 space-y-1 mb-4">
              <li>Mattresses</li>
              <li>Tires</li>
              <li>E-waste (TVs, monitors, electronics)</li>
              <li>Appliances with refrigerant (fridges, ACs)</li>
            </ul>
            <p className="text-brand-cream/70">
              These fees are{" "}
              <strong className="text-brand-cream">
                always disclosed before you book
              </strong>{" "}
              — never after. No surprise charges, ever.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A18] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream mb-4">
            Get Your Personalized Estimate
          </h2>
          <p className="text-brand-cream/60 mb-8 max-w-lg mx-auto">
            Every job is different. Get an estimated starting price online,
            then our team lead confirms the firm price on-site.
          </p>
          <Link
            href="/estimate"
            className="inline-flex items-center justify-center h-12 px-8 bg-brand-amber text-brand-dark font-heading font-semibold rounded-lg hover:bg-brand-amber-dark transition-colors text-lg"
          >
            Get Your Personalized Estimate
          </Link>
        </div>
      </section>
    </main>
  );
}
