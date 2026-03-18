import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = generatePageMetadata({
  title: "Book a Free Estimate",
  description:
    "Request a free junk removal estimate from Kana'i's Junk Removal. Fast response, no obligation. Serving all of Oahu.",
  path: "/book-now",
});

export default function BookNowPage() {
  return (
    <>
      <section className="bg-black text-white py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Your <span className="text-brand-red">Free Estimate</span>
            </h1>
            <p className="text-lg text-brand-gray-300">
              Tell us about your project and we&apos;ll get back to you within 1 business hour.
              No obligation, no hidden fees.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <EstimateForm source="book-now" />
            </div>
            <div>
              <div className="bg-brand-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Why Choose Us</h3>
                <ul className="space-y-3">
                  {[
                    "Free, no-obligation estimates",
                    "Upfront pricing — no hidden fees",
                    `${siteConfig.reviews.count}+ five-star Google reviews`,
                    "Same-day service available",
                    "Eco-friendly disposal",
                    "Licensed and insured",
                    "We do all the heavy lifting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="text-brand-red font-bold mt-0.5">&#10003;</span>
                      <span className="text-brand-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-brand-gray-200">
                  <p className="text-sm text-brand-gray-500 mb-2">Prefer to call?</p>
                  <a
                    href={siteConfig.phoneHref}
                    className="text-xl font-bold text-brand-red hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
