"use client";

import { useState } from "react";
import Link from "next/link";

interface JunkItem {
  name: string;
  minPrice: number;
  maxPrice: number;
  icon: string;
}

const items: JunkItem[] = [
  { name: "Couch/Sofa", minPrice: 75, maxPrice: 150, icon: "sofa" },
  { name: "Mattress", minPrice: 50, maxPrice: 100, icon: "bed" },
  { name: "Refrigerator", minPrice: 75, maxPrice: 150, icon: "fridge" },
  { name: "Washer/Dryer", minPrice: 75, maxPrice: 125, icon: "washer" },
  { name: "Desk/Table", minPrice: 50, maxPrice: 100, icon: "desk" },
  { name: "TV/Electronics", minPrice: 25, maxPrice: 75, icon: "tv" },
  { name: "Yard Waste (truck load)", minPrice: 150, maxPrice: 300, icon: "yard" },
  { name: "General Junk (per cu. yd)", minPrice: 50, maxPrice: 100, icon: "junk" },
];

function ItemIcon({ type }: { type: string }) {
  switch (type) {
    case "sofa":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 17V9a2 2 0 012-2h16a2 2 0 012 2v8M4 17v2m16-2v2M2 13h20M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" />
        </svg>
      );
    case "bed":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h18M3 17h18M5 13V8a2 2 0 012-2h10a2 2 0 012 2v5M5 17v2m14-2v2" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
  }
}

export function QuoteCalculator() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  function updateQty(name: string, delta: number) {
    setQuantities((prev) => {
      const current = prev[name] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: next };
    });
  }

  const totalMin = items.reduce((sum, item) => sum + (quantities[item.name] || 0) * item.minPrice, 0);
  const totalMax = items.reduce((sum, item) => sum + (quantities[item.name] || 0) * item.maxPrice, 0);
  const hasItems = totalMin > 0;

  return (
    <div className="bg-white border border-brand-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 space-y-3">
        {items.map((item) => {
          const qty = quantities[item.name] || 0;
          const isActive = qty > 0;

          return (
            <div
              key={item.name}
              className={`flex items-center justify-between rounded-lg px-4 py-3 transition-colors ${
                isActive ? "bg-red-50 border border-brand-red/20" : "bg-brand-gray-50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? "text-brand-red" : "text-brand-gray-400"}>
                  <ItemIcon type={item.icon} />
                </span>
                <div>
                  <p className={`text-sm font-medium ${isActive ? "text-brand-gray-900" : "text-brand-gray-700"}`}>
                    {item.name}
                  </p>
                  <p className="text-xs text-brand-gray-400">
                    ${item.minPrice}&ndash;${item.maxPrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQty(item.name, -1)}
                  disabled={qty === 0}
                  className="w-7 h-7 rounded-md border border-brand-gray-300 flex items-center justify-center text-brand-gray-500 hover:bg-brand-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  aria-label={`Remove one ${item.name}`}
                >
                  &minus;
                </button>
                <span className="w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => updateQty(item.name, 1)}
                  className="w-7 h-7 rounded-md border border-brand-red bg-brand-red text-white flex items-center justify-center hover:bg-brand-red-dark transition"
                  aria-label={`Add one ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total & CTA */}
      <div className="border-t border-brand-gray-200 bg-brand-gray-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-brand-gray-600">Estimated Total</span>
          <span className="text-xl font-bold text-brand-gray-900">
            {hasItems ? `$${totalMin}\u2013$${totalMax}` : "$0"}
          </span>
        </div>

        <Link
          href="/book-now"
          className="block w-full text-center bg-brand-red text-white font-semibold py-3 rounded-md hover:bg-brand-red-dark shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40 transition-all duration-200 text-sm"
        >
          Get Exact Quote
        </Link>

        <p className="mt-3 text-xs text-brand-gray-400 text-center">
          Estimates are approximate. Contact us for an exact quote.
        </p>
      </div>
    </div>
  );
}
