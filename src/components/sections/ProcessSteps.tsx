"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const steps = [
  { num: "01", title: "Book", text: "Schedule online in 30 seconds or call us. Same-day slots available." },
  { num: "02", title: "We Show Up", text: "Our crew arrives on time with everything needed." },
  { num: "03", title: "Point & Gone", text: "Show us what goes. We load, sweep up, done." },
  { num: "04", title: "Eco Disposal", text: "We recycle, donate, and only landfill as last resort." },
];

export function ProcessSteps() {
  return (
    <section className="bg-brand-gray-50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 lg:gap-x-16">
          {/* Left */}
          <div className="lg:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-red font-semibold">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900 mt-2 leading-snug">
              Four steps to a <span className="text-brand-red">clean space</span>
            </h2>
            <p className="mt-3 text-sm text-brand-gray-500 leading-relaxed">
              No complicated process. No hidden surprises.
            </p>
            <div className="mt-6">
              <Button href="/book-now" size="md">Book Now — It&apos;s Free</Button>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 lg:col-start-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="group flex gap-5 py-6 border-b border-brand-gray-100 last:border-0"
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              >
                <span className="text-4xl md:text-5xl font-bold text-brand-gray-200 group-hover:text-brand-red/30 transition-colors shrink-0 leading-none w-14 tabular-nums">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-brand-gray-900 group-hover:text-brand-red transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-gray-500 leading-relaxed">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
