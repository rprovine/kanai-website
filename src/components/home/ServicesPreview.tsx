import Link from "next/link";
import { Trash2, Container } from "lucide-react";

const SERVICES = [
  {
    icon: Trash2,
    title: "Junk Removal",
    desc: "Full-service junk hauling for homes and businesses. We do all the heavy lifting — furniture, appliances, yard waste, construction debris, and more.",
    price: "Starting at $187",
    href: "/junk-removal",
  },
  {
    icon: Container,
    title: "Dumpster Rental",
    desc: "Roll-off dumpster containers for renovations, cleanouts, and commercial projects. 15 to 30-yard sizes with flexible rental periods.",
    price: "Starting at $600",
    href: "/dumpster-rental",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-black text-brand-cream text-center mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc, price, href }) => (
            <Link
              key={title}
              href={href}
              className="group relative bg-[#1A1A18] rounded-xl border border-white/5 hover:border-brand-amber/30 p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-amber rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icon className="w-10 h-10 text-brand-amber mb-5" />
              <h3 className="font-heading text-2xl font-bold text-brand-cream mb-3">
                {title}
              </h3>
              <p className="text-sm text-brand-cream/50 leading-relaxed mb-5">
                {desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-brand-amber">
                  {price}
                </span>
                <span className="text-sm text-brand-cream/40 group-hover:text-brand-amber transition-colors">
                  Learn More &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
