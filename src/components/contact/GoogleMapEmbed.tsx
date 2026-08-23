import { useEffect } from "react";
import { track } from "@/lib/analytics";
import type { Facility } from "./data";

export default function GoogleMapEmbed({ facility }: { facility: Facility }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(facility.mapEmbedQuery)}&output=embed`;

  useEffect(() => {
    track("map_loaded", { facility: facility.id });
  }, [facility.id]);

  return (
    <div className="relative h-full w-full min-h-[380px] lg:min-h-[460px] bg-stone-100">
      <iframe
        key={facility.id}
        title={`Map of ${facility.name}`}
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
