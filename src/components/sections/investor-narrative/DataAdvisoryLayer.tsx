import { Link, useParams } from "@tanstack/react-router";
import type { ComponentType } from "react";
import {
  ArrowRight,
  CircuitBoard,
  ClipboardCheck,
  Network,
  PhoneCall,
  ScanLine,
  WalletCards,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const moduleIcons: IconType[] = [PhoneCall, ClipboardCheck, CircuitBoard, ScanLine];

export function DataAdvisoryLayer() {
  const { t, i18n } = useTranslation("investor");
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";
  const modules = t("dataAdvisory.modules", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const pillars = t("dataAdvisory.platformPillars", { returnObjects: true }) as string[];

  return (
    <section className="bg-cream px-6 py-10 text-ink lg:px-12 lg:py-14">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 grid gap-4 border-t border-ink/10 pt-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <span className="font-jet text-[10px] md:text-xs uppercase tracking-[0.22em] text-forest font-semibold">
              {t("dataAdvisory.eyebrow")}
            </span>
            <h2 className="mt-2 font-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] text-forest-deep">
              {t("dataAdvisory.title")}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[14px] leading-[1.6] text-ink/75 md:text-[15px]">
              {t("dataAdvisory.desc")}
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-4 lg:grid-cols-12">
          {Array.isArray(modules) && modules.map((module, idx) => {
            const Icon = moduleIcons[idx];
            return (
              <div
                key={idx}
                className="group lg:col-span-3 rounded-2xl border border-ink/5 bg-card p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-forest/20 hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bone group-hover:bg-forest/10 transition-colors duration-300">
                  <Icon className="h-4.5 w-4.5 text-forest" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-[1.2rem] md:text-[1.3rem] leading-tight text-forest-deep">
                  {module.title}
                </h3>
                <p className="mt-2 text-[12px] md:text-[13px] leading-relaxed text-ink/70">
                  {module.desc}
                </p>
              </div>
            );
          })}

          <div className="lg:col-span-7 rounded-2xl border border-ink/5 bg-card p-5 lg:p-6 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
            {/* Subtle decorative background element */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 h-64 w-64 rounded-full bg-forest/[0.03] blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta/10">
                  <Network className="h-4 w-4 text-terracotta" />
                </div>
                <span className="font-jet text-[10px] md:text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                  {t("dataAdvisory.platformEyebrow")}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-3 mt-auto">
                {Array.isArray(pillars) && pillars.map((pillar, idx) => (
                  <div key={idx} className="border-t border-ink/10 pt-3">
                    <h4 className="font-serif text-[1.1rem] md:text-[1.2rem] text-forest-deep">
                      {pillar}
                    </h4>
                    <p className="mt-1.5 text-[12px] md:text-[13px] leading-relaxed text-ink/70">
                      {t("dataAdvisory.platformDesc")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-forest/15 bg-forest/[0.02] p-5 lg:p-6 shadow-sm group hover:bg-forest/[0.04] transition-colors duration-300 flex flex-col">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest/15">
              <WalletCards className="h-4.5 w-4.5" strokeWidth={1.75} />
            </div>
            <h3 className="font-serif text-[1.5rem] md:text-[1.8rem] leading-tight text-forest-deep">
              {t("dataAdvisory.carbonTitle")}
            </h3>
            <p className="mt-2 text-[13px] md:text-[14px] leading-relaxed text-ink/80 flex-grow">
              {t("dataAdvisory.carbonDesc")}
            </p>
            <div className="mt-5">
              <Link
                to={getLocalizedPath("/technology", currentLang) as any}
                className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-[12px] md:text-[13px] font-semibold text-cream transition-all duration-300 hover:bg-forest-deep hover:shadow-lg hover:shadow-forest/20 group-hover:-translate-y-0.5"
              >
                {t("dataAdvisory.carbonCta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
