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
import { useLocation } from "@tanstack/react-router";
import { useSiteContact } from "@/contexts/SiteContactContext";
import type { Facility } from "./data";
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="flex flex-col h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#143d31]/10 bg-white shadow-xs"
    >
      {/* Compact Image Banner with Badges */}
      <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-[#143d31]/5 shrink-0">
        <img
          src={facility.image}
          alt={facility.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          width={600}
          height={200}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 border border-[#143d31]/10 shadow-xs">
            <Icon className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
            <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#143d31]">
              {facility.role}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#143d31]/90 backdrop-blur-md px-2.5 py-0.5 border border-white/10 text-white shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-pulse" />
            <span className="font-mono text-[9px] font-semibold tracking-wider text-white">
              Open For Visits
            </span>
          </div>
        </div>

        {/* Coordinates Pill */}
        <div className="absolute bottom-2 left-2.5 flex items-center gap-2 text-white/90 font-mono text-[9.5px]">
          <span className="rounded-md bg-black/45 backdrop-blur-xs px-2 py-0.5 border border-white/15">
            {facility.coordinates.latLabel}, {facility.coordinates.lngLabel}
          </span>
        </div>
      </div>

      {/* Details Content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-3.5">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#143d31]">
              {facility.name}
            </h3>
            <p className="mt-0.5 font-sans text-xs sm:text-sm text-[#4f624f] leading-snug">
              {facility.tagline}
            </p>
          </div>

          {/* Compact Address & Details Box */}
          <div className="space-y-2.5 rounded-xl bg-[#f4f8f5]/80 p-3 sm:p-3.5 border border-[#143d31]/8 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#143d31] text-[#a3e635]">
                <MapPin className="h-3.5 w-3.5" weight="fill" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans font-medium text-[#143d31] leading-snug">
                  {facility.address}
                </p>
                {facility.plusCode && (
                  <p className="mt-0.5 font-mono text-[10px] font-bold text-[#5d7d37]">
                    Plus Code: {facility.plusCode}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#143d31]/8">
              <div className="flex items-center gap-1.5 min-w-0">
                <Phone className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" weight="fill" />
                <a
                  href={`tel:${facility.telRaw}`}
                  onClick={() =>
                    track("phone_clicked", { source: "facility", facility: facility.id })
                  }
                  className="font-sans font-bold text-[#143d31] hover:underline truncate"
                >
                  {facility.phone}
                </a>
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <Clock className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" weight="fill" />
                <span className="font-sans text-[#4f624f] font-medium truncate">{facility.hours}</span>
              </div>
            </div>
          </div>

          {/* Hub Highlights */}
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#5d7d37] mb-1.5">
              Capabilities &amp; Services
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {facility.highlights.map((hl) => (
                <div
                  key={hl}
                  className="flex items-start gap-1.5 text-[11.5px] text-[#143d31] font-medium leading-tight"
                >
                  <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-[#5d7d37]" weight="fill" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center gap-2.5 border-t border-[#143d31]/10 pt-3.5">
          <SlideUpPillButton
            href={facility.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("directions_clicked", { facility: facility.id })}
            variant="dark"
            size="sm"
            label="Open in Google Maps"
            icon={<ArrowUpRight className="h-3.5 w-3.5" />}
            iconPosition="right"
          />
          <button
            type="button"
            onClick={onCopy}
            className="cursor-pointer inline-flex h-9 items-center gap-1.5 rounded-full border border-[#143d31]/20 bg-[#f4f8f5] px-3 font-sans text-xs font-semibold text-[#143d31] transition-all hover:bg-[#143d31]/10 active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
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
  const location = useLocation();
  const isHindi =
    location.pathname === "/hi" || location.pathname.startsWith("/hi/");
  const lang = isHindi ? "hi" : "en";
  const { mapFacilities } = useSiteContact();
  const facilities = mapFacilities(lang);
  const [activeId, setActiveId] = useState(facilities[0]?.id ?? "farm");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mapType, setMapType] = useState<"satellite" | "roadmap">("satellite");
  const { toast } = useToast();
  const active = facilities.find((f) => f.id === activeId) || facilities[0];
  if (!active) return null;

  return (
    <section
      aria-labelledby="facilities-heading"
      className="border-t border-[#143d31]/10 bg-[#f4f8f5] py-10 sm:py-14 md:py-16 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <Reveal variant="fade-up" className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              On-Ground Hubs &amp; Facilities
            </p>
          </div>
          <h2
            id="facilities-heading"
            className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#143d31] leading-tight"
          >
            {isHindi ? "गुरुग्राम में हमारे सक्रिय केंद्र" : "Visit our on-ground hubs in Gurugram"}
          </h2>
          <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#4f624f]">
            {isHindi
              ? "जीवित फसल परीक्षण देखें, फ़ैक्टरी मूल्य पर बीज व सामग्री प्राप्त करें, या वैज्ञानिकों से सीधे मिलें।"
              : "Experience living crop trials, procure inputs at factory pricing, or consult senior agronomy scientists."}
          </p>
        </Reveal>

        {/* Compact Multi-Facility Tab Selector */}
        <Reveal variant="fade-up" delay={0.05}>
          <div
            role="tablist"
            aria-label="Agaate facilities"
            className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
          >
            {facilities.map((fac) => {
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
                  className={`group relative text-left p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    selected
                      ? "bg-[#143d31] text-white border-[#143d31] shadow-sm -translate-y-0.5"
                      : "bg-white text-[#143d31] border-[#143d31]/10 hover:border-[#5d7d37]/40 hover:bg-white/90 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        selected
                          ? "bg-[#a3e635] text-[#143d31]"
                          : "bg-[#143d31]/10 text-[#143d31] group-hover:bg-[#143d31] group-hover:text-[#a3e635]"
                      }`}
                    >
                      <Icon className="h-4 w-4" weight={selected ? "fill" : "duotone"} />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`font-display text-xs sm:text-sm font-bold tracking-tight truncate ${
                          selected ? "text-white" : "text-[#143d31]"
                        }`}
                      >
                        {fac.name.replace("Anzix Farm Technologies Pvt Ltd", "Corporate Office")}
                      </h3>
                      <p
                        className={`font-sans text-[11px] leading-tight truncate ${
                          selected ? "text-white/70" : "text-[#4f624f]"
                        }`}
                      >
                        {fac.district}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                      selected
                        ? "bg-white/15 text-[#a3e635]"
                        : "bg-[#143d31]/5 text-[#5d7d37]"
                    }`}
                  >
                    {fac.id === "farm"
                      ? "17-Acre Farm"
                      : fac.id === "mall"
                      ? "Store"
                      : "HQ"}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Balanced Two-Column Showcase: Left Details Card + Right Live Map */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 items-stretch">
          {/* Left: Facility Details Card */}
          <div
            className="lg:col-span-6 flex flex-col"
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

          {/* Right: Live Google Map Box */}
          <div className="lg:col-span-6 flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-[#143d31]/10 bg-white shadow-xs min-h-[300px] sm:min-h-[340px]">
            {/* Map Top Bar with Satellite Toggle */}
            <div className="flex items-center justify-between border-b border-[#143d31]/10 px-3.5 sm:px-4 py-2 bg-white shrink-0 gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Compass className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" weight="fill" />
                <span className="font-mono text-[10.5px] font-bold text-[#143d31] uppercase tracking-wider truncate">
                   {active.name.split(" ")[0]}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* View Mode Toggle */}
                <div className="inline-flex items-center rounded-lg bg-[#143d31]/5 p-0.5 border border-[#143d31]/10">
                  <button
                    type="button"
                    onClick={() => setMapType("satellite")}
                    className={`cursor-pointer px-2 py-0.5 rounded-md font-mono text-[9.5px] font-bold uppercase transition-all ${
                      mapType === "satellite"
                        ? "bg-[#143d31] text-[#a3e635] shadow-xs"
                        : "text-[#4f624f] hover:text-[#143d31]"
                    }`}
                  >
                    Satellite
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapType("roadmap")}
                    className={`cursor-pointer px-2 py-0.5 rounded-md font-mono text-[9.5px] font-bold uppercase transition-all ${
                      mapType === "roadmap"
                        ? "bg-[#143d31] text-[#a3e635] shadow-xs"
                        : "text-[#4f624f] hover:text-[#143d31]"
                    }`}
                  >
                    Map
                  </button>
                </div>

                <a
                  href={active.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#5d7d37] hover:underline"
                >
                  <span>Navigate</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Embedded Interactive Map */}
            <div className="flex-1 w-full h-full min-h-[260px]">
              <GoogleMapEmbed facility={active} mapType={mapType} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
