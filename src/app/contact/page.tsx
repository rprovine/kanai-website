import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Kana'i's Junk Removal. Call (808) 215-5006 or fill out our contact form. Serving all of Oahu.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-black text-white py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact <span className="text-brand-red">Us</span>
            </h1>
            <p className="text-lg text-brand-gray-300">
              Have a question? Need a quote? We&apos;re here to help.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-brand-gray-900 mb-1">Phone</h3>
                  <a
                    href={siteConfig.phoneHref}
                    className="text-lg text-brand-red font-semibold hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-900 mb-1">Email</h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-brand-red hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-900 mb-1">Service Area</h3>
                  <p className="text-brand-gray-600">All of {siteConfig.serviceArea}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-900 mb-1">Hours</h3>
                  <p className="text-brand-gray-600">Monday – Saturday: 7:00 AM – 6:00 PM</p>
                  <p className="text-brand-gray-600">Sunday: By appointment</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
