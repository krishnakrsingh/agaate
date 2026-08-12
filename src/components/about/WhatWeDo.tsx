import { ArrowUpRight } from "@phosphor-icons/react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import {
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/components/common/motion";
import { whatWeDo } from "./data";

export default function WhatWeDo() {
  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? i18n.language ?? "en";

  return (
    <section
      id="what-we-do"
      className="relative overflow-hidden py-20 px-6 md:py-28 lg:px-12"
      aria-labelledby="what-we-do-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="What we do"
          title={<span id="what-we-do-heading">From seeds to sales.</span>}
          description="An integrated, stage-wise approach powered by leading agri partners you can trust."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {whatWeDo.map((item, i) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.id} variant="fade-up">
                <TiltCard maxTilt={6} className="h-full">
                  <Link
                    to={getLocalizedPath(item.href, currentLang) as any}
                    className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-forest/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
                  >
                    <div>
                      <div className="mb-5 flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-forest/15 bg-forest/5 text-forest transition-colors group-hover:bg-forest group-hover:text-cream">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-jet text-[10px] font-bold text-forest/35">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-forest-deep group-hover:text-forest">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-forest/70">{item.desc}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1 font-jet text-[10px] font-bold uppercase tracking-wider text-moss">
                      Explore
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
