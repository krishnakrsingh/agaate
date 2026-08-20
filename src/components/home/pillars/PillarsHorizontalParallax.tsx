import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { CountUp } from "@/components/common/motion";
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
    imageSrc: "/nursery.png",
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
    imageSrc: "/services/market-linkage-harvest.jpg",
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
    imageSrc: "/nursery.png",
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
      "बड़े रिटेलर्स व निर्यातकों से सीधा जुड़ाव",
    ],
    ctaText: "मार्केट लिंकेज देखें",
    ctaHref: "/services#market-linkage",
    imageSrc: "/services/market-linkage-harvest.jpg",
    imageAlt: "खेत पर फसल खरीद व मार्केट लिंकेज",
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
      className="relative z-10 bg-[#f4f8f5] overflow-hidden"
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
              className="w-[100vw] h-screen shrink-0 flex items-center justify-center px-5 sm:px-10 lg:px-16 pt-20 pb-16"
            >
              <div className="mx-auto max-w-[1400px] w-full aspect-[16/10] max-h-[85vh] min-h-[600px] grid grid-cols-12 grid-rows-3 gap-4 lg:gap-6">
                
                {/* Main Hero Block */}
                <div className="col-span-8 row-span-2 relative bg-white rounded-[2rem] p-8 lg:p-12 overflow-hidden border border-[#143d31]/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between group hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-shadow duration-500">
                  {/* Text Content */}
                  <div className="relative z-20 max-w-[55%]">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="h-1.5 w-6 rounded-full bg-[#a3e635]" aria-hidden="true" />
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                        {pillar.number} · {pillar.tag}
                      </p>
                    </div>
                    <h2 className="font-display text-4xl lg:text-[46px] xl:text-[52px] font-bold tracking-tight text-[#143d31] leading-[1.08] mb-5">
                      {pillar.title}
                    </h2>
                    <p className="font-sans text-[15px] xl:text-base text-[#4f624f] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  
                  {/* CTA */}
                  <div className="relative z-20 mt-8">
                    <SlideUpPillButton
                      href={pillar.ctaHref}
                      variant="dark"
                      size="md"
                      label={pillar.ctaText}
                      icon={<ArrowRight className="h-4 w-4" />}
                      iconPosition="right"
                    />
                  </div>

                  {/* Image visually integrated on the right side */}
                  <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-end justify-end z-10">
                    {pillar.id === "pillar-market" ? (
                      <>
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                        <img 
                          src={pillar.imageSrc} 
                          alt={pillar.imageAlt} 
                          className="w-full h-full object-cover rounded-tl-[3rem] transition-transform duration-1000 group-hover:scale-105" 
                        />
                        {/* Telemetry panel for Market Linkage */}
                        <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 items-end">
                          <div className="rounded-2xl bg-white/95 backdrop-blur-md p-3 px-4 shadow-xl border border-white/40">
                            <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-[#5d7d37] mb-0.5">Institutional Offtake</span>
                            <span className="block font-display text-xs font-bold text-[#143d31]">Reliance · BigBasket · Exporters</span>
                          </div>
                          <div className="rounded-xl bg-[#a3e635] p-2 px-3 shadow-lg">
                            <span className="font-mono text-[10px] font-bold text-[#143d31] uppercase tracking-wide">T+0 Farm-Gate UPI</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <img 
                        src={pillar.imageSrc} 
                        alt={pillar.imageAlt} 
                        className="w-[120%] max-w-none max-h-[115%] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 group-hover:-translate-x-2 translate-x-8 translate-y-8" 
                      />
                    )}
                  </div>
                </div>

                {/* Metric 1 (Dark Green) */}
                <div className="col-span-4 row-span-1 bg-[#143d31] rounded-[2rem] p-6 xl:p-8 flex flex-col justify-center items-start shadow-sm hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group">
                  <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500" />
                  <p className="relative z-10 font-display text-4xl xl:text-5xl font-bold text-white tracking-tight mb-2">
                    <CountUp to={pillar.metrics[0].value} prefix={pillar.metrics[0].prefix || ""} suffix={pillar.metrics[0].suffix || ""} />
                  </p>
                  <p className="relative z-10 font-mono text-[11px] font-bold text-[#a3e635] uppercase tracking-wider">
                    {pillar.metrics[0].label}
                  </p>
                </div>

                {/* Features List */}
                <div className="col-span-4 row-span-2 bg-[#e8f0eb] rounded-[2rem] p-8 xl:p-10 flex flex-col justify-center shadow-sm border border-[#143d31]/5 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-white/40 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                  <h3 className="relative z-10 font-display text-lg xl:text-xl font-bold text-[#143d31]/60 mb-6 uppercase tracking-widest">Key Benefits</h3>
                  <div className="relative z-10 flex flex-col gap-5">
                    {pillar.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-[#5d7d37] shrink-0" weight="fill" />
                        <span className="text-[15px] font-semibold text-[#143d31] leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metric 2 (Lime) */}
                <div className="col-span-4 row-span-1 bg-[#a3e635] rounded-[2rem] p-6 xl:p-8 flex flex-col justify-center items-start shadow-sm hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group">
                  <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:bg-white/40 transition-colors duration-500" />
                  <p className="relative z-10 font-display text-4xl xl:text-5xl font-bold text-[#143d31] tracking-tight mb-2">
                    <CountUp to={pillar.metrics[1].value} prefix={pillar.metrics[1].prefix || ""} suffix={pillar.metrics[1].suffix || ""} />
                  </p>
                  <p className="relative z-10 font-mono text-[11px] font-bold text-[#143d31]/80 uppercase tracking-wider">
                    {pillar.metrics[1].label}
                  </p>
                </div>

                {/* Metric 3 (White) */}
                <div className="col-span-4 row-span-1 bg-white rounded-[2rem] p-6 xl:p-8 flex flex-col justify-center items-start shadow-sm border border-[#143d31]/5 hover:scale-[1.02] transition-transform duration-300">
                  <p className="font-display text-4xl xl:text-5xl font-bold text-[#143d31] tracking-tight mb-2">
                    <CountUp to={pillar.metrics[2].value} prefix={pillar.metrics[2].prefix || ""} suffix={pillar.metrics[2].suffix || ""} />
                  </p>
                  <p className="font-mono text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider">
                    {pillar.metrics[2].label}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE VIEW: Seamless Vertical Stack (< 768px) ── */}
      <div className="block md:hidden py-12 px-4 space-y-16">
        {PILLARS_DATA.map((pillar) => (
          <div key={pillar.id} className="flex flex-col gap-4">
             
             {/* Main Hero Card */}
             <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#143d31]/5 relative overflow-hidden flex flex-col group">
               <div className="relative z-20 mb-8">
                 <div className="flex items-center gap-2 mb-4">
                   <span className="h-1 w-4 rounded-full bg-[#a3e635]" aria-hidden="true" />
                   <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                     {pillar.number} · {pillar.tag}
                   </p>
                 </div>
                 <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#143d31] leading-[1.1] mb-3">
                   {pillar.title}
                 </h3>
                 <p className="font-sans text-sm sm:text-base text-[#4f624f] leading-relaxed">
                   {pillar.description}
                 </p>
               </div>
               
               {/* Visual */}
               <div className="relative w-full rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] bg-[#f4f8f5] flex items-center justify-center">
                 {pillar.id === "pillar-market" ? (
                   <>
                     <img src={pillar.imageSrc} alt={pillar.imageAlt} className="w-full h-full object-cover" />
                     <div className="absolute bottom-3 right-3 flex flex-col gap-2 items-end">
                       <div className="rounded-xl bg-white/95 backdrop-blur-md p-2 px-3 shadow-lg border border-white/40">
                         <span className="block font-mono text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">Institutional Offtake</span>
                       </div>
                       <div className="rounded-lg bg-[#a3e635] p-1.5 px-2.5 shadow-md">
                         <span className="font-mono text-[9px] sm:text-[11px] font-bold text-[#143d31] uppercase">T+0 UPI</span>
                       </div>
                     </div>
                   </>
                 ) : (
                   <img src={pillar.imageSrc} alt={pillar.imageAlt} className="w-[85%] object-contain drop-shadow-xl" />
                 )}
               </div>
             </div>

             {/* Metrics Cards Grid */}
             <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-[#143d31] rounded-[1.5rem] p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                  <p className="relative z-10 font-display text-3xl font-bold text-white mb-1">
                    <CountUp to={pillar.metrics[0].value} prefix={pillar.metrics[0].prefix || ""} suffix={pillar.metrics[0].suffix || ""} />
                  </p>
                  <p className="relative z-10 font-mono text-[10px] font-bold text-[#a3e635] uppercase tracking-wider">
                    {pillar.metrics[0].label}
                  </p>
                </div>
                <div className="bg-[#a3e635] rounded-[1.5rem] p-5 shadow-sm relative overflow-hidden">
                  <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-white/20 rounded-full blur-xl" />
                  <p className="relative z-10 font-display text-2xl font-bold text-[#143d31] mb-1">
                    <CountUp to={pillar.metrics[1].value} prefix={pillar.metrics[1].prefix || ""} suffix={pillar.metrics[1].suffix || ""} />
                  </p>
                  <p className="relative z-10 font-mono text-[9px] font-bold text-[#143d31]/80 uppercase tracking-wider">
                    {pillar.metrics[1].label}
                  </p>
                </div>
                <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-[#143d31]/5">
                  <p className="font-display text-2xl font-bold text-[#143d31] mb-1">
                    <CountUp to={pillar.metrics[2].value} prefix={pillar.metrics[2].prefix || ""} suffix={pillar.metrics[2].suffix || ""} />
                  </p>
                  <p className="font-mono text-[9px] font-bold text-[#5d7d37] uppercase tracking-wider">
                    {pillar.metrics[2].label}
                  </p>
                </div>
             </div>

             {/* Features & CTA */}
             <div className="bg-[#e8f0eb] rounded-[1.5rem] p-6 shadow-sm border border-[#143d31]/5 relative overflow-hidden">
               <div className="absolute right-0 top-0 w-24 h-24 bg-white/40 rounded-full blur-xl translate-x-1/2 -translate-y-1/2" />
               <h4 className="relative z-10 font-display text-sm font-bold text-[#143d31]/60 mb-4 uppercase tracking-widest">Key Benefits</h4>
               <div className="relative z-10 space-y-3.5 mb-6">
                 {pillar.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#5d7d37] shrink-0" weight="fill" />
                      <span className="text-sm font-semibold text-[#143d31] leading-snug">{feat}</span>
                    </div>
                 ))}
               </div>
               <div className="relative z-10">
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
             
          </div>
        ))}
      </div>
    </section>
  );
}
