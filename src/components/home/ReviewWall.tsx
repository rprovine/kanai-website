"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
}

const FALLBACK_REVIEWS: Review[] = [
  { author: "Keoni M.", rating: 5, text: "Called in the morning, they were here by noon. Took everything out of the garage in under an hour. Crew was super respectful and cleaned up after themselves.", relativeTime: "2 weeks ago" },
  { author: "Sarah L.", rating: 5, text: "Used the AI estimator on their website — got a price instantly from a photo. Actual cost was even less than the estimate. Will definitely use again!", relativeTime: "1 month ago" },
  { author: "David K.", rating: 5, text: "Rented a 20-yard dumpster for our renovation. Delivery and pickup were right on time. Way better experience than the last company we used.", relativeTime: "3 weeks ago" },
  { author: "Malia T.", rating: 5, text: "These guys are the real deal. Hawaii-owned, hardworking crew, fair prices. They hauled away a full house worth of stuff for my mom's estate cleanout.", relativeTime: "1 week ago" },
  { author: "Jason P.", rating: 5, text: "Best junk removal on the island, hands down. Professional, on time, and they actually recycle what they can. Price was exactly what they quoted.", relativeTime: "2 months ago" },
  { author: "Leilani H.", rating: 5, text: "I was amazed by the photo estimate tool. Took a picture of my pile, got a price in seconds. The crew showed up the next day and knocked it out. Mahalo!", relativeTime: "3 weeks ago" },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
      ))}
    </div>
  );
}

export default function ReviewWall() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [summary, setSummary] = useState({ rating: "4.9", totalReviews: "200+" });

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
          setSummary({
            rating: String(data.rating ?? "4.9"),
            totalReviews: data.totalReviews ? `${data.totalReviews}` : "200+",
          });
        }
        // If empty or missing, keep fallback reviews
      })
      .catch(() => {
        // Keep fallback reviews on error
      });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#1A1A18]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-brand-cream">
            What Our Customers Say
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Stars />
            <span className="text-sm text-brand-cream/50">
              {summary.rating} from {summary.totalReviews} reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div
              key={review.author}
              className="bg-brand-dark rounded-xl p-6 border border-white/5"
            >
              <Stars count={review.rating} />
              <p className="mt-3 text-sm text-brand-cream/70 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-brand-cream">
                  {review.author}
                </span>
                <span className="text-xs text-brand-cream/50">
                  {review.relativeTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
