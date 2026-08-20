import {
  Buildings,
  ChatCircleText,
  Compass,
  type Icon,
  Lightning,
  Plant,
  Stack,
  Storefront,
} from "@phosphor-icons/react";
import farmImage from "@/assets/agro-park.jpg";
import mallImage from "@/assets/kisaan-mall-gen.png";
import officeImage from "@/assets/about-farmer-advisor.png";

export const PRIMARY_PHONE = "+91 83500 85005";
export const ALT_PHONE = "+91 94872 63498";
export const TEL_PRIMARY = "+918350085005";
export const TEL_ALT = "+919487263498";
export const EMAIL = "info@agaate.in";

export const CONTACT_PREFILL_MESSAGE =
  "Hello Agaate Team, I am reaching out for assistance and would appreciate a response at your earliest convenience.";

export const WHATSAPP_URL = `https://wa.me/918350085005?text=${encodeURIComponent(CONTACT_PREFILL_MESSAGE)}`;

export const MAILTO_URL = `mailto:${EMAIL}?subject=${encodeURIComponent("Inquiry — Agaate")}&body=${encodeURIComponent(CONTACT_PREFILL_MESSAGE)}`;

export type Facility = {
  id: string;
  name: string;
  tagline: string;
  role: string;
  address: string;
  district: string;
  plusCode?: string;
  phone: string;
  telRaw: string;
  email: string;
  hours: string;
  team: string;
  highlights: string[];
  mapsUrl: string;
  mapEmbedQuery: string;
  coordinates: { lat: number; lng: number; latLabel: string; lngLabel: string };
  icon: Icon;
  image: string;
};

export const FACILITIES: Facility[] = [
  {
    id: "farm",
    name: "Agaate Anzix Farm",
    tagline: "17-Acre Smart Nursery & High-Tech R&D Facility",
    role: "Farm & Production Facility",
    address: "NH8, opposite Bikanervala, Kukrola / Pachgaon, Gurugram, Haryana 122413",
    district: "Gurugram, Haryana",
    plusCode: "8WG2+QR6",
    phone: ALT_PHONE,
    telRaw: TEL_ALT,
    email: EMAIL,
    hours: "Mon – Sat: 07:30 AM – 06:30 PM",
    team: "Agaate Field Advisory & Propagation Team",
    highlights: [
      "AI-driven climate monitoring & seedless nursery labs",
      "Bio-Boosted seedling propagation & pre-order pickup",
      "Living demonstration plots for watermelons & chillies",
      "Direct Kisan Sathi on-field support counter",
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=8WG2%2BQR6+Gurugram",
    mapEmbedQuery: "8WG2+QR6 Gurugram",
    coordinates: {
      lat: 28.3241,
      lng: 76.9124,
      latLabel: "28.3241° N",
      lngLabel: "76.9124° E",
    },
    icon: Plant,
    image: farmImage,
  },
  {
    id: "mall",
    name: "Agaate Kisan Mall",
    tagline: "Comprehensive Agri-Input Storefront & Experience Hub",
    role: "Retail & Experience Center",
    address: "Bilaspur Rd, Patti Kawan, Bhora Kalan, Bilaspur Kalan, Gurugram, Haryana 122413",
    district: "Gurugram, Haryana",
    plusCode: "8W88+9C Gurugram",
    phone: PRIMARY_PHONE,
    telRaw: TEL_PRIMARY,
    email: EMAIL,
    hours: "Mon – Sun: 08:00 AM – 08:00 PM",
    team: "Agaate Kisan Mall Agronomist & Retail Counter",
    highlights: [
      "500+ SKUs of seeds, biocures & drip hardware",
      "On-site scientific soil testing & basal dose planning",
      "Mulching (18x12 & 1ft) and bamboo staking supplies",
      "Direct buyback market registration counter",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Agaate+Kisan+Mall+Bilaspur+Rd+Gurugram",
    mapEmbedQuery: "Agaate Kisan Mall Bilaspur Rd Gurugram",
    coordinates: {
      lat: 28.3015,
      lng: 76.8842,
      latLabel: "28.3015° N",
      lngLabel: "76.8842° E",
    },
    icon: Storefront,
    image: mallImage,
  },
  {
    id: "corporate",
    name: "Anzix Farm Technologies Pvt Ltd",
    tagline: "Corporate Headquarters & Governance Center",
    role: "Corporate Registered Office",
    address: "I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004",
    district: "Gurugram, Haryana",
    plusCode: "CIN: U46200HR2024PTC121982",
    phone: PRIMARY_PHONE,
    telRaw: TEL_PRIMARY,
    email: EMAIL,
    hours: "Mon – Fri: 09:30 AM – 06:00 PM",
    team: "Executive Leadership & Tech Strategy Division",
    highlights: [
      "Turnkey Big-Farm Setup strategy & project planning",
      "Carbon Credit Program enrolment & MRV verification",
      "Institutional seed company partnerships & ties",
      "Campus recruitment & research administration",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bestech+Park+View+Ananda+Sector+81+Gurugram",
    mapEmbedQuery: "Bestech Park View Ananda Sector 81 Gurugram",
    coordinates: {
      lat: 28.398,
      lng: 76.961,
      latLabel: "28.3980° N",
      lngLabel: "76.9610° E",
    },
    icon: Buildings,
    image: officeImage,
  },
];

export type ConsultationTopic = {
  id: string;
  label: string;
  desc: string;
  icon: Icon;
};

export const CONSULTATION_TOPICS: ConsultationTopic[] = [
  {
    id: "nursery",
    label: "Bio-Boosted Nursery Pre-Orders",
    desc: "Reserve disease-resistant saplings with 95%+ guaranteed survival.",
    icon: Plant,
  },
  {
    id: "bigfarm",
    label: "Big Farm Setup (Turnkey)",
    desc: "End-to-end commercial farm planning, drip setup & operations.",
    icon: Stack,
  },
  {
    id: "carbon",
    label: "Carbon Credit Program",
    desc: "Monetise zero-tillage & drip irrigation practices for extra payout.",
    icon: Lightning,
  },
  {
    id: "wholesale",
    label: "Kisan Mall Wholesale",
    desc: "Bulk agri-inputs, biocures, mulch rolls & bamboo staking orders.",
    icon: Storefront,
  },
  {
    id: "agripark",
    label: "Agri Park Visit",
    desc: "Book a guided walk through 8 living partner demonstration zones.",
    icon: Compass,
  },
  {
    id: "general",
    label: "General Agronomy Advisory",
    desc: "Direct guidance on soil reports, fertigation schedules & pests.",
    icon: ChatCircleText,
  },
];

export const ACREAGE_OPTIONS = [
  "1-5 Acres",
  "5-15 Acres",
  "15-50 Commercial Acres",
  "50+ Institutional Farm",
] as const;

export const CROP_OPTIONS = [
  "Watermelon",
  "Chilli",
  "Tomato",
  "Cauliflower",
  "Cucumber",
  "Wheat & Paddy",
] as const;

export const CHANNEL_OPTIONS = ["WhatsApp", "Phone Call", "Email"] as const;

export const CONTACT_FAQS = [
  {
    q: "How quickly will someone get back to me?",
    a: "We aim to reply within 2 business hours during farm operating hours (7:30 AM – 8:00 PM IST). Urgent crop issues are prioritised on WhatsApp and the hotline.",
  },
  {
    q: "Can I visit the farm or Kisan Mall without an appointment?",
    a: "Yes. The Kisan Mall is open daily 8:00 AM – 8:00 PM. For a guided Agri Park walk or nursery pickup, a quick call or form submission helps us prepare the right advisor.",
  },
  {
    q: "What should I share for crop disease help?",
    a: "A clear photo of the affected plant, your crop name, stage, and location is enough. You can upload a photo in the form or send it on WhatsApp after submitting.",
  },
  {
    q: "Do you charge for the first consultation?",
    a: "Initial agronomy callbacks and guidance for farmers connected through Agaate are free. Turnkey Big Farm Setup and specialised projects are scoped separately.",
  },
  {
    q: "Which locations do you serve?",
    a: "Our hubs are in Gurugram, Haryana. Advisory, nursery, and market linkage support farmers across neighbouring districts; Big Farm projects are planned nationally by scope.",
  },
];

export const TRUST_ITEMS = [
  {
    label: "Typical reply",
    value: "Within 2 hours",
    hint: "During farm operating hours",
  },
  {
    label: "Farmers connected",
    value: "1000+",
    hint: "Across the Agaate network",
  },
  {
    label: "Physical hubs",
    value: "3 in Gurugram",
    hint: "Farm · Mall · Corporate",
  },
  {
    label: "Reach us",
    value: "Call or WhatsApp",
    hint: "Mon–Sat from 7:30 AM IST",
  },
] as const;

export const TRUST_METRICS = [
  {
    label: "Guaranteed SLA",
    number: 2,
    suffix: " hrs",
    sub: "Direct callback from senior agronomy specialist during farm hours.",
    icon: ChatCircleText,
  },
  {
    label: "Growers Connected",
    number: 1000,
    suffix: "+",
    sub: "Commercial vegetable, grain & orchard growers across North India.",
    icon: Plant,
  },
  {
    label: "Living R&D Hub",
    number: 17,
    suffix: " Acres",
    sub: "Walk-in smart nursery and active proving grounds in Kukrola.",
    icon: Compass,
  },
  {
    label: "Verified SKUs",
    number: 500,
    suffix: "+",
    sub: "Direct-from-factory QR-traced seeds, bio-nutrients & drip hardware.",
    icon: Storefront,
  },
];

export const FORM_STORAGE_KEY = "agaate-contact-form-v1";
export const MESSAGE_MAX = 600;
