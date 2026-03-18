import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/metadata";
import { GalleryGrid } from "./GalleryGrid";

export const metadata: Metadata = generatePageMetadata({
  title: "Gallery",
  description:
    "See before and after photos of our junk removal, dumpster rental, and cleanout projects across Oahu.",
  path: "/gallery",
});

const galleryItems = [
  {
    title: "Garage Cleanout",
    description: "Full garage cleared and swept clean in under 3 hours.",
    image: "/images/services/loading-debris.jpg",
  },
  {
    title: "Dumpster Delivery",
    description: "20-yard dumpster delivered and placed for a home renovation project.",
    image: "/images/services/dumpster-rental.jpg",
  },
  {
    title: "Furniture Removal",
    description: "Old furniture hauled away — couch, loveseat, and dining set.",
    image: "/images/services/junk-removal.jpg",
  },
  {
    title: "Demolition Work",
    description: "Shed tear-down and full debris removal completed in one day.",
    image: "/images/services/demolition.jpg",
  },
  {
    title: "Estate Cleanout",
    description: "Complete estate cleanout including sorting, hauling, and donation drop-off.",
    image: "/images/services/loading-dumpster.jpg",
  },
  {
    title: "Mattress Removal",
    description: "Multiple mattresses and box springs picked up and responsibly disposed.",
    image: "/images/services/mattress-removal.jpg",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-red font-semibold">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Our <span className="text-brand-red">Work</span>
            </h1>
            <p className="text-lg text-brand-gray-300">
              Browse recent projects from across Oahu. From garage cleanouts to
              full estate clear-outs, see the results for yourself.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery grid */}
      <section className="py-24 sm:py-32">
        <Container>
          <GalleryGrid items={galleryItems} />
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-brand-gray-950 py-24 sm:py-32">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to transform your space?
            </h2>
            <p className="text-brand-gray-400 mb-8">
              Get a free, no-obligation estimate and see why {" "}
              hundreds of Oahu homeowners trust us with their junk removal.
            </p>
            <Button href="/book-now" size="lg">
              Get a Free Estimate
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
