import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  ChartLineUp,
  CheckCircle,
  Clock,
  Coins,
  Globe,
  Leaf,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";
import { CountUp, MagneticButton, TiltCard } from "@/components/common/motion";
import {
  CarbonPracticesGrid,
  CarbonCalculator,
  MrvTimeline,
  CarbonAuditFeed,
} from "@/components/carbon-credits";

interface UnifiedCarbonCreditsSectionProps {
  onOpenEnrolModal: () => void;
}

export function UnifiedCarbonCreditsSection({
  onOpenEnrolModal,
}: UnifiedCarbonCreditsSectionProps) {
  const [activeTab, setActiveTab] = useState<"calc" | "practices" | "mrv" | "audit">("calc");

  return (
    <section
      id="carbon-credits"
      className="relative scroll-mt-24 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 lg:py-28 border-t border-[#143d31]/10"
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
                className="relative w-full overflow-hidden rounded-3xl bg-white p-6 sm:p-8 flex items-center justify-center border border-[#143d31]/10 shadow-lg"
              >
                <img
                  src="/carbon credits.png"
                  alt="Carbon Credits & Soil Health"
                  className="w-full max-h-[420px] object-contain transition-transform duration-500 drop-shadow-2xl"
                />

                <div className="absolute top-4 left-4 rounded-full bg-[#143d31] px-3.5 py-1 font-mono text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                  <span>Sentinel-2 Satellite MRV · Soil Organic Carbon</span>
                </div>
              </motion.div>
            </TiltCard>
          </div>

          {/* Text Column (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl lg:pl-4 space-y-4">
            {/* Division Tag */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-base sm:text-lg font-extrabold text-[#5d7d37]">
                04
              </span>
              <span className="h-3.5 w-[1.5px] bg-[#143d31]/20" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#143d31]">
                Carbon Credits & MRV
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.12]">
              Monetize soil carbon.{" "}
              <span className="font-serif italic font-normal text-[#5d7d37]">
                ₹1,200 per verified tonne.
              </span>
            </h2>

            {/* Subtext Description */}
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">
              Turn eco-friendly farming practices — reduced tillage, drip precision, organic
              bio-fertilization, and stubble retention — into verified carbon credits with direct
              bank payouts. No extra land needed.
            </p>

            {/* Metrics Strip */}
            <div className="my-6 border-y border-[#143d31]/12 py-4 grid grid-cols-3 gap-2">
              <div className="text-left first:border-l-0 first:pl-0">
                <p className="font-display text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={1200} prefix="₹" />
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] mt-0.5">
                  Payout Per tCO₂e
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/30 pl-3">
                <p className="font-display text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={15000} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] mt-0.5">
                  Acres Associated
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/30 pl-3">
                <p className="font-display text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={100} suffix="%" />
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] mt-0.5">
                  Satellite Verified
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "Zero crop burning verification via Sentinel-2",
                "Soil Organic Carbon baseline lab assays",
                "Annual direct bank deposit payouts",
                "Full compliance with Verra / Gold Standard MRV",
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

        {/* ── Interactive Carbon Tools Workbench ── */}
        <div className="rounded-[2.5rem] border border-[#143d31]/10 bg-white p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#143d31]/10 pb-5">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                CARBON REVENUE CALCULATOR & AUDIT TRAIL
              </span>
              <h3 className="font-display text-2xl font-bold text-[#143d31]">
                Estimate Carbon Payouts & Verified Practices
              </h3>
            </div>

            {/* Tool Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "calc", label: "Payout Calculator", icon: Calculator },
                { id: "practices", label: "5 Regenerative Practices", icon: Leaf },
                { id: "mrv", label: "MRV Timeline", icon: Clock },
                { id: "audit", label: "Live Audit Feed", icon: ShieldCheck },
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
                        : "border border-[#143d31]/15 bg-[#f4f8f5] text-[#4f624f] hover:border-[#143d31]"
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
            {activeTab === "calc" && <CarbonCalculator onOpenModal={onOpenEnrolModal} />}
            {activeTab === "practices" && <CarbonPracticesGrid />}
            {activeTab === "mrv" && <MrvTimeline />}
            {activeTab === "audit" && <CarbonAuditFeed />}
          </div>
        </div>
      </div>
    </section>
  );
}
