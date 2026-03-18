"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { trackPhoneClick } from "@/lib/tracking";

export function CTASection() {
  return (
    <section className="bg-brand-red py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
              Ready to clear the clutter?
            </h2>
            <p className="mt-2 text-white/70 text-sm md:text-base">
              Free estimates. Same-day service. We handle everything.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button href="/book-now" variant="white" className="text-brand-red font-bold">
              Book Free Estimate
            </Button>
            <Button
              href={siteConfig.phoneHref}
              variant="ghost"
              className="text-white border border-white/30 hover:border-white hover:bg-white/10 hover:text-white"
              onClick={trackPhoneClick}
            >
              Call {siteConfig.phone}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
