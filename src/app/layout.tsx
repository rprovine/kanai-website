import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobilePhoneBar } from "@/components/layout/MobilePhoneBar";
import { GTMScript } from "@/components/layout/GTMScript";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
        <GTMScript />
        <Header />
        <main className="min-h-screen pt-16 md:pt-20 pb-14 lg:pb-0">{children}</main>
        <Footer />
        <MobilePhoneBar />
      </body>
    </html>
  );
}
