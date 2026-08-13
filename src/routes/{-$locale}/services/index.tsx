import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowClockwise,
  ArrowRight,
  CaretRight,
  Check,
  CheckCircle,
  Coins,
  Cpu,
  GraduationCap,
  Hammer,
  Handshake,
  type Icon,
  Leaf,
  PackageCheck,
  PhoneCall,
  Plant,
  ShieldCheck,
  Sliders,
  Sparkle,
  Storefront,
  TrendUp,
  Truck,
  X
} from "@phosphor-icons/react";
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
import { getLocalizedPath } from "@/lib/i18n";

export const Route = createFileRoute("/{-$locale}/services/")({
  component: ServicesOverview,
});

type ServiceCategory = "all" | "nursery-inputs" | "advisory-tech" | "scale-infra" | "buyback";

type ServiceItem = {
  id: string;
  icon: Icon;
  title: string;
  category: ServiceCategory;
  desc: string;
  tag: string;
  badgeStat: string;
  badgeLabel: string;
  href: string;
  highlights: string[];
  bgGradient: string;
};

const SERVICES: ServiceItem[] = [
  {
    id: "nursery",
    icon: Plant,
    title: "17-Acre Smart Nursery",
    category: "nursery-inputs",
    desc: "Containerized, bio-boosted plug saplings raised in AI-monitored climate chambers in Pachgaon/Kukrola. Zero root shock and 90-98% survival.",
    tag: "Nursery",
    badgeStat: "+40%",
    badgeLabel: "Survival vs Direct Sowing",
    href: "/services/nursery",
    highlights: ["Sterile Plug Chamber Germination", "Biological Root Inoculation (VAM)", "Certified Disease-Free Stock"],
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    id: "inputs",
    icon: Storefront,
    title: "Kisaan Mall & Prescribed Inputs",
    category: "nursery-inputs",
    desc: "500+ certified SKUs from 25+ direct manufacturer partners. Stage-matched bio-fertilizers, organic fungicides (Biocure F), and hybrid seeds.",
    tag: "Inputs",
    badgeStat: "500+",
    badgeLabel: "Direct Agri SKUs",
    href: "/services/kisaan-mall",
    highlights: ["Direct Manufacturer Pricing", "Soil EC/pH Prescribed Dosage", "Zero Counterfeit Guarantee"],
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    id: "farm-tech",
    icon: Cpu,
    title: "Farm Tech & Precision Agronomy",
    category: "advisory-tech",
    desc: "IoT soil probes, drone scouting, AI disease diagnostics from smartphone photos, and automated fertigation systems.",
    tag: "Tech & AI",
    badgeStat: "Real-Time",
    badgeLabel: "Field Telemetry & Alerts",
    href: "/services/farm-tech",
    highlights: ["WhatsApp Crop Advisory", "AI Leaf Disease Diagnostics", "Solar Telemetric Soil Probes"],
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
  {
    id: "carbon",
    icon: Coins,
    title: "Carbon Credits & Soil Health",
    category: "scale-infra",
    desc: "Monetize sustainable farming. Turn reduced tillage, drip efficiency, and residue retention into verified carbon credit payouts.",
    tag: "Sustainability",
    badgeStat: "1 Credit",
    badgeLabel: "Per Tonne CO2 Saved",
    href: "/services/carbon-credits",
    highlights: ["Full MRV (Measure/Report/Verify)", "No Extra Land Required", "Direct Bank Payouts"],
    bgGradient: "from-green-500/10 via-emerald-500/5 to-transparent",
  },
  {
    id: "turnkey",
    icon: Hammer,
    title: "Turnkey Big-Farm Setup",
    category: "scale-infra",
    desc: "Complete commercial establishment from bare land to first harvest. Drip layout, mulching, polyhouse design, SOPs, and labor planning.",
    tag: "Projects",
    badgeStat: "Turnkey",
    badgeLabel: "Land to Harvest Execution",
    href: "/services/big-farm-setup",
    highlights: ["15,000+ Acres Managed", "Drip & Fertigation Infrastructure", "Dedicated On-Site Agronomist"],
    bgGradient: "from-orange-500/10 via-red-500/5 to-transparent",
  },
  {
    id: "buyback",
    icon: Truck,
    title: "Sales & Market Linkage",
    category: "buyback",
    desc: "Direct buyer tie-ups with retail chains and food processors. Guaranteed buyback floor price with zero middleman commissions.",
    tag: "Market Linkage",
    badgeStat: "0%",
    badgeLabel: "Middleman Commission",
    href: "/services/market-linkage",
    highlights: ["Guaranteed Floor Pricing", "Handpick Buyer Integration", "24-48hr Direct Bank Payment"],
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
];

const IMPACT_STATS = [
  { to: 15000, suffix: "+", label: "Acres under association" },
  { to: 500, suffix: "+", label: "Acres nursery plants delivered" },
  { to: 10, prefix: "₹", suffix: " Cr+", label: "Managed crop GMV" },
  { to: 25, suffix: "+", label: "Direct manufacturer partners" },
  { to: 20, suffix: "+", label: "Kisan Sathi field agronomists" },
  { to: 500, suffix: "+", label: "Agri-input SKUs in mall" },
  { to: 200, suffix: "+", label: "Drip installations" },
  { to: 2000, suffix: "+", label: "Parivaar registered farmers" },
];

const CROP_JOURNEY_STAGES = [
  {
    id: 1,
    title: "Seed Selection",
    icon: Plant,
    desc: "Choosing best-in-class hybrid & disease-resistant seed varieties tailored to local soil pH and sowing windows.",
    inputs: "Certified Hybrids, High-Yield Seeds",
    partners: "Leading Seed Partners",
    benefit: "High Genetic Vigor & Resistance",
  },
  {
    id: 2,
    title: "Bio-Boosted Nursery",
    icon: Leaf,
    desc: "Germinating seeds inside 17-acre sterile plug chambers with VAM bio-boosters for dense root ball structure.",
    inputs: "Biocure F, VAM Inoculant, Plug Trays",
    partners: "Agaate Smart Nursery",
    benefit: "90-98% Survival Rate",
  },
  {
    id: 3,
    title: "Land Preparation",
    icon: Hammer,
    desc: "Scientific soil analysis, customized basal dose planning, precision drip line setup, and specialized mulching.",
    inputs: "Soil Test Kit, Drip Tubing, Silver Mulch",
    partners: "IrriTech & Soil Labs",
    benefit: "Optimal Water & Root Aeration",
  },
  {
    id: 4,
    title: "Expert Advisory",
    icon: Cpu,
    desc: "Daily stage-wise guidance via WhatsApp, smartphone AI image diagnostics, and Kisan Sathi field visits.",
    inputs: "Agaate App, Telemetry Probes",
    partners: "Kisan Sathi Agronomy Team",
    benefit: "Early Disease Identification",
  },
  {
    id: 5,
    title: "Smart Fertigation",
    icon: Sliders,
    desc: "Stage-wise plant nutrition formulated strictly based on live soil EC sensors and real-time crop needs.",
    inputs: "Water-Soluble Bio-Formulas",
    partners: "Stanes & Biological Partners",
    benefit: "50-70% Reduced Chemical Runoff",
  },
  {
    id: 6,
    title: "Preventive Protection",
    icon: ShieldCheck,
    desc: "Weather-triggered disease prevention protocols and organic bio-cures before pest outbreaks occur.",
    inputs: "Biocure B, Bio Nimaton, Plantex",
    partners: "Certified Protection Partners",
    benefit: "Zero Crop Damage Spikes",
  },
  {
    id: 7,
    title: "Timely Harvest",
    icon: GraduationCap,
    desc: "Using specialized bamboo staking, ties, and harvest tools to gather market-ready grade-A produce at peak ripeness.",
    inputs: "Bamboo Poles, Netting, Harvest Crates",
    partners: "Agaate Harvest Protocol",
    benefit: "Higher Fruit Uniformity & Grade A %",
  },
  {
    id: 8,
    title: "Market Linkage",
    icon: Truck,
    desc: "Bypassing mandi auctions to sell directly to retail chains with guaranteed buyback contracts and fast payouts.",
    inputs: "Direct Handpick Buyer Connect",
    partners: "Handpick & Supermarket Networks",
    benefit: "Maximized Net Profit & Clean Prices",
  },
];

function ServicesOverview() {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? "en";

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [calculatorAcres, setCalculatorAcres] = useState<number>(5);

  // Wizard state
  const [wizardStep, setWizardStep] = useState<number>(0);
  const [wizardAnswers, setWizardAnswers] = useState({ acres: "", crop: "", priority: "" });

  const filteredServices =
    activeCategory === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  const activeStage = CROP_JOURNEY_STAGES.find((s) => s.id === activeStageId) || CROP_JOURNEY_STAGES[0];

  // Calculations for Direct Sowing vs Nursery
  const directSowingSurvival = 0.6; // 60%
  const bioBoostedSurvival = 0.95; // 95%
  const seedCostPerAcre = 4500;
  const chemicalCostPerAcreDirect = 18000;
  const chemicalCostPerAcreBio = 7500; // 58% savings
  const yieldPerAcreDirectQuintals = 120;
  const yieldPerAcreBioQuintals = 150; // +25%
  const pricePerQuintal = 1800;

  const totalRevenueDirect = calculatorAcres * yieldPerAcreDirectQuintals * pricePerQuintal;
  const totalRevenueBio = calculatorAcres * yieldPerAcreBioQuintals * pricePerQuintal;
  const extraRevenue = totalRevenueBio - totalRevenueDirect;
  const chemicalSavings = calculatorAcres * (chemicalCostPerAcreDirect - chemicalCostPerAcreBio);
  const totalNetGain = extraRevenue + chemicalSavings;

  const handleWizardSelect = (field: "acres" | "crop" | "priority", val: string) => {
    setWizardAnswers((prev) => ({ ...prev, [field]: val }));
    setWizardStep((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen flex flex-col bg-cream font-sans text-ink antialiased">
      <Header />

      {/* Hero Section */}
      <PageHero
        eyebrow="AGAATE INTEGRATED AGTECH SERVICES"
        title={
          <>
            From Seed to Sale. <br />
            <span className="italic text-terracotta">Science-Backed Farming.</span>
          </>
        }
        description="Empowering Indian farmers with Bio-Boosted nursery stock, stage-wise precision inputs, AI crop advisory, carbon credit rewards, turnkey farm setup, and direct buyback market linkage."
      >
        {/* Floating Feature Badges */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {[
            { label: "+40% Seedling Survival", icon: Plant },
            { label: "17-Acre Smart Nursery", icon: Leaf },
            { label: "Zero Seed Waste", icon: ShieldCheck },
            { label: "MRV Carbon Payouts", icon: Coins },
            { label: "Guaranteed Buyback", icon: Truck },
            { label: "2,000+ Parivaar Farmers", icon: CheckCircle },
          ].map((badge, idx) => {
            const BIcon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-card/80 px-4 py-2 text-xs font-mono font-bold text-forest-deep shadow-sm backdrop-blur transition-all hover:border-forest hover:-translate-y-0.5"
              >
                <BIcon className="h-3.5 w-3.5 text-moss" />
                <span>{badge.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton as="a" href="#services-grid" strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-7 py-3.5 font-bold text-sm text-cream shadow-xl transition-colors hover:bg-forest">
              Explore 6 Services <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>
          <MagneticButton
            as="a"
            href={getLocalizedPath("/free-farm-consultation", currentLang)}
            strength={0.3}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-card px-7 py-3.5 font-bold text-sm text-forest-deep shadow-sm hover:bg-cream">
              Book Free Farm Audit
            </span>
          </MagneticButton>
        </div>
      </PageHero>

      {/* Marquee Strip */}
      <div className="border-b border-border bg-card/70 py-4 overflow-hidden">
        <Marquee duration={32}>
          {[
            "17-Acre Smart Nursery",
            "Kisaan Mall 500+ SKUs",
            "AI Leaf Diagnostics",
            "Carbon Credit MRV",
            "Turnkey Big Farm Setup",
            "Direct Supermarket Buyback",
            "Bio-Boosted Saplings",
            "Kisan Sathi On-Field Advisory",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-4 font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-forest/70"
            >
              <span>{item}</span>
              <Sparkle className="h-3.5 w-3.5 text-terracotta" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        {/* Section 1: Services Category Grid */}
        <section id="services-grid" className="scroll-mt-28">
          <SectionHeader
            align="center"
            eyebrow="OUR FULL SERVICE ECOSYSTEM"
            title="Six Pillars of Agricultural Mastery."
            description="One connected AgTech platform replacing dealer guesswork with science-backed solutions at every step of your crop cycle."
          />

          {/* Category Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Services (6)" },
              { id: "nursery-inputs", label: "Nursery & Inputs" },
              { id: "advisory-tech", label: "Advisory & AI Tech" },
              { id: "scale-infra", label: "Scale & Infrastructure" },
              { id: "buyback", label: "Buyback & Market Linkage" },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as ServiceCategory)}
                  className={`relative cursor-pointer rounded-full px-5 py-2.5 font-mono text-xs font-bold transition-all ${
                    isActive
                      ? "text-cream shadow-md"
                      : "border border-border bg-card text-forest/70 hover:border-forest/40"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-cat-pill"
                      className="absolute inset-0 rounded-full bg-forest-deep"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Service Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <TiltCard key={service.id} maxTilt={9} className="h-full">
                    <Link
                      to={getLocalizedPath(service.href, currentLang) as never}
                      className="group flex h-full flex-col justify-between overflow-hidden rounded-[2.2rem] border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-forest/40 hover:shadow-xl"
                    >
                      <div className="relative z-10">
                        {/* Card Header */}
                        <div className="flex items-start justify-between mb-6">
                          <motion.div
                            whileHover={{ rotate: -10, scale: 1.1 }}
                            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-forest/15 bg-bone text-forest transition-colors duration-300 group-hover:bg-forest-deep group-hover:text-cream"
                          >
                            <Icon className="h-7 w-7" />
                          </motion.div>

                          {/* Badge Stat */}
                          <div className="text-right">
                            <span className="block font-serif text-2xl font-bold text-terracotta leading-none">
                              {service.badgeStat}
                            </span>
                            <span className="font-mono text-[9px] font-semibold text-forest/50 uppercase tracking-tight">
                              {service.badgeLabel}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <span className="mb-2 inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-moss">
                          {service.tag}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-forest-deep transition-colors group-hover:text-forest">
                          {service.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-forest/75">
                          {service.desc}
                        </p>

                        {/* Highlights List */}
                        <ul className="mt-6 space-y-2 border-t border-border/60 pt-4">
                          {service.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-xs font-medium text-forest/80"
                            >
                              <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Card Footer Button */}
                      <div className="relative z-10 mt-8 flex items-center justify-between border-t border-border/60 pt-4 font-mono text-xs font-bold text-forest">
                        <span>EXPLORE VERTICAL</span>
                        <motion.span
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-bone group-hover:bg-terracotta group-hover:text-cream transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </div>
                    </Link>
                  </TiltCard>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Section 2: Interactive 8-Stage Crop Journey Stepper */}
        <section id="crop-journey" className="scroll-mt-28">
          <SectionHeader
            align="center"
            eyebrow="CLOSED-LOOP CROPPING LIFECYCLE"
            title="Interactive 8-Stage Crop Journey."
            description="Click on any stage below to inspect Agaate's exact scientific protocol, input formulations, and partner integrations."
          />

          <div className="mt-14 rounded-[2.5rem] border border-border bg-bone p-6 md:p-10 shadow-sm">
            {/* Stage Selector Pills */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
              {CROP_JOURNEY_STAGES.map((st) => {
                const isActive = activeStageId === st.id;
                const StageIcon = st.icon;
                return (
                  <button
                    key={st.id}
                    onClick={() => setActiveStageId(st.id)}
                    className={`relative flex flex-col items-center justify-center rounded-2xl p-3 text-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-forest-deep text-cream shadow-md"
                        : "border border-border bg-card text-forest/80 hover:border-forest/40"
                    }`}
                  >
                    <span
                      className={`mb-1 font-mono text-[9px] font-bold ${
                        isActive ? "text-terracotta" : "text-forest/40"
                      }`}
                    >
                      STAGE 0{st.id}
                    </span>
                    <StageIcon className="h-5 w-5 mb-1" />
                    <span className="font-serif text-xs font-bold leading-tight">
                      {st.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detail Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-8 rounded-3xl border border-forest/15 bg-card p-6 md:p-8 shadow-sm"
              >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-forest-deep px-3 py-1 font-mono text-xs font-bold text-cream">
                        Stage 0{activeStage.id} of 08
                      </span>
                      <span className="font-mono text-xs font-bold text-terracotta uppercase tracking-wider">
                        {activeStage.benefit}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-bold text-forest-deep">
                      {activeStage.title}
                    </h3>
                    <p className="text-base leading-relaxed text-forest/80">
                      {activeStage.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="rounded-xl border border-border bg-bone p-4">
                        <span className="block font-mono text-[10px] font-bold text-forest/50 uppercase">
                          INPUTS & HARDWARE
                        </span>
                        <p className="mt-1 font-sans text-sm font-semibold text-forest-deep">
                          {activeStage.inputs}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-bone p-4">
                        <span className="block font-mono text-[10px] font-bold text-forest/50 uppercase">
                          PARTNER ECOSYSTEM
                        </span>
                        <p className="mt-1 font-sans text-sm font-semibold text-forest-deep">
                          {activeStage.partners}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-2xl border border-forest/10 p-6 text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-deep text-cream">
                      {(() => {
                        const IconComponent = activeStage.icon;
                        return <IconComponent className="h-8 w-8" />;
                      })()}
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase text-moss">
                        STAGE OUTCOME GUARANTEE
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-forest-deep">
                        {activeStage.benefit}
                      </h4>
                    </div>
                    <p className="text-xs text-forest/70 leading-relaxed">
                      "Managing farming outcome from seed selection to buyer collection."
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Section 3: Bio-Boosted Nursery vs Direct Sowing Interactive Comparison Slider */}
        <section id="comparison-slider" className="scroll-mt-28">
          <SectionHeader
            align="center"
            eyebrow="THE PARADIGM SHIFT"
            title="Risky Direct Sowing vs Bio-Boosted Nursery Model."
            description="Use the acreage slider below to calculate your estimated net financial savings and yield gain per season."
          />

          {/* Interactive Acreage Slider Widget */}
          <div className="mt-10 rounded-[2.5rem] border border-border bg-card p-8 md:p-12 shadow-sm">
            <div className="mx-auto max-w-xl text-center space-y-4">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-forest/60">
                Select Your Cultivated Acreage:
              </label>
              <div className="flex items-center justify-center gap-4 font-serif text-4xl font-bold text-forest-deep">
                <span>{calculatorAcres}</span>
                <span className="text-lg font-sans font-normal text-forest/60">Acres</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={calculatorAcres}
                onChange={(e) => setCalculatorAcres(Number(e.target.value))}
                className="w-full accent-forest cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-forest/50">
                <span>1 Acre</span>
                <span>25 Acres</span>
                <span>50 Acres</span>
              </div>
            </div>

            {/* Comparison Cards Grid */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Card 1: Traditional Direct Sowing */}
              <div className="rounded-3xl border border-destructive/20 bg-red-50/30 p-8 text-left space-y-6">
                <div className="flex items-center justify-between border-b border-destructive/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/15 text-destructive font-bold">
                      <X className="h-4 w-4" />
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-forest-deep">
                      Traditional Direct Sowing
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-destructive uppercase">
                    High Risk
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-forest/60">GERMINATION & SURVIVAL</span>
                      <span className="font-bold text-destructive">50% - 70%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                      <div className="h-full bg-destructive/70 w-[60%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-forest/60">SEED WASTE RATE</span>
                      <span className="font-bold text-destructive">30% - 50% Waste</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                      <div className="h-full bg-destructive/70 w-[45%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-forest/60">ESTIMATED REVENUE ({calculatorAcres} ACRES)</span>
                      <span className="font-bold text-forest-deep">
                        ₹{totalRevenueDirect.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-destructive/20 bg-card p-4 font-sans text-xs text-forest/70">
                    High root mortality due to soil heat, uncontrolled damping-off fungal attacks, and heavy chemical runoff.
                  </div>
                </div>
              </div>

              {/* Card 2: Agaate Bio-Boosted Nursery */}
              <div className="rounded-3xl border border-forest/30 bg-emerald-50/40 p-8 text-left space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-forest/15 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-cream font-bold">
                      <Plant className="h-4 w-4" />
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-forest-deep">
                      Agaate Bio-Boosted Nursery
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-700 uppercase">
                    High Yield
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-forest/60">GERMINATION & SURVIVAL</span>
                      <span className="font-bold text-emerald-700">90% - 98% (+40% Boost)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                      <div className="h-full bg-emerald-600 w-[95%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-forest/60">SEED WASTE RATE</span>
                      <span className="font-bold text-emerald-700">Near Zero Waste</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                      <div className="h-full bg-emerald-600 w-[5%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-forest/60">ESTIMATED REVENUE ({calculatorAcres} ACRES)</span>
                      <span className="font-bold text-emerald-800">
                        ₹{totalRevenueBio.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-forest/20 bg-forest-deep p-4 font-sans text-xs text-cream space-y-1">
                    <span className="font-mono text-[10px] font-bold text-terracotta uppercase">
                      NET FARMER GAIN DELTA
                    </span>
                    <p className="text-xl font-bold font-serif text-cream">
                      +₹{totalNetGain.toLocaleString("en-IN")} Extra Net Profit
                    </p>
                    <p className="text-[11px] text-cream/70">
                      Includes +25% crop yield optimization and ₹{chemicalSavings.toLocaleString("en-IN")} input chemical savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Operational Impact Metrics Band */}
        <section className="relative overflow-hidden rounded-[3rem] bg-forest-deep px-6 py-20 text-cream md:px-16 md:py-24 shadow-2xl">
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            <span className="font-jet text-xs font-bold uppercase tracking-[0.2em] text-moss">
              QUANTIFIABLE SCALE & TRUST
            </span>
            <h2 className="font-serif text-4xl font-bold md:text-6xl text-cream">
              The Numbers Behind Agaate's Growth.
            </h2>
            <p className="text-base text-cream/80 max-w-xl mx-auto">
              Real results across Haryana and NCR region — building economic resilience for cultivators.
            </p>

            <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
              {IMPACT_STATS.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <CountUp
                    to={stat.to}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2}
                    className="block font-serif text-4xl font-bold tracking-tight text-cream md:text-5xl"
                  />
                  <span className="mt-2 block font-jet text-[10px] font-semibold uppercase tracking-wider text-cream/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Smart Advisor Recommendation Quiz */}
        <section id="advisor-quiz" className="scroll-mt-28">
          <div className="rounded-[2.5rem] border border-border bg-bone p-8 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-terracotta flex items-center gap-2">
                  <Sparkle className="h-4 w-4" /> SMART SERVICE ADVISOR
                </span>
                <h3 className="font-serif text-4xl font-bold text-forest-deep">
                  Find the Perfect Service Package for Your Farm.
                </h3>
                <p className="text-sm text-forest/75 leading-relaxed">
                  Answer 3 quick questions to receive a tailored Agaate integration path matching your farm size, crop focus, and primary risk factors.
                </p>
              </div>

              <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 md:p-8 min-h-[320px] flex flex-col justify-between shadow-sm">
                <AnimatePresence mode="wait">
                  {wizardStep === 0 && (
                    <motion.div key="w0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      <h4 className="font-serif text-2xl font-bold text-forest-deep">
                        Agaate AgTech Assessment
                      </h4>
                      <p className="text-xs text-forest/70">
                        Discover exact biological inputs, advisory packages, and buyback options designed for your specific land holding.
                      </p>
                      <button
                        onClick={() => setWizardStep(1)}
                        className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-6 py-3 font-semibold text-xs text-cream hover:bg-forest transition-colors cursor-pointer"
                      >
                        Start 1-Minute Quiz <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}

                  {wizardStep === 1 && (
                    <motion.div key="w1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <span className="font-mono text-[10px] font-bold uppercase text-terracotta">Step 1 of 3: Farm Size</span>
                      <h4 className="font-serif text-xl font-bold text-forest-deep">What is your total farm size?</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {["Small (1-3 Acres)", "Medium (4-15 Acres)", "Commercial (15+ Acres)"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleWizardSelect("acres", opt)}
                            className="rounded-xl border border-border bg-bone p-4 text-xs font-bold text-forest-deep hover:border-forest hover:bg-forest/5 text-left cursor-pointer transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 2 && (
                    <motion.div key="w2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <span className="font-mono text-[10px] font-bold uppercase text-terracotta">Step 2 of 3: Primary Crop</span>
                      <h4 className="font-serif text-xl font-bold text-forest-deep">What is your main vegetable crop?</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {["Watermelon", "Tomato", "Chilli", "Cauliflower / Other"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleWizardSelect("crop", opt)}
                            className="rounded-xl border border-border bg-bone p-4 text-xs font-bold text-forest-deep hover:border-forest hover:bg-forest/5 text-center cursor-pointer transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 3 && (
                    <motion.div key="w3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <span className="font-mono text-[10px] font-bold uppercase text-terracotta">Step 3 of 3: Top Priority</span>
                      <h4 className="font-serif text-xl font-bold text-forest-deep">What is your main farming goal?</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {["Cut Seedling Mortality", "Reduce Chemical & Water Costs", "Lock Mandi Buyback Prices"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleWizardSelect("priority", opt)}
                            className="rounded-xl border border-border bg-bone p-4 text-xs font-bold text-forest-deep hover:border-forest hover:bg-forest/5 text-left cursor-pointer transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 4 && (
                    <motion.div key="w4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase text-emerald-600">
                        <CheckCircle className="h-4 w-4" /> Recommendation Prepared
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-forest-deep">
                        Recommended Package: Bio-Boosted Nursery + Market Linkage
                      </h4>
                      <p className="text-xs text-forest/75 leading-relaxed">
                        Based on your response ({wizardAnswers.acres}, {wizardAnswers.crop}), we recommend reserving containerized seedlings from our Pachgaon nursery combined with Handpick direct buyback pricing.
                      </p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Link
                          to={getLocalizedPath("/free-farm-consultation", currentLang) as never}
                          className="rounded-full bg-forest-deep px-6 py-3 font-semibold text-xs text-cream hover:bg-forest transition-colors shadow-md"
                        >
                          Book Free Consultation
                        </Link>
                        <button
                          onClick={() => {
                            setWizardStep(0);
                            setWizardAnswers({ acres: "", crop: "", priority: "" });
                          }}
                          className="rounded-full border border-border px-6 py-3 font-semibold text-xs text-forest hover:bg-bone transition-colors cursor-pointer"
                        >
                          Restart Quiz
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: High Converting Final CTA */}
        <section id="cta" className="scroll-mt-28">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-forest-deep via-forest to-forest-deep p-10 md:p-16 text-center text-cream shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="font-jet text-xs font-bold uppercase tracking-[0.2em] text-moss">
                START YOUR JOURNEY TODAY
              </span>
              <h2 className="font-serif text-4xl font-bold md:text-6xl text-cream">
                Transform Your Harvest with Agaate.
              </h2>
              <p className="text-base text-cream/80 max-w-xl mx-auto leading-relaxed">
                Join 2,000+ Parivaar farmers getting higher survival, lower input costs, and guaranteed market returns.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <MagneticButton
                  as="a"
                  href={getLocalizedPath("/free-farm-consultation", currentLang)}
                  strength={0.35}
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 font-bold text-sm text-cream shadow-xl hover:bg-terracotta/90 transition-colors">
                    Book Free Consultation <ArrowRight className="h-4 w-4" />
                  </span>
                </MagneticButton>

                <a
                  href="tel:9487263498"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-8 py-4 font-bold text-sm text-cream hover:bg-cream/20 transition-colors"
                >
                  <PhoneCall className="h-4 w-4" /> Call 9487263498
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default ServicesOverview;
