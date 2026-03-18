"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Junk Removal",
    description: "Furniture, appliances, yard waste — point and it's gone.",
    href: "/services/junk-removal",
    image: "/images/services/junk-removal.jpg",
    span: "md:col-span-2 md:row-span-2",
    featured: true,
  },
  {
    title: "Dumpster Rentals",
    description: "7–30 yard containers delivered fast.",
    href: "/dumpster-rentals",
    image: "/images/services/dumpster-rental.jpg",
  },
  {
    title: "Estate Cleanouts",
    description: "Full property clearing with care.",
    href: "/services/estate-cleanout",
    image: "/images/services/loading-debris.jpg",
  },
  {
    title: "Demolition",
    description: "Decks, sheds, fences — torn down and hauled.",
    href: "/services/demolition-services",
    image: "/images/services/demolition.jpg",
  },
  {
    title: "Commercial",
    description: "Offices, retail, warehouses on your schedule.",
    href: "/services/commercial-junk-removal",
    image: "/images/services/loading-dumpster.jpg",
  },
];

export function ServicesOverview() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-red font-semibold">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900 mt-2">Services</h2>
          </div>
          <Link href="/services" className="text-brand-gray-500 hover:text-brand-red text-sm transition-colors flex items-center gap-1.5 group">
            All 18 services
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className={s.span || ""}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
            >
              <Link
                href={s.href}
                className={cn(
                  "group relative block h-full rounded-xl overflow-hidden",
                  s.featured ? "min-h-[350px] md:min-h-[440px]" : "min-h-[200px]"
                )}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={s.featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className={cn("font-bold text-white", s.featured ? "text-2xl md:text-3xl" : "text-lg")}>
                    {s.title}
                  </h3>
                  <p className={cn("text-white/60 mt-1", s.featured ? "text-sm" : "text-xs")}>
                    {s.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
