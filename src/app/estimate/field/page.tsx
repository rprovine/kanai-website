import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "On-Site Estimate Form | Kana'i's Roll Off",
  description:
    "Field technician guided estimate wizard for on-site junk removal quotes.",
};

export default function FieldEstimatePage() {
  return (
    <>
      {/* Header */}
      <section className="py-12 md:py-16 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-black text-brand-cream mb-3">
            On-Site Estimate Form
          </h1>
          <p className="text-lg text-brand-cream/60">
            Field technician guided estimate wizard
          </p>
        </div>
      </section>

      {/* Iframe */}
      <section className="bg-brand-dark px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <iframe
            src="https://kanai-estimator-form.vercel.app"
            title="Kana'i On-Site Estimate Form"
            className="w-full rounded-xl"
            style={{ minHeight: "80vh", border: "none" }}
          />
        </div>
      </section>
    </>
  );
}
