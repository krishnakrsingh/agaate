import { useSiteContact } from "@/contexts/SiteContactContext";
import { useKisaanMallPage } from "@/contexts/KisaanMallPageContext";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ShoppingBag, PhoneCall } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { CountUp, EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { getMallIcon } from "@/components/kisaan-mall/mall-icon-map";
import KisaanMallShowcase from "./KisaanMallShowcase";

export default function MallChapter() {
  const { i18n } = useTranslation();
  const { telAltHref } = useSiteContact();
  const page = useKisaanMallPage();
  const chapter = page.homeChapter;
  const isHindi = i18n.language?.startsWith("hi");
  const sectionRef = useHomeChapterReveal("fade-up");

  return (
    <section
      ref={sectionRef}
      id="kisaan-mall"
      className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-24 text-[#143d31]"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center max-w-xl lg:pr-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {isHindi ? chapter.badgeHi : chapter.badgeEn}
              </p>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
              {isHindi ? chapter.titleHi : chapter.titleEn}
            </h2>

            <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
              {isHindi ? chapter.descriptionHi : chapter.descriptionEn}
            </p>

            <div className="my-6 border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-2">
              {page.heroStats.map((stat, idx) => {
                const label = isHindi ? stat.labelHi : stat.labelEn;
                const valueText = isHindi ? stat.valueTextHi : stat.valueTextEn;
                return (
                  <div
                    key={label}
                    className={idx > 0 ? "text-left border-l border-[#143d31]/10 pl-3" : "text-left first:border-l-0 first:pl-0"}
                  >
                    <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                      {valueText ? valueText : (
                        <CountUp to={stat.numValue} suffix={isHindi ? stat.suffixHi : stat.suffixEn} />
                      )}
                    </p>
                    <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {(isHindi ? chapter.featuresHi : chapter.featuresEn).map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#143d31]"
                >
                  <CheckCircle className="h-4 w-4 text-[#143d31] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SlideUpPillButton
                href="/kisaan-mall"
                variant="dark"
                size="md"
                label={isHindi ? chapter.browseLabelHi : chapter.browseLabelEn}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <KisaanMallShowcase />
          </motion.div>
        </div>

        <div data-home-reveal className="pt-8 border-t border-[#143d31]/10 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {isHindi ? page.supplyChain.badgeHi : page.supplyChain.badgeEn}
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                {isHindi ? chapter.supplyHeadingHi : chapter.supplyHeadingEn}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#4f624f] max-w-md leading-relaxed">
                {isHindi ? chapter.supplySubtextHi : chapter.supplySubtextEn}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {page.supplySteps.map((step) => {
              const Icon = getMallIcon(step.iconKey);
              return (
                <div
                  key={step.step}
                  className="rounded-2xl bg-white/60 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:bg-white transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-[#5d7d37] tracking-wider uppercase">
                      {isHindi ? `चरण ${step.step}` : `Step ${step.step}`}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143d31]/10 text-[#143d31]">
                      <Icon className="h-4 w-4 text-[#143d31]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-[#143d31] tracking-tight">
                      {isHindi ? step.titleHi : step.titleEn}
                    </h4>
                    <p className="font-sans text-xs text-[#4f624f] leading-relaxed mt-1 font-normal">
                      {isHindi ? step.descHi : step.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          data-home-reveal
          className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-[#143d31] p-8 text-white shadow-sm"
        >
          <div>
            <span className="font-mono text-xs font-bold text-[#a3e635] uppercase tracking-widest">
              {isHindi ? chapter.ctaEyebrowHi : chapter.ctaEyebrowEn}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              {isHindi ? chapter.ctaTitleHi : chapter.ctaTitleEn}
            </h3>
            <p className="font-sans text-xs text-white/80 mt-1 max-w-xl">
              {isHindi ? chapter.ctaDescriptionHi : chapter.ctaDescriptionEn}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <SlideUpPillButton
              href="/kisaan-mall"
              variant="lime"
              size="md"
              label={isHindi ? chapter.ctaBrowseHi : chapter.ctaBrowseEn}
              icon={<ShoppingBag className="h-4 w-4" />}
              iconPosition="left"
            />
            <SlideUpPillButton
              href={telAltHref}
              variant="hero-secondary"
              size="md"
              label={isHindi ? chapter.ctaCallHi : chapter.ctaCallEn}
              icon={<PhoneCall className="h-4 w-4" />}
              iconPosition="left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
