"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  end: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

function Counter({ end, suffix = "+", decimals = 0, label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView || end === 0) return;
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * end);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-5xl md:text-6xl font-black text-brand-amber">
        {decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-brand-cream/50">{label}</div>
    </div>
  );
}

// Fallback values while API loads or if it fails
const FALLBACK = { jobsCompleted: 390, tonsDiverted: 285, googleRating: 4.9 };

export default function StatCounter() {
  const [stats, setStats] = useState(FALLBACK);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.jobsCompleted > 0) {
          setStats({
            jobsCompleted: data.jobsCompleted,
            tonsDiverted: data.tonsDiverted,
            googleRating: data.googleRating || 4.9,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Counter end={stats.jobsCompleted} label="Jobs Completed in 2026" />
          <Counter end={stats.tonsDiverted} label="Tons Diverted in 2026" />
          <Counter end={stats.googleRating} suffix="" decimals={1} label="Average Google Rating" />
        </div>
      </div>
    </section>
  );
}
