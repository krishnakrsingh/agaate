import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowClockwise,
  Brain,
  CaretRight,
  CellTower,
  CheckCircle,
  Compass,
  Cpu,
  DeviceMobile,
  Drone,
  Drop,
  FileText,
  Gauge,
  Info,
  Layout,
  Leaf,
  Lightning,
  Phone,
  Plant,
  Play,
  Pulse,
  Scan,
  ShieldCheck,
  Sparkle,
  Thermometer,
  Warning,
  WifiHigh
} from "@phosphor-icons/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
import { FieldNetworkSection } from "@/components/farm-tech/FieldNetwork";
import { TelemetryPoint } from "@/types";

export const Route = createFileRoute("/{-$locale}/services/farm-tech")({
  component: FarmTech,
});

const TICKER = [
  "Live Telemetry Stream: Soil Moisture 38%",
  "EC 1.82 mS/cm",
  "Soil Temp 28.4°C",
  "NDVI Index 0.74",
  "Node Battery 92%",
  "LoRa Mesh Signal -42 dBm",
  "17-Acre Nursery Telemetry Active",
  "Drone Fleet Standby",
  "Automated Fertigation Valve Loop Ready",
];

const MODULES = [
  {
    id: "sensors",
    icon: CellTower,
    tag: "Sensors",
    name: "IoT Soil & Weather Sensors",
    subtitle: "Continuous subterranean telemetry & atmospheric micro-climate tracking",
    text: "Live moisture, temperature & nutrient data with real-time field-level weather tracking using LoRa mesh nodes.",
    points: [
      "Subsoil Moisture, EC & temperature probes",
      "Field-level micro-weather & wind stations",
      "LoRa mesh array, 3km range, zero cellular dependency",
    ],
  },
  {
    id: "drones",
    icon: Drone,
    tag: "Drones",
    name: "Drone Scouting & Spraying",
    subtitle: "Multispectral aerial imaging & calibrated micro-droplet application",
    text: "Aerial crop scouting from above with targeted, ultra-uniform precision spraying across stress zones.",
    points: [
      "NDVI aerial crop scouting & canopy index",
      "Targeted precision spray passes",
      "Ultra-uniform coverage, zero chemical waste",
    ],
  },
  {
    id: "ai",
    icon: Scan,
    tag: "AI Detection",
    name: "AI Crop Health Photo Detection",
    subtitle: "Computer-vision leaf disease diagnostic neural models",
    text: "Spot disease & pests early from a smartphone photo — get instant, crop-specific advice and precise dosages.",
    points: [
      "DeviceMobile photo issue detection in seconds",
      "Crop-specific protection protocols",
      "Early action before disease spreads",
    ],
  },
  {
    id: "drip",
    icon: Drop,
    tag: "Fertigation",
    name: "Automated Drip & Fertigation",
    subtitle: "Stage-wise hydraulic nutrient dosing & automated valve schedules",
    text: "Water & nutrients applied strictly on schedule — right dose, right stage, every time with zero leaching.",
    points: [
      "Schedule-driven automated irrigation",
      "Soil report-backed stage-wise nutrition",
      "Prevents root asphyxiation & under-dosing",
    ],
  },
  {
    id: "app",
    icon: Layout,
    tag: "Mobile App",
    name: "Farm Management Mobile App",
    subtitle: "Centralized operational command center in your pocket",
    text: "All plots, growth stages & inputs tracked in one centralized app — alerts, logs & planning tools.",
    points: [
      "Plots & growth stages mapped in one view",
      "Automated WhatsApp alerts & activity logs",
      "Phased financial & ROI planning tools",
    ],
  },
  {
    id: "advisory",
    icon: Brain,
    tag: "Advisory",
    name: "Data-Driven Advisory",
    subtitle: "Agronomic recommendations generated directly from live field telemetry",
    text: "Custom agronomic recommendations generated directly from your farm's live data for higher yields.",
    points: [
      "Tailored recommendations from live telemetry",
      "Export-grade produce quality consistency",
      "Lower risk, higher profit margins",
    ],
  },
];

const AI_DIAGNOSES = [
  {
    id: "downy",
    crop: "Watermelon",
    disease: "Downy Mildew (Pseudoperonospora cubensis)",
    photoName: "Watermelon Leaf Sample #W-402",
    photoUrl: "https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=600&auto=format&fit=crop",
    severity: "High Risk",
    confidence: 98.6,
    symptoms: "Angular chlorotic leaf lesions with purplish-gray sporulation on leaf underside.",
    rootCause: "High leaf wetness duration combined with night humidity spikes above 88%.",
    recommendation: {
      primaryProduct: "Biocure F (Trichoderma Viride)",
      primaryDose: "2.5 kg / acre foliar spray in 200L water",
      secondaryProduct: "Plantex Botanical Leaf Extract",
      secondaryDose: "1.0 L / acre spray after 48 hours",
      culturalAdvice: "Suspend evening overhead sprinkler passes; maintain central line 1 ft drip aeration.",
    },
  },
  {
    id: "curl",
    crop: "Chili",
    disease: "Chili Leaf Curl Virus (ChiLCV)",
    photoName: "Chili Shoot Sample #C-108",
    photoUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop",
    severity: "Critical Alert",
    confidence: 96.4,
    symptoms: "Upward curling of leaves, puckering, vein clearing, and stunted plant canopy growth.",
    rootCause: "Bemisia tabaci (Whitefly) vector population feeding on young tender flush.",
    recommendation: {
      primaryProduct: "Bio Nimaton (Neem 10,000 PPM)",
      primaryDose: "1.5 L / acre foliar spray in early evening",
      secondaryProduct: "Stanes Symbion Vam Plus",
      secondaryDose: "4.0 kg / acre drench to rebuild vascular root uptake",
      culturalAdvice: "Install yellow sticky traps (25 per acre); rogue out severely stunted plants.",
    },
  },
  {
    id: "nitrogen",
    crop: "Tomato",
    disease: "Nitrogen & Iron Chlorosis Deficiency",
    photoName: "Tomato Canopy Sample #T-309",
    photoUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a85?q=80&w=600&auto=format&fit=crop",
    severity: "Nutrient Deficit",
    confidence: 99.1,
    symptoms: "General yellowing of older lower leaves progressing to pale green upper canopy growth.",
    rootCause: "Low soil EC (1.1 mS/cm) and rapid nitrogen leaching following heavy drip flush.",
    recommendation: {
      primaryProduct: "Biovita Seaweed Extract Booster",
      primaryDose: "500 ml / acre foliar application",
      secondaryProduct: "Soluble Organic NPK fertigation dose",
      secondaryDose: "5.0 kg / acre via drip line loop",
      culturalAdvice: "Adjust fertigation loop frequency from 45 mins to 20 mins split intervals.",
    },
  },
  {
    id: "blight",
    crop: "Cucumber / Solanaceous",
    disease: "Early Blight (Alternaria solani)",
    photoName: "Cucumber Leaf Sample #K-201",
    photoUrl: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=600&auto=format&fit=crop",
    severity: "Moderate Alert",
    confidence: 97.4,
    symptoms: "Concentric ring target spots on foliage surrounded by narrow yellow halos.",
    rootCause: "Soil splash vector inoculation following surface mud splashing on lower leaves.",
    recommendation: {
      primaryProduct: "Biocure F + Biocure B Dual Mix",
      primaryDose: "2.0 kg Biocure F + 1.5 kg Biocure B per acre",
      secondaryProduct: "Silver-Black Mulching Film (25 Micron)",
      secondaryDose: "Cover soil beds to block fungal spore soil splash",
      culturalAdvice: "Prune lower 10 cm foliage touching soil layer; apply mulching film.",
    },
  },
];

const CYCLE = [
  { icon: Plant, label: "Data-Driven Sowing", detail: "Calibrated seed rate & soil moisture testing" },
  { icon: Leaf, label: "Bio-Boosted Nursery", detail: "Root-fungus pre-inoculated seedling plugs" },
  { icon: Drop, label: "Stage-Wise Fertigation", detail: "Soil-report matched NPK & micro-dosing" },
  { icon: ShieldCheck, label: "Preventive Care", detail: "Weather-based bio-input spray alerts" },
  { icon: Plant, label: "Timely Harvest", detail: "Peak Brix sweetness & market linkage" },
];

const STATS = [
  { to: 17, suffix: " Acres", label: "Controlled smart nursery infrastructure at Kukrola, Gurugram" },
  { to: 1000, suffix: "+", label: "Registered farmers accessing live field telemetry & advisory" },
  { to: 5, suffix: " Days", label: "Earlier catch — flagging stress before visual wilting occurs" },
  { to: 24, suffix: "/7", label: "Real-time field visibility & automated alert protection" },
];

const nodesList = [
  { label: "Node-04 (West Block)", status: "Active", battery: "92%", ec: 1.82, temp: 28.4, ndvi: 0.74 },
  { label: "Node-07 (North Nursery)", status: "Active", battery: "85%", ec: 1.65, temp: 26.1, ndvi: 0.81 },
  { label: "Node-02 (East Polyhouse)", status: "Standby", battery: "98%", ec: 2.10, temp: 31.2, ndvi: 0.69 },
  { label: "Node-09 (South Field)", status: "Active", battery: "78%", ec: 1.58, temp: 27.7, ndvi: 0.76 },
];

function FarmTech() {
  const [moisture, setMoisture] = useState(38);
  const [nodeActive, setNodeActive] = useState("Node-04 (West Block)");
  const [isPlayingFlight, setIsPlayingFlight] = useState(false);
  const [flightProgress, setFlightProgress] = useState(0);
  const [telemetryData, setTelemetryData] = useState<TelemetryPoint[]>([]);

  // Interactive Module Tab State
  const [activeModuleId, setActiveModuleId] = useState("sensors");

  // AI Simulator State
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(AI_DIAGNOSES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  useEffect(() => {
    const baseMoisture = moisture;
    const data: TelemetryPoint[] = [
      { time: "06:00", moisture: Math.max(10, baseMoisture - 4), ec: 1.80, temp: 22 },
      { time: "08:00", moisture: Math.max(10, baseMoisture - 2), ec: 1.85, temp: 24 },
      { time: "10:00", moisture: Math.min(90, baseMoisture + 3), ec: 1.90, temp: 27 },
      { time: "12:00", moisture: baseMoisture, ec: 1.82, temp: 29.4 },
      { time: "14:00", moisture: Math.max(10, baseMoisture - 3), ec: 1.75, temp: 31.5 },
      { time: "16:00", moisture: Math.max(10, baseMoisture - 1), ec: 1.72, temp: 30.0 },
      { time: "18:00", moisture: Math.max(10, baseMoisture - 5), ec: 1.70, temp: 28.4 },
    ];
    setTelemetryData(data);
  }, [moisture]);

  const runDroneFlight = () => {
    setIsPlayingFlight(true);
    setFlightProgress(0);
    const interval = setInterval(() => {
      setFlightProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsPlayingFlight(false), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  const handleSelectDiagnosis = (sample: (typeof AI_DIAGNOSES)[0]) => {
    setSelectedDiagnosis(sample);
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const getAdvice = (m: number) => {
    if (m < 30) {
      return {
        status: "Critical Low Tension",
        color: "text-red-600 bg-red-50 border-red-200",
        icon: Warning,
        text: "Soil moisture is below safe threshold (<30%). Trigger automated drip line valves for 45 minutes immediately to avoid root cell vascular collapse.",
      };
    } else if (m >= 30 && m <= 45) {
      return {
        status: "Optimal Range",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        icon: ShieldCheck,
        text: "Soil moisture tension is perfectly balanced (38%). Drip lines remain inactive. Root cell expansion index & NPK nutrient solubility are at peak stability.",
      };
    } else {
      return {
        status: "Saturated Soil Zone",
        color: "text-amber-700 bg-amber-50 border-amber-200",
        icon: Warning,
        text: "Soil moisture exceeds root zone holding capacity (>45%). Suspend active irrigation cycles to prevent anaerobic root asphyxiation and Phytophthora spores.",
      };
    }
  };

  const advice = getAdvice(moisture);
  const activeModule = MODULES.find((m) => m.id === activeModuleId) ?? MODULES[0];

  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />

      {/* Hero Section */}
      <PageHero
        eyebrow="Tech-Based Farm Management · Agaate AgTech"
        title={
          <>
            Sensors, Drones, and AI Working on Your Farm —{" "}
            <span className="italic text-terracotta">Zero Guesswork.</span>
          </>
        }
        description="Continuous telemetry solar probes, LoRa mesh node channels, and drone multispectral mapping giving you complete soil visibility and data-driven harvest confidence."
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            "IoT Soil Probes",
            "LoRa Mesh Network",
            "Multispectral Drones",
            "AI Leaf Diagnostics",
            "Automated Drip Loops",
            "Smart Crop Advisory",
          ].map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07, ease: EASE }}
              className="rounded-full border border-forest/15 bg-cream/80 px-4 py-1.5 font-jet text-[10px] font-bold uppercase tracking-[0.16em] text-forest shadow-xs"
            >
              {chip}
            </motion.span>
          ))}
        </div>
      </PageHero>

      {/* Live Telemetry Marquee Ticker */}
      <div className="border-y border-border bg-forest-deep py-3 text-cream shadow-inner">
        <Marquee
          duration={30}
          className="font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-cream/90"
        >
          {TICKER.map((t) => (
            <span key={t} className="inline-flex items-center gap-6">
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-moss animate-pulse" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Live 17-Acre Nursery Telemetry Dashboard Widget */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
        <SectionHeader
          eyebrow="17-Acre Smart Nursery Telemetry"
          title="Real-Time Subsurface & Atmospheric Telemetry"
          description="Live data streaming from LoRa mesh nodes stationed across the 17-acre Kukrola facility — monitoring root zone moisture tension, EC, and crop health metrics 24/7."
          align="left"
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Main Dashboard Widget Card */}
          <Reveal variant="scale-up" className="lg:col-span-7">
            <div className="space-y-6 rounded-[2.5rem] border border-border bg-bone p-8 text-left shadow-lg">
              {/* Header bar of Dashboard */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                      Live Telemetry Dashboard Widget
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-forest-deep mt-1">
                    {nodeActive}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {nodesList.map((n) => (
                    <button
                      key={n.label}
                      onClick={() => setNodeActive(n.label)}
                      className={`relative rounded-xl px-3 py-1.5 font-jet text-[10px] font-bold transition-all cursor-pointer ${
                        nodeActive === n.label
                          ? "bg-forest-deep text-cream shadow-md"
                          : "border border-border bg-card text-forest/70 hover:border-forest"
                      }`}
                    >
                      {n.label.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5 Real-time Metrics Pill Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 text-center font-jet text-xs">
                <div className="rounded-2xl border border-border bg-card p-3 shadow-xs">
                  <span className="block text-[9px] font-bold uppercase text-forest/40">Moisture</span>
                  <span className="text-base font-extrabold text-forest-deep">{moisture}%</span>
                </div>
                <div className="rounded-2xl border border-border bg-card p-3 shadow-xs">
                  <span className="block text-[9px] font-bold uppercase text-forest/40">EC Salinity</span>
                  <span className="text-base font-extrabold text-moss">1.82 mS/cm</span>
                </div>
                <div className="rounded-2xl border border-border bg-card p-3 shadow-xs">
                  <span className="block text-[9px] font-bold uppercase text-forest/40">Soil Temp</span>
                  <span className="text-base font-extrabold text-terracotta">28.4°C</span>
                </div>
                <div className="rounded-2xl border border-border bg-card p-3 shadow-xs">
                  <span className="block text-[9px] font-bold uppercase text-forest/40">NDVI Canopy</span>
                  <span className="text-base font-extrabold text-forest">0.74</span>
                </div>
                <div className="rounded-2xl border border-border bg-card p-3 shadow-xs col-span-2 sm:col-span-1">
                  <span className="block text-[9px] font-bold uppercase text-forest/40">Node Battery</span>
                  <span className="text-base font-extrabold text-emerald-600">92% OK</span>
                </div>
              </div>

              {/* Chart & Gauge Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
                {/* Recharts AreaChart */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-jet text-[10px] font-bold uppercase text-forest/50">
                      12h Soil Moisture Curve (%)
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-jet text-[9px] font-bold uppercase tracking-widest text-forest">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-forest" /> Streaming
                    </span>
                  </div>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={telemetryData}
                        margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="moistGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-forest)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="var(--color-forest)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F2" />
                        <XAxis
                          dataKey="time"
                          stroke="#59635D"
                          fontSize={10}
                          fontFamily="var(--font-mono)"
                        />
                        <YAxis
                          domain={[0, 100]}
                          stroke="#59635D"
                          fontSize={10}
                          fontFamily="var(--font-mono)"
                        />
                        <Tooltip
                          contentStyle={{
                            fontSize: "12px",
                            borderRadius: "12px",
                            border: "1px solid #E7ECE8",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="moisture"
                          stroke="var(--color-forest)"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#moistGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* SVG Moisture Gauge */}
                <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-5 shadow-xs min-w-[150px]">
                  <MoistureGauge value={moisture} />
                </div>
              </div>

              {/* Moisture Simulator Slider */}
              <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
                <div className="flex justify-between font-jet text-xs">
                  <span className="font-semibold uppercase text-forest/70">
                    Simulate Soil Tension Level
                  </span>
                  <span className="font-bold text-forest-deep">{moisture}%</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={75}
                  value={moisture}
                  onChange={(e) => setMoisture(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border accent-forest"
                />
                <div className="flex justify-between font-jet text-[9px] text-forest/40">
                  <span>15% (Wilting Point)</span>
                  <span>38% (Optimal Baseline)</span>
                  <span>75% (Saturation)</span>
                </div>
              </div>

              {/* Dynamic Advisory Output Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={advice.status}
                  className={`flex items-start gap-4 rounded-2xl border p-5 text-xs font-sans ${advice.color}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <advice.icon className="mt-0.5 h-6 w-6 flex-shrink-0" />
                  <div>
                    <span className="block font-jet font-bold uppercase tracking-wider text-[11px]">
                      Telemetry Alert · {advice.status}
                    </span>
                    <p className="mt-1 leading-relaxed">{advice.text}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Narrative Right Column */}
          <div className="space-y-8 text-left lg:col-span-5">
            <Reveal variant="fade-left">
              <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-moss">
                Zero Guesswork Agronomy
              </span>
              <h2 className="font-serif text-4xl font-bold leading-tight text-forest-deep md:text-5xl mt-2">
                Science on the field, telemetry in your pocket.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-forest/75 md:text-base">
                Traditional crop scouting catches disease only after leaf wilt appears. Agaate’s LoRa
                field arrays monitor soil moisture tension, electro-conductivity (EC), and ambient temperature
                continuously — flagging growth halts 5 days before visible wilting.
              </p>
            </Reveal>

            <Stagger className="space-y-4 border-t border-border pt-6" stagger={0.1}>
              <StaggerItem>
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-forest/8 text-forest">
                    <WifiHigh className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-forest-deep">LoRa Mesh Network Array</h4>
                    <p className="mt-1 text-xs text-forest/65">
                      Continuous transmission up to 3km from central farm hubs with zero cellular dependence.
                    </p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-forest/8 text-forest">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-forest-deep">Multispectral Drone Analytics</h4>
                    <p className="mt-1 text-xs text-forest/65">
                      Bi-weekly flyover flights evaluating NDVI leaf indices to target precise nitrogen dosing.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>

      {/* Field Map & Interactive Drone Patrol Section */}
      <FieldNetworkSection
        nodeActive={nodeActive}
        setNodeActive={setNodeActive}
        isPlayingFlight={isPlayingFlight}
        flightProgress={flightProgress}
        runDroneFlight={runDroneFlight}
      />

      {/* 6 Interactive Tech Modules Showcase */}
      <section className="border-t border-border bg-bone/40 px-6 py-24 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeader
            eyebrow="The Agaate Farm Tech Stack"
            title="Six Tech Modules. One Living Farm."
            description="Explore our six precision-farming technology verticals — select any module to test its live interactive capability."
            align="center"
            className="mx-auto"
          />

          {/* Module Selector Buttons */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {MODULES.map((m) => {
              const active = m.id === activeModuleId;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModuleId(m.id)}
                  className={`relative flex items-center gap-2 rounded-full px-5 py-3 font-jet text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-forest-deep text-cream shadow-md"
                      : "border border-border bg-card text-forest/70 hover:border-forest"
                  }`}
                >
                  <m.icon className="h-4 w-4" />
                  <span>{m.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Module Detailed Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-10 rounded-[2.5rem] border border-border bg-card p-8 text-left shadow-lg lg:p-12"
            >
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
                <div className="space-y-6 lg:col-span-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-deep text-cream shadow-sm">
                      <activeModule.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                        {activeModule.tag} Vertical
                      </span>
                      <h3 className="font-serif text-3xl font-bold text-forest-deep">
                        {activeModule.name}
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-sm font-semibold text-moss">
                    {activeModule.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-forest/75">
                    {activeModule.text}
                  </p>

                  <div className="space-y-3 pt-3">
                    {activeModule.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-3 text-xs text-forest/80">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                        <span className="font-semibold">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module Interactive Live Simulation Box */}
                <div className="lg:col-span-6">
                  <ModulePreviewSimulator moduleId={activeModule.id} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Grid of all 6 Modules */}
          <Stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {MODULES.map((m) => (
              <StaggerItem key={m.id} variant="scale-up">
                <TiltCard
                  maxTilt={7}
                  className={`relative h-full cursor-pointer overflow-hidden rounded-3xl border p-7 shadow-sm transition-all ${
                    m.id === activeModuleId
                      ? "border-forest bg-bone shadow-md"
                      : "border-border bg-card hover:border-forest/40"
                  }`}
                >
                  <button
                    onClick={() => setActiveModuleId(m.id)}
                    className="w-full text-left focus:outline-none"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-deep text-cream">
                        <m.icon className="h-5 w-5" />
                      </div>
                      <span className="font-jet text-[9px] font-bold uppercase tracking-widest text-terracotta">
                        {m.tag}
                      </span>
                    </div>
                    <h3 className="mt-5 font-serif text-xl font-bold leading-tight text-forest-deep">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-forest/70">{m.text}</p>
                  </button>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Interactive AI Crop Health Diagnosis Simulator */}
      <section className="mx-auto w-full max-w-7xl border-t border-border px-6 py-24 lg:px-12">
        <SectionHeader
          eyebrow="Interactive AI Diagnosis Simulator"
          title="Snap a Photo. Spot the Disease. Get Exact Dosage."
          description="Click sample diseased crop leaf photos to run our AI diagnostic neural scanner — generating real-time disease alerts, confidence scores, and bio-input prescription doses."
          align="center"
          className="mx-auto"
        />

        {/* Sample Photo Pickers */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {AI_DIAGNOSES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectDiagnosis(sample)}
              className={`flex items-center gap-3 rounded-2xl border px-5 py-3 text-left transition-all cursor-pointer ${
                selectedDiagnosis.id === sample.id
                  ? "border-forest-deep bg-forest-deep text-cream shadow-md"
                  : "border-border bg-card text-forest hover:border-forest"
              }`}
            >
              <div className="h-9 w-9 overflow-hidden rounded-lg bg-bone">
                <img src={sample.photoUrl} alt={sample.crop} className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="block font-jet text-[10px] font-bold uppercase opacity-75">
                  {sample.crop}
                </span>
                <span className="text-xs font-bold">{sample.disease.split(" ")[0]}</span>
              </div>
            </button>
          ))}
        </div>

        {/* AI Scanner Visual & Results Output Grid */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Photo Scanner Box */}
          <Reveal variant="fade-right" className="lg:col-span-5">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2.5rem] border-4 border-forest-deep bg-ink p-3 shadow-2xl">
              <div className="relative overflow-hidden rounded-[2rem] bg-black">
                <img
                  src={selectedDiagnosis.photoUrl}
                  alt={selectedDiagnosis.disease}
                  className="h-80 w-full object-cover opacity-85"
                />

                {/* Laser Sweep Scanner Line */}
                <motion.div
                  className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-terracotta to-transparent shadow-[0_0_15px_#d96b43]"
                  animate={{ top: ["5%", "95%", "5%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Scanning HUD Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(transparent_0.8px,rgba(0,0,0,0.4)_0.8px)] [background-size:12px_12px] p-6 flex flex-col justify-between">
                  <div className="flex justify-between font-jet text-[9px] text-cream/80">
                    <span>AI SCANDOC: {selectedDiagnosis.photoName}</span>
                    <span className="text-terracotta font-bold">
                      {isScanning ? `SCANNING ${scanProgress}%` : "ANALYSIS COMPLETE"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-white/20 bg-black/60 backdrop-blur-md p-4 text-cream">
                    <div className="flex items-center justify-between">
                      <span className="font-jet text-[10px] text-moss font-bold uppercase">
                        {selectedDiagnosis.crop} Sample
                      </span>
                      <span className="rounded bg-terracotta px-2 py-0.5 font-jet text-[9px] font-bold">
                        {selectedDiagnosis.severity}
                      </span>
                    </div>
                    <p className="mt-1 font-serif text-lg font-bold">{selectedDiagnosis.disease}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* AI Diagnostic Output Prescription Card */}
          <Reveal variant="fade-left" className="lg:col-span-7">
            <div className="space-y-6 rounded-[2.5rem] border border-border bg-card p-8 text-left shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                  <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                    AI Diagnostic Prescription
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-forest-deep mt-1">
                    {selectedDiagnosis.disease}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-center">
                    <span className="block font-jet text-[9px] font-bold uppercase text-emerald-600">
                      Confidence Score
                    </span>
                    <span className="font-mono text-xl font-extrabold text-emerald-700">
                      {selectedDiagnosis.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Symptoms & Root Cause */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-bone p-4">
                  <span className="font-jet text-[9px] font-bold uppercase tracking-wider text-forest/50 block mb-1">
                    Visual Symptoms
                  </span>
                  <p className="text-xs leading-relaxed text-forest-deep/90">{selectedDiagnosis.symptoms}</p>
                </div>
                <div className="rounded-2xl border border-border bg-bone p-4">
                  <span className="font-jet text-[9px] font-bold uppercase tracking-wider text-forest/50 block mb-1">
                    Root Cause & Micro-Climate Trigger
                  </span>
                  <p className="text-xs leading-relaxed text-forest-deep/90">{selectedDiagnosis.rootCause}</p>
                </div>
              </div>

              {/* Exact Bio-Input Dosage Recommendation */}
              <div className="rounded-2xl border border-forest/20 bg-forest/5 p-6 space-y-4">
                <div className="flex items-center gap-2 text-forest-deep">
                  <Sparkle className="h-5 w-5 text-terracotta" />
                  <h4 className="font-bold text-sm uppercase tracking-wider font-jet">
                    Prescribed Input & Dosage Recipe
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs font-mono">
                  <div className="rounded-xl border border-border bg-card p-3">
                    <span className="block text-[9px] text-forest/40">PRIMARY BIO-INPUT</span>
                    <span className="font-bold text-forest-deep text-sm">{selectedDiagnosis.recommendation.primaryProduct}</span>
                    <span className="block mt-1 text-terracotta font-semibold">{selectedDiagnosis.recommendation.primaryDose}</span>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3">
                    <span className="block text-[9px] text-forest/40">SECONDARY PROTECTANT</span>
                    <span className="font-bold text-forest-deep text-sm">{selectedDiagnosis.recommendation.secondaryProduct}</span>
                    <span className="block mt-1 text-moss font-semibold">{selectedDiagnosis.recommendation.secondaryDose}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-forest/80 border-t border-forest/10">
                  <span className="font-bold text-forest-deep">Cultural Field Protocol: </span>
                  {selectedDiagnosis.recommendation.culturalAdvice}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats Band */}
      <section className="px-6 py-24 lg:px-12">
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2.5rem] border border-border bg-forest-deep px-8 py-16 text-center shadow-xl">
          <Reveal variant="blur-in">
            <p className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-moss">
              Proof on the ground
            </p>
            <div className="mt-10 grid grid-cols-2 gap-10 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-5xl font-bold text-cream md:text-6xl">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </div>
                  <p className="mx-auto mt-3 max-w-[200px] text-xs leading-relaxed text-cream/70">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Smart Crop Cycles Roadmap */}
      <section className="mx-auto w-full max-w-7xl border-t border-border px-6 py-24 lg:px-12">
        <SectionHeader
          eyebrow="Smart crop cycles"
          title="From Data-Driven Sowing to a Guaranteed Harvest"
          description="Smart Crop Cycles map precise timelines from data-driven sowing to harvesting — precision farming for higher yield consistency and export-grade output."
          align="center"
          className="mx-auto"
        />
        <Reveal className="mt-16">
          <div className="relative">
            <div className="absolute left-0 right-0 top-[26px] hidden h-1 rounded-full bg-border sm:block" />
            <motion.div
              className="absolute left-0 top-[26px] hidden h-1 rounded-full bg-gradient-to-r from-moss to-forest sm:block"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: EASE }}
            />
            <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-5 sm:gap-6">
              {CYCLE.map((c, i) => (
                <div key={c.label} className="flex flex-col items-center gap-3 text-center">
                  <motion.div
                    className="relative flex h-[56px] w-[56px] items-center justify-center rounded-full border border-border bg-cream shadow-md"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.15 }}
                  >
                    <c.icon className="h-6 w-6 text-forest" />
                  </motion.div>
                  <div>
                    <p className="font-jet text-[9px] font-bold uppercase tracking-[0.16em] text-moss">
                      Stage 0{i + 1}
                    </p>
                    <p className="mt-1 text-sm font-bold text-forest-deep">{c.label}</p>
                    <p className="mt-1 text-[11px] text-forest/65 max-w-[140px] mx-auto">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Visibility CTA */}
      <section className="relative overflow-hidden border-t border-border px-6 py-28 text-center lg:px-12 bg-bone">
        <Reveal variant="blur-in" className="relative z-10 mx-auto max-w-4xl">
          <p className="font-jet text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta">
            See More · Act Earlier · Waste Less
          </p>
          <AnimatedHeadline
            as="h2"
            text="Your farm, fully visible — anytime, anywhere."
            className="mx-auto mt-5 font-serif text-4xl font-bold tracking-tight text-forest-deep md:text-6xl"
          />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-forest/70 md:text-base">
            Right dose, right stage, every time — water, nutrients and inputs delivered strictly on schedule by live farm telemetry data.
          </p>
          <MagneticButton
            as="a"
            href="tel:9487263498"
            strength={0.35}
            className="mt-10 inline-block"
          >
            <span className="inline-flex items-center gap-3 rounded-full bg-forest-deep px-8 py-4 font-jet text-xs font-bold uppercase tracking-[0.16em] text-cream shadow-xl hover:bg-forest transition-colors">
              <Phone className="h-4 w-4" />
              Talk to an Agronomist · 9487 263 498
            </span>
          </MagneticButton>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}

function MoistureGauge({ value }: { value: number }) {
  const r = 50;
  const arc = Math.PI * r;
  const offset = arc * (1 - Math.max(0, Math.min(100, value)) / 100);
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 70" className="h-auto w-36">
        <path
          d="M 10 62 A 50 50 0 0 1 110 62"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <motion.path
          d="M 10 62 A 50 50 0 0 1 110 62"
          fill="none"
          stroke="var(--color-forest)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={arc}
          initial={{ strokeDashoffset: arc }}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </svg>
      <div className="mt-1 text-center font-jet text-xs font-bold text-forest-deep">
        {value}% Moisture
      </div>
    </div>
  );
}

{/* Helper Module Preview Simulator for 6 Tech Modules */}
function ModulePreviewSimulator({ moduleId }: { moduleId: string }) {
  const [val, setVal] = useState(65);

  if (moduleId === "sensors") {
    return (
      <div className="rounded-2xl border border-border bg-bone p-6 space-y-4 font-mono text-xs">
        <div className="flex justify-between text-forest/60 text-[10px] uppercase font-bold">
          <span>LoRa Probe Mesh Channel 04</span>
          <span className="text-forest font-bold">Signal: -48 dBm OK</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Soil Tension Index:</span>
            <span className="font-bold text-forest-deep">38.4 centibars</span>
          </div>
          <div className="h-2 w-full rounded-full bg-border overflow-hidden">
            <div className="h-full bg-forest w-[62%]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <span className="block text-[9px] text-forest/40">AMBIENT HUMIDITY</span>
            <span className="text-sm font-bold text-forest-deep">74.2%</span>
          </div>
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <span className="block text-[9px] text-forest/40">BAROMETRIC PRESS</span>
            <span className="text-sm font-bold text-moss">1012 hPa</span>
          </div>
        </div>
      </div>
    );
  }

  if (moduleId === "drones") {
    return (
      <div className="rounded-2xl border border-border bg-bone p-6 space-y-4 font-mono text-xs">
        <div className="flex justify-between text-forest/60 text-[10px] uppercase font-bold">
          <span>AeroScan Hexacopter Drone #D-02</span>
          <span className="text-terracotta font-bold">Altitude: 24m</span>
        </div>
        <div className="h-32 rounded-xl bg-ink p-4 flex flex-col justify-between text-cream relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-moss)_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
          <div className="relative z-10 flex justify-between text-[10px]">
            <span>GRID SCAN: BLOCK_WEST</span>
            <span className="text-moss">NDVI: 0.78 HEALTHY</span>
          </div>
          <div className="relative z-10 text-center">
            <span className="text-2xl font-bold font-serif text-cream">Target Spray Flow: 1.2 L/min</span>
            <span className="block text-[10px] text-cream/60">Ultra-uniform droplet size 120 microns</span>
          </div>
        </div>
      </div>
    );
  }

  if (moduleId === "ai") {
    return (
      <div className="rounded-2xl border border-border bg-bone p-6 space-y-4 font-mono text-xs">
        <div className="flex justify-between text-forest/60 text-[10px] uppercase font-bold">
          <span>Vision Neural Engine v4.2</span>
          <span className="text-emerald-600 font-bold">Accuracy: 99.4%</span>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-forest-deep">Detected: Downy Mildew</span>
            <span className="text-terracotta font-bold">Immediate Action</span>
          </div>
          <p className="text-[11px] text-forest/70">
            Prescription: Spray Biocure F at 2.5 kg/acre. Repeat in 7 days.
          </p>
        </div>
      </div>
    );
  }

  if (moduleId === "drip") {
    return (
      <div className="rounded-2xl border border-border bg-bone p-6 space-y-4 font-mono text-xs">
        <div className="flex justify-between text-forest/60 text-[10px] uppercase font-bold">
          <span>Automated Hydraulic Fertigation</span>
          <span className="text-forest font-bold">Loop Status: Active</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <span className="block text-[9px] text-forest/40">ZONE A VALVES</span>
            <span className="text-sm font-bold text-emerald-600">OPEN (35 min)</span>
          </div>
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <span className="block text-[9px] text-forest/40">ZONE B VALVES</span>
            <span className="text-sm font-bold text-amber-600">STANDBY</span>
          </div>
        </div>
      </div>
    );
  }

  if (moduleId === "app") {
    return (
      <div className="rounded-2xl border border-border bg-bone p-6 space-y-4 font-mono text-xs">
        <div className="flex justify-between text-forest/60 text-[10px] uppercase font-bold">
          <span>Agaate Kisan Mobile App</span>
          <span className="text-forest font-bold">WhatsApp Sync</span>
        </div>
        <div className="space-y-2 rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-forest-deep">
            <DeviceMobile className="h-4 w-4 text-moss" />
            <span>Daily Agronomist Alert</span>
          </div>
          <p className="text-[11px] text-forest/70 leading-relaxed">
            "North Nursery Tomato Block: Irrigation loop completed. Apply Biovita foliar spray today."
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-bone p-6 space-y-4 font-mono text-xs">
      <div className="flex justify-between text-forest/60 text-[10px] uppercase font-bold">
        <span>Live Advisory Generator</span>
        <span className="text-forest font-bold">Custom Recommendations</span>
      </div>
      <div className="rounded-xl border border-border bg-card p-4 space-y-2">
        <span className="block font-bold text-forest-deep">Field Yield Forecast: +24%</span>
        <p className="text-[11px] text-forest/70 leading-relaxed">
          Based on current soil EC (1.82 mS/cm) and zero disease flags, harvest peak is scheduled for Day 62.
        </p>
      </div>
    </div>
  );
}
