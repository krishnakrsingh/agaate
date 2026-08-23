import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "../useHomeChapterReveal";
import { CountUp, TiltCard, EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { MarketAccessModal } from "./MarketAccessModal";
import type { HomeCmsLogo } from "@/lib/cms-types";

interface PillarMarketProps {
  buyers?: HomeCmsLogo[];
}

export default function PillarMarket({ buyers }: PillarMarketProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const isHindi = currentLang.startsWith("hi");
  const sectionRef = useHomeChapterReveal("fade-up");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const highlights = isHindi
    ? [
        "बुवाई पूर्व न्यूनतम मूल्य गारंटी",
        "खेत पर डिजिटल वजन व त्वरित भुगतान",
        "रिलायंस व बिगबास्केट जैसी कंपनियों को सीधी आपूर्ति",
      ]
    : [
        "Pre-sowing price floor contracts",
        "Digital weighment & instant UPI payout",
        "Direct institutional buyer linkage",
      ];

  return (
    <section
      ref={sectionRef}
      id="pillar-market"
      className="relative bg-[#f4f8f5] py-16 sm:py-20 lg:py-28 border-t border-[#143d31]/10 overflow-hidden text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Visual Column (Left on Desktop) */}
          <motion.div
            className="lg:col-span-6 lg:order-1 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="w-full flex items-center justify-center">
              <TiltCard maxTilt={4} glare={false} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-full flex items-center justify-center p-0"
                >
                  <img
                    src="/market-linkage.png"
                    alt={
                      isHindi
                        ? "अगाते फसल खरीद व मार्केट लिंकेज"
                        : "Agaate farm-gate harvest aggregation and market linkage"
                    }
                    className="w-full max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] object-contain drop-shadow-xl"
                  />
                </motion.div>
              </TiltCard>
            </div>
          </motion.div>

          {/* Text Column (Right on Desktop) */}
          <motion.div
            className="lg:col-span-6 lg:order-2 flex flex-col justify-center max-w-xl lg:pl-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Division Tag */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                {isHindi ? "मार्केट लिंकेज" : "Market Linkage"}
              </p>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.15]">
              {isHindi ? "सीधी फसल बायबैक व खरीद" : "Buyback & Direct Offtake"}
            </h2>

            {/* Subtext Description */}
            <p className="font-sans mt-2.5 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
              {isHindi
                ? "बुवाई से पहले पक्का रेट अनुबंध, खेत पर डिजिटल तौल और तुरंत T+0 बैंक खाता भुगतान।"
                : "Pre-sowing price contracts, transparent digital weighing, and instant T+0 farm-gate payouts."}
            </p>

            {/* Metrics Strip */}
            <div className="my-5 border-y border-[#143d31]/12 py-3.5 grid grid-cols-3 gap-2">
              <div className="text-left first:border-l-0 first:pl-0">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={15000} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "एकड़ रकबा" : "Acres Associated"}
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/40 pl-3">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={12} prefix="₹" suffix={isHindi ? " करोड़+" : " Cr+"} />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "किसान भुगतान" : "Farmer Payouts"}
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/40 pl-3">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={0} suffix="%" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "बिचौलिया कमीशन" : "Middleman Cut"}
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
              {highlights.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#143d31]"
                >
                  <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" weight="fill" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <SlideUpPillButton
                type="button"
                onClick={() => setIsModalOpen(true)}
                variant="dark"
                size="md"
                label={isHindi ? "मार्केट लिंकेज देखें" : "View Market Linkage"}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Market Access Partners Popup Modal */}
      <MarketAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buyers={buyers}
      />
    </section>
  );
}
