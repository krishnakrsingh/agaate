import { useEffect } from "react";
import { track } from "@/lib/analytics";
import type { Facility } from "./data";

export interface GoogleMapEmbedProps {
  facility: Facility;
  mapType?: "satellite" | "roadmap";
  zoom?: number;
}

export default function GoogleMapEmbed({
  facility,
  mapType = "satellite",
  zoom = 14,
}: GoogleMapEmbedProps) {
  // t=k is satellite imagery; t=m is standard roadmap; z=14 provides balanced area context & road visibility
  const tParam = mapType === "roadmap" ? "m" : "k";
  const query = `${facility.coordinates.lat},${facility.coordinates.lng}`;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&t=${tParam}&z=${zoom}&output=embed`;

  useEffect(() => {
    track("map_loaded", { facility: facility.id, mapType });
  }, [facility.id, mapType]);

  return (
    <div className="relative h-full w-full min-h-[280px] sm:min-h-[320px] bg-stone-900">
      <iframe
        key={`${facility.id}-${mapType}`}
        title={`Satellite Map of ${facility.name}`}
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
