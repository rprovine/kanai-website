import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Junk Estimator | Kana'i's Roll Off",
  description:
    "Get an instant junk removal estimate powered by AI. Snap a photo of your junk pile and receive an estimated starting price in under 15 seconds. Firm pricing confirmed on-site by your team lead.",
};

export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
