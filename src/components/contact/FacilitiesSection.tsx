import { useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  MagnifyingGlass,
  MapPin,
  Phone,
  ArrowRight,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, Reveal } from "@/components/common/motion";
import { useLocation } from "@tanstack/react-router";
import { useSiteContact } from "@/contexts/SiteContactContext";
import type { Facility } from "./data";
import GoogleMapEmbed from "./GoogleMapEmbed";
import { useToast } from "./toast-context";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Derive state name from district string, e.g. "Gurugram, Haryana" → "Haryana" */
function getState(facility: Facility): string {
  const parts = facility.district.split(",");
  return (parts[parts.length - 1] ?? "").trim();
}

export default function FacilitiesSection() {
  const routerLocation = useLocation();
  const isHindi =
    routerLocation.pathname === "/hi" || routerLocation.pathname.startsWith("/hi/");
  const lang = isHindi ? "hi" : "en";
  const { mapFacilities } = useSiteContact();
  const facilities = mapFacilities(lang);

  const [activeId, setActiveId] = useState(facilities[0]?.id ?? "farm");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("All");
  const listRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const active = facilities.find((f) => f.id === activeId) || facilities[0];

  // Derive unique states for filter pills
  const states = useMemo(() => {
    const unique = [...new Set(facilities.map(getState))].sort();
    return ["All", ...unique];
  }, [facilities]);

  // Filtered list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return facilities.filter((f) => {
      const matchState = stateFilter === "All" || getState(f) === stateFilter;
      if (!q) return matchState;
      return matchState && (
        f.name.toLowerCase().includes(q) ||
        f.district.toLowerCase().includes(q) ||
        f.role.toLowerCase().includes(q)
      );
    });
  }, [facilities, search, stateFilter]);

  if (!active) return null;

  const handleSelect = (id: string) => {
    setActiveId(id);
    track("facility_tab_changed", { facility: id });
  };

  return (
    <section
      aria-labelledby="facilities-heading"
      className="border-t border-[#143d31]/10 bg-white py-14 sm:py-18 md:py-22 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <Reveal variant="fade-up" className="mb-10 sm:mb-12 space-y-3 max-w-xl">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              {isHindi ? "हमारे केंद्र" : "Our Locations"}
            </p>
          </div>
          <h2
            id="facilities-heading"
            className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#143d31] leading-tight"
          >
            {isHindi ? "गुरुग्राम में मिलें हमसे" : "Come see us in person"}
          </h2>
          <p className="font-sans text-sm leading-relaxed text-[#4f624f]">
            {isHindi
              ? "हमारे फार्म, मॉल या कार्यालय में आएं — विशेषज्ञों से मिलें, उत्पाद देखें और फसल समाधान पाएं।"
              : "Drop by our farm, store, or office. Meet our agronomists, explore live crop trials, and get real answers."}
          </p>
        </Reveal>

        {/* Layout: Left sidebar + Right map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* ── LEFT PANEL ─────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col gap-3 lg:sticky lg:top-28 lg:self-start">

            {/* Search bar */}
            <div className="relative">
              <MagnifyingGlass
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#143d31]/35 pointer-events-none"
                weight="bold"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isHindi ? "नाम या शहर खोजें…" : "Search by name or city…"}
                className="w-full rounded-xl border border-[#143d31]/12 bg-[#f4f8f5]/70 pl-9 pr-9 py-2.5 font-sans text-sm text-[#143d31] placeholder:text-[#143d31]/30 focus:outline-none focus:border-[#5d7d37]/50 focus:ring-1 focus:ring-[#5d7d37]/20 transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#143d31]/30 hover:text-[#143d31]/60 transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" weight="bold" />
                </button>
              )}
            </div>

            {/* State filter pills — only show when there are multiple states */}
            {states.length > 2 && (
              <div className="flex flex-wrap gap-1.5">
                {states.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStateFilter(s)}
                    className={cn(
                      "cursor-pointer rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-all",
                      stateFilter === s
                        ? "bg-[#143d31] text-[#a3e635]"
                        : "bg-[#f4f8f5] text-[#4f624f] hover:bg-[#143d31]/8",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Scrollable location list — max height so page doesn't blow up with 20 farms */}
            <div
              ref={listRef}
              role="listbox"
              aria-label="Select a location"
              className="flex flex-col gap-1.5 overflow-y-auto max-h-[340px] pr-0.5 scrollbar-thin scrollbar-thumb-[#143d31]/15 scrollbar-track-transparent"
            >
              {filtered.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="font-sans text-sm text-[#4f624f]">
                    {isHindi ? "कोई केंद्र नहीं मिला।" : "No locations match your search."}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSearch(""); setStateFilter("All"); }}
                    className="cursor-pointer mt-2 font-sans text-xs font-semibold text-[#5d7d37] hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                filtered.map((fac, i) => {
                  const Icon = fac.icon;
                  const selected = activeId === fac.id;
                  return (
                    <button
                      key={fac.id}
                      role="option"
                      aria-selected={selected}
                      type="button"
                      onClick={() => handleSelect(fac.id)}
                      className={cn(
                        "group relative w-full text-left rounded-2xl px-4 py-3.5 transition-all duration-200 cursor-pointer flex items-center gap-4 border shrink-0",
                        selected
                          ? "bg-[#143d31] border-[#143d31] shadow-md"
                          : "bg-[#f4f8f5]/70 border-[#143d31]/8 hover:bg-[#f4f8f5] hover:border-[#143d31]/20",
                      )}
                    >
                      {/* Number */}
                      <span
                        className={cn(
                          "font-mono text-[11px] font-bold w-5 shrink-0 text-right transition-colors tabular-nums",
                          selected ? "text-[#a3e635]" : "text-[#143d31]/25",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Icon */}
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                          selected
                            ? "bg-[#a3e635]/15 text-[#a3e635]"
                            : "bg-white text-[#5d7d37] shadow-xs group-hover:bg-[#143d31]/5",
                        )}
                      >
                        <Icon className="h-[18px] w-[18px]" weight="duotone" />
                      </div>

                      {/* Name + location */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "font-display text-sm font-bold tracking-tight leading-snug truncate",
                            selected ? "text-white" : "text-[#143d31]",
                          )}
                        >
                          {fac.name.replace("Anzix Farm Technologies Pvt Ltd", "Corporate Office")}
                        </p>
                        <p
                          className={cn(
                            "font-sans text-xs leading-tight truncate",
                            selected ? "text-white/55" : "text-[#4f624f]",
                          )}
                        >
                          {fac.district}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 shrink-0 transition-all duration-200",
                          selected
                            ? "text-[#a3e635]"
                            : "text-[#143d31]/15 group-hover:text-[#143d31]/35",
                        )}
                      />
                    </button>
                  );
                })
              )}
            </div>

            {/* Count indicator when filtering */}
            {(search || stateFilter !== "All") && filtered.length > 0 && (
              <p className="font-mono text-[10px] text-[#4f624f]/60 tracking-wider">
                {filtered.length} of {facilities.length} locations
              </p>
            )}

            {/* Selected facility detail card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="rounded-2xl border border-[#143d31]/10 bg-[#f4f8f5]/80 p-5 space-y-4"
              >
                <div>
                  <p className="font-display text-base font-bold text-[#143d31] leading-snug">
                    {active.name}
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-[#4f624f]">{active.tagline}</p>
                </div>

                <div className="flex items-start gap-2.5 text-xs">
                  <MapPin className="h-4 w-4 shrink-0 text-[#5d7d37] mt-0.5" weight="fill" />
                  <span className="font-sans text-[#143d31] leading-relaxed">{active.address}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <a
                    href={`tel:${active.telRaw}`}
                    onClick={() => track("phone_clicked", { source: "facility", facility: active.id })}
                    className="flex items-center gap-1.5 font-sans font-semibold text-[#143d31] hover:text-[#5d7d37] transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" weight="fill" />
                    <span>{active.phone}</span>
                  </a>
                  <div className="flex items-center gap-1.5 text-[#4f624f]">
                    <Clock className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" weight="fill" />
                    <span className="font-sans leading-tight">{active.hours}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-[#143d31]/10">
                  <a
                    href={active.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("directions_clicked", { facility: active.id })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#143d31] px-4 py-2 font-sans text-xs font-bold text-white transition-all hover:bg-[#1a4d3e] shadow-sm"
                  >
                    Get Directions
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(active.address);
                        setCopiedId(active.id);
                        toast("Address copied to clipboard", "success");
                        window.setTimeout(() => setCopiedId(null), 2500);
                      } catch {
                        toast("Could not copy address", "error");
                      }
                    }}
                    className="cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-[#143d31]/15 bg-white px-4 py-2 font-sans text-xs font-semibold text-[#143d31] transition-all hover:bg-[#143d31]/5"
                  >
                    {copiedId === active.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
                        Copy Address
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT MAP ──────────────────────────────────────────── */}
          <div className="lg:col-span-7 mt-2 lg:mt-0">
            <div
              className="relative overflow-hidden rounded-3xl border border-[#143d31]/10 shadow-sm bg-white"
              style={{ minHeight: "480px", height: "clamp(480px, 62vh, 660px)" }}
            >
              {/* Slim top bar */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2.5 bg-white/90 backdrop-blur-md border-b border-[#143d31]/8">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                  <span className="font-sans text-xs font-semibold text-[#143d31]">
                    {active.name.replace("Anzix Farm Technologies Pvt Ltd", "Anzix Farm")}
                  </span>
                </div>
                <a
                  href={active.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-[#5d7d37] hover:text-[#143d31] transition-colors"
                >
                  Open in Maps
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 pt-[41px]"
                >
                  <GoogleMapEmbed facility={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
