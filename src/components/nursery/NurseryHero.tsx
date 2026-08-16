import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Leaf, Plant, ShieldCheck, Sparkle } from "@phosphor-icons/react";
import { EASE, MagneticButton, Marquee, PageHero } from "@/components/common/motion";
import { getLocalizedPath } from "@/lib/i18n";

export function NurseryHero({ currentLang }: { currentLang: string }) {
  const tickerItems = [
    "Batch AG-2026-N8: 98% Survival Rate",
    "Bio-Boosted Inoculation: Biocure F + VAM Applied",
    "17-Acre Climate-Controlled Facility at Kukrola",
    "Pre-Order Open for Kharif & Rabi Hybrids",
    "Doorstep AC Logistics Across North India",
    "Zero Seed Waste Guarantee",
  ];

  return (
    <>
      <PageHero
        eyebrow="FLAGSHIP FACILITY · PACHGAON, GURUGRAM"
        title={
          <>
            Precision Seedlings Raised in <br />
            <span className="italic text-terracotta">17-Acre Climate Chambers.</span>
          </>
        }
        description="Bio-boosted containerized plug saplings with zero root shock, guaranteed 90-98% survival, and scientifically proven disease protection before leaving our facility."
      >
        <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs text-forest/70">
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-card/80 px-4 py-2 font-bold text-forest-deep shadow-sm backdrop-blur">
            <Plant className="h-4 w-4 text-emerald-600" />
            VAM Root Inoculated
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-card/80 px-4 py-2 font-bold text-forest-deep shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-moss" />
            Zero Damping-Off Fungal Loss
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-card/80 px-4 py-2 font-bold text-forest-deep shadow-sm backdrop-blur">
            <Leaf className="h-4 w-4 text-emerald-600" />
            Sterile Plug Coco-Peat Media
          </span>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton as="a" href="#seedling-calculator" strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-7 py-3.5 text-sm font-bold text-cream shadow-xl transition-colors hover:bg-forest">
              Calculate Acreage Plugs <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>
          <MagneticButton as="a" href={getLocalizedPath("/contact", currentLang)} strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-card px-7 py-3.5 text-sm font-bold text-forest-deep shadow-sm hover:bg-cream">
              Book Nursery Visit
            </span>
          </MagneticButton>
        </div>
      </PageHero>

      {/* Marquee */}
      <div className="overflow-hidden border-b border-border bg-card/70 py-4">
        <Marquee duration={28}>
          {tickerItems.map((item) => (
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
    </>
  );
}
