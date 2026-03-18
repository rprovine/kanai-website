"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

interface Stat {
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: "744+", numericValue: 744, suffix: "+", label: "Reviews" },
  { value: "5.0", numericValue: 5, suffix: ".0", label: "Star Rating" },
  { value: "Since 2021", label: "Founded" },
  { value: "100%", numericValue: 100, suffix: "%", label: "Satisfaction" },
];

function AnimatedNumber({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {value === 5 ? count.toFixed(1).replace(".0", "") + suffix : count}
      {value !== 5 && suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="bg-brand-red py-8 md:py-12">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white">
                {stat.numericValue !== undefined ? (
                  <AnimatedNumber value={stat.numericValue} suffix={stat.suffix || ""} />
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-sm md:text-base text-white/80 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
