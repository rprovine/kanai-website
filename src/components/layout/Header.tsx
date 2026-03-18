"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { trackPhoneClick } from "@/lib/tracking";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Dumpster Rentals", href: "/dumpster-rentals" },
  { name: "Locations", href: "/locations" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl md:text-2xl font-bold text-white">
              Kana&apos;i&apos;s
            </span>
            <span className="text-sm md:text-base text-brand-red font-semibold uppercase tracking-wider">
              Junk Removal
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-white/80 hover:text-white transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.phoneHref}
              onClick={trackPhoneClick}
              className="text-sm text-white font-semibold hover:text-brand-red transition-colors"
            >
              {siteConfig.phone}
            </a>
            <Button href="/book-now" size="sm">
              Free Estimate
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <Container>
              <nav className="py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-white/80 hover:text-white font-medium border-b border-white/5"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <a
                    href={siteConfig.phoneHref}
                    onClick={trackPhoneClick}
                    className="text-center py-3 text-white font-semibold text-lg"
                  >
                    {siteConfig.phone}
                  </a>
                  <Button href="/book-now" className="w-full justify-center">
                    Free Estimate
                  </Button>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
