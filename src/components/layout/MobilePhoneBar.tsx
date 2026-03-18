"use client";

import { siteConfig } from "@/data/site";
import { trackPhoneClick } from "@/lib/tracking";

export function MobilePhoneBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-brand-red shadow-lg shadow-brand-red/25">
      <div className="flex items-center justify-center">
        <a
          href={siteConfig.phoneHref}
          onClick={trackPhoneClick}
          className="flex items-center justify-center gap-2 w-full py-3.5 text-white font-semibold text-base"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now — {siteConfig.phone}
        </a>
      </div>
    </div>
  );
}
