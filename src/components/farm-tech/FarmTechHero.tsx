import { motion } from "framer-motion";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import { EASE, MagneticButton, Marquee, PageHero } from "@/components/common/motion";
import { getLocalizedPath } from "@/lib/i18n";
import { TICKER } from "./farm-tech-data";

export function FarmTechHero({ currentLang }: { currentLang: string }) {
  return (
    <>
      <PageHero
        eyebrow="PRECISION SENSING & AUTOMATION"
        title={
          <>
            Smart Farming Powered by <br />
            <span className="italic text-terracotta">Real-Time Data & IoT.</span>
          </>
        }
        description="Subterranean soil probes, autonomous drone scouting, AI disease diagnostics, and automated fertigation systems — turning raw field data into bumper harvests."
      >
        <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs text-forest/70">
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-card/80 px-4 py-2 font-bold text-forest-deep shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            LoRa Sub-GHz Mesh: Live (3km Range)
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-card/80 px-4 py-2 font-bold text-forest-deep shadow-sm backdrop-blur">
            Multi-spectral Drone Sync: Active
          </span>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton as="a" href="#telemetry-cockpit" strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-7 py-3.5 text-sm font-bold text-cream shadow-xl transition-colors hover:bg-forest">
              Live Sensor Console <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>
          <MagneticButton as="a" href={getLocalizedPath("/contact", currentLang)} strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-card px-7 py-3.5 text-sm font-bold text-forest-deep shadow-sm hover:bg-cream">
              Deploy Farm IoT Kit
            </span>
          </MagneticButton>
        </div>
      </PageHero>

      {/* Ticker marquee */}
      <div className="overflow-hidden border-b border-border bg-card/70 py-4">
        <Marquee duration={30}>
          {TICKER.map((item) => (
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
