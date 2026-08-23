import { type Variants } from "framer-motion";
import {
  BookOpen,
  Bug,
  Cpu,
  Drop,
  Eye,
  Flask,
  GraduationCap,
  type Icon,
  Leaf,
  Lightbulb,
  MapPinArea,
  Microscope,
  Package,
  Plant,
  Rocket,
  SealCheck,
  ShieldCheck,
  ShoppingCart,
  Signpost as RouteIcon,
  SquaresFour,
  Truck,
  Users,
} from "@phosphor-icons/react";
import { EASE, type RevealVariant } from "@/components/common/motion";

export type ZoneEight = { icon: Icon; label: string; benefit: string };
export type FirstOfKind = { icon: Icon; title: string; desc: string };
export type NurseryStory = { icon: Icon; label: string; desc: string };
export type Lifecycle = { phase: string; icon: Icon; title: string; desc: string };
export type HeroStat = { icon: Icon; to: number; suffix: string; label: string };
export type Zone = {
  id: string;
  name: string;
  badge: string;
  desc: string;
  crop: string;
  stat: string;
  sensor: string;
  partner: string;
  partnerLogos: string[];
  trialHighlights: string[];
  svgCoords: { cx: number; cy: number };
};

export const ZONES_EIGHT: ZoneEight[] = [
  { icon: Plant, label: "Seed Zone", benefit: "Choose the right variety before you sow" },
  { icon: Leaf, label: "Nursery Zone", benefit: "See Bio-Boosted seedlings at every stage" },
  {
    icon: Drop,
    label: "Irrigation Zone",
    benefit: "Compare drip and fertigation systems live",
  },
  {
    icon: Flask,
    label: "Nutrition Zone",
    benefit: "Understand inputs from real crop trials",
  },
  {
    icon: ShieldCheck,
    label: "Protection Zone",
    benefit: "Test crop protection on real disease pressure",
  },
  { icon: Rocket, label: "Tech & Drone Zone", benefit: "Watch AI and drone monitoring in action" },
  {
    icon: GraduationCap,
    label: "Training Hub",
    benefit: "Hands-on workshops and field learning days",
  },
  {
    icon: ShoppingCart,
    label: "Market Zone",
    benefit: "See how output connects to direct buyers",
  },
];

export const FIRST_OF_KIND: FirstOfKind[] = [
  {
    icon: Eye,
    title: "Live Demo Plots",
    desc: "See products perform on real crops under open-field and polyhouse conditions before buying.",
  },
  {
    icon: Users,
    title: "Unified Partner Ecosystem",
    desc: "Seed, nutrition, irrigation, protection, and drone tech brands operating on one living farm.",
  },
  {
    icon: BookOpen,
    title: "Farmer Training Hub",
    desc: "Hands-on workshops, agronomy masterclasses & field days for practical learning.",
  },
  {
    icon: Microscope,
    title: "Scientific R&D & Soil Trials",
    desc: "New seed varieties & biological inputs rigorously tested for regional soil & climate viability.",
  },
  {
    icon: RouteIcon,
    title: "Seed-to-Sale 360 Walkthrough",
    desc: "Experience all 7 crop lifecycle stages in a single guided 60-minute field tour.",
  },
  {
    icon: Lightbulb,
    title: "Precision AgTech Showcase",
    desc: "Sensors, autonomous flight scouting drones, and automated fertigation operating live.",
  },
];

export const NURSERY_STORY: NurseryStory[] = [
  {
    icon: Leaf,
    label: "Seedless Controlled Environment",
    desc: "Saplings raised under strictly regulated micro-climate chambers.",
  },
  {
    icon: Flask,
    label: "In-House Production & Variety Breeding",
    desc: "Hybrids bred and pre-conditioned for stress tolerance.",
  },
  {
    icon: Cpu,
    label: "AI-Driven Climate Monitoring",
    desc: "Temperature, humidity, and airflow tuned every minute.",
  },
  {
    icon: Bug,
    label: "Integrated Pest & Disease Protocols",
    desc: "Biological cures first, targeted intervention only when needed.",
  },
  {
    icon: SealCheck,
    label: "Standardized Quality Control",
    desc: "Every batch tested and certified for guaranteed field performance.",
  },
];

export const LIFECYCLE: Lifecycle[] = [
  {
    phase: "01",
    icon: Microscope,
    title: "Research & Development",
    desc: "Varieties, biologicals and techniques are trialled across demo plots before commercial release.",
  },
  {
    phase: "02",
    icon: Plant,
    title: "Bio-Boosted Cultivation",
    desc: "Seedlings are raised with robust lateral root systems under AI-monitored smart nursery conditions.",
  },
  {
    phase: "03",
    icon: SealCheck,
    title: "Quality Gate Verification",
    desc: "Every batch passes strict quality checks for disease resistance and root density.",
  },
  {
    phase: "04",
    icon: Truck,
    title: "Direct Market Distribution",
    desc: "Verified produce moves through Kisan Mall and buyback-linked institutional buyer networks.",
  },
];

export const lifecycleVariants: RevealVariant[] = ["fade-left", "scale-up", "fade-up", "blur-in"];

export const HERO_STATS: HeroStat[] = [
  { icon: MapPinArea, to: 17, suffix: "", label: "Acres living farm" },
  { icon: SquaresFour, to: 8, suffix: "", label: "Innovation zones" },
  { icon: Users, to: 25, suffix: "+", label: "Global agri partners" },
  { icon: Package, to: 2000, suffix: "+", label: "Parivaar farmers" },
];

export const FIELD_LINES = [
  { x1: 15, y1: 55, x2: 155, y2: 55 },
  { x1: 85, y1: 15, x2: 85, y2: 95 },
];

export const ALL_8_ZONES: Zone[] = [
  {
    id: "seed",
    name: "Seed Zone",
    badge: "🟢 Zone 01",
    desc: "Live comparative test beds demonstrating germination percentages, early vigor, and pest resistance across 15+ hybrid crop varieties.",
    crop: "Hybrid Tomatoes (Abhinav), Chillies (Tejaswini), Cauliflower",
    stat: "99.2% Germination Vigor",
    sensor: "Soil EC & Moisture Telemetry Online",
    partner: "Sakata, Seminis, Namdhari Seeds",
    partnerLogos: ["Sakata Seeds", "Seminis", "Namdhari"],
    trialHighlights: [
      "Germination benchmark testing (99%+ target)",
      "Early vigor root establishment comparative plots",
      "Bacterial wilt & leaf curl virus screening",
    ],
    svgCoords: { cx: 35, cy: 30 },
  },
  {
    id: "nursery",
    name: "Nursery Zone",
    badge: "🌱 Zone 02",
    desc: "Smart polyhouse chamber verifying root-growth density using organic bio-inoculants in sterile cocopeat plug trays.",
    crop: "Bio-Boosted Chillies, Brinjal, Tomato Plugs",
    stat: "2.4x Lateral Root Density",
    sensor: "AI Climate & Humidity Sensor Array",
    partner: "Agaate BioLabs & Stanes",
    partnerLogos: ["Agaate BioLabs", "Stanes Symbion"],
    trialHighlights: [
      "2.4x lateral feeder root density enhancement",
      "Sterile cocopeat plug tray sterilization protocol",
      "Bio-booster mycorrhizae inoculation trial",
    ],
    svgCoords: { cx: 75, cy: 30 },
  },
  {
    id: "irrigation",
    name: "Irrigation Zone",
    badge: "💧 Zone 03",
    desc: "Pressure-compensating drip layout showing real-time flow monitoring, sand filtration, and automated venturi fertigation loops.",
    crop: "Cucumber, Watermelon, Capsicum",
    stat: "-40% Water Consumption",
    sensor: "Flowmeter & Pressure Telemetry Live",
    partner: "Netafim Israel & Jain Irrigation",
    partnerLogos: ["Netafim", "Jain Irrigation"],
    trialHighlights: [
      "Automated venturi fertigation dosing skid",
      "Pressure compensating 30cm inline drip emitters",
      "Sub-surface drip vs surface drip comparative plot",
    ],
    svgCoords: { cx: 115, cy: 30 },
  },
  {
    id: "nutrition",
    name: "Nutrition Zone",
    badge: "🧪 Zone 04",
    desc: "Trial plots demonstrating organic carbon accumulation under staged macronutrient dosing and custom mineral supplements.",
    crop: "Spinach, Lettuce, Cabbage, Gourds",
    stat: "+1.2% Soil Organic Carbon",
    sensor: "N-P-K Optical Spectrometer Active",
    partner: "Yara Fertilizers & Biovita",
    partnerLogos: ["Yara", "Biovita", "Plantex"],
    trialHighlights: [
      "Basal dose soil chemistry customization",
      "Foliar biostimulant application response trial",
      "Micro-nutrient chelated delivery optimization",
    ],
    svgCoords: { cx: 155, cy: 30 },
  },
  {
    id: "protection",
    name: "Protection Zone",
    badge: "🛡️ Zone 05",
    desc: "Residue-free crop protection demo beds using botanical repellents and targeted bio-fungicides under dynamic weather advisories.",
    crop: "Capsicum, Tomato, Cauliflower",
    stat: "Zero Chemical Residues Detected",
    sensor: "Spore Trap Telemetry & Micro-Weather",
    partner: "Bayer CropScience Bio & Biocure F",
    partnerLogos: ["Bayer Bio", "Biocure F", "Bio Nimaton"],
    trialHighlights: [
      "Weather-based early blight spray advisories",
      "Bio-fungicide (Biocure F) root dip protocol",
      "Residue-free harvest compliance verification",
    ],
    svgCoords: { cx: 35, cy: 75 },
  },
  {
    id: "tech",
    name: "Tech & Drone Zone",
    badge: "🛸 Zone 06",
    desc: "Command hub showing solar IoT node arrays, precision agricultural drone tracks, and real-time NDVI thermal scouting.",
    crop: "Multi-Crop 17-Acre Master Field",
    stat: "4G LoRa Mesh Field Coverage Active",
    sensor: "Multispectral Drone Scouting Flight Complete",
    partner: "Anzix Farm Tech, AWS & DJI Agri",
    partnerLogos: ["Anzix Tech", "AWS Agri", "DJI Drones"],
    trialHighlights: [
      "Autonomous flight path drone crop scouting",
      "NDVI vegetation index stress map generation",
      "Solar powered LoRa soil moisture probe mesh",
    ],
    svgCoords: { cx: 75, cy: 75 },
  },
  {
    id: "training",
    name: "Training Hub",
    badge: "🎓 Zone 07",
    desc: "Open-air auditorium & hands-on practical workshop field where farmers learn modern staking, fertigation, and disease control.",
    crop: "Demonstration & Practice Beds",
    stat: "2,000+ Farmers Certified",
    sensor: "Live Workshop Field Lab Active",
    partner: "CSAUT Kanpur & Agaate Kisan Sathi",
    partnerLogos: ["CSAUT Kanpur", "Kisan Sathi"],
    trialHighlights: [
      "Hands-on bamboo staking & netting workshops",
      "Fertigation pump calibration masterclass",
      "Diseased leaf photo diagnostic training",
    ],
    svgCoords: { cx: 115, cy: 75 },
  },
  {
    id: "market",
    name: "Market Zone",
    badge: "🛒 Zone 08",
    desc: "Post-harvest grading, cold staging, and direct buyback linkage connecting quality harvest straight to institutional buyers.",
    crop: "Market-Ready Export Grade Produce",
    stat: "100% Guaranteed Buyback",
    sensor: "Produce Quality & Weight Scanner Live",
    partner: "Assured Buyback & Kisan Mall",
    partnerLogos: ["Agaate Buyback", "Kisan Mall"],
    trialHighlights: [
      "Quality Produce Market-Ready Standards (Grading A/B)",
      "Zero middleman direct pricing linkage",
      "Cold-chain dispatch & packaging protocols",
    ],
    svgCoords: { cx: 155, cy: 75 },
  },
];
