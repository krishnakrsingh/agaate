import { useRef, type ComponentType } from "react";
import {
  CircuitBoard,
  ClipboardCheck,
  Network,
  PhoneCall,
  ScanLine,
  WalletCards,
} from "lucide-react";
import { Eyebrow, PrimaryCta } from "./Shared";
import { useTranslation } from "react-i18next";
import { useSectionReveal } from "@/hooks/useSectionReveal";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const moduleIcons: IconType[] = [PhoneCall, ClipboardCheck, CircuitBoard, ScanLine];

export function DataAdvisoryLayer() {
  const { t } = useTranslation("investor");
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const modules = t("dataAdvisory.modules", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;
  const pillars = t("dataAdvisory.platformPillars", { returnObjects: true }) as string[];

  return (
    <section
      ref={sectionRef}
      id="operating-model"
      className="bg-cream px-6 py-16 text-ink lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-6 border-t border-ink/10 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow>{t("dataAdvisory.eyebrow")}</Eyebrow>
            <h2 className="mt-5 font-display font-light text-[clamp(1.9rem,3.5vw,3.2rem)] leading-[1.08] tracking-[-0.035em] text-forest-deep">
              {t("dataAdvisory.title")}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] leading-[1.7] text-ink/60 md:text-[16px]">
              {t("dataAdvisory.desc")}
            </p>
          </div>
        </div>

        <div className="border-t border-ink/10">
          {Array.isArray(modules) &&
            modules.map((module, idx) => {
              const Icon = moduleIcons[idx];
              return (
                <div
                  key={idx}
                  className="grid grid-cols-12 items-start gap-4 border-b border-ink/10 py-7 md:gap-8"
                >
                  <div className="col-span-2 md:col-span-1 pt-1">
                    <Icon className="h-5 w-5 text-forest" strokeWidth={1.5} />
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="font-display font-medium text-[1.25rem] md:text-[1.4rem] leading-tight tracking-[-0.02em] text-forest-deep">
                      {module.title}
                    </h3>
                  </div>
                  <p className="col-span-10 col-start-3 md:col-span-7 md:col-start-6 text-[14px] leading-relaxed text-ink/60 md:text-[15px]">
                    {module.desc}
                  </p>
                </div>
              );
            })}
        </div>

        <div className="mt-12 grid gap-10 border-t border-ink/10 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <Network className="h-4 w-4 text-forest" strokeWidth={1.75} />
              <span className="font-jet text-[12px] uppercase tracking-[0.1em] text-forest font-bold">
                {t("dataAdvisory.platformEyebrow")}
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {Array.isArray(pillars) &&
                pillars.map((pillar, idx) => (
                  <div key={idx} className="border-t border-ink/10 pt-4">
                    <h4 className="font-display font-medium text-[1.15rem] tracking-[-0.02em] text-forest-deep">
                      {pillar}
                    </h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
                      {t("dataAdvisory.platformDesc")}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="lg:col-span-5 border-t border-ink/10 pt-4 lg:border-t-0 lg:border-l lg:border-ink/10 lg:pt-0 lg:pl-10">
            <WalletCards className="h-5 w-5 text-forest mb-4" strokeWidth={1.75} />
            <h3 className="font-display font-light text-[clamp(1.5rem,2.5vw,2rem)] leading-tight tracking-[-0.03em] text-forest-deep">
              {t("dataAdvisory.carbonTitle")}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink/60">
              {t("dataAdvisory.carbonDesc")}
            </p>
            <div className="mt-6">
              <PrimaryCta href="/services/carbon-credits">
                {t("dataAdvisory.carbonCta")}
              </PrimaryCta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
