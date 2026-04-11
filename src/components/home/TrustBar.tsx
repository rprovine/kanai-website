import { Shield, MapPin, Clock, Star, Leaf } from "lucide-react";

const SIGNALS = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: MapPin, label: "Hawaii-Owned & Operated" },
  { icon: Clock, label: "Same-Day Available" },
  { icon: Star, label: "4.9 Stars · 200+ Reviews" },
  { icon: Leaf, label: "Eco-Responsible Disposal" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#1A1A18] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-8">
          {SIGNALS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4 text-brand-amber shrink-0" />
              <span className="text-xs md:text-sm text-brand-cream/70 whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
