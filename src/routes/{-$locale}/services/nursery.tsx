import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sprout,
  CheckCircle2,
  ShieldCheck,
  Search,
  Calendar,
  Layers,
  Thermometer,
  Droplets,
  Cpu,
  Truck,
  MapPin,
  Sparkles,
  ArrowRight,
  PhoneCall,
  X,
  FileCheck,
  Activity,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AnimatedHeadline,
  CountUp,
  EASE,
  MagneticButton,
  Marquee,
  PageHero,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/components/common/motion";
import { getLocalizedPath } from "@/lib/i18n";
import { useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/services/nursery")({
  component: SmartNurseryPage,
});

type CropOption = "Watermelon" | "Chilli" | "Tomato" | "Cauliflower" | "Cucumber";

type CropDetail = {
  plugsPerAcre: number;
  pricePerPlug: number;
  description: string;
  season: string;
  germinationDays: number;
  survivalRate: string;
};

const CROP_DATA: Record<CropOption, CropDetail> = {
  Watermelon: {
    plugsPerAcre: 3500,
    pricePerPlug: 4.5,
    description: "Vigorously grafted hybrid watermelon plugs with deep root penetration and high sugar content development.",
    season: "Jan - Mar (Spring Sowing)",
    germinationDays: 14,
    survivalRate: "96%",
  },
  Chilli: {
    plugsPerAcre: 12000,
    pricePerPlug: 2.2,
    description: "Pungent & export-grade chilli saplings fortified with Biocure F to resist leaf curl virus and damping off.",
    season: "Feb - Jun & Oct - Nov",
    germinationDays: 18,
    survivalRate: "94%",
  },
  Tomato: {
    plugsPerAcre: 10000,
    pricePerPlug: 2.5,
    description: "Determinate and indeterminate high-yield hybrids with sturdy stems for vertical bamboo staking.",
    season: "Year-Round Cycles",
    germinationDays: 15,
    survivalRate: "98%",
  },
  Cauliflower: {
    plugsPerAcre: 14000,
    pricePerPlug: 1.8,
    description: "Compact curd varieties conditioned for uniform head development and thermal stress tolerance.",
    season: "Jul - Nov (Autum/Winter)",
    germinationDays: 12,
    survivalRate: "95%",
  },
  Cucumber: {
    plugsPerAcre: 7000,
    pricePerPlug: 3.2,
    description: "Parthenocarpic polyhouse cucumber seedlings producing early crisp fruit without pollinator reliance.",
    season: "Year-Round Polyhouse",
    germinationDays: 10,
    survivalRate: "97%",
  },
};

type BatchInfo = {
  id: string;
  crop: string;
  variety: string;
  origin: string;
  germinationDate: string;
  bioBoostLog: string;
  chamberTemp: string;
  humidity: string;
  rootScore: string;
  status: string;
  dispatchWindow: string;
};

const MOCK_BATCHES: Record<string, BatchInfo> = {
  "AG-2026-N8": {
    id: "AG-2026-N8",
    crop: "Tomato Hybrid",
    variety: "Syngenta Abhinav F1",
    origin: "Certified Seed Lot #9921",
    germinationDate: "2026-08-01",
    bioBoostLog: "VAM Inoculated + Biocure F Applied",
    chamberTemp: "26.4 °C",
    humidity: "82% Ambient",
    rootScore: "9.8 / 10 (High Vigor)",
    status: "Hardening Phase (Ready in 3 days)",
    dispatchWindow: "Aug 12 - Aug 15",
  },
  "AG-2026-W4": {
    id: "AG-2026-W4",
    crop: "Watermelon Hybrid",
    variety: "Maxx Seed Black Boy",
    origin: "Imported Certified Lot #8810",
    germinationDate: "2026-07-28",
    bioBoostLog: "Trichoderma + Mycorrhiza Inoculated",
    chamberTemp: "28.1 °C",
    humidity: "78% Ambient",
    rootScore: "9.6 / 10 (Dense Taproot)",
    status: "Quality Certified (Ready for Dispatch)",
    dispatchWindow: "Immediate Dispatch Available",
  },
  "AG-2026-C2": {
    id: "AG-2026-C2",
    crop: "Chilli Pungent",
    variety: "Seminis VN-235",
    origin: "Certified Seed Lot #4412",
    germinationDate: "2026-08-04",
    bioBoostLog: "Biocure B + Bio Nimaton Protection",
    chamberTemp: "25.8 °C",
    humidity: "85% Ambient",
    rootScore: "9.2 / 10 (Emerging Primary Roots)",
    status: "Chamber Growth Stage (7 Days Left)",
    dispatchWindow: "Aug 18 - Aug 20",
  },
  "AG-2026-T1": {
    id: "AG-2026-T1",
    crop: "Cauliflower Snowball",
    variety: "Advanta Golden Curl",
    origin: "Certified Seed Lot #1032",
    germinationDate: "2026-08-02",
    bioBoostLog: "VAM Inoculated",
    chamberTemp: "24.9 °C",
    humidity: "80% Ambient",
    rootScore: "9.5 / 10 (Strong Plug)",
    status: "Hardening Phase",
    dispatchWindow: "Aug 14 - Aug 16",
  },
};

const PHASES = [
  {
    phase: "01",
    title: "Research & Varietal Trials",
    desc: "Rigorous testing of hybrid seeds against local Haryana microclimates, soil pH, and common disease vectors before mass propagation.",
    icon: Sparkles,
    details: ["In-house demo plots in Pachgaon", "Genetic purity verification", "Heat & drought resistance screening"],
  },
  {
    phase: "02",
    title: "Climate-Controlled Cultivation",
    desc: "Sowing in sterile coco-peat plug trays inside 17 acres of AI-monitored climate chambers for uniform emergence.",
    icon: Thermometer,
    details: ["Automated fogging & misting", "Optimum 25-28°C chamber control", "Zero soil-borne contamination"],
  },
  {
    phase: "03",
    title: "Bio-Boost Inoculation & AI Testing",
    desc: "Treating root systems with beneficial biologicals (Biocure F & VAM) to ensure zero root shock upon field transplanting.",
    icon: Cpu,
    details: ["Dense mycorrhizal root colonization", "Optical sensor root grading", "Certified disease-free tag"],
  },
  {
    phase: "04",
    title: "Hardening & Temperature Logistics",
    desc: "Controlled sun exposure hardening before loading into temperature-shielded transport directly to farm gate.",
    icon: Truck,
    details: ["UV hardening protocol", "Doorstep field delivery", "Transplant SOP guide provided"],
  },
];

const FAQS = [
  {
    q: "Why are containerized plug seedlings better than direct field sowing?",
    a: "Direct seed sowing suffers 30-50% mortality from soil heat, heavy rain, and fungal damping-off. Agaate containerized plug seedlings are germinated in a sterile 17-acre climate facility with established root systems, giving 90-98% field survival and saving seed costs.",
  },
  {
    q: "Where is the Agaate Smart Nursery facility located?",
    a: "Our flagship 17-acre smart nursery is located at NH8, opposite Bikanervala, Kukrola / Pachgaon, Gurugram, Haryana (Plus Code: 8WG2+QR6). Farmers are welcome to visit our live demo plots.",
  },
  {
    q: "How far in advance should I pre-order seedling trays?",
    a: "We recommend pre-ordering 15 to 25 days before your intended field planting date. This allows us to germinate your requested hybrid variety and bio-boost the root systems specifically for your delivery date.",
  },
  {
    q: "What happens if saplings get damaged during transit?",
    a: "Agaate provides a 100% Transit Guarantee. If any plug tray suffers damage during doorstep delivery, our local Kisan Sathi representative provides immediate free replacement trays.",
  },
];

function SmartNurseryPage() {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? "en";

  // Calculator state
  const [selectedCrop, setSelectedCrop] = useState<CropOption>("Tomato");
  const [acres, setAcres] = useState<number>(3);
  const [selectedSlot, setSelectedSlot] = useState<string>("Aug 15 - Aug 20 (Immediate)");

  // Pre-order modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [farmerTehsil, setFarmerTehsil] = useState("");

  // Traceability state
  const [searchBatchId, setSearchBatchId] = useState("AG-2026-N8");
  const [activeBatch, setActiveBatch] = useState<BatchInfo | null>(MOCK_BATCHES["AG-2026-N8"]);
  const [searchError, setSearchError] = useState(false);

  // Active Phase state
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const cropDetail = CROP_DATA[selectedCrop];
  const totalSeedlings = cropDetail.plugsPerAcre * acres;
  const estimatedCost = totalSeedlings * cropDetail.pricePerPlug;
  const seedWasteSavedRatio = 0.4; // 40% seed waste avoided
  const estimatedSavings = Math.round(estimatedCost * seedWasteSavedRatio);

  const handleBatchSearch = (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase();
    if (MOCK_BATCHES[cleanId]) {
      setActiveBatch(MOCK_BATCHES[cleanId]);
      setSearchError(false);
    } else {
      setActiveBatch(null);
      setSearchError(true);
    }
  };

  const handlePreOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitted(true);
    setTimeout(() => {
      setModalSubmitted(false);
      setIsModalOpen(false);
      setFarmerName("");
      setFarmerPhone("");
      setFarmerTehsil("");
    }, 3500);
  };

  return (
    <main className="min-h-screen flex flex-col bg-cream font-sans text-ink antialiased">
      <Header />

      {/* Hero Section */}
      <PageHero
        eyebrow="FLAGSHIP FACILITY · PACHGAON, GURUGRAM"
        title={
          <>
            17-Acre Smart Nursery. <br />
            <span className="italic text-terracotta">Bio-Boosted Seedlings.</span>
          </>
        }
        description="Replace risky direct seed sowing with sterile, containerized plug saplings. Raised in AI climate-controlled chambers for 90–98% transplant survival."
      >
        {/* Live Hero Stats Grid */}
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { to: 17, suffix: " Acres", label: "Smart Nursery Campus" },
            { to: 98, suffix: "%", label: "Germination Guarantee" },
            { to: 40, prefix: "+", suffix: "%", label: "Survival vs Direct Sowing" },
            { to: 500, suffix: "+", label: "Acres Delivered" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-full border border-forest/15 bg-card/90 px-5 py-3 shadow-sm backdrop-blur"
            >
              <Sprout className="h-4 w-4 shrink-0 text-moss" />
              <div>
                <span className="font-serif text-xl font-bold leading-none text-forest-deep">
                  <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} duration={2} />
                </span>
                <span className="ml-2 font-jet text-[9px] font-bold uppercase tracking-wider text-forest/60">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton onClick={() => setIsModalOpen(true)} strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-7 py-3.5 font-bold text-sm text-cream shadow-xl hover:bg-forest transition-colors cursor-pointer">
              Pre-Order Seedling Trays <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>

          <MagneticButton as="a" href="#calculator" strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-card px-7 py-3.5 font-bold text-sm text-forest-deep shadow-sm hover:bg-cream">
              Calculate Seedling Count
            </span>
          </MagneticButton>
        </div>
      </PageHero>

      {/* Marquee Strip */}
      <div className="border-b border-border bg-card/70 py-4 overflow-hidden">
        <Marquee duration={35}>
          {[
            "Pachgaon/Kukrola Gurugram Campus",
            "Biocure F Root Protection",
            "VAM Mycorrhizal Inoculation",
            "Zero Root Shock Guarantee",
            "AI Climate Telemetry",
            "Certified Seed Origins",
            "100% Transit Protection",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-3 font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-forest/70"
            >
              <span>{item}</span>
              <Sparkles className="h-3.5 w-3.5 text-terracotta" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        {/* Section 1: 4-Phase Seedless Farming Lifecycle */}
        <section id="lifecycle" className="scroll-mt-28">
          <SectionHeader
            align="center"
            eyebrow="SCIENTIFIC PROPAGATION CYCLE"
            title="4-Phase Seedless Farming Lifecycle."
            description="From varietal trial research to door-step field delivery — every plug tray is scientifically engineered."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PHASES.map((ph, idx) => {
              const PhaseIcon = ph.icon;
              const isActive = activePhaseIndex === idx;
              return (
                <div
                  key={ph.phase}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-8 transition-all duration-300 ${
                    isActive
                      ? "border-forest bg-forest-deep text-cream shadow-xl"
                      : "border-border bg-card text-forest-deep hover:border-forest/40 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? "text-terracotta" : "text-forest/40"
                      }`}
                    >
                      PHASE {ph.phase}
                    </span>
                    <PhaseIcon
                      className={`h-6 w-6 ${isActive ? "text-cream" : "text-moss"}`}
                    />
                  </div>

                  <h3 className="font-serif text-2xl font-bold mb-3">{ph.title}</h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      isActive ? "text-cream/80" : "text-forest/70"
                    }`}
                  >
                    {ph.desc}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-border/40 pt-4 font-sans text-[11px]">
                    {ph.details.map((dt) => (
                      <li key={dt} className="flex items-center gap-2">
                        <CheckCircle2
                          className={`h-3.5 w-3.5 shrink-0 ${
                            isActive ? "text-terracotta" : "text-emerald-600"
                          }`}
                        />
                        <span>{dt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Smart Nursery Feature Grid */}
        <section id="smart-nursery-infra" className="scroll-mt-28">
          <div className="rounded-[3rem] bg-forest-deep p-8 md:p-14 text-cream shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="font-jet text-xs font-bold uppercase tracking-[0.2em] text-moss">
                INFRASTRUCTURE & TECH
              </span>
              <h2 className="font-serif text-4xl font-bold md:text-5xl text-cream mt-2">
                Seedless Farming Under Controlled Skies.
              </h2>
              <p className="mt-4 text-cream/80 max-w-2xl text-base leading-relaxed">
                Operating across 17 acres in Kukrola/Pachgaon, Gurugram. Every chamber utilizes sensor arrays monitoring temperature, humidity, and biological inoculation.
              </p>

              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "AI Climate Telemetry",
                    desc: "Automated optical and thermal sensors maintaining 25-28°C ambient temperature for fast root development.",
                    icon: Cpu,
                  },
                  {
                    title: "Disease-Free Chambers",
                    desc: "Strict biosecurity protocols and sterile plug tray soil mix eliminating damping-off fungal threats.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Bio-Boost Root Inoculation",
                    desc: "Inoculated with Biocure F & VAM mycorrhiza for 3x root surface area expansion and zero transplant shock.",
                    icon: Sprout,
                  },
                  {
                    title: "Certified Seed Provenance",
                    desc: "100% genuine hybrid seeds sourced directly from top-tier research seed partners.",
                    icon: FileCheck,
                  },
                  {
                    title: "Standardized SOPs",
                    desc: "Rigorous daily agronomy logs tracking tray EC levels, pH metrics, and stem diameter index.",
                    icon: Layers,
                  },
                  {
                    title: "Doorstep Field Logistics",
                    desc: "Temperature-shielded transport trucks delivering pristine plug trays straight to your field edge.",
                    icon: Truck,
                  },
                ].map((item) => {
                  const FIcon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-cream/15 bg-cream/5 p-6 backdrop-blur-sm transition-all hover:bg-cream/10"
                    >
                      <FIcon className="h-6 w-6 text-moss mb-4" />
                      <h4 className="font-serif text-xl font-bold text-cream mb-2">{item.title}</h4>
                      <p className="text-xs text-cream/70 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-5 py-2.5 font-jet text-xs font-bold text-cream/90">
                <MapPin className="h-4 w-4 text-moss" />
                NH8, Opposite Bikanervala, Kukrola, Gurugram, Haryana 122413 (Plus Code: 8WG2+QR6)
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Seedling Pre-Order Calculator & Seasonal Booking Selector */}
        <section id="calculator" className="scroll-mt-28">
          <SectionHeader
            align="center"
            eyebrow="INTERACTIVE SEEDLING PLANNER"
            title="Calculate Seedlings & Pre-Order Trays."
            description="Select your vegetable crop and cultivated acreage to calculate exact plug requirements, costs, and seed savings."
          />

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Left Side: Crop Selection & Specs */}
            <div className="lg:col-span-6 space-y-8 rounded-[2.5rem] border border-border bg-bone p-8 md:p-10">
              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-forest/60 mb-3">
                  1. Select Vegetable Crop Variety:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(Object.keys(CROP_DATA) as CropOption[]).map((cr) => {
                    const isActive = selectedCrop === cr;
                    return (
                      <button
                        key={cr}
                        onClick={() => setSelectedCrop(cr)}
                        className={`rounded-2xl px-4 py-3 font-mono text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-forest-deep text-cream shadow-md"
                            : "border border-border bg-card text-forest-deep hover:border-forest/40"
                        }`}
                      >
                        {cr}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Crop Specification Card */}
              <div className="rounded-3xl border border-forest/15 bg-card p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="font-serif text-2xl font-bold text-forest-deep">
                    {selectedCrop} Plugs
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs font-bold text-emerald-700">
                    {cropDetail.survivalRate} Survival Rate
                  </span>
                </div>
                <p className="text-xs text-forest/75 leading-relaxed">{cropDetail.description}</p>
                <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
                  <div>
                    <span className="block text-forest/50">RECOMMENDED DENSITY</span>
                    <span className="font-bold text-forest-deep">
                      {cropDetail.plugsPerAcre.toLocaleString("en-IN")} Plugs / Acre
                    </span>
                  </div>
                  <div>
                    <span className="block text-forest/50">SOWING WINDOW</span>
                    <span className="font-bold text-forest-deep">{cropDetail.season}</span>
                  </div>
                </div>
              </div>

              {/* Acreage Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline font-mono text-xs font-bold">
                  <span className="text-forest/60">2. SELECT TOTAL ACREAGE:</span>
                  <span className="rounded-md bg-forest/10 px-3 py-1 text-forest-deep font-serif text-lg">
                    {acres} Acres
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={acres}
                  onChange={(e) => setAcres(Number(e.target.value))}
                  className="w-full accent-forest cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] text-forest/40">
                  <span>1 Acre</span>
                  <span>25 Acres</span>
                  <span>50 Acres</span>
                </div>
              </div>
            </div>

            {/* Right Side: Dynamic Calculations & Booking Slot */}
            <div className="lg:col-span-6 rounded-[2.5rem] border border-border bg-card p-8 md:p-10 space-y-8 shadow-sm">
              <h3 className="font-serif text-3xl font-bold text-forest-deep">
                Tray Order Breakdown
              </h3>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="rounded-2xl border border-border bg-bone p-4">
                  <span className="block text-forest/50">TOTAL SEEDLINGS</span>
                  <span className="block font-serif text-2xl font-bold text-forest-deep mt-1">
                    {totalSeedlings.toLocaleString("en-IN")} Plugs
                  </span>
                </div>

                <div className="rounded-2xl border border-border bg-bone p-4">
                  <span className="block text-forest/50">ESTIMATED COST</span>
                  <span className="block font-serif text-2xl font-bold text-terracotta mt-1">
                    ₹{estimatedCost.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 font-mono text-xs text-emerald-900 space-y-1">
                <span className="font-bold text-[10px] uppercase text-emerald-700">
                  ESTIMATED SEED WASTE SAVINGS
                </span>
                <p className="font-serif text-xl font-bold">
                  ~₹{estimatedSavings.toLocaleString("en-IN")} Saved vs Direct Seed Mortality
                </p>
              </div>

              {/* Delivery Slots Selector */}
              <div className="space-y-3">
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-forest/60">
                  3. Select Delivery Slot:
                </label>
                <div className="space-y-2">
                  {[
                    "Aug 15 - Aug 20 (Immediate Available)",
                    "Sep 01 - Sep 07 (Pre-Monsoon Cycle)",
                    "Sep 15 - Sep 22 (Autumn Sowing)",
                  ].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full rounded-xl border p-3.5 text-left font-mono text-xs font-bold transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? "border-forest bg-forest-deep text-cream"
                          : "border-border bg-bone text-forest-deep hover:border-forest/40"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full rounded-2xl bg-terracotta py-4 font-bold text-sm text-cream shadow-xl hover:bg-terracotta/90 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Reserve Seedlings</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive Seedling Batch Traceability Serial Search Simulator */}
        <section id="traceability" className="scroll-mt-28">
          <SectionHeader
            align="center"
            eyebrow="DATA TRANSPARENCY & TRACEABILITY"
            title="Batch Serial Traceability Search."
            description="Type or select a batch serial number below to inspect real-time chamber telemetry, seed origin, and bio-boost logs."
          />

          <div className="mt-12 rounded-[2.5rem] border border-border bg-card p-8 md:p-12 shadow-sm space-y-8">
            {/* Search Bar & Quick Preset Buttons */}
            <div className="max-w-2xl mx-auto space-y-4 text-center">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-bone p-2">
                <Search className="h-5 w-5 text-forest/50 ml-3" />
                <input
                  type="text"
                  value={searchBatchId}
                  onChange={(e) => setSearchBatchId(e.target.value)}
                  placeholder="Enter Batch ID (e.g. AG-2026-N8)"
                  className="w-full bg-transparent font-mono text-sm font-bold text-forest-deep focus:outline-none"
                />
                <button
                  onClick={() => handleBatchSearch(searchBatchId)}
                  className="rounded-xl bg-forest-deep px-5 py-2.5 font-mono text-xs font-bold text-cream hover:bg-forest transition-colors cursor-pointer"
                >
                  Search Batch
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
                <span className="text-forest/50">Quick Sample Batches:</span>
                {Object.keys(MOCK_BATCHES).map((bId) => (
                  <button
                    key={bId}
                    onClick={() => {
                      setSearchBatchId(bId);
                      handleBatchSearch(bId);
                    }}
                    className="rounded-lg border border-border bg-bone px-3 py-1 font-bold text-forest hover:border-forest hover:bg-cream cursor-pointer transition-colors"
                  >
                    {bId}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Display Panel */}
            <AnimatePresence mode="wait">
              {searchError ? (
                <motion.div
                  key="err"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-destructive/20 bg-red-50 p-8 text-center text-xs font-mono text-destructive"
                >
                  Batch ID not found. Try searching preset samples: AG-2026-N8, AG-2026-W4, AG-2026-C2.
                </motion.div>
              ) : activeBatch ? (
                <motion.div
                  key={activeBatch.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="rounded-3xl border border-forest/20 bg-bone p-6 md:p-8 space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-terracotta uppercase">
                        BATCH TRACEABILITY REPORT
                      </span>
                      <h4 className="font-serif text-3xl font-bold text-forest-deep">
                        Batch {activeBatch.id} — {activeBatch.crop}
                      </h4>
                    </div>

                    <span className="rounded-full bg-emerald-100 px-4 py-1.5 font-mono text-xs font-bold text-emerald-800 flex items-center gap-2">
                      <Activity className="h-4 w-4 animate-pulse" /> {activeBatch.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                    <div className="rounded-2xl border border-border bg-card p-4">
                      <span className="block text-forest/50 text-[10px]">SEED PROVENANCE</span>
                      <span className="block font-bold text-forest-deep mt-1">{activeBatch.variety}</span>
                      <span className="block text-[10px] text-forest/60 mt-0.5">{activeBatch.origin}</span>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4">
                      <span className="block text-forest/50 text-[10px]">BIO-BOOST LOG</span>
                      <span className="block font-bold text-emerald-700 mt-1">{activeBatch.bioBoostLog}</span>
                      <span className="block text-[10px] text-forest/60 mt-0.5">Mycorrhizal Colonized</span>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4">
                      <span className="block text-forest/50 text-[10px]">CHAMBER TELEMETRY</span>
                      <span className="block font-bold text-forest-deep mt-1">{activeBatch.chamberTemp}</span>
                      <span className="block text-[10px] text-forest/60 mt-0.5">{activeBatch.humidity}</span>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4">
                      <span className="block text-forest/50 text-[10px]">ROOT VIGOR INDEX</span>
                      <span className="block font-bold text-terracotta mt-1">{activeBatch.rootScore}</span>
                      <span className="block text-[10px] text-forest/60 mt-0.5">Dispatch: {activeBatch.dispatchWindow}</span>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </section>

        {/* Section 5: FAQs */}
        <section id="faq" className="scroll-mt-28">
          <SectionHeader
            align="center"
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title="Nursery & Pre-Order Guidance."
          />

          <div className="mt-12 max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-border bg-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-serif text-xl font-bold text-forest-deep cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-forest/60 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 text-xs leading-relaxed text-forest/80 border-t border-border/50 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 6: Final CTA */}
        <section id="nursery-cta" className="scroll-mt-28">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-forest-deep via-forest to-forest-deep p-10 md:p-16 text-center text-cream shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="font-jet text-xs font-bold uppercase tracking-[0.2em] text-moss">
                17-ACRE PACHGAON CAMPUS
              </span>
              <h2 className="font-serif text-4xl font-bold md:text-6xl text-cream">
                Reserve Your Bio-Boosted Seedling Trays.
              </h2>
              <p className="text-base text-cream/80 max-w-xl mx-auto leading-relaxed">
                Ensure 90-98% transplant survival on your acreage. Visit our Pachgaon nursery or book your batch online.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <MagneticButton onClick={() => setIsModalOpen(true)} strength={0.35}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 font-bold text-sm text-cream shadow-xl hover:bg-terracotta/90 transition-colors cursor-pointer">
                    Book Seedling Trays Now <ArrowRight className="h-4 w-4" />
                  </span>
                </MagneticButton>

                <a
                  href="tel:8350085005"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-8 py-4 font-bold text-sm text-cream hover:bg-cream/20 transition-colors"
                >
                  <PhoneCall className="h-4 w-4" /> Call Nursery Helpline: 8350085005
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Pre-Order Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-2xl space-y-6 text-left"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-forest/40 hover:text-forest cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {modalSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8 animate-bounce" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-forest-deep">
                    Seedling Reservation Confirmed!
                  </h4>
                  <p className="text-xs text-forest/70 max-w-xs mx-auto">
                    We have reserved your {selectedCrop} plug trays for {acres} Acres. Our agronomy coordinator will call {farmerPhone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePreOrderSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold text-terracotta uppercase">
                      PRE-ORDER RESERVATION
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-forest-deep">
                      Book {selectedCrop} Seedlings
                    </h4>
                    <p className="text-xs text-forest/60">
                      {totalSeedlings.toLocaleString("en-IN")} Plugs for {acres} Acres (Est. ₹{estimatedCost.toLocaleString("en-IN")})
                    </p>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <label className="block text-forest/60 mb-1">Full Name:</label>
                      <input
                        type="text"
                        required
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:outline-none focus:border-forest"
                      />
                    </div>

                    <div>
                      <label className="block text-forest/60 mb-1">Mobile Number (WhatsApp):</label>
                      <input
                        type="tel"
                        required
                        value={farmerPhone}
                        onChange={(e) => setFarmerPhone(e.target.value)}
                        placeholder="e.g. 9812345678"
                        className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:outline-none focus:border-forest"
                      />
                    </div>

                    <div>
                      <label className="block text-forest/60 mb-1">Tehsil / District (Haryana/NCR):</label>
                      <input
                        type="text"
                        required
                        value={farmerTehsil}
                        onChange={(e) => setFarmerTehsil(e.target.value)}
                        placeholder="e.g. Bilaspur / Gurugram"
                        className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:outline-none focus:border-forest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-forest-deep py-3.5 font-bold text-xs text-cream hover:bg-forest transition-colors cursor-pointer mt-4"
                  >
                    Confirm Pre-Order Reservation
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default SmartNurseryPage;
