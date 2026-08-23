import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { CountUp, EASE } from "@/components/common/motion";
import InteractivePhoneApp from "./InteractivePhoneApp";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";

import type { HomeCmsAppLinks } from "@/lib/cms-types";
import { DEFAULT_HOME_CMS_APP_LINKS } from "@/lib/cms-types";

type AppChapterProps = {
  appLinks?: HomeCmsAppLinks;
};

export default function AppChapter({ appLinks }: AppChapterProps) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const sectionRef = useHomeChapterReveal("fade-up");
  const storeLinks = appLinks ?? DEFAULT_HOME_CMS_APP_LINKS;

  const featureChecklist = isHindi
    ? [
        "प्लॉट-वार दैनिक कार्य व फसल शेड्यूलिंग",
        "लागत, इनपुट व खर्च का डिजिटल बहीखाता",
        "स्टेज-अनुसार स्प्रे, सिंचाई व न्यूट्रिशन अलर्ट",
        "फोटो से तुरंत फसल रोग पहचान व वैज्ञानिक सलाह",
      ]
    : [
        "Plot-wise crop activity & task scheduling",
        "Farm expenses, inputs & yield bookkeeping",
        "Stage-wise fertigation, irrigation & spray alerts",
        "Instant photo disease diagnosis & expert advisory",
      ];

  return (
    <section
      ref={sectionRef}
      id="agaate-app"
      className="relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-28 border-t border-[#143d31]/10 text-[#143d31]"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text, Line-Style Metrics Strip & Highlights */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center space-y-6 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Division Tag */}
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                {isHindi ? "अगाते मोबाइल ऐप" : "Agaate Mobile App"}
              </p>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
              {isHindi
                ? "आपका पूरा खेत — एक आसान ऐप में"
                : "Your entire farm in one intuitive app"}
            </h2>

            {/* Subtext Description */}
            <p className="font-sans text-base sm:text-lg text-[#4f624f] leading-relaxed font-normal">
              {isHindi
                ? "अपने पूरे खेत के संचालन को डिजिटाइज़ करें। प्लॉट-वार दैनिक कार्य शेड्यूल करें, खाद-दवा व खर्च का हिसाब रखें, और समय पर वैज्ञानिक सलाह व फसल अलर्ट सीधे अपने फोन पर पाएं।"
                : "Digitize your entire farm operations in one place. Track plot activities, manage daily crop schedules, record farm inputs & expenses, and monitor crop growth with real-time advisory from certified field agronomists."}
            </p>

            {/* Metrics Strip — Line Type Design */}
            <div className="border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-3">
              <div className="text-left first:border-l-0 first:pl-0">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                  <CountUp to={100} suffix="%" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  {isHindi ? "डिजिटल प्लॉट ट्रैकिंग" : "Plot-Wise Tracking"}
                </p>
              </div>
              <div className="text-left border-l border-[#143d31]/10 pl-4">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                  24/7
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  {isHindi ? "स्टेज अलर्ट व शेड्यूल" : "Schedules & Alerts"}
                </p>
              </div>
              <div className="text-left border-l border-[#143d31]/10 pl-4">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                  <CountUp to={50} suffix="K+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  {isHindi ? "एकड़ डिजिटल प्रबंधन" : "Acres Managed"}
                </p>
              </div>
            </div>

            {/* Feature Highlights Checklist */}
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

            {/* Store Download Badges */}
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

          {/* Right Column: Interactive Phone Simulator */}
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
