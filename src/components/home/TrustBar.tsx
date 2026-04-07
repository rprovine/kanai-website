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
        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto md:overflow-visible md:justify-center scrollbar-hide">
          {SIGNALS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 shrink-0"
            >
              <Icon className="w-4 h-4 text-brand-amber" />
              <span className="text-sm text-brand-cream/70 whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
