import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Old WordPress URL patterns → new routes
      { source: "/junk-removal", destination: "/services/junk-removal", permanent: true },
      { source: "/furniture-removal", destination: "/services/furniture-removal", permanent: true },
      { source: "/appliance-removal", destination: "/services/appliance-removal", permanent: true },
      { source: "/estate-cleanout", destination: "/services/estate-cleanout", permanent: true },
      { source: "/garage-cleanout", destination: "/services/garage-cleanout", permanent: true },
      { source: "/commercial-junk-removal", destination: "/services/commercial-junk-removal", permanent: true },
      { source: "/construction-debris-removal", destination: "/services/construction-debris-removal", permanent: true },
      { source: "/yard-waste-removal", destination: "/services/yard-waste-removal", permanent: true },
      { source: "/demolition-services", destination: "/services/demolition-services", permanent: true },
      { source: "/hot-tub-removal", destination: "/services/hot-tub-removal", permanent: true },
      { source: "/mattress-removal", destination: "/services/mattress-removal", permanent: true },
      { source: "/office-cleanout", destination: "/services/office-cleanout", permanent: true },
      { source: "/foreclosure-cleanout", destination: "/services/foreclosure-cleanout", permanent: true },
      { source: "/dumpster-rental", destination: "/dumpster-rentals", permanent: true },
      { source: "/dumpster-rental/:size*", destination: "/dumpster-rentals/:size*", permanent: true },
      { source: "/free-estimate", destination: "/book-now", permanent: true },
      { source: "/get-a-quote", destination: "/book-now", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/service-areas", destination: "/locations", permanent: true },
      { source: "/service-areas/:slug*", destination: "/locations/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
