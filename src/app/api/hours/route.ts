import { NextResponse } from "next/server";

const PLACE_ID = "ChIJvX0Up5trAHwRI9WqRSiME3w";

interface HoursResponse {
  isOpen: boolean | null;
  hours: string[];
  openNow: string;
}

let cache: { data: HoursResponse; expiresAt: number } | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      isOpen: null,
      hours: [
        "Monday: 8:00 AM – 6:00 PM",
        "Tuesday: 8:00 AM – 6:00 PM",
        "Wednesday: 8:00 AM – 6:00 PM",
        "Thursday: 8:00 AM – 6:00 PM",
        "Friday: 8:00 AM – 6:00 PM",
        "Saturday: 8:00 AM – 6:00 PM",
        "Sunday: Closed",
      ],
      openNow: "",
    });
  }

  if (cache && Date.now() < cache.expiresAt) {
    return NextResponse.json(cache.data);
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "currentOpeningHours,regularOpeningHours",
      },
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      console.error("Google Places hours error:", res.status);
      return NextResponse.json({ isOpen: null, hours: [], openNow: "" });
    }

    const data = await res.json();
    const current = data.currentOpeningHours || data.regularOpeningHours;
    const isOpen = current?.openNow ?? null;
    const hours = (current?.weekdayDescriptions as string[]) ?? [];

    const openNow = isOpen === true ? "Open Now" : isOpen === false ? "Closed" : "";

    const result: HoursResponse = { isOpen, hours, openNow };
    cache = { data: result, expiresAt: Date.now() + CACHE_TTL_MS };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Hours API error:", err);
    return NextResponse.json({ isOpen: null, hours: [], openNow: "" });
  }
}
