import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Online | Kana'i's Roll Off",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
