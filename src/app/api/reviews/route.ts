import { NextResponse } from "next/server";

interface GoogleReview {
  authorAttribution?: { displayName?: string };
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
}

interface ReviewResponse {
  reviews: { author: string; rating: number; text: string; relativeTime: string }[];
  rating: number;
  totalReviews: number;
}

// In-memory cache with 1-hour TTL
let cache: { data: ReviewResponse; expiresAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const PLACE_ID = "ChIJvX0Up5trAHwRI9WqRSiME3w";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ reviews: [], rating: 0, totalReviews: 0 });
  }

  // Return cached data if still valid
  if (cache && Date.now() < cache.expiresAt) {
    return NextResponse.json(cache.data);
  }

  try {
    // Google Places API (New) — returns 5 most relevant reviews
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews,rating,userRatingCount",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Google Places API error:", res.status, await res.text());
      return NextResponse.json({ reviews: [], rating: 0, totalReviews: 0 });
    }

    const data = await res.json();

    const reviews = ((data.reviews as GoogleReview[]) ?? [])
      .slice(0, 5)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Anonymous",
        rating: r.rating ?? 5,
        text: r.text?.text ?? "",
        relativeTime: r.relativePublishTimeDescription ?? "",
      }));

    const result: ReviewResponse = {
      reviews,
      rating: data.rating ?? 0,
      totalReviews: data.userRatingCount ?? 0,
    };

    cache = { data: result, expiresAt: Date.now() + CACHE_TTL_MS };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Failed to fetch Google Places reviews:", err);
    return NextResponse.json({ reviews: [], rating: 0, totalReviews: 0 });
  }
}
