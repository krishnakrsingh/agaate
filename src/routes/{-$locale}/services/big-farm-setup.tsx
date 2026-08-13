import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ClipboardText,
  Compass,
  Shield,
  SquaresFour,
  Stack,
  TrendUp
} from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  EASE,
  MagneticButton,
  PageHero,
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
  CountUp,
  Marquee,
  AnimatedHeadline,
  Reveal,
  motion,
} from "@/components/common/motion";
import { MarqueeStrip, StatsBand } from "@/components/big-farm-setup/Stats";
import { PhaseTimeline } from "@/components/big-farm-setup/PhaseTimeline";
import { BeforeAfter } from "@/components/big-farm-setup/BeforeAfter";
import { CalculatorPanel, TabSwitcher, CropCategory } from "@/components/big-farm-setup/Calculator";
import { FinalCta } from "@/components/big-farm-setup/FinalCta";
import { TurnkeyModal } from "@/components/big-farm-setup/TurnkeyModal";

export const Route = createFileRoute("/{-$locale}/services/big-farm-setup")({
  component: BigFarmSetup,
});

function BigFarmSetup() {
  const [activeTab, setActiveTab] = useState<"builder" | "blueprint">("builder");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAcres, setSelectedAcres] = useState(25);

  const handleOpenConsultation = (acres: number = 25) => {
    setSelectedAcres(acres);
    setIsModalOpen(true);
  };

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Page Hero */}
      <PageHero
        eyebrow="Turnkey Commercial Estates · Service 05"
        title={
          <>
            Turnkey Commercial Farm Setup — Bare Land to First Harvest with{" "}
            <span className="italic text-terracotta">Zero Guesswork.</span>
          </>
        }
        description="Agaate plans, builds, and manages large-scale commercial vegetable operations end-to-end. One unified partner managing land planning, automated drip fertigation, nursery plug supply, daily SOPs, and assured market buyback."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MagneticButton onClick={() => setIsModalOpen(true)} strength={0.25}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-8 py-4 text-sm font-semibold text-cream shadow-lg shadow-forest-deep/20 transition-transform hover:scale-105">
              Request Commercial Feasibility
              <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-card/80 px-8 py-4 text-sm font-semibold text-forest-deep transition-all hover:-translate-y-0.5 hover:border-forest/50 hover:bg-card"
          >
            <SquaresFour className="h-4 w-4" />
            Open CapEx & Revenue Estimator
          </a>
        </div>

        {/* Hero Quick Stat Badges */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-forest/15 pt-8">
          <StatBadge label="Land Under Association" value={15000} suffix="+ Acres" />
          <StatBadge label="Bio Seedling Survival" value={98} suffix="%" />
          <StatBadge label="Project Execution Scale" value={500} prefix="5 to " suffix="+ Acres" />
          <StatBadge label="Managed Commercial GMV" value={10} prefix="₹" suffix=" Cr+" />
        </div>
      </PageHero>

      {/* Marquee Partner & Capability Strip */}
      <MarqueeStrip />

      {/* Stats Band Highlights */}
      <StatsBand />

      {/* Interactive 6-Phase Execution Roadmap */}
      <PhaseTimeline onSelectPhaseForModal={() => setIsModalOpen(true)} />

      {/* Paradigm Shift / Before After Section */}
      <BeforeAfter />

      {/* Interactive CapEx & Revenue Estimator Section */}
      <section id="calculator" className="py-24 px-6 lg:px-12 bg-bone/30 border-t border-border">
        <div className="mx-auto max-w-7xl w-full space-y-16">
          <SectionHeader
            align="center"
            eyebrow="Commercial Feasibility & ROI Modeling"
            title={
              <>
                Interactive CapEx & <span className="italic text-terracotta">Revenue Engine</span>
              </>
            }
            description="Simulate your project parameters from 5 to 500+ acres. Calculate exact seedling plug volumes, labor SOP manpower schedules, infrastructure CapEx breakdowns, and projected harvest returns."
          />

          <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

          <AnimatePresence mode="wait">
            {activeTab === "builder" ? (
              <motion.div
                key="builder"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <CalculatorPanel
                  onRequestConsultation={({ acres }) => handleOpenConsultation(acres)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="blueprint"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left"
              >
                <div className="lg:col-span-6 space-y-6">
                  <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block">
                    ENGINEERING BLUEPRINT SCHEMATIC
                  </span>
                  <h3 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold leading-tight">
                    Smart Commercial Polyhouse Hydraulic Matrix
                  </h3>
                  <p className="text-forest/75 text-sm leading-relaxed">
                    Our agricultural engineering team pre-calibrates hydraulic mainlines based on micro-elevation contour sweeps. This prevents pressure drop pining, puddle accumulation, and uneven fertilizer delivery across rows.
                  </p>
                  <div className="p-4 bg-card border border-border rounded-2xl flex gap-3 text-xs text-forest/70 font-mono">
                    <Compass className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                    <span>
                      Blueprints are customized for your specific topography using drone elevation mapping to guarantee uniform drip emission rates.
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <TiltCard
                    maxTilt={5}
                    className="relative bg-card border border-border rounded-[2.5rem] p-8 shadow-sm"
                  >
                    <span className="text-[10px] font-mono text-forest/45 uppercase block mb-6 font-semibold">
                      1-Acre Polyhouse Hydraulic Blueprint Schematic
                    </span>
                    <div className="relative border border-forest/10 rounded-2xl p-6 bg-bone/25 flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
                      <svg
                        className="w-full max-w-sm h-48 text-forest"
                        viewBox="0 0 200 100"
                        fill="none"
                      >
                        <motion.rect
                          x="10"
                          y="10"
                          width="180"
                          height="80"
                          rx="6"
                          stroke="var(--color-forest)"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.4, ease: EASE }}
                        />
                        {[25, 45, 65].map((y) => (
                          <motion.line
                            key={y}
                            x1="30"
                            y1={y}
                            x2="170"
                            y2={y}
                            stroke="var(--color-moss)"
                            strokeWidth="1.5"
                          />
                        ))}
                        <line x1="25" y1="20" x2="25" y2="80" stroke="var(--color-terracotta)" strokeWidth="2.5" />
                        <circle cx="25" cy="50" r="6" fill="var(--color-terracotta)" />
                        <text x="35" y="53" fill="var(--color-forest-deep)" fontSize="6" fontFamily="var(--font-mono)" fontWeight="bold">
                          AUTOMATED VENTURI DOSING NODE
                        </text>
                        <text x="75" y="18" fill="var(--color-forest)" fontSize="5" fontFamily="var(--font-mono)">
                          ROW 01 (DRIP LINE · 30cm EMITTERS)
                        </text>
                        <text x="75" y="38" fill="var(--color-forest)" fontSize="5" fontFamily="var(--font-mono)">
                          ROW 02 (DRIP LINE · 30cm EMITTERS)
                        </text>
                        <text x="75" y="58" fill="var(--color-forest)" fontSize="5" fontFamily="var(--font-mono)">
                          ROW 03 (DRIP LINE · 30cm EMITTERS)
                        </text>
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-6 mt-4 border-t border-border/50">
                      <div>
                        <span className="text-forest/40 block text-[9px]">RAISED BED CENTER SPACING</span>
                        <span className="font-bold text-forest-deep">4.2 Feet Standard</span>
                      </div>
                      <div>
                        <span className="text-forest/40 block text-[9px]">EMITTER SPECIFICATION</span>
                        <span className="font-bold text-forest-deep">30 cm Pressure Compensating</span>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Call To Action Section */}
      <FinalCta onOpenConsultation={() => setIsModalOpen(true)} />

      {/* Turnkey Modal Request Form */}
      <TurnkeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialAcres={selectedAcres}
      />

      <Footer />
    </main>
  );
}

function StatBadge({
  label,
  value,
  prefix = "",
  suffix = "",
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="text-left">
      <span className="font-jet text-[9px] font-bold uppercase tracking-wider text-forest/50 block">
        {label}
      </span>
      <span className="font-serif text-3xl font-bold text-forest-deep">
        {prefix}
        <CountUp to={value} duration={2} />
        {suffix}
      </span>
    </div>
  );
}
