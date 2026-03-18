import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DumpsterQuoteForm } from "@/components/forms/DumpsterQuoteForm";
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata";
import { dumpsterSizes, getDumpsterBySlug } from "@/data/dumpsters";
import { siteConfig } from "@/data/site";

interface Props {
  params: Promise<{ size: string }>;
}

export async function generateStaticParams() {
  return dumpsterSizes.map((d) => ({ size: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { size } = await params;
  const dumpster = getDumpsterBySlug(size);
  if (!dumpster) return {};

  return generatePageMetadata({
    title: dumpster.title,
    description: dumpster.metaDescription,
    path: `/dumpster-rentals/${dumpster.slug}`,
  });
}

export default async function DumpsterSizePage({ params }: Props) {
  const { size } = await params;
  const dumpster = getDumpsterBySlug(size);
  if (!dumpster) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Dumpster Rentals", url: "/dumpster-rentals" },
    { name: `${dumpster.size} Yard`, url: `/dumpster-rentals/${dumpster.slug}` },
  ]);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: dumpster.title,
    description: dumpster.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: dumpster.priceRange.replace(/[^0-9]/g, ""),
      availability: "https://schema.org/InStock",
    },
  };

  const otherSizes = dumpsterSizes.filter((d) => d.slug !== dumpster.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, productSchema]) }}
      />

      {/* Hero */}
      <section className="bg-black text-white py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <nav className="text-sm text-brand-gray-400 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/dumpster-rentals" className="hover:text-white">Dumpster Rentals</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{dumpster.size} Yard</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{dumpster.title}</h1>
            <p className="text-lg text-brand-gray-300 mb-6">{dumpster.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#quote">Get a Quote</Button>
              <Button href={siteConfig.phoneHref} variant="outline">
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Specs */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Specs card */}
            <div className="bg-brand-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Specifications</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-brand-gray-200">
                  <span className="text-brand-gray-600">Size</span>
                  <span className="font-bold text-brand-red">{dumpster.size} Cubic Yards</span>
                </div>
                <div className="flex justify-between py-3 border-b border-brand-gray-200">
                  <span className="text-brand-gray-600">Dimensions</span>
                  <span className="font-semibold">{dumpster.dimensions}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-brand-gray-200">
                  <span className="text-brand-gray-600">Weight Limit</span>
                  <span className="font-semibold">{dumpster.weight}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-brand-gray-200">
                  <span className="text-brand-gray-600">Capacity</span>
                  <span className="font-semibold">{dumpster.capacity}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-brand-gray-200">
                  <span className="text-brand-gray-600">Rental Period</span>
                  <span className="font-semibold">{dumpster.rentalPeriod}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-brand-gray-600">Pricing</span>
                  <span className="text-2xl font-bold text-brand-red">{dumpster.priceRange}</span>
                </div>
              </div>
            </div>

            {/* Ideal For */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Ideal For</h2>
              <div className="space-y-3 mb-8">
                {dumpster.idealFor.map((use) => (
                  <div key={use} className="flex items-start gap-3 p-3 bg-brand-gray-50 rounded-lg">
                    <span className="text-brand-red font-bold">&#10003;</span>
                    <span>{use}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-4">What You Can Put In</h3>
              <div className="flex flex-wrap gap-2">
                {dumpster.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-brand-gray-100 rounded-full text-sm text-brand-gray-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-brand-gray-50 py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl space-y-6">
            {dumpster.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-brand-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-brand-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Other sizes */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Other Dumpster Sizes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherSizes.map((d) => (
              <Link
                key={d.slug}
                href={`/dumpster-rentals/${d.slug}`}
                className="bg-white border border-brand-gray-200 rounded-xl p-4 text-center hover:border-brand-red hover:shadow-md transition-all"
              >
                <span className="text-3xl font-bold text-brand-red">{d.size}</span>
                <span className="block text-sm text-brand-gray-500">Yard</span>
                <span className="block text-sm font-semibold mt-2">{d.priceRange}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Quote Form */}
      <section id="quote" className="bg-brand-gray-950 text-white py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">Get a Quote for Your {dumpster.size} Yard Dumpster</h2>
            <p className="text-brand-gray-400 text-center mb-8">
              Fill out the form and we&apos;ll get back to you with pricing and delivery availability.
            </p>
            <div className="bg-white text-brand-gray-900 rounded-2xl p-6 md:p-8">
              <DumpsterQuoteForm preselectedSize={dumpster.size} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
