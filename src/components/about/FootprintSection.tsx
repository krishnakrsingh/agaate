import { MapPin } from "@phosphor-icons/react";
import { Reveal } from "@/components/common/motion";
import { useAboutPage } from "@/contexts/AboutPageContext";

export default function FootprintSection({ isHi = false }: { isHi?: boolean }) {
  const { locations } = useAboutPage();

  return (
    <section
      id="footprint"
      aria-labelledby="footprint-heading"
      className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
        <Reveal variant="fade-up" className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Where We Work · Physical Facilities
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="footprint-heading"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl"
            >
              Three physical hubs. One connected ecosystem.
            </h2>

            <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
              From our flagship 5-acre nursery to our farmer experience retail store and corporate
              HQ in Gurugram.
            </p>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10 py-2">
            {locations.map((loc) => (
              <div
                key={loc.nameEn}
                className="p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:bg-white/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#143d31]/10 text-[#143d31]">
                    <MapPin className="h-5 w-5 text-[#143d31]" weight="duotone" />
                  </div>

                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      {isHi ? loc.tagHi : loc.tagEn}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-[#143d31] tracking-tight">
                      {isHi ? loc.nameHi : loc.nameEn}
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#4f624f]">
                    {isHi ? loc.addressHi : loc.addressEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#143d31]/10">
                  <p className="font-mono text-[10px] font-semibold text-[#4f624f]/80">
                    {isHi ? loc.subHi : loc.subEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
