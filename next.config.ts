import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=(self)",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.callrail.com https://js.callrail.com https://www.google.com https://maps.googleapis.com https://maps.google.com https://*.googleapis.com https://www.googletagmanager.com https://embed.survcart.com https://*.survcart.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://embed.survcart.com https://*.survcart.com",
              "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com https://embed.survcart.com https://*.survcart.com",
              "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.ggpht.com https://img.youtube.com https://*.survcart.com",
              "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com https://youtube.com https://kanai-estimator-tool.vercel.app https://kanai-estimator-form.vercel.app https://*.survcart.com https://embed.survcart.com",
              "connect-src 'self' https://*.supabase.co https://services.leadconnectorhq.com https://api.workiz.com https://places.googleapis.com https://maps.googleapis.com https://*.googleapis.com https://cdn.callrail.com https://js.callrail.com https://*.callrail.com https://*.survcart.com https://embed.survcart.com https://*.run.app",
              "worker-src 'self' blob:",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
