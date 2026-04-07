"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/junk-removal", label: "Junk Removal" },
  { href: "/dumpster-rental", label: "Dumpster Rental" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex flex-col leading-none">
          <span className="font-heading text-xl font-black text-brand-cream tracking-tight">KANA&apos;I&apos;S</span>
          <span className="text-[9px] font-semibold text-brand-cream/60 tracking-[0.15em] uppercase">Roll Off &amp; Junk Removal</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-brand-cream/70 hover:text-brand-cream transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:8082012668"
            className="hidden lg:flex items-center gap-1.5 text-sm text-brand-cream/70 hover:text-brand-cream transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            (808) 201-2668
          </a>
          <Link
            href="/estimate"
            className="bg-brand-amber hover:bg-brand-amber-dark text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Get Estimate
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-brand-cream/70 hover:text-brand-cream"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay — full screen, covers everything on iOS */}
      {mobileOpen && (
        <>
          <style>{`body { overflow: hidden !important; }`}</style>
          <div
            className="md:hidden"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "#0F0F0E",
              zIndex: 9999,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Menu header with close button */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex flex-col leading-none">
                <span className="font-heading text-xl font-black text-brand-cream tracking-tight">KANA&apos;I&apos;S</span>
                <span className="text-[9px] font-semibold text-brand-cream/60 tracking-[0.15em] uppercase">Roll Off &amp; Junk Removal</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-brand-cream" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col px-6 pt-6 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-heading font-bold text-brand-cream hover:text-brand-amber py-4 border-b border-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:8082012668"
                className="flex items-center gap-3 text-xl font-heading font-bold text-brand-cream py-4 border-b border-white/10"
              >
                <Phone className="w-5 h-5 text-brand-amber" />
                (808) 201-2668
              </a>
              <Link
                href="/estimate"
                onClick={() => setMobileOpen(false)}
                className="mt-6 bg-brand-amber hover:bg-brand-amber-dark text-white font-bold text-center text-xl px-6 py-4 rounded-lg transition-colors"
              >
                Get Instant Estimate
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
