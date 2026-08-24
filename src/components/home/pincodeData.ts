export interface PincodeEntry {
  pincode: string;
  district: string;
  state: string;
  hub: string;
  hubLat: number;
  hubLng: number;
  lat: number;
  lng: number;
  deliveryDays: string;
  expressAvailable: boolean;
}

export interface HubLocation {
  id: string;
  name: string;
  address?: string;
  state: string;
  lat: number;
  lng: number;
  coverage: string;
}

export const AGAATE_HUBS: HubLocation[] = [
  {
    id: "hub-gurugram-flagship",
    name: "Agaate Kisaan Mall (Gurugram Flagship)",
    address: "Bilaspur Road, Patti Kawan, Bhora Kalan, Gurugram, Haryana 122413",
    state: "Haryana",
    lat: 28.3268,
    lng: 76.8402,
    coverage: "NCR, Haryana, Punjab, Rajasthan, UP",
  },
  {
    id: "hub-karnal",
    name: "Agaate Karnal Hub",
    state: "Haryana",
    lat: 29.6857,
    lng: 76.9905,
    coverage: "Haryana, Punjab, Western UP",
  },
  {
    id: "hub-varanasi",
    name: "Agaate Varanasi Hub",
    state: "Uttar Pradesh",
    lat: 25.3176,
    lng: 82.9739,
    coverage: "Purvanchal & Central UP",
  },
  {
    id: "hub-jaipur",
    name: "Agaate Jaipur Hub",
    state: "Rajasthan",
    lat: 26.9124,
    lng: 75.7873,
    coverage: "Rajasthan & North Gujarat",
  },
  {
    id: "hub-jabalpur",
    name: "Agaate Jabalpur Hub",
    state: "Madhya Pradesh",
    lat: 23.1815,
    lng: 79.9864,
    coverage: "Madhya Pradesh & CG",
  },
  {
    id: "hub-patna",
    name: "Agaate Regional Center (Patna)",
    state: "Bihar",
    lat: 25.5941,
    lng: 85.1376,
    coverage: "Bihar, Jharkhand, Eastern UP",
  },
  {
    id: "hub-pune",
    name: "Agaate Pune Hub",
    state: "Maharashtra",
    lat: 18.5204,
    lng: 73.8567,
    coverage: "Maharashtra & North KA",
  },
];

export const PINCODE_DATABASE: PincodeEntry[] = [
  // FLAGSHIP STORE DEFAULT: Gurugram, Haryana 122413
  {
    pincode: "122413",
    district: "Bhora Kalan (Gurugram)",
    state: "Haryana",
    hub: "Agaate Kisaan Mall (Gurugram Flagship)",
    hubLat: 28.3268,
    hubLng: 76.8402,
    lat: 28.3268,
    lng: 76.8402,
    deliveryDays: "Same/Next Day Gate Delivery",
    expressAvailable: true,
  },
  {
    pincode: "122103",
    district: "Sohna (Gurugram)",
    state: "Haryana",
    hub: "Agaate Kisaan Mall (Gurugram Flagship)",
    hubLat: 28.3268,
    hubLng: 76.8402,
    lat: 28.249,
    lng: 77.067,
    deliveryDays: "1 Day Gate Delivery",
    expressAvailable: true,
  },
  {
    pincode: "122001",
    district: "Gurugram City",
    state: "Haryana",
    hub: "Agaate Kisaan Mall (Gurugram Flagship)",
    hubLat: 28.3268,
    hubLng: 76.8402,
    lat: 28.4595,
    lng: 77.0266,
    deliveryDays: "1 Day Gate Delivery",
    expressAvailable: true,
  },
  {
    pincode: "132001",
    district: "Karnal",
    state: "Haryana",
    hub: "Agaate Kisaan Mall (Gurugram Flagship)",
    hubLat: 28.3268,
    hubLng: 76.8402,
    lat: 29.685,
    lng: 76.99,
    deliveryDays: "1-2 Days",
    expressAvailable: true,
  },
  {
    pincode: "302001",
    district: "Jaipur",
    state: "Rajasthan",
    hub: "Agaate Jaipur Hub",
    hubLat: 26.9124,
    hubLng: 75.7873,
    lat: 26.912,
    lng: 75.787,
    deliveryDays: "2 Days",
    expressAvailable: true,
  },
  {
    pincode: "221001",
    district: "Varanasi",
    state: "Uttar Pradesh",
    hub: "Agaate Varanasi Hub",
    hubLat: 25.3176,
    hubLng: 82.9739,
    lat: 25.318,
    lng: 82.974,
    deliveryDays: "2 Days",
    expressAvailable: true,
  },
  {
    pincode: "800001",
    district: "Patna",
    state: "Bihar",
    hub: "Agaate Regional Center (Patna)",
    hubLat: 25.5941,
    hubLng: 85.1376,
    lat: 25.611,
    lng: 85.144,
    deliveryDays: "2-3 Days",
    expressAvailable: true,
  },
];

/**
 * Haversine formula to calculate real distance between two lat/lng points in km
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Finds nearest Agaate Hub for any coordinate in India
 */
export function findNearestHub(
  lat: number,
  lng: number,
): { hub: HubLocation; distanceKm: number; deliveryDays: string } {
  let nearest: HubLocation = AGAATE_HUBS[0]!;
  let minDistance = Infinity;

  AGAATE_HUBS.forEach((hub) => {
    const dist = calculateHaversineDistance(lat, lng, hub.lat, hub.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = hub;
    }
  });

  let deliveryDays = "2–3 Days";
  if (minDistance < 50) {
    deliveryDays = "1 Day Gate Delivery";
  } else if (minDistance < 250) {
    deliveryDays = "1-2 Days";
  } else if (minDistance < 600) {
    deliveryDays = "2 Days";
  }

  return {
    hub: nearest,
    distanceKm: Math.round(minDistance),
    deliveryDays,
  };
}

/**
 * REAL Live OpenStreetMap Nominatim Geocoding API Search
 */
export async function fetchLivePredictions(query: string): Promise<PincodeEntry[]> {
  const clean = query.trim();
  if (!clean || clean.length < 2) return [];

  const localMatches = PINCODE_DATABASE.filter(
    (item) =>
      item.pincode.startsWith(clean) ||
      item.district.toLowerCase().includes(clean.toLowerCase()) ||
      item.state.toLowerCase().includes(clean.toLowerCase()),
  );

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      clean + ", India",
    )}&countrycodes=in&format=json&addressdetails=1&limit=6`;

    const res = await fetch(url, {
      headers: {
        "Accept-Language": "en",
      },
    });

    if (!res.ok) return localMatches;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return localMatches;

    const liveResults: PincodeEntry[] = data
      .map((item: any) => {
        const addr = item.address || {};
        const districtName =
          addr.town ||
          addr.city ||
          addr.district ||
          addr.county ||
          addr.suburb ||
          item.display_name.split(",")[0];

        const stateName = addr.state || "India";
        const pincodeVal = addr.postcode || (/\d{6}/.exec(item.display_name)?.[0] ?? "122413");
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);

        if (isNaN(lat) || isNaN(lng)) return null;

        const { hub, deliveryDays } = findNearestHub(lat, lng);

        return {
          pincode: pincodeVal,
          district: districtName,
          state: stateName,
          hub: hub.name,
          hubLat: hub.lat,
          hubLng: hub.lng,
          lat,
          lng,
          deliveryDays,
          expressAvailable: true,
        };
      })
      .filter((entry): entry is PincodeEntry => entry !== null);

    const combined = [...liveResults];
    localMatches.forEach((lm) => {
      if (!combined.some((c) => c.district.toLowerCase() === lm.district.toLowerCase())) {
        combined.push(lm);
      }
    });

    return combined.slice(0, 8);
  } catch (err) {
    return localMatches;
  }
}

/**
 * REAL Live Reverse Geocoding via OpenStreetMap for GPS Location
 */
export async function fetchLiveReverseGeocode(lat: number, lng: number): Promise<PincodeEntry> {
  const { hub, deliveryDays } = findNearestHub(lat, lng);

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    const res = await fetch(url, {
      headers: {
        "Accept-Language": "en",
      },
    });

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const districtName =
        addr.town ||
        addr.city ||
        addr.district ||
        addr.county ||
        addr.suburb ||
        "Detected Field Location";
      const stateName = addr.state || "India";
      const pincodeVal = addr.postcode || "122413";

      return {
        pincode: pincodeVal,
        district: districtName,
        state: stateName,
        hub: hub.name,
        hubLat: hub.lat,
        hubLng: hub.lng,
        lat,
        lng,
        deliveryDays,
        expressAvailable: true,
      };
    }
  } catch (err) {
    // Fallback if offline
  }

  return {
    pincode: "122413",
    district: "Gurugram (Bhora Kalan)",
    state: "Haryana",
    hub: hub.name,
    hubLat: hub.lat,
    hubLng: hub.lng,
    lat,
    lng,
    deliveryDays,
    expressAvailable: true,
  };
}

export function searchPincodesLetterByLetter(query: string): PincodeEntry[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  return PINCODE_DATABASE.filter((item) => {
    return (
      item.pincode.startsWith(clean) ||
      item.district.toLowerCase().includes(clean) ||
      item.state.toLowerCase().includes(clean) ||
      item.hub.toLowerCase().includes(clean)
    );
  }).slice(0, 8);
}

export function findPincode(pin: string): PincodeEntry | null {
  const clean = pin.trim();
  const match = PINCODE_DATABASE.find((item) => item.pincode === clean);
  if (match) return match;

  if (/^\d{6}$/.test(clean)) {
    const flagship = AGAATE_HUBS[0]!; // Gurugram flagship

    return {
      pincode: clean,
      district: `PIN ${clean} Zone`,
      state: "India",
      hub: flagship.name,
      hubLat: flagship.lat,
      hubLng: flagship.lng,
      lat: flagship.lat + 0.1,
      lng: flagship.lng + 0.1,
      deliveryDays: "2 Days",
      expressAvailable: true,
    };
  }

  return null;
}
