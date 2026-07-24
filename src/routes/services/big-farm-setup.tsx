import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  Hammer,
  ShieldCheck,
  Calendar,
  ArrowRight,
  ClipboardList,
  Info,
  CheckCircle,
  LayoutGrid,
} from "lucide-react";

export const Route = createFileRoute("/services/big-farm-setup")({
  component: BigFarmSetup,
});

function BigFarmSetup() {
  const [scoped, setScoped] = useState(false);
  const [activeTab, setActiveTab] = useState<"builder" | "blueprint">("builder");

  // Project Builder inputs
  const [builderAcres, setBuilderAcres] = useState(10);
  const [builderWater, setBuilderWater] = useState("Borewell");
  const [builderCrop, setBuilderCrop] = useState("Tomato");
  const [showPlan, setShowPlan] = useState(false);

  const getCustomSteps = () => {
    return [
      {
        num: "01",
        title: "Soil Core Chemistry Mapping",
        desc: `Perform deep block assays for ${builderCrop}. Calibrate organic matter levels to match target yield of 25 tons/acre.`,
        duration: "Weeks 1-2",
      },
      {
        num: "02",
        title: "Hydraulic Drip Loop Piping",
        desc: `Design pressure filtration manifold nodes sizing for ${builderAcres} acres using a ${builderWater} distribution network.`,
        duration: "Weeks 3-5",
      },
      {
        num: "03",
        title: "Seedling Nursery Scheduling",
        desc: `Pre-order containerized root plugs from the Bhora Kalan Smart Chamber to match dispatch timeline.`,
        duration: "Weeks 6-8",
      },
      {
        num: "04",
        title: "Telemetry Probe Deployment",
        desc: "Deploy LoRa solar node transceivers and moisture probes across main sector grids.",
        duration: "Week 9",
      },
    ];
  };

  const generatedSteps = getCustomSteps();

  const handleScope = (e: React.FormEvent) => {
    e.preventDefault();
    setScoped(true);
    setTimeout(() => {
      setScoped(false);
      setShowPlan(false);
    }, 4000);
  };

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            SERVICE VERTICAL · 05
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Big Farm <span className="italic text-terracotta">Setup.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            Complete turnkey establishment of commercial vegetable setups — from bare soil to your
            initial institutional buyer shipments.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* Navigation Tabs */}
        <div className="flex justify-center border-b border-border max-w-md mx-auto pb-px">
          <button
            onClick={() => setActiveTab("builder")}
            className={`flex-1 py-4 text-xs font-mono font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === "builder"
                ? "border-forest text-forest-deep"
                : "border-transparent text-forest/50 hover:text-forest"
            }`}
          >
            Project Builder Tool
          </button>
          <button
            onClick={() => setActiveTab("blueprint")}
            className={`flex-1 py-4 text-xs font-mono font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === "blueprint"
                ? "border-forest text-forest-deep"
                : "border-transparent text-forest/50 hover:text-forest"
            }`}
          >
            Design Layout Blueprints
          </button>
        </div>

        {/* Tab 1: Builder Tool */}
        {activeTab === "builder" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start animate-in fade-in duration-300">
            <div className="lg:col-span-7 space-y-8 text-left">
              <h2 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold tracking-tight leading-tight">
                Turnkey development matching crop and water profiles
              </h2>
              <p className="text-forest/75 text-sm leading-relaxed">
                Large scale commercial farming projects usually fail during the first 6 months due
                to uncalibrated soil structures, incorrect water sizing layouts, or inputs supply
                chain shortages. Agaate controls every phase directly to ensure commercial
                viability.
              </p>

              {showPlan ? (
                <div className="space-y-6 relative pl-6 border-l border-forest/10 mt-8 animate-in slide-in-from-left duration-300">
                  <span className="font-jet text-[9px] tracking-widest text-terracotta font-bold uppercase block">
                    Generated execution roadmap
                  </span>
                  {generatedSteps.map((s, idx) => (
                    <div key={idx} className="relative py-2 text-left">
                      <span className="absolute left-[-29px] top-[14px] w-3 h-3 rounded-full bg-forest border-2 border-white shadow-sm" />
                      <span className="text-[10px] font-mono tracking-wider text-terracotta font-semibold uppercase">
                        Phase {s.num} · {s.duration}
                      </span>
                      <h4 className="font-serif text-xl font-bold text-forest-deep mb-1">
                        {s.title}
                      </h4>
                      <p className="text-xs text-forest/70 leading-relaxed max-w-lg">{s.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-[#eef3f0]/50 rounded-[2rem] border border-forest/15 space-y-4">
                  <LayoutGrid className="w-10 h-10 text-forest" />
                  <h3 className="font-serif text-2xl text-forest-deep font-bold">
                    Plan Your Block Setup
                  </h3>
                  <p className="text-xs text-forest/70 leading-relaxed">
                    Set your target size, primary water supply type, and focus crop inside the
                    estimator tool to calculate dynamic development phases.
                  </p>
                </div>
              )}
            </div>

            {/* Turnkey builder parameters form */}
            <div className="lg:col-span-5 bg-bone rounded-[2.5rem] border border-border p-8 text-left space-y-6 shadow-sm">
              <div>
                <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                  Blueprint parameters
                </span>
                <h3 className="font-serif text-3xl text-forest-deep font-bold">Setup Calculator</h3>
              </div>

              {scoped ? (
                <div className="p-8 text-center bg-card border border-forest/10 rounded-3xl flex flex-col items-center justify-center min-h-[350px] animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="font-serif text-3xl text-forest-deep font-bold mb-2">
                    Project Submitted
                  </h4>
                  <p className="text-xs text-forest/70 max-w-xs leading-relaxed">
                    We have logged your generated setup details. A senior construction engineer will
                    call you to coordinate a physical field survey visit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScope} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                      Target Farm Size (Acres)
                    </label>
                    <input
                      type="number"
                      min={3}
                      max={100}
                      value={builderAcres}
                      onChange={(e) => {
                        setBuilderAcres(parseInt(e.target.value) || 3);
                        setShowPlan(true);
                      }}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest font-bold text-forest-deep"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                        Water Source
                      </label>
                      <select
                        value={builderWater}
                        onChange={(e) => {
                          setBuilderWater(e.target.value);
                          setShowPlan(true);
                        }}
                        className="w-full bg-card border border-border rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-forest font-bold text-forest-deep"
                      >
                        <option>Borewell</option>
                        <option>Canal Loop</option>
                        <option>Rainwater Harvesting</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                        Target Crop Focus
                      </label>
                      <select
                        value={builderCrop}
                        onChange={(e) => {
                          setBuilderCrop(e.target.value);
                          setShowPlan(true);
                        }}
                        className="w-full bg-card border border-border rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-forest font-bold text-forest-deep"
                      >
                        <option>Tomato</option>
                        <option>Chilli</option>
                        <option>Capsicum</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50 space-y-3">
                    <span className="block text-[10px] font-mono text-forest/40 uppercase font-semibold">
                      Contact Details
                    </span>
                    <input
                      required
                      type="text"
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-forest"
                      placeholder="Your Name"
                    />
                    <input
                      required
                      type="tel"
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-forest"
                      placeholder="Phone Number"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>Request Field Survey Setup</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Design Layout Blueprints */}
        {activeTab === "blueprint" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center text-left animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block">
                INTEGRATED HYDRAULICS MAP
              </span>
              <h3 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold leading-tight">
                Typical Smart Polyhouse Schematic Layout
              </h3>
              <p className="text-forest/75 text-sm leading-relaxed">
                Our engineering team pre-calibrates the layout based on local slope profiles,
                preventing structural water puddling and dry nodes. Check the typical layout matrix
                schematic on the right representing automatic venturi dosing setups.
              </p>
              <div className="p-4 bg-card border border-border rounded-xl flex gap-3 text-xs text-forest/70 font-mono">
                <Info className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                <span>
                  Our blueprints are customized using dynamic elevation drone sweeps to avoid
                  hydraulic resistance blockages.
                </span>
              </div>
            </div>

            {/* CSS/SVG Layout map mockup */}
            <div className="lg:col-span-6 bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
              <span className="text-[10px] font-mono text-forest/45 uppercase block mb-6 font-semibold">
                Polyhouse Blueprint Grid (1 Acre Block)
              </span>
              <div className="relative border border-forest/10 rounded-2xl p-6 bg-bone/25 flex flex-col items-center justify-center min-h-[250px] overflow-hidden">
                {/* SVG Schematic layout */}
                <svg
                  className="w-full max-w-sm h-48 text-forest"
                  viewBox="0 0 200 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer boundaries */}
                  <rect
                    x="10"
                    y="10"
                    width="180"
                    height="80"
                    rx="6"
                    stroke="var(--color-forest)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />

                  {/* Bed rows */}
                  <line
                    x1="30"
                    y1="25"
                    x2="170"
                    y2="25"
                    stroke="var(--color-moss)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="30"
                    y1="45"
                    x2="170"
                    y2="45"
                    stroke="var(--color-moss)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="30"
                    y1="65"
                    x2="170"
                    y2="65"
                    stroke="var(--color-moss)"
                    strokeWidth="1.5"
                  />

                  {/* Main header distribution pipe */}
                  <line
                    x1="25"
                    y1="20"
                    x2="25"
                    y2="80"
                    stroke="var(--color-terracotta)"
                    strokeWidth="2.5"
                  />

                  {/* Pump node */}
                  <circle cx="25" cy="50" r="6" fill="var(--color-terracotta)" />
                  <text
                    x="35"
                    y="53"
                    fill="var(--color-forest-deep)"
                    fontSize="6"
                    fontFamily="var(--font-mono)"
                    fontWeight="bold"
                  >
                    VENTURI PUMP BLOCK
                  </text>

                  <text
                    x="75"
                    y="18"
                    fill="var(--color-forest)"
                    fontSize="5"
                    fontFamily="var(--font-mono)"
                  >
                    CROP ROW 01 (DRIP LINES)
                  </text>
                  <text
                    x="75"
                    y="38"
                    fill="var(--color-forest)"
                    fontSize="5"
                    fontFamily="var(--font-mono)"
                  >
                    CROP ROW 02 (DRIP LINES)
                  </text>
                  <text
                    x="75"
                    y="58"
                    fill="var(--color-forest)"
                    fontSize="5"
                    fontFamily="var(--font-mono)"
                  >
                    CROP ROW 03 (DRIP LINES)
                  </text>
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-6 mt-4 border-t border-border/50">
                <div>
                  <span className="text-forest/40 block text-[9px]">BED WIDTH SPACING</span>
                  <span className="font-bold text-forest-deep">4.2 Feet Center</span>
                </div>
                <div>
                  <span className="text-forest/40 block text-[9px]">DRIP SPACING RANGE</span>
                  <span className="font-bold text-forest-deep">30 cm inline emitters</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
