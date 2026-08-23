import { Clock, ChatCircleText, Phone } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { Reveal } from "@/components/common/motion";

export default function CtaBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="cta-heading"
      className="border-t border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal variant="fade-up">
          <div className="relative overflow-hidden rounded-3xl border border-[#143d31]/10 bg-[#143d31] text-white shadow-xl">
            {/* Subtle background glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#a3e635]/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-[#5d7d37]/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid items-center lg:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col justify-center p-8 sm:p-10 md:p-14 lg:pr-8 space-y-6">
                <div className="inline-flex items-center gap-2.5">
                  <span className="h-px w-5 bg-[#a3e635]" aria-hidden="true" />
                  <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#a3e635]">
                    Prefer To Talk Directly
                  </p>
                </div>

                <h2
                  id="cta-heading"
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]"
                >
                  Call or message our agronomists now
                </h2>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80 max-w-lg">
                  No online form required. Our Gurugram operations desk and agronomists are available throughout farm operating hours.
                </p>

                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs text-white/90 backdrop-blur-md">
                  <Clock className="h-3.5 w-3.5 text-[#a3e635]" weight="fill" />
                  <span>7:30 AM – 8:00 PM IST · Monday – Saturday</span>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <SlideUpPillButton
                    href={`tel:${TEL_PRIMARY}`}
                    onClick={() => track("cta_banner_clicked", { action: "phone" })}
                    variant="accent"
                    size="md"
                    label={`Call ${PRIMARY_PHONE}`}
                    icon={<Phone className="h-4 w-4" weight="fill" />}
                    iconPosition="left"
                  />
                  <SlideUpPillButton
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("cta_banner_clicked", { action: "whatsapp" })}
                    variant="hero-secondary"
                    size="md"
                    label="Chat on WhatsApp"
                    icon={<ChatCircleText className="h-4 w-4" weight="fill" />}
                    iconPosition="left"
                  />
                </div>
              </div>

              <div className="relative flex min-h-[260px] items-center justify-center p-8 lg:min-h-[360px]">
                <motion.div
                  className="relative z-10 w-full max-w-[380px]"
                  animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                  transition={
                    reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <img
                    src="/farm.png"
                    alt="Agaate agronomist advising a farmer"
                    className="mx-auto max-h-[300px] w-full object-contain drop-shadow-2xl lg:max-h-[340px]"
                    width={800}
                    height={700}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
