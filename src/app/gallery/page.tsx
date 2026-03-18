import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Gallery",
  description:
    "See before and after photos of our junk removal, dumpster rental, and cleanout projects across Oahu.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <section className="bg-black text-white py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-brand-red">Work</span>
            </h1>
            <p className="text-lg text-brand-gray-300">
              See the results for yourself. Before and after shots from recent projects.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center">
            <p className="text-brand-gray-500 text-lg mb-8">
              Gallery coming soon — check back for before and after photos from our latest projects.
            </p>
            <Button href="/book-now">Get a Free Estimate</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
