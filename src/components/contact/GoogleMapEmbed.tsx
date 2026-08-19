import { useEffect } from "react";
import { track } from "@/lib/analytics";
import type { Facility } from "./data";

export default function GoogleMapEmbed({
  facility,
  query,
}: {
  facility?: Facility;
  query?: string;
}) {
  const mapQuery = query || facility?.mapEmbedQuery || "Gurugram Haryana India";
  const facilityId = facility?.id || "facility-map";
  const facilityName = facility?.name || "Agaate Location";
  const src = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  useEffect(() => {
    track("map_loaded", { facility: facilityId });
  }, [facilityId]);

  return (
    <div className="relative h-full min-h-[380px] w-full overflow-hidden bg-[#f4f8f5]">
      <iframe
        key={mapQuery}
        title={`Map of ${facilityName}`}
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
