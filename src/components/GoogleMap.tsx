"use client";

import { useEffect, useRef, useState } from "react";

const API_KEY = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "").trim();

const KANAI_LOCATION = { lat: 21.3712803, lng: -157.9069427 };

const OAHU_POLYGON = [
  { lat: 21.255, lng: -157.65 }, { lat: 21.32, lng: -157.64 },
  { lat: 21.40, lng: -157.67 }, { lat: 21.48, lng: -157.72 },
  { lat: 21.58, lng: -157.82 }, { lat: 21.59, lng: -157.90 },
  { lat: 21.58, lng: -158.00 }, { lat: 21.57, lng: -158.10 },
  { lat: 21.55, lng: -158.15 }, { lat: 21.50, lng: -158.23 },
  { lat: 21.45, lng: -158.28 }, { lat: 21.40, lng: -158.28 },
  { lat: 21.35, lng: -158.25 }, { lat: 21.28, lng: -158.18 },
  { lat: 21.25, lng: -158.10 }, { lat: 21.26, lng: -158.00 },
  { lat: 21.25, lng: -157.85 }, { lat: 21.25, lng: -157.72 },
];

interface Marker {
  lat: number;
  lng: number;
  title: string;
  href?: string;
}

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  showKanaiPin?: boolean;
  showServiceArea?: boolean;
  markers?: Marker[];
  showDirectionsButton?: boolean;
}

function IframeFallback({ center, className }: { center: { lat: number; lng: number }; className: string }) {
  return (
    <div className={className}>
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d119750!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1`}
        width="100%"
        height="100%"
        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
      />
    </div>
  );
}

export default function GoogleMap({
  center = KANAI_LOCATION,
  zoom = 11,
  className = "w-full h-full",
  showKanaiPin = true,
  showServiceArea = false,
  markers = [],
  showDirectionsButton = false,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!API_KEY) {
      console.warn("[GoogleMap] No API key");
      setStatus("error");
      return;
    }

    // Load the script if not already present
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');

    function initMap() {
      if (!mapRef.current || !window.google?.maps) return;

      try {
        const g = window.google.maps;

        const map = new g.Map(mapRef.current, {
          center,
          zoom,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          backgroundColor: "#1A1A18",
          styles: [
            { elementType: "geometry", stylers: [{ color: "#1A1A18" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#1A1A18" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#6B6B60" }] },
            { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#2A2A27" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#2A2A27" }] },
            { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1A1A18" }] },
            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3A3A35" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0F0F0E" }] },
            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3A3A35" }] },
            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1F1F1C" }] },
            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#5A5A50" }] },
            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1F2A1F" }] },
            { featureType: "transit", elementType: "geometry", stylers: [{ color: "#222220" }] },
          ],
        });

        if (showKanaiPin) {
          const marker = new g.Marker({
            position: KANAI_LOCATION,
            map,
            title: "Kana'i's Roll Off & Junk Removal",
          });
          const infoWindow = new g.InfoWindow({
            content: `<div style="font-family:sans-serif;padding:4px 0;">
              <strong style="font-size:14px;">Kana&apos;i&apos;s Roll Off</strong><br/>
              <span style="color:#666;font-size:12px;">99-1295 Waiua Pl, Aiea, HI 96701</span><br/>
              <a href="tel:+18082012668" style="color:#D4850A;font-size:12px;font-weight:600;">(808) 201-2668</a>
            </div>`,
          });
          marker.addListener("click", () => infoWindow.open(map, marker));
        }

        if (showServiceArea) {
          new g.Polygon({
            paths: OAHU_POLYGON,
            strokeColor: "#D4850A",
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: "#D4850A",
            fillOpacity: 0.08,
            map,
          });
        }

        for (const m of markers) {
          const pin = new g.Marker({
            position: { lat: m.lat, lng: m.lng },
            map,
            title: m.title,
          });
          if (m.href) {
            const info = new g.InfoWindow({
              content: `<a href="${m.href}" style="color:#D4850A;font-weight:600;font-size:13px;text-decoration:none;">${m.title}</a>`,
            });
            pin.addListener("click", () => info.open(map, pin));
          }
        }

        setStatus("ready");
      } catch (err) {
        console.error("[GoogleMap] Init error:", err);
        setStatus("error");
      }
    }

    if (existingScript && window.google?.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => initMap();
    script.onerror = () => {
      console.error("[GoogleMap] Script load failed");
      setStatus("error");
    };
    document.head.appendChild(script);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "error") {
    return <IframeFallback center={center} className={className} />;
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className={className} />
      {status === "loading" && (
        <div className="absolute inset-0 bg-[#1A1A18] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-brand-amber border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {showDirectionsButton && status === "ready" && (
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${KANAI_LOCATION.lat},${KANAI_LOCATION.lng}&destination_place_id=ChIJvX0Up5trAHwRI9WqRSiME3w`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 bg-brand-amber text-brand-dark font-semibold text-sm rounded-lg shadow-lg hover:bg-brand-amber-light transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
          Get Directions
        </a>
      )}
    </div>
  );
}
