import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { CountUp, TiltCard } from "@/components/common/motion";
import { useTranslation } from "react-i18next";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

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
    imageSrc: "/agripark.png",
    imageAlt: "High-Immunity Seedling Infrastructure",
  },
  {
    id: "pillar-market",
    number: "03",
    tag: "Market Linkage",
    title: "Guaranteed Buyback & Direct Offtake",
    description:
      "Pre-sowing price contracts, transparent digital weighing, and instant T+0 farm-gate payouts.",
    metrics: [
      { value: 15000, suffix: "+", label: "Acres Associated" },
      { value: 12, prefix: "₹", suffix: " Cr+", label: "Farmer Payouts" },
      { value: 0, suffix: "%", label: "Middleman Cut" },
    ],
    features: [
      "Pre-sowing price floor guarantee",
      "Digital weighment & instant UPI payout",
      "Direct institutional buyer linkage",
    ],
    ctaText: "View Market Linkage",
    ctaHref: "/services#market-linkage",
    imageSrc: "/market-linkage.png",
    imageAlt: "Agaate farm-gate harvest aggregation and market linkage",
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
    imageSrc: "/agripark.png",
    imageAlt: "बायो-बूस्टेड नर्सरी पौध",
  },
  {
    id: "pillar-market",
    number: "03",
    tag: "मार्केट लिंकेज",
    title: "गारंटीड फसल बायबैक व सीधी खरीद",
    description:
      "बुवाई से पहले पक्का रेट अनुबंध, खेत पर डिजिटल तौल और तुरंत T+0 बैंक खाता भुगतान।",
    metrics: [
      { value: 15000, suffix: "+", label: "एकड़ रकबा" },
      { value: 12, prefix: "₹", suffix: " करोड़+", label: "किसान भुगतान" },
      { value: 0, suffix: "%", label: "बिचौलिया कमीशन" },
    ],
    features: [
      "बुवाई पूर्व न्यूनतम मूल्य गारंटी",
      "खेत पर डिजिटल वजन व त्वरित भुगतान",
      "रिलायंस व बिगबास्केट जैसी कंपनियों को सीधी आपूर्ति",
    ],
    ctaText: "मार्केट लिंकेज देखें",
    ctaHref: "/services#market-linkage",
    imageSrc: "/market-linkage.png",
    imageAlt: "अगाते फसल खरीद व मार्केट लिंकेज",
  },
];

export default function PillarsHorizontalParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const isHindi = currentLang.startsWith("hi");
  const PILLARS_DATA = isHindi ? PILLARS_DATA_HI : PILLARS_DATA_EN;

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const panels = gsap.utils.toArray<HTMLElement>(".horizontal-panel", track);
      if (panels.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const panelsCount = panels.length;
        // The track has width of panelsCount * 100vw (300vw for 3 panels).
        // To translate by (panelsCount - 1) screens, xPercent of track width must be -((panelsCount - 1) / panelsCount) * 100.
        const totalShiftPercent = -((panelsCount - 1) / panelsCount) * 100;

        const tween = gsap.to(track, {
          xPercent: totalShiftPercent,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => `+=${(panelsCount - 1) * window.innerWidth}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [isHindi] }
  );

  return (
    <section
      ref={containerRef}
      id="three-pillars"
      className="relative bg-[#f4f8f5] text-[#143d31] border-t border-[#143d31]/10 overflow-hidden"
    >
      <div className="hidden md:block h-screen w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full w-[300vw] will-change-transform"
        >
          {PILLARS_DATA.map((pillar) => (
            <div
              key={pillar.id}
              className="horizontal-panel relative flex h-full w-[100vw] shrink-0 items-center justify-center px-6 sm:px-12 lg:px-16"
            >
              <div className="mx-auto w-full max-w-7xl grid grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center max-w-xl">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                      {pillar.number} · {pillar.tag}
                    </p>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
                    {pillar.title}
                  </h2>

                  <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
                    {pillar.description}
                  </p>

                  <div className="my-6 border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-2">
                    {pillar.metrics.map((m, mIdx) => (
                      <div
                        key={m.label}
                        className={`text-left ${mIdx > 0
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

                  <div>
                    <SlideUpPillButton
                      href={pillar.ctaHref}
                      variant="dark"
                      size="md"
                      label={pillar.ctaText}
                      icon={<ArrowRight className="h-4 w-4" />}
                      iconPosition="right"
                    />
                  </div>
                </div>

                {/* Visual Column (Right) */}
                <div className="col-span-12 lg:col-span-6 relative flex items-center justify-center">
                  {pillar.id === "pillar-market" ? (
                    <div className="relative w-full max-w-[540px] aspect-[16/11] overflow-hidden rounded-3xl border border-[#143d31]/12 bg-white shadow-[0_24px_50px_rgba(13,40,32,0.12)] group">
                      <img
                        src="/services/market-linkage-harvest.jpg"
                        alt={pillar.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Bottom Floating Telemetry Panel */}
                      <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-3 px-4 border border-[#143d31]/10 shadow-lg">
                        <div className="flex flex-col">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                            Institutional Offtake & Mandi Linkage
                          </span>
                          <span className="font-display text-xs font-bold text-[#143d31]">
                            Reliance · BigBasket · Direct Mandi Offtake
                          </span>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="font-mono text-[10px] font-bold text-[#143d31] bg-[#a3e635]/30 border border-[#a3e635]/50 px-2.5 py-1 rounded-full">
                            T+0 Farm-Gate UPI
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
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
                  )}
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
            {pillar.id === "pillar-market" ? (
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-[#143d31]/12 bg-white shadow-md my-4">
                <img
                  src="/services/market-linkage-harvest.jpg"
                  alt={pillar.imageAlt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-2.5 inset-x-2.5 rounded-xl bg-white/95 backdrop-blur-sm p-2 border border-[#143d31]/10 text-left">
                  <p className="font-mono text-[9px] font-bold text-[#5d7d37] uppercase">Institutional Offtake</p>
                  <p className="font-display text-[11px] font-bold text-[#143d31]">Direct Mandi Linkage · T+0 Payouts</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full flex items-center justify-center my-4">
                <img
                  src={pillar.imageSrc}
                  alt={pillar.imageAlt}
                  className="w-full max-h-[260px] object-contain drop-shadow-lg"
                />
              </div>
            )}

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
              <SlideUpPillButton
                href={pillar.ctaHref}
                variant="dark"
                size="md"
                label={pillar.ctaText}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                fullWidth
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
