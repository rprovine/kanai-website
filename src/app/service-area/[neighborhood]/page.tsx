import Link from "next/link";
import { MapPin, Clock, Users, Shield, Leaf } from "lucide-react";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 86400; // 24-hour ISR

export function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ neighborhood: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}): Promise<Metadata> {
  const { neighborhood: slug } = await params;
  const n = NEIGHBORHOODS.find((n) => n.slug === slug);
  if (!n) return {};
  return {
    title: `Junk Removal in ${n.name}, Hawaii | Kana'i's Roll Off`,
    description: `Professional junk removal and dumpster rental in ${n.name}, Oahu. Same-day service, transparent pricing, eco-responsible disposal. Call (808) 201-2668.`,
  };
}

const TRUST_POINTS = [
  { icon: Clock, title: "Fast Response Times", getDesc: (name: string) => `Quick turnaround for ${name} pickups — often same-day or next-day.` },
  { icon: Users, title: "Local Crew", getDesc: (name: string) => `Our team knows ${name} and the surrounding area inside and out.` },
  { icon: Shield, title: "Transparent Pricing", getDesc: () => "Get an estimated starting price online. Your team lead confirms the firm price on-site — no obligation." },
  { icon: Leaf, title: "Eco-Responsible", getDesc: () => "We donate, recycle, and dispose at licensed facilities — no shortcuts." },
];

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}) {
  const { neighborhood: slug } = await params;
  const neighborhood = NEIGHBORHOODS.find((n) => n.slug === slug);
  if (!neighborhood) notFound();

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-brand-amber mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Service Area</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-brand-cream">
            Junk Removal in {neighborhood.name}, Hawaii
          </h1>
          <p className="mt-5 text-lg text-brand-cream/60 leading-relaxed max-w-2xl">
            {neighborhood.description}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A18] rounded-xl border border-white/5 p-6">
              <h3 className="font-heading text-xl font-bold text-brand-cream mb-2">
                Junk Removal
              </h3>
              <p className="text-sm text-brand-cream/50 mb-4">
                Full-service junk hauling in {neighborhood.name}. Furniture, appliances, yard waste, construction debris — we do the heavy lifting.
              </p>
              <p className="font-heading font-bold text-brand-amber mb-4">Starting at $187</p>
              <Link
                href="/estimate"
                className="inline-block bg-brand-amber hover:bg-brand-amber-dark text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Get a Quote in {neighborhood.name}
              </Link>
            </div>
            <div className="bg-[#1A1A18] rounded-xl border border-white/5 p-6">
              <h3 className="font-heading text-xl font-bold text-brand-cream mb-2">
                Dumpster Rental
              </h3>
              <p className="text-sm text-brand-cream/50 mb-4">
                Roll-off dumpster delivery in {neighborhood.name}. 15 to 30-yard containers for renovations, cleanouts, and projects.
              </p>
              <p className="font-heading font-bold text-brand-amber mb-4">Starting at $600</p>
              <Link
                href="/quote"
                className="inline-block bg-brand-amber hover:bg-brand-amber-dark text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Get a Dumpster Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#1A1A18]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-cream mb-10 text-center">
            Why Choose Kana&apos;i&apos;s in {neighborhood.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TRUST_POINTS.map(({ icon: Icon, title, getDesc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-amber" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-brand-cream text-sm">{title}</h3>
                  <p className="text-sm text-brand-cream/50 mt-1">{getDesc(neighborhood.name)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-cream mb-4">
            Get Your Free Estimate
          </h2>
          <p className="text-brand-cream/50 mb-6">
            Snap a photo and get a price in seconds. We serve all of {neighborhood.name}.
          </p>
          <Link
            href="/estimate"
            className="inline-block bg-brand-amber hover:bg-brand-amber-dark text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors"
          >
            Get Instant Estimate
          </Link>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <Link href="/service-area" className="text-sm text-brand-cream/40 hover:text-brand-amber transition-colors">
          &larr; View all service areas
        </Link>
      </div>
    </>
  );
}
