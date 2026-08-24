import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Buildings, Leaf, ShoppingBagOpen, GraduationCap } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Marquee } from "@/components/ui/testimonials-13-utils/marquee";
import { EASE, Reveal } from "@/components/common/motion";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { cn } from "@/lib/utils";
import { HOMEPAGE_CMS_FALLBACK } from "@/data/homepage-fallback";
import type { CmsBrandGroup, HomeCmsLogo } from "@/lib/cms-types";

type BrandTab = CmsBrandGroup;

type BrandLogo = HomeCmsLogo;

const TABS_EN: {
  id: BrandTab;
  label: string;
  hint: string;
  icon: typeof Buildings;
}[] = [
  {
    id: "partners",
    label: "Partners",
    hint: "Certified agri-input manufacturers we source from directly",
    icon: Buildings,
  },
  {
    id: "customers",
    label: "Customers",
    hint: "Farmer groups and field networks growing with Agaate",
    icon: Leaf,
  },
  {
    id: "buyers",
    label: "Market access",
    hint: "Market channels connected through our linkage network",
    icon: ShoppingBagOpen,
  },
  {
    id: "institutional",
    label: "Institutional Tieups",
    hint: "Academic, university, and research institutions partnering with Agaate",
    icon: GraduationCap,
  },
];

const TABS_HI: {
  id: BrandTab;
  label: string;
  hint: string;
  icon: typeof Buildings;
}[] = [
  {
    id: "partners",
    label: "साझेदार ब्रांड्स",
    hint: "प्रमाणित बीज व इनपुट निर्माता जिनसे हम सीधे उत्पाद लेते हैं",
    icon: Buildings,
  },
  {
    id: "customers",
    label: "किसान समूह (FPOs)",
    hint: "अगाते के साथ जुड़े प्रगतिशील किसान व फार्म नेटवर्क",
    icon: Leaf,
  },
  {
    id: "buyers",
    label: "मार्केट खरीदार",
    hint: "हमारे लिंकेज नेटवर्क से जुड़े बड़े संस्थागत खरीदार",
    icon: ShoppingBagOpen,
  },
  {
    id: "institutional",
    label: "संस्थागत साझेदारी",
    hint: "अगाते के साथ जुड़े शैक्षणिक व अनुसंधान संस्थान",
    icon: GraduationCap,
  },
];

function BrandTile({ brand, isSingle }: { brand: BrandLogo; isSingle?: boolean }) {
  return (
    <div
      className={cn(
        "group flex shrink-0 items-center justify-center rounded-[20px] bg-white/70 px-6 transition-all duration-300 hover:bg-white hover:shadow-[0_10px_30px_-10px_rgba(20,61,49,0.15)] border border-[#143d31]/5 hover:border-[#143d31]/15 cursor-pointer",
        isSingle
          ? "h-[115px] w-[280px] sm:h-[135px] sm:w-[360px] px-8 shadow-sm"
          : "h-[84px] w-[180px] sm:h-[98px] sm:w-[215px]",
      )}
    >
      <img
        src={brand.src}
        alt={brand.name}
        loading="lazy"
        decoding="async"
        className={cn(
          "w-full object-contain transition-transform duration-300 group-hover:scale-105",
          isSingle ? "max-h-16 sm:max-h-20" : "max-h-12 sm:max-h-14",
        )}
      />
    </div>
  );
}

export default function BrandsAssociationsChapter({
  brands,
}: {
  brands?: Record<BrandTab, BrandLogo[]>;
}) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const TABS = isHindi ? TABS_HI : TABS_EN;
  const brandData = brands ?? HOMEPAGE_CMS_FALLBACK.logos;

  const sectionRef = useHomeChapterReveal("fade-up");
  const [tab, setTab] = useState<BrandTab>("partners");
  const active = useMemo(() => TABS.find((t) => t.id === tab)!, [TABS, tab]);
  const logos = brandData[tab]?.length ? brandData[tab] : HOMEPAGE_CMS_FALLBACK.logos[tab];
  const isSingleLogo = logos.length === 1;
  const isDualRow = logos.length >= 8;
  const repeatCount = logos.length <= 4 ? 8 : 5;

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="relative scroll-mt-24 overflow-x-clip bg-white py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#143d31]/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(163,230,53,0.15),transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal variant="fade-up">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center justify-center gap-2.5">
              <span className="h-[2px] w-7 sm:w-8 rounded-full bg-[#a3e635]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#143d31]">
                {isHindi ? "नेटवर्क" : "Network"}
              </p>
              <span className="h-[2px] w-7 sm:w-8 rounded-full bg-[#a3e635]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#143d31] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {isHindi ? "प्रमुख ब्रांड्स एवं साझेदार" : "Brands & Associations"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#536253]">
              {isHindi
                ? "वे प्रतिष्ठित कंपनियां, किसान नेटवर्क और मार्केट खरीदार जो बीज से बिक्री तक अगाते को सशक्त बनाते हैं।"
                : "The companies, farmer networks, and market channels that power Agaate from seed to sale."}
            </p>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <div
            role="tablist"
            aria-label="Brand categories"
            className="mx-auto mt-8 flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-[22px] bg-[#f4f7ef]/60 p-2 ring-1 ring-[#143d31]/5 backdrop-blur-sm sm:mt-10"
          >
            {TABS.map((item) => {
              const Icon = item.icon;
              const selected = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "relative z-10 inline-flex items-center gap-2 rounded-[18px] px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-300 focus-visible:outline-none sm:px-6 sm:py-2.5",
                    selected ? "text-white" : "text-[#143d31]/60 hover:text-[#143d31]",
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="brand-tab-bubble"
                      className="absolute inset-0 z-[-1] rounded-[18px] bg-[#143d31] shadow-md shadow-[#143d31]/20"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                    />
                  )}
                  <Icon className="h-4 w-4" strokeWidth={selected ? 2 : 1.5} />
                  {item.label}
                </button>
              );
            })}
          </div>
          <motion.p
            key={tab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-4 max-w-md text-center text-xs font-medium text-[#536253] sm:text-sm"
          >
            {active.hint}
          </motion.p>
        </Reveal>

        <div className="relative mt-8 sm:mt-10">
          {!isSingleLogo && (
            <>
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-24 md:w-36"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-24 md:w-36"
                aria-hidden="true"
              />
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-3.5 sm:space-y-4"
            >
              {isSingleLogo ? (
                <div className="flex items-center justify-center py-4">
                  <BrandTile brand={logos[0]!} isSingle />
                </div>
              ) : isDualRow ? (
                <>
                  <Marquee
                    pauseOnHover
                    className="[--duration:50s] [--gap:1.25rem] sm:[--gap:1.5rem] py-1.5"
                    repeat={4}
                  >
                    {logos.slice(0, Math.ceil(logos.length / 2)).map((brand, i) => (
                      <BrandTile key={`${tab}-a-${brand.name}-${i}`} brand={brand} />
                    ))}
                  </Marquee>
                  <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:60s] [--gap:1.25rem] sm:[--gap:1.5rem] py-1.5"
                    repeat={4}
                  >
                    {logos.slice(Math.ceil(logos.length / 2)).map((brand, i) => (
                      <BrandTile key={`${tab}-b-${brand.name}-${i}`} brand={brand} />
                    ))}
                  </Marquee>
                </>
              ) : (
                <Marquee
                  pauseOnHover
                  className="[--duration:40s] [--gap:1.25rem] sm:[--gap:1.5rem] py-1.5"
                  repeat={repeatCount}
                >
                  {logos.map((brand, i) => (
                    <BrandTile key={`${tab}-${brand.name}-${i}`} brand={brand} />
                  ))}
                </Marquee>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-10 sm:mt-12 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#143d31]/35">
          25+ verified manufacturer &amp; market relationships
        </p>
      </div>
    </section>
  );
}
