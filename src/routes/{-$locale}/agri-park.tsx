import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Shield, Sprout, Compass, Sparkles, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import {
  FirstOfKind,
  Lifecycle,
  SmartNursery,
  TaglineBand,
  ZonesOverview,
} from "@/components/agri-park/sections";

export const Route = createFileRoute("/{-$locale}/agri-park")({
  component: AgriPark,
});

function AgriPark() {
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-cream font-sans text-ink antialiased">
      <Header />

      {/* Page Hero */}
      <PageHero
        eyebrow="India's First Collaborative Living Farm · Kukrola, Gurugram"
        title={
          <>
            India's First Agri Park — All the Best Agro Companies,{" "}
            <span className="italic text-terracotta">One Living 17-Acre Farm.</span>
          </>
        }
        description="We are building a single, living farm where India's leading seed, irrigation, nutrition, protection, machinery, drone technology, and market partners come together — demonstrated on real living crops across the full seed-to-sale journey."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MagneticButton onClick={() => setIsVisitModalOpen(true)} strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-8 py-4 text-sm font-semibold text-cream shadow-lg shadow-forest-deep/20 transition-transform hover:scale-105">
              <Calendar className="h-4 w-4" />
              Book VIP Farm Visit & Field Day
            </span>
          </MagneticButton>
          <a
            href="#zones-masterplan"
            className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-card/80 px-8 py-4 text-sm font-semibold text-forest-deep transition-all hover:-translate-y-0.5 hover:border-forest/50 hover:bg-card"
          >
            <Compass className="h-4 w-4" />
            Explore 8 Masterplan Zones
          </a>
        </div>

        {/* Hero Stat Pills */}
        <div className="mt-10 flex flex-wrap gap-3">
          {HERO_STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-full border border-border bg-cream/80 px-5 py-3 shadow-xs backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4 shrink-0 text-moss" strokeWidth={2.2} />
                <div>
                  <span className="font-serif text-2xl font-bold leading-none text-forest-deep">
                    <CountUp to={s.to} suffix={s.suffix} duration={2.2} />
                  </span>
                  <span className="ml-1.5 align-middle font-jet text-[9px] font-bold uppercase tracking-[0.16em] text-forest/60">
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </PageHero>

      {/* Ticker Marquee of All 8 Zones */}
      <Marquee duration={35} className="border-b border-border bg-cream py-5">
        <>
          {ZONES_EIGHT.map((z) => {
            const Icon = z.icon;
            return (
              <span key={z.label} className="flex shrink-0 items-center gap-3">
                <Icon className="h-4 w-4 text-moss" strokeWidth={2.2} />
                <span className="font-jet text-xs font-bold uppercase tracking-[0.18em] text-forest/70">
                  {z.label}
                </span>
                <span className="ml-3 text-terracotta">✦</span>
              </span>
            );
          })}
        </>
      </Marquee>

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

        {/* Section 5: The Four-Phase Seed-to-Sale Lifecycle */}
        <Lifecycle />

        {/* Section 6: Final Call-To-Action Band */}
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
