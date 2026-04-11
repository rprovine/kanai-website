"use client";

import GoogleMap from "@/components/GoogleMap";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";

const markers = NEIGHBORHOODS.map((n) => ({
  lat: n.lat,
  lng: n.lng,
  title: n.name,
  href: `/service-area/${n.slug}`,
}));

export default function ServiceAreaMap() {
  return (
    <GoogleMap
      center={{ lat: 21.45, lng: -157.97 }}
      zoom={10}
      className="w-full h-full"
      showKanaiPin
      showServiceArea
      markers={markers}
    />
  );
}
