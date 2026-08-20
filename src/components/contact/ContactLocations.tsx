import { useState, useRef } from "react";
import {
  MapPin,
  Phone,
  Clock,
  NavigationArrow,
  Check,
  Copy,
  Plant,
  Storefront,
  Buildings,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FACILITIES, type Facility } from "./data";
import { useToast } from "./toast-context";
import { track } from "@/lib/analytics";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

gsap.registerPlugin(useGSAP);

export default function ContactLocations() {
  const containerRef = useRef<HTMLElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { showToast } = useToast();

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
            ".location-col",
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
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
      id="locations"
      aria-label="Agaate Physical Facilities"
      className="relative w-full overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-b border-[#143d31]/10 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 space-y-10">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl text-left">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              02 · Physical Hubs &amp; Proving Grounds
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#143d31] tracking-tight leading-[1.12]">
              Visit Our Facilities in Gurugram
            </h2>
            <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
              Experience our 17-acre smart nursery, visit the Kisan Mall input storefront, or meet our leadership team in person.
            </p>
          </div>
        </div>

        {/* 3-Column Seamless Architectural Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10">
          {FACILITIES.map((facility, idx) => {
            const Icon = facility.icon;
            return (
              <div
                key={facility.id}
                className="location-col p-6 sm:p-8 flex flex-col justify-between space-y-8 hover:bg-white/60 transition-colors duration-300 text-left"
              >
                <div className="space-y-5">
                  {/* Tag & Role */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#5d7d37] uppercase tracking-wider">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-[#143d31]/5 border border-[#143d31]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                      {facility.role}
                    </span>
                  </div>

                  {/* Name & Tagline */}
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#143d31] text-[#a3e635] mb-3.5 shadow-2xs">
                      <Icon className="h-5 w-5" weight="duotone" />
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143d31] tracking-tight">
                      {facility.name}
                    </h3>
                    <p className="font-sans text-xs font-semibold text-[#5d7d37] mt-1">
                      {facility.tagline}
                    </p>
                  </div>

                  {/* Address & Meta */}
                  <div className="space-y-3 pt-3 border-t border-[#143d31]/10 text-xs font-sans">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="h-4 w-4 shrink-0 text-[#5d7d37] mt-0.5" weight="bold" />
                      <p className="text-[#143d31] leading-relaxed font-medium">{facility.address}</p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 shrink-0 text-[#5d7d37]" weight="bold" />
                      <span className="font-mono text-[#4f624f]">{facility.hours}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="h-4 w-4 shrink-0 text-[#5d7d37]" weight="bold" />
                      <a
                        href={`tel:${facility.telRaw}`}
                        className="font-mono font-bold text-[#143d31] hover:underline"
                      >
                        {facility.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#143d31]/10 flex items-center gap-2.5">
                  <SlideUpPillButton
                    href={facility.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("directions_clicked", { facility: facility.id })}
                    variant="dark"
                    size="sm"
                    label="Directions"
                    icon={<NavigationArrow className="h-3.5 w-3.5" weight="bold" />}
                    iconPosition="right"
                  />

                  <button
                    type="button"
                    onClick={() => handleCopyAddress(facility)}
                    className="cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-[#143d31]/15 bg-white px-3.5 py-2 font-mono text-[11px] font-bold text-[#143d31] transition-colors hover:bg-[#f4f8f5]"
                  >
                    {copiedId === facility.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
