"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";

interface Review {
  name: string;
  text: string;
  rating: number;
  date: string;
}

const fallbackReviews: Review[] = [
  { name: "Sarah M.", text: "Incredible service! Showed up on time, worked fast, left the place spotless. Best on the island.", rating: 5, date: "2 weeks ago" },
  { name: "David K.", text: "Used their dumpster rental for a renovation. Delivery and pickup were seamless. Great pricing.", rating: 5, date: "1 month ago" },
  { name: "Lisa T.", text: "Cleared out my entire garage in under two hours. Professional, friendly, and affordable.", rating: 5, date: "3 weeks ago" },
  { name: "Mike R.", text: "Called in the morning, they were there by noon. Took everything including an old hot tub.", rating: 5, date: "1 month ago" },
  { name: "Jennifer L.", text: "We use Kanai's for all our commercial cleanouts. Always reliable, always professional.", rating: 5, date: "2 months ago" },
  { name: "Brandon W.", text: "Fair pricing, no hidden fees, and they recycled everything they could.", rating: 5, date: "3 weeks ago" },
];

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= rating ? "text-yellow-400" : "text-brand-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface ReviewsCarouselProps {
  reviews?: Review[];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const displayReviews = reviews && reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <section className="bg-brand-gray-50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-red font-semibold">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900 mt-2">{siteConfig.reviews.count}+ happy customers</h2>
          </div>
          <a href={siteConfig.social.google} target="_blank" rel="noopener noreferrer" className="text-brand-gray-500 hover:text-brand-red text-sm transition-colors flex items-center gap-1.5">
            See all on Google
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((r, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-brand-gray-100"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Stars rating={r.rating} />
              <p className="mt-4 text-brand-gray-600 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-brand-gray-900 font-semibold text-sm">{r.name}</p>
                  <p className="text-brand-gray-400 text-xs mt-0.5">{r.date}</p>
                </div>
                <svg className="w-5 h-5 text-brand-gray-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          className="mt-12 rounded-2xl bg-brand-gray-900 p-8 md:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">Join {siteConfig.reviews.count}+ satisfied customers</h3>
            <p className="text-brand-gray-400 mt-1">Free estimate in under 60 seconds.</p>
          </div>
          <Button href="/book-now" className="shrink-0">Get Free Estimate</Button>
        </motion.div>
      </div>
    </section>
  );
}
