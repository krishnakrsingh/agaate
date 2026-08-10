import React from "react";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  PhoneCall,
  Building2,
  Microscope,
  Package,
  Store,
} from "lucide-react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { MagneticButton } from "@/components/common/motion";
import KisaanMallShowcase from "./KisaanMallShowcase";

const SUPPLY_CHAIN_STEPS = [
  {
    step: "01",
    title: "Direct Partner Sourcing",
    desc: "Sourced directly from 25+ certified seed & input manufacturers.",
    icon: Building2,
  },
  {
    step: "02",
    title: "QC Batch Verification",
    desc: "Every batch tested for germination, purity, and zero counterfeits.",
    icon: Microscope,
  },
  {
    step: "03",
    title: "Agaate Regional Hub",
    desc: "Stored in humidity-controlled warehouses until your order.",
    icon: Package,
  },
  {
    step: "04",
    title: "24-48h Farm Delivery",
    desc: "Delivered straight to your field gate across 15+ districts.",
    icon: Truck,
  },
];

export default function MallChapter() {
  const sectionRef = useHomeChapterReveal();

  return (
    <section
      ref={sectionRef}
      id="agaate-mall"
      className="relative scroll-mt-20 overflow-hidden bg-white px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section Header & Flagship Storefront Showcase ── */}
        <div data-home-reveal className="grid gap-8 lg:grid-cols-12 lg:items-center mb-14">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-sm font-extrabold text-[#5d7d37]">03</span>
              <span className="h-3.5 w-[1.5px] bg-[#143d31]/20" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#143d31]">
                AGAATE MALL · DIRECT INPUT COMMERCE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              Once you know what your crop needs,{" "}
              <span className="font-serif italic font-normal text-[#5d7d37]">
                getting authentic inputs direct from the source matters most.
              </span>
            </h2>
            <p className="font-sans border-l-2 border-[#5d7d37] pl-5 text-sm sm:text-base leading-relaxed text-[#4f624f] mt-5">
              Farmers shouldn't have to risk counterfeit inputs or guesswork. Agaate Mall operates a standalone, direct-to-farm supply engine—delivering batch-verified seeds, biologicals, drip systems, and UV mulch straight from certified partner hubs.
            </p>

            {/* Feature Cards on Left Side */}
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="rounded-2xl bg-[#f4f7ef] px-2.5 py-2.5 sm:px-4 sm:py-3 border border-[#143d31]/12 flex items-center gap-2 sm:gap-3 shadow-xs min-w-0">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-[#143d31] text-white">
                  <Store className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs font-extrabold text-[#143d31] leading-tight">
                    15+ Physical Hubs
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-[#536253] font-mono leading-tight mt-0.5">
                    Walk-in or Doorstep
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#143d31] px-2.5 py-2.5 sm:px-4 sm:py-3 text-white border border-[#a3e635]/30 flex items-center gap-2 sm:gap-3 shadow-md min-w-0">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-[#a3e635] text-[#143d31]">
                  <Truck className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs font-extrabold text-white leading-tight">
                    24-48h Delivery
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/90 font-mono leading-tight mt-0.5">
                    Direct to Field Gate
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <KisaanMallShowcase />
          </div>
        </div>

        {/* ── Agaate Direct Supply Guarantee (UNTOUCHED) ── */}
        <div data-home-reveal className="mt-16 rounded-3xl bg-[#fafbf7] p-6 sm:p-10 border border-[#143d31]/15 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#143d31] px-4 py-1 text-[11px] font-mono font-bold text-white uppercase tracking-widest mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
              AGAATE DIRECT SUPPLY GUARANTEE
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#143d31]">
              How Agaate Direct Supply Works
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#4f624f] mt-2 leading-relaxed">
              From certified brand factories to your field gate — every single batch is verified for germination, purity, and authenticity.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPLY_CHAIN_STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="group relative rounded-2xl bg-white p-5 border border-[#143d31]/10 hover:border-[#5d7d37] transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-extrabold text-[#5d7d37]">
                      STEP {s.step}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143d31] text-white group-hover:scale-110 transition-transform">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                  </div>
                  <h4 className="font-display text-sm font-bold text-[#143d31]">
                    {s.title}
                  </h4>
                  <p className="font-sans text-xs text-[#4f624f] leading-relaxed mt-1.5 font-normal">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div data-home-reveal className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-[#143d31] p-8 text-white shadow-xl">
          <div>
            <span className="font-mono text-xs font-bold text-white/90 uppercase tracking-widest">
              DIRECT AGRONOMIST RECOMMENDATION
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              Unsure which seed or bio-input matches your soil?
            </h3>
            <p className="font-sans text-xs text-white/75 mt-1">
              Talk directly with senior field experts to get exact dose calculations before placing your Agaate Mall order.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <MagneticButton strength={0.2} as="a" href="/services/kisaan-mall">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-7 py-3.5 text-xs font-extrabold text-[#143d31] hover:bg-[#b5f247] transition-colors cursor-pointer">
                <ShoppingBag className="h-4 w-4" />
                <span>Browse Full Store</span>
              </span>
            </MagneticButton>
            <a
              href="tel:9487263498"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition-colors"
            >
              <PhoneCall className="h-3.5 w-3.5 text-white" />
              <span>Call Agronomist</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
