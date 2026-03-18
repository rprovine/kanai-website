import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about Kana'i's Junk Removal — Oahu's most trusted junk removal company. Family-owned, eco-friendly, community-focused since 2021.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-black text-white py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-brand-red">Kana&apos;i&apos;s</span>
            </h1>
            <p className="text-lg text-brand-gray-300">
              More than junk removal — we&apos;re building a cleaner Oahu, one haul at a time.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg text-brand-gray-700 space-y-4">
              <p>
                Kana&apos;i&apos;s Junk Removal was founded in 2021 with a simple mission: provide Oahu
                with fast, affordable, and eco-friendly junk removal services. What started as a
                one-truck operation has grown into one of the island&apos;s most trusted hauling companies.
              </p>
              <p>
                With over {siteConfig.reviews.count} five-star Google reviews, we&apos;ve earned our
                reputation through hard work, honest pricing, and a commitment to doing things right.
                Every load we haul, we sort for donations and recycling first — because keeping Hawaii
                beautiful matters to us.
              </p>
              <p>
                We serve all of Oahu, from downtown Honolulu to the North Shore, Windward to Leeward.
                Whether it&apos;s a single couch or a full estate cleanout, our team shows up on time,
                works hard, and leaves your space clean.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-gray-50 py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Honest Pricing",
                description: "No hidden fees, no surprises. We quote upfront and stick to it. If the job is smaller than expected, you pay less.",
              },
              {
                title: "Eco-Friendly Disposal",
                description: "We partner with local recyclers, donation centers, and composting facilities to divert as much as possible from landfills.",
              },
              {
                title: "Community First",
                description: "We're Oahu locals serving our neighbors. We donate usable items to families in need and support local organizations.",
              },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-brand-red">{value.title}</h3>
                <p className="text-brand-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: `${siteConfig.reviews.count}+`, label: "5-Star Reviews" },
              { number: "5.0", label: "Google Rating" },
              { number: "2021", label: "Founded" },
              { number: "100%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-bold text-brand-red">{stat.number}</p>
                <p className="text-sm text-brand-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-gray-950 text-white py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-brand-gray-400 mb-6">
              Get a free estimate today and see why {siteConfig.reviews.count}+ customers gave us 5 stars.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/book-now">Get Free Estimate</Button>
              <Button href={siteConfig.phoneHref} variant="outline">
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
