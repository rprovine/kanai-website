import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const SERVICE_LINKS = [
  { href: "/junk-removal", label: "Junk Removal" },
  { href: "/dumpster-rental", label: "Dumpster Rental" },
  { href: "/estimate", label: "AI Estimator" },
  { href: "/pricing", label: "Pricing" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/service-area", label: "Service Area" },
  { href: "/contact", label: "Contact" },
  { href: "/portal", label: "Customer Portal" },
];

export default function Footer() {
  return (
    <footer className="bg-[#161615] border-t border-brand-amber/20">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-black text-brand-cream tracking-tight">
              KANA&apos;I&apos;S
            </h3>
            <p className="text-sm text-brand-cream/50 mt-1 font-heading">
              Roll Off &amp; Junk Removal
            </p>
            <p className="text-sm text-brand-cream/60 mt-3 leading-relaxed">
              Oahu&apos;s #1 junk removal and dumpster rental service. Hawaii-owned, locally operated, eco-responsible.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-brand-cream text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-cream/50 hover:text-brand-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-brand-cream text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-cream/50 hover:text-brand-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-brand-cream text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:8082012668"
                  className="flex items-center gap-2 text-sm text-brand-cream/50 hover:text-brand-amber transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  (808) 201-2668
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@kanaisrolloff.com"
                  className="flex items-center gap-2 text-sm text-brand-cream/50 hover:text-brand-amber transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  info@kanaisrolloff.com
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-brand-cream/50">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  99-1295 Waiua Pl<br />Aiea, HI 96701
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-cream/50">
          <span>&copy; 2026 Kana&apos;i&apos;s Roll Off &amp; Junk Removal. All rights reserved.</span>
          <span>Hawaii-Owned &amp; Operated</span>
        </div>
      </div>
    </footer>
  );
}
