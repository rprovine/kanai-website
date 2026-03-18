import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DumpsterQuoteForm } from "@/components/forms/DumpsterQuoteForm";
import { DumpsterSizeComparison } from "@/components/sections/DumpsterSizeComparison";
import { generatePageMetadata } from "@/lib/metadata";
import { dumpsterSizes } from "@/data/dumpsters";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = generatePageMetadata({
  title: "Dumpster Rentals",
  description:
    "Rent dumpsters on Oahu — 10, 15, 20, 30, and 40 yard sizes available. Fast delivery, affordable pricing. Call (808) 215-5006.",
  path: "/dumpster-rentals",
});

export default function DumpsterRentalsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dumpster <span className="text-brand-red">Rentals</span>
            </h1>
            <p className="text-lg text-brand-gray-300 mb-6">
              5 sizes to fit any project — from small cleanouts to major construction.
              Fast delivery and pickup across Oahu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#quote">Get a Quote</Button>
              <Button href={siteConfig.phoneHref} variant="outline">
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 3D Size Comparison */}
      <DumpsterSizeComparison />

      {/* Pricing Table */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-bold mb-4 text-center">Choose Your Size</h2>
          <p className="text-brand-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Not sure which size? Call us and we&apos;ll help you pick the right dumpster for your project.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dumpsterSizes.map((dumpster) => (
              <div
                key={dumpster.slug}
                className="bg-white border border-brand-gray-200 rounded-xl p-6 hover:border-brand-red hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <span className="text-5xl font-bold text-brand-red">{dumpster.size}</span>
                  <span className="text-lg text-brand-gray-500 ml-1">Yard</span>
                </div>
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold">{dumpster.priceRange}</p>
                  <p className="text-sm text-brand-gray-500">{dumpster.rentalPeriod}</p>
                </div>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between text-brand-gray-600">
                    <span>Dimensions</span>
                    <span className="font-medium">{dumpster.dimensions}</span>
                  </div>
                  <div className="flex justify-between text-brand-gray-600">
                    <span>Weight Limit</span>
                    <span className="font-medium">{dumpster.weight}</span>
                  </div>
                  <div className="flex justify-between text-brand-gray-600">
                    <span>Capacity</span>
                    <span className="font-medium">{dumpster.capacity}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-brand-gray-400 uppercase mb-2">Ideal For</p>
                  <ul className="space-y-1">
                    {dumpster.idealFor.slice(0, 3).map((use) => (
                      <li key={use} className="text-sm text-brand-gray-600 flex items-start gap-2">
                        <span className="text-brand-red">&#10003;</span>
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/dumpster-rentals/${dumpster.slug}`}
                  className="block text-center text-sm font-semibold text-brand-red hover:underline mb-3"
                >
                  View Details &rarr;
                </Link>
                <Button href="#quote" variant="primary" size="sm" className="w-full justify-center">
                  Get Quote
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Size Guide */}
      <section className="bg-brand-gray-50 py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-bold mb-4 text-center">Dumpster Size Guide</h2>
          <p className="text-brand-gray-500 text-center mb-8 max-w-2xl mx-auto">
            Our dumpsters range from small 10-yard containers for minor cleanouts to massive 40-yard
            roll-offs for commercial construction. Here&apos;s a quick comparison.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b border-brand-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Dimensions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Capacity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Weight</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Starting Price</th>
                </tr>
              </thead>
              <tbody>
                {dumpsterSizes.map((d) => (
                  <tr key={d.slug} className="border-b border-brand-gray-100 hover:bg-brand-gray-50">
                    <td className="px-6 py-4 font-bold text-brand-red">{d.size} Yard</td>
                    <td className="px-6 py-4 text-sm">{d.dimensions}</td>
                    <td className="px-6 py-4 text-sm">{d.capacity}</td>
                    <td className="px-6 py-4 text-sm">{d.weight}</td>
                    <td className="px-6 py-4 text-sm font-semibold">{d.priceRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-brand-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-2">How do I know which size to rent?</h3>
              <p className="text-brand-gray-600">Consider the scope of your project. A 10-yard dumpster works for small cleanouts, while a 20-yard handles most home renovation projects. For large construction or commercial projects, go with a 30 or 40-yard. Call us and we can help you decide.</p>
            </div>
            <div className="border-b border-brand-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-2">How quickly can you deliver?</h3>
              <p className="text-brand-gray-600">We offer same-day and next-day delivery for most locations on Oahu, subject to availability.</p>
            </div>
            <div className="border-b border-brand-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-2">What can&apos;t go in the dumpster?</h3>
              <p className="text-brand-gray-600">Hazardous materials, chemicals, tires, batteries, paint, and flammable liquids cannot be placed in dumpsters. Contact us if you&apos;re unsure about specific items.</p>
            </div>
            <div className="border-b border-brand-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-2">Do I need a permit?</h3>
              <p className="text-brand-gray-600">If the dumpster is placed on your private property (driveway), no permit is needed. Street placement may require a city permit — we can help you with that.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Quote Form */}
      <section id="quote" className="bg-brand-gray-50 py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">Get a Dumpster Quote</h2>
            <p className="text-brand-gray-500 text-center mb-8">
              Fill out the form below and we&apos;ll get back to you with pricing and availability.
            </p>
            <DumpsterQuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
