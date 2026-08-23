import { ChatCircleText, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";
import { Reveal, CountUp } from "@/components/common/motion";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20 text-[#143d31]">
      {/* Subtle ambient light glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl opacity-25 blur-3xl bg-gradient-to-b from-[#a3e635]/25 via-emerald-500/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-10 sm:space-y-12">
        {/* Clean Typography Narrative */}
        <div className="max-w-3xl space-y-5">
          <Reveal variant="fade-up" className="flex items-center gap-2.5">
            <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              Contact & Direct Advisory Desk
            </p>
          </Reveal>

          <Reveal variant="fade-up" delay={0.08}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              Speak with the agronomists{" "}
              <span className="text-[#5d7d37]">
                on your schedule.
              </span>
            </h1>
          </Reveal>

          <Reveal variant="fade-up" delay={0.15}>
            <p className="font-sans text-base sm:text-lg text-[#4f624f] leading-relaxed max-w-2xl">
              Stage-wise vegetable crop advisory, bio-boosted nursery pre-orders, large-scale farm
              setup, or booking an Agri Park visit — our agronomy desk is here to help.
            </p>
          </Reveal>

          <Reveal variant="fade-up" delay={0.22} className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={`tel:${TEL_PRIMARY}`}
              onClick={() => track("phone_clicked", { source: "hero" })}
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#143d31] px-6 py-3.5 font-mono text-xs font-bold text-white shadow-xs transition-all hover:bg-[#1a4d3e] hover:shadow-md hover:scale-105"
            >
              <Phone className="h-4 w-4 text-[#a3e635]" weight="fill" />
              <span>Call {PRIMARY_PHONE}</span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "hero" })}
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#143d31]/20 bg-white px-6 py-3.5 font-mono text-xs font-bold text-[#143d31] shadow-xs transition-all hover:bg-[#143d31]/5 hover:border-[#143d31]/40 hover:scale-105"
            >
              <WhatsappLogo className="h-4 w-4 text-emerald-600" weight="fill" />
              <span>Chat on WhatsApp</span>
            </a>
          </Reveal>
        </div>

        {/* Unified Full-Width Hairline Metrics Strip */}
        <Reveal variant="fade-up" delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10 py-6 sm:py-8">
            <div className="space-y-1 md:pr-6">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143d31] tracking-tight">
                &lt; 15 Mins
              </p>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37]">
                Direct Response
              </p>
              <p className="font-sans text-xs text-[#4f624f]/80 mt-0.5">
                Fast WhatsApp & phone callback
              </p>
            </div>

            <div className="space-y-1 md:px-6 pt-4 md:pt-0">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143d31] tracking-tight">
                12+ Hours
              </p>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37]">
                Daily Active
              </p>
              <p className="font-sans text-xs text-[#4f624f]/80 mt-0.5">
                7:30 AM – 8:00 PM IST (Mon–Sat)
              </p>
            </div>

            <div className="space-y-1 md:px-6 pt-4 md:pt-0">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143d31] tracking-tight">
                <CountUp to={2000} suffix="+" />
              </p>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37]">
                Farmers Advised
              </p>
              <p className="font-sans text-xs text-[#4f624f]/80 mt-0.5">
                Across Haryana & NCR clusters
              </p>
            </div>

            <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143d31] tracking-tight">
                100%
              </p>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37]">
                Genuine Advisory
              </p>
              <p className="font-sans text-xs text-[#4f624f]/80 mt-0.5">
                Senior agronomists · Zero bots
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
