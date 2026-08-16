import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  CheckCircle,
  Clock,
  Compass,
  Hammer,
  Images,
  ShieldCheck,
  Sparkle,
  TrendUp,
} from "@phosphor-icons/react";
import { CountUp, MagneticButton, TiltCard } from "@/components/common/motion";
import { PhaseTimeline } from "@/components/big-farm-setup/PhaseTimeline";
import { BeforeAfter } from "@/components/big-farm-setup/BeforeAfter";
import { CalculatorPanel } from "@/components/big-farm-setup/Calculator";

interface UnifiedBigFarmSectionProps {
  onOpenTurnkeyModal: () => void;
}

export function UnifiedBigFarmSection({ onOpenTurnkeyModal }: UnifiedBigFarmSectionProps) {
  const [activeTab, setActiveTab] = useState<"calc" | "timeline" | "beforeafter">("calc");

  return (
    <section
      id="big-farm-setup"
      className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-20 lg:py-28 border-t border-[#143d31]/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-16">
        {/* ── 2-Column Hero Spotlight ── */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Visual Column (Left) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <TiltCard maxTilt={6} glare={false} className="w-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full overflow-hidden rounded-3xl bg-[#f4f8f5] p-4 flex items-center justify-center border border-[#143d31]/10 shadow-lg"
              >
                <img
                  src="/agro-park.jpg"
                  alt="Big Farm Turnkey Setup"
                  className="w-full max-h-[420px] rounded-2xl object-cover transition-transform duration-500 shadow-md"
                />

                <div className="absolute top-7 left-7 rounded-full bg-[#143d31] px-3.5 py-1 font-mono text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                  <span>10 - 500+ Acre Turnkey Execution</span>
                </div>
              </motion.div>
            </TiltCard>
          </div>

          {/* Text Column (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl lg:pl-4 space-y-4">
            {/* Division Tag */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-base sm:text-lg font-extrabold text-[#5d7d37]">
                05
              </span>
              <span className="h-3.5 w-[1.5px] bg-[#143d31]/20" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#143d31]">
                Big Farm Turnkey Setup
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.12]">
              Turnkey commercial farms.{" "}
              <span className="font-serif italic font-normal text-[#5d7d37]">
                From bare land to first harvest.
              </span>
            </h2>

            {/* Subtext Description */}
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">
              Complete commercial orchard and high-density vegetable farm establishment. Hydraulic
              drip engineering, laser land leveling, polyhouse construction, specialized mulching,
              and dedicated on-site agronomist management.
            </p>

            {/* Metrics Strip */}
            <div className="my-6 border-y border-[#143d31]/12 py-4 grid grid-cols-3 gap-2">
              <div className="text-left first:border-l-0 first:pl-0">
                <p className="font-display text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={15000} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] mt-0.5">
                  Acres Managed
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/30 pl-3">
                <p className="font-display text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={6} suffix=" Phases" />
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] mt-0.5">
                  Engineering SOPs
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/30 pl-3">
                <p className="font-display text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={100} suffix="%" />
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] mt-0.5">
                  Turnkey Delivery
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "Precision hydraulic drip & venturi fertigation",
                "Silver-black thermal regulating mulching",
                "Bamboo vertical trellising systems",
                "Dedicated resident agronomy supervisor",
              ].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#143d31]"
                >
                  <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Interactive Big Farm Tools Workbench ── */}
        <div className="rounded-[2.5rem] border border-[#143d31]/10 bg-[#f4f8f5] p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#143d31]/10 pb-5">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                COMMERCIAL ESTIMATOR & ENGINEERING TIMELINE
              </span>
              <h3 className="font-display text-2xl font-bold text-[#143d31]">
                Acreage Cost Model & Transformation Phases
              </h3>
            </div>

            {/* Tool Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "calc", label: "Acreage Cost Calculator", icon: Calculator },
                { id: "timeline", label: "6-Phase Engineering SOPs", icon: Clock },
                { id: "beforeafter", label: "Before/After Slider", icon: Images },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#143d31] text-white shadow-sm"
                        : "border border-[#143d31]/15 bg-white text-[#4f624f] hover:border-[#143d31]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="pt-2">
            {activeTab === "calc" && <CalculatorPanel onRequestConsultation={onOpenTurnkeyModal} />}
            {activeTab === "timeline" && <PhaseTimeline />}
            {activeTab === "beforeafter" && <BeforeAfter />}
          </div>
        </div>
      </div>
    </section>
  );
}
