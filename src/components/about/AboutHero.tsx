import { Download, ArrowDown, Plant } from "@phosphor-icons/react";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { Reveal } from "@/components/common/motion";
import { brochureHref } from "./data";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 text-[#143d31]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Narrative */}
          <Reveal variant="fade-up" className="space-y-6 lg:col-span-7">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                About Agaate · Our Foundation
              </p>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] text-[#143d31] tracking-tight leading-[1.1] max-w-2xl">
              Begin with strong roots.{" "}
              <span className="font-serif italic font-normal text-[#5d7d37]">
                Growing better tomorrow.
              </span>
            </h1>

            <p className="font-sans text-[#4f624f] text-base sm:text-lg max-w-xl leading-relaxed">
              Agaate empowers Indian farmers with science-backed, sustainable nursery solutions,
              genuine inputs, and on-ground agronomy that build stronger crops from the very beginning.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <SlideUpPillButton
                href={brochureHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="dark"
                size="md"
                label="Download Brochure"
                icon={<Download className="h-4 w-4" />}
                iconPosition="right"
              />
              <SlideUpPillButton
                href="#who-we-are"
                variant="outline"
                size="md"
                label="Our Story"
                icon={<ArrowDown className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>

            {/* Quick Micro-Trust Signals */}
            <div className="pt-4 border-t border-[#143d31]/10 flex flex-wrap items-center gap-6 text-xs text-[#4f624f]">
              <div className="flex items-center gap-2 font-medium">
                <span className="h-2 w-2 rounded-full bg-[#5d7d37]" />
                <span>15,000+ Monitored Acres</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span className="h-2 w-2 rounded-full bg-[#5d7d37]" />
                <span>2,000+ Enrolled Farmers</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span className="h-2 w-2 rounded-full bg-[#5d7d37]" />
                <span>Gurugram, North India</span>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Hero Image with subtle Badge */}
          <Reveal variant="fade-up" delay={0.15} className="lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden rounded-2xl border border-[#143d31]/10 bg-[#143d31]/5 shadow-xs">
              <img
                src="/about-hero-nursery.png"
                alt="Rows of Bio-Boosted seedlings in Agaate's controlled nursery"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                width={960}
                height={768}
              />
              {/* Overlay Chip */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 backdrop-blur-md p-3.5 border border-[#143d31]/10 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#143d31] text-[#a3e635]">
                    <Plant weight="duotone" className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xs font-bold text-[#143d31] truncate">
                      5-Acre Smart Nursery
                    </p>
                    <p className="font-mono text-[10px] text-[#5d7d37] font-semibold uppercase tracking-wider truncate">
                      Kukrola, Gurugram (NH8)
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#5d7d37]/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#5d7d37] shrink-0">
                  Zero Mortality
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
