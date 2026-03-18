"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const steps = [
  {
    number: 1,
    title: "Book",
    description: "Schedule online or call us for a free estimate. We offer same-day and next-day availability.",
  },
  {
    number: 2,
    title: "Arrive",
    description: "Our crew arrives on time in a fully equipped truck, ready to work.",
  },
  {
    number: 3,
    title: "Remove",
    description: "We handle all the heavy lifting. Just point to what goes and we take care of the rest.",
  },
  {
    number: 4,
    title: "Dispose Responsibly",
    description: "We recycle and donate whenever possible, keeping Oahu clean and green.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function ProcessSteps() {
  return (
    <Section background="light" padding="lg" id="how-it-works">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-brand-gray-500 max-w-2xl mx-auto">
            Getting rid of junk has never been easier. Four simple steps to a clutter-free space.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-brand-red/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="flex flex-col items-center text-center relative"
            >
              {/* Step number circle */}
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center",
                  "bg-brand-red text-white text-xl font-bold",
                  "relative z-10 shadow-lg shadow-brand-red/25"
                )}
              >
                {step.number}
              </div>

              {/* Vertical connector on mobile */}
              {i < steps.length - 1 && (
                <div className="md:hidden w-0.5 h-8 bg-brand-red/20 my-2" />
              )}

              <h3 className="mt-4 md:mt-6 text-lg font-bold text-brand-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-brand-gray-500 max-w-xs leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
