"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sofa,
  Refrigerator,
  BedDouble,
  TreePine,
  Trash2,
  Plus,
  Minus,
  Truck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// ---------- Data ----------

type ItemDef = { name: string; cuFt: number };
type Category = {
  label: string;
  icon: React.ElementType;
  items: ItemDef[];
};

const CATEGORIES: Category[] = [
  {
    label: "Furniture",
    icon: Sofa,
    items: [
      { name: "Couch", cuFt: 40 },
      { name: "Table", cuFt: 20 },
      { name: "Desk", cuFt: 20 },
      { name: "Chair", cuFt: 4 },
      { name: "Dresser", cuFt: 25 },
      { name: "Bookshelf", cuFt: 18 },
    ],
  },
  {
    label: "Appliances",
    icon: Refrigerator,
    items: [
      { name: "Fridge", cuFt: 30 },
      { name: "Washer", cuFt: 18 },
      { name: "Dryer", cuFt: 18 },
      { name: "Stove", cuFt: 18 },
      { name: "Dishwasher", cuFt: 12 },
    ],
  },
  {
    label: "Mattress",
    icon: BedDouble,
    items: [
      { name: "King Mattress", cuFt: 40 },
      { name: "Queen Mattress", cuFt: 35 },
      { name: "Full Mattress", cuFt: 30 },
      { name: "Twin Mattress", cuFt: 22 },
    ],
  },
  {
    label: "Outdoor",
    icon: TreePine,
    items: [
      { name: "Grill", cuFt: 12 },
      { name: "Patio Set", cuFt: 30 },
      { name: "Hot Tub", cuFt: 80 },
      { name: "Trampoline", cuFt: 45 },
    ],
  },
  {
    label: "General",
    icon: Trash2,
    items: [
      { name: "Trash Bags x5", cuFt: 10 },
      { name: "Boxes x5", cuFt: 12 },
      { name: "Small Pile", cuFt: 20 },
      { name: "Medium Pile", cuFt: 60 },
      { name: "Large Pile", cuFt: 120 },
    ],
  },
];

const TRUCK_CAPACITY = 405;

const PRICE_TIERS = [
  { label: "Minimum", maxCuFt: 50, price: 187 },
  { label: "1/8 Truck", maxCuFt: 75, price: 315 },
  { label: "1/4 Truck", maxCuFt: 120, price: 455 },
  { label: "1/3 Truck", maxCuFt: 160, price: 525 },
  { label: "1/2 Truck", maxCuFt: 240, price: 675 },
  { label: "2/3 Truck", maxCuFt: 300, price: 795 },
  { label: "3/4 Truck", maxCuFt: 350, price: 855 },
  { label: "Full Truck", maxCuFt: 405, price: 980 },
];

function getTier(cuFt: number) {
  if (cuFt <= 0) return null;
  for (const tier of PRICE_TIERS) {
    if (cuFt <= tier.maxCuFt) return tier;
  }
  return PRICE_TIERS[PRICE_TIERS.length - 1];
}

// ---------- Component ----------

export default function QuotePage() {
  const [items, setItems] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Derived
  const totalCuFt = Object.entries(items).reduce((sum, [itemName, qty]) => {
    const def = CATEGORIES.flatMap((c) => c.items).find(
      (i) => i.name === itemName
    );
    return sum + (def ? def.cuFt * qty : 0);
  }, 0);

  const tier = getTier(totalCuFt);
  const truckPct = Math.min((totalCuFt / TRUCK_CAPACITY) * 100, 100);

  const selectedList = Object.entries(items).filter(([, qty]) => qty > 0);

  function addItem(itemName: string) {
    setItems((prev) => ({ ...prev, [itemName]: (prev[itemName] || 0) + 1 }));
  }

  function changeQty(itemName: string, delta: number) {
    setItems((prev) => {
      const next = (prev[itemName] || 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[itemName];
        return copy;
      }
      return { ...prev, [itemName]: next };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tier) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/ghl-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          items: selectedList.map(([n, qty]) => ({ name: n, qty })),
          volume: totalCuFt,
          ntePrice: tier.price,
          source: "quick-quote",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call (808) 201-2668.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-black text-brand-cream mb-4">
            Quick Quote
          </h1>
          <p className="text-lg md:text-xl text-brand-cream/60 max-w-2xl mx-auto">
            Pick your items, see your price instantly. No photos needed.
          </p>
        </div>
      </section>

      {/* Item Picker */}
      <section className="py-12 bg-brand-dark">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-cream mb-8">
            1. Select Your Items
          </h2>

          <div className="space-y-10">
            {CATEGORIES.map(({ label, icon: Icon, items: catItems }) => (
              <div key={label}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-5 h-5 text-brand-amber" />
                  <h3 className="font-heading text-lg font-bold text-brand-cream">
                    {label}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {catItems.map((item) => {
                    const qty = items[item.name] || 0;
                    const isSelected = qty > 0;

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => addItem(item.name)}
                        className={`relative rounded-lg border p-3 text-center transition-all ${
                          isSelected
                            ? "border-brand-amber bg-brand-amber/10"
                            : "border-white/10 bg-[#1A1A18] hover:border-brand-amber/40"
                        }`}
                      >
                        <span className="text-sm font-medium text-brand-cream block">
                          {item.name}
                        </span>
                        <span className="text-xs text-brand-cream/40 block mt-0.5">
                          ~{item.cuFt} cu ft
                        </span>
                        {isSelected && (
                          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-amber text-xs font-bold text-white flex items-center justify-center">
                            {qty}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Selected items list */}
          {selectedList.length > 0 && (
            <div className="mt-10 p-5 rounded-xl bg-[#1A1A18] border border-white/10">
              <h3 className="font-heading text-lg font-bold text-brand-cream mb-4">
                Your Items
              </h3>
              <div className="space-y-2">
                {selectedList.map(([itemName, qty]) => {
                  const def = CATEGORIES.flatMap((c) => c.items).find(
                    (i) => i.name === itemName
                  );
                  return (
                    <div
                      key={itemName}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <span className="text-brand-cream text-sm">
                        {itemName}
                        <span className="text-brand-cream/40 ml-2">
                          ({def ? def.cuFt * qty : 0} cu ft)
                        </span>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => changeQty(itemName, -1)}
                          className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-brand-cream/60 hover:border-brand-amber hover:text-brand-amber transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-brand-cream font-medium w-6 text-center text-sm">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQty(itemName, 1)}
                          className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-brand-cream/60 hover:border-brand-amber hover:text-brand-amber transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Volume Estimate + Results */}
      <section className="py-12 bg-[#1A1A18]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-cream mb-8">
            2. Volume Estimate
          </h2>

          {/* Truck gauge */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-amber" />
                <span className="text-sm text-brand-cream/60">
                  {totalCuFt} / {TRUCK_CAPACITY} cu ft
                </span>
              </div>
              {tier && (
                <span className="text-sm font-medium text-brand-amber">
                  {tier.label}
                </span>
              )}
            </div>
            <div className="w-full h-6 rounded-full bg-white/5 border border-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-amber to-brand-amber-dark transition-all duration-500"
                style={{ width: `${truckPct}%` }}
              />
            </div>
            {/* Tier markers */}
            <div className="relative mt-1 h-4">
              {PRICE_TIERS.map((t) => (
                <span
                  key={t.label}
                  className="absolute text-[10px] text-brand-cream/30 -translate-x-1/2 hidden sm:inline"
                  style={{
                    left: `${(t.maxCuFt / TRUCK_CAPACITY) * 100}%`,
                  }}
                >
                  {t.label.replace(" Truck", "")}
                </span>
              ))}
            </div>
          </div>

          {/* Price display */}
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-cream mb-6 mt-12">
            3. Your Estimate
          </h2>

          {tier ? (
            <div className="text-center py-8 px-6 rounded-xl bg-brand-dark border border-brand-amber/20">
              <p className="text-sm uppercase tracking-widest text-brand-cream/40 mb-2">
                Your Estimated Price
              </p>
              <p className="font-heading text-5xl md:text-6xl font-black text-brand-amber mb-1">
                ${tier.price}
              </p>
              <p className="text-brand-cream/60 text-sm mt-1">Estimated starting price</p>
              <p className="text-sm text-brand-cream/40 mt-3">
                {tier.label} &middot; {totalCuFt} cu ft
              </p>
              <p className="text-xs text-brand-cream/30 mt-2 max-w-sm mx-auto">
                This is an estimate based on the items selected. Your team lead will confirm the firm price on-site before any work begins. If you don&apos;t approve, you owe nothing.
              </p>
            </div>
          ) : (
            <div className="text-center py-8 px-6 rounded-xl bg-brand-dark border border-white/10">
              <p className="text-brand-cream/40">
                Add items above to see your estimated price
              </p>
            </div>
          )}

          {/* Lead capture form */}
          <div className="mt-10 max-w-lg mx-auto">
            {submitted ? (
              <div className="text-center py-10 px-6 rounded-xl bg-brand-dark border border-brand-amber/20">
                <CheckCircle className="w-12 h-12 text-brand-amber mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-brand-cream mb-2">
                  Quote Submitted!
                </h3>
                <p className="text-brand-cream/60 mb-6">
                  We&apos;ve got your info. Book now to get on the schedule, or we&apos;ll reach out shortly.
                </p>
                <Link
                  href={`/book?service=junk-removal&price=${tier?.price || ""}&fraction=${encodeURIComponent(tier?.label || "")}&items=${encodeURIComponent(Object.entries(items).filter(([,q]) => q > 0).map(([n,q]) => `${n} x${q}`).join(", "))}`}
                  className="inline-flex items-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-brand-cream/50 text-center mb-2">
                  Enter your info to receive your personalized quote
                </p>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-brand-cream/70 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-white/10 bg-brand-dark px-4 py-3 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-brand-cream/70 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(808) 555-1234"
                    className="w-full rounded-lg border border-white/10 bg-brand-dark px-4 py-3 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brand-cream/70 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-white/10 bg-brand-dark px-4 py-3 text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={!tier || submitting}
                  className="w-full bg-brand-amber hover:bg-brand-amber-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-lg"
                >
                  {submitting ? "Submitting..." : "Request On-Site Quote"}
                </button>

                <p className="text-xs text-brand-cream/30 text-center">
                  Want a more accurate estimate?{" "}
                  <Link
                    href="/estimate"
                    className="text-brand-amber hover:underline"
                  >
                    Try our AI Photo Estimator
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
