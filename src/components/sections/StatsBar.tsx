"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 744, suffix: "+", label: "5-Star Reviews" },
  { value: 100, suffix: "%", label: "Satisfaction" },
  { value: 5, suffix: ".0", label: "Google Rating" },
  { value: 2021, suffix: "", label: "Established", isYear: true },
];

function Counter({ value, suffix, isYear }: { value: number; suffix: string; isYear?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (isYear || prefersReducedMotion) { setCount(value); return; }
    let current = 0;
    const increment = value / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 37);
    return () => clearInterval(timer);
  }, [inView, value, isYear, prefersReducedMotion]);

  return <span ref={ref}>{isYear ? value : count}{suffix}</span>;
}

export function StatsBar() {
  return (
    <section className="bg-brand-gray-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="py-8 md:py-10 px-4 text-center border-r border-white/5 last:border-r-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tabular-nums">
                <Counter value={stat.value} suffix={stat.suffix} isYear={stat.isYear} />
              </div>
              <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.12em] text-brand-gray-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
