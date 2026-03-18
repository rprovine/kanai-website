"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function CTASection() {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      {/* Red accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-brand-red/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Ready to Clear the Clutter?
          </h2>
          <p className="mt-6 text-lg text-brand-gray-400 max-w-xl mx-auto">
            Get a free, no-obligation estimate today. Same-day service available across Oahu.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/book-now" size="lg">
              Book Now
            </Button>
            <Button
              href={siteConfig.phoneHref}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-gray-900"
            >
              Call {siteConfig.phone}
            </Button>
          </div>

          <p className="mt-8 text-sm text-brand-gray-500">
            Or call us directly at{" "}
            <a
              href={siteConfig.phoneHref}
              className="text-brand-red hover:underline font-medium"
            >
              {siteConfig.phone}
            </a>
            {" "}&mdash; we answer 7 days a week.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
