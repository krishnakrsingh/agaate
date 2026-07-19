export interface Article {
  id: string;
  title: string;
  cat: string;
  time: string;
  date: string;
  desc: string;
  content: string;
}

export interface JobPosition {
  id: string;
  title: string;
  dept: string;
  loc: string;
  type: string;
  desc: string;
  reqs: string[];
}

export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  pricePerAc: number;
  crop: string;
  desc: string;
}

export interface CartItem {
  id: string;
  name: string;
  category: string;
  pricePerAc: number;
  qtyNeeded: number;
}

export interface VerifiedProductInfo {
  batch: string;
  purity: string;
  verifiedAt: string;
  producer: string;
  composition: string;
  distribution: string;
}

export interface TelemetryPoint {
  time: string;
  moisture: number;
  ec: number;
  temp: number;
}

export interface ForecastPoint {
  year: string;
  "CO2 Locked (Tons)": number;
  "Estimated Payout (₹)": number;
}

export interface CarbonPractice {
  id: string;
  name: string;
  desc: string;
  value: number;
}
