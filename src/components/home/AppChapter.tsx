import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { EASE } from "@/components/common/motion";
import InteractivePhoneApp from "./InteractivePhoneApp";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";
import type { HomeCmsAppLinks } from "@/lib/cms-types";
import { DEFAULT_HOME_CMS_APP_LINKS } from "@/lib/cms-types";
import { useHomepageChapters } from "@/contexts/HomepageChaptersContext";
import { HomeChapterStatValue } from "@/components/home/HomeChapterStatValue";

type AppChapterProps = {
  appLinks?: HomeCmsAppLinks;
};

export default function AppChapter({ appLinks }: AppChapterProps) {
  const { i18n } = useTranslation();
  const { appChapter } = useHomepageChapters();
  const isHindi = i18n.language?.startsWith("hi");
  const sectionRef = useHomeChapterReveal("fade-up");
  const storeLinks = appLinks ?? DEFAULT_HOME_CMS_APP_LINKS;
  const featureChecklist = isHindi ? appChapter.checklistHi : appChapter.checklistEn;

  return (
    <section
      ref={sectionRef}
      id="agaate-app"
      className="relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-28 border-t border-[#143d31]/10 text-[#143d31]"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center space-y-6 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                {isHindi ? appChapter.badgeHi : appChapter.badgeEn}
              </p>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
              {isHindi ? appChapter.titleHi : appChapter.titleEn}
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#4f624f] leading-relaxed font-normal">
              {isHindi ? appChapter.descriptionHi : appChapter.descriptionEn}
            </p>

            <div className="border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-3">
              {appChapter.stats.map((stat, idx) => {
                const label = isHindi ? stat.labelHi : stat.labelEn;
                return (
                  <div
                    key={label}
                    className={idx > 0 ? "text-left border-l border-[#143d31]/10 pl-4" : "text-left first:border-l-0 first:pl-0"}
                  >
                    <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                      <HomeChapterStatValue stat={stat} isHindi={isHindi} />
                    </p>
                    <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {featureChecklist.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-[#143d31]"
                >
                  <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0 mt-0.5" weight="fill" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <motion.a
                href={storeLinks.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-block"
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  className="h-10 w-auto sm:h-11 shadow-xs rounded-lg"
                />
              </motion.a>
              <motion.a
                href={storeLinks.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-block"
              >
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="h-10 w-auto sm:h-11 shadow-xs rounded-lg"
                />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <InteractivePhoneApp />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
