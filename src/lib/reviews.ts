// Placeholder for Google Places API integration
// When GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set,
// this will fetch real reviews at build time

export interface GoogleReview {
  name: string;
  text: string;
  rating: number;
  date: string;
  profilePhoto?: string;
}

export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return []; // Return empty — component will use fallback reviews
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );
    const data = await res.json();

    if (!data.result?.reviews) return [];

    return data.result.reviews.map((r: any) => ({
      name: r.author_name,
      text: r.text,
      rating: r.rating,
      date: r.relative_time_description,
      profilePhoto: r.profile_photo_url,
    }));
  } catch {
    return [];
  }
}
