"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StarRating } from "@/components/ui/StarRating";
import { siteConfig } from "@/data/site";

interface Review {
  name: string;
  text: string;
  rating: number;
  date: string;
}

const reviews: Review[] = [
  {
    name: "Sarah M.",
    text: "Incredible service! They showed up on time, worked fast, and left the place spotless. Best junk removal on the island.",
    rating: 5,
    date: "2 weeks ago",
  },
  {
    name: "David K.",
    text: "Used their dumpster rental for a renovation project. Delivery and pickup were seamless. Great pricing compared to competitors.",
    rating: 5,
    date: "1 month ago",
  },
  {
    name: "Lisa T.",
    text: "These guys are the real deal. Cleared out my entire garage in under two hours. Professional, friendly, and affordable.",
    rating: 5,
    date: "3 weeks ago",
  },
  {
    name: "Mike R.",
    text: "Called in the morning and they were at my place by noon. Took everything including an old hot tub. Highly recommend!",
    rating: 5,
    date: "1 month ago",
  },
  {
    name: "Jennifer L.",
    text: "We use Kanai's for our commercial property cleanouts. Always reliable, always professional. They're our go-to service.",
    rating: 5,
    date: "2 months ago",
  },
  {
    name: "Brandon W.",
    text: "Fair pricing, no hidden fees, and they recycled everything they could. Love that they care about the environment.",
    rating: 5,
    date: "3 weeks ago",
  },
];

export function ReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section background="light" padding="lg" id="reviews">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-brand-gray-500">
            {siteConfig.reviews.count}+ five-star reviews on Google
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-brand-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <StarRating rating={review.rating} size="sm" />
              <p className="mt-4 text-brand-gray-600 leading-relaxed text-sm">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-brand-gray-900 text-sm">
                  {review.name}
                </span>
                <span className="text-xs text-brand-gray-400">{review.date}</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-brand-gray-400">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google Review
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="bg-white rounded-2xl p-6 shadow-sm border border-brand-gray-100"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <StarRating rating={reviews[activeIndex].rating} size="sm" />
              <p className="mt-4 text-brand-gray-600 leading-relaxed">
                &ldquo;{reviews[activeIndex].text}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-brand-gray-900">
                  {reviews[activeIndex].name}
                </span>
                <span className="text-xs text-brand-gray-400">
                  {reviews[activeIndex].date}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === activeIndex ? "bg-brand-red w-6" : "bg-brand-gray-300"
                )}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* See all reviews link */}
        <div className="text-center mt-10">
          <Link
            href={siteConfig.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-red font-semibold hover:underline"
          >
            See All Reviews
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
