import { useCallback, useRef, useState } from "react";

/* ── Haversine distance (km) ──────────────────────────────── */
const R = 6_371; // Earth radius in km

export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ── Types ────────────────────────────────────────────────── */
export type GeoPosition = { lat: number; lng: number };

export type UseGeolocationReturn = {
  /** User's position once granted, or null */
  position: GeoPosition | null;
  /** True while the browser is requesting permission / acquiring position */
  loading: boolean;
  /** Human-readable error message, or null */
  error: string | null;
  /** Call this to prompt the user for geolocation permission */
  request: () => void;
  /** Compute distance from the user to an arbitrary point (km). Returns null if no position yet. */
  distanceTo: (lat: number, lng: number) => number | null;
};

/* ── Hook ─────────────────────────────────────────────────── */
export function useGeolocation(): UseGeolocationReturn {
  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requested = useRef(false);

  const request = useCallback(() => {
    if (requested.current) return;
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    requested.current = true;
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      (err) => {
        const messages: Record<number, string> = {
          [GeolocationPositionError.PERMISSION_DENIED]:
            "Location permission denied",
          [GeolocationPositionError.POSITION_UNAVAILABLE]:
            "Location unavailable",
          [GeolocationPositionError.TIMEOUT]: "Location request timed out",
        };
        setError(messages[err.code] ?? "Could not get location");
        setLoading(false);
        requested.current = false; // allow retry
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  }, []);

  const distanceTo = useCallback(
    (lat: number, lng: number): number | null => {
      if (!position) return null;
      return haversineKm(position.lat, position.lng, lat, lng);
    },
    [position],
  );

  return { position, loading, error, request, distanceTo };
}
