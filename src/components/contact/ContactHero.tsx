import { ChatCircleText, Phone, EnvelopeSimple, Clock } from "@phosphor-icons/react";
import heroImage from "@/assets/contact-team.png";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL, EMAIL, MAILTO_URL } from "./data";
import { track } from "@/lib/analytics";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

export default function ContactHero() {
  return (
    <section className="bg-[#f4f8f5] text-[#143d31] pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 border-b border-[#143d31]/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading & Direct Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Division Tag */}
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                01 · Direct Grower & Enterprise Desk
              </p>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
              Speak with the Agaate Agronomy Desk in Gurugram
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg text-[#4f624f] leading-relaxed max-w-2xl font-normal">
              Direct scientific guidance on soil reports, bio-boosted nursery pre-orders, turnkey farm setups, or visits to our living 6-acre proving ground.
            </p>

            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-[#143d31]/5 border border-[#143d31]/10 px-4 py-1.5 text-xs font-mono text-[#143d31]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5d7d37] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5d7d37]" />
              </span>
              <span className="font-bold">Desk Active (7:30 AM – 8:00 PM IST)</span>
              <span className="text-[#143d31]/30">·</span>
              <span className="text-[#5d7d37] font-semibold">&lt; 15 Min WhatsApp Reply</span>
            </div>

            {/* Quick Action Triggers */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <SlideUpPillButton
                href={`tel:${TEL_PRIMARY}`}
                onClick={() => track("phone_clicked", { source: "hero" })}
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
                onClick={() => track("whatsapp_clicked", { source: "hero" })}
                variant="outline"
                size="lg"
                label="WhatsApp Chat"
                icon={<ChatCircleText className="h-4 w-4 text-[#143d31]" />}
                iconPosition="left"
              />

              <SlideUpPillButton
                href={MAILTO_URL}
                variant="ghost"
                size="lg"
                label={EMAIL}
                icon={<EnvelopeSimple className="h-4 w-4 text-[#5d7d37]" />}
                iconPosition="left"
                className="border border-[#143d31]/15 text-[#143d31]"
              />
            </div>
          </div>

          {/* Right Column: Hero Team Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#143d31]/10 bg-[#143d31]/5 shadow-xl">
              <img
                src={heroImage}
                alt="The Agaate team at the Gurugram hub"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                width={960}
                height={768}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a21]/60 via-transparent to-transparent pointer-events-none" />

              {/* Verified Location Stamp */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                <div className="rounded-xl bg-[#143d31]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-xs font-mono">
                  <span className="text-[#a3e635] font-bold">Gurugram Central Hub</span> · NH8 Pachgaon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
