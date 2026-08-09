import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Check,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  PhoneCall,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Store,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AnimatedHeadline,
  CountUp,
  EASE,
  MagneticButton,
  Marquee,
  PageHero,
  Parallax,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/components/common/motion";

export const Route = createFileRoute("/{-$locale}/contact")({
  component: ContactPage,
});

const PRIMARY_PHONE = "+91 83500 85005";
const ALT_PHONE = "+91 94872 63498";
const TEL_PRIMARY = "+918350085005";
const TEL_ALT = "+919487263498";
const EMAIL = "info@agaate.in";
const WHATSAPP_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20would%20like%20to%20connect%20with%20an%20agronomist%20for%20a%20farm%20consultation.";

type Facility = {
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
  coordinates: { x: number; y: number; lat: string; lng: string };
  icon: any;
};

const FACILITIES: Facility[] = [
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
    coordinates: { x: 35, y: 42, lat: "28.3241° N", lng: "76.9124° E" },
    icon: Sprout,
  },
  {
    id: "mall",
    name: "Agaate Kisan Mall",
    tagline: "Comprehensive Agri-Input Store & Experience Hub",
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
    coordinates: { x: 62, y: 68, lat: "28.3015° N", lng: "76.8842° E" },
    icon: Store,
  },
  {
    id: "corporate",
    name: "Anzix Farm Technologies Pvt Ltd",
    tagline: "Corporate Headquarters & Governance Center",
    role: "Corporate Registered Office",
    address:
      "I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004",
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
    coordinates: { x: 78, y: 28, lat: "28.3980° N", lng: "76.9610° E" },
    icon: Building2,
  },
];

const CONSULTATION_TOPICS = [
  {
    id: "nursery",
    label: "Bio-Boosted Nursery Pre-Orders",
    desc: "Reserve disease-resistant saplings with 95%+ guaranteed survival.",
    icon: Sprout,
  },
  {
    id: "bigfarm",
    label: "Big Farm Setup (Turnkey)",
    desc: "End-to-end commercial farm planning, drip setup & operations.",
    icon: Layers,
  },
  {
    id: "carbon",
    label: "Carbon Credit Program",
    desc: "Monetise zero-tillage & drip irrigation practices for extra payout.",
    icon: Zap,
  },
  {
    id: "wholesale",
    label: "Kisan Mall Wholesale",
    desc: "Bulk agri-inputs, biocures, mulch rolls & bamboo staking orders.",
    icon: Store,
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
    icon: MessageCircle,
  },
];

function ContactPage() {
  const [activeFacilityId, setActiveFacilityId] = useState<string>("farm");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mapMode, setMapMode] = useState<"grid" | "satellite">("grid");

  // Form State
  const [selectedTopic, setSelectedTopic] = useState<string>("nursery");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    acreage: "1-5 Acres",
    district: "",
    crop: "Watermelon",
    channel: "WhatsApp",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const activeFacility = FACILITIES.find((f) => f.id === activeFacilityId) || FACILITIES[0];

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `AGA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsSubmitting(false);
      setSubmittedTicket(ticketId);
    }, 1200);
  };

  const getWhatsAppSubmitLink = () => {
    const topicObj = CONSULTATION_TOPICS.find((t) => t.id === selectedTopic);
    const text = encodeURIComponent(
      `Hello Agaate Team,\nI submitted a consultation request on agaate.in.\n\n*Ticket ID:* ${submittedTicket || "AGA-2026-CONSULT"}\n*Topic:* ${topicObj?.label || "General Enquiry"}\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Location:* ${formData.district || "Gurugram"}\n*Land Size:* ${formData.acreage}\n*Crop:* ${formData.crop}\n*Message:* ${formData.message || "Looking forward to your guidance."}`
    );
    return `https://wa.me/918350085005?text=${text}`;
  };

  return (
    <main className="min-h-screen bg-cream font-sans text-ink antialiased">
      <Header />

      {/* Hero Section */}
      <PageHero
        eyebrow="DIRECT CONTACT & AGRI FACILITIES"
        title={
          <>
            Sowing Support, <br />
            <span className="italic text-terracotta">Harvesting Solutions.</span>
          </>
        }
        description="Whether you need emergency crop disease diagnosis, seedling pre-orders, or a full turnkey commercial farm setup, our agronomy team in Gurugram is ready."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MagneticButton
            as="a"
            href={`tel:${TEL_PRIMARY}`}
            className="inline-flex items-center gap-2.5 rounded-full bg-forest-deep px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-cream shadow-lg shadow-forest-deep/20 transition-all hover:bg-forest"
          >
            <PhoneCall className="h-4 w-4 text-terracotta" />
            <span>Hotline: {PRIMARY_PHONE}</span>
          </MagneticButton>
          <MagneticButton
            as="a"
            href={WHATSAPP_URL}
            className="inline-flex items-center gap-2.5 rounded-full border border-forest/30 bg-cream/80 px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-forest transition-all hover:border-forest hover:bg-bone"
          >
            <MessageCircle className="h-4 w-4 text-moss" />
            <span>WhatsApp Agronomist</span>
          </MagneticButton>
        </div>
      </PageHero>

      {/* Emergency Hotline Banner */}
      <section className="relative z-20 border-y border-forest/15 bg-bone/90 py-6 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta/15 text-terracotta">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-moss">
                  Rapid Response SLA
                </p>
                <h3 className="font-serif text-xl font-bold text-forest-deep">
                  2-Hour Callback Assurance During Farm Operating Hours
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-forest" />
                <div className="text-xs">
                  <span className="block font-jet text-[10px] uppercase text-forest/60">
                    Direct Helpline
                  </span>
                  <a
                    href={`tel:${TEL_ALT}`}
                    className="font-mono font-bold text-forest-deep hover:underline"
                  >
                    {ALT_PHONE}
                  </a>
                </div>
              </div>
              <div className="h-8 w-px bg-forest/15 hidden sm:block" />
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-forest" />
                <div className="text-xs">
                  <span className="block font-jet text-[10px] uppercase text-forest/60">
                    Email Desk
                  </span>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-mono font-bold text-forest-deep hover:underline"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div className="h-8 w-px bg-forest/15 hidden sm:block" />
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-forest" />
                <div className="text-xs">
                  <span className="block font-jet text-[10px] uppercase text-forest/60">
                    Operating Hours
                  </span>
                  <span className="font-sans font-semibold text-forest-deep">
                    07:30 AM – 08:00 PM IST
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Facilities Locator Section */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="FACILITIES & HUBS"
            title={
              <>
                Visit Our Physical <span className="italic text-terracotta">Infrastructure.</span>
              </>
            }
            description="From our 17-acre smart nursery in Kukrola to the Kisan Mall in Bhora Kalan and our registered headquarters in Sector-81 Gurugram."
          />

          {/* Facility Tab Switcher */}
          <div className="mt-12 flex flex-wrap gap-3 border-b border-forest/15 pb-4">
            {FACILITIES.map((fac) => {
              const IconComp = fac.icon;
              const isActive = activeFacilityId === fac.id;
              return (
                <button
                  key={fac.id}
                  onClick={() => setActiveFacilityId(fac.id)}
                  className={`group relative flex items-center gap-3 rounded-xl px-5 py-3.5 text-left transition-all ${
                    isActive
                      ? "bg-forest-deep text-cream shadow-lg shadow-forest-deep/15"
                      : "bg-bone/80 text-forest hover:bg-bone hover:text-forest-deep"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      isActive ? "bg-terracotta text-cream" : "bg-forest/10 text-forest"
                    }`}
                  >
                    <IconComp className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-jet text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">
                      {fac.role}
                    </span>
                    <span className="font-serif text-base font-bold leading-tight">
                      {fac.name}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeFacilityIndicator"
                      className="absolute -bottom-4 left-6 right-6 h-0.5 bg-terracotta"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Facility Details & Interactive Map Grid */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left: Active Facility Info */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFacility.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="rounded-3xl border border-forest/15 bg-bone/70 p-8 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-cream/90 px-3.5 py-1.5 font-jet text-[10px] font-bold uppercase tracking-wider text-forest">
                      <MapPin className="h-3 w-3 text-terracotta" />
                      {activeFacility.role}
                    </span>
                    <span className="font-mono text-xs text-forest/60">
                      {activeFacility.coordinates.lat}, {activeFacility.coordinates.lng}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-3xl font-bold text-forest-deep">
                    {activeFacility.name}
                  </h3>
                  <p className="mt-1 font-sans text-sm font-medium text-moss">
                    {activeFacility.tagline}
                  </p>

                  <div className="mt-6 space-y-4 rounded-2xl bg-cream/90 p-5 border border-forest/10">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-terracotta" />
                      <div>
                        <span className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/60">
                          Full Address
                        </span>
                        <p className="text-sm font-medium leading-relaxed text-forest-deep">
                          {activeFacility.address}
                        </p>
                        {activeFacility.plusCode && (
                          <span className="mt-1 inline-block font-mono text-[11px] text-moss">
                            {activeFacility.plusCode}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-forest/10 pt-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 shrink-0 text-forest" />
                        <div>
                          <span className="block font-jet text-[9px] uppercase text-forest/60">
                            Contact Line
                          </span>
                          <a
                            href={`tel:${activeFacility.telRaw}`}
                            className="font-mono text-xs font-bold text-forest-deep hover:underline"
                          >
                            {activeFacility.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 shrink-0 text-forest" />
                        <div>
                          <span className="block font-jet text-[9px] uppercase text-forest/60">
                            Operational Hours
                          </span>
                          <span className="font-sans text-xs font-semibold text-forest-deep">
                            {activeFacility.hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6">
                    <h4 className="font-jet text-[11px] font-bold uppercase tracking-[0.18em] text-forest/70">
                      Facility Capabilities & Services
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {activeFacility.highlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-forest/80">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-terracotta" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-forest/10">
                    <a
                      href={activeFacility.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-forest-deep px-5 py-2.5 font-sans text-xs font-bold text-cream shadow-md transition-transform hover:scale-[1.02]"
                    >
                      <Navigation className="h-3.5 w-3.5 text-terracotta" />
                      <span>Get Directions on Maps</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>

                    <button
                      onClick={() =>
                        handleCopyAddress(activeFacility.id, activeFacility.address)
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-forest/20 bg-cream px-4 py-2.5 font-sans text-xs font-bold text-forest hover:bg-bone"
                    >
                      {copiedId === activeFacility.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-moss" />
                          <span className="text-moss">Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-forest/70" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Interactive SVG Map Mockup */}
            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[440px] overflow-hidden rounded-3xl border border-forest/20 bg-forest-deep text-cream shadow-2xl">
                {/* Map Grid / Satellite Background Pattern */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    mapMode === "grid"
                      ? "bg-[radial-gradient(#3a6452_1px,transparent_1px)] [background-size:20px_20px] opacity-40"
                      : "bg-[linear-gradient(to_right,#1b3429_1px,transparent_1px),linear-gradient(to_bottom,#1b3429_1px,transparent_1px)] [background-size:40px_40px] opacity-60"
                  }`}
                />

                {/* Simulated Radar / Topo Curves */}
                <svg className="absolute inset-0 h-full w-full opacity-20 pointer-events-none">
                  <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#7eb09b" strokeDasharray="4 4" />
                  <circle cx="50%" cy="50%" r="20%" fill="none" stroke="#7eb09b" />
                  <path d="M 0,200 Q 200,100 400,280 T 800,200" fill="none" stroke="#e07a5f" strokeWidth="1.5" />
                  <path d="M 0,320 Q 300,400 500,200 T 800,450" fill="none" stroke="#7eb09b" strokeWidth="1" strokeDasharray="6 6" />
                </svg>

                {/* Map Controls Top Bar */}
                <div className="relative z-10 flex items-center justify-between p-5 border-b border-cream/10 bg-forest-deep/80 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-moss animate-pulse" />
                    <span className="font-jet text-[11px] font-bold uppercase tracking-wider text-moss">
                      Gurugram Agri-Hub Telemetry
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-lg border border-cream/20 bg-forest-deep p-1">
                    <button
                      onClick={() => setMapMode("grid")}
                      className={`px-2.5 py-1 font-jet text-[10px] font-bold rounded transition-colors ${
                        mapMode === "grid" ? "bg-moss text-forest-deep" : "text-cream/70 hover:text-cream"
                      }`}
                    >
                      Topographic
                    </button>
                    <button
                      onClick={() => setMapMode("satellite")}
                      className={`px-2.5 py-1 font-jet text-[10px] font-bold rounded transition-colors ${
                        mapMode === "satellite" ? "bg-terracotta text-cream" : "text-cream/70 hover:text-cream"
                      }`}
                    >
                      Satellite
                    </button>
                  </div>
                </div>

                {/* Map Interactive Canvas */}
                <div className="relative h-[340px] w-full p-6">
                  {/* Connecting Route Lines between Facilities */}
                  <svg className="absolute inset-0 h-full w-full pointer-events-none">
                    <motion.path
                      d="M 35% 42% L 62% 68% L 78% 28%"
                      fill="none"
                      stroke="#e07a5f"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </svg>

                  {/* Interactive Facility Map Pins */}
                  {FACILITIES.map((fac) => {
                    const isSelected = activeFacilityId === fac.id;
                    const IconComp = fac.icon;
                    return (
                      <div
                        key={fac.id}
                        onClick={() => setActiveFacilityId(fac.id)}
                        style={{ left: `${fac.coordinates.x}%`, top: `${fac.coordinates.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                      >
                        {/* Pulse Effect for Active Pin */}
                        {isSelected && (
                          <motion.div
                            className="absolute -inset-4 rounded-full bg-terracotta/30"
                            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}

                        {/* Pin Marker */}
                        <div
                          className={`relative flex items-center gap-2 rounded-full px-3 py-1.5 shadow-xl transition-transform duration-300 group-hover:scale-110 ${
                            isSelected
                              ? "bg-terracotta text-cream ring-4 ring-terracotta/40 scale-105"
                              : "bg-cream text-forest-deep hover:bg-moss hover:text-forest-deep"
                          }`}
                        >
                          <IconComp className="h-4 w-4" />
                          <span className="font-serif text-xs font-bold whitespace-nowrap">
                            {fac.name.replace("Agaate ", "").replace(" Pvt Ltd", "")}
                          </span>
                        </div>

                        {/* Coordinate Hover Tooltip */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block rounded bg-forest-deep border border-cream/20 px-2 py-1 font-mono text-[9px] text-cream whitespace-nowrap shadow-lg">
                          {fac.coordinates.lat}, {fac.coordinates.lng}
                        </div>
                      </div>
                    );
                  })}

                  {/* Bottom Map Legend */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-forest-deep/90 border border-cream/15 p-3 backdrop-blur-md text-xs">
                    <div className="flex items-center gap-4 text-[11px] text-cream/80 font-jet">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-terracotta" />
                        Selected Hub
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-cream" />
                        Active Facility
                      </span>
                    </div>

                    <a
                      href={activeFacility.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-jet text-[10px] font-bold uppercase tracking-wider text-moss hover:underline flex items-center gap-1"
                    >
                      Open Satellite View <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Topic Consultation Form Section */}
      <section className="relative overflow-hidden bg-bone/60 py-24 border-t border-forest/15">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Form Intro & Topic Selection */}
            <div className="lg:col-span-5">
              <Reveal variant="fade-up">
                <span className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-moss">
                  TAILORED AGRONOMY CONSULTATION
                </span>
                <h2 className="mt-2 font-serif text-4xl font-bold leading-tight text-forest-deep md:text-5xl">
                  Schedule a Consultation with Our <span className="italic text-terracotta">Agronomists.</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-forest/80">
                  Select your area of interest below to route your query directly to the specialized advisor at Agaate Anzix Farm.
                </p>

                {/* Topic Selector Pills */}
                <div className="mt-8 space-y-3">
                  {CONSULTATION_TOPICS.map((topic) => {
                    const IconComp = topic.icon;
                    const isSelected = selectedTopic === topic.id;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`w-full text-left rounded-2xl p-4 transition-all border ${
                          isSelected
                            ? "bg-forest-deep text-cream border-forest-deep shadow-md"
                            : "bg-cream text-forest border-forest/15 hover:border-forest/40 hover:bg-cream/90"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                              isSelected ? "bg-terracotta text-cream" : "bg-forest/10 text-forest"
                            }`}
                          >
                            <IconComp className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-serif text-base font-bold leading-none">
                              {topic.label}
                            </h4>
                            <p
                              className={`mt-1 text-xs leading-snug ${
                                isSelected ? "text-cream/80" : "text-forest/70"
                              }`}
                            >
                              {topic.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            {/* Right Column: Dynamic Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-forest/20 bg-cream p-8 sm:p-10 shadow-xl">
                {submittedTicket ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss/20 text-forest-deep">
                      <Check className="h-8 w-8 text-moss" />
                    </div>
                    <span className="mt-4 block font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-moss">
                      CONSULTATION REQUEST SUBMITTED
                    </span>
                    <h3 className="mt-2 font-serif text-3xl font-bold text-forest-deep">
                      Reference ID: {submittedTicket}
                    </h3>
                    <p className="mt-3 text-sm text-forest/80 max-w-md mx-auto">
                      Thank you, <strong className="text-forest-deep">{formData.name || "Farmer"}</strong>! Our senior agronomist team in Gurugram has received your inquiry for{" "}
                      <strong className="text-terracotta">
                        {CONSULTATION_TOPICS.find((t) => t.id === selectedTopic)?.label}
                      </strong>.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a
                        href={getWhatsAppSubmitLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-forest-deep px-6 py-3 font-sans text-xs font-bold text-cream hover:bg-forest shadow-md"
                      >
                        <MessageCircle className="h-4 w-4 text-moss" />
                        <span>Send Details via WhatsApp Now</span>
                      </a>
                      <button
                        onClick={() => {
                          setSubmittedTicket(null);
                          setFormData({
                            name: "",
                            phone: "",
                            email: "",
                            acreage: "1-5 Acres",
                            district: "",
                            crop: "Watermelon",
                            channel: "WhatsApp",
                            message: "",
                          });
                        }}
                        className="w-full sm:w-auto rounded-xl border border-forest/25 px-6 py-3 font-sans text-xs font-bold text-forest hover:bg-bone"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitForm} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-forest/10 pb-4">
                      <span className="font-jet text-[10px] font-bold uppercase tracking-wider text-moss">
                        Step 2: Enter Farm & Contact Details
                      </span>
                      <span className="font-mono text-xs text-forest/60">
                        Topic: {CONSULTATION_TOPICS.find((t) => t.id === selectedTopic)?.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full rounded-xl border border-forest/20 bg-bone/50 px-4 py-3 text-sm text-forest-deep focus:border-forest focus:bg-cream focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-2">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 98123 45678"
                          className="w-full rounded-xl border border-forest/20 bg-bone/50 px-4 py-3 text-sm text-forest-deep focus:border-forest focus:bg-cream focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-2">
                          Land Acreage
                        </label>
                        <select
                          value={formData.acreage}
                          onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                          className="w-full rounded-xl border border-forest/20 bg-bone/50 px-4 py-3 text-sm text-forest-deep focus:border-forest focus:bg-cream focus:outline-none"
                        >
                          <option value="1-5 Acres">1 – 5 Acres</option>
                          <option value="5-15 Acres">5 – 15 Acres</option>
                          <option value="15-50 Commercial Acres">15 – 50 Commercial Acres</option>
                          <option value="50+ Institutional Farm">50+ Institutional Farm</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-2">
                          District / Region
                        </label>
                        <input
                          type="text"
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          placeholder="e.g. Gurugram, Rewari"
                          className="w-full rounded-xl border border-forest/20 bg-bone/50 px-4 py-3 text-sm text-forest-deep focus:border-forest focus:bg-cream focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-2">
                          Primary Crop
                        </label>
                        <select
                          value={formData.crop}
                          onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                          className="w-full rounded-xl border border-forest/20 bg-bone/50 px-4 py-3 text-sm text-forest-deep focus:border-forest focus:bg-cream focus:outline-none"
                        >
                          <option value="Watermelon">Watermelon</option>
                          <option value="Chilli">Chilli</option>
                          <option value="Tomato">Tomato</option>
                          <option value="Cauliflower">Cauliflower</option>
                          <option value="Cucumber">Cucumber</option>
                          <option value="Wheat & Paddy">Wheat & Paddy</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-2">
                        Preferred Callback Channel
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {["WhatsApp", "Phone Call", "Email"].map((ch) => (
                          <button
                            type="button"
                            key={ch}
                            onClick={() => setFormData({ ...formData, channel: ch })}
                            className={`rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
                              formData.channel === ch
                                ? "bg-terracotta text-cream"
                                : "bg-bone/80 text-forest hover:bg-bone"
                            }`}
                          >
                            {ch}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-2">
                        Consultation Notes / Questions
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your current crop stage, soil conditions, or sapling quantity requirement..."
                        className="w-full rounded-xl border border-forest/20 bg-bone/50 px-4 py-3 text-sm text-forest-deep focus:border-forest focus:bg-cream focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-forest-deep px-8 py-4 font-sans text-sm font-bold uppercase tracking-wider text-cream shadow-xl hover:bg-forest transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream border-t-transparent" />
                          <span>Routing to Agronomist...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-terracotta" />
                          <span>Request Agronomy Callback</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
