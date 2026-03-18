import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Tips, guides, and news about junk removal, recycling, and home cleanouts from Kana'i's Junk Removal.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <section className="bg-black text-white py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-brand-red">Blog</span>
            </h1>
            <p className="text-lg text-brand-gray-300">
              Tips, guides, and news about junk removal and keeping Oahu clean.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center">
            <p className="text-brand-gray-500 text-lg mb-8">
              Blog posts coming soon. In the meantime, get a free estimate for your project.
            </p>
            <Button href="/book-now">Get a Free Estimate</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
