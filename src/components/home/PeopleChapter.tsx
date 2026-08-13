import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Microscope,
  Plant,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  TrendUp
} from "@phosphor-icons/react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { CountUp, TiltCard, MagneticButton, Reveal, Stagger, StaggerItem, EASE } from "@/components/common/motion";
import KisaanMallShowcase from "./KisaanMallShowcase";

const ecosystemPillars = [
  {
    id: "nursery",
    number: "01",
    label: "Bio Nursery",
    title: "Bio-Boosted Seedling Infrastructure",
    desc: "Pathogen-free plug nurseries engineered for zero seedling mortality and a strong crop start.",
    icon: Plant,
    image: "/nursery.png",
    isPng: true,
    badge: "Nursery Infrastructure",
    metrics: [
      { label: "Plants Delivered", num: 500000, suffix: "+" },
      { label: "Survival Rate", num: 98, suffix: "%" },
      { label: "Varieties Sourced", num: 25, suffix: "+" },
    ],
    features: [
      "Automated misting & humidity control",
      "Trichoderma & mycorrhiza inoculation",
      "Sterile anti-fungal tray casing",
    ],
    cta: "Explore Bio Nurseries",
    ctaLink: "/services/nursery",
  },
  {
    id: "advisory",
    number: "02",
    label: "Field Advisory",
    title: "On-Ground Expert Agronomist Support",
    desc: "Field agronomists providing direct disease diagnosis, exact fertigation doses, and farm visits.",
    icon: Stethoscope,
    image: "/farm.png",
    isPng: true,
    badge: "Field Advisory",
    metrics: [
      { label: "Field Experts", num: 20, suffix: "+" },
      { label: "Farmers Advised", num: 2000, suffix: "+" },
      { label: "Response Time", num: 15, prefix: "< ", suffix: " Mins" },
    ],
    features: [
      "Photo pest & disease identification",
      "Stage-wise spray & fertigation schedules",
      "Direct access to senior agronomists",
    ],
    cta: "Talk to Agronomist",
    ctaLink: "/services/farm-tech",
  },
  {
    id: "mall",
    number: "03",
    label: "Agaate Mall",
    title: "Direct-From-Brand Agri Input Supply",
    desc: "Verified seeds, biologicals, and drip kits delivered direct to your farm at honest prices.",
    icon: ShoppingBag,
    image: "/kisaan mall.png",
    isPng: true,
    badge: "Input Commerce",
    metrics: [
      { label: "Verified Products", num: 500, suffix: "+" },
      { label: "Supply Partners", num: 25, suffix: "+" },
      { label: "Doorstep Delivery", num: 48, prefix: "24-", suffix: " Hrs" },
    ],
    features: [
      "Direct-from-brand honest pricing",
      "QR-verified product authenticity",
      "Custom drip & irrigation packages",
    ],
    cta: "Browse Agaate Mall",
    ctaLink: "/services/kisaan-mall",
  },
  {
    id: "market",
    number: "04",
    label: "Market & Carbon",
    title: "Guaranteed Buyback & Carbon Credits",
    desc: "Direct buyer buyback contracts and soil carbon offset credits to maximize farm profit.",
    icon: TrendUp,
    image: "/carbon credits.png",
    isPng: true,
    badge: "Market Linkage",
    metrics: [
      { label: "Acres Associated", num: 15000, suffix: "+" },
      { label: "Farmer Value", num: 10, prefix: "₹", suffix: " Cr+" },
      { label: "Carbon Enablement", num: 100, suffix: "%" },
    ],
    features: [
      "Guaranteed buyback contract terms",
      "Digital weighment & instant payouts",
      "Soil carbon credit monetization",
    ],
    cta: "View Market Linkage",
    ctaLink: "/services/market-linkage",
  },
];

const impactColumns = [
  {
    id: "research",
    label: "Field Science",
    icon: Microscope,
    accent: "#5d7d37",
    headline: "Research-led agronomy, proven on real farms.",
    bars: [
      { label: "Farm Trials Conducted", value: 120, suffix: "+", heightPct: 72 },
      { label: "Crop Varieties Tested", value: 25, suffix: "+", heightPct: 48 },
      { label: "Disease Protocols", value: 60, suffix: "+", heightPct: 58 },
      { label: "Agronomist Field Visits / Month", value: 200, suffix: "+", heightPct: 85 },
    ],
  },
  {
    id: "inputs",
    label: "Verified Inputs",
    icon: ShieldCheck,
    accent: "#3a6b28",
    headline: "Every product QR-traced from brand to farm.",
    bars: [
      { label: "Verified SKUs", value: 500, suffix: "+", heightPct: 80 },
      { label: "Brand Partners", value: 25, suffix: "+", heightPct: 42 },
      { label: "QR Authentications", value: 10000, suffix: "+", heightPct: 100 },
      { label: "Avg Delivery (Hrs)", value: 36, suffix: "", heightPct: 55 },
    ],
  },
  {
    id: "impact",
    label: "Farmer Impact",
    icon: Plant,
    accent: "#143d31",
    headline: "Real income gains for real farm families.",
    bars: [
      { label: "Farmers Served", value: 2000, suffix: "+", heightPct: 68 },
      { label: "Acres Under Advisory", value: 15000, suffix: "+", heightPct: 95 },
      { label: "Avg Yield Increase", value: 22, suffix: "%", heightPct: 50 },
      { label: "Farmer Value Generated (₹ Cr)", value: 10, suffix: "+", heightPct: 38 },
    ],
  },
];

function ImpactStatsGrid({ col }: { col: typeof impactColumns[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = col.icon;

  return (
    <div ref={ref} className="flex flex-col h-full">
      {/* Column Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
          style={{ backgroundColor: col.accent }}
        >
          <Icon className="h-4.5 w-4.5 text-[#a3e635]" style={{ height: 18, width: 18 }} />
        </div>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: col.accent }}>
            {col.label}
          </p>
          <p className="font-sans text-xs text-[#4f624f] leading-snug mt-0.5">{col.headline}</p>
        </div>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-2 gap-3.5 mt-auto">
        {col.bars.map((bar, i) => (
          <motion.div
            key={bar.label}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{
              delay: 0.15 + i * 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group/stat rounded-2xl border border-[#143d31]/8 bg-[#fafbf7]/60 p-3.5 flex flex-col justify-between min-h-[96px] transition-all duration-300 hover:bg-white hover:border-[#143d31]/15 hover:shadow-[0_8px_20px_-4px_rgba(20,61,49,0.06)]"
          >
            <div className="font-display text-2xl font-extrabold tracking-tight text-[#143d31] group-hover/stat:text-[#5d7d37] transition-colors duration-300">
              <CountUp to={bar.value} suffix={bar.suffix} />
            </div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#3d6547] leading-snug mt-1.5 transition-colors duration-300 group-hover/stat:text-[#143d31]">
              {bar.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const team = [
  { name: "Ankit Rawat", role: "Founder & CEO", image: "/team/ankit.png?v=2" },
  { name: "Kuldeep Singh", role: "Head of Operations", image: "/team/kuldeep.png" },
  { name: "Abhay Ranjan", role: "Chief of Staff", image: "/team/abhay.png" },
  { name: "Chanchala Shukla", role: "Agronomist", image: "/team/chanchala.png" },
  { name: "Ravi Kumar", role: "Data & Strategy", image: "/team/ravi.png" },
];

export default function PeopleChapter() {
  const sectionRef = useHomeChapterReveal("slide-left");
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end end"],
  });

  // Translate across 4 full 100vw panels: 0% to -75%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative bg-[#f4f8f5]"
    >
      {/* 400vh Scroll Track for Pinned 100vw Cinematic Horizontal Panels */}
      <div ref={scrollTargetRef} className="relative h-[380vh]">
        <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden">
          
          {/* Horizontal 100vw Panels Track */}
          <div className="h-full w-full flex items-center">
            <motion.div
              style={{ x }}
              className="flex w-[400vw] h-full items-center"
            >
              {ecosystemPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="w-vw h-screen shrink-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-[104px] pb-6 lg:pb-8"
                    style={{ width: "100vw" }}
                  >
                    <div className="mx-auto w-full max-w-[1440px] grid gap-8 lg:grid-cols-12 lg:items-center">
                      
                      {/* Left Column (6 cols): Dynamic Content & Motion */}
                      <motion.div
                        className="lg:col-span-6 flex flex-col justify-center max-w-xl"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                      >
                        
                        {/* 1. Division Tag with Index */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-base sm:text-lg font-extrabold text-[#5d7d37]">
                            {pillar.number}
                          </span>
                          <span className="h-3 w-[1.5px] bg-[#143d31]/20" />
                          <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#143d31]">
                            {pillar.label}
                          </span>
                        </div>

                        {/* 2. Display Headline */}
                        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.12]">
                          {pillar.title}
                        </h3>

                        {/* 3. Subtext Description */}
                        <p className="font-sans mt-3 text-xs sm:text-sm lg:text-base text-[#4f624f] leading-relaxed font-normal">
                          {pillar.desc}
                        </p>

                        {/* 4. Sleek Minimal Metrics Strip */}
                        <div className="my-5 border-y border-[#143d31]/12 py-3.5 grid grid-cols-3 gap-2">
                          {pillar.metrics.map((m) => (
                            <div key={m.label} className="text-left border-l border-[#5d7d37]/40 pl-3 first:border-l-0 first:pl-0">
                              <p className="font-display text-lg sm:text-xl lg:text-2xl font-extrabold text-[#143d31]">
                                <CountUp
                                  to={m.num}
                                  prefix={m.prefix}
                                  suffix={m.suffix}
                                />
                              </p>
                              <p className="font-mono text-[9px] sm:text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                                {m.label}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* 5. Clean Feature Highlights List (No bulky pills) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                          {pillar.features.map((feat) => (
                            <div
                              key={feat}
                              className="flex items-center gap-2 text-xs font-semibold text-[#143d31]"
                            >
                              <CheckCircle className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* 6. Magnetic CTA Button with Curtain Hover Effect */}
                        <div>
                          <MagneticButton strength={0.25} as="a" href={pillar.ctaLink}>
                            <span className="group relative inline-flex items-center gap-3 rounded-full bg-[#143d31] px-7 py-3.5 text-xs sm:text-sm font-bold text-white overflow-hidden shadow-md transition-all duration-300 cursor-pointer">
                              {/* Curtain Color Slide Overlay */}
                              <span className="absolute inset-0 bg-[#5d7d37] transition-transform duration-500 ease-out -translate-x-full group-hover:translate-x-0 origin-left" />
                              
                              {/* Foreground Content */}
                              <span className="relative z-10 flex items-center gap-3">
                                <span>{pillar.cta}</span>
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </span>
                          </MagneticButton>
                        </div>
                      </motion.div>

                      {/* Right Column (6 cols): Large Freestanding Cutout PNG or Image Frame */}
                      <div className="lg:col-span-6 relative flex items-center justify-center">
                        {pillar.id === "mall" ? (
                          <KisaanMallShowcase />
                        ) : (
                          <TiltCard maxTilt={6} glare={false} className="w-full">
                            {pillar.isPng ? (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative w-full flex items-center justify-center p-0"
                              >
                                <img
                                  src={pillar.image}
                                  alt={pillar.title}
                                  className="w-full max-h-[520px] sm:max-h-[600px] lg:max-h-[680px] object-contain transition-transform duration-500 drop-shadow-2xl"
                                />
                              </motion.div>
                            ) : (
                              <div className="relative aspect-[4/3] lg:aspect-[1.12/1] max-h-[440px] sm:max-h-[520px] lg:max-h-[580px] w-full overflow-hidden rounded-3xl border border-[#143d31]/15 bg-white">
                                <img
                                  src={pillar.image}
                                  alt={pillar.title}
                                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                              </div>
                            )}
                          </TiltCard>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Static Section: Impact Stats, Founder Quote & Leadership */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24 border-t border-[#143d31]/10">
        {/* Animated Stat Bar Chart: Agaate by the Numbers */}
        <div>
          <div className="flex items-center gap-2.5 mb-10">
            <span className="w-5 h-[1px] bg-[#5d7d37]/50" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Agaate by the numbers
            </p>
          </div>
          <Stagger stagger={0.15} className="grid gap-8 md:grid-cols-3">
            {impactColumns.map((col) => (
              <StaggerItem key={col.id} variant="fade-up">
                <div className="rounded-3xl border border-[#143d31]/10 bg-white p-6 md:p-8 h-full hover:border-[#143d31]/25 transition-colors duration-300 hover:shadow-lg hover:shadow-[#143d31]/5">
                  <ImpactStatsGrid col={col} />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Founder Quote Banner */}
        <Reveal variant="blur-in" delay={0.15} className="mt-16">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="rounded-3xl bg-[#eaf0df] p-8 md:p-12 border border-[#143d31]/10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <blockquote className="font-serif text-xl md:text-2xl font-normal italic text-[#143d31] flex-1 max-w-4xl leading-relaxed">
              "We built Agaate with a simple belief — that every farmer deserves the right guidance, the right tools, and the right support, so that their hard work never goes to loss."
            </blockquote>
            <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-[#143d31]/15 pt-6 md:pt-0 md:pl-8">
              <motion.img
                whileHover={{ scale: 1.12, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
                src="/team/ankit.png?v=2"
                alt="Ankit Rawat"
                className="h-14 w-14 rounded-full object-cover border-2 border-white shrink-0 cursor-pointer"
              />
              <div>
                <p className="font-display text-base font-extrabold text-[#143d31]">Ankit Rawat</p>
                <p className="font-sans text-xs font-semibold text-[#5d7d37] mt-0.5">Founder & CEO</p>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Team list */}
        <Reveal variant="fade-up" delay={0.2} className="mt-16 border-t border-[#143d31]/10 pt-10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
            Leadership Team
          </p>
          <Stagger
            stagger={0.08}
            delayChildren={0.1}
            className="mt-6 flex flex-col gap-5 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-x-6 md:gap-y-6"
          >
            {team.map((member) => (
              <StaggerItem key={member.name} variant="fade-up" className="md:min-w-0 md:flex-1">
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="group flex items-center gap-3.5 cursor-pointer"
                >
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    src={member.image}
                    alt={member.name}
                    className="h-11 w-11 shrink-0 rounded-full object-cover border border-[#143d31]/15 transition-transform duration-300"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-[#143d31] group-hover:text-[#5d7d37] transition-colors">
                      {member.name}
                    </p>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#5d7d37]">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
