import {
  ArrowRight,
  Buildings,
  Drop,
  Plant,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import farmerAdvisorImg from "@/assets/about-farmer-advisor.png";
import { getLocalizedPath } from "@/lib/i18n";
import { CountUp, Reveal } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

const impactMetrics = [
  {
    numValue: 15000,
    suffix: "+",
    label: "Under Association",
    icon: Plant,
  },
  {
    numValue: 2000,
    suffix: "+",
    label: "Agaate Parivaar",
    icon: Users,
  },
  {
    numValue: 500,
    suffix: "+",
    label: "Verified SKUs",
    icon: ShoppingBag,
  },
  {
    numValue: 25,
    suffix: "+",
    label: "Direct Manufacturers",
    icon: Buildings,
  },
  {
    numValue: 200,
    suffix: "+",
    label: "Precision Drip Kits",
    icon: Drop,
  },
  {
    numValue: 20,
    suffix: "+",
    label: "On-Ground Kisan Sathis",
    icon: ShieldCheck,
  },
];

export default function ImpactScaleReach() {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? "en";

  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
        {/* Section Header */}
        <Reveal variant="fade-up" className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Impact Scale &amp; Reach
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="impact-heading"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl"
            >
              2,000+ Farmers trust Agaate across{" "}
              <span className="text-[#5d7d37]">15,000+ acres</span>
            </h2>

            <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
              Concentrated operational scale delivering direct-from-brand inputs, doorstep logistics,
              and Senior Agronomist guidance to maximize yield and farmer income.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Field Photo */}
          <Reveal variant="fade-up" className="lg:col-span-5">
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-2xl border border-[#143d31]/10 bg-[#143d31]/5 shadow-xs">
              <img
                src={farmerAdvisorImg}
                alt="Agaate farmer and agronomist in the field"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 backdrop-blur-md p-3 border border-[#143d31]/10 shadow-xs flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                  North India Operations
                </span>
                <span className="font-mono text-[10px] font-semibold text-[#5d7d37]">
                  Gurugram · Haryana
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Metric Grid + Action */}
          <Reveal variant="fade-up" delay={0.15} className="space-y-8 lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {impactMetrics.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="group rounded-xl border border-[#143d31]/10 bg-white p-4 transition-all hover:border-[#5d7d37]/40 hover:shadow-xs"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#143d31]/10 text-[#143d31] transition-transform group-hover:scale-105 mb-3">
                      <Icon weight="duotone" className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#143d31]">
                        <CountUp to={m.numValue} suffix={m.suffix} />
                      </p>
                      <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                        {m.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <SlideUpPillButton
                to={getLocalizedPath("/", currentLang)}
                variant="dark"
                size="md"
                label="Explore Agri Services"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
