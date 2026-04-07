import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Kana'i's Roll Off & Junk Removal",
  description:
    "Get in touch with Kana'i's Roll Off & Junk Removal. Call (808) 201-2668, email info@kanaisrolloff.com, or send us a message. Serving all of Oahu.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
