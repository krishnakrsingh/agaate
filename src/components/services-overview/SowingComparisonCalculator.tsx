"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle, TrendUp, Sparkle, Plant, ShieldCheck } from "@phosphor-icons/react";

export function SowingComparisonCalculator() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const [calculatorAcres, setCalculatorAcres] = useState<number>(5);

  const presets = [1, 5, 10, 25, 50];

  // Economic Modeling Constants
  const chemicalCostPerAcreDirect = 18000;
  const chemicalCostPerAcreBio = 7500; // ₹10,500/ac savings (58% drop)
  const yieldPerAcreDirectQuintals = 120;
  const yieldPerAcreBioQuintals = 150; // +25% harvest gain
  const pricePerQuintal = 1800;

  // Live Calculations
  const totalRevenueDirect = calculatorAcres * yieldPerAcreDirectQuintals * pricePerQuintal;
  const totalRevenueBio = calculatorAcres * yieldPerAcreBioQuintals * pricePerQuintal;
  const extraRevenue = totalRevenueBio - totalRevenueDirect;
  const chemicalSavings = calculatorAcres * (chemicalCostPerAcreDirect - chemicalCostPerAcreBio);
  const totalNetGain = extraRevenue + chemicalSavings;

  return (
    <section
      id="comparison-slider"
      className="scroll-mt-28 py-16 sm:py-20 md:py-24 bg-[#f4f8f5] border-t border-[#143d31]/10 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Calculator & Live Key Metrics */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                  {isHindi ? "04 · आर्थिक लाभ सिम्युलेटर" : "04 · Farm ROI Simulator"}
                </p>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1]">
                {isHindi
                  ? "अपनी फसल का अतिरिक्त शुद्ध मुनाफा जानें"
                  : "Calculate Your Real Seasonal Profit Surge"}
              </h2>

              <p className="font-sans text-[#4f624f] text-sm sm:text-base leading-relaxed">
                {isHindi
                  ? "रकबा चुनें और देखें कि बायो-प्लग नर्सरी और वैज्ञानिक पोषण से कितनी सीधी नकद बचत होती है।"
                  : "Adjust your cultivated acreage to see verified sapling survival, chemical savings, and harvest gains."}
              </p>
            </div>

            {/* Acreage Controller */}
            <div className="border-y border-[#143d31]/10 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                    {isHindi ? "खेती का रकबा:" : "Cultivated Area:"}
                  </span>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31]">
                    {calculatorAcres}{" "}
                    <span className="font-sans text-sm font-semibold text-[#4f624f]">
                      {isHindi ? "एकड़" : "Acres"}
                    </span>
                  </p>
                </div>

                {/* Quick Presets */}
                <div className="flex gap-1.5">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCalculatorAcres(preset)}
                      className={`cursor-pointer rounded-full px-3 py-1 font-mono text-xs font-bold transition-all ${
                        calculatorAcres === preset
                          ? "bg-[#143d31] text-[#a3e635]"
                          : "border border-[#143d31]/15 bg-white text-[#143d31] hover:bg-white/90"
                      }`}
                    >
                      {preset}A
                    </button>
                  ))}
                </div>
              </div>

              <input
                id="acreage-range"
                type="range"
                min={1}
                max={50}
                value={calculatorAcres}
                onChange={(e) => setCalculatorAcres(Number(e.target.value))}
                className="w-full h-2 bg-[#143d31]/15 rounded-lg appearance-none cursor-pointer accent-[#143d31]"
              />
            </div>

            {/* 3 High-Impact Live Metrics (Clean Line Rows) */}
            <div className="grid grid-cols-3 gap-4 border-b border-[#143d31]/10 pb-6">
              <div className="border-l-2 border-[#5d7d37] pl-3">
                <p className="font-display text-xl sm:text-2xl font-bold text-[#143d31]">98%</p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "पौध जमाव" : "Survival"}
                </p>
                <span className="font-sans text-[11px] text-[#4f624f] block mt-0.5">
                  {isHindi ? "+38% अधिक" : "+38% vs Sowing"}
                </span>
              </div>

              <div className="border-l-2 border-[#5d7d37] pl-3">
                <p className="font-display text-xl sm:text-2xl font-bold text-[#143d31]">-58%</p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "खाद खर्च बचत" : "Input Savings"}
                </p>
                <span className="font-sans text-[11px] text-[#4f624f] block mt-0.5">
                  ₹10.5k/ac {isHindi ? "बचत" : "saved"}
                </span>
              </div>

              <div className="border-l-2 border-[#5d7d37] pl-3">
                <p className="font-display text-xl sm:text-2xl font-bold text-[#143d31]">+25%</p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "कुल उपज" : "Yield Gain"}
                </p>
                <span className="font-sans text-[11px] text-[#4f624f] block mt-0.5">
                  +30 Qtl/ac
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Real Imagery with Live Overlay Telemetry */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#143d31]/10 bg-[#143d31]/5 shadow-xl">
              <img
                src="/services/hero-precision-farm.jpg"
                alt="Precision farming yield results"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-[#143d31]/90 backdrop-blur-md px-3.5 py-1 text-xs font-mono font-bold text-[#a3e635] border border-white/10">
                <Sparkle className="h-3.5 w-3.5" weight="fill" />
                <span>{isHindi ? "लाइव सिमुलेशन" : "Verified Field Model"}</span>
              </div>

              {/* Bottom Live Calculated Return Telemetry */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#a3e635] block mb-1">
                  {isHindi ? `कुल अतिरिक्त शुद्ध लाभ (${calculatorAcres} एकड़)` : `Estimated Net Profit Delta (${calculatorAcres} Acres)`}
                </span>

                <p className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  +₹{totalNetGain.toLocaleString("en-IN")}
                </p>

                <p className="font-sans text-xs text-white/80 mt-1">
                  {isHindi
                    ? `₹${extraRevenue.toLocaleString("en-IN")} अतिरिक्त उपज + ₹${chemicalSavings.toLocaleString("en-IN")} रासायनिक खाद बचत`
                    : `Combines ₹${extraRevenue.toLocaleString("en-IN")} extra harvest + ₹${chemicalSavings.toLocaleString("en-IN")} chemical savings`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
