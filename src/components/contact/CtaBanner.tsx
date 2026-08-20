import { useRef } from "react";
import { Clock, ChatCircleText, Phone, Sparkle } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

gsap.registerPlugin(useGSAP);

export default function CtaBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

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
          const { reduceMotion: rm } = context.conditions as { reduceMotion: boolean };
          if (rm) return;

          gsap.fromTo(
            ".cta-card-fade",
            { opacity: 0, scale: 0.97, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
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

  return (
    <section
      ref={containerRef}
      id="direct-hotline"
      aria-labelledby="cta-heading"
      className="scroll-mt-24 py-16 sm:py-20 md:py-24 bg-[#f4f8f5] text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="cta-card-fade relative overflow-hidden rounded-3xl bg-[#0d2a21] p-8 sm:p-12 md:p-14 text-white shadow-xl border border-white/10">
          {/* Background Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#a3e635]/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Direct Call Triggers */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#a3e635]" aria-hidden="true" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#a3e635]">
                  07 · Direct Phone &amp; WhatsApp Hotlines
                </p>
              </div>

              <h2
                id="cta-heading"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]"
              >
                Prefer Immediate Real-Time Assistance?
              </h2>

              <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                No form required. Our senior agronomy desk in Gurugram is available directly by phone and WhatsApp during farm operating hours.
              </p>

              <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-mono text-xs text-white backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3e635] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3e635]" />
                </span>
                <Clock className="h-3.5 w-3.5 text-[#a3e635]" weight="bold" />
                <span>7:30 AM – 8:00 PM IST · Mon–Sat</span>
                <span className="text-white/40">·</span>
                <span className="text-[#a3e635] font-semibold">&lt; 15 Min Reply</span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <SlideUpPillButton
                  href={`tel:${TEL_PRIMARY}`}
                  onClick={() => track("cta_banner_clicked", { action: "phone" })}
                  variant="lime"
                  size="md"
                  label={`Call ${PRIMARY_PHONE}`}
                  icon={<Phone className="h-4 w-4" />}
                  iconPosition="left"
                />

                <SlideUpPillButton
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("cta_banner_clicked", { action: "whatsapp" })}
                  variant="hero-secondary"
                  size="md"
                  label="WhatsApp Agronomy Chat"
                  icon={<ChatCircleText className="h-4 w-4 text-[#a3e635]" weight="fill" />}
                  iconPosition="left"
                />
              </div>
            </div>

            {/* Right Column: Visual Farm Image */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <motion.div
                className="relative w-full max-w-[360px]"
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={
                  reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <img
                  src="/farm.png"
                  alt="Agaate agronomist advising a farmer beside a crop plant"
                  className="mx-auto max-h-[320px] w-full object-contain drop-shadow-2xl"
                  width={800}
                  height={700}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
