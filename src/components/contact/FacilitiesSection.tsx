import { useState, useRef } from "react";
import {
  CheckCircle,
  Clock,
  Copy,
  Check,
  MapPin,
  Phone,
  NavigationArrow,
  Compass,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE } from "@/components/common/motion";
import { FACILITIES, type Facility } from "./data";
import GoogleMapEmbed from "./GoogleMapEmbed";
import { useToast } from "./toast-context";
import { track } from "@/lib/analytics";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

gsap.registerPlugin(useGSAP);

export default function FacilitiesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(FACILITIES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { showToast } = useToast();

  const activeFacility = FACILITIES.find((f) => f.id === activeTab) || FACILITIES[0];

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion: boolean };
          if (reduceMotion) return;

          gsap.fromTo(
            ".facility-header-fade",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  const handleCopyAddress = (facility: Facility) => {
    const full = `${facility.name}, ${facility.address}`;
    navigator.clipboard?.writeText(full).then(() => {
      setCopiedId(facility.id);
      showToast("Address copied to clipboard");
      track("address_copied", { facility: facility.id });
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  return (
    <section
      ref={containerRef}
      id="facilities"
      aria-labelledby="facilities-heading"
      className="scroll-mt-24 py-16 sm:py-20 md:py-24 bg-[#f4f8f5] text-[#143d31] border-b border-[#143d31]/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-10">
        {/* Section Header */}
        <div className="facility-header-fade flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                04 · Physical Experiential Hubs & Living Soil
              </p>
            </div>
            <h2
              id="facilities-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]"
            >
              Visit Our Living Proving Grounds in Gurugram
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4f624f] leading-relaxed">
              Walk our 17-acre automated plug nursery, explore the Kisan Mall retail storefront, or meet our leadership team in person.
            </p>
          </div>

          {/* Facility Switcher Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white border border-[#143d31]/12 shrink-0 shadow-2xs">
            {FACILITIES.map((f) => {
              const isActive = f.id === activeTab;
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(f.id);
                    track("facility_tab_switched", { facility: f.id });
                  }}
                  className={`cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#143d31] text-[#a3e635] shadow-sm"
                      : "text-[#143d31] hover:bg-[#f4f8f5]"
                  }`}
                >
                  <Icon className="h-4 w-4" weight={isActive ? "fill" : "bold"} />
                  <span>{f.name.replace("Agaate ", "").replace("Anzix ", "")}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Facility Full Presentation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFacility.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
          >
            {/* Left Column: Photo & Verified Hub Details */}
            <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-[#143d31]/12 bg-white p-6 sm:p-8 md:p-10 shadow-sm">
              <div className="space-y-6">
                {/* Visual Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#143d31]/5 border border-[#143d31]/10 group">
                  <img
                    src={activeFacility.image}
                    alt={activeFacility.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-[#143d31]/90 backdrop-blur-md px-3.5 py-1 font-mono text-[10px] font-bold uppercase text-[#a3e635] border border-white/10">
                    {activeFacility.role}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                    {activeFacility.name}
                  </h3>
                  <p className="font-sans text-sm font-semibold text-[#5d7d37] mt-0.5">
                    {activeFacility.tagline}
                  </p>
                </div>

                {/* Location, Contact & Hours Lines */}
                <div className="space-y-3 pt-3 border-t border-[#143d31]/10 text-sm font-sans">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-[#5d7d37] mt-0.5" weight="bold" />
                    <div>
                      <p className="text-[#143d31] font-medium leading-relaxed">{activeFacility.address}</p>
                      {activeFacility.plusCode && (
                        <p className="font-mono text-xs text-[#5d7d37] mt-0.5">Plus Code: {activeFacility.plusCode}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2.5">
                      <Phone className="h-4 w-4 shrink-0 text-[#5d7d37]" weight="bold" />
                      <a
                        href={`tel:${activeFacility.telRaw}`}
                        onClick={() => track("phone_clicked", { source: "facility", facility: activeFacility.id })}
                        className="font-mono text-xs font-bold text-[#143d31] hover:underline"
                      >
                        {activeFacility.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 shrink-0 text-[#5d7d37]" weight="bold" />
                      <span className="font-mono text-xs text-[#4f624f]">{activeFacility.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Highlight Checkpoints */}
                <div className="space-y-2 pt-3 border-t border-[#143d31]/10 font-sans">
                  {activeFacility.highlights.map((hl) => (
                    <div key={hl} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#143d31]">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[#5d7d37]" weight="fill" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#143d31]/10 flex flex-wrap items-center gap-3">
                <SlideUpPillButton
                  href={activeFacility.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("directions_clicked", { facility: activeFacility.id })}
                  variant="dark"
                  size="md"
                  label="Open in Google Maps"
                  icon={<NavigationArrow className="h-4 w-4" weight="bold" />}
                  iconPosition="left"
                />

                <button
                  type="button"
                  onClick={() => handleCopyAddress(activeFacility)}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[#143d31]/15 bg-[#f4f8f5] px-4 py-2 font-mono text-xs font-bold text-[#143d31] transition-colors hover:bg-white hover:border-[#143d31]/30"
                >
                  {copiedId === activeFacility.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
                      <span>Address Copied</span>
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

            {/* Right Column: Google Maps Interactive Satellite / Map Embed */}
            <div className="lg:col-span-6 flex flex-col rounded-3xl border border-[#143d31]/12 bg-white overflow-hidden shadow-sm min-h-[420px]">
              <div className="p-4 bg-[#f4f8f5] border-b border-[#143d31]/10 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#143d31] flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#5d7d37]" weight="fill" />
                  <span>Interactive Map & Satellite Pin</span>
                </span>
                <span className="font-mono text-[10px] text-[#5d7d37] uppercase tracking-wider font-bold">
                  {activeFacility.coordinates.latLabel} · {activeFacility.coordinates.lngLabel}
                </span>
              </div>
              <div className="flex-1 w-full h-full min-h-[380px]">
                <GoogleMapEmbed facility={activeFacility} query={activeFacility.mapEmbedQuery} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
