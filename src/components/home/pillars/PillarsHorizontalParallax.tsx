import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { CountUp, TiltCard, MagneticButton } from "@/components/common/motion";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PillarData {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  metrics: {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
  }[];
  features: string[];
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

const PILLARS_DATA_EN: PillarData[] = [
  {
    id: "pillar-advisory",
    number: "01",
    tag: "Field Advisory",
    title: "On-Ground Expert Agronomist Support",
    description:
      "Field agronomists providing direct disease diagnosis, exact fertigation doses, and regular farm visits.",
    metrics: [
      { value: 20, suffix: "+", label: "Field Experts" },
      { value: 2000, suffix: "+", label: "Farmers Advised" },
      { value: 15, prefix: "< ", suffix: " Mins", label: "Response Time" },
    ],
    features: [
      "Photo pest & disease identification",
      "Stage-wise spray & fertigation schedules",
      "Direct access to senior agronomists",
    ],
    ctaText: "Talk to Agronomist",
    ctaHref: "/services#farm-tech",
    imageSrc: "/farm.png",
    imageAlt: "On-Ground Expert Agronomist Support",
  },
  {
    id: "pillar-nursery",
    number: "02",
    tag: "Bio Nursery",
    title: "High-Immunity Seedling Infrastructure",
    description:
      "Immunity-boosted plug seedlings engineered for zero mortality, strong root vigour, and maximum crop protection.",
    metrics: [
      { value: 85, suffix: " Lakh+", label: "Plants Delivered" },
      { value: 98, suffix: "%", label: "Survival Rate" },
      { value: 100, suffix: "+", label: "Varieties Sourced" },
    ],
    features: [
      "Built-in natural disease immunity",
      "Zero transplant shock & fast growth",
      "High-vigour root system for higher yield",
    ],
    ctaText: "Explore Bio Nurseries",
    ctaHref: "/services#nursery",
    imageSrc: "/nursery.png",
    imageAlt: "High-Immunity Seedling Infrastructure",
  },
  {
    id: "pillar-market",
    number: "03",
    tag: "Market & Carbon",
    title: "Guaranteed Buyback & Carbon Credits",
    description:
      "Direct buyer buyback contracts and soil carbon offset credits to maximize farm profit.",
    metrics: [
      { value: 15000, suffix: "+", label: "Acres Associated" },
      { value: 10, prefix: "₹", suffix: " Cr+", label: "Farmer Value" },
      { value: 100, suffix: "%", label: "Carbon Enablement" },
    ],
    features: [
      "Guaranteed buyback contract terms",
      "Digital weighment & instant payouts",
      "Soil carbon credit monetization",
    ],
    ctaText: "View Market Linkage",
    ctaHref: "/services#market-linkage",
    imageSrc: "/carbon credits.png",
    imageAlt: "Guaranteed Buyback & Carbon Credits",
  },
];

const PILLARS_DATA_HI: PillarData[] = [
  {
    id: "pillar-advisory",
    number: "01",
    tag: "फील्ड एडवाइजरी",
    title: "खेत पर अनुभवी कृषि वैज्ञानिकों का सीधा मार्गदर्शन",
    description:
      "हमारे फील्ड विशेषज्ञ सीधे खेत पर आकर सटीक रोग पहचान, फर्टीगेशन शेड्यूल और संपूर्ण फसल सलाह देते हैं।",
    metrics: [
      { value: 20, suffix: "+", label: "कृषि वैज्ञानिक" },
      { value: 2000, suffix: "+", label: "किसान जुड़े" },
      { value: 15, prefix: "< ", suffix: " मिनट", label: "त्वरित रिस्पांस" },
    ],
    features: [
      "व्हाट्सएप फोटो से 15 मिनट में रोग पहचान",
      "फसल चरण अनुसार स्प्रे व पोषण शेड्यूल",
      "वरिष्ठ कृषि डॉक्टरों से सीधी बातचीत",
    ],
    ctaText: "कृषि डॉक्टर से बात करें",
    ctaHref: "/services#farm-tech",
    imageSrc: "/farm.png",
    imageAlt: "खेत पर कृषि वैज्ञानिक सहायता",
  },
  {
    id: "pillar-nursery",
    number: "02",
    tag: "बायो-बूस्टेड नर्सरी",
    title: "उच्च रोग प्रतिरोधक क्षमता वाली प्लग पौध",
    description:
      "वातानुकूलित जर्मिनेशन में तैयार 100% निरोगी पौधे, जो देते हैं बिना किसी रोपाई झटके के तेज बढ़वार और बंपर पैदावार।",
    metrics: [
      { value: 85, suffix: " लाख+", label: "सप्लाई पौध" },
      { value: 98, suffix: "%", label: "जमाव व बचाव दर" },
      { value: 100, suffix: "+", label: "उन्नत किस्में" },
    ],
    features: [
      "रोगों से लड़ने की प्राकृतिक जैविक क्षमता",
      "रोपाई का झटका शून्य, खेत में तुरंत बढ़वार",
      "मजबूत जड़ें जो दें 15-30% अधिक उपज",
    ],
    ctaText: "नर्सरी पौध देखें",
    ctaHref: "/services#nursery",
    imageSrc: "/nursery.png",
    imageAlt: "बायो-बूस्टेड नर्सरी पौध",
  },
  {
    id: "pillar-market",
    number: "03",
    tag: "मार्केट व कार्बन",
    title: "पक्की फसल खरीद व कार्बन क्रेडिट्स से अतिरिक्त आय",
    description:
      "सीधे संस्थागत खरीदारों को बिक्री, खेत पर डिजिटल तौल और बिना किसी बिचौलिये के पक्का भुगतान।",
    metrics: [
      { value: 15000, suffix: "+", label: "एकड़ रकबा" },
      { value: 10, prefix: "₹", suffix: " करोड़+", label: "किसान भुगतान" },
      { value: 100, suffix: "%", label: "पारदर्शी व्यवस्था" },
    ],
    features: [
      "फसल कटाई से पहले पक्का बायबैक अनुबंध",
      "खेत पर डिजिटल वजन व तुरंत बैंक भुगतान",
      "टिकाऊ खेती से प्रति एकड़ कार्बन क्रेडिट कमाई",
    ],
    ctaText: "मार्केट लिंकेज समझें",
    ctaHref: "/services#market-linkage",
    imageSrc: "/carbon credits.png",
    imageAlt: "बायबैक और कार्बन क्रेडिट्स",
  },
];

export default function PillarsHorizontalParallax() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const PILLARS_DATA = isHindi ? PILLARS_DATA_HI : PILLARS_DATA_EN;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (>= 768px): Pinned Horizontal Scroll with GSAP Snap
      mm.add("(min-width: 768px)", () => {
        const panelsCount = PILLARS_DATA.length;
        const totalShiftPercent = -((panelsCount - 1) / panelsCount) * 100;

        const horizontalTween = gsap.to(track, {
          xPercent: totalShiftPercent,
          ease: "none",
          scrollTrigger: {
            id: "pillars-horizontal-st",
            trigger: container,
            pin: true,
            start: "top top",
            end: () => `+=${(panelsCount - 1) * window.innerWidth}`,
            scrub: 0.5,
            snap: {
              snapTo: 1 / (panelsCount - 1),
              duration: { min: 0.2, max: 0.45 },
              ease: "power2.out",
            },
            invalidateOnRefresh: true,
          },
        });

        return () => {
          horizontalTween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="pillars-section"
      className="relative z-10 bg-[#f4f8f5] border-t border-[#143d31]/10 overflow-hidden shadow-[0_-24px_50px_rgba(13,42,33,0.06)]"
    >
      {/* ── DESKTOP & TABLET: Pinned Horizontal Scroll (>= 768px) ── */}
      <div className="hidden md:block w-full h-screen relative overflow-hidden">
        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex h-full items-center will-change-transform"
          style={{
            width: `${PILLARS_DATA.length * 100}vw`,
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {PILLARS_DATA.map((pillar) => (
            <div
              key={pillar.id}
              className="w-[100vw] h-screen shrink-0 flex items-center justify-center px-6 sm:px-12 lg:px-16 pt-20 pb-16"
            >
              <div className="mx-auto max-w-7xl w-full grid grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Text Column (Left) */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center max-w-xl lg:pr-6">
                  {/* Eyebrow / Tag */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                      {pillar.number} · {pillar.tag}
                    </p>
                  </div>

                  {/* Headline */}
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
                    {pillar.title}
                  </h2>

                  {/* Description */}
                  <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
                    {pillar.description}
                  </p>

                  {/* Metrics Strip */}
                  <div className="my-6 border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-2">
                    {pillar.metrics.map((m, mIdx) => (
                      <div
                        key={m.label}
                        className={`text-left ${
                          mIdx > 0
                            ? "border-l border-[#143d31]/10 pl-3"
                            : "first:border-l-0 first:pl-0"
                        }`}
                      >
                        <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                          <CountUp to={m.value} prefix={m.prefix || ""} suffix={m.suffix || ""} />
                        </p>
                        <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {pillar.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#143d31]"
                      >
                        <CheckCircle className="h-4 w-4 text-[#143d31] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div>
                    <MagneticButton strength={0.25} as="a" href={pillar.ctaHref}>
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#143d31] px-6 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a4d3e] transition-all cursor-pointer">
                        <span>{pillar.ctaText}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-white" />
                      </span>
                    </MagneticButton>
                  </div>
                </div>

                {/* Visual Column (Right) */}
                <div className="col-span-12 lg:col-span-6 relative flex items-center justify-center">
                  <div className="w-full flex items-center justify-center">
                    <TiltCard maxTilt={4} glare={false} className="w-full">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative w-full flex items-center justify-center p-0"
                      >
                        <img
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full max-h-[360px] sm:max-h-[420px] lg:max-h-[460px] object-contain drop-shadow-xl"
                        />
                      </motion.div>
                    </TiltCard>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE VIEW: Seamless Vertical Stack (< 768px) ── */}
      <div className="block md:hidden py-12 px-5 space-y-12 divide-y divide-[#143d31]/10">
        {PILLARS_DATA.map((pillar) => (
          <div key={pillar.id} className="pt-8 first:pt-0 space-y-5">
            {/* Tag */}
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {pillar.number} · {pillar.tag}
              </p>
            </div>

            <h3 className="font-display text-2xl font-bold text-[#143d31] leading-tight">
              {pillar.title}
            </h3>

            <p className="font-sans text-sm text-[#4f624f] leading-relaxed font-normal">
              {pillar.description}
            </p>

            {/* Visual */}
            <div className="relative w-full flex items-center justify-center my-4">
              <img
                src={pillar.imageSrc}
                alt={pillar.imageAlt}
                className="w-full max-h-[260px] object-contain drop-shadow-lg"
              />
            </div>

            {/* Metrics */}
            <div className="border-y border-[#143d31]/10 py-3 grid grid-cols-3 gap-1">
              {pillar.metrics.map((m, mIdx) => (
                <div
                  key={m.label}
                  className={`text-left ${mIdx > 0 ? "border-l border-[#143d31]/10 pl-2" : ""}`}
                >
                  <p className="font-display text-xl font-bold text-[#143d31]">
                    <CountUp to={m.value} prefix={m.prefix || ""} suffix={m.suffix || ""} />
                  </p>
                  <p className="font-mono text-[9px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-2">
              {pillar.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs font-medium text-[#143d31]"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-[#143d31] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href={pillar.ctaHref}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#143d31] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#1a4d3e] transition-colors"
              >
                <span>{pillar.ctaText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
