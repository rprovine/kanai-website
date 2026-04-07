import type { MetadataRoute } from "next";

const BASE_URL = "https://kanaijunkremoval.com";

const neighborhoodSlugs = [
  "kapolei",
  "ewa-beach",
  "pearl-city",
  "aiea",
  "mililani",
  "kailua",
  "kaneohe",
  "waipahu",
  "hawaii-kai",
  "makakilo",
  "halawa",
  "moanalua",
  "salt-lake",
  "honolulu",
  "manoa",
  "kaimuki",
  "kahala",
  "waikele",
  "waipio",
  "wahiawa",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/junk-removal`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/dumpster-rental`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/estimate`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/quote`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/book`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/service-area`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoodSlugs.map((slug) => ({
    url: `${BASE_URL}/service-area/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...neighborhoodPages];
}
