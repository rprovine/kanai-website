"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { dumpsterSizes } from "@/data/dumpsters";

export function DumpsterPreview() {
  return (
    <Section background="white" padding="lg" id="dumpster-rentals">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">
            Dumpster Rentals
          </h2>
          <p className="mt-4 text-lg text-brand-gray-500 max-w-2xl mx-auto">
            From small cleanouts to major construction, we have the right size for your project.
          </p>
        </div>
      </Container>

      {/* Horizontal scroll container */}
      <div className="overflow-x-auto pb-4 -mb-4 scrollbar-thin">
        <div className="flex gap-6 px-4 sm:px-6 lg:px-8 min-w-max mx-auto max-w-7xl">
          {dumpsterSizes.map((dumpster, i) => (
            <motion.div
              key={dumpster.slug}
              className={cn(
                "flex-shrink-0 w-72 rounded-2xl border border-brand-gray-200 p-6",
                "hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-red/5",
                "transition-all duration-300 bg-white"
              )}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Size badge */}
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-brand-red">
                  {dumpster.size}
                </span>
                <span className="text-lg font-semibold text-brand-gray-500">
                  yard
                </span>
              </div>

              {/* Dimensions */}
              <p className="text-sm text-brand-gray-400 mb-4">
                {dumpster.dimensions}
              </p>

              {/* Capacity */}
              <p className="text-sm text-brand-gray-600 mb-2">
                {dumpster.capacity}
              </p>

              {/* Weight */}
              <p className="text-sm text-brand-gray-400 mb-6">
                {dumpster.weight}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-xl font-bold text-brand-gray-900">
                  {dumpster.priceRange}
                </span>
              </div>

              {/* CTA */}
              <Button
                href={`/dumpster-rentals/${dumpster.slug}`}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Get Quote
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
