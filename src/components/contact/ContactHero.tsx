import { useRef } from "react";
import {
  ChatCircleText,
  Phone,
  EnvelopeSimple,
  Clock,
  MapPin,
  Sparkle,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import heroImage from "@/assets/contact-team.png";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL, EMAIL, MAILTO_URL } from "./data";
import { track } from "@/lib/analytics";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

gsap.registerPlugin(useGSAP);

export default function ContactHero() {
  const containerRef = useRef<HTMLElement>(null);

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

          const tl = gsap.timeline({ delay: 0.1 });

          tl.fromTo(
            ".hero-eyebrow",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          )
            .fromTo(
              ".hero-headline",
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              "-=0.4",
            )
            .fromTo(
              ".hero-subtext",
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
              "-=0.5",
            )
            .fromTo(
              ".hero-badge",
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
              "-=0.4",
            )
            .fromTo(
              ".hero-pills",
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
              "-=0.4",
            )
            .fromTo(
              ".hero-visual",
              { opacity: 0, scale: 0.96 },
              { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
              "-=0.7",
            );
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="contact-hero"
      aria-label="Contact hero"
      className="bg-[#f4f8f5] text-[#143d31] pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-18 border-b border-[#143d31]/10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading & Direct Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Division Tag */}
            <div className="hero-eyebrow flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                01 · Direct Grower & Enterprise Desk
              </p>
            </div>

            {/* Display Headline */}
            <h1 className="hero-headline font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#143d31] leading-[1.08]">
              Speak with the Agaate Agronomy Desk in Gurugram
            </h1>

            {/* Subtitle */}
            <p className="hero-subtext font-sans text-base sm:text-lg text-[#4f624f] leading-relaxed max-w-2xl font-normal">
              Get immediate scientific guidance on leaf disease diagnosis, bio-boosted nursery pre-orders, turnkey farm setups, or book a guided tour of our living 17-acre proving grounds.
            </p>

            {/* Live Operational Status Badge */}
            <div className="hero-badge inline-flex flex-wrap items-center gap-2.5 rounded-full bg-[#143d31]/5 border border-[#143d31]/10 px-4 py-2 text-xs font-mono text-[#143d31]">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5d7d37] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5d7d37]" />
              </span>
              <span className="font-bold">Desk Active (7:30 AM – 8:00 PM IST)</span>
              <span className="text-[#143d31]/30">·</span>
              <span className="text-[#5d7d37] font-semibold flex items-center gap-1">
                <Sparkle className="h-3.5 w-3.5 text-[#5d7d37]" weight="fill" />
                &lt; 15 Min WhatsApp Reply
              </span>
            </div>

            {/* Quick Action Pill Triggers */}
            <div className="hero-pills pt-2 flex flex-wrap items-center gap-3">
              <SlideUpPillButton
                href={`tel:${TEL_PRIMARY}`}
                onClick={() => track("phone_clicked", { source: "hero" })}
                variant="dark"
                size="md"
                label={`Call ${PRIMARY_PHONE}`}
                icon={<Phone className="h-4 w-4" />}
                iconPosition="left"
              />

              <SlideUpPillButton
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_clicked", { source: "hero" })}
                variant="outline"
                size="md"
                label="WhatsApp Chat"
                icon={<ChatCircleText className="h-4 w-4 text-[#143d31]" />}
                iconPosition="left"
              />

              <SlideUpPillButton
                href={MAILTO_URL}
                variant="light"
                size="md"
                label={EMAIL}
                icon={<EnvelopeSimple className="h-4 w-4 text-[#5d7d37]" />}
                iconPosition="left"
              />
            </div>
          </div>

          {/* Right Column: Hero Visual with Coordinates Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="hero-visual relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#143d31]/10 bg-[#143d31]/5 shadow-xl group">
              <img
                src={heroImage}
                alt="The Agaate team and agronomists at the Gurugram hub"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                width={960}
                height={768}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a21]/80 via-[#0d2a21]/20 to-transparent pointer-events-none" />

              {/* Top Verified Chip */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-mono font-bold text-[#143d31] backdrop-blur-md shadow-xs border border-[#143d31]/10">
                <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" weight="fill" />
                <span>Central Agronomy Hub · NH8 Kukrola</span>
              </div>

              {/* Bottom Location Stamp */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                <div className="rounded-xl bg-[#143d31]/90 backdrop-blur-md px-3.5 py-2 border border-white/10 text-xs font-mono">
                  <span className="text-[#a3e635] font-bold">28.3241° N</span>, 76.9124° E · 17-Acre Nursery
                </div>
                <div className="rounded-xl bg-white/15 backdrop-blur-md px-3 py-2 text-[11px] font-mono font-medium text-white/90">
                  Daily Operations
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Quick Telemetry Strip */}
        <div className="mt-12 pt-6 border-t border-[#143d31]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#5d7d37] shrink-0" />
            <div>
              <p className="font-bold text-[#143d31]">Direct Agronomy Desk</p>
              <p className="text-[#4f624f]">Typical reply &lt; 15 mins</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-[#5d7d37] shrink-0" weight="bold" />
            <div>
              <p className="font-bold text-[#143d31]">Operational Hours</p>
              <p className="text-[#4f624f]">7:30 AM – 8:00 PM IST (Mon–Sat)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-[#5d7d37] shrink-0" weight="bold" />
            <div>
              <p className="font-bold text-[#143d31]">Proving Grounds</p>
              <p className="text-[#4f624f]">Kukrola & Bhora Kalan, Gurugram</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
