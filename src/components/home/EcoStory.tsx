import { Heart, Recycle, ShieldCheck } from "lucide-react";

const PILLARS = [
  {
    icon: Heart,
    title: "Donate",
    desc: "Usable items go to local Oahu nonprofits and shelters. We partner with community organizations to give your stuff a second life.",
  },
  {
    icon: Recycle,
    title: "Recycle",
    desc: "Metals, electronics, and recyclables are diverted from the landfill. We sort and separate so the right materials go to the right facilities.",
  },
  {
    icon: ShieldCheck,
    title: "Dispose Responsibly",
    desc: "Everything else goes to permitted, licensed disposal facilities. We follow all Hawaii environmental regulations — no shortcuts.",
  },
];

export default function EcoStory() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-black text-brand-cream text-center mb-4">
          What We Do With It
        </h2>
        <p className="text-center text-brand-cream/50 mb-12 max-w-lg mx-auto">
          We don&apos;t just haul it away. We make sure it goes to the right place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-amber/10 mb-5">
                <Icon className="w-8 h-8 text-brand-amber" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-cream mb-2">
                {title}
              </h3>
              <p className="text-sm text-brand-cream/50 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
