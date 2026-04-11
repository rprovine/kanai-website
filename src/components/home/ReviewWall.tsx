"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Star, ExternalLink, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
}

const FALLBACK_REVIEWS: Review[] = [
  { author: "Keoni M.", rating: 5, text: "Called in the morning, they were here by noon. Took everything out of the garage in under an hour. Crew was super respectful and cleaned up after themselves.", relativeTime: "2 weeks ago" },
  { author: "Sarah L.", rating: 5, text: "Used the AI estimator on their website \u2014 got a price instantly from a photo. Actual cost was even less than the estimate. Will definitely use again!", relativeTime: "1 month ago" },
  { author: "David K.", rating: 5, text: "Rented a 20-yard dumpster for our renovation. Delivery and pickup were right on time. Way better experience than the last company we used.", relativeTime: "3 weeks ago" },
  { author: "Malia T.", rating: 5, text: "These guys are the real deal. Hawaii-owned, hardworking crew, fair prices. They hauled away a full house worth of stuff for my mom\u2019s estate cleanout.", relativeTime: "1 week ago" },
  { author: "Jason P.", rating: 5, text: "Best junk removal on the island, hands down. Professional, on time, and they actually recycle what they can. Price was exactly what they quoted.", relativeTime: "2 months ago" },
];

const VIDEO_TESTIMONIALS = [
  {
    id: "41ZoyFo-8T4",
    youtubeUrl: "https://www.youtube.com/shorts/41ZoyFo-8T4",
    name: "Customer Review",
    caption: "See what our customers have to say",
  },
  {
    id: "ekt5GOuxg9Q",
    youtubeUrl: "https://www.youtube.com/shorts/ekt5GOuxg9Q",
    name: "Customer Review",
    caption: "Another happy Oahu customer",
  },
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

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

const TRUNCATE_LENGTH = 120;

function ReviewCard({ review }: { review: Review }) {
  const isLong = review.text.length > TRUNCATE_LENGTH;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-brand-dark rounded-xl p-6 border border-white/5 flex flex-col h-full">
      <Stars count={review.rating} />
      <p className="mt-3 text-sm text-brand-cream/70 leading-relaxed flex-1">
        &ldquo;{expanded || !isLong ? review.text : `${review.text.slice(0, TRUNCATE_LENGTH).trimEnd()}...`}&rdquo;
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1.5 text-xs font-semibold text-brand-amber hover:text-brand-amber-light transition-colors self-start"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-brand-cream">{review.author}</span>
        <span className="text-xs text-brand-cream/50">{review.relativeTime}</span>
      </div>
    </div>
  );
}

export default function ReviewWall() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [summary, setSummary] = useState({ rating: "4.9", totalReviews: "200+" });
  const [mobileIdx, setMobileIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      })
      .catch(() => {});
  }, []);

  // Auto-advance mobile carousel every 5s
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setMobileIdx((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [reviews.length]);

  // Scroll carousel horizontally to the active card (without moving the page)
  useEffect(() => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[mobileIdx] as HTMLElement | undefined;
    if (!card) return;
    scrollRef.current.scrollTo({
      left: card.offsetLeft - scrollRef.current.offsetLeft - 16,
      behavior: "smooth",
    });
  }, [mobileIdx]);

  const goMobile = useCallback((dir: number) => {
    setMobileIdx((prev) => {
      const next = prev + dir;
      if (next < 0) return reviews.length - 1;
      if (next >= reviews.length) return 0;
      return next;
    });
  }, [reviews.length]);

  return (
    <section className="py-16 md:py-24 bg-[#1A1A18]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Hero stat badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-3 bg-brand-amber/10 border border-brand-amber/20 rounded-full px-6 py-3">
            <div className="flex items-center gap-1.5">
              <Star className="w-6 h-6 fill-brand-amber text-brand-amber" />
              <span className="text-3xl font-black text-brand-amber">{summary.rating}</span>
            </div>
            <div className="h-8 w-px bg-brand-amber/20" />
            <div className="text-left">
              <p className="text-lg font-bold text-brand-cream leading-tight">{summary.totalReviews}+</p>
              <p className="text-xs text-brand-cream/50">Five-Star Reviews</p>
            </div>
            <GoogleLogo />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-brand-cream">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-sm text-brand-cream/50 max-w-md mx-auto">
            Real reviews from real Oahu customers. See why we&apos;re the highest-rated junk removal and dumpster rental company on the island.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.author} review={review} />
          ))}
          {/* Fill the empty grid slot with a CTA card */}
          {reviews.length % 3 !== 0 && (
            <a
              href="https://g.page/r/CSPVqkUojBN8EBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-brand-amber/10 to-brand-amber/5 rounded-xl p-6 border border-brand-amber/20 flex flex-col items-center justify-center text-center gap-3 hover:border-brand-amber/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-brand-amber/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-brand-amber fill-brand-amber" />
              </div>
              <p className="text-lg font-bold text-brand-cream">Love our service?</p>
              <p className="text-sm text-brand-cream/50">Share your experience and help other Oahu families find us.</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-amber group-hover:text-brand-amber-light transition-colors">
                Write a Review <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          )}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-snap-x snap-mandatory scrollbar-hide px-1 pb-2"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            onTouchStart={() => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); }}
          >
            {reviews.map((review) => (
              <div
                key={review.author}
                className="flex-shrink-0 w-[85vw] max-w-sm snap-center"
                style={{ scrollSnapAlign: "center" }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => goMobile(-1)}
              className="p-2 rounded-full bg-white/5 text-brand-cream/50 hover:text-brand-cream active:scale-95 transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === mobileIdx ? "bg-brand-amber w-5" : "bg-white/20"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => goMobile(1)}
              className="p-2 rounded-full bg-white/5 text-brand-cream/50 hover:text-brand-cream active:scale-95 transition-all"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video testimonials */}
        {VIDEO_TESTIMONIALS.length > 0 && (
          <div className="mt-10">
            <h3 className="text-center text-sm font-bold uppercase tracking-wider text-brand-cream/40 mb-4">
              Video Testimonials
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {VIDEO_TESTIMONIALS.map((video) => (
                <div key={video.id} className="rounded-xl overflow-hidden border border-white/5 bg-brand-dark w-full max-w-[280px]">
                  <div className="aspect-[9/16] bg-black relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                      title={video.caption}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-brand-cream">{video.name}</p>
                      <p className="text-xs text-brand-cream/50">{video.caption}</p>
                    </div>
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-2 rounded-lg bg-white/5 text-brand-cream/50 hover:text-brand-cream hover:bg-white/10 transition-colors"
                      title="Open in YouTube"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://search.google.com/local/reviews?placeid=ChIJvX0Up5trAHwRI9WqRSiME3w"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-brand-cream/70 hover:text-brand-cream hover:border-brand-amber/30 transition-colors text-sm font-medium"
          >
            Read All {summary.totalReviews} Reviews
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://g.page/r/CSPVqkUojBN8EBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-amber text-brand-dark hover:bg-brand-amber-light transition-colors text-sm font-bold"
          >
            <Star className="w-4 h-4 fill-brand-dark" />
            Leave Us a Review
          </a>
        </div>
      </div>
    </section>
  );
}
