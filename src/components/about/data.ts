import { Award, Compass, Globe, Leaf, Shield, Sprout, Building2, UserCheck, Cpu, Factory, Droplets, Users, type LucideIcon } from "lucide-react";

export const marqueePhrases = [
  "Growing Better Tomorrow",
  "Begin With Strong Roots",
  "From Seed to Sale",
  "Bio-Boosted Nursery Model",
  "Zero Seed Waste",
  "15,000+ Associated Acres",
];

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
    desc: "Seeds, biologicals, irrigation hardware, and crop protection — sourced exclusively from 25+ direct manufacturer partners. Every input passes multi-stage quality checks and factory QR authentication.",
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
    desc: "Naturally grown without harmful chemical residues, prioritizing soil microbe recovery.",
    icon: Leaf,
  },
  {
    title: "Sustainable",
    desc: "Environmentally responsible farming practices saving water, carbon, and runoffs.",
    icon: Sprout,
  },
  {
    title: "High Quality",
    desc: "Certified seedlings with 90-98% guaranteed germination and zero transit shock.",
    icon: Award,
  },
];

export const stats = [
  { to: 15000, suffix: "+", label: "Acres Under Association", sub: "Land under active cultivation", icon: Globe },
  { to: 500, suffix: "+", label: "Nursery Plants Delivered (Ac. Eq.)", sub: "Bio-boosted seedling coverage", icon: Sprout },
  { to: 2000, suffix: "+", label: "Parivaar Farmers", sub: "Empowered rural network", icon: Users },
  { to: 25, suffix: "+", label: "Direct Manufacturer Partners", sub: "Certified agri-input brands", icon: Factory },
  { to: 200, suffix: "+", label: "Drip Irrigation Installations", sub: "Precision water management", icon: Droplets },
  { to: 20, suffix: "+", label: "Kisan Sathi Field Team", sub: "Dedicated on-ground advisors", icon: UserCheck },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  tag: string;
  icon: LucideIcon;
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
    icon: Leaf as LucideIcon,
    bio: "Pioneer in tech-enabled vegetable crop ecosystems and net-zero mission advocate. Ankit leads corporate strategy, institutional partnerships, and campus leadership initiatives across North India. He was a featured speaker at the Bharat Climate Summit, presenting pathways for Net-Zero 2070 in Indian agriculture.",
    keyAch: [
      "Keynote Speaker at Bharat Climate Summit on Net-Zero AgTech",
      "Architect of the Bio-Boosted Nursery model replacing risky direct sowing",
      "Pioneered direct buyback market linkages for 2,000+ farmers",
    ],
    pub: "Investigating Nitrogen optimization loops in sub-tropical Solanaceae cultivation blocks (2024)",
    quote: "Every farmer deserves the right guidance, the right tools, and the right support so that their hard work never goes to loss.",
  },
  {
    id: "kuldeep-singh",
    name: "Kuldeep Singh Singhar",
    role: "Head of Operations",
    focus: "Supply Chain, Farm Operations & Revenue Mechanics",
    tag: "Operations & Sales Lead",
    icon: Award as LucideIcon,
    bio: "Kuldeep leads the logistical machinery behind seed-to-sale operations, overseeing farm execution, input delivery schedules, and commercial crop sales mechanics across 15,000+ acres under association.",
    keyAch: [
      "Streamlined logistics for 4M+ sapling deliveries across Haryana hubs",
      "Optimized crop sales mechanics securing peak pricing for regional growers",
      "Oversees 20+ Kisan Sathi field operations teams",
    ],
    pub: "Cold-chain logistics models and revenue mechanics for high-density seedling distribution hubs (2025)",
    quote: "Eliminating supply chain delays transforms fragile seedling survival into guaranteed farm revenue.",
  },
  {
    id: "abhay-ranjan",
    name: "Abhay Ranjan",
    role: "Chief of Staff",
    focus: "Infrastructure, Nursery & Kisan Mall Retail Operations",
    tag: "Infrastructure & Retail Lead",
    icon: Globe as LucideIcon,
    bio: "Abhay manages critical facility operations, specifically overseeing the 17-acre Kukrola Smart Nursery infrastructure and physical Kisan Mall retail sales hubs in Bilaspur Kalan.",
    keyAch: [
      "Designed and scaled the 17-acre controlled-environment Smart Nursery facility",
      "Expanded Kisan Mall retail offerings to over 500+ verified SKUs",
      "Built experiential technology demonstration zones for visiting farming clusters",
    ],
    pub: "Closed-loop agricultural business frameworks and retail hubs in North India (2025)",
    quote: "A farm to experience — exposing growers to modern farming technologies, quality seeds, and best practices in one place.",
  },
  {
    id: "chanchala-shukla",
    name: "Chanchala Shukla",
    role: "Agronomist",
    focus: "Pathology, Integrated Pest Management (IPM) & Crop Viability",
    tag: "Scientific Agronomy Lead",
    icon: Compass as LucideIcon,
    bio: "Chanchala serves as the scientific backbone for crop viability, designing basal dose schedules, pathological pest diagnosis protocols, and micro-climate preventive spray matrices.",
    keyAch: [
      "Developed weather-based disease prevention schedules for Solanaceae & Cucurbitaceae",
      "Formulated scientific soil testing and stage-wise fertigation protocols",
      "Authored localized IPM handbooks distributed across 2,000+ farms",
    ],
    pub: "Managing Early Blight resistance using targeted botanical sprays and spore traps (2026)",
    quote: "Precision agronomy turns unpredictable weather into calculated, high-survival yields.",
  },
  {
    id: "ravi-kumar",
    name: "Ravi Kumar",
    role: "Data & Strategy",
    focus: "IoT Telemetry, Drone Analytics & Smart Crop Cycles",
    tag: "Agri-Data & Strategy Lead",
    icon: Shield as LucideIcon,
    bio: "Ravi drives data-driven decision-making, leveraging IoT soil sensors, Sentinel satellite canopy imaging, and AI crop health detection algorithms to execute precision Smart Crop Cycles.",
    keyAch: [
      "Deployed IoT telemetry nodes across commercial farm blocks",
      "Integrated Sentinel-2 satellite NDVI canopy scouting for early disease detection",
      "Engineered automated fertigation & irrigation alert algorithms",
    ],
    pub: "NDVI canopy analysis and Sentinel-2 radar scans in vegetable crop rotations (2026)",
    quote: "Sensors, drones, and AI on your farm mean seeing issues earlier, acting faster, and wasting less.",
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

export const board = ["Ankit Rawat", "Nisha Kumari", "Naveen Panwar"];

export const corporateFacts = [
  { label: "Legal Entity Name", value: "Anzix Farm Technologies Private Limited" },
  { label: "Date of Incorporation", value: "May 28, 2024" },
  { label: "Corporate Identification Number (CIN)", value: "U46200HR2024PTC121982" },
  { label: "Jurisdiction & RoC", value: "Registrar of Companies, Delhi (Operations in Haryana)" },
  { label: "Registered Office Address", value: "I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004" },
  { label: "Board of Directors", value: "Ankit Rawat · Nisha Kumari · Naveen Panwar" },
  { label: "Official Contact Email", value: "info@agaate.in / naveen.mnit@gmail.com" },
  { label: "Authorized Share Capital", value: "₹20,00,000" },
  { label: "Paid-up Share Capital", value: "₹1,35,260" },
];
