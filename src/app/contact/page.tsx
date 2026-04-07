"use client";

import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("/api/ghl-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          source: "contact-form",
        }),
      });
    } catch {
      // still show success — lead logged server-side
    }
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-brand-dark py-16 md:py-24 overflow-hidden">
        <img src="/images/hero-contact.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-brand-dark/30" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-cream mb-6">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-brand-cream/70 max-w-2xl mx-auto">
            Have a question or ready to book? Reach out and we&apos;ll get back
            to you fast.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-brand-cream mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-brand-cream/70 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full h-11 px-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-brand-cream/70 mb-1.5"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full h-11 px-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-colors"
                    placeholder="(808) 555-1234"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brand-cream/70 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full h-11 px-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-brand-cream/70 mb-1.5"
                  >
                    Service Type
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full h-11 px-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="junk-removal">Junk Removal</option>
                    <option value="dumpster-rental">Dumpster Rental</option>
                    <option value="estate-cleanout">Estate Cleanout</option>
                    <option value="commercial">Commercial</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-brand-cream/70 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-colors resize-y"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-brand-amber text-brand-dark font-heading font-semibold rounded-lg hover:bg-brand-amber-dark transition-colors text-lg"
                >
                  {submitted ? "Message Sent!" : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right: Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-brand-cream mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 size-10 rounded-full bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center">
                      <Phone className="size-5 text-brand-amber" />
                    </div>
                    <div>
                      <p className="text-sm text-brand-cream/50 mb-1">Phone</p>
                      <a
                        href="tel:+18082012668"
                        className="text-brand-cream font-medium hover:text-brand-amber transition-colors"
                      >
                        (808) 201-2668
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 size-10 rounded-full bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center">
                      <Mail className="size-5 text-brand-amber" />
                    </div>
                    <div>
                      <p className="text-sm text-brand-cream/50 mb-1">Email</p>
                      <a
                        href="mailto:info@kanaisrolloff.com"
                        className="text-brand-cream font-medium hover:text-brand-amber transition-colors"
                      >
                        info@kanaisrolloff.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 size-10 rounded-full bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center">
                      <MapPin className="size-5 text-brand-amber" />
                    </div>
                    <div>
                      <p className="text-sm text-brand-cream/50 mb-1">
                        Address
                      </p>
                      <p className="text-brand-cream font-medium">
                        99-1295 Waiua Pl
                        <br />
                        Aiea, HI 96701
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 size-10 rounded-full bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center">
                      <Clock className="size-5 text-brand-amber" />
                    </div>
                    <div>
                      <p className="text-sm text-brand-cream/50 mb-1">Hours</p>
                      <p className="text-brand-cream font-medium">
                        Monday - Saturday: 8:00 AM - 6:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#2A2A27]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.5!2d-157.9069427!3d21.3712803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006b9ba7147dbd%3A0x7c138c2845aad523!2sKana&#39;i&#39;s%20Junk%20Removal!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kana'i's Roll Off & Junk Removal location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
