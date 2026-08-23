import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Compass,
  Copy,
  MapPin,
  Phone,
  ShieldCheck,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, Reveal } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { FACILITIES, type Facility } from "./data";
import GoogleMapEmbed from "./GoogleMapEmbed";
import { useToast } from "./toast-context";
import { track } from "@/lib/analytics";

function FacilityCard({
  facility,
  onCopy,
  copied,
}: {
  facility: Facility;
  onCopy: () => void;
  copied: boolean;
}) {
  const Icon = facility.icon;

  return (
    <motion.div
      key={facility.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex flex-col h-full overflow-hidden rounded-3xl border border-[#143d31]/10 bg-white shadow-xs"
    >
      {/* Top Image Media with Role & Status Pill */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#143d31]/5">
        <img
          src={facility.image}
          alt={facility.name}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          width={800}
          height={450}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 border border-[#143d31]/10 shadow-xs">
            <Icon className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
              {facility.role}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#143d31]/90 backdrop-blur-md px-2.5 py-1 border border-white/10 text-white shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-pulse" />
            <span className="font-mono text-[9.5px] font-semibold tracking-wider text-white">
              Open For Visits
            </span>
          </div>
        </div>

        {/* Coordinates Chip at Bottom of Image */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-2 text-white/90 font-mono text-[10px]">
          <span className="rounded-md bg-black/40 backdrop-blur-xs px-2 py-0.5 border border-white/15">
            {facility.coordinates.latLabel}, {facility.coordinates.lngLabel}
          </span>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#143d31]">
              {facility.name}
            </h3>
            <p className="mt-1 font-sans text-sm sm:text-base text-[#4f624f] leading-relaxed">
              {facility.tagline}
            </p>
          </div>

          {/* Address & Quick Details Strip */}
          <div className="space-y-3 rounded-2xl bg-[#f4f8f5]/80 p-4 border border-[#143d31]/8">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#143d31] text-[#a3e635] shadow-2xs">
                <MapPin className="h-4 w-4" weight="fill" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-xs sm:text-sm font-semibold text-[#143d31] leading-snug">
                  {facility.address}
                </p>
                {facility.plusCode && (
                  <p className="mt-1 font-mono text-[10.5px] font-bold text-[#5d7d37] tracking-wide">
                    Plus Code: {facility.plusCode}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[#143d31]/8 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#5d7d37] shrink-0" weight="fill" />
                <a
                  href={`tel:${facility.telRaw}`}
                  onClick={() =>
                    track("phone_clicked", { source: "facility", facility: facility.id })
                  }
                  className="font-sans font-bold text-[#143d31] hover:underline"
                >
                  {facility.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#5d7d37] shrink-0" weight="fill" />
                <span className="font-sans text-[#4f624f] font-medium truncate">{facility.hours}</span>
              </div>
            </div>
          </div>

          {/* Capabilities & Highlights */}
          <div>
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#5d7d37] mb-2.5">
              Hub Capabilities &amp; Services
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {facility.highlights.map((hl) => (
                <div
                  key={hl}
                  className="flex items-start gap-2 text-xs text-[#143d31] font-medium leading-tight"
                >
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5d7d37]" weight="fill" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 border-t border-[#143d31]/10 pt-5">
          <SlideUpPillButton
            href={facility.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("directions_clicked", { facility: facility.id })}
            variant="dark"
            size="md"
            label="Open in Google Maps"
            icon={<ArrowUpRight className="h-4 w-4" />}
            iconPosition="right"
          />
          <button
            type="button"
            onClick={onCopy}
            className="cursor-pointer inline-flex h-10 items-center gap-2 rounded-full border border-[#143d31]/20 bg-[#f4f8f5] px-4 font-sans text-xs font-bold text-[#143d31] transition-all hover:bg-[#143d31]/10 active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[#5d7d37]" weight="bold" />
                <span>Address Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-[#5d7d37]" weight="bold" />
                <span>Copy Address</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FacilitiesSection() {
  const [activeId, setActiveId] = useState(FACILITIES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();
  const active = FACILITIES.find((f) => f.id === activeId) || FACILITIES[0];

  return (
    <section
      aria-labelledby="facilities-heading"
      className="border-t border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-10">
        {/* Header */}
        <Reveal variant="fade-up" className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              On-Ground Hubs &amp; Facilities
            </p>
          </div>
          <h2
            id="facilities-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]"
          >
            Visit our on-ground hubs in Gurugram
          </h2>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">
            Experience living crop trials, procure genuine inputs at factory pricing, or consult directly with senior agronomy scientists at our active facilities.
          </p>
        </Reveal>

        {/* Elevated Multi-Facility Tab Selector Cards */}
        <Reveal variant="fade-up" delay={0.06}>
          <div
            role="tablist"
            aria-label="Agaate facilities"
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {FACILITIES.map((fac) => {
              const selected = activeId === fac.id;
              const Icon = fac.icon;

              return (
                <button
                  key={fac.id}
                  role="tab"
                  type="button"
                  id={`facility-tab-${fac.id}`}
                  aria-selected={selected}
                  aria-controls={`facility-panel-${fac.id}`}
                  onClick={() => {
                    setActiveId(fac.id);
                    track("facility_tab_changed", { facility: fac.id });
                  }}
                  className={`group relative text-left p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 ${
                    selected
                      ? "bg-[#143d31] text-white border-[#143d31] shadow-md shadow-[#143d31]/10 -translate-y-0.5"
                      : "bg-white text-[#143d31] border-[#143d31]/10 hover:border-[#5d7d37]/40 hover:bg-white/90 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        selected
                          ? "bg-[#a3e635] text-[#143d31]"
                          : "bg-[#143d31]/10 text-[#143d31] group-hover:bg-[#143d31] group-hover:text-[#a3e635]"
                      }`}
                    >
                      <Icon className="h-5 w-5" weight={selected ? "fill" : "duotone"} />
                    </div>
                    <span
                      className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        selected
                          ? "bg-white/15 text-[#a3e635]"
                          : "bg-[#143d31]/5 text-[#5d7d37]"
                      }`}
                    >
                      {fac.id === "farm"
                        ? "17-Acre Nursery"
                        : fac.id === "mall"
                        ? "Agri Store"
                        : "HQ Office"}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`font-display text-base sm:text-lg font-bold tracking-tight ${
                        selected ? "text-white" : "text-[#143d31]"
                      }`}
                    >
                      {fac.name.replace("Anzix Farm Technologies Pvt Ltd", "Corporate Office")}
                    </h3>
                    <p
                      className={`font-sans text-xs mt-0.5 leading-snug truncate ${
                        selected ? "text-white/75" : "text-[#4f624f]"
                      }`}
                    >
                      {fac.district} · {fac.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Two-Column Showcase: Left Details Card + Right Live Map */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left: Facility Details Card */}
          <div
            className="lg:col-span-6 flex"
            role="tabpanel"
            id={`facility-panel-${active.id}`}
            aria-labelledby={`facility-tab-${active.id}`}
          >
            <AnimatePresence mode="wait">
              <FacilityCard
                key={active.id}
                facility={active}
                copied={copiedId === active.id}
                onCopy={async () => {
                  try {
                    await navigator.clipboard.writeText(active.address);
                    setCopiedId(active.id);
                    toast("Address copied to clipboard", "success");
                    window.setTimeout(() => setCopiedId(null), 2500);
                  } catch {
                    toast("Could not copy address", "error");
                  }
                }}
              />
            </AnimatePresence>
          </div>

          {/* Right: Live Google Map Box with Coordinate Top Bar */}
          <div className="lg:col-span-6 flex flex-col overflow-hidden rounded-3xl border border-[#143d31]/10 bg-white shadow-xs min-h-[460px]">
            {/* Map Top Bar */}
            <div className="flex items-center justify-between border-b border-[#143d31]/10 px-5 py-3.5 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#5d7d37]" weight="fill" />
                <span className="font-mono text-[11px] font-bold text-[#143d31] uppercase tracking-wider">
                  Live GPS Route · {active.name.split(" ")[0]}
                </span>
              </div>
              <a
                href={active.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[10.5px] font-bold text-[#5d7d37] hover:underline"
              >
                <span>Navigate</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            {/* Embedded Interactive Map */}
            <div className="flex-1 w-full h-full min-h-[400px]">
              <GoogleMapEmbed facility={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
