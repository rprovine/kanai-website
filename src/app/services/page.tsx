import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/metadata";
import { services } from "@/data/services";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Services",
  description:
    "Full-service junk removal, furniture hauling, estate cleanouts, demolition, and more across Oahu. Licensed, insured, eco-friendly. Free estimates.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-brand-red">Services</span>
            </h1>
            <p className="text-lg text-brand-gray-300 mb-6">
              From single-item pickups to full property cleanouts, we handle it all.
              Every job includes eco-friendly disposal and a clean sweep when we&apos;re done.
            </p>
            <Button href="/book-now">Get a Free Estimate</Button>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block bg-white border border-brand-gray-200 rounded-xl p-6 hover:border-brand-red hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">
                  {service.shortTitle}
                </h2>
                <p className="text-brand-gray-600 text-sm mb-4">{service.description}</p>
                <span className="text-sm font-semibold text-brand-red">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-brand-gray-950 text-white py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Not Sure What You Need?</h2>
            <p className="text-brand-gray-400 mb-6 max-w-xl mx-auto">
              No worries — just tell us what you want gone and we&apos;ll handle the rest.
              Call us or book a free estimate online.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/book-now">Book Free Estimate</Button>
              <Button href="tel:+18082155006" variant="outline">
                Call (808) 215-5006
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
