import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Truck, PackageCheck, Check, X as XIcon, AlertTriangle } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Dumpster Rental on Oahu | Kana'i's Roll Off & Junk Removal",
  description:
    "Roll-off dumpster rental on Oahu. 7 to 30-yard containers for general debris and heavy materials. Pricing from $400 with tonnage included.",
};

const dumpsters = [
  {
    size: "7",
    priceLabel: "From $400",
    days: "1 day",
    tons: 0,
    tagline: "Concrete, aggregate, stone, dirt ONLY",
    restricted: true,
    tonsLabel: "By material",
  },
  {
    size: "15",
    priceLabel: "$800",
    days: "1-2 days",
    tons: 2,
    tagline: "Great for garage cleanouts, small renovations",
  },
  {
    size: "20",
    priceLabel: "$850",
    days: "1-2 days",
    tons: 3,
    tagline: "Most popular for home remodels",
    popular: true,
  },
  {
    size: "25",
    priceLabel: "$850",
    days: "1-2 days",
    tons: 3,
    tagline: "Ideal for large renovations, roofing",
  },
  {
    size: "30",
    priceLabel: "$950",
    days: "1-2 days",
    tons: 5,
    tagline: "Commercial projects, full estate cleanouts",
  },
];

const steps = [
  {
    icon: ClipboardList,
    step: "1",
    title: "Order",
    description:
      "Tell us what size you need and when you want it. We'll confirm your delivery window.",
  },
  {
    icon: Truck,
    step: "2",
    title: "We Deliver",
    description:
      "We drop the dumpster at your location. Fill it up at your own pace.",
  },
  {
    icon: PackageCheck,
    step: "3",
    title: "We Pick Up",
    description:
      "When you're done, give us a call and we'll haul it away. That's it.",
  },
];

export default function DumpsterRentalPage() {
  return (
    <main>
      <JsonLd
        data={getServiceSchema(
          "Dumpster Rental on Oahu",
          "Roll-off dumpster rental on Oahu. 7 to 30-yard containers for general debris and heavy materials. Pricing from $400 with tonnage included.",
          "/dumpster-rental",
        )}
      />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Dumpster Rental", url: "/dumpster-rental" },
        ])}
      />
      {/* Hero */}
      <section className="relative bg-brand-dark py-16 md:py-24 overflow-hidden">
        <img src="/images/hero-dumpster.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-brand-dark/50" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-cream mb-6">
            Dumpster Rental on Oahu
          </h1>
          <p className="text-lg md:text-xl text-brand-cream/70 max-w-2xl mx-auto">
            Roll-off dumpsters for renovations, cleanouts, roofing, and
            construction projects. Delivered to your site and picked up when
            you&apos;re done.
          </p>
        </div>
      </section>

      {/* Size Selector */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-4">
            Choose Your Dumpster Size
          </h2>
          <p className="text-brand-cream/60 text-center mb-12 max-w-xl mx-auto">
            All rentals include delivery, pickup, and disposal within the
            included tonnage.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {dumpsters.map((d) => (
              <Link
                href={`/book?service=dumpster-rental&size=${d.size}`}
                key={d.size}
                className={`relative bg-[#1A1A18] border rounded-xl p-5 transition-all hover:border-brand-amber hover:shadow-[0_0_24px_rgba(212,133,10,0.15)] hover:-translate-y-1 cursor-pointer block ${
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
                    {d.size}
                    <span className="text-lg text-brand-cream/50"> yd</span>
                  </span>
                </div>
                <div className="text-center mb-4">
                  <span className="font-heading text-2xl font-bold text-brand-cream">
                    {d.priceLabel}
                  </span>
                  <span className="text-brand-cream/50 text-sm ml-1">
                    / {d.days}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-brand-cream/70">
                    <span>Included</span>
                    <span className="text-brand-cream font-medium">
                      {d.tonsLabel || `${d.tons} tons`}
                    </span>
                  </div>
                  <div className="flex justify-between text-brand-cream/70">
                    <span>Overage</span>
                    <span className="text-brand-cream font-medium">
                      $160/ton
                    </span>
                  </div>
                </div>
                <p className="text-xs text-brand-cream/50 mt-3 text-center">
                  {d.tagline}
                </p>
                <p className="text-xs text-brand-amber font-semibold mt-3 text-center">
                  Book This Size &rarr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Material Types & Rules */}
      <section className="bg-[#1A1A18] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-4">
            Material Types &amp; Disposal Rules
          </h2>
          <p className="text-brand-cream/60 text-center mb-4 max-w-2xl mx-auto">
            Each dumpster must contain <strong className="text-brand-cream">one type of material only</strong>.
            Mixing different waste types in the same dumpster incurs a <strong className="text-brand-cream">$150 mixing surcharge</strong> because
            mixed loads require manual sorting at the disposal facility.
          </p>
          <p className="text-brand-cream/40 text-center text-sm mb-12 max-w-xl mx-auto">
            Not sure what category your debris falls under? Call us at{" "}
            <a href="tel:8082012668" className="text-brand-amber hover:underline">(808) 201-2668</a>{" "}
            and we&apos;ll help you pick the right setup.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MaterialCard
              title="General / Household Debris"
              sizes="15, 20, 25, 30 yd"
              items={["Furniture", "Household junk", "Miscellaneous non-hazardous waste", "Boxes, bags, general cleanout items"]}
            />
            <MaterialCard
              title="Construction & Renovation"
              sizes="15, 20, 25, 30 yd"
              items={["Drywall", "Lumber & wood", "Cabinets", "Flooring", "General demo debris"]}
            />
            <MaterialCard
              title="Roofing Materials"
              sizes="15, 20, 25, 30 yd"
              items={["Shingles", "Underlayment", "Flashing & nails", "Roofing felt"]}
              note="Roofing dumpsters: $450 flat rate (15-25 yd). Dump fee of $160/ton charged separately after scale."
            />
            <MaterialCard
              title="Green Waste"
              sizes="15, 20, 25, 30 yd"
              items={["Yard trimmings", "Tree branches & limbs", "Grass clippings", "Bushes & shrubs", "Palm fronds"]}
              note="$100 green waste disposal fee applies"
            />
            <MaterialCard
              title="Concrete / Aggregate / Heavy"
              sizes="7 yd ONLY"
              items={["Concrete", "Asphalt", "Stone & rock", "Dirt & soil", "Brick & block", "Aggregate / gravel"]}
              restricted
              note="These materials MUST go in a 7-yard dumpster — they cannot be placed in larger containers"
            />
            <MaterialCard
              title="Metals"
              sizes="15, 20, 25, 30 yd"
              items={["Scrap metal", "Appliances (doors removed)", "Metal roofing", "Steel, aluminum, copper"]}
              note="Metal recycling may offset dump fees — ask about recycling credits"
            />
            <MaterialCard
              title="Not Accepted"
              sizes="—"
              items={["Hazardous materials (paint, chemicals)", "Asbestos", "Tires", "Propane tanks", "Medical waste", "Batteries & e-waste"]}
              rejected
              note="Call us if you're unsure about a specific item"
            />
          </div>
        </div>
      </section>

      {/* Dumpster Rental Fees */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-4">
            Dumpster Rental Fees &amp; Surcharges
          </h2>
          <p className="text-brand-cream/60 text-center mb-4 max-w-2xl mx-auto">
            These fees are specific to dumpster rentals. All charges are disclosed before you book — never after.
          </p>
          <p className="text-xs text-brand-cream/30 text-center mb-12 max-w-xl mx-auto">
            Dumpster rental fees differ from junk removal fees. Items listed below are not permitted in dumpsters without the listed surcharge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Unacceptable Materials / Prohibited Items */}
            <div>
              <h3 className="font-heading font-bold text-brand-cream text-sm uppercase tracking-wider mb-4">
                Prohibited Items in Dumpsters
              </h3>
              <p className="text-xs text-brand-cream/40 mb-3">These items are not allowed in dumpsters. If found, the following fees apply:</p>
              <div className="bg-[#1A1A18] rounded-xl border border-[#2A2A27] overflow-hidden">
                <FeeRow label="Appliances (fridge, stove, washer, dryer, AC, etc.)" price="$100/item" />
                <FeeRow label="Mattress &amp; box spring" price="$100/ea" />
                <FeeRow label="Auto parts (tires, motors, doors, batteries, etc.)" price="$100/item" />
                <FeeRow label="E-waste (TVs, computers, monitors, printers)" price="$50/item" />
                <FeeRow label="Propane tanks" price="$150/tank" />
                <FeeRow label="Fire extinguishers" price="$100/item" />
                <FeeRow label="Fluorescent bulbs / light tubes" price="$50/tube" />
                <FeeRow label="Asbestos-containing materials" price="$400/load" />
                <FeeRow label="Painted concrete" price="$400" />
                <FeeRow label="Hazardous materials (paint, gas, chemicals)" price="$150 cleaning fee" />
                <FeeRow label="Fireworks or explosives" price="$500 — PROHIBITED" />
                <FeeRow label="Medical / bio-hazardous waste" price="PROHIBITED" last />
              </div>
            </div>

            {/* Service & Handling Fees */}
            <div>
              <h3 className="font-heading font-bold text-brand-cream text-sm uppercase tracking-wider mb-4">
                Service &amp; Handling Fees
              </h3>
              <div className="bg-[#1A1A18] rounded-xl border border-[#2A2A27] overflow-hidden">
                <FeeRow label="Dump fee (charged after scale)" price="$160/ton" />
                <FeeRow label="Mixed waste types (per dumpster)" price="$150" />
                <FeeRow label="Extra rental day" price="$50/day" />
                <FeeRow label="Out of district (Wahiawa–Kahaluu)" price="$100" />
                <FeeRow label="Green waste disposal" price="$100" />
                <FeeRow label="Cancellation fee (on the way or onsite)" price="$250" />
                <FeeRow label="Relocation fee" price="$250" />
                <FeeRow label="Standby time (after first 15 min)" price="$45/15 min" />
                <FeeRow label="Reload unacceptable materials" price="$100/item" />
                <FeeRow label="Overloaded dumpster (over fill line)" price="$250" />
                <FeeRow label="Dumpster damage repair" price="$170/labor hr" />
                <FeeRow label="Graffiti removal / cleaning" price="$150" last />
              </div>

              <h3 className="font-heading font-bold text-brand-cream text-sm uppercase tracking-wider mt-8 mb-4">
                Optional Add-Ons
              </h3>
              <div className="bg-[#1A1A18] rounded-xl border border-[#2A2A27] overflow-hidden">
                <FeeRow label="Cancellation insurance" price="$150" />
                <FeeRow label="Driveway protection (under wheels)" price="$50" last />
              </div>
            </div>
          </div>

          <div className="mt-10 bg-[#1A1A18] rounded-xl border border-brand-amber/20 p-5 max-w-2xl mx-auto">
            <h4 className="font-heading font-bold text-brand-cream text-sm mb-2">Important Notes</h4>
            <ul className="space-y-1.5 text-xs text-brand-cream/50">
              <li>&#x2022; Prepayment is required for all dumpster rentals. Balances charged upon completion.</li>
              <li>&#x2022; No refunds once payment is made. Rescheduling is available.</li>
              <li>&#x2022; Customer is responsible for scheduling pickup — call at least 1 day in advance.</li>
              <li>&#x2022; Drop-off and pick-up times are not guaranteed due to the nature of operations.</li>
              <li>&#x2022; Dumpster contents must not exceed the fill line (water level).</li>
              <li>&#x2022; Hawaii State Tax of 4.712% applies to all services.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Extended Rental */}
      <section className="bg-[#1A1A18] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-cream mb-4">
            Need It Longer?
          </h2>
          <p className="text-brand-cream/60 max-w-lg mx-auto mb-4">
            3-5 day rentals are available for larger projects. Extra days are
            billed at a flat rate.
          </p>
          <p className="font-heading text-xl text-brand-amber font-semibold">
            +$50/day for extended rental
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-12">
            How Dumpster Rental Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-brand-amber/10 border border-brand-amber/20 mb-6">
                  <s.icon className="size-8 text-brand-amber" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-brand-cream mb-3">
                  {s.title}
                </h3>
                <p className="text-brand-cream/60 text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A18] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream mb-4">
            Get a Dumpster Quote
          </h2>
          <p className="text-brand-cream/60 mb-8 max-w-lg mx-auto">
            Tell us about your project and we&apos;ll recommend the right size
            for you.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center h-12 px-8 bg-brand-amber text-brand-dark font-heading font-semibold rounded-lg hover:bg-brand-amber-dark transition-colors text-lg"
          >
            Book a Dumpster
          </Link>
        </div>
      </section>
    </main>
  );
}

function FeeRow({ label, price, last }: { label: string; price: string; last?: boolean }) {
  return (
    <div className={`flex justify-between items-center px-4 py-2.5 ${last ? "" : "border-b border-[#2A2A27]"}`}>
      <span className="text-sm text-brand-cream/60">{label}</span>
      <span className="text-sm font-heading font-semibold text-brand-cream whitespace-nowrap ml-4">{price}</span>
    </div>
  );
}

function MaterialCard({
  title,
  sizes,
  items,
  note,
  restricted,
  rejected,
}: {
  title: string;
  sizes: string;
  items: string[];
  note?: string;
  restricted?: boolean;
  rejected?: boolean;
}) {
  const borderColor = rejected
    ? "border-red-500/30"
    : restricted
      ? "border-brand-amber/40"
      : "border-[#2A2A27]";
  const iconColor = rejected
    ? "text-red-400"
    : restricted
      ? "text-brand-amber"
      : "text-brand-cream/50";

  return (
    <div className={`bg-brand-dark rounded-xl border ${borderColor} p-5`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-heading font-bold text-brand-cream text-sm">{title}</h3>
        {restricted && <AlertTriangle className="w-4 h-4 text-brand-amber shrink-0" />}
        {rejected && <XIcon className="w-4 h-4 text-red-400 shrink-0" />}
      </div>
      <p className="text-[10px] uppercase tracking-wider text-brand-cream/30 font-semibold mb-3">
        Available sizes: {sizes}
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-brand-cream/60">
            {rejected ? (
              <XIcon className={`w-3 h-3 shrink-0 ${iconColor}`} />
            ) : (
              <Check className={`w-3 h-3 shrink-0 ${iconColor}`} />
            )}
            {item}
          </li>
        ))}
      </ul>
      {note && (
        <p className={`text-[11px] mt-3 pt-3 border-t border-white/5 ${restricted ? "text-brand-amber/70" : rejected ? "text-red-400/70" : "text-brand-cream/40"}`}>
          {note}
        </p>
      )}
    </div>
  );
}
