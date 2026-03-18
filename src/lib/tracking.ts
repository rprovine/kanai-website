"use client";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...data,
  });

  // Facebook Pixel
  if (window.fbq) {
    if (event === "form_submit") {
      window.fbq("track", "Lead", data);
    } else if (event === "phone_click") {
      window.fbq("track", "Contact", data);
    }
  }
}

export function trackFormSubmit(formName: string, data?: Record<string, unknown>) {
  trackEvent("form_submit", { form_name: formName, ...data });
}

export function trackPhoneClick() {
  trackEvent("phone_click", { phone_number: "(808) 215-5006" });
}

export function trackCtaClick(ctaName: string, location: string) {
  trackEvent("cta_click", { cta_name: ctaName, cta_location: location });
}

export function trackServicePageView(serviceName: string) {
  trackEvent("service_page_view", { service_name: serviceName });
}

export function trackDumpsterSizeSelect(size: string) {
  trackEvent("dumpster_size_select", { dumpster_size: size });
}
