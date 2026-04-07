import { Camera, Zap, Truck } from "lucide-react";

const STEPS = [
  {
    num: 1,
    icon: Camera,
    title: "Snap a Photo",
    desc: "Take one photo per item or pile — no need for multiple angles. Or fill out our quick quote form.",
  },
  {
    num: 2,
    icon: Zap,
    title: "Get an Instant Estimate",
    desc: "Our AI analyzes your items and gives you a price in seconds — no phone call needed.",
  },
  {
    num: 3,
    icon: Truck,
    title: "We Show Up, You Relax",
    desc: "Book online, our team lead confirms your price on-site. Approve it and we haul it away — if not, you owe nothing.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-[#1A1A18]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-black text-brand-cream text-center mb-14">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-brand-amber/20" />

          {STEPS.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="relative text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-amber/10 border border-brand-amber/20 mb-5">
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-amber flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{num}</span>
                </div>
                <Icon className="w-10 h-10 text-brand-amber" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-cream mb-2">
                {title}
              </h3>
              <p className="text-sm text-brand-cream/50 leading-relaxed max-w-xs mx-auto">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
