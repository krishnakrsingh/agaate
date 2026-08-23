import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { CountUp, TiltCard } from "@/components/common/motion";
import { useTranslation } from "react-i18next";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { WHATSAPP_AGRONOMIST_URL } from "@/components/header/header-data";
import { AgriParkVisitModal } from "@/components/agri-park/AgriParkVisitModal";

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
    ctaHref: WHATSAPP_AGRONOMIST_URL,
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
    ctaText: "Book Visit",
    ctaHref: "#",
    imageSrc: "/bio-nursery.png",
    imageAlt: "High-Immunity Seedling Infrastructure",
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
    ctaHref: WHATSAPP_AGRONOMIST_URL,
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
    ctaText: "विजिट बुक करें",
    ctaHref: "#",
    imageSrc: "/bio-nursery.png",
    imageAlt: "बायो-बूस्टेड नर्सरी पौध",
  },
];

export default function PillarsHorizontalParallax() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const isHindi = currentLang.startsWith("hi");
  const PILLARS_DATA = isHindi ? PILLARS_DATA_HI : PILLARS_DATA_EN;
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  return (
    <>
      <section
        id="three-pillars"
        className="relative bg-[#f4f8f5] text-[#143d31] overflow-hidden scroll-mt-24 sm:scroll-mt-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-8 sm:pb-12 lg:pb-14 space-y-16 sm:space-y-24 lg:space-y-28">

          {PILLARS_DATA.map((pillar, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center scroll-mt-28 sm:scroll-mt-32 md:scroll-mt-36"
              >
                {/* Text Column */}
                <div
                  className={`col-span-12 lg:col-span-6 flex flex-col justify-center max-w-xl ${
                    isReversed ? "lg:order-2 lg:pl-4" : "lg:order-1 lg:pr-4"
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                      {pillar.tag}
                    </p>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.12]">
                    {pillar.title}
                  </h2>

                  <p className="font-sans mt-3.5 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
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
                        <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#143d31] tracking-tight">
                          <CountUp to={m.value} prefix={m.prefix || ""} suffix={m.suffix || ""} />
                        </p>
                        <p className="font-mono text-[9px] sm:text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
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
                        <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div>
                    {pillar.id === "pillar-nursery" ? (
                      <SlideUpPillButton
                        type="button"
                        onClick={() => setIsVisitModalOpen(true)}
                        variant="dark"
                        size="md"
                        label={pillar.ctaText}
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    ) : (
                      <SlideUpPillButton
                        href={pillar.ctaHref}
                        variant="dark"
                        size="md"
                        label={pillar.ctaText}
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    )}
                  </div>
                </div>

                {/* Visual Column */}
                <div
                  className={`col-span-12 lg:col-span-6 relative flex items-center justify-center ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
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
                          className="w-full max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] object-contain drop-shadow-xl"
                        />
                      </motion.div>
                    </TiltCard>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {isVisitModalOpen && (
        <AgriParkVisitModal
          isOpen={isVisitModalOpen}
          onClose={() => setIsVisitModalOpen(false)}
        />
      )}
    </>
  );
}
