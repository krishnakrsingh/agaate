import {
  MapPin,
  ShieldCheck,
  Building2,
  Sprout,
  Users,
  ShoppingBag,
  Droplets,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import Testimonials from "@/components/ui/testimonials-13";
import farmerAdvisorImg from "@/assets/about-farmer-advisor.png";
import { motion } from "framer-motion";

const impactMetrics = [
  {
    value: "15,000+",
    unit: "Acres",
    label: "Under Association",
    icon: Sprout,
    bgColor: "bg-[#eab308]", // gold
    textColor: "text-[#0d2a20]",
  },
  {
    value: "2,000+",
    unit: "Farmers",
    label: "Agaate Parivaar",
    icon: Users,
    bgColor: "bg-[#38bdf8]", // sky blue
    textColor: "text-[#0d2a20]",
  },
  {
    value: "500+",
    unit: "Products",
    label: "QC-Verified SKUs",
    icon: ShoppingBag,
    bgColor: "bg-[#fb923c]", // bright orange
    textColor: "text-white",
  },
  {
    value: "25+",
    unit: "Brands",
    label: "Direct Manufacturers",
    icon: Building2,
    bgColor: "bg-[#c084fc]", // bright purple
    textColor: "text-white",
  },
  {
    value: "200+",
    unit: "Units",
    label: "Precision Drip Kits",
    icon: Droplets,
    bgColor: "bg-[#34d399]", // mint
    textColor: "text-[#0d2a20]",
  },
  {
    value: "20+",
    unit: "Experts",
    label: "On-Ground Kisan Sathis",
    icon: ShieldCheck,
    bgColor: "bg-[#a3e635]", // lime
    textColor: "text-[#0d2a20]",
  },
];

const manufacturerBrands = [
  "Bayer CropScience",
  "Syngenta India",
  "UPL Limited",
  "Mahyco Seeds",
  "Netafim Drip",
  "Coromandel International",
];

export default function ProofChapter() {
  const sectionRef = useHomeChapterReveal();

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative scroll-mt-28 overflow-hidden bg-[#f4f8f5] px-5 py-16 text-[#143d31] md:px-10 md:py-24"
    >
      {/* Top divider rule */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#143d31]/10" />

      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* ---------------------------------------------------- */}
        {/* SUB-SECTION 1: CREATIVE IMPACT SCALE */}
        {/* ---------------------------------------------------- */}
        <div className="relative pt-2">
          
          {/* Decorative Leaf Graphic Accent */}
          <div className="absolute -left-10 -top-6 z-0 pointer-events-none opacity-25 hidden md:block">
            <svg width="240" height="300" viewBox="0 0 240 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M120 10C120 10 30 75 30 160C30 245 120 290 120 290C120 290 210 245 210 160C210 75 120 10 120 10Z"
                fill="#5d7d37"
                fillOpacity="0.12"
                stroke="#5d7d37"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <path d="M120 30V270" stroke="#5d7d37" strokeWidth="2.5" />
              <path d="M120 90L65 135" stroke="#5d7d37" strokeWidth="2" />
              <path d="M120 155L175 200" stroke="#5d7d37" strokeWidth="2" />
              <path d="M120 200L75 235" stroke="#5d7d37" strokeWidth="2" />
            </svg>
          </div>

          {/* Section Header Line */}
          <div data-home-reveal className="flex items-center gap-2.5 mb-6">
            <span className="w-6 h-[2px] bg-[#5d7d37]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#5d7d37]">
              01 · Impact Scale & Reach
            </p>
          </div>

          {/* Main Integrated Grid: Left Cutout Image + Right Content Flow */}
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            
            {/* ── LEFT: Pure Farmer & Agronomist Image Card ── */}
            <motion.div
              initial={{ opacity: 0, x: -90 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative group"
            >
              <div className="relative aspect-[4/4.5] sm:aspect-[4/4] lg:aspect-[4/4.8] w-full max-h-[380px] sm:max-h-[420px] overflow-hidden rounded-[2.5rem] rounded-tl-[4rem] rounded-bl-[4rem] border-4 border-[#5d7d37]/40 bg-[#0d2a20]">
                <img
                  src={farmerAdvisorImg}
                  alt="Agaate Farmer and Agronomist in Field"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* ── RIGHT: Tight Borderless Content Flow ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-4"
            >
              {/* Headline */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143d31] leading-[1.12] tracking-tight">
                  <span className="text-[#5d7d37] font-extrabold">2,000+ Farmers</span> trust Agaate across{" "}
                  <span className="font-serif italic font-normal text-[#5d7d37]">15,000+ acres</span> of real farmland
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4f624f] leading-relaxed mt-2 font-normal">
                  Concentrated operational scale delivering direct-from-brand inputs, doorstep logistics, and Senior Agronomist guidance to maximize yield and farmer income.
                </p>
              </div>

              {/* 6 Metric Pill Cards on Page Canvas */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                {impactMetrics.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + idx * 0.05, duration: 0.35 }}
                      className="flex items-center gap-3 rounded-full bg-white px-3.5 py-2.5 border border-[#143d31]/12 hover:border-[#5d7d37] hover:shadow-xs transition-all group"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${m.bgColor} ${m.textColor} group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="font-display text-base sm:text-lg font-extrabold text-[#143d31] leading-none">
                          {m.value}
                        </p>
                        <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#5d7d37] mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Pill CTA Button */}
              <div className="pt-2">
                <a
                  href="/services/farm-tech"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#143d31] px-6 py-3 text-xs font-extrabold text-white hover:bg-[#5d7d37] transition-all duration-300 active:scale-95 cursor-pointer shadow-xs"
                >
                  <span>Explore Agaate Impact</span>
                  <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SUB-SECTION 2: DIRECT MANUFACTURER BRAND PARTNERS */}
        {/* ---------------------------------------------------- */}
        <div
          data-home-reveal
          className="rounded-3xl bg-white border border-[#143d31]/12 p-6 md:p-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#143d31]/10">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#5d7d37]" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                02 · Verified Input Supply Network
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#143d31] px-3.5 py-1 text-[10px] font-mono font-bold text-white uppercase">
              <ShieldCheck className="h-3 w-3 text-white" /> 100% Genuine Partner Supply
            </span>
          </div>

          <p className="text-xs md:text-sm font-medium text-[#4b5f51]">
            Direct supply partnerships with India's leading certified agri-input manufacturers — no
            middlemen, no duplicates.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {manufacturerBrands.map((brand) => (
              <span
                key={brand}
                className="rounded-full bg-[#f4f8f5] px-4.5 py-2 text-xs font-extrabold text-[#143d31] border border-[#143d31]/12 hover:border-[#5d7d37] hover:bg-white transition-all"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SUB-SECTION 3: VERIFIED FARMER TESTIMONIALS */}
        {/* ---------------------------------------------------- */}
        <div data-home-reveal className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-[1px] bg-[#5d7d37]" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              03 · Farmer Reviews & Testimonials
            </p>
          </div>

          {/* New Animated Shadcn Testimonials Component */}
          <div className="-mx-5 md:-mx-10 mt-6">
            <Testimonials />
          </div>
        </div>

      </div>
    </section>
  );
}
