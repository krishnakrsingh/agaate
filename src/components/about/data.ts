import {
  Compass,
  Drop,
  Factory,
  Flask,
  Globe,
  Handshake,
  type Icon,
  Leaf,
  Medal,
  Plant,
  Shield,
  ShoppingBag,
  UserCheck,
  Users,
} from "@phosphor-icons/react";

export const brochureHref = "/agaate-brochure.pdf";

export const WHATSAPP_ABOUT_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20Agaate%20and%20your%20farm%20services.";

export const TEL_ABOUT = "tel:+918350085005";
export const PHONE_DISPLAY = "+91 83500 85005";

export const marqueePhrases = [
  "Growing Better Tomorrow",
  "Begin With Strong Roots",
  "From Seed to Sale",
  "Bio-Boosted Nursery Model",
  "Zero Seed Waste",
  "15,000+ Associated Acres",
];

export const whoWeAre = {
  eyebrow: "Who we are",
  headline: "Built for farmers, always.",
  body: "Agaate stands with Indian farmers through the entire vegetable crop journey — from seed to harvest. By bringing together trusted agri companies, modern technologies, and practical support, we help growers farm with confidence, reduce risk, and make better decisions at every step.",
  pullQuote: "From seed to sale — Agaate stays with you at every step.",
  image: "/farm.png",
  imageAlt: "Agaate farm fields in Gurugram",
};

export const mission = {
  eyebrow: "Our Mission",
  title: "Growing Better Tomorrow",
  body: "Agaate's mission is to strengthen Indian farmers by providing science-backed, sustainable agriculture solutions that improve crop survival, reduce early-stage losses, and build long-term productivity through reliable Bio-Boosted nursery systems nationwide.",
  support:
    "We focus on practical research, quality inputs, and farmer-first thinking to create confidence, resilience, and growth across Indian agriculture.",
};

export const introBlurb =
  "Agaate empowers Indian farmers with science-backed, sustainable nursery solutions that build stronger crops from the very beginning.";

export const pillars = [
  {
    id: "practical-research",
    title: "Practical Research",
    tagline: "Actionable Science over Pure Theory",
    desc: "Every recommendation we make is grounded in field-tested, actionable science. We test seeds, bio-inoculants, and crop protection protocols in real sub-tropical farm conditions before prescribing them to growers.",
    icon: Leaf,
    badge: "Field-Tested Protocols",
    highlight: "100% On-Ground Verification",
  },
  {
    id: "quality-inputs",
    title: "Quality Inputs",
    tagline: "Certified Seedlings & Genuine Inputs",
    desc: "Seeds, biologicals, irrigation hardware, and crop protection — sourced exclusively from 25+ direct manufacturer partners. Every input passes multi-stage quality verification and direct brand certification.",
    icon: Shield,
    badge: "25+ Partner Brands",
    highlight: "Zero Fake/Duplicate Inputs",
  },
  {
    id: "farmer-first",
    title: "Farmer-First Thinking",
    tagline: "Designing Ecosystems for Cultivator Profit",
    desc: "Every advisory, bio-boosted seedling batch, and buyback agreement is engineered around one core principle: protecting farmer economics, reducing early losses, and securing higher yield returns.",
    icon: Globe,
    badge: "Risk Mitigation",
    highlight: "Guaranteed Germination & Survival",
  },
];

export const guarantees = [
  {
    title: "Organic & Pure",
    desc: "Naturally grown without harmful chemicals",
    icon: Leaf,
  },
  {
    title: "Sustainable",
    desc: "Environmentally responsible farming practices",
    icon: Plant,
  },
  {
    title: "High Quality",
    desc: "Certified seedlings with guaranteed germination",
    icon: Medal,
  },
];

export const whatWeDo = [
  {
    id: "seed-to-sale",
    title: "From Seeds to Sales",
    desc: "Complete crop support — from sowing to selling.",
    icon: Plant,
    href: "/",
  },
  {
    id: "science",
    title: "Science-Backed Decisions",
    desc: "Helping farmers understand their crops and reduce losses.",
    icon: Flask,
    href: "/agri-park",
  },
  {
    id: "partners",
    title: "Trusted Agri Partnerships",
    desc: "Working with the best agri brands for reliable solutions.",
    icon: Handshake,
    href: "/",
  },
  {
    id: "mall",
    title: "Agaate Kisaan Mall",
    desc: "One place for all essential agri inputs.",
    icon: ShoppingBag,
    href: "/kisaan-mall",
  },
];

export const stats = [
  {
    to: 15000,
    suffix: "+",
    label: "Acres Under Association",
    sub: "Land under active cultivation",
    icon: Globe,
  },
  {
    to: 500,
    suffix: "+",
    label: "Nursery Plants Delivered (Ac. Eq.)",
    sub: "Bio-boosted seedling coverage",
    icon: Plant,
  },
  { to: 2000, suffix: "+", label: "Parivaar Farmers", sub: "Empowered rural network", icon: Users },
  {
    to: 25,
    suffix: "+",
    label: "Direct Manufacturer Partners",
    sub: "Certified agri-input brands",
    icon: Factory,
  },
  {
    to: 200,
    suffix: "+",
    label: "Drip Irrigation Installations",
    sub: "Precision water management",
    icon: Drop,
  },
  {
    to: 20,
    suffix: "+",
    label: "Kisan Sathi Field Team",
    sub: "Dedicated on-ground advisors",
    icon: UserCheck,
  },
];

export const paradigmMetrics = [
  {
    id: "survival",
    label: "Metric 01 · Survival Rate",
    title: "90% – 98% Base Survival",
    desc: "Direct seed sowing yields only 50–70% survival due to weather shock, soil crusting, and early pests. Agaate Bio-Boosted nursery saplings guarantee up to 98% field survival.",
    metricLabel: "Net Survival Lift",
    metricValue: "+40% Increase",
  },
  {
    id: "seed-waste",
    label: "Metric 02 · Seed Waste & Cost",
    title: "Near Zero Seed Waste",
    desc: "Expensive hybrid seeds sown directly into open fields often rot or get washed away. Our climate chambers eliminate 30–50% wasted seed expense for the farmer.",
    metricLabel: "Seed Savings",
    metricValue: "30% – 50% Saved",
  },
  {
    id: "yield",
    label: "Metric 03 · Final Market Yield",
    title: "15% – 30% Yield Boost",
    desc: "Vigorous initial root architecture leads to faster canopy development, reduced chemical dependency, and uniform export-grade vegetable harvests.",
    metricLabel: "Harvest Output",
    metricValue: "15% – 30% Higher Yield",
  },
];

export const founderNote = {
  quote:
    "We built Agaate with a simple belief — that every farmer deserves the right guidance, the right tools, and the right support, so that their hard work never goes to loss.",
  name: "Ankit Rawat",
  role: "Founder & CEO",
  image: "/team/ankit.png?v=2",
};

export const leadershipQuotes = [
  {
    quote:
      "We built Agaate with a simple belief — that every farmer deserves the right guidance, the right tools, and the right support, so that their hard work never goes to loss.",
    name: "Ankit Rawat",
    role: "Founder & CEO",
    image: "/team/ankit.png?v=2",
  },
  {
    quote:
      "Precision agronomy and disease-resistant seedling biology turn unpredictable weather into calculated, high-survival yields for every grower.",
    name: "Chanchala Shukla",
    role: "Co-Founder & Agronomist",
    image: "/team/chanchala.png",
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  tag: string;
  icon: Icon;
  image: string;
  bio: string;
  keyAch: string[];
  pub: string;
  quote: string;
}

export const team: TeamMember[] = [
  {
    id: "ankit-rawat",
    name: "Ankit Rawat",
    role: "Founder & CEO",
    focus: "Net-Zero Sustainability & Corporate Vision",
    tag: "Bharat Climate Summit Speaker",
    icon: Leaf as Icon,
    image: "/team/ankit.png?v=2",
    bio: "Pioneer in tech-enabled vegetable crop ecosystems and net-zero mission advocate. Ankit leads corporate strategy, institutional partnerships, and campus leadership initiatives across North India. He was a featured speaker at the Bharat Climate Summit, presenting pathways for Net-Zero 2070 in Indian agriculture.",
    keyAch: [
      "Keynote Speaker at Bharat Climate Summit on Net-Zero AgTech",
      "Architect of the Bio-Boosted Nursery model replacing risky direct sowing",
      "Pioneered direct buyback market linkages for 2,000+ farmers",
    ],
    pub: "Investigating Nitrogen optimization loops in sub-tropical Solanaceae cultivation blocks (2024)",
    quote:
      "Every farmer deserves the right guidance, the right tools, and the right support so that their hard work never goes to loss.",
  },
  {
    id: "chanchala-shukla",
    name: "Chanchala Shukla",
    role: "Co-Founder & Agronomist",
    focus: "Pathology, Integrated Pest Management (IPM) & Crop Viability",
    tag: "Co-Founder & Agronomy Lead",
    icon: Compass as Icon,
    image: "/team/chanchala.png",
    bio: "Co-Founder and scientific backbone for crop viability, designing basal dose schedules, pathological pest diagnosis protocols, and micro-climate preventive spray matrices.",
    keyAch: [
      "Developed weather-based disease prevention schedules for Solanaceae & Cucurbitaceae",
      "Formulated scientific soil testing and stage-wise fertigation protocols",
      "Authored localized IPM handbooks distributed across 2,000+ farms",
    ],
    pub: "Managing Early Blight resistance using targeted botanical sprays and spore traps (2026)",
    quote: "Precision agronomy turns unpredictable weather into calculated, high-survival yields.",
  },
  {
    id: "kuldeep-sengar",
    name: "Kuldeep Sengar",
    role: "Procurement Head",
    focus: "Strategic Sourcing, Agri-Inputs & Supply Chain Procurement",
    tag: "Procurement & Sourcing Lead",
    icon: Medal as Icon,
    image: "/team/kuldeep.png",
    bio: "Kuldeep leads strategic procurement and input sourcing across seed-to-sale pipelines, partnering with certified manufacturers and managing input delivery schedules across 15,000+ associated acres.",
    keyAch: [
      "Streamlined input procurement and supply logistics across North India hubs",
      "Secured high-grade seed & input contracts with 25+ certified manufacturing partners",
      "Oversees quality-verified procurement pipelines for 20+ Kisan Sathi field teams",
    ],
    pub: "Procurement optimization and supply chain mechanics for high-density agricultural input networks (2025)",
    quote:
      "Precision procurement and direct-from-source inputs guarantee the highest quality foundation for every crop cycle.",
  },
  {
    id: "abhay-ranjan",
    name: "Abhay Ranjan",
    role: "Chief of Staff",
    focus: "Infrastructure, Nursery & Kisan Mall Retail Operations",
    tag: "Infrastructure & Retail Lead",
    icon: Globe as Icon,
    image: "/team/abhay.png",
    bio: "Abhay manages critical facility operations, specifically overseeing the 5-acre Kukrola Smart Nursery infrastructure and physical Kisan Mall retail sales hubs in Bilaspur Kalan.",
    keyAch: [
      "Designed and scaled the 5-acre controlled-environment Smart Nursery facility",
      "Expanded Kisan Mall retail offerings to over 500+ verified SKUs",
      "Built experiential technology demonstration zones for visiting farming clusters",
    ],
    pub: "Closed-loop agricultural business frameworks and retail hubs in North India (2025)",
    quote:
      "A farm to experience — exposing growers to modern farming technologies, quality seeds, and best practices in one place.",
  },
  {
    id: "ravi-kumar",
    name: "Ravi Kumar",
    role: "Data & Strategy",
    focus: "IoT Telemetry, Drone Analytics & Smart Crop Cycles",
    tag: "Agri-Data & Strategy Lead",
    icon: Shield as Icon,
    image: "/team/ravi.png",
    bio: "Ravi drives data-driven decision-making, leveraging IoT soil sensors, Sentinel satellite canopy imaging, and AI crop health detection algorithms to execute precision Smart Crop Cycles.",
    keyAch: [
      "Deployed IoT telemetry nodes across commercial farm blocks",
      "Integrated Sentinel-2 satellite NDVI canopy scouting for early disease detection",
      "Engineered automated fertigation & irrigation alert algorithms",
    ],
    pub: "NDVI canopy analysis and Sentinel-2 radar scans in vegetable crop rotations (2026)",
    quote:
      "Sensors, drones, and AI on your farm mean seeing issues earlier, acting faster, and wasting less.",
  },
];

export const milestones = [
  {
    year: "2024",
    title: "Incorporation & Experimental Nursery Setup",
    desc: "Anzix Farm Technologies Private Limited formally incorporated on May 28, 2024 in Gurugram. Launched the 1-acre experimental nursery block testing root density variables under bio-inoculation.",
  },
  {
    year: "2025",
    title: "17-Acre Smart Nursery Facility & Kisan Mall Expansion",
    desc: "Scaled production to our flagship 17-acre climate-controlled Smart Nursery in Kukrola. Opened the Kisan Mall experience hub in Bilaspur and achieved ₹96.9 Lakhs in initial corporate revenue.",
  },
  {
    year: "2026",
    title: "Agri Park, 15,000+ Acres & ₹10 Cr+ Platform GMV",
    desc: "Inaugurated India's first collaborative Agri Park, expanded associated farmland to 15,000+ acres, serving 2,000+ Parivaar farmers with over ₹10 Cr+ in managed crop value and gross platform transactions.",
  },
];

export const locations = [
  {
    tag: "Farm & Production Facility",
    name: "Agaate – Anzix Farm",
    address: "NH8, opposite Bikanervala, Kukrola, Gurugram, Haryana 122413",
    sub: "Plus Code: 8WG2+QR6 · 17-Acre Smart Nursery",
  },
  {
    tag: "Retail & Experience Center",
    name: "Agaate Kisan Mall",
    address: "Bilaspur Rd, Patti Kawan, Bhora Kalan, Bilaspur Kalan, Gurugram, Haryana 122413",
    sub: "Community hub for agri-inputs & technology demos",
  },
  {
    tag: "Registered Corporate Office",
    name: "Anzix Farm Technologies Pvt Ltd",
    address: "I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004",
    sub: "Legal & financial headquarters",
  },
];

export const corporateFacts = [
  { label: "Legal Entity Name", value: "Anzix Farm Technologies Private Limited" },
  { label: "Date of Incorporation", value: "May 28, 2024" },
  { label: "Corporate Identification Number (CIN)", value: "U46200HR2024PTC121982" },
  { label: "Jurisdiction & RoC", value: "Registrar of Companies, Delhi (Operations in Haryana)" },
  {
    label: "Registered Office Address",
    value: "I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004",
  },
  { label: "Board of Directors", value: "Ankit Rawat · Nisha Kumari · Naveen Panwar" },
  { label: "Official Contact Email", value: "info@agaate.in / naveen.mnit@gmail.com" },
  { label: "Authorized Share Capital", value: "₹20,00,000" },
  { label: "Paid-up Share Capital", value: "₹1,35,260" },
];

export const complianceHighlights = [
  { label: "Entity", value: "Anzix Farm Technologies Pvt Ltd" },
  { label: "CIN", value: "U46200HR2024PTC121982" },
  { label: "Registered Office", value: "Sector-81, Gurugram, Haryana" },
];
