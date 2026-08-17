import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Buildings, Leaf, ShoppingBagOpen } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Marquee } from "@/components/ui/testimonials-13-utils/marquee";
import { EASE, Reveal } from "@/components/common/motion";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { cn } from "@/lib/utils";

type BrandTab = "partners" | "customers" | "buyers";

type BrandLogo = {
  name: string;
  src: string;
};

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
];

/** Logos sourced from agaate.in /data/brands.js */
const BRANDS: Record<BrandTab, BrandLogo[]> = {
  partners: [
    {
      name: "Coromandel",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768289198/coromandel_sgjzct.png",
    },
    {
      name: "Ravi",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298183/ravi_e6yg0j.png",
    },
    {
      name: "Indus",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298206/indus_j41n1o.png",
    },
    {
      name: "Netafim",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298152/netafim_ayhi1x.png",
    },
    {
      name: "Vihaan",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298261/vihaan_yzqhdy.png",
    },
    {
      name: "Known-You Seed",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298299/known-you_rlfhmu.png",
    },
    {
      name: "Aries Agro",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768289196/aries_kxccjq.png",
    },
    {
      name: "Namdhari Seeds",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768562662/Naamdhari_seeds_xq4a4d.png",
    },
    {
      name: "Syngenta",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768894202/Syngenta_nflip5.png",
    },
    {
      name: "Seminis",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768895033/Seminis_oyretu.png",
    },
  ],
  customers: [
    {
      name: "DS Group",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768560703/DS_y9vrlk.png",
    },
    {
      name: "Harit Bhoomi",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768560925/Harit_Bhoomi_h64koo.png",
    },
    {
      name: "FPO Network",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768561266/FPO_wokfze.png",
    },
  ],
  buyers: [
    {
      name: "Blinkit",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768289196/blinkit_dzjrag.png",
    },
    {
      name: "SNS",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298331/sns_ilisot.png",
    },
    {
      name: "Handpickd",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298381/Handpickd_iygla7.jpg",
    },
    {
      name: "Local Mandi",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298412/localmandi_sanyvw.jpg",
    },
    {
      name: "Flipkart",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768561427/Flipkart_yiiedx.png",
    },
    {
      name: "Aadat Mandi",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768893718/aadat_mandi_zicmdx.png",
    },
  ],
};

function BrandTile({ brand }: { brand: BrandLogo }) {
  return (
    <div className="flex h-[72px] w-[150px] shrink-0 items-center justify-center rounded-xl bg-white/70 px-5 border border-[#143d31]/10 hover:border-[#5d7d37]/40 transition-all sm:h-[84px] sm:w-[180px]">
      <img
        src={brand.src}
        alt={brand.name}
        loading="lazy"
        decoding="async"
        className="max-h-10 w-full object-contain sm:max-h-12"
      />
    </div>
  );
}

export default function BrandsAssociationsChapter() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const TABS = isHindi ? TABS_HI : TABS_EN;

  const sectionRef = useHomeChapterReveal("fade-up");
  const [tab, setTab] = useState<BrandTab>("partners");
  const active = useMemo(() => TABS.find((t) => t.id === tab)!, [TABS, tab]);
  const logos = BRANDS[tab];
  const useDualRow = logos.length >= 8;

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="relative scroll-mt-24 overflow-x-clip bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10 text-[#143d31]"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-10">
        <Reveal variant="fade-up">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {isHindi ? "नेटवर्क व साझेदार" : "Network & Associations"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl">
                {isHindi ? "प्रमुख ब्रांड्स एवं साझेदार" : "Brands & Associations"}
              </h2>

              <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
                {isHindi
                  ? "वे प्रतिष्ठित कंपनियां, किसान नेटवर्क और मार्केट खरीदार जो बीज से बिक्री तक अगाते को सशक्त बनाते हैं।"
                  : "The companies, farmer networks, and market channels that power Agaate from seed to sale."}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <div
            role="tablist"
            aria-label="Brand categories"
            className="flex w-fit max-w-full flex-wrap items-center gap-2 rounded-full bg-[#143d31]/5 p-1 border border-[#143d31]/10"
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
                    "relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-colors cursor-pointer",
                    selected ? "bg-[#143d31] text-white shadow-xs" : "text-[#4f624f] hover:text-[#143d31]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs font-medium text-[#4f624f]">
            {active.hint}
          </p>
        </Reveal>

        <div className="relative pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-3"
            >
              {useDualRow ? (
                <>
                  <Marquee
                    pauseOnHover
                    className="[--duration:50s] [--gap:1rem] py-1"
                  >
                    {logos.slice(0, Math.ceil(logos.length / 2)).map((brand) => (
                      <BrandTile key={`${tab}-a-${brand.name}`} brand={brand} />
                    ))}
                  </Marquee>
                  <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:60s] [--gap:1rem] py-1"
                  >
                    {logos.slice(Math.ceil(logos.length / 2)).map((brand) => (
                      <BrandTile key={`${tab}-b-${brand.name}`} brand={brand} />
                    ))}
                  </Marquee>
                </>
              ) : (
                <Marquee
                  pauseOnHover
                  className="[--duration:45s] [--gap:1rem] py-1"
                >
                  {logos.map((brand) => (
                    <BrandTile key={`${tab}-${brand.name}`} brand={brand} />
                  ))}
                </Marquee>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="pt-2 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#5d7d37]">
          25+ verified manufacturer &amp; market relationships
        </p>
      </div>
    </section>
  );
}
