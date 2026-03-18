import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your information.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-black text-white py-20 md:py-28">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl prose prose-lg">
            <p>Last updated: March 2026</p>

            <h2>Information We Collect</h2>
            <p>
              When you use our website, request an estimate, or contact us, we may collect personal
              information including your name, email address, phone number, and physical address.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you estimates and service-related communications</li>
              <li>Process your transactions</li>
              <li>Improve our website and marketing</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with trusted
              third-party service providers who assist us in operating our business, such as our
              CRM and scheduling systems.
            </p>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies including Google Tag Manager and Facebook Pixel
              to analyze website traffic and improve your experience. You can control cookies through
              your browser settings.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-brand-red hover:underline">
                {siteConfig.email}
              </a>{" "}
              or call{" "}
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
