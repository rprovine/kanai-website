"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { trackPhoneClick, trackCtaClick } from "@/lib/tracking";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="relative min-h-[100dvh] bg-brand-gray-950 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Kana'i's Junk Removal team at work"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        {/* Lighter overlay — let the image breathe */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content — vertically centered */}
      <div className="relative z-10 min-h-[100dvh] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-5"
                initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
              >
                <div className="w-6 h-px bg-brand-red" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-brand-red font-semibold">
                  Oahu&apos;s #1 Rated
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1] tracking-tight"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
              >
                You call,
                <br />
                <span className="text-brand-red">we haul.</span>
              </motion.h1>

              <motion.p
                className="mt-5 text-base sm:text-lg text-white/70 max-w-md leading-relaxed"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.25 }}
              >
                Professional junk removal &amp; dumpster rentals across Oahu.
                Same-day service. Eco-friendly disposal.
              </motion.p>

              <motion.div
                className="mt-7 flex flex-wrap gap-3"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.4 }}
              >
                <Button
                  href="/book-now"
                  size="lg"
                  onClick={() => trackCtaClick("hero_estimate", "hero")}
                >
                  Get Free Estimate
                </Button>
                <Button
                  href={siteConfig.phoneHref}
                  variant="ghost"
                  size="lg"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={trackPhoneClick}
                >
                  <svg className="w-4 h-4 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phone}
                </Button>
              </motion.div>

              {/* Trust row */}
              <motion.div
                className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.6, duration: 0.4 }}
              >
                {["Licensed & Insured", "Same-Day Service", "Eco-Friendly"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand-red" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — social proof card */}
            <motion.div
              className="hidden lg:flex justify-end"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-5 w-full max-w-xs">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <Image
                    src="/images/hero/team.jpg"
                    alt="Kana'i's Junk Removal team"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-bold text-sm">{siteConfig.reviews.count}+</span>
                  <span className="text-white/50 text-xs">reviews</span>
                </div>
                <div className="flex gap-3 text-[10px] text-white/40 uppercase tracking-wider">
                  <span>Licensed</span>
                  <span>Insured</span>
                  <span>Since {siteConfig.founded}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
