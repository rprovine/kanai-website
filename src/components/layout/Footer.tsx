import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

const footerLinks = {
  services: [
    { name: "Junk Removal", href: "/services/junk-removal" },
    { name: "Furniture Removal", href: "/services/furniture-removal" },
    { name: "Appliance Removal", href: "/services/appliance-removal" },
    { name: "Estate Cleanout", href: "/services/estate-cleanout" },
    { name: "Commercial", href: "/services/commercial-junk-removal" },
    { name: "Construction Debris", href: "/services/construction-debris-removal" },
    { name: "All Services", href: "/services" },
  ],
  dumpsters: [
    { name: "10 Yard Dumpster", href: "/dumpster-rentals/10-yard" },
    { name: "15 Yard Dumpster", href: "/dumpster-rentals/15-yard" },
    { name: "20 Yard Dumpster", href: "/dumpster-rentals/20-yard" },
    { name: "30 Yard Dumpster", href: "/dumpster-rentals/30-yard" },
    { name: "40 Yard Dumpster", href: "/dumpster-rentals/40-yard" },
    { name: "All Dumpster Rentals", href: "/dumpster-rentals" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Locations", href: "/locations" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-gray-950 text-white">
      {/* Main footer */}
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">Kana&apos;i&apos;s</span>
              <span className="block text-sm text-brand-red font-semibold uppercase tracking-wider">
                Junk Removal
              </span>
            </Link>
            <p className="mt-4 text-brand-gray-400 text-sm leading-relaxed">
              Oahu&apos;s most trusted junk removal and dumpster rental service.
              Licensed, insured, and committed to eco-friendly disposal.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href={siteConfig.phoneHref}
                className="block text-white font-semibold hover:text-brand-red transition-colors"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-brand-gray-400 hover:text-white transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gray-300 mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dumpsters */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gray-300 mb-4">
              Dumpster Rentals
            </h3>
            <ul className="space-y-2">
              {footerLinks.dumpsters.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gray-300 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brand-gray-500">
            <p>&copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
            <p>Serving all of {siteConfig.serviceArea}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
