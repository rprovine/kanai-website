import Link from "next/link";
import { siteConfig } from "@/data/site";

const footerLinks = {
  services: [
    { name: "Junk Removal", href: "/services/junk-removal" },
    { name: "Furniture Removal", href: "/services/furniture-removal" },
    { name: "Appliance Removal", href: "/services/appliance-removal" },
    { name: "Estate Cleanout", href: "/services/estate-cleanout" },
    { name: "Commercial", href: "/services/commercial-junk-removal" },
    { name: "All Services", href: "/services" },
  ],
  dumpsters: [
    { name: "7 Yard", href: "/dumpster-rentals/7-yard" },
    { name: "15 Yard", href: "/dumpster-rentals/15-yard" },
    { name: "20 Yard", href: "/dumpster-rentals/20-yard" },
    { name: "25 Yard", href: "/dumpster-rentals/25-yard" },
    { name: "30 Yard", href: "/dumpster-rentals/30-yard" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Locations", href: "/locations" },
    { name: "Gallery", href: "/gallery" },
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Terms", href: "/terms-conditions" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-gray-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-12 lg:py-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt="Kana'i's Junk Removal"
                className="h-10 w-auto invert"
              />
            </Link>
            <p className="mt-4 text-sm text-brand-gray-600 leading-relaxed max-w-[200px]">
              Oahu&apos;s most trusted junk removal and dumpster rental service.
            </p>
            <div className="mt-4 space-y-1">
              <a href={siteConfig.phoneHref} className="block text-sm text-brand-gray-400 hover:text-white transition-colors">
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="block text-sm text-brand-gray-600 hover:text-white transition-colors">
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gray-500 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-gray-600 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dumpsters */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gray-500 mb-4">Dumpsters</h3>
            <ul className="space-y-2.5">
              {footerLinks.dumpsters.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-gray-600 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gray-500 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-gray-600 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-gray-700">
          <p>&copy; {new Date().getFullYear()} {siteConfig.legalName}</p>
          <p>Serving all of {siteConfig.serviceArea}</p>
        </div>
      </div>
    </footer>
  );
}
