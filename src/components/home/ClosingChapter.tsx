import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { getCmsIcon } from "@/components/careers/icon-map";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { AgriParkVisitModal } from "@/components/agri-park/AgriParkVisitModal";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { useSiteContact } from "@/contexts/SiteContactContext";
import { useHomepageChapters } from "@/contexts/HomepageChaptersContext";

export default function ClosingChapter() {
  const sectionRef = useHomeChapterReveal("fade-up");
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? i18n.language ?? "en";
  const isHindi = currentLang.startsWith("hi");
  const { whatsappUrl } = useSiteContact();
  const { closingChapter } = useHomepageChapters();

  const pathways = useMemo(() => {
    return closingChapter.pathways.map((p) => {
      const perks = isHindi ? p.perksHi : p.perksEn;
      const href =
        p.type === "whatsapp"
          ? isHindi
            ? whatsappUrl("closingAdvisoryHi")
            : whatsappUrl("closingAdvisoryEn")
          : p.linkHref;
      return {
        number: p.number,
        icon: getCmsIcon(p.iconKey),
        tag: isHindi ? p.tagHi : p.tagEn,
        title: isHindi ? p.titleHi : p.titleEn,
        subtitle: isHindi ? p.subtitleHi : p.subtitleEn,
        description: isHindi ? p.descriptionHi : p.descriptionEn,
        actionLabel: isHindi ? p.actionLabelHi : p.actionLabelEn,
        actionSub: isHindi ? p.actionSubHi : p.actionSubEn,
        type: p.type,
        href,
        perks,
      };
    });
  }, [closingChapter.pathways, isHindi, whatsappUrl]);

  return (
    <>
      <section
        ref={sectionRef}
        id="get-started"
        className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10 text-[#143d31]"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
          <div data-home-reveal className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {isHindi ? closingChapter.badgeHi : closingChapter.badgeEn}
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl">
                {isHindi ? closingChapter.titleHi : closingChapter.titleEn}
              </h2>

              <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
                {isHindi ? closingChapter.descriptionHi : closingChapter.descriptionEn}
              </p>
            </div>
          </div>

          <div
            data-home-reveal
            className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10"
          >
            {pathways.map((pathway) => {
              const Icon = pathway.icon;

              return (
                <div
                  key={pathway.number}
                  className="group relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 transition-colors duration-200 hover:bg-white/50"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#5d7d37] uppercase tracking-wider">
                        {pathway.number}
                      </span>
                      <span className="rounded-full bg-[#143d31]/5 border border-[#143d31]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                        {pathway.tag}
                      </span>
                    </div>

                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143d31] text-[#a3e635] shadow-xs group-hover:scale-105 group-hover:bg-[#1a4d3e] group-hover:shadow-md transition-all duration-300 mb-4">
                        <Icon className="h-6 w-6 text-[#a3e635]" weight="duotone" />
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143d31] tracking-tight">
                        {pathway.title}
                      </h3>

                      <p className="font-sans text-xs font-semibold text-[#5d7d37] mt-1">
                        {pathway.subtitle}
                      </p>

                      <p className="font-sans text-xs sm:text-sm text-[#4f624f] leading-relaxed mt-3">
                        {pathway.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-[#143d31]/10 font-sans">
                      {pathway.perks.map((perk) => (
                        <div
                          key={perk}
                          className="flex items-center gap-2 text-xs font-medium text-[#143d31]"
                        >
                          <CheckCircle weight="fill" className="h-4 w-4 text-[#5d7d37] shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 space-y-2">
                    {pathway.type === "modal" ? (
                      <SlideUpPillButton
                        onClick={() => setIsVisitModalOpen(true)}
                        variant="dark"
                        size="md"
                        fullWidth
                        label={pathway.actionLabel}
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    ) : pathway.type === "link" ? (
                      <SlideUpPillButton
                        to={getLocalizedPath(pathway.href, currentLang)}
                        variant="dark"
                        size="md"
                        fullWidth
                        label={pathway.actionLabel}
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    ) : (
                      <SlideUpPillButton
                        href={pathway.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="dark"
                        size="md"
                        fullWidth
                        label={pathway.actionLabel}
                        icon={<ArrowUpRight className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    )}

                    <p className="font-mono text-[10px] font-semibold text-center text-[#4f624f]/70 uppercase tracking-wider pt-0.5">
                      {pathway.actionSub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AgriParkVisitModal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)} />
    </>
  );
}
