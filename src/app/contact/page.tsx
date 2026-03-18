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
      <section className="bg-black text-white pt-32 md:pt-40 pb-16 md:pb-20">
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

      <section className="py-24 sm:py-32">
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

      <section className="pb-24 sm:pb-32">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">We Serve All of Oahu</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238133.4295694985!2d-158.07296745!3d21.4630269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006d1c34cf8003%3A0x41b492e60f9e7c5!2sOahu!5e0!3m2!1sen!2sus!4v1"
              className="w-full aspect-video"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kana'i's Junk Removal service area - Oahu, Hawaii"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
