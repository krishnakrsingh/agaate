export type GeocodeResult = {
  lat: number;
  lng: number;
  displayName: string;
  addressLine: string;
  district: string;
  plusCode?: string;
};

const NOMINATIM_HEADERS = {
  Accept: "en",
  "User-Agent": "AgaateAdmin/1.0 (contact@agaate.in)",
};

function parseNominatimItem(item: {
  lat: string;
  lon: string;
  display_name: string;
  address?: Record<string, string>;
}): GeocodeResult | null {
  const lat = Number.parseFloat(item.lat);
  const lng = Number.parseFloat(item.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const addr = item.address ?? {};
  const city =
    addr.city || addr.town || addr.village || addr.suburb || addr.county || addr.district || "";
  const state = addr.state || "";
  const district = state ? `${city}, ${state}`.replace(/^,\s*/, "").trim() : city || item.display_name.split(",")[0] || "";

  const parts = [
    addr.house_number,
    addr.road,
    addr.neighbourhood,
    city,
    state,
    addr.postcode,
  ].filter(Boolean);

  return {
    lat,
    lng,
    displayName: item.display_name,
    addressLine: parts.join(", ") || item.display_name.split(",").slice(0, 3).join(", "),
    district: district || "India",
    plusCode: addr.postcode,
  };
}

export function formatCoordLabels(lat: number, lng: number) {
  return {
    latLabel: `${lat.toFixed(4)}° N`,
    lngLabel: `${lng.toFixed(4)}° E`,
  };
}

export function buildGoogleMapsSearchUrl(lat: number, lng: number, label?: string) {
  const query = label?.trim()
    ? encodeURIComponent(label)
    : encodeURIComponent(`${lat},${lng}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function buildMapEmbedQuery(lat: number, lng: number, label?: string) {
  return label?.trim() || `${lat.toFixed(6)},${lng.toFixed(6)}`;
}

/** Extract lat/lng from common Google Maps URL formats. */
export function parseGoogleMapsUrl(url: string): { lat: number; lng: number } | null {
  const raw = url.trim();
  if (!raw) return null;

  try {
    const parsed = new URL(raw);
    const q = parsed.searchParams.get("q") ?? parsed.searchParams.get("query");
    if (q) {
      const coordMatch = /^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/.exec(q);
      if (coordMatch) {
        return { lat: Number(coordMatch[1]), lng: Number(coordMatch[2]) };
      }
    }

    const atMatch = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/.exec(parsed.pathname + parsed.hash);
    if (atMatch) {
      return { lat: Number(atMatch[1]), lng: Number(atMatch[2]) };
    }

    const pathCoord = /!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/.exec(raw);
    if (pathCoord) {
      return { lat: Number(pathCoord[1]), lng: Number(pathCoord[2]) };
    }
  } catch {
    const loose = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/.exec(raw);
    if (loose) return { lat: Number(loose[1]), lng: Number(loose[2]) };
  }

  return null;
}

export async function searchPlaces(query: string, limit = 6): Promise<GeocodeResult[]> {
  const clean = query.trim();
  if (clean.length < 2) return [];

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    clean.includes("India") ? clean : `${clean}, India`,
  )}&countrycodes=in&format=json&addressdetails=1&limit=${limit}`;

  const res = await fetch(url, { headers: NOMINATIM_HEADERS });
  if (!res.ok) return [];

  const data = await res.json();
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => parseNominatimItem(item))
    .filter((item): item is GeocodeResult => item !== null);
}

export async function geocodePlace(query: string): Promise<GeocodeResult | null> {
  const results = await searchPlaces(query, 1);
  return results[0] ?? null;
}

export async function reverseGeocodePlace(lat: number, lng: number): Promise<GeocodeResult | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
  const res = await fetch(url, { headers: NOMINATIM_HEADERS });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data?.lat || !data?.lon) return null;
  return parseNominatimItem(data);
}

export function applyGeocodeToFacility(
  result: GeocodeResult,
  options?: { fillAddress?: boolean; fillDistrict?: boolean },
): {
  lat: number;
  lng: number;
  latLabel: string;
  lngLabel: string;
  mapEmbedQuery: string;
  mapsUrl: string;
  addressEn?: string;
  districtEn?: string;
  plusCode?: string;
} {
  const labels = formatCoordLabels(result.lat, result.lng);
  const patch: ReturnType<typeof applyGeocodeToFacility> = {
    lat: result.lat,
    lng: result.lng,
    ...labels,
    mapEmbedQuery: buildMapEmbedQuery(result.lat, result.lng, result.displayName.split(",")[0]),
    mapsUrl: buildGoogleMapsSearchUrl(result.lat, result.lng, result.displayName.split(",")[0]),
  };
  if (options?.fillAddress && result.addressLine) patch.addressEn = result.addressLine;
  if (options?.fillDistrict && result.district) patch.districtEn = result.district;
  if (result.plusCode) patch.plusCode = result.plusCode;
  return patch;
}
