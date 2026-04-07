const BASE_URL = "https://kanaijunkremoval.com";

export function getLocalBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kana'i's Roll Off & Junk Removal",
    image: `${BASE_URL}/og-image.jpg`,
    url: BASE_URL,
    telephone: "(808) 201-2668",
    email: "info@kanaisrolloff.com",
    priceRange: "$187-$980",
    address: {
      "@type": "PostalAddress",
      streetAddress: "99-1295 Waiua Pl",
      addressLocality: "Aiea",
      addressRegion: "HI",
      postalCode: "96701",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.3712753,
      longitude: -157.9043678,
    },
    areaServed: {
      "@type": "Place",
      name: "Oahu, Hawaii",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
      bestRating: "5",
    },
  };
}

export function getServiceSchema(
  name: string,
  description: string,
  url: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${BASE_URL}${url}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Kana'i's Roll Off & Junk Removal",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Oahu, Hawaii",
    },
  };
}

export function getFAQSchema(
  faqs: { q: string; a: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}
