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
import { getCmsIcon } from "@/components/careers/icon-map";
import { useAboutPage } from "@/contexts/AboutPageContext";

const EXTRA_IMPACT_ICONS: Record<string, typeof Plant> = {
  plant: Plant,
  users: Users,
  warehouse: ShoppingBag,
  cap: Buildings,
  drop: Drop,
  handshake: ShieldCheck,
};

export default function ImpactScaleReach({ isHi = false }: { isHi?: boolean }) {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? "en";
  const { impactMetrics } = useAboutPage();

  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] py-10 sm:py-12 md:py-14 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-6 sm:space-y-8">
        <Reveal variant="fade-up" className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Impact Scale &amp; Reach
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
            <h2
              id="impact-heading"
              className="font-display font-bold text-2xl sm:text-3xl lg:text-[2.25rem] text-[#143d31] tracking-tight leading-[1.15] max-w-2xl"
            >
              2,000+ Farmers trust Agaate across{" "}
              <span className="text-[#5d7d37]">15,000+ acres</span>
            </h2>

            <p className="font-sans text-[#4f624f] text-xs sm:text-sm max-w-md leading-relaxed">
              Concentrated operational scale delivering direct-from-brand inputs, doorstep
              logistics, and Senior Agronomist guidance to maximize yield and farmer income.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <Reveal variant="fade-up" className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#143d31]/12 bg-[#143d31]/5 shadow-sm">
              <img
                src={farmerAdvisorImg}
                alt="Agaate farmer and agronomist in the field"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay={0.15} className="space-y-6 lg:col-span-7">
            {/* 2x2 Lines-Based Metrics Matrix */}
            <div className="grid grid-cols-2">
              {impactMetrics.map((m, idx) => {
                const suffix = isHi ? m.suffixHi : m.suffixEn;
                const label = isHi ? m.labelHi : m.labelEn;
                const isLeft = idx % 2 === 0;
                const isTop = idx < 2;

                return (
                  <div
                    key={label}
                    className={`flex flex-col justify-center transition-colors ${
                      isLeft ? "border-r border-[#143d31]/15 pr-5 sm:pr-8" : "pl-5 sm:pl-8"
                    } ${isTop ? "border-b border-[#143d31]/15 pb-5 sm:pb-6" : "pt-5 sm:pt-6"}`}
                  >
                    <p className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-[#143d31] leading-none">
                      <CountUp to={m.numValue} suffix={suffix} />
                    </p>
                    <p className="mt-2 font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#5d7d37]">
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <SlideUpPillButton
                to={getLocalizedPath("/#three-pillars", currentLang)}
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
