"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, CheckCircle } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { CROP_JOURNEY_STAGES_EN, CROP_JOURNEY_STAGES_HI } from "./services-overview-data";

type JourneySection = {
  id: number;
  title: string;
  desc: string;
  inputs: string;
  partners: string;
  benefit: string;
  imageUrl: string;
  reverse: boolean;
};

const STAGE_IMAGES: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1400&auto=format&fit=crop", // Soil
  2: "/nursery.png", // Nursery
  3: "/services/turnkey-farm.jpg", // Turnkey / Bed prep
  4: "/services/agronomy-advisory.jpg", // Scouting
  5: "/services/farm-tech-iot.jpg", // IoT / Fertigation
  6: "https://images.unsplash.com/photo-1592982537447-6f2c6a0c5c4f?q=80&w=1400&auto=format&fit=crop", // Leaf / Nutrition
  7: "/services/market-linkage-harvest.jpg", // Harvest
  8: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1400&auto=format&fit=crop", // Buyback / Delivery
};

function JourneyStage({ section, isHindi }: { section: JourneySection; isHindi: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const clipProgress = useTransform(
    scrollYProgress,
    [0, 0.7],
    section.reverse
      ? ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]
      : ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const translateContent = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <div
      ref={sectionRef}
      className={`min-h-[75vh] py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 border-t border-[#143d31]/10 first:border-t-0 ${
        section.reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Text & Line-based Features Block */}
      <motion.div
        style={{ y: translateContent, opacity: opacityContent }}
        className="flex-1 max-w-xl w-full"
      >
        {/* Stage Identifier Tag */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-base font-extrabold text-[#5d7d37]">0{section.id}</span>
          <span className="h-3.5 w-[1.5px] bg-[#143d31]/20" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#143d31]">
            {isHindi ? `चरण ${section.id}` : `Stage ${section.id}`}
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143d31] tracking-tight leading-[1.15] mb-4">
          {section.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm sm:text-base text-[#4f624f] leading-relaxed mb-6 font-normal">
          {section.desc}
        </p>

        {/* Sub-features: Clean Line-Type Layout (Consistent with Home Page Style) */}
        <div className="my-6 border-y border-[#143d31]/12 divide-y divide-[#143d31]/10">
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5d7d37] shrink-0">
              {isHindi ? "इनपुट्स एवं उपकरण" : "Inputs & Hardware"}
            </span>
            <span className="font-sans text-xs sm:text-sm font-semibold text-[#143d31] sm:text-right">
              {section.inputs}
            </span>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5d7d37] shrink-0">
              {isHindi ? "साझेदार नेटवर्क" : "Partner Ecosystem"}
            </span>
            <span className="font-sans text-xs sm:text-sm font-semibold text-[#143d31] sm:text-right">
              {section.partners}
            </span>
          </div>
        </div>

        {/* Verified Outcome Guarantee (Line Style with Brand Accent) */}
        <div className="flex items-center gap-3 pt-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#143d31] text-[#a3e635] shrink-0 shadow-xs">
            <CheckCircle weight="fill" className="h-4.5 w-4.5 text-[#a3e635]" />
          </div>
          <div>
            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
              {isHindi ? "प्रमाणित परिणाम" : "Verified Guarantee"}
            </span>
            <span className="font-sans text-sm sm:text-base font-bold text-[#143d31]">
              {section.benefit}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Media Block with Smooth Parallax Reveal */}
      <motion.div
        style={{
          opacity: opacityContent,
          clipPath: clipProgress,
        }}
        className="flex-1 w-full relative max-w-lg"
      >
        <div className="aspect-[4/3] w-full relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#143d31]/10 bg-white shadow-xl">
          <img
            src={section.imageUrl}
            className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            alt={section.title}
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
}

export function CropJourneyStepper() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const CROP_JOURNEY_STAGES = isHindi ? CROP_JOURNEY_STAGES_HI : CROP_JOURNEY_STAGES_EN;

  // Enhance stages with images for the parallax view
  const stagesWithImages: JourneySection[] = CROP_JOURNEY_STAGES.map((st, i) => ({
    ...st,
    imageUrl: STAGE_IMAGES[st.id] ?? "",
    reverse: i % 2 !== 0,
  }));

  return (
    <section
      id="crop-journey"
      className="bg-[#f4f8f5] text-[#143d31] w-full overflow-hidden border-t border-[#143d31]/10"
    >
      {/* Intro Section */}
      <div className="w-full flex flex-col items-center justify-center px-5 sm:px-8 py-20 sm:py-24 text-center max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
            {isHindi
              ? "संपूर्ण 8-चरणीय वैज्ञानिक फसल चक्र"
              : "Closed-Loop 8-Stage Cropping Lifecycle"}
          </p>
          <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#143d31] tracking-tight leading-[1.1] max-w-3xl mx-auto">
          {isHindi
            ? "बीज से बिक्री तक का संपूर्ण फसल रोडमैप"
            : "The Seed-to-Sale Engineering Roadmap"}
        </h2>

        <p className="mt-5 font-sans text-[#4f624f] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {isHindi
            ? "नीचे स्क्रॉल करें और जानें कि कैसे हर चरण पर वैज्ञानिक सटीकता और पक्के मानक आपकी फसल को सफल बनाते हैं।"
            : "Scroll through our chronological field protocols, verified input formulations, and guaranteed outcomes across all 8 crop development stages."}
        </p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-12 flex flex-col items-center gap-2.5 text-[#5d7d37] font-mono text-[11px] font-bold tracking-wider uppercase"
        >
          <span>{isHindi ? "नीचे स्क्रॉल करें" : "Scroll Down"}</span>
          <div className="h-9 w-9 rounded-full border border-[#143d31]/15 flex items-center justify-center bg-white shadow-xs text-[#143d31]">
            <ArrowDown className="h-4 w-4" />
          </div>
        </motion.div>
      </div>

      {/* Parallax Scroll Stages */}
      <div className="flex flex-col px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto pb-28">
        {stagesWithImages.map((section) => (
          <JourneyStage key={section.id} section={section} isHindi={!!isHindi} />
        ))}
      </div>
    </section>
  );
}
