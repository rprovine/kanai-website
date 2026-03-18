"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { dumpsterSizes } from "@/data/dumpsters";

const dumpsterImages: Record<string, string> = {
  "7": "/images/dumpsters/7yd.png",
  "15": "/images/dumpsters/15yd.png",
  "20": "/images/dumpsters/20yd.png",
  "25": "/images/dumpsters/25yd.png",
  "30": "/images/dumpsters/30yd.png",
};

export function DumpsterPreview() {
  return (
    <section className="bg-white py-24 sm:py-32 border-t border-brand-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-red font-semibold">Dumpster Rentals</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900 mt-2">Pick your size</h2>
          </div>
          <Link href="/dumpster-rentals" className="text-brand-gray-500 hover:text-brand-red text-sm transition-colors flex items-center gap-1.5 group">
            Compare all
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {dumpsterSizes.map((d, i) => (
            <motion.div
              key={d.slug}
              className="shrink-0 w-64 lg:w-auto snap-start"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Link href={`/dumpster-rentals/${d.slug}`} className="group block h-full rounded-xl border border-brand-gray-200 hover:border-brand-red/30 hover:shadow-lg overflow-hidden transition-all duration-300">
                <div className="relative w-full aspect-[16/10] bg-brand-gray-50">
                  <Image
                    src={dumpsterImages[d.size] || "/images/dumpsters/15yd.png"}
                    alt={`${d.size} yard dumpster`}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="256px"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-brand-gray-900 group-hover:text-brand-red transition-colors">{d.size}</span>
                    <span className="text-xs text-brand-gray-400">yard</span>
                  </div>
                  <p className="text-xs text-brand-red font-medium mt-1">{d.bestFor}</p>
                  <div className="text-xs text-brand-gray-400 mt-2 mb-3">{d.dimensions}</div>
                  <div className="space-y-1.5 text-xs mb-4">
                    <div className="flex justify-between text-brand-gray-500">
                      <span>Tonnage</span>
                      <span className="text-brand-gray-700 font-medium">{d.tonnageIncluded}</span>
                    </div>
                    <div className="flex justify-between text-brand-gray-500">
                      <span>Rental</span>
                      <span className="text-brand-gray-700 font-medium">{d.rentalPeriod}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-brand-gray-100">
                    <span className="text-lg font-bold text-brand-gray-900">{d.priceRange}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/dumpster-rentals" variant="outline">
            Get a Dumpster Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
