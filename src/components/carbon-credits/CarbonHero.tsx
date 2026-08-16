import { ArrowRight } from "@phosphor-icons/react";
import {
  CountUp,
  MagneticButton,
  Marquee,
  PageHero,
  Stagger,
  StaggerItem,
} from "@/components/common/motion";
import { HeroCo2Visual } from "./hero-visual";
import { creditFacts, marqueeItems, RATE } from "./data";

const stats = [
  { to: 1, suffix: " tCO₂e", label: "= 1 Verified Carbon Credit" },
  { to: 5, suffix: "", label: "Qualifying Sustainable Practices" },
  { to: 4, suffix: " Steps", label: "End-to-End MRV Process" },
  { to: RATE, prefix: "₹", suffix: "", label: "Payout Rate Per Verified Credit" },
];

export function CarbonHero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <PageHero
          eyebrow="Service Vertical · 04 · Agaate Carbon Initiative"
          title={
            <>
              Earn Extra Payouts by Farming Sustainably —{" "}
              <span className="italic text-terracotta">1 Tonne CO₂ = 1 Verified Credit.</span>
            </>
          }
          description="Good farming already saves carbon. Agaate helps you measure, verify, and monetise it — turning sustainable practices into a brand-new income stream, with no extra land required."
        >
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <MagneticButton onClick={onOpenModal}>
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-forest-deep px-8 py-4 text-sm font-bold text-cream shadow-xl shadow-forest/20 transition-colors hover:bg-forest">
                Enrol Your Farm
                <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>
            <span className="font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-forest/70">
              1 tCO₂e = 1 Verified Credit (₹1,200/Credit)
            </span>
          </div>
        </PageHero>
        <HeroCo2Visual />
      </div>

      {/* Marquee Banner */}
      <div className="relative border-y border-border bg-forest-deep py-3 text-cream">
        <Marquee duration={34}>
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="mx-4 inline-flex items-center gap-8 font-jet text-[11px] font-bold uppercase tracking-[0.22em] text-cream/90"
            >
              {item}
              <span className="text-moss">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Stats Bar */}
      <div className="mx-auto mt-12 w-full max-w-7xl px-6 lg:px-12">
        <Stagger
          className="grid grid-cols-2 gap-6 rounded-3xl border border-forest/10 bg-bone px-8 py-8 shadow-sm sm:grid-cols-4"
          stagger={0.1}
        >
          {stats.map((s) => (
            <StaggerItem key={s.label} variant="fade-up" className="text-center">
              <p className="font-serif text-4xl font-bold text-forest-deep md:text-5xl">
                <CountUp to={s.to} prefix={s.prefix ?? ""} suffix={s.suffix} />
              </p>
              <p className="mt-2 font-jet text-[9px] font-bold uppercase tracking-[0.18em] text-forest/60">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </>
  );
}
