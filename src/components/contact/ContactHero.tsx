import { ChatCircleText, Phone } from "@phosphor-icons/react";
import heroImage from "@/assets/contact-team.png";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { Reveal } from "@/components/common/motion";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 text-[#143d31]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Narrative & Action */}
          <Reveal variant="fade-up" className="space-y-6 lg:col-span-6 flex flex-col justify-center">
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] text-[#143d31] tracking-tight leading-[1.08]">
              Speak with the agronomists{" "}
              <span className="text-[#5d7d37]">
                on your schedule.
              </span>
            </h1>

            <p className="font-sans text-[#4f624f] text-base sm:text-lg leading-relaxed font-normal max-w-xl">
              Crop advisory, bio-boosted nursery pre-orders, large-scale farm setup, or scheduling a visit to our smart nursery hubs — we typically reply within 2 business hours.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <SlideUpPillButton
                href={`tel:${TEL_PRIMARY}`}
                onClick={() => track("phone_clicked", { source: "hero" })}
                variant="dark"
                size="md"
                label={`Call ${PRIMARY_PHONE}`}
                icon={<Phone className="h-4 w-4" weight="fill" />}
                iconPosition="left"
              />
              <SlideUpPillButton
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_clicked", { source: "hero" })}
                variant="accent"
                size="md"
                label="Chat on WhatsApp"
                icon={<ChatCircleText className="h-4 w-4" weight="fill" />}
                iconPosition="left"
              />
            </div>

            {/* Quick Micro-Trust Metric Strip */}
            <div className="pt-6 border-t border-[#143d31]/10 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                  &lt; 2 Hrs
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  Typical Reply
                </p>
              </div>
              <div className="border-l border-[#143d31]/10 pl-3 sm:pl-4">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                  7:30 - 8:00
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  AM – PM IST (Mon–Sat)
                </p>
              </div>
              <div className="border-l border-[#143d31]/10 pl-3 sm:pl-4">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                  2,000+
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  Farmers Supported
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Prominent Team Photo */}
          <Reveal variant="fade-up" delay={0.12} className="lg:col-span-6 flex justify-center items-center">
            <div className="relative aspect-[16/11] sm:aspect-[4/3] lg:aspect-[16/11.5] w-full overflow-hidden rounded-3xl border border-[#143d31]/10 bg-white shadow-md transition-shadow hover:shadow-xl">
              <img
                src={heroImage}
                alt="The Agaate team at the Gurugram hub"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                width={1200}
                height={860}
              />
              <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 border border-[#143d31]/10 shadow-xs flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                  Gurugram Desk Active
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
