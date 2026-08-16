import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Buildings, Leaf, ShoppingBagOpen } from "@phosphor-icons/react";
import { Marquee } from "@/components/ui/testimonials-13-utils/marquee";
import { EASE, Reveal } from "@/components/common/motion";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { cn } from "@/lib/utils";

type BrandTab = "partners" | "customers" | "buyers";

type BrandLogo = {
  name: string;
  src: string;
};

const TABS: {
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
    label: "Veg Buyers",
    hint: "Market channels connected through our linkage network",
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
    <div className="group flex h-[80px] w-[160px] shrink-0 items-center justify-center rounded-[20px] bg-white/40 px-6 transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_-12px_rgba(20,61,49,0.12)] sm:h-[100px] sm:w-[200px] cursor-pointer">
      <img
        src={brand.src}
        alt={brand.name}
        loading="lazy"
        decoding="async"
        className="max-h-12 w-full object-contain transition-transform duration-500 group-hover:scale-110 sm:max-h-14"
      />
    </div>
  );
}

export default function BrandsAssociationsChapter() {
  const sectionRef = useHomeChapterReveal("fade-up");
  const [tab, setTab] = useState<BrandTab>("partners");
  const active = useMemo(() => TABS.find((t) => t.id === tab)!, [tab]);
  const logos = BRANDS[tab];
  const useDualRow = logos.length >= 8;

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="relative scroll-mt-28 overflow-x-clip bg-white py-20 md:py-32"
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
            <div className="mb-6 inline-flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 rounded-full bg-[#a3e635]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#143d31]">
                Network
              </p>
              <span className="h-[2px] w-8 rounded-full bg-[#a3e635]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-[#143d31] md:text-5xl lg:text-6xl">
              Brands &amp; Associations
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#536253] md:text-lg">
              The companies, farmer networks, and market channels that power Agaate from seed to sale.
            </p>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <div
            role="tablist"
            aria-label="Brand categories"
            className="mx-auto mt-12 flex w-fit max-w-full items-center justify-center gap-1.5 sm:gap-2 rounded-[24px] bg-[#f4f7ef]/60 p-1.5 sm:p-2 ring-1 ring-[#143d31]/5 backdrop-blur-sm overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-nowrap"
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
                    "relative z-10 inline-flex items-center gap-1.5 sm:gap-2 rounded-[20px] px-3.5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-bold transition-colors duration-300 focus-visible:outline-none whitespace-nowrap",
                    selected ? "text-white" : "text-[#143d31]/60 hover:text-[#143d31]"
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="brand-tab-bubble"
                      className="absolute inset-0 z-[-1] rounded-[20px] bg-[#143d31] shadow-lg shadow-[#143d31]/20"
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
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-6 max-w-lg text-center text-sm font-medium text-[#536253]"
          >
            {active.hint}
          </motion.p>
        </Reveal>

        <div className="relative mt-12 md:mt-16">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-24 md:w-40"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-24 md:w-40"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="space-y-4 sm:space-y-6"
            >
              {useDualRow ? (
                <>
                  <Marquee pauseOnHover className="[--duration:50s] [--gap:1.5rem] py-2">
                    {logos.slice(0, Math.ceil(logos.length / 2)).map((brand) => (
                      <BrandTile key={`${tab}-a-${brand.name}`} brand={brand} />
                    ))}
                  </Marquee>
                  <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:60s] [--gap:1.5rem] py-2"
                  >
                    {logos.slice(Math.ceil(logos.length / 2)).map((brand) => (
                      <BrandTile key={`${tab}-b-${brand.name}`} brand={brand} />
                    ))}
                  </Marquee>
                </>
              ) : (
                <Marquee pauseOnHover className="[--duration:45s] [--gap:1.5rem] py-2">
                  {logos.map((brand) => (
                    <BrandTile key={`${tab}-${brand.name}`} brand={brand} />
                  ))}
                </Marquee>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-16 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#143d31]/30">
          25+ verified manufacturer &amp; market relationships
        </p>
      </div>
    </section>
  );
}
