import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Quote | Kana'i's Roll Off",
  description:
    "Get a quick junk removal estimate without taking photos. Pick your items, see an estimated starting price instantly. Firm price confirmed on-site by your team lead.",
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
