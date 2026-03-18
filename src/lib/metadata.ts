import { Metadata } from "next";
import { siteConfig } from "@/data/site";

interface MetadataParams {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function generatePageMetadata({ title, description, path, image }: MetadataParams): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/images/og-default.jpg`;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: `${siteConfig.url}/images/logo.png`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.3069,
      longitude: -157.8583,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviews.rating,
      reviewCount: siteConfig.reviews.count,
      bestRating: 5,
    },
    areaServed: {
      "@type": "Place",
      name: siteConfig.serviceArea,
    },
    priceRange: "$$",
    foundingDate: siteConfig.founded.toString(),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateServiceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteConfig.url}${url}`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
    },
    areaServed: {
      "@type": "Place",
      name: siteConfig.serviceArea,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviews.rating,
      reviewCount: siteConfig.reviews.count,
    },
  };
}
