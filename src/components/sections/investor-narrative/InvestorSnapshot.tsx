import { useRef, type ComponentType } from "react";
import { BarChart3, Boxes, Factory, Handshake, Tractor, Users } from "lucide-react";
import { Eyebrow, PrimaryCta, SecondaryCta } from "./Shared";
import { useTranslation } from "react-i18next";
import { useSectionReveal } from "@/hooks/useSectionReveal";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const metricIcons: IconType[] = [BarChart3, Users, Handshake, Boxes, Tractor, Factory];

export function InvestorSnapshot() {
  const { t } = useTranslation("investor");
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="investor-snapshot"
      className="bg-card px-6 pt-20 pb-10 text-ink lg:px-12 lg:pt-28 lg:pb-14"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 border-t border-ink/10 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{t("investorSnapshot.eyebrow")}</Eyebrow>
            <h2 className="mt-5 max-w-4xl font-display font-light text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.05] tracking-[-0.035em] text-forest-deep">
              {t("investorSnapshot.title")}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[16px] leading-[1.75] text-ink/60 md:text-[18px]">
              {t("investorSnapshot.desc")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <PrimaryCta href="/contact">{t("investorSnapshot.cta1")}</PrimaryCta>
              <SecondaryCta href="#operating-model">{t("investorSnapshot.cta2")}</SecondaryCta>
            </div>
          </div>
        </div>

        <div className="grid border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {metricIcons.map((Icon, idx) => (
            <div
              key={idx}
              className="border-b border-ink/10 p-6 md:p-8 sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <Icon className="h-5 w-5 text-forest" strokeWidth={1.7} />
                <span className="font-jet text-[10px] uppercase tracking-[0.1em] text-ink/35">
                  {t("investorSnapshot.proofPoint")}
                </span>
              </div>
              <div className="font-display font-light text-[clamp(2.2rem,4vw,3.5rem)] leading-none tracking-[-0.035em] text-forest-deep">
                {t(`investorSnapshot.metrics.${idx}.value` as any)}
              </div>
              <h3 className="mt-3 text-[15px] font-semibold text-ink md:text-[16px]">
                {t(`investorSnapshot.metrics.${idx}.label` as any)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">
                {t(`investorSnapshot.metrics.${idx}.note` as any)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 border border-forest/15 bg-forest/[0.03] p-5 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-sm leading-relaxed text-ink/60">{t("investorSnapshot.disclaimer")}</p>
          <SecondaryCta href="/contact">{t("investorSnapshot.ctaData")}</SecondaryCta>
        </div>
      </div>
    </section>
  );
}
