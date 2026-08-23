import { Phone, WhatsappLogo, CheckCircle, ShieldCheck } from "@phosphor-icons/react";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";
import { Reveal, CountUp } from "@/components/common/motion";
import farmerTransparent from "@/assets/farmer-transparent.png";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20 text-[#143d31]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl opacity-25 blur-3xl bg-gradient-to-b from-[#a3e635]/25 via-emerald-500/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Narrative & Action */}
          <Reveal variant="fade-up" className="space-y-6 lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                Contact & Field Advisory Desk
              </p>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#143d31] leading-[1.1]">
              Speak with the agronomists{" "}
              <span className="text-[#5d7d37]">
                on your schedule.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#4f624f] leading-relaxed max-w-xl">
              Stage-wise vegetable crop advisory, bio-boosted nursery pre-orders, large-scale farm
              setup, or booking an Agri Park visit — we typically reply within 15 minutes.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3.5 sm:gap-4">
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
            </div>

            {/* Micro-Trust Metric Strip */}
            <div className="pt-6 border-t border-[#143d31]/10 grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight whitespace-nowrap">
                  &lt; 15 Mins
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  Direct Response
                </p>
              </div>
              <div className="border-l border-[#143d31]/10 pl-4">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight whitespace-nowrap">
                  12+ Hours
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  Daily Active
                </p>
              </div>
              <div className="border-l border-[#143d31]/10 pl-4">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight whitespace-nowrap">
                  <CountUp to={2000} suffix="+" />
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  Farmers Advised
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Ultra-Realistic Transparent Farmer Cutout */}
          <Reveal variant="fade-up" delay={0.12} className="lg:col-span-5 relative flex justify-center items-center">
            {/* Ambient Glow Disk */}
            <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-[#143d31]/10 via-[#a3e635]/25 to-transparent blur-3xl" />

            <div className="relative w-full max-w-[340px] sm:max-w-[400px] flex flex-col items-center">
              {/* Farmer Transparent Cutout Image */}
              <img
                src={farmerTransparent}
                alt="Agaate Progressive Farmer Partner"
                className="w-full h-auto max-h-[460px] object-contain drop-shadow-[0_20px_35px_rgba(20,61,49,0.22)] select-none pointer-events-none"
                width={896}
                height={1200}
              />

              {/* Floating Live Badge Top Right */}
              <div className="absolute -top-2 -right-2 sm:right-0 flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-md px-3.5 py-2 border border-[#143d31]/10 shadow-lg animate-bounce-subtle">
                <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                <span className="font-mono text-[11px] font-bold text-[#143d31]">
                  Direct Field Advisory
                </span>
              </div>

              {/* Floating Guarantee Badge Bottom Left */}
              <div className="absolute bottom-6 -left-2 sm:left-0 flex items-center gap-2.5 rounded-2xl bg-[#143d31] text-white px-4 py-2.5 shadow-xl border border-white/10">
                <ShieldCheck className="h-4 w-4 text-[#a3e635] shrink-0" weight="bold" />
                <div className="font-mono text-[10px] leading-tight">
                  <p className="font-bold text-white">100% Genuine</p>
                  <p className="text-white/70">Certified Agronomists</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
