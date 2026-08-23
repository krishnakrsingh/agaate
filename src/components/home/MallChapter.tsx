import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Truck,
  Buildings,
  Package,
  ShoppingBag,
  PhoneCall,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { CountUp, EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import KisaanMallShowcase from "./KisaanMallShowcase";

const SUPPLY_CHAIN_STEPS_EN = [
  {
    step: "01",
    title: "Information Gathering",
    desc: "Localized soil, weather & crop data mapped to curate verified inputs.",
    icon: MagnifyingGlass,
  },
  {
    step: "02",
    title: "Direct Partner Sourcing",
    desc: "Sourced directly from 50+ certified seed & input manufacturers.",
    icon: Buildings,
  },
  {
    step: "03",
    title: "Agaate Regional Hub",
    desc: "Stored in humidity-controlled warehouses until your order.",
    icon: Package,
  },
  {
    step: "04",
    title: "Direct Farm Delivery",
    desc: "Delivered straight to your field gate across 15,000+ PIN codes.",
    icon: Truck,
  },
];

const SUPPLY_CHAIN_STEPS_HI = [
  {
    step: "01",
    title: "जानकारी संग्रह",
    desc: "क्षेत्रीय मिट्टी, मौसम व फसल डेटा अनुसार सही इनपुट्स का चयन।",
    icon: MagnifyingGlass,
  },
  {
    step: "02",
    title: "सीधे कंपनियों से सोर्सिंग",
    desc: "50+ प्रमाणित बीज व इनपुट निर्माताओं से सीधी आपूर्ति।",
    icon: Buildings,
  },
  {
    step: "03",
    title: "अगाते वेयरहाउस हब",
    desc: "तापमान-नियंत्रित सुरक्षित वेयरहाउस में सुरक्षित भंडारण।",
    icon: Package,
  },
  {
    step: "04",
    title: "खेत तक सुरक्षित डिलीवरी",
    desc: "15,000+ पिनकोड में सीधे आपके खेत के गेट तक सुरक्षित डिलीवरी।",
    icon: Truck,
  },
];

export default function MallChapter() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const SUPPLY_CHAIN_STEPS = isHindi ? SUPPLY_CHAIN_STEPS_HI : SUPPLY_CHAIN_STEPS_EN;
  const sectionRef = useHomeChapterReveal("fade-up");

  return (
    <section
      ref={sectionRef}
      id="kisaan-mall"
      className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-24 text-[#143d31]"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-16">
        {/* ── Main Showcase Grid ── */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Text & Metrics */}
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
                {isHindi ? "अगाते किसान मॉल" : "Agaate Kisaan Mall"}
              </p>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
              {isHindi
                ? "किसानों के लिए भारत का पहला आधुनिक कृषि मॉल"
                : "India's First Modern Input Retail for Farmers"}
            </h2>

            {/* Subtext Description */}
            <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
              {isHindi
                ? "किसानों के लिए वन-स्टॉप कृषि केंद्र। 100% प्रमाणित बीज, जैविक पोषण और ड्रिप किट सीधे खेत तक किफायती दरों पर।"
                : "One-stop shop for farmers. Verified seeds, biologicals, and drip kits delivered direct to your farm at honest prices."}
            </p>

            {/* Metrics Strip */}
            <div className="my-6 border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-2">
              <div className="text-left first:border-l-0 first:pl-0">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                  <CountUp to={1000} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "प्रमाणित उत्पाद" : "Products"}
                </p>
              </div>
              <div className="text-left border-l border-[#143d31]/10 pl-3">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                  <CountUp to={50} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "साझेदार ब्रांड्स" : "Partners"}
                </p>
              </div>
              <div className="text-left border-l border-[#143d31]/10 pl-3">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                  <CountUp to={100} suffix="%" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  {isHindi ? "सीधी ब्रांड सोर्सिंग" : "Direct Brand Sourced"}
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {(isHindi
                ? [
                    "सीधे निर्माता कंपनियों से किफायती दाम",
                    "100% असली व प्रमाणित उत्पाद की गारंटी",
                    "कस्टमाइज्ड ड्रिप व सिंचाई पैकेज",
                  ]
                : [
                    "Direct-from-brand honest pricing",
                    "100% verified product authenticity",
                    "Custom drip & irrigation packages",
                  ]
              ).map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#143d31]"
                >
                  <CheckCircle className="h-4 w-4 text-[#143d31] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons Row: Primary Browse */}
            <div className="flex flex-wrap items-center gap-3">
              <SlideUpPillButton
                href="/kisaan-mall"
                variant="dark"
                size="md"
                label={isHindi ? "किसान मॉल देखें" : "Browse Agaate Mall"}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase */}
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

        {/* ── Agaate Direct Supply Guarantee (Card-less Seamless Grid) ── */}
        <div data-home-reveal className="pt-8 border-t border-[#143d31]/10 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {isHindi ? "अगाते डायरेक्ट सप्लाई गारंटी" : "Agaate Direct Supply Guarantee"}
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                {isHindi
                  ? "अगाते डायरेक्ट सप्लाई कैसे काम करती है"
                  : "How Agaate Direct Supply Works"}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#4f624f] max-w-md leading-relaxed">
                {isHindi
                  ? "प्रमाणित ब्रांड्स से लेकर सीधे आपके खेत के गेट तक — हर एक लॉट की अंकुरण, शुद्धता और असलियत जांची जाती है।"
                  : "From certified partner brands to your field gate — every batch is verified for germination, purity, and authenticity."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SUPPLY_CHAIN_STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="rounded-2xl bg-white/60 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:bg-white transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-[#5d7d37] tracking-wider uppercase">
                      {isHindi ? `चरण ${s.step}` : `Step ${s.step}`}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143d31]/10 text-[#143d31]">
                      <Icon className="h-4 w-4 text-[#143d31]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-[#143d31] tracking-tight">
                      {s.title}
                    </h4>
                    <p className="font-sans text-xs text-[#4f624f] leading-relaxed mt-1 font-normal">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div
          data-home-reveal
          className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-[#143d31] p-8 text-white shadow-sm"
        >
          <div>
            <span className="font-mono text-xs font-bold text-[#a3e635] uppercase tracking-widest">
              {isHindi ? "कृषि वैज्ञानिक से सीधी सलाह" : "DIRECT AGRONOMIST RECOMMENDATION"}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              {isHindi
                ? "तय नहीं कर पा रहे कि आपकी मिट्टी के लिए कौन सा बीज या खाद सही है?"
                : "Unsure which seed or bio-input matches your soil?"}
            </h3>
            <p className="font-sans text-xs text-white/80 mt-1 max-w-xl">
              {isHindi
                ? "ऑर्डर करने से पहले सीधे वरिष्ठ कृषि विशेषज्ञों से बात करें और सही मात्रा का चार्ट प्राप्त करें।"
                : "Talk directly with senior field experts to get exact dose calculations before placing your Agaate Mall order."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <SlideUpPillButton
              href="/kisaan-mall"
              variant="lime"
              size="md"
              label={isHindi ? "स्टोर देखें" : "Browse Store"}
              icon={<ShoppingBag className="h-4 w-4" />}
              iconPosition="left"
            />
            <SlideUpPillButton
              href="tel:9487263498"
              variant="hero-secondary"
              size="md"
              label={isHindi ? "कृषि डॉक्टर को कॉल करें" : "Call Agronomist"}
              icon={<PhoneCall className="h-4 w-4" />}
              iconPosition="left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
