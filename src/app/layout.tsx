import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobilePhoneBar } from "@/components/layout/MobilePhoneBar";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { GTMScript } from "@/components/layout/GTMScript";
import { FacebookPixel } from "@/components/layout/FacebookPixel";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f20c2d",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Oahu Junk Removal & Dumpster Rentals`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Oahu's #1 junk removal and dumpster rental service. 744+ five-star Google reviews. Fast, affordable, eco-friendly. Call (808) 215-5006 for a free estimate.",
  keywords: [
    "junk removal Oahu",
    "dumpster rental Oahu",
    "junk hauling Hawaii",
    "Honolulu junk removal",
    "furniture removal Oahu",
    "estate cleanout Hawaii",
  ],
  manifest: "/manifest.json",
  icons: {
    apple: "/images/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Oahu Junk Removal & Dumpster Rentals`,
    description:
      "Oahu's #1 junk removal and dumpster rental service. 744+ five-star Google reviews. Fast, affordable, eco-friendly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-red focus:text-white focus:px-4 focus:py-2 focus:rounded-md">
          Skip to content
        </a>
        <GTMScript />
        <FacebookPixel />
        <Header />
        <FloatingCTA />
        <main id="main-content" className="min-h-screen pb-14 lg:pb-0">{children}</main>
        <Footer />
        <MobilePhoneBar />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
