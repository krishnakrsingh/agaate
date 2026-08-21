import { Leaf, ShieldCheck } from "@phosphor-icons/react";
import { Reveal } from "@/components/common/motion";
import { mission, whoWeAre } from "./data";

export default function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Image with architectural border */}
          <Reveal variant="fade-up" className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#143d31]/10 bg-[#143d31]/5 shadow-xs">
              <img
                src={whoWeAre.image}
                alt={whoWeAre.imageAlt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                width={800}
                height={1000}
              />
              <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 border border-[#143d31]/10 shadow-xs flex items-center gap-1.5">
                <ShieldCheck weight="fill" className="h-3.5 w-3.5 text-[#5d7d37]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                  On-Ground Verified
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Story & Mission Card */}
          <Reveal variant="fade-up" delay={0.1} className="space-y-6 lg:col-span-7">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {whoWeAre.eyebrow}
              </p>
            </div>

            <h2
              id="who-we-are-heading"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-xl"
            >
              {whoWeAre.headline}
            </h2>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">
              {whoWeAre.body}
            </p>

            <blockquote className="border-l-2 border-[#5d7d37] pl-4 font-serif text-lg md:text-xl italic text-[#143d31] leading-snug">
              “{whoWeAre.pullQuote}”
            </blockquote>

            {/* Mission Card */}
            <div className="rounded-2xl border border-[#143d31]/10 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#143d31]/10 text-[#143d31]">
                  <Leaf weight="duotone" className="h-4 w-4" />
                </div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#5d7d37]">
                  {mission.eyebrow}
                </p>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143d31] tracking-tight">
                {mission.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#4f624f]">
                {mission.body}
              </p>

              <p className="font-sans text-xs text-[#5d7d37] font-medium pt-1 border-t border-[#143d31]/10">
                {mission.support}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
