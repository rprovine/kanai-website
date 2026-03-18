import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DumpsterPreview } from "@/components/sections/DumpsterPreview";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { generateLocalBusinessSchema } from "@/lib/metadata";

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeroSection />
      <StatsBar />
      <ServicesOverview />
      <ProcessSteps />
      <DumpsterPreview />
      <ReviewsCarousel />

      {/* Estimate Form Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
              Get a Free Estimate
            </h2>
            <p className="text-brand-gray-500 text-center mb-8">
              Tell us about your project and we&apos;ll get back to you within 1 business hour.
            </p>
            <EstimateForm source="homepage" />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
