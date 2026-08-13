import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  Compass,
  MapPin,
  Plant,
  Shield,
  Sparkle,
  Users
} from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionCropWorld from "@/components/sections/SectionCropWorld";
import {
  CountUp,
  Marquee,
  PageHero,
  SectionHeader,
  Reveal,
  Stagger,
  StaggerItem,
  TiltCard,
  MagneticButton,
} from "@/components/common/motion";
import { HERO_STATS, ZONES_EIGHT, ALL_8_ZONES } from "@/components/agri-park/data";
import { ZoneBoard } from "@/components/agri-park/zone-board";
import { AgriParkVisitModal } from "@/components/agri-park/AgriParkVisitModal";
import agroParkImg from "@/assets/agro-park.jpg";
import {
  FirstOfKind,
  SmartNursery,
  TaglineBand,
  ZonesOverview,
} from "@/components/agri-park/sections";

const PAGE_TITLE = "Agaate Agri Park — India's First Collaborative Living Farm | Gurugram";
const PAGE_DESCRIPTION =
  "Explore Agaate's 17-acre collaborative living farm in Kukrola, Gurugram. Discover 8 masterplan innovation zones showcasing advanced seeds, drip irrigation, drone tech, and bio-nutrition.";

function buildJsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": "https://agaate.in/#organization",
    name: "Agaate",
    legalName: "Anzix Farm Technologies Pvt Ltd",
    url: "https://agaate.in",
    logo: "https://agaate.in/favicon.ico",
  };

  const agriParkPage = {
    "@type": "WebPage",
    "@id": "https://agaate.in/agri-park#page",
    url: "https://agaate.in/agri-park",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    isPartOf: { "@id": "https://agaate.in/#organization" },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, agriParkPage],
  };
}

export const Route = createFileRoute("/{-$locale}/agri-park")({
  head: () => {
    const jsonLd = JSON.stringify(buildJsonLd());
    return {
      meta: [
        { title: PAGE_TITLE },
        { name: "description", content: PAGE_DESCRIPTION },
        { property: "og:title", content: PAGE_TITLE },
        { property: "og:description", content: PAGE_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://agaate.in/agri-park" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: PAGE_TITLE },
        { name: "twitter:description", content: PAGE_DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: "https://agaate.in/agri-park" }],
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLd,
        },
      ],
    };
  },
  component: AgriPark,
});

function AgriPark() {
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-white font-sans text-ink antialiased">
      <Header />

      {/* Redesigned Premium Hero Section */}
      <section className="border-b border-[#143d31]/10 bg-white pt-28 md:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-14 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:pb-20">
          {/* Left Column: Text & Stats */}
          <div className="flex flex-col justify-center text-left">
            <p className="text-sm font-semibold tracking-wide text-forest">
              India's First Collaborative Living Farm · Kukrola, Gurugram
            </p>
            <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight text-[#143d31] md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              India's First Agri Park —{" "}
              <span className="font-serif italic font-normal text-terracotta">
                One Living 17-Acre Farm.
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-600 md:text-lg font-normal">
              We are building a single, living farm where India's leading seed, irrigation, nutrition, protection, machinery, drone technology, and market partners come together — demonstrated on real living crops across the full seed-to-sale journey.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton onClick={() => setIsVisitModalOpen(true)} strength={0.25}>
                <span className="inline-flex items-center gap-2 rounded-xl bg-forest-deep px-6 py-3.5 text-xs font-extrabold text-cream shadow-md transition-colors hover:bg-forest cursor-pointer">
                  <Calendar className="h-4 w-4" />
                  Book VIP Farm Visit
                </span>
              </MagneticButton>
              <a
                href="#journey-section"
                className="inline-flex items-center gap-2 rounded-xl border border-forest/20 bg-[#fafbf7] px-6 py-3.5 text-xs font-bold text-forest-deep hover:bg-cream/10 transition-colors"
              >
                <Compass className="h-4 w-4" />
                Start Interactive Tour
              </a>
            </div>

            {/* Hero Stats */}
            <div className="mt-10 flex flex-wrap gap-3">
              {HERO_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex items-center gap-2.5 rounded-xl border border-[#143d31]/10 bg-[#fafbf7] px-4 py-2.5 shadow-xs backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 text-left"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#5d7d37]" strokeWidth={2.2} />
                    <div>
                      <span className="font-display text-sm font-extrabold text-[#143d31]">
                        <CountUp to={s.to} suffix={s.suffix} duration={2} />
                      </span>
                      <span className="ml-1.5 font-mono text-[8px] font-bold uppercase tracking-wider text-[#5d7d37]">
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 bg-neutral-100 shadow-xl lg:aspect-[5/4] group">
            <img
              src={agroParkImg}
              alt="Overview of Agaate's 17-acre collaborative living farm in Gurugram"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#143d31]/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Ticker Marquee of All 8 Zones */}
      <Marquee duration={35} className="border-b border-[#143d31]/10 bg-[#fafbf7] py-4.5">
        <>
          {ZONES_EIGHT.map((z) => {
            const Icon = z.icon;
            return (
              <span key={z.label} className="flex shrink-0 items-center gap-3">
                <Icon className="h-4 w-4 text-[#5d7d37]" strokeWidth={2.2} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#143d31]/70">
                  {z.label}
                </span>
                <span className="ml-3 text-terracotta">✦</span>
              </span>
            );
          })}
        </>
      </Marquee>

      {/* 3D Interactive Journey (Now integrated smoothly) */}
      <SectionCropWorld />

      {/* Main Content Layout Container */}
      <div className="mx-auto w-full max-w-7xl space-y-32 px-6 py-24 lg:px-12">
        {/* Section 1: Overview of 8 Innovation Zones */}
        <ZonesOverview />

        {/* Section 2: Interactive 8-Zone Masterplan Walkthrough */}
        <ZoneBoard onBookVisit={() => setIsVisitModalOpen(true)} />

        {/* Section 3: Why It's First of Its Kind Highlight Grid */}
        <FirstOfKind />

        {/* Section 4: 17-Acre Smart Nursery Controlled Environment */}
        <SmartNursery />

        {/* Section 5: Final Call-To-Action Band */}
        <TaglineBand />
      </div>

      {/* Interactive VIP Farm Visit Booking Modal */}
      <AgriParkVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
