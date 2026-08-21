import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

interface RealLeafletMapProps {
  targetLat: number;
  targetLng: number;
  targetName: string;
  pincode: string;
  hubLat: number;
  hubLng: number;
  hubName: string;
  hubs: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
  }>;
}

export default function RealLeafletMap({
  targetLat,
  targetLng,
  targetName,
  pincode,
  hubLat,
  hubLng,
  hubName,
  hubs,
}: RealLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);

  const [mapMode, setMapMode] = useState<"street" | "satellite">("street");

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Fix Leaflet default icon path issues in bundlers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current) {
        // Initialize Map centered on target location
        const map = L.map(mapContainerRef.current, {
          center: [targetLat, targetLng],
          zoom: 8,
          zoomControl: false,
        });

        // Initial Tile Layer
        const streetUrl =
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
        const satelliteUrl =
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

        const activeUrl = mapMode === "satellite" ? satelliteUrl : streetUrl;

        const tileLayer = L.tileLayer(activeUrl, {
          attribution:
            mapMode === "satellite"
              ? "Tiles &copy; Esri"
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }).addTo(map);

        L.control.zoom({ position: "topright" }).addTo(map);

        mapInstanceRef.current = map;
        tileLayerRef.current = tileLayer;
        markersGroupRef.current = L.layerGroup().addTo(map);
      } else {
        // Update Tile Layer if mapMode changed
        const L = (await import("leaflet")).default;
        if (tileLayerRef.current) {
          mapInstanceRef.current.removeLayer(tileLayerRef.current);
        }

        const streetUrl =
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
        const satelliteUrl =
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

        const activeUrl = mapMode === "satellite" ? satelliteUrl : streetUrl;

        tileLayerRef.current = L.tileLayer(activeUrl, {
          attribution:
            mapMode === "satellite"
              ? "Tiles &copy; Esri"
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }).addTo(mapInstanceRef.current);
      }

      const map = mapInstanceRef.current;
      const markersGroup = markersGroupRef.current;

      markersGroup.clearLayers();

      // Custom Dark Green Hub Marker Icon
      const hubIcon = L.divIcon({
        className: "custom-hub-icon",
        html: `<div style="background-color: #143d31; color: #ffffff; width: 28px; height: 28px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold;">🏢</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      // Custom Target Destination Pin Icon
      const targetIcon = L.divIcon({
        className: "custom-target-icon",
        html: `<div style="background-color: #000000; color: #ffffff; padding: 4px 10px; border-radius: 20px; border: 2px solid #143d31; font-family: sans-serif; font-size: 11px; font-weight: bold; box-shadow: 0 4px 14px rgba(0,0,0,0.4); white-space: nowrap;">📍 ${targetName} (${pincode})</div>`,
        iconSize: [120, 30],
        iconAnchor: [60, 30],
      });

      // Add all Hub Markers to Map
      hubs.forEach((h) => {
        const marker = L.marker([h.lat, h.lng], { icon: hubIcon });
        marker.bindPopup(
          `<div style="font-family: sans-serif; font-size: 12px; font-weight: bold; color: #143d31;">${h.name}</div>`
        );
        markersGroup.addLayer(marker);
      });

      // Add Target Destination Marker
      const targetMarker = L.marker([targetLat, targetLng], { icon: targetIcon });
      targetMarker.bindPopup(
        `<div style="font-family: sans-serif; font-size: 12px; font-weight: bold; color: #143d31;">📍 ${targetName} (${pincode})<br/><span style="font-size:10px; color:#555;">Farm Gate Delivery Destination</span></div>`
      );
      markersGroup.addLayer(targetMarker);

      // Draw Route Line from Hub to Destination
      const routeLine = L.polyline(
        [
          [hubLat, hubLng],
          [targetLat, targetLng],
        ],
        {
          color: mapMode === "satellite" ? "#a3e635" : "#143d31",
          weight: 3.5,
          dashArray: "6, 6",
          opacity: 0.9,
        }
      );
      markersGroup.addLayer(routeLine);

      // Fit map bounds to show both Hub & Target Location
      const bounds = L.latLngBounds([
        [hubLat, hubLng],
        [targetLat, targetLng],
      ]);
      map.fitBounds(bounds, { padding: [45, 45], maxZoom: 11 });
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, [targetLat, targetLng, targetName, pincode, hubLat, hubLng, hubName, hubs, mapMode]);

  return (
    <div className="relative w-full h-full min-h-[360px] rounded-2xl overflow-hidden border border-gray-200">
      {/* Map Mode Switcher Floating Pill */}
      <div className="absolute top-3 left-3 z-[400] flex items-center bg-white/90 backdrop-blur-md rounded-xl p-1 shadow-md border border-gray-200/80 text-xs font-bold">
        <button
          type="button"
          onClick={() => setMapMode("street")}
          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
            mapMode === "street"
              ? "bg-[#143d31] text-white shadow-sm"
              : "text-gray-700 hover:text-black"
          }`}
        >
          🗺️ Map
        </button>
        <button
          type="button"
          onClick={() => setMapMode("satellite")}
          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
            mapMode === "satellite"
              ? "bg-[#143d31] text-white shadow-sm"
              : "text-gray-700 hover:text-black"
          }`}
        >
          🛰️ Satellite
        </button>
      </div>

      <div ref={mapContainerRef} className="w-full h-full min-h-[360px] z-10" />
    </div>
  );
}
