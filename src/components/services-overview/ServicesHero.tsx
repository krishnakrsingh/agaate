import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Coins,
  Leaf,
  Plant,
  ShieldCheck,
  Sparkle,
  Truck,
} from "@phosphor-icons/react";
import { EASE, MagneticButton, Marquee, PageHero } from "@/components/common/motion";
import { getLocalizedPath } from "@/lib/i18n";

export function ServicesHero({ currentLang }: { currentLang: string }) {
  const badges = [
    { label: "+40% Seedling Survival", icon: Plant },
    { label: "17-Acre Smart Nursery", icon: Leaf },
    { label: "Zero Seed Waste", icon: ShieldCheck },
    { label: "MRV Carbon Payouts", icon: Coins },
    { label: "Guaranteed Buyback", icon: Truck },
    { label: "2,000+ Parivaar Farmers", icon: CheckCircle },
  ];

  const marqueeItems = [
    "17-Acre Smart Nursery",
    "Kisaan Mall 500+ SKUs",
    "AI Leaf Diagnostics",
    "Carbon Credit MRV",
    "Turnkey Big Farm Setup",
    "Direct Supermarket Buyback",
    "Bio-Boosted Saplings",
    "Kisan Sathi On-Field Advisory",
  ];

  return (
    <>
      <PageHero
        eyebrow="AGAATE INTEGRATED AGTECH SERVICES"
        title={
          <>
            From Seed to Sale. <br />
            <span className="italic text-terracotta">Science-Backed Farming.</span>
          </>
        }
        description="Empowering Indian farmers with Bio-Boosted nursery stock, stage-wise precision inputs, AI crop advisory, carbon credit rewards, turnkey farm setup, and direct buyback market linkage."
      >
        {/* Floating Badges */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {badges.map((badge, idx) => {
            const BIcon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-card/80 px-4 py-2 font-mono text-xs font-bold text-forest-deep shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-forest"
              >
                <BIcon className="h-3.5 w-3.5 text-moss" />
                <span>{badge.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton as="a" href="#services-grid" strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-7 py-3.5 text-sm font-bold text-cream shadow-xl transition-colors hover:bg-forest">
              Explore 6 Services <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>
          <MagneticButton as="a" href={getLocalizedPath("/contact", currentLang)} strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-card px-7 py-3.5 text-sm font-bold text-forest-deep shadow-sm hover:bg-cream">
              Book Free Farm Audit
            </span>
          </MagneticButton>
        </div>
      </PageHero>

      {/* Marquee Strip */}
      <div className="overflow-hidden border-b border-border bg-card/70 py-4">
        <Marquee duration={32}>
          {marqueeItems.map((item) => (
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
