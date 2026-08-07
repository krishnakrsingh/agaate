import { Link, useParams } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { ArrowUpRight, BarChart3, Boxes, Factory, Handshake, Tractor, Users } from "lucide-react";
import { Eyebrow, InlineCta } from "./Shared";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const metricIcons: IconType[] = [BarChart3, Users, Handshake, Boxes, Tractor, Factory];

export function InvestorSnapshot() {
  const { t, i18n } = useTranslation("investor");
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  return (
    <section
      id="investor-snapshot"
      className="bg-card px-6 pt-20 pb-10 text-ink lg:px-12 lg:pt-28 lg:pb-14"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 border-t border-ink/10 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{t("investorSnapshot.eyebrow")}</Eyebrow>
            <h2 className="mt-5 max-w-4xl font-serif text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.04] text-forest-deep">
              {t("investorSnapshot.title")}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
              {t("investorSnapshot.desc")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <InlineCta href="/contact">{t("investorSnapshot.cta1")}</InlineCta>
              <InlineCta href="#operating-model" variant="light">
                {t("investorSnapshot.cta2")}
              </InlineCta>
            </div>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-[#DDE7E1] bg-[#DDE7E1] sm:grid-cols-2 lg:grid-cols-3">
          {metricIcons.map((Icon, idx) => (
            <div key={idx} className="bg-[#F9FBF8] p-6 md:p-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <Icon className="h-5 w-5 text-forest" strokeWidth={1.7} />
                <span className="font-jet text-[10px] uppercase tracking-[0.18em] text-ink/35">
                  {t("investorSnapshot.proofPoint")}
                </span>
              </div>
              <div className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-none text-forest-deep">
                {t(`investorSnapshot.metrics.${idx}.value` as any)}
              </div>
              <h3 className="mt-3 text-[15px] font-bold text-ink md:text-[16px]">
                {t(`investorSnapshot.metrics.${idx}.label` as any)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`investorSnapshot.metrics.${idx}.note` as any)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-lg border border-forest/15 bg-forest/[0.03] p-5 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-sm leading-relaxed text-[#59635D]">
            {t("investorSnapshot.disclaimer")}
          </p>
          <Link
            to={getLocalizedPath("/contact", currentLang) as any}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-card px-5 py-3 text-sm font-semibold text-forest-deep ring-1 ring-forest/20 transition-colors hover:bg-forest hover:text-cream"
          >
            {t("investorSnapshot.ctaData")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
