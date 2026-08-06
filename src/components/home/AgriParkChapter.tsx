import {
  ArrowRight,
  BrainCircuit,
  Droplets,
  FlaskConical,
  GraduationCap,
  MapPin,
  Microscope,
  ShieldCheck,
  ShoppingCart,
  Sprout,
} from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import agroParkImage from "@/assets/agro-park.jpg";

const nurseryComparison = [
  {
    label: "Survival rate",
    traditional: "50 – 70%",
    bioBoosted: "90 – 98%",
  },
  {
    label: "Seed waste",
    traditional: "High — 30 to 50% wasted",
    bioBoosted: "Near zero",
  },
  {
    label: "Chemical usage",
    traditional: "Baseline — heavy dependency",
    bioBoosted: "50 – 70% reduction",
  },
  {
    label: "Yield improvement",
    traditional: "Baseline",
    bioBoosted: "15 – 30% higher",
  },
];

const zones = [
  { icon: Sprout, label: "Seed Zone", benefit: "Choose the right variety before you sow" },
  { icon: Microscope, label: "Nursery Zone", benefit: "See Bio-Boosted seedlings at every stage" },
  { icon: Droplets, label: "Irrigation Zone", benefit: "Compare drip and fertigation systems live" },
  { icon: FlaskConical, label: "Nutrition Zone", benefit: "Understand inputs from real crop trials" },
  { icon: BrainCircuit, label: "Tech & Drone Zone", benefit: "Watch AI and drone monitoring in action" },
  { icon: GraduationCap, label: "Training Hub", benefit: "Hands-on workshops and field learning days" },
  { icon: ShieldCheck, label: "Protection Zone", benefit: "Test crop protection on real disease pressure" },
  { icon: ShoppingCart, label: "Market Zone", benefit: "See how output connects to direct buyers" },
];

export default function AgriParkChapter() {
  const sectionRef = useHomeChapterReveal();
  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  return (
    <section
      ref={sectionRef}
      id="agri-park"
      className="relative scroll-mt-20 overflow-hidden bg-[#eaf0df] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Part 1: Bio-Boosted Nursery ────────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div data-home-reveal>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1px] bg-[#5d7d37]/40" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                Bio-Boosted nursery · 17-acre smart facility
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              Strong roots are the difference between <span className="font-serif italic font-normal text-[#5d7d37]">a good season and a lost one.</span>
            </h2>
            <p className="font-sans mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-[#4f624f] font-normal">
              Direct seed sowing is the biggest source of early-stage loss for most vegetable
              farmers. Agaate's Bio-Boosted nursery produces seedlings in a 17-acre AI-monitored
              facility — with dramatically better survival, reduced chemical need, and higher
              final yield.
            </p>
          </div>

          {/* Nursery before/after table */}
          <div data-home-reveal className="overflow-hidden rounded-2xl border border-[#143d31]/10 shadow-sm">
            <div className="grid grid-cols-3 bg-[#143d31] px-5 py-4 text-xs font-bold uppercase tracking-[0.12em]">
              <span className="text-white/50">Metric</span>
              <span className="text-white/50">Traditional sowing</span>
              <span className="text-[#b7cf79]">Bio-Boosted nursery</span>
            </div>
            {nurseryComparison.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-t border-[#143d31]/10 bg-white px-5 py-4 text-sm"
              >
                <span className="font-semibold text-[#143d31]">{row.label}</span>
                <span className="text-[#888a7a] line-through">{row.traditional}</span>
                <span className="font-bold text-[#3a6b28]">{row.bioBoosted}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────────── */}
        <div className="my-16 flex items-center gap-6">
          <div className="h-px flex-1 bg-[#143d31]/12" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#143d31]/40">
            And there is more
          </span>
          <div className="h-px flex-1 bg-[#143d31]/12" />
        </div>

        {/* ── Part 2: Agri Park ───────────────────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div data-home-reveal className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#143d31] px-4 py-2 text-xs font-bold text-[#b7cf79]">
                ★ India's First of Its Kind
              </div>
              <div className="flex items-center gap-2.5 mt-5 mb-2">
                <span className="w-5 h-[1px] bg-[#5d7d37]/40" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                  Agri Park — Kukrola, Gurugram
                </p>
              </div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
                One farm. Every solution. <span className="font-serif italic font-normal text-[#5d7d37]">Walk the complete crop journey.</span>
              </h3>
              <p className="font-sans mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-[#4f624f] font-normal">
                India's leading seed, irrigation, nutrition, protection, machinery, and market
                partners — demonstrated on real crops across the full seed-to-sale journey, all
                in one living farm. See it work before you use it on your land.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={getLocalizedPath("/agri-park", currentLang) as any}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#143d31] px-8 py-4 text-sm font-extrabold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#143d31]/20"
              >
                Plan an Agri Park visit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:9487263498"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#143d31]/20 px-8 py-4 text-sm font-extrabold text-[#143d31] transition-all hover:bg-white/60 hover:-translate-y-1"
              >
                Order nursery plants
              </a>
            </div>
          </div>

          {/* Farm image card */}
          <div data-home-reveal className="relative min-h-[480px] overflow-hidden rounded-[2.5rem] bg-[#143d31] shadow-xl shadow-[#143d31]/10 border-[6px] border-white/50">
            <img
              src={agroParkImage}
              alt="Agaate Agri Park and Bio-Boosted nursery"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07120f]/90 via-[#07120f]/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-bold backdrop-blur-md shadow-sm">
                <MapPin className="h-4 w-4 text-[#a3e635]" />
                Kukrola, Gurugram — 17 acres
              </div>
              <p className="font-display max-w-md text-xl md:text-2xl font-bold leading-snug text-white">
                Live demo plots, nursery trials, AI climate monitoring, drone spraying, and
                hands-on farmer training — all on one real farm.
              </p>
            </div>
          </div>
        </div>

        {/* Zone grid */}
        <div data-home-reveal className="mt-14">
          <p className="mb-6 font-jet text-[10px] font-bold uppercase tracking-[0.18em] text-[#143d31]/60">
            Walk the full crop journey — 8 dedicated zones
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
            {zones.map((zone) => {
              const Icon = zone.icon;
              return (
                <div
                  key={zone.label}
                  className="group flex flex-col gap-4 rounded-3xl bg-white/50 p-6 shadow-sm border border-white transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-md hover:shadow-[#143d31]/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f7ef] transition-colors group-hover:bg-[#e4edcc]">
                    <Icon className="h-6 w-6 text-[#476f2d]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-base font-extrabold leading-tight text-[#143d31]">{zone.label}</p>
                    <p className="mt-1.5 text-xs leading-5 text-[#536253]">{zone.benefit}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
