"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/data/site";
import { trackPhoneClick, trackCtaClick } from "@/lib/tracking";

const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-brand-red/20"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-black flex items-center overflow-hidden">
      {/* Gradient background (visible behind 3D scene / as fallback) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-brand-gray-950 to-brand-red/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-red)/8%,transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Floating particles (CSS fallback) */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingParticle delay={0} x="10%" y="20%" size={6} />
        <FloatingParticle delay={0.5} x="85%" y="30%" size={8} />
        <FloatingParticle delay={1} x="70%" y="60%" size={5} />
        <FloatingParticle delay={1.5} x="25%" y="70%" size={7} />
        <FloatingParticle delay={2} x="50%" y="15%" size={4} />
        <FloatingParticle delay={0.8} x="90%" y="75%" size={6} />
        <FloatingParticle delay={1.2} x="15%" y="50%" size={5} />
        <FloatingParticle delay={2.5} x="60%" y="80%" size={8} />
      </div>

      {/* 3D Scene (right side on desktop) */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute right-0 top-0 bottom-0 w-1/2">
          <HeroScene />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-4xl lg:max-w-2xl">
          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Badge variant="light" className="mb-8">
              <StarRating rating={siteConfig.reviews.rating} size="sm" />
              <span className="text-white/90">
                {siteConfig.reviews.rating} stars &middot; {siteConfig.reviews.count}+ reviews
              </span>
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            You Call,{" "}
            <span className="text-brand-red inline-block">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                We Haul
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="mt-6 text-lg md:text-xl text-brand-gray-400 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Oahu&rsquo;s #1 junk removal and dumpster rental service.{" "}
            <span className="text-white font-medium">{siteConfig.reviews.count}+ five-star reviews.</span>{" "}
            Fast, affordable, eco-friendly.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
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
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-gray-900"
              onClick={trackPhoneClick}
            >
              Call {siteConfig.phone}
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-8 flex items-center gap-6 text-sm text-brand-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Licensed &amp; Insured
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Same-Day Service
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Eco-Friendly
            </span>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
