import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Portal | Kana'i's Roll Off",
  description:
    "Check your job status, reschedule, or leave a review. Kana'i's Roll Off & Junk Removal customer self-serve portal.",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
