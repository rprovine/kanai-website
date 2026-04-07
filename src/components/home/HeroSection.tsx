"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Photo */}
      <Image
        src="/images/hero-truck.jpg"
        alt="Kana'i's Roll Off truck on Oahu"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-brand-dark/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-brand-dark/30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-heading text-5xl md:text-7xl font-black text-brand-cream tracking-tight leading-[1.1]"
        >
          Hawaii&apos;s Cleanest Haul.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mt-5 text-xl md:text-2xl text-brand-cream/60 max-w-xl mx-auto"
        >
          Snap a photo. Get a price. Book in minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/estimate"
            className="w-full sm:w-auto bg-brand-amber hover:bg-brand-amber-dark text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors text-center"
          >
            Get Instant Estimate
          </Link>
          <Link
            href="/book"
            className="w-full sm:w-auto border border-brand-cream/30 hover:border-brand-cream/50 text-brand-cream font-bold text-lg px-8 py-4 rounded-lg transition-colors text-center"
          >
            Book Online
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
