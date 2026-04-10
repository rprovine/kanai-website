import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kanaijunkremoval.com"),
  title: "Kana'i's Roll Off & Junk Removal | Oahu's #1 Junk Removal",
  description:
    "Professional junk removal and roll-off dumpster rental on Oahu. Fast, affordable, and eco-friendly service from Hawaii's most trusted junk removal company.",
  openGraph: {
    title: "Kana'i's Roll Off & Junk Removal | Oahu's #1 Junk Removal",
    description:
      "Professional junk removal and roll-off dumpster rental on Oahu. Fast, affordable, and eco-friendly service from Hawaii's most trusted junk removal company.",
    type: "website",
    locale: "en_US",
    siteName: "Kana'i's Roll Off & Junk Removal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kana'i's Roll Off & Junk Removal | Oahu's #1 Junk Removal",
    description:
      "Professional junk removal and roll-off dumpster rental on Oahu. Fast, affordable, and eco-friendly service from Hawaii's most trusted junk removal company.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <ChatWidget />
        {/* CallRail call tracking */}
        <Script
          src="//cdn.callrail.com/companies/485072912/50d68559ba719aacff99/12/swap.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
