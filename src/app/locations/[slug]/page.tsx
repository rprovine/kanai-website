import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { generatePageMetadata, generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/metadata";
import { locations, getLocationBySlug, getNearbyLocations } from "@/data/locations";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  return generatePageMetadata({
    title: `Junk Removal in ${location.name}, Oahu`,
    description: `Professional junk removal and dumpster rental services in ${location.name}, Hawaii. Fast, affordable, eco-friendly. Call (808) 215-5006.`,
    path: `/locations/${location.slug}`,
  });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const nearby = getNearbyLocations(location.nearbyLocations);
  const topServices = services.slice(0, 6);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
    { name: location.name, url: `/locations/${location.slug}` },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, localBusinessSchema]) }}
      />

      {/* Hero */}
      <section className="bg-black text-white pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: location.name },
            ]} />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Junk Removal in <span className="text-brand-red">{location.name}</span>
            </h1>
            <p className="text-lg text-brand-gray-300 mb-6">{location.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/book-now">Get Free Estimate</Button>
              <Button href={siteConfig.phoneHref} variant="outline">
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Local Intro */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">
              Serving {location.name} &amp; {location.region}
            </h2>
            <p className="text-brand-gray-700 leading-relaxed mb-4">
              Kana&apos;i&apos;s Junk Removal is {location.name}&apos;s trusted choice for professional
              junk removal and dumpster rental services. Whether you need a single item picked up or an
              entire property cleared, our team delivers fast, friendly, and affordable service.
            </p>
            <p className="text-brand-gray-700 leading-relaxed">
              We serve all zip codes in {location.name}
              {location.zipCodes.length > 0 && (
                <> ({location.zipCodes.join(", ")})</>
              )}
              {" "}and surrounding areas. With {siteConfig.reviews.count}+ five-star Google reviews,
              you can trust us to get the job done right.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="bg-brand-gray-50 py-24 sm:py-32">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Our Services in {location.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-brand-red border border-transparent transition-all"
              >
                <h3 className="text-lg font-bold mb-2 group-hover:text-brand-red transition-colors">
                  {service.shortTitle}
                </h3>
                <p className="text-sm text-brand-gray-600">{service.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/services" variant="outline" size="sm">
              View All Services
            </Button>
          </div>
        </Container>
      </section>

      {/* Estimate Form */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">
              Get a Free Estimate in {location.name}
            </h2>
            <p className="text-brand-gray-500 text-center mb-8">
              Tell us about your project and we&apos;ll get back to you with a free quote.
            </p>
            <EstimateForm source={`location-${location.slug}`} />
          </div>
        </Container>
      </section>

      {/* Nearby Locations */}
      {nearby.length > 0 && (
        <section className="bg-brand-gray-50 py-24 sm:py-32">
          <Container>
            <h2 className="text-3xl font-bold mb-8">Nearby Service Areas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {nearby.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-md hover:border-brand-red border border-brand-gray-200 transition-all text-sm font-medium"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
