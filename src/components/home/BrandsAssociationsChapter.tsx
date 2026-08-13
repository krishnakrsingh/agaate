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
    <div className="group flex h-[72px] w-[140px] shrink-0 items-center justify-center rounded-2xl border border-[#143d31]/10 bg-white px-4 py-3 shadow-[0_8px_24px_-18px_rgba(20,61,49,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#143d31]/25 hover:shadow-[0_16px_32px_-18px_rgba(20,61,49,0.4)] sm:h-[84px] sm:w-[168px] sm:px-5">
      <img
        src={brand.src}
        alt={brand.name}
        loading="lazy"
        decoding="async"
        className="max-h-10 w-full object-contain opacity-90 transition-all duration-300 group-hover:opacity-100 sm:max-h-12"
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
      className="relative scroll-mt-28 overflow-x-clip bg-white py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#143d31]/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(93,125,55,0.07),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal variant="fade-up">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center justify-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]/60" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                Network
              </p>
              <span className="h-px w-5 bg-[#5d7d37]/60" aria-hidden="true" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#143d31] md:text-4xl lg:text-5xl">
              Brands &amp; Associations
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#4f624f] md:text-base">
              The companies, farmer networks, and market channels that power Agaate from seed to sale.
            </p>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <div
            role="tablist"
            aria-label="Brand categories"
            className="mx-auto mt-10 flex w-fit max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-[#143d31]/12 bg-[#f4f8f5] p-1.5"
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
                    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143d31]/35 sm:px-5",
                    selected
                      ? "bg-[#143d31] text-white shadow-md"
                      : "text-[#143d31]/75 hover:bg-white hover:text-[#143d31]",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="mx-auto mt-4 max-w-lg text-center text-xs text-[#4f624f] sm:text-sm">
            {active.hint}
          </p>
        </Reveal>

        <div className="relative mt-10 md:mt-12">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-20 md:w-28"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-20 md:w-28"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-4"
            >
              {useDualRow ? (
                <>
                  <Marquee pauseOnHover className="[--duration:42s] [--gap:1rem] py-1">
                    {logos.slice(0, Math.ceil(logos.length / 2)).map((brand) => (
                      <BrandTile key={`${tab}-a-${brand.name}`} brand={brand} />
                    ))}
                  </Marquee>
                  <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:48s] [--gap:1rem] py-1"
                  >
                    {logos.slice(Math.ceil(logos.length / 2)).map((brand) => (
                      <BrandTile key={`${tab}-b-${brand.name}`} brand={brand} />
                    ))}
                  </Marquee>
                </>
              ) : (
                <Marquee pauseOnHover className="[--duration:36s] [--gap:1rem] py-1">
                  {logos.map((brand) => (
                    <BrandTile key={`${tab}-${brand.name}`} brand={brand} />
                  ))}
                </Marquee>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-10 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#143d31]/40">
          25+ verified manufacturer &amp; market relationships
        </p>
      </div>
    </section>
  );
}
