import { Download, ArrowDown } from "@phosphor-icons/react";
import heroImage from "@/assets/contact-team.png";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { Reveal } from "@/components/common/motion";
import { brochureHref } from "./data";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 text-[#143d31]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Narrative & Metrics */}
          <Reveal variant="fade-up" className="space-y-6 lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                About Agaate · Our Foundation
              </p>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] text-[#143d31] tracking-tight leading-[1.08]">
              Begin with strong roots.{" "}
              <span className="text-[#5d7d37]">
                Growing better tomorrow.
              </span>
            </h1>

            <p className="font-sans text-[#4f624f] text-base sm:text-lg leading-relaxed font-normal max-w-xl">
              Agaate empowers Indian farmers with science-backed, sustainable nursery solutions,
              genuine inputs, and on-ground agronomy that build stronger crops from the very beginning.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3.5">
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

            {/* Quick Micro-Trust Metric Strip */}
            <div className="pt-6 border-t border-[#143d31]/10 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                  15,000+
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  Monitored Acres
                </p>
              </div>
              <div className="border-l border-[#143d31]/10 pl-3 sm:pl-4">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                  2,000+
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  Enrolled Farmers
                </p>
              </div>
              <div className="border-l border-[#143d31]/10 pl-3 sm:pl-4">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                  5-Acre
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  Smart Nursery
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
