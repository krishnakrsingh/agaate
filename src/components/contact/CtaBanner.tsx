import { Clock, ChatCircleText, Phone } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

export default function CtaBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="cta-heading"
      className="scroll-mt-24 py-16 sm:py-20 md:py-24 bg-[#f4f8f5] text-[#143d31] border-t border-[#143d31]/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Call Triggers */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                06 · Direct Phone & WhatsApp Hotlines
              </p>
            </div>

            <h2
              id="cta-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]"
            >
              Prefer Immediate Real-Time Assistance?
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#4f624f] leading-relaxed max-w-xl">
              No form required. Our senior agronomy desk in Gurugram is available directly by phone and WhatsApp during farm operating hours.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#143d31]/15 bg-white px-4 py-1.5 font-mono text-xs text-[#143d31] shadow-2xs">
              <Clock className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
              <span>7:30 AM – 8:00 PM IST · Mon–Sat</span>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <SlideUpPillButton
                href={`tel:${TEL_PRIMARY}`}
                onClick={() => track("cta_banner_clicked", { action: "phone" })}
                variant="dark"
                size="lg"
                label={`Call ${PRIMARY_PHONE}`}
                icon={<Phone className="h-4 w-4" />}
                iconPosition="left"
              />

              <SlideUpPillButton
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("cta_banner_clicked", { action: "whatsapp" })}
                variant="outline"
                size="lg"
                label="WhatsApp Agronomy Chat"
                icon={<ChatCircleText className="h-4 w-4 text-[#143d31]" />}
                iconPosition="left"
              />
            </div>
          </div>

          {/* Right Column: Visual Farm Image */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              className="relative w-full max-w-[400px]"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={
                reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <img
                src="/farm.png"
                alt="Agaate agronomist advising a farmer beside a crop plant"
                className="mx-auto max-h-[340px] w-full object-contain drop-shadow-2xl"
                width={800}
                height={700}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
