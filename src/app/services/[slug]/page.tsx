import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/metadata";
import { services, getServiceBySlug, getRelatedServices } from "@/data/services";
import { siteConfig } from "@/data/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return generatePageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.relatedSlugs);

  const serviceSchema = generateServiceSchema(
    service.title,
    service.metaDescription,
    `/services/${service.slug}`
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.shortTitle, url: `/services/${service.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema, generateFAQSchema(service.faqs)]) }}
      />

      {/* Hero */}
      <section className="bg-black text-white pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.shortTitle },
            ]} />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-lg text-brand-gray-300 mb-6">{service.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/book-now">Get Free Estimate</Button>
              <Button href={siteConfig.phoneHref} variant="outline">
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-lg text-brand-gray-700 leading-relaxed">{service.intro}</p>
          </div>
        </Container>
      </section>

      {/* Items Grid */}
      <section className="bg-brand-gray-50 py-24 sm:py-32">
        <Container>
          <h2 className="text-3xl font-bold mb-8">What We Remove</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.items.map((category) => (
              <div key={category.name} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-brand-red">{category.name}</h3>
                {category.items && (
                  <ul className="space-y-1.5">
                    {category.items.map((item) => (
                      <li key={item} className="text-sm text-brand-gray-600 flex items-start gap-2">
                        <span className="text-brand-red mt-1">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-24 sm:py-32">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 p-4 rounded-lg bg-brand-gray-50">
                <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-xs">&#10003;</span>
                </div>
                <p className="text-brand-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-brand-gray-950 text-white py-24 sm:py-32">
        <Container>
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <p className="text-brand-gray-300">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl space-y-6">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-brand-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-brand-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="bg-brand-gray-50 py-24 sm:py-32">
          <Container>
            <h2 className="text-3xl font-bold mb-8">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-brand-red border border-transparent transition-all"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-brand-red transition-colors">
                    {rel.shortTitle}
                  </h3>
                  <p className="text-sm text-brand-gray-600">{rel.description}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Estimate Form */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">Get a Free Estimate</h2>
            <p className="text-brand-gray-500 text-center mb-8">
              Tell us about your {service.shortTitle.toLowerCase()} needs and we&apos;ll get back to you with a free quote.
            </p>
            <EstimateForm source={`service-${service.slug}`} />
          </div>
        </Container>
      </section>
    </>
  );
}
