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
  state: string;
  lat: number;
  lng: number;
  coverage: string;
}

export const AGAATE_HUBS: HubLocation[] = [
  { id: "hub-patna", name: "Agaate Patna Hub", state: "Bihar", lat: 25.5941, lng: 85.1376, coverage: "Bihar, Jharkhand, Eastern UP" },
  { id: "hub-varanasi", name: "Agaate Varanasi Hub", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, coverage: "Purvanchal & Central UP" },
  { id: "hub-jabalpur", name: "Agaate Jabalpur Hub", state: "Madhya Pradesh", lat: 23.1815, lng: 79.9864, coverage: "Madhya Pradesh & CG" },
  { id: "hub-jaipur", name: "Agaate Jaipur Hub", state: "Rajasthan", lat: 26.9124, lng: 75.7873, coverage: "Rajasthan & North Gujarat" },
  { id: "hub-pune", name: "Agaate Pune Hub", state: "Maharashtra", lat: 18.5204, lng: 73.8567, coverage: "Maharashtra & North KA" },
  { id: "hub-karnal", name: "Agaate NCR Karnal Hub", state: "Haryana", lat: 29.6857, lng: 76.9905, coverage: "Haryana, Punjab, Western UP" },
  { id: "hub-hyderabad", name: "Agaate Hyderabad Hub", state: "Telangana", lat: 17.385, lng: 78.4867, coverage: "Telangana & AP" },
];

export const PINCODE_DATABASE: PincodeEntry[] = [
  // Bihar
  { pincode: "800001", district: "Patna", state: "Bihar", hub: "Agaate Patna Hub", hubLat: 25.5941, hubLng: 85.1376, lat: 25.611, lng: 85.144, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "842001", district: "Muzaffarpur", state: "Bihar", hub: "Agaate Patna Hub", hubLat: 25.5941, hubLng: 85.1376, lat: 26.122, lng: 85.39, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "851101", district: "Begusarai", state: "Bihar", hub: "Agaate Patna Hub", hubLat: 25.5941, hubLng: 85.1376, lat: 25.418, lng: 86.127, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "823001", district: "Gaya", state: "Bihar", hub: "Agaate Patna Hub", hubLat: 25.5941, hubLng: 85.1376, lat: 24.795, lng: 85.0, deliveryDays: "2-3 Days", expressAvailable: true },
  { pincode: "846004", district: "Darbhanga", state: "Bihar", hub: "Agaate Patna Hub", hubLat: 25.5941, hubLng: 85.1376, lat: 26.154, lng: 85.891, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "854301", district: "Purnea", state: "Bihar", hub: "Agaate Patna Hub", hubLat: 25.5941, hubLng: 85.1376, lat: 25.777, lng: 87.475, deliveryDays: "3 Days", expressAvailable: true },
  { pincode: "802301", district: "Bhojpur (Arrah)", state: "Bihar", hub: "Agaate Patna Hub", hubLat: 25.5941, hubLng: 85.1376, lat: 25.556, lng: 84.664, deliveryDays: "2 Days", expressAvailable: true },

  // Uttar Pradesh
  { pincode: "221001", district: "Varanasi", state: "Uttar Pradesh", hub: "Agaate Varanasi Hub", hubLat: 25.3176, hubLng: 82.9739, lat: 25.318, lng: 82.974, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "226001", district: "Lucknow", state: "Uttar Pradesh", hub: "Agaate Varanasi Hub", hubLat: 25.3176, hubLng: 82.9739, lat: 26.847, lng: 80.946, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "273001", district: "Gorakhpur", state: "Uttar Pradesh", hub: "Agaate Varanasi Hub", hubLat: 25.3176, hubLng: 82.9739, lat: 26.76, lng: 83.373, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "208001", district: "Kanpur", state: "Uttar Pradesh", hub: "Agaate Varanasi Hub", hubLat: 25.3176, hubLng: 82.9739, lat: 26.449, lng: 80.331, deliveryDays: "2-3 Days", expressAvailable: true },
  { pincode: "211001", district: "Prayagraj", state: "Uttar Pradesh", hub: "Agaate Varanasi Hub", hubLat: 25.3176, hubLng: 82.9739, lat: 25.435, lng: 81.846, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "250001", district: "Meerut", state: "Uttar Pradesh", hub: "Agaate NCR Karnal Hub", hubLat: 29.6857, hubLng: 76.9905, lat: 28.984, lng: 77.706, deliveryDays: "2 Days", expressAvailable: true },

  // Madhya Pradesh
  { pincode: "482001", district: "Jabalpur", state: "Madhya Pradesh", hub: "Agaate Jabalpur Hub", hubLat: 23.1815, hubLng: 79.9864, lat: 23.181, lng: 79.986, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "462001", district: "Bhopal", state: "Madhya Pradesh", hub: "Agaate Jabalpur Hub", hubLat: 23.1815, hubLng: 79.9864, lat: 23.259, lng: 77.412, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "452001", district: "Indore", state: "Madhya Pradesh", hub: "Agaate Jabalpur Hub", hubLat: 23.1815, hubLng: 79.9864, lat: 22.719, lng: 75.857, deliveryDays: "2-3 Days", expressAvailable: true },
  { pincode: "474001", district: "Gwalior", state: "Madhya Pradesh", hub: "Agaate Jabalpur Hub", hubLat: 23.1815, hubLng: 79.9864, lat: 26.218, lng: 78.177, deliveryDays: "2-3 Days", expressAvailable: true },
  { pincode: "487001", district: "Narsinghpur", state: "Madhya Pradesh", hub: "Agaate Jabalpur Hub", hubLat: 23.1815, hubLng: 79.9864, lat: 22.966, lng: 79.198, deliveryDays: "2 Days", expressAvailable: true },

  // Rajasthan
  { pincode: "302001", district: "Jaipur", state: "Rajasthan", hub: "Agaate Jaipur Hub", hubLat: 26.9124, hubLng: 75.7873, lat: 26.912, lng: 75.787, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "342001", district: "Jodhpur", state: "Rajasthan", hub: "Agaate Jaipur Hub", hubLat: 26.9124, hubLng: 75.7873, lat: 26.238, lng: 73.024, deliveryDays: "2-3 Days", expressAvailable: true },
  { pincode: "324001", district: "Kota", state: "Rajasthan", hub: "Agaate Jaipur Hub", hubLat: 26.9124, hubLng: 75.7873, lat: 25.213, lng: 75.864, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "335001", district: "Sri Ganganagar", state: "Rajasthan", hub: "Agaate Jaipur Hub", hubLat: 26.9124, hubLng: 75.7873, lat: 29.903, lng: 73.877, deliveryDays: "3 Days", expressAvailable: true },

  // Maharashtra
  { pincode: "411001", district: "Pune", state: "Maharashtra", hub: "Agaate Pune Hub", hubLat: 18.5204, hubLng: 73.8567, lat: 18.52, lng: 73.856, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "400001", district: "Mumbai", state: "Maharashtra", hub: "Agaate Pune Hub", hubLat: 18.5204, hubLng: 73.8567, lat: 18.938, lng: 72.835, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "440001", district: "Nagpur", state: "Maharashtra", hub: "Agaate Jabalpur Hub", hubLat: 23.1815, hubLng: 79.9864, lat: 21.145, lng: 79.088, deliveryDays: "2-3 Days", expressAvailable: true },
  { pincode: "422001", district: "Nashik", state: "Maharashtra", hub: "Agaate Pune Hub", hubLat: 18.5204, hubLng: 73.8567, lat: 19.997, lng: 73.789, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "413001", district: "Solapur", state: "Maharashtra", hub: "Agaate Pune Hub", hubLat: 18.5204, hubLng: 73.8567, lat: 17.659, lng: 75.906, deliveryDays: "2-3 Days", expressAvailable: true },

  // Haryana & Punjab
  { pincode: "132001", district: "Karnal", state: "Haryana", hub: "Agaate NCR Karnal Hub", hubLat: 29.6857, hubLng: 76.9905, lat: 29.685, lng: 76.99, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "125001", district: "Hisar", state: "Haryana", hub: "Agaate NCR Karnal Hub", hubLat: 29.6857, hubLng: 76.9905, lat: 29.149, lng: 75.721, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "141001", district: "Ludhiana", state: "Punjab", hub: "Agaate NCR Karnal Hub", hubLat: 29.6857, hubLng: 76.9905, lat: 30.901, lng: 75.857, deliveryDays: "2 Days", expressAvailable: true },
  { pincode: "143001", district: "Amritsar", state: "Punjab", hub: "Agaate NCR Karnal Hub", hubLat: 29.6857, hubLng: 76.9905, lat: 31.634, lng: 74.872, deliveryDays: "2-3 Days", expressAvailable: true },
  { pincode: "160001", district: "Chandigarh", state: "Chandigarh", hub: "Agaate NCR Karnal Hub", hubLat: 29.6857, hubLng: 76.9905, lat: 30.733, lng: 76.779, deliveryDays: "2 Days", expressAvailable: true },

  // Telangana & Andhra Pradesh
  { pincode: "500001", district: "Hyderabad", state: "Telangana", hub: "Agaate Hyderabad Hub", hubLat: 17.385, hubLng: 78.4867, lat: 17.385, lng: 78.486, deliveryDays: "2-3 Days", expressAvailable: true },
  { pincode: "520001", district: "Vijayawada", state: "Andhra Pradesh", hub: "Agaate Hyderabad Hub", hubLat: 17.385, hubLng: 78.4867, lat: 16.506, lng: 80.648, deliveryDays: "3 Days", expressAvailable: true },

  // West Bengal & Gujarat
  { pincode: "700001", district: "Kolkata", state: "West Bengal", hub: "Agaate Patna Hub", hubLat: 25.5941, hubLng: 85.1376, lat: 22.572, lng: 88.363, deliveryDays: "3 Days", expressAvailable: true },
  { pincode: "380001", district: "Ahmedabad", state: "Gujarat", hub: "Agaate Jaipur Hub", hubLat: 26.9124, hubLng: 75.7873, lat: 23.022, lng: 72.571, deliveryDays: "2-3 Days", expressAvailable: true }
];

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
    // Generate dynamic fallback for any valid 6-digit Indian PIN
    const firstDigit = clean[0];
    let state = "India";
    let district = "Regional Zone";
    let hub = AGAATE_HUBS[0];

    if (firstDigit === "8") {
      state = "Bihar / Jharkhand";
      district = "Eastern Zone";
      hub = AGAATE_HUBS[0]; // Patna
    } else if (firstDigit === "2") {
      state = "Uttar Pradesh";
      district = "UP Central Zone";
      hub = AGAATE_HUBS[1]; // Varanasi
    } else if (firstDigit === "4") {
      state = "Madhya Pradesh / Maharashtra";
      district = "Central Zone";
      hub = AGAATE_HUBS[2]; // Jabalpur
    } else if (firstDigit === "3") {
      state = "Rajasthan / Gujarat";
      district = "Western Zone";
      hub = AGAATE_HUBS[3]; // Jaipur
    } else if (firstDigit === "1") {
      state = "Haryana / Punjab / Delhi";
      district = "North Zone";
      hub = AGAATE_HUBS[5]; // Karnal
    } else if (firstDigit === "5" || firstDigit === "6") {
      state = "South India";
      district = "Deccan Zone";
      hub = AGAATE_HUBS[6]; // Hyderabad
    }

    return {
      pincode: clean,
      district,
      state,
      hub: hub.name,
      hubLat: hub.lat,
      hubLng: hub.lng,
      lat: hub.lat + (Math.random() * 0.4 - 0.2),
      lng: hub.lng + (Math.random() * 0.4 - 0.2),
      deliveryDays: "2–3 Days",
      expressAvailable: true,
    };
  }

  return null;
}
