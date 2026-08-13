import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CaretRight,
  CheckCircle,
  Drop,
  FileText,
  Hammer,
  type Icon,
  Package,
  Pulse,
  Ruler,
  ShieldCheck,
  Sparkle,
  Stack,
  Target,
  TrendUp,
  Users,
  Wallet
} from "@phosphor-icons/react";
import {
  EASE,
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
  motion,
} from "@/components/common/motion";

type PhaseData = {
  num: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: Icon;
  color: string;
  sopChecklist: string[];
  keyDeliverable: string;
  blueprintType: "land" | "infra" | "inputs" | "ops" | "roi" | "management";
};

const PHASES_DATA: PhaseData[] = [
  {
    num: "01",
    title: "Land Planning & Layout",
    subtitle: "Site topography, soil chemistry & hydraulic zoning",
    duration: "Weeks 1–2",
    icon: Ruler,
    color: "var(--color-moss)",
    sopChecklist: [
      "GPS perimeter drone survey & elevation contour mapping",
      "Soil core chemistry & organic matter baseline testing",
      "Field block partitioning (5 to 10 Acre operational sectors)",
      "Main water-source intake & slope drainage layout design",
      "Internal tractor access roads & loading bay plotting",
    ],
    keyDeliverable: "Master Land Blueprint & Soil Calibration Matrix",
    blueprintType: "land",
  },
  {
    num: "02",
    title: "Infrastructure Build-Out",
    subtitle: "Precision irrigation, polyhouses & bed preparation",
    duration: "Weeks 3–5",
    icon: Hammer,
    color: "var(--color-terracotta)",
    sopChecklist: [
      "Mainline hydraulic piping & pressure filtration manifold installation",
      "Automated Venturi fertigation dosing skid deployment",
      "Raised bed trenching with 4.2 ft center spacing & mulching installation",
      "High-density UV polyhouse / shade-net structure erection",
      "Solar pumping station & solar perimeter security fencing setup",
    ],
    keyDeliverable: "Operational Fertigation Loop & Protected Structures",
    blueprintType: "infra",
  },
  {
    num: "03",
    title: "Inputs at Scale",
    subtitle: "Bio-Boosted seedling reservation & certified inputs",
    duration: "Weeks 6–8",
    icon: Package,
    color: "var(--color-forest)",
    sopChecklist: [
      "Custom batch seed procurement from tier-1 partner seed banks",
      "Bio-Boosted seedling plug propagation at Bhora Kalan Smart Chamber",
      "Basal organic dose formulation based on soil core lab reports",
      "Stage-wise fertigation nutrient pack delivery staging",
      "Biological crop protection stock staging (Biocure F / Bio Nimaton)",
    ],
    keyDeliverable: "Hardened Nursery Plugs & Season Input Inventory",
    blueprintType: "inputs",
  },
  {
    num: "04",
    title: "Operations & Manpower",
    subtitle: "Daily labor SOPs, supervisor training & task logging",
    duration: "Weeks 9–10",
    icon: Users,
    color: "var(--color-terracotta)",
    sopChecklist: [
      "On-site farm manager & supervisor protocol certification",
      "Field worker shift planning & task-specific labor allocation",
      "Transplanting team SOP execution with 98%+ root plug survival",
      "WhatsApp & Mobile app daily input logging integration",
      "Staking system setup (bamboo poles, netting & support ties)",
    ],
    keyDeliverable: "Trained Farm Crew & Digitized Daily Pulse Log",
    blueprintType: "ops",
  },
  {
    num: "05",
    title: "Cost & ROI Planning",
    subtitle: "Phased CapEx budgeting, cash flow & yield modeling",
    duration: "Ongoing Milestone",
    icon: Wallet,
    color: "var(--color-moss)",
    sopChecklist: [
      "Itemized CapEx breakdown (Irrigation, Polyhouse, Inputs, Labor)",
      "Stage-wise OpEx cash-flow scheduling mapped to harvest dates",
      "Yield sensitivity analysis (Conservative, Baseline, High-Yield)",
      "Risk mitigation buffer allocation & crop insurance registration",
      "Buyer price indexing & breakeven payback timeline calculation",
    ],
    keyDeliverable: "Commercial Financial Model & Harvest ROI Roadmap",
    blueprintType: "roi",
  },
  {
    num: "06",
    title: "Ongoing Agronomy Management",
    subtitle: "Dedicated agronomist visits, telemetry & assured buyback",
    duration: "Full Crop Cycle",
    icon: Target,
    color: "var(--color-forest-deep)",
    sopChecklist: [
      "Bi-weekly on-field visits by senior Agaate Agronomist",
      "IoT soil moisture & weather telemetry node monitoring",
      "Early pest/disease identification with rapid spray advisory",
      "Pre-harvest grading & quality standard inspection",
      "Direct market buyback dispatch & institutional buyer logistics",
    ],
    keyDeliverable: "Assured High-Yield Harvest & Institutional Buyback",
    blueprintType: "management",
  },
];

export function PhaseTimeline({
  onSelectPhaseForModal,
}: {
  onSelectPhaseForModal?: (phaseNum: string) => void;
}) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = PHASES_DATA[activePhaseIndex];
  const ActiveIcon = activePhase.icon;

  return (
    <section id="turnkey" className="relative overflow-hidden py-24 px-6 lg:px-12 bg-cream">
      {/* Background ambient blurs */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-[450px] w-[450px] rounded-full opacity-10 blur-3xl">
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)" }}
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-[-8%] h-[400px] w-[400px] rounded-full opacity-10 blur-3xl">
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, var(--color-terracotta) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Phased Turnkey Execution Roadmap"
          title={
            <>
              Six phases. One <span className="italic text-terracotta">turnkey</span> commercial partner.
            </>
          }
          description="Complete end-to-end execution of commercial agricultural estates — from raw uncultivated land to your first institutional buyer dispatch. Agaate manages every phase to eliminate risk."
        />

        {/* Horizontal Step Tabs Navigation */}
        <div className="mt-14 overflow-x-auto pb-4 pt-2">
          <div className="flex min-w-[760px] items-center gap-3 border-b border-forest/15 pb-4">
            {PHASES_DATA.map((phase, idx) => {
              const isActive = activePhaseIndex === idx;
              const Icon = phase.icon;
              return (
                <button
                  key={phase.num}
                  type="button"
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`group relative flex flex-1 cursor-pointer flex-col items-start rounded-2xl p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-card shadow-md shadow-forest/5 border border-forest/25"
                      : "bg-bone/60 border border-transparent hover:bg-card/70 hover:border-forest/10"
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2 mb-2">
                    <span
                      className={`font-jet text-xs font-bold ${
                        isActive ? "text-terracotta" : "text-forest/45"
                      }`}
                    >
                      PHASE {phase.num}
                    </span>
                    <span className="font-jet text-[10px] text-forest/40">{phase.duration}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                        isActive
                          ? "bg-forest/10 text-forest"
                          : "bg-bone text-forest/50 group-hover:text-forest"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-serif text-base font-bold text-forest-deep line-clamp-1">
                      {phase.title}
                    </span>
                  </div>

                  {isActive ? (
                    <motion.div
                      layoutId="active-phase-bar"
                      className="absolute bottom-[-17px] left-0 right-0 h-1 bg-terracotta rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Content Display Grid */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.num}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start"
            >
              {/* Left Column: Phase Details & SOP Checklist */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="rounded-[2.5rem] border border-border bg-card p-8 md:p-10 shadow-sm relative overflow-hidden">
                  <span className="font-serif text-8xl font-bold leading-none text-forest-deep/[0.06] absolute right-6 top-4 select-none">
                    {activePhase.num}
                  </span>

                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-3.5 py-1.5 font-jet text-[10px] font-bold uppercase tracking-wider text-forest mb-4">
                      <ActiveIcon className="h-3.5 w-3.5 text-terracotta" />
                      Phase {activePhase.num} · {activePhase.duration}
                    </div>

                    <h3 className="font-serif text-3xl font-bold text-forest-deep md:text-4xl">
                      {activePhase.title}
                    </h3>
                    <p className="mt-2 text-sm text-forest/70 font-medium">
                      {activePhase.subtitle}
                    </p>

                    <div className="mt-8 pt-6 border-t border-border/60">
                      <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta block mb-4">
                        Detailed SOP Checklist
                      </span>
                      <Stagger stagger={0.08} className="space-y-3">
                        {activePhase.sopChecklist.map((item, i) => (
                          <StaggerItem key={i} variant="fade-right">
                            <div className="flex items-start gap-3 rounded-xl bg-bone/50 p-3 border border-border/40 transition-all hover:bg-bone hover:border-forest/20">
                              <CheckCircle className="h-4 w-4 text-moss shrink-0 mt-0.5" />
                              <span className="text-xs font-semibold leading-relaxed text-forest-deep">
                                {item}
                              </span>
                            </div>
                          </StaggerItem>
                        ))}
                      </Stagger>
                    </div>

                    {/* Key Deliverable Card */}
                    <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-forest/20 bg-forest/5 p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-forest shrink-0" />
                        <div>
                          <span className="font-jet text-[9px] uppercase tracking-wider text-forest/60 font-bold block">
                            Key Operational Deliverable
                          </span>
                          <span className="text-xs font-bold text-forest-deep">
                            {activePhase.keyDeliverable}
                          </span>
                        </div>
                      </div>
                      {onSelectPhaseForModal && (
                        <button
                          type="button"
                          onClick={() => onSelectPhaseForModal(activePhase.num)}
                          className="shrink-0 text-xs font-mono font-bold text-terracotta hover:underline flex items-center gap-1"
                        >
                          Request Phase SOP <CaretRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Phase Blueprint Vector Diagram */}
              <div className="lg:col-span-6">
                <TiltCard maxTilt={5} className="h-full">
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 md:p-10 shadow-sm text-left flex flex-col justify-between min-h-[480px]">
                    <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
                      <div>
                        <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-forest/40 block">
                          Phase Vector Blueprint Layout
                        </span>
                        <h4 className="font-serif text-xl font-bold text-forest-deep">
                          Phase {activePhase.num} Technical Diagram
                        </h4>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-bone px-3 py-1 font-jet text-[10px] font-bold text-forest">
                        <Pulse className="h-3 w-3 text-emerald-500 animate-pulse" />
                        Live Engineering Spec
                      </span>
                    </div>

                    {/* SVG Blueprint Render based on blueprintType */}
                    <div className="relative flex-1 flex items-center justify-center bg-bone/30 rounded-2xl border border-forest/10 p-6 overflow-hidden min-h-[280px]">
                      {activePhase.blueprintType === "land" && (
                        <svg className="w-full h-56 text-forest" viewBox="0 0 240 140" fill="none">
                          <motion.rect
                            x="10"
                            y="10"
                            width="220"
                            height="120"
                            rx="8"
                            stroke="var(--color-forest)"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2, ease: EASE }}
                          />
                          {/* Sector Grids */}
                          <line x1="120" y1="10" x2="120" y2="130" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="2 2" />
                          <line x1="10" y1="70" x2="230" y2="70" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="2 2" />
                          {/* Sector Labels */}
                          <text x="30" y="35" fill="var(--color-forest-deep)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">SECTOR A (10 ACRES)</text>
                          <text x="140" y="35" fill="var(--color-forest-deep)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">SECTOR B (10 ACRES)</text>
                          <text x="30" y="95" fill="var(--color-forest-deep)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">SECTOR C (10 ACRES)</text>
                          <text x="140" y="95" fill="var(--color-forest-deep)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">SECTOR D (10 ACRES)</text>
                          {/* Intake Water Point */}
                          <motion.circle cx="120" cy="70" r="10" fill="var(--color-terracotta)" opacity={0.2} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                          <circle cx="120" cy="70" r="5" fill="var(--color-terracotta)" />
                          <text x="100" y="85" fill="var(--color-terracotta)" fontSize="6" fontFamily="var(--font-mono)" fontWeight="bold">BOREWELL INTAKE NODE</text>
                        </svg>
                      )}

                      {activePhase.blueprintType === "infra" && (
                        <svg className="w-full h-56 text-forest" viewBox="0 0 240 140" fill="none">
                          {/* Irrigation Mainline */}
                          <line x1="20" y1="70" x2="220" y2="70" stroke="var(--color-terracotta)" strokeWidth="3" />
                          {/* Drip Laterals */}
                          {[20, 40, 60, 80, 100, 120].map((y) => (
                            <motion.line
                              key={y}
                              x1="40"
                              y1={y}
                              x2="200"
                              y2={y}
                              stroke="var(--color-moss)"
                              strokeWidth="1.5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.8, delay: y * 0.005 }}
                            />
                          ))}
                          {/* Pump Dosing station */}
                          <rect x="15" y="55" width="30" height="30" rx="4" fill="var(--color-forest-deep)" />
                          <text x="20" y="73" fill="white" fontSize="6" fontFamily="var(--font-mono)" fontWeight="bold font-mono">VENTURI</text>
                          <text x="60" y="15" fill="var(--color-forest-deep)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">PRECISION DRIP LATERALS (30cm INLINE)</text>
                        </svg>
                      )}

                      {activePhase.blueprintType === "inputs" && (
                        <svg className="w-full h-56 text-forest" viewBox="0 0 240 140" fill="none">
                          {/* Plug Plant Trays Grid */}
                          {[20, 50, 80, 110].map((x, colIdx) => (
                            <g key={x}>
                              {[20, 50, 80].map((y, rowIdx) => (
                                <motion.rect
                                  key={y}
                                  x={x}
                                  y={y}
                                  width="24"
                                  height="24"
                                  rx="3"
                                  fill="var(--color-bone)"
                                  stroke="var(--color-forest)"
                                  strokeWidth="1"
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: (colIdx + rowIdx) * 0.08 }}
                                />
                              ))}
                            </g>
                          ))}
                          <text x="140" y="40" fill="var(--color-forest-deep)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">BHORA KALAN NURSERY</text>
                          <text x="140" y="55" fill="var(--color-moss)" fontSize="6" fontFamily="var(--font-mono)">• 98%+ Seedling Survival</text>
                          <text x="140" y="70" fill="var(--color-terracotta)" fontSize="6" fontFamily="var(--font-mono)">• Bio-Boosted Inoculation</text>
                          <text x="140" y="85" fill="var(--color-forest)" fontSize="6" fontFamily="var(--font-mono)">• Certified Root Plugs</text>
                        </svg>
                      )}

                      {activePhase.blueprintType === "ops" && (
                        <svg className="w-full h-56 text-forest" viewBox="0 0 240 140" fill="none">
                          <rect x="20" y="20" width="200" height="100" rx="8" stroke="var(--color-border)" strokeWidth="1.5" />
                          <circle cx="60" cy="70" r="24" fill="var(--color-moss)" opacity={0.15} />
                          <circle cx="120" cy="70" r="24" fill="var(--color-terracotta)" opacity={0.15} />
                          <circle cx="180" cy="70" r="24" fill="var(--color-forest)" opacity={0.15} />
                          <text x="42" y="73" fill="var(--color-forest-deep)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">CREW A</text>
                          <text x="102" y="73" fill="var(--color-forest-deep)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">CREW B</text>
                          <text x="162" y="73" fill="var(--color-forest-deep)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">AGRONOMIST</text>
                          <text x="40" y="110" fill="var(--color-forest/60)" fontSize="6" fontFamily="var(--font-mono)">TRANSPLANT</text>
                          <text x="105" y="110" fill="var(--color-forest/60)" fontSize="6" fontFamily="var(--font-mono)">STAKING</text>
                          <text x="165" y="110" fill="var(--color-forest/60)" fontSize="6" fontFamily="var(--font-mono)">SOP AUDIT</text>
                        </svg>
                      )}

                      {activePhase.blueprintType === "roi" && (
                        <svg className="w-full h-56 text-forest" viewBox="0 0 240 140" fill="none">
                          {/* Financial Graph Axes */}
                          <line x1="30" y1="120" x2="220" y2="120" stroke="var(--color-forest-deep)" strokeWidth="1.5" />
                          <line x1="30" y1="20" x2="30" y2="120" stroke="var(--color-forest-deep)" strokeWidth="1.5" />
                          {/* CapEx vs Revenue curve */}
                          <motion.path
                            d="M 30 110 Q 90 90, 130 60 T 220 25"
                            fill="none"
                            stroke="var(--color-moss)"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: EASE }}
                          />
                          <motion.path
                            d="M 30 50 Q 80 80, 130 95 T 220 105"
                            fill="none"
                            stroke="var(--color-terracotta)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                          <text x="160" y="30" fill="var(--color-moss)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">GROSS REVENUE</text>
                          <text x="150" y="115" fill="var(--color-terracotta)" fontSize="6" fontFamily="var(--font-mono)">CapEx Amortization</text>
                        </svg>
                      )}

                      {activePhase.blueprintType === "management" && (
                        <svg className="w-full h-56 text-forest" viewBox="0 0 240 140" fill="none">
                          <circle cx="120" cy="70" r="45" stroke="var(--color-forest)" strokeWidth="1" strokeDasharray="3 3" />
                          <circle cx="120" cy="70" r="25" stroke="var(--color-moss)" strokeWidth="1" />
                          <motion.line
                            x1="120"
                            y1="70"
                            x2="160"
                            y2="40"
                            stroke="var(--color-terracotta)"
                            strokeWidth="2"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "120px 70px" }}
                          />
                          <circle cx="120" cy="70" r="4" fill="var(--color-terracotta)" />
                          <text x="80" y="128" fill="var(--color-forest-deep)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">4G LoRa TELEMETRY RADAR</text>
                        </svg>
                      )}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/50 pt-4 text-xs font-mono">
                      <div>
                        <span className="text-forest/40 block text-[9px] uppercase">
                          Phase Duration
                        </span>
                        <span className="font-bold text-forest-deep">{activePhase.duration}</span>
                      </div>
                      <div>
                        <span className="text-forest/40 block text-[9px] uppercase">
                          Agaate Standard
                        </span>
                        <span className="font-bold text-terracotta">Zero Guesswork Guarantee</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
