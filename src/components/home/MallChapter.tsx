import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import seedsImage from "@/assets/product-seeds.jpg";
import fertiliserImage from "@/assets/product-fertiliser.jpg";
import irrigationImage from "@/assets/product-irrigation.jpg";
import toolsImage from "@/assets/product-tools.jpg";

const shelves = [
  {
    label: "Seeds",
    solves: "Right variety for your soil and season",
    detail: "Vegetable and staple varieties from certified partners",
    image: seedsImage,
  },
  {
    label: "Bio-inputs",
    solves: "Better growth, lower chemical dependency",
    detail: "Biocures, growth promoters, biological nutrition",
    image: fertiliserImage,
  },
  {
    label: "Irrigation",
    solves: "Water and nutrients exactly when needed",
    detail: "Drip systems, fertigation, precision water planning",
    image: irrigationImage,
  },
  {
    label: "Crop support",
    solves: "Protect yield from sowing to harvest",
    detail: "Mulching, staking, tools, harvest gear",
    image: toolsImage,
  },
];

const comparison = [
  {
    before: "Guessing between similar products",
    after: "Expert-matched inputs for your exact crop and stage",
  },
  {
    before: "Unknown brands and mixed quality",
    after: "25+ verified manufacturer partners — no middlemen",
  },
  {
    before: "Multiple shops, multiple trips",
    after: "500+ essentials in one place, one visit",
  },
];

export default function MallChapter() {
  const sectionRef = useHomeChapterReveal();
  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  return (
    <section
      ref={sectionRef}
      id="kisaan-mall"
      className="relative scroll-mt-20 overflow-hidden bg-white px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div data-home-reveal className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1px] bg-[#9a5a2c]/40" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a5a2c]">
                Agaate Kisaan Mall
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              Once you know what your crop needs,{" "}
              <span className="font-serif italic font-normal text-[#9a5a2c]">
                getting the right input matters just as much.
              </span>
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="font-sans border-l border-[#143d31]/15 pl-6 text-sm md:text-base leading-relaxed text-[#536253] font-normal md:pl-8">
              Farmers should not have to guess between ten similar packets on a shelf. Kisaan Mall
              connects expert guidance with genuine seeds, biologicals, irrigation systems,
              mulching, staking material, and harvest tools — all sourced from trusted partners.
            </p>
          </div>
        </div>

        {/* Product shelves — 4 image cards */}
        <div data-home-reveal className="mt-12 grid gap-4 md:grid-cols-4">
          {shelves.map((item) => (
            <div
              key={item.label}
              className="group relative min-h-[320px] overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#143d31]/10"
            >
              <img
                src={item.image}
                alt={`${item.label} at Agaate Kisaan Mall`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102c24]/92 via-[#102c24]/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white transition-transform duration-300 group-hover:-translate-y-1">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#b7cf79]">
                  {item.solves}
                </p>
                <p className="font-display mt-1 text-xl md:text-2xl font-bold tracking-tight text-white">
                  {item.label}
                </p>
                <p className="font-sans mt-1 text-xs leading-relaxed text-white/80 font-normal">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Before / After comparison strip */}
        <div
          data-home-reveal
          className="mt-12 overflow-hidden rounded-2xl border border-[#143d31]/10"
        >
          <div className="grid bg-[#f3f1e7] px-7 py-4 md:grid-cols-2 md:px-10">
            <p className="font-jet text-[10px] font-bold uppercase tracking-[0.18em] text-[#143d31]/40">
              Traditional input buying
            </p>
            <p className="font-jet text-[10px] font-bold uppercase tracking-[0.18em] text-[#5d7d37] md:pl-6 md:border-l md:border-[#143d31]/10">
              Agaate Kisaan Mall
            </p>
          </div>
          {comparison.map((row, i) => (
            <div key={i} className="grid border-t border-[#143d31]/8 bg-white md:grid-cols-2">
              <div className="px-7 py-5 text-sm leading-6 text-[#888a7a] line-through md:px-10">
                {row.before}
              </div>
              <div className="border-t border-[#143d31]/8 px-7 py-5 text-sm font-semibold leading-6 text-[#143d31] md:border-l md:border-t-0 md:px-10">
                <span className="mr-2 text-[#5d7d37]">→</span>
                {row.after}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div data-home-reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to={getLocalizedPath("/services", currentLang) as any}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#143d31] px-8 py-4 text-sm font-extrabold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#143d31]/20"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop at Kisaan Mall
          </Link>
          <a
            href="tel:9487263498"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#143d31]/20 px-8 py-4 text-sm font-extrabold text-[#143d31] transition-all hover:bg-[#edf5dd] hover:-translate-y-1"
          >
            Call for recommendations
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
