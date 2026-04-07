import Link from "next/link";
import { Phone, Camera, CalendarDays } from "lucide-react";

export default function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md border-t border-white/10">
      <div className="grid grid-cols-3 h-14">
        <a
          href="tel:8082012668"
          className="flex flex-col items-center justify-center gap-0.5 text-brand-cream/70 active:text-brand-amber transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Call</span>
        </a>
        <Link
          href="/estimate"
          className="flex flex-col items-center justify-center gap-0.5 bg-brand-amber text-white"
        >
          <Camera className="w-5 h-5" />
          <span className="text-[10px] font-bold">Estimate</span>
        </Link>
        <Link
          href="/book"
          className="flex flex-col items-center justify-center gap-0.5 text-brand-cream/70 active:text-brand-amber transition-colors"
        >
          <CalendarDays className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Book</span>
        </Link>
      </div>
    </div>
  );
}
