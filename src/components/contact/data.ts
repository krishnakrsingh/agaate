import {
  Buildings,
  ChatCircleText,
  Compass,
  type Icon,
  Lightning,
  Plant,
  Stack,
  Storefront,
  TrendUp,
  Stethoscope,
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
    name: "Agaate Anzix Farm & Smart Nursery",
    tagline: "17-Acre Bio-Boosted Nursery & High-Tech R&D Proving Grounds",
    role: "Farm & Nursery Propagation",
    address: "NH8, opposite Bikanervala, Kukrola / Pachgaon, Gurugram, Haryana 122413",
    district: "Gurugram, Haryana",
    plusCode: "8WG2+QR6",
    phone: ALT_PHONE,
    telRaw: TEL_ALT,
    email: EMAIL,
    hours: "Mon – Sat: 07:30 AM – 06:30 PM",
    team: "Agaate Field Advisory & Propagation Team",
    highlights: [
      "AI climate-controlled germination chambers",
      "Bio-Boosted seedling propagation & pre-order pickup",
      "Living demonstration plots for watermelons, chillies & tomatoes",
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
    tagline: "Comprehensive Direct-From-Brand Agri-Input Storefront",
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
  badge?: string;
  icon: Icon;
};

export const CONSULTATION_TOPICS: ConsultationTopic[] = [
  {
    id: "nursery",
    label: "Bio-Boosted Nursery Saplings",
    desc: "Reserve high-immunity plug seedlings with 98% survival guarantee.",
    badge: "Plug Seedlings",
    icon: Plant,
  },
  {
    id: "mall",
    label: "Kisaan Mall & Input Supply",
    desc: "Certified hybrid seeds, bio-nutrients, biocures & drip hardware.",
    badge: "Input Commerce",
    icon: Storefront,
  },
  {
    id: "advisory",
    label: "Field Agronomy & Disease Help",
    desc: "Leaf photo disease diagnosis, fertigation schedule & farm visits.",
    badge: "< 15 Min Reply",
    icon: Stethoscope,
  },
  {
    id: "market",
    label: "Buyback & Market Linkage",
    desc: "Pre-sowing price floor contracts, direct offtake & T+0 bank payout.",
    badge: "Guaranteed Offtake",
    icon: TrendUp,
  },
  {
    id: "bigfarm",
    label: "Turnkey Big Farm Setup (15+ Ac)",
    desc: "End-to-end commercial farming, automated drip & operations setup.",
    badge: "Turnkey Project",
    icon: Stack,
  },
  {
    id: "carbon",
    label: "Carbon Credits Monetization",
    desc: "Monetise zero-tillage, biochar & drip practices for extra payouts.",
    badge: "Carbon Payout",
    icon: Lightning,
  },
  {
    id: "agripark",
    label: "Agri Park Guided Tour",
    desc: "Walk through 8 living partner crop demonstration zones in Kukrola.",
    badge: "Living Proving Ground",
    icon: Compass,
  },
  {
    id: "general",
    label: "Corporate & General Inquiries",
    desc: "Institutional tie-ups, B2B procurement, careers or partnerships.",
    badge: "Executive Desk",
    icon: ChatCircleText,
  },
];

export const ACREAGE_OPTIONS = [
  "1-5 Acres (Small/Medium)",
  "5-15 Acres (Commercial)",
  "15-50 Acres (Large Farm)",
  "50+ Acres (Enterprise/Institutional)",
] as const;

export const CROP_OPTIONS = [
  "Watermelon & Melons",
  "Chilli & Peppers",
  "Tomato",
  "Cucumber",
  "Cauliflower & Cabbage",
  "Paddy & Wheat",
  "Cotton & Oilseeds",
  "Other Vegetables / Fruits",
] as const;

export const CROP_STAGE_OPTIONS = [
  "Planning / Pre-Sowing (Sapling Booking)",
  "Early Vegetative Stage",
  "Flowering & Fruit Setting Stage",
  "Harvest & Market Linkage Stage",
] as const;

export const CHANNEL_OPTIONS = ["WhatsApp", "Phone Call", "Email"] as const;

export const CONTACT_FAQS = [
  {
    q: "How quickly will an agronomist get back to me?",
    a: "Our Gurugram agronomy desk replies within 15 minutes on WhatsApp and within 2 hours by phone during farm operating hours (7:30 AM – 8:00 PM IST).",
  },
  {
    q: "Can I visit the 17-acre nursery or Kisan Mall without an appointment?",
    a: "Yes. Agaate Kisan Mall is open daily 8:00 AM – 8:00 PM. For guided Agri Park crop tours or nursery pre-orders, submitting this form helps our senior agronomist prepare your customized trial briefing.",
  },
  {
    q: "What information should I share for crop disease diagnosis?",
    a: "Upload a clear photo of the infected leaf/stem or attach a soil analysis report. Our scientists will diagnose the pest/deficiency and issue an exact stage-wise spray chart.",
  },
  {
    q: "Is the initial agronomy consultation chargeable?",
    a: "No. Initial agronomy diagnostics, dosage calculations, and farm visits for growers in our active clusters are 100% free.",
  },
];

export const FORM_STORAGE_KEY = "agaate-contact-form-v2";
export const MESSAGE_MAX = 800;
