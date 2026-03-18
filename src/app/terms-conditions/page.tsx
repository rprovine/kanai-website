import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for ${siteConfig.name} services.`,
  path: "/terms-conditions",
});

export default function TermsConditionsPage() {
  return (
    <>
      <section className="bg-black text-white py-20 md:py-28">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold">Terms &amp; Conditions</h1>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl prose prose-lg">
            <p>Last updated: March 2026</p>

            <h2>Service Agreement</h2>
            <p>
              By using the services of {siteConfig.legalName}, you agree to the following terms
              and conditions. Please read them carefully.
            </p>

            <h2>Estimates and Pricing</h2>
            <p>
              All estimates are free and non-binding. Final pricing is determined upon arrival and
              assessment of the items to be removed. Pricing is based on volume, weight, and type
              of materials.
            </p>

            <h2>Acceptable Materials</h2>
            <p>
              We remove most non-hazardous household and commercial items. We cannot remove
              hazardous materials including chemicals, asbestos, biological waste, and flammable
              substances. Additional items may be restricted — contact us if unsure.
            </p>

            <h2>Dumpster Rental Terms</h2>
            <ul>
              <li>Rental periods are specified at time of booking</li>
              <li>Overweight charges may apply if weight limits are exceeded</li>
              <li>Prohibited items include hazardous materials, tires, and batteries</li>
              <li>Customer is responsible for obtaining any required permits for street placement</li>
              <li>Extension fees apply for rentals beyond the agreed period</li>
            </ul>

            <h2>Liability</h2>
            <p>
              {siteConfig.legalName} is licensed and insured. We take reasonable care to prevent
              damage to your property during service. Any claims must be reported within 24 hours
              of service completion.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms? Contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-brand-red hover:underline">
                {siteConfig.email}
              </a>{" "}
              or{" "}
              <a href={siteConfig.phoneHref} className="text-brand-red hover:underline">
                {siteConfig.phone}
              </a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
