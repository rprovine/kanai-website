import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/metadata";
import { locations } from "@/data/locations";

export const metadata: Metadata = generatePageMetadata({
  title: "Service Areas",
  description:
    "Kana'i's Junk Removal serves all of Oahu, Hawaii. Find junk removal and dumpster rental services in your neighborhood.",
  path: "/locations",
});

const regions = [...new Set(locations.map((l) => l.region))];

export default function LocationsPage() {
  return (
    <>
      <section className="bg-black text-white pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Service <span className="text-brand-red">Areas</span>
            </h1>
            <p className="text-lg text-brand-gray-300 mb-6">
              We proudly serve all of Oahu — from Hawaii Kai to Kapolei, North Shore to
              Waimanalo, and everywhere in between.
            </p>
            <Button href="/book-now">Book Free Estimate</Button>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          {regions.map((region) => {
            const regionLocations = locations.filter((l) => l.region === region);
            return (
              <div key={region} className="mb-12">
                <h2 className="text-2xl font-bold mb-4 border-b border-brand-gray-200 pb-2">
                  {region}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {regionLocations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      className="text-sm text-brand-gray-600 hover:text-brand-red transition-colors py-1"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </>
  );
}
