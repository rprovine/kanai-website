"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const services = [
  {
    title: "Junk Removal",
    description:
      "From single items to full property cleanouts, we handle it all. Same-day service available across Oahu.",
    href: "/services/junk-removal",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 32h24M6 12h28l-2 20H8L6 12zM16 6h8l2 6H14l2-6z" />
      </svg>
    ),
  },
  {
    title: "Dumpster Rentals",
    description:
      "10 to 40 yard dumpsters delivered to your door. Flexible rental periods for any size project.",
    href: "/dumpster-rentals",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 28h32M6 14h28v14H6V14zM10 14V10h20v4M14 20v4M20 20v4M26 20v4" />
      </svg>
    ),
  },
  {
    title: "Commercial Services",
    description:
      "Reliable waste removal for businesses, property managers, and construction sites. Scheduled or on-demand.",
    href: "/services/commercial-junk-removal",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 34V10l14-6 14 6v24M6 10l14 4 14-4M20 14v20M10 18v4M16 18v4M24 18v4M30 18v4M10 26v4M16 26v4M24 26v4M30 26v4" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function ServicesOverview() {
  return (
    <Section background="white" padding="lg" id="services">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-brand-gray-500 max-w-2xl mx-auto">
            Whatever the job, we&rsquo;ve got you covered with fast, reliable service on Oahu.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Link
                href={service.href}
                className={cn(
                  "group block rounded-2xl border border-brand-gray-200 p-8",
                  "hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-red/5",
                  "transition-all duration-300"
                )}
              >
                <div className="text-brand-red mb-5">{service.icon}</div>
                <h3 className="text-xl font-bold text-brand-gray-900 group-hover:text-brand-red transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-brand-gray-500 leading-relaxed">
                  {service.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
