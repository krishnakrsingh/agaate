import { Clock, ChatCircleText, Phone } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";

export default function CtaBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="cta-heading"
      className="border-t border-neutral-200 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_1px_0_rgba(20,61,49,0.04),0_18px_40px_-24px_rgba(20,61,49,0.18)]">
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(90%_80%_at_100%_50%,rgba(93,125,55,0.07),transparent_55%)]"
            aria-hidden="true"
          />

          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-14 lg:pr-6">
              <div className="inline-flex items-center gap-2">
                <span className="h-px w-5 bg-forest/50" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest">
                  Prefer to talk
                </p>
              </div>

              <h2
                id="cta-heading"
                className="mt-4 max-w-md font-display text-3xl font-semibold tracking-tight text-forest-deep md:text-[2.5rem] md:leading-[1.15]"
              >
                Call or message us directly
              </h2>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600">
                No form required. Our Gurugram desk is available during farm operating hours.
              </p>

              <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1.5 text-xs text-neutral-600 backdrop-blur-sm">
                <Clock className="h-3.5 w-3.5 text-forest" strokeWidth={1.75} />
                7:30 AM – 8:00 PM IST · Mon–Sat
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={`tel:${TEL_PRIMARY}`}
                  onClick={() => track("cta_banner_clicked", { action: "phone" })}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-forest-deep px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(20,61,49,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                  Call {PRIMARY_PHONE}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("cta_banner_clicked", { action: "whatsapp" })}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-forest-deep transition-all duration-300 hover:-translate-y-0.5 hover:border-forest/35 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
                >
                  <ChatCircleText className="h-4 w-4" strokeWidth={1.75} />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden px-6 py-8 lg:min-h-[380px] lg:px-8">
              <div
                className="pointer-events-none absolute inset-3 rounded-xl bg-gradient-to-br from-[#eef4ef] via-[#f7faf7] to-white lg:inset-4 lg:left-0"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-[18%] left-1/2 h-16 w-[60%] -translate-x-1/2 rounded-[100%] bg-forest-deep/15 blur-2xl"
                aria-hidden="true"
              />

              <motion.div
                className="relative z-10 w-full max-w-[420px]"
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <img
                  src="/farm.png"
                  alt="Agaate agronomist advising a farmer beside a crop plant"
                  className="mx-auto max-h-[320px] w-full object-contain drop-shadow-[0_20px_32px_rgba(20,61,49,0.22)] lg:max-h-[360px]"
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
