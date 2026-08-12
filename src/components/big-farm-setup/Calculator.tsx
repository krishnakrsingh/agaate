import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  CaretRight,
  CheckCircle,
  ClipboardText,
  Clock,
  CurrencyDollar,
  Info,
  Plant,
  ShieldCheck,
  Sliders,
  TrendUp,
  Users
} from "@phosphor-icons/react";
import { EASE, motion, CountUp } from "@/components/common/motion";

export function TabSwitcher({
  activeTab,
  setActiveTab,
}: {
  activeTab: "builder" | "blueprint";
  setActiveTab: (tab: "builder" | "blueprint") => void;
}) {
  return (
    <div className="flex justify-center border-b border-border max-w-md mx-auto pb-px">
      {(
        [
          ["builder", "Commercial Estimator"],
          ["blueprint", "Schematic Layout"],
        ] as const
      ).map(([key, label]) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`relative flex-1 py-4 text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${
            activeTab === key ? "text-forest-deep" : "text-forest/50 hover:text-forest"
          }`}
        >
          {label}
          {activeTab === key ? (
            <motion.span
              layoutId="tab-underline"
              className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-terracotta"
              transition={{ duration: 0.35, ease: EASE }}
            />
          ) : null}
        </button>
      ))}
    </div>
  );
}

export type CropCategory = "vegetables" | "polyhouse" | "fruits";

const CROP_PRESETS: Record<
  CropCategory,
  {
    name: string;
    crops: string;
    capexAcre: number; // in ₹ Lakhs per acre
    yieldPerAcreTons: number; // in Tons
    revenuePerTon: number; // in ₹
    plugsPerAcre: number;
    laborPer10Acres: number;
    paybackMonths: number;
  }
> = {
  vegetables: {
    name: "Commercial Open-Field Vegetables",
    crops: "Tomato, Chilli, Watermelon, Cauliflower",
    capexAcre: 1.85, // ₹ 1.85 Lakhs / acre
    yieldPerAcreTons: 25,
    revenuePerTon: 18000, // ₹ 18,000 / ton average
    plugsPerAcre: 12000,
    laborPer10Acres: 4,
    paybackMonths: 7,
  },
  polyhouse: {
    name: "Protected High-Tech Polyhouse",
    crops: "Red/Yellow Capsicum, Cucumber, Hydroponics",
    capexAcre: 12.5, // ₹ 12.5 Lakhs / acre for high tech polyhouse
    yieldPerAcreTons: 45,
    revenuePerTon: 42000, // ₹ 42,000 / ton premium
    plugsPerAcre: 14000,
    laborPer10Acres: 8,
    paybackMonths: 18,
  },
  fruits: {
    name: "High-Value Orchards & Fruits",
    crops: "Pomegranate, Papaya, Dragon Fruit",
    capexAcre: 3.2, // ₹ 3.2 Lakhs / acre
    yieldPerAcreTons: 18,
    revenuePerTon: 35000,
    plugsPerAcre: 1200,
    laborPer10Acres: 3,
    paybackMonths: 14,
  },
};

export function CalculatorPanel({
  onRequestConsultation,
}: {
  onRequestConsultation?: (params: { acres: number; category: CropCategory }) => void;
}) {
  const [acres, setAcres] = useState<number>(25);
  const [cropCategory, setCropCategory] = useState<CropCategory>("vegetables");
  const [submitted, setSubmitted] = useState(false);

  const preset = CROP_PRESETS[cropCategory];

  // Calculations
  const totalCapExLakhs = Math.round(acres * preset.capexAcre * 10) / 10;
  const totalPlugs = Math.round(acres * preset.plugsPerAcre);
  const estimatedManpower = Math.max(2, Math.round((acres / 10) * preset.laborPer10Acres));
  const estimatedYieldTons = Math.round(acres * preset.yieldPerAcreTons);
  const grossRevenueLakhs = Math.round(((estimatedYieldTons * preset.revenuePerTon) / 100000) * 10) / 10;
  const netProfitLakhs = Math.round(grossRevenueLakhs * 0.45 * 10) / 10; // ~45% net margin

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onRequestConsultation) {
      onRequestConsultation({ acres, category: cropCategory });
    } else {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="rounded-[2.5rem] border border-border bg-bone p-8 md:p-10 shadow-sm text-left relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-10">
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, var(--color-terracotta) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mb-8">
        <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta block mb-1">
          Interactive CapEx & Revenue Engine
        </span>
        <h3 className="font-serif text-3xl font-bold text-forest-deep md:text-4xl">
          Commercial Farm Cost & ROI Estimator
        </h3>
        <p className="text-sm text-forest/70 mt-1 max-w-2xl">
          Adjust acreage and crop selection to dynamically project infrastructure capital investment,
          plug seedling requirements, SOP labor schedule, and expected harvest returns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Inputs Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Acreage Slider & Quick Presets */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold uppercase text-forest/70">
                Total Land Size: <span className="text-forest-deep font-serif text-xl font-bold">{acres} Acres</span>
              </label>
              <span className="font-jet text-[10px] text-terracotta font-bold uppercase">5 – 500+ Acres</span>
            </div>

            <input
              type="range"
              min={5}
              max={500}
              step={5}
              value={acres}
              onChange={(e) => setAcres(parseInt(e.target.value))}
              className="w-full h-2 bg-bone rounded-lg appearance-none cursor-pointer accent-forest"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {[10, 25, 50, 100, 250, 500].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAcres(a)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    acres === a
                      ? "bg-forest text-cream shadow-xs"
                      : "bg-bone text-forest/70 hover:bg-forest/10"
                  }`}
                >
                  {a} Acres
                </button>
              ))}
            </div>
          </div>

          {/* Crop Category Selector */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
            <label className="text-xs font-mono font-bold uppercase text-forest/70 block">
              Select Crop & Farming Model
            </label>

            {(
              [
                ["vegetables", "Commercial Open-Field Vegetables", "Tomato, Chilli, Watermelon"],
                ["polyhouse", "Protected Polyhouse / Hydroponics", "Capsicum, Cucumber"],
                ["fruits", "High-Value Orchards & Fruits", "Pomegranate, Papaya, Dragon Fruit"],
              ] as const
            ).map(([cat, title, desc]) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCropCategory(cat as CropCategory)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  cropCategory === cat
                    ? "border-terracotta bg-terracotta/5 shadow-xs"
                    : "border-border/60 bg-bone/40 hover:border-forest/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-forest-deep">{title}</span>
                  {cropCategory === cat && <span className="h-2 w-2 rounded-full bg-terracotta" />}
                </div>
                <span className="text-[11px] text-forest/60 block mt-0.5">{desc}</span>
              </button>
            ))}
          </div>

          {/* CTA Action */}
          <button
            type="button"
            onClick={handleFormSubmit}
            className="w-full rounded-2xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <ClipboardText className="h-4 w-4" />
            <span>Request Custom Turnkey Advisory</span>
          </button>
        </div>

        {/* Right Output Calculations Card (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-forest/20 bg-card p-8 shadow-sm space-y-6 relative">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="font-jet text-[10px] uppercase tracking-widest text-forest/40 font-bold block">
                  Projected Financials
                </span>
                <h4 className="font-serif text-2xl font-bold text-forest-deep">
                  Estimated Outputs ({acres} Acres · {preset.name})
                </h4>
              </div>
              <span className="rounded-full bg-moss/10 border border-moss/20 px-3 py-1 font-jet text-[10px] font-bold text-moss">
                Zero Guesswork SOP Mapped
              </span>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <MetricBox
                icon={CurrencyDollar}
                label="Estimated CapEx"
                value={`₹${totalCapExLakhs >= 100 ? (totalCapExLakhs / 100).toFixed(2) + " Cr" : totalCapExLakhs + " Lakhs"}`}
                subtitle={`@ ₹${preset.capexAcre} L/Acre`}
                highlight
              />
              <MetricBox
                icon={Plant}
                label="Bio-Boosted Plugs"
                value={totalPlugs.toLocaleString("en-IN")}
                subtitle="High vigor seedlings"
              />
              <MetricBox
                icon={Users}
                label="Labor & Supervisors"
                value={`${estimatedManpower} Personnel`}
                subtitle="Standardized SOPs"
              />
              <MetricBox
                icon={TrendUp}
                label="Est. Gross Yield"
                value={`${estimatedYieldTons.toLocaleString("en-IN")} Tons`}
                subtitle="First harvest cycle"
              />
              <MetricBox
                icon={TrendUp}
                label="Projected Revenue"
                value={`₹${grossRevenueLakhs >= 100 ? (grossRevenueLakhs / 100).toFixed(2) + " Cr" : grossRevenueLakhs + " Lakhs"}`}
                subtitle="Market Buyback Linked"
                highlight
              />
              <MetricBox
                icon={Clock}
                label="Payback Period"
                value={`~${preset.paybackMonths} Months`}
                subtitle="Breakeven horizon"
              />
            </div>

            {/* CapEx Breakdown Bar */}
            <div className="mt-6 rounded-2xl border border-forest/10 bg-bone/60 p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-forest-deep">
                <span>Infrastructure Breakdown & Input Allocation</span>
                <span className="text-terracotta">100% Turnkey Scope</span>
              </div>

              <div className="h-3 w-full rounded-full bg-border overflow-hidden flex">
                <div className="h-full bg-forest" style={{ width: "35%" }} title="Drip & Fertigation 35%" />
                <div className="h-full bg-terracotta" style={{ width: "25%" }} title="Mulching & Soil Prep 25%" />
                <div className="h-full bg-moss" style={{ width: "25%" }} title="Bio Plugs & Inputs 25%" />
                <div className="h-full bg-forest-deep" style={{ width: "15%" }} title="Telemetry & Storage 15%" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-jet text-[9px] uppercase tracking-wider text-forest/70 pt-1">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-forest" /> Drip (35%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-terracotta" /> Beds (25%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-moss" /> Seeds (25%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-forest-deep" /> AgTech (15%)</span>
              </div>
            </div>

            <p className="text-[11px] text-forest/60 italic leading-relaxed">
              * Note: Estimates are based on empirical historical crop performance from Agaate's 15,000+ acre managed network. Actual returns are customized following a physical soil core and slope survey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricBox({
  icon: Icon,
  label,
  value,
  subtitle,
  highlight = false,
}: {
  icon: any;
  label: string;
  value: string;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 text-left transition-all ${
        highlight
          ? "border-terracotta/30 bg-terracotta/5"
          : "border-border/60 bg-bone/40"
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className={`h-4 w-4 ${highlight ? "text-terracotta" : "text-forest/60"}`} />
        <span className="font-jet text-[9px] font-bold uppercase tracking-wider text-forest/60">
          {label}
        </span>
      </div>
      <div className="font-serif text-xl font-bold text-forest-deep line-clamp-1">{value}</div>
      <span className="text-[10px] text-forest/50 block mt-0.5">{subtitle}</span>
    </div>
  );
}
