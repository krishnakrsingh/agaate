import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { CountUp, EASE } from "@/components/common/motion";
import InteractivePhoneApp from "./InteractivePhoneApp";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";

export default function AppChapter() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const sectionRef = useHomeChapterReveal("fade-up");

  const featureChecklist = isHindi
    ? [
        "फोटो से तुरंत रोग पहचान व सटीक दवा",
        "अनुभवी कृषि डॉक्टर से सीधी 1-on-1 चैट",
        "खाद, स्प्रे व सिंचाई के स्टेज अलर्ट",
        "स्थानीय मौसम और लाइव मंडी भाव",
      ]
    : [
        "Instant photo crop disease diagnosis",
        "Direct 1-on-1 agronomist chat",
        "Precision stage-wise spray & feed alerts",
        "Hyperlocal weather & live mandi prices",
      ];

  return (
    <section
      ref={sectionRef}
      id="agaate-app"
      className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10 text-[#143d31]"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Text, Line-Style Metrics Strip & Highlights */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center max-w-xl lg:pr-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Division Tag */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {isHindi ? "02 · अगाते मोबाइल ऐप" : "02 · Agaate Mobile App"}
              </p>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
              {isHindi
                ? "आपका पूरा खेत — एक आसान ऐप में"
                : "Your entire farm in one intuitive app"}
            </h2>

            {/* Subtext Description */}
            <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
              {isHindi
                ? "अनुमान छोड़ें, वैज्ञानिक कृषि अपनाएं। पत्ते की फोटो से तुरंत रोग पहचान, डॉक्टर सलाह और फसल अलर्ट सीधे आपके फोन पर।"
                : "Replace guesswork with precision. Instant leaf diagnosis, direct expert chat, and stage-wise crop alerts delivered to your pocket."}
            </p>

            {/* Metrics Strip — Line Type Design */}
            <div className="my-6 border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-2">
              <div className="text-left first:border-l-0 first:pl-0">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                  <CountUp to={3} suffix="s" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "एआई रोग पहचान" : "AI Diagnosis"}
                </p>
              </div>
              <div className="text-left border-l border-[#143d31]/10 pl-3">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                  24/7
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "डॉक्टर सपोर्ट" : "Doctor Chat"}
                </p>
              </div>
              <div className="text-left border-l border-[#143d31]/10 pl-3">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                  <CountUp to={50} suffix="K+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "सक्रिय किसान" : "Active Farmers"}
                </p>
              </div>
            </div>

            {/* Feature Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {featureChecklist.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#143d31]"
                >
                  <CheckCircle className="h-4 w-4 text-[#143d31] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Store Download Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-block"
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  className="h-10 w-auto sm:h-11"
                />
              </motion.a>
              <motion.a
                href="https://apps.apple.com/us/app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-block"
              >
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="h-10 w-auto sm:h-11"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Phone Simulator */}
          <motion.div
            className="lg:col-span-6 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="relative flex w-full max-w-[320px] sm:max-w-[340px] justify-center">
              {/* Ambient Glow */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#a3e635]/20 to-[#143d31]/20 opacity-50 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative z-10 w-full">
                <InteractivePhoneApp />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
