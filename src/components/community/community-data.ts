import {
  Bell,
  ClipboardText as ClipboardList,
  GraduationCap,
  ChatCircleText as MessageCircle,
  Package,
  ArrowsCounterClockwise as RefreshCw,
  Rocket,
  DeviceMobile as Smartphone,
  Plant as Sprout,
  type Icon,
} from "@phosphor-icons/react";

export type Post = {
  author: string;
  location: string;
  crop: string;
  text: string;
  likes: number;
  verified: boolean;
  time: string;
};

export const posts: Post[] = [
  {
    author: "Hawa Singh Yadav",
    location: "Jhajjar Block B",
    crop: "Tomato",
    text: "Tested the nursery seedling plugs this week. Vigor is excellent, roots are dense with cocopeat binding. No damping-off observed.",
    likes: 14,
    verified: true,
    time: "2 hours ago",
  },
  {
    author: "Agronomist Chanchala",
    location: "Agaate Central Lab",
    crop: "Chilli",
    text: "Warning: High morning humidity cycles are triggering early spore releases. Make sure your botanical protection spray loops are active by sunrise.",
    likes: 31,
    verified: true,
    time: "5 hours ago",
  },
  {
    author: "Abhay Ranjan",
    location: "Rohtak Hub",
    crop: "Irrigation",
    text: "Our drip loop filters require flushing every 48 hours when pumping from groundwater borewells to avoid emitter salt crusting.",
    likes: 8,
    verified: false,
    time: "1 day ago",
  },
];

type CommunityEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  desc: string;
};

const events: CommunityEvent[] = [
  {
    id: "ev-01",
    title: "Jhajjar Drip Calibration Seminar",
    date: "August 12, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Agaate Jhajjar Regional Hub",
    desc: "Live walk-through detailing venturi dosing calibration, sand filter cleanup, and flowmeter reading.",
  },
  {
    id: "ev-02",
    title: "Soil Carbon Masterclass",
    date: "September 05, 2026",
    time: "11:00 AM - 3:00 PM",
    venue: "Rohtak Agri Park Sector B",
    desc: "Learn to shred stubble organic biomass and apply bio-inoculants to maximize carbon payouts.",
  },
];

export const STATS = [
  { value: 2000, suffix: "+", label: "Parivaar Farmers" },
  { value: 20, suffix: "+", label: "Kisan Sathi on Ground" },
  { value: 1000, suffix: "+", label: "Farmers Connected" },
];

export type Pillar = {
  number: string;
  icon: Icon;
  title: string;
  text: string;
};

export const PILLARS: Pillar[] = [
  {
    number: "01",
    icon: GraduationCap,
    title: "Training",
    text: "Educating farmers on modern techniques — field days, seminars and hands-on training at regional hubs.",
  },
  {
    number: "02",
    icon: Package,
    title: "Inputs",
    text: "Biologicals, premium seeds and hardware from certified partners — 500+ agri inputs at the Kisan Mall.",
  },
  {
    number: "03",
    icon: RefreshCw,
    title: "Buyback Ecosystem",
    text: "Market linkage that buys output back from farmers — a guaranteed return on investment and a secured supply chain.",
  },
];

type TabId = "track" | "advisory" | "app" | "venture";

type ServiceTab = {
  id: TabId;
  icon: Icon;
  label: string;
  blurb: string;
};

const SERVICE_TABS: ServiceTab[] = [
  {
    id: "track",
    icon: MessageCircle,
    label: "Personalised Crop Tracking",
    blurb:
      "Daily and stage-wise guidance on WhatsApp — issue detection through images, direct expert connect.",
  },
  {
    id: "advisory",
    icon: Sprout,
    label: "End-to-End Crop Advisory",
    blurb:
      "From planning to harvest — crop-specific strategies that reduce risk and improve decisions.",
  },
  {
    id: "app",
    icon: Smartphone,
    label: "Farm Management App",
    blurb: "Track crop stages, input and activity logs, with alerts and planning tools.",
  },
  {
    id: "venture",
    icon: Rocket,
    label: "Agri-Entrepreneurship Support",
    blurb: "Set up new agri businesses with farm-to-market guidance and structured scaling.",
  },
];

const CHAT_CHIPS = [
  "Daily & stage-wise guidance",
  "Photo-based issue detection",
  "Direct expert connect",
];

export type ChatMsg = {
  from: "farmer" | "sathi";
  text: string;
  image?: boolean;
};

export const WHATSAPP_SCRIPTS: Record<"track" | "advisory", ChatMsg[]> = {
  track: [
    {
      from: "farmer",
      text: "Yellow spots on my chilli leaves — sending a photo from the field.",
      image: true,
    },
    {
      from: "sathi",
      text: "Issue detected from your image. Today's stage-wise spray plan is sent — protective loop by sunrise, dose per acre.",
    },
    { from: "farmer", text: "Got it. Daily guidance helps a lot. Kya next step?" },
    {
      from: "sathi",
      text: "Kisan Sathi assigned for a field visit — confirmed for Thursday, 8 AM. You are never alone in this season.",
    },
  ],
  advisory: [
    { from: "farmer", text: "Planning watermelon this season. Need the complete plan." },
    {
      from: "sathi",
      text: "Plan ready: seed selection → Bio-Boosted nursery → land preparation. Mulching — central line 1 ft, per crop spec.",
    },
    { from: "farmer", text: "What about fertigation schedules?" },
    {
      from: "sathi",
      text: "Stage-wise nutrition built from your soil report and live crop data. From planning to harvest, every step covered.",
    },
  ],
};

const APP_FEATURES: { icon: Icon; title: string; text: string }[] = [
  {
    icon: Sprout,
    title: "Track crop stages",
    text: "Nursery, land prep, vegetative, flowering, harvest — your plot at a glance.",
  },
  {
    icon: ClipboardList,
    title: "Input & activity logs",
    text: "Every spray, dose and field task recorded against your plot.",
  },
  {
    icon: Bell,
    title: "Alerts & planning tools",
    text: "Fertigation timing, pest windows and harvest readiness alerts.",
  },
];

const VENTURE_STEPS = [
  {
    number: "01",
    title: "Setup",
    text: "Launch new agri businesses with Agaate's structured playbook.",
  },
  {
    number: "02",
    title: "Farm-to-market",
    text: "Direct buyer linkages and market integration — no middlemen.",
  },
  {
    number: "03",
    title: "Scale",
    text: "Structured planning to grow from one plot to a full enterprise.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  stars: number;
  quote: string;
  featured?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Avinash Kumar",
    role: "Parivaar Farmer · Jhajjar",
    stars: 5,
    quote:
      "Verified 5-star rating — inputs, nursery seedlings and field support, all in one place.",
    featured: true,
  },
  {
    name: "Pankaj Gupta",
    role: "Farmer · Bhorakalan",
    stars: 5,
    quote: "Agaate Kisan Mall is a one-stop shop for agricultural inputs.",
  },
  {
    name: "Abhay Ranjan",
    role: "Farm Visitor · Rohtak",
    stars: 5,
    quote:
      "A farm to experience — multiple farming technologies, products, seed varieties, a vegetable nursery, and best practices in farming.",
  },
];

type MapNode = {
  x: number;
  y: number;
  label: string;
  sub: string;
  hub?: boolean;
};

const MAP_NODES: MapNode[] = [
  { x: 50, y: 50, label: "Parivaar Hub", sub: "2,000+ farmers", hub: true },
  { x: 21, y: 21, label: "Jhajjar Hub", sub: "Regional seminars" },
  { x: 14, y: 66, label: "Rohtak Agri Park", sub: "Soil carbon events" },
  { x: 80, y: 27, label: "Kisan Mall", sub: "Gurugram · 500+ inputs" },
  { x: 83, y: 69, label: "Kukrola Nursery", sub: "17-acre smart nursery" },
  { x: 62, y: 85, label: "Kanpur Campus", sub: "CSA University" },
];

const STAGE_CHIPS = [
  { label: "Nursery", done: true },
  { label: "Land Prep", done: true },
  { label: "Vegetative", done: true },
  { label: "Flowering", done: false, current: true },
  { label: "Harvest", done: false },
];
