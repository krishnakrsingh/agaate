import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  CaretRight,
  CheckCircle,
  Compass,
  Pulse,
  ShieldCheck,
  Sparkle,
  Stack
} from "@phosphor-icons/react";
import { EASE, motion, Reveal } from "@/components/common/motion";
import { FIELD_LINES, ALL_8_ZONES, type Zone } from "./data";
import { Orb, PulseRing } from "./deco";

export function ZoneBoard({ onBookVisit }: { onBookVisit?: () => void }) {
  const [activeZoneId, setActiveZoneId] = useState("seed");
  const currentZone = ALL_8_ZONES.find((z) => z.id === activeZoneId) || ALL_8_ZONES[0];

  return (
    <section id="zones-masterplan" className="relative text-left">
      <Orb from="moss" className="-top-24 -left-20 h-64 w-64 opacity-15" />

      <Reveal variant="fade-right" className="text-left mb-10">
        <span className="mb-2 block font-jet text-[10px] font-bold uppercase tracking-widest text-forest/40">
          Interactive Masterplan Walkthrough
        </span>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-forest-deep md:text-5xl">
          Eight Living Innovation Zones
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-forest/70 md:text-base">
          Click any zone pin on the 17-acre field map or select a zone button below to inspect real crop trial parameters, partner brand showcases, and live sensor telemetry.
        </p>
      </Reveal>

      {/* Zone Pill Buttons */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {ALL_8_ZONES.map((z) => {
          const isSelected = activeZoneId === z.id;
          return (
            <button
              key={z.id}
              onClick={() => setActiveZoneId(z.id)}
              className={`relative cursor-pointer rounded-full px-4 py-2.5 text-xs font-mono font-bold transition-all ${
                isSelected
                  ? "text-cream shadow-sm"
                  : "border border-border bg-card text-forest/70 hover:border-forest/40 hover:bg-bone"
              }`}
            >
              {isSelected ? (
                <motion.span
                  layoutId="active-zone-pill"
                  className="absolute inset-0 rounded-full bg-forest border border-forest"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              ) : null}
              <span className="relative z-10">{z.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
        {/* Left Column: Active Zone Telemetry & Details Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentZone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="relative overflow-hidden rounded-[2.5rem] border border-border bg-bone p-8 shadow-sm"
            >
              <PulseRing className="right-6 top-6 h-20 w-20 opacity-30" />

              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta/10 px-3 py-1 font-mono text-[10px] font-bold text-terracotta">
                  {currentZone.badge}
                </span>
                <span className="font-jet text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                  <Pulse className="h-3 w-3 animate-pulse" /> Telemetry Live
                </span>
              </div>

              <h3 className="font-serif text-3xl font-bold text-forest-deep mb-2">
                {currentZone.name}
              </h3>
              <p className="text-xs font-medium leading-relaxed text-forest/75 md:text-sm">
                {currentZone.desc}
              </p>

              {/* Data Table */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/60 pt-4 font-mono text-xs">
                <div>
                  <span className="block text-[9px] text-forest/40 uppercase">Tested Crops</span>
                  <span className="font-bold text-forest-deep block mt-0.5">{currentZone.crop}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-forest/40 uppercase">Verified Metric</span>
                  <span className="font-bold text-terracotta block mt-0.5">{currentZone.stat}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-forest/40 uppercase">Agri Partners</span>
                  <span className="font-bold text-moss block mt-0.5">{currentZone.partner}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-forest/40 uppercase">Telemetry Node</span>
                  <span className="font-bold text-forest-deep block mt-0.5 truncate">{currentZone.sensor}</span>
                </div>
              </div>

              {/* Trial Highlights */}
              <div className="mt-6 pt-4 border-t border-border/60">
                <span className="font-jet text-[9px] uppercase tracking-widest text-forest/45 font-bold block mb-3">
                  R&D Trial Parameters
                </span>
                <div className="space-y-2">
                  {currentZone.trialHighlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-forest/80">
                      <CheckCircle className="h-3.5 w-3.5 text-moss shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner Brand Badges */}
              <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap gap-2">
                {currentZone.partnerLogos.map((logo) => (
                  <span
                    key={logo}
                    className="rounded-lg border border-forest/15 bg-card px-2.5 py-1 font-jet text-[9px] font-bold text-forest-deep shadow-xs"
                  >
                    ★ {logo}
                  </span>
                ))}
              </div>

              {onBookVisit && (
                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={onBookVisit}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-forest-deep px-5 py-3 text-xs font-bold text-cream hover:bg-forest transition-all cursor-pointer shadow-sm"
                  >
                    <span>Schedule Field Walkthrough for {currentZone.name}</span>
                    <CaretRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Interactive 17-Acre Masterplan Vector Map (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-6 md:p-10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-jet text-[10px] font-bold uppercase text-forest/40">
                17-Acre Smart Nursery & Park Diagram · Kukrola
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/10 bg-bone px-3 py-1 font-jet text-[10px] font-bold text-forest">
                <Compass className="h-3.5 w-3.5 animate-spin text-emerald-500" />
                Click pins to pivot view
              </span>
            </div>

            {/* Interactive SVG Masterplan Field Map */}
            <div className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-forest/10 bg-bone/30 p-4 sm:p-6">
              <svg
                className="h-72 w-full max-w-lg text-forest"
                viewBox="0 0 190 110"
                fill="none"
              >
                {/* 17 Acre Outer Fence Boundary */}
                <rect
                  x="10"
                  y="10"
                  width="170"
                  height="90"
                  rx="8"
                  stroke="var(--color-forest)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Internal Plot Sector Divider Lines */}
                <line x1="95" y1="10" x2="95" y2="100" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="10" y1="55" x2="180" y2="55" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="2 2" />

                {/* Sector Grid Text Labels */}
                <text x="18" y="20" fill="var(--color-forest/40)" fontSize="4.5" fontFamily="var(--font-mono)">NURSERY PLOTS</text>
                <text x="100" y="20" fill="var(--color-forest/40)" fontSize="4.5" fontFamily="var(--font-mono)">IRRIGATION LAB</text>
                <text x="18" y="65" fill="var(--color-forest/40)" fontSize="4.5" fontFamily="var(--font-mono)">PROTECTION DEMO</text>
                <text x="100" y="65" fill="var(--color-forest/40)" fontSize="4.5" fontFamily="var(--font-mono)">DRONE FLIGHT ZONE</text>

                {/* Active Highlight Target Aura */}
                <motion.circle
                  r={12}
                  fill="var(--color-terracotta)"
                  opacity={0.18}
                  animate={{ cx: currentZone.svgCoords.cx, cy: currentZone.svgCoords.cy }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                />

                {/* Render Interactive Pins for all 8 Zones */}
                {ALL_8_ZONES.map((z) => {
                  const isSelected = activeZoneId === z.id;
                  return (
                    <g
                      key={z.id}
                      className="group cursor-pointer"
                      onClick={() => setActiveZoneId(z.id)}
                    >
                      {/* Pulsing Radar Ring */}
                      <motion.circle
                        cx={z.svgCoords.cx}
                        cy={z.svgCoords.cy}
                        r={5}
                        fill="var(--color-forest)"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0, scale: [1, 2] }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />

                      {/* Main Node Circle */}
                      <circle
                        cx={z.svgCoords.cx}
                        cy={z.svgCoords.cy}
                        r={isSelected ? 8 : 5}
                        fill={isSelected ? "var(--color-terracotta)" : "var(--color-forest)"}
                        className="transition-all duration-300 group-hover:scale-125"
                      />

                      {isSelected && (
                        <circle
                          cx={z.svgCoords.cx}
                          cy={z.svgCoords.cy}
                          r={14}
                          stroke="var(--color-terracotta)"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      )}

                      <text
                        x={z.svgCoords.cx - 14}
                        y={z.svgCoords.cy - 9}
                        fill="var(--color-forest-deep)"
                        fontSize="4.5"
                        fontFamily="var(--font-mono)"
                        fontWeight="bold"
                        className="opacity-80 transition-opacity group-hover:opacity-100"
                      >
                        {z.name.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-forest/70 pt-2 border-t border-border/50">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-terracotta" /> Active Zone Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-forest" /> Live Trial Plot
              </span>
              <span className="text-terracotta font-bold">17 Acres · Kukrola NH8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
