import nurseryImg from "@/assets/zones/polyhouse_nursery.png";
import { Eyebrow, InlineCta } from "./Shared";

const nurseryPhases = [
  "Research & crop planning",
  "Controlled cultivation",
  "Quality testing",
  "Distribution & transport",
];

export function ProductionInfrastructure() {
  return (
    <section className="bg-white px-6 pt-10 pb-20 text-ink md:pt-12 md:pb-24 lg:px-12 lg:pt-14 lg:pb-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 flex flex-col pt-1">
          <div>
            <Eyebrow>Production infrastructure</Eyebrow>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] text-forest-deep">
              The 17-acre smart nursery is the quality-control center of the company.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-[#59635D] md:text-[17px]">
              Agaate's nursery model replaces risky direct sowing with controlled germination,
              bio-boosted roots, standardized protocols, in-house trials, and traceability before
              seedlings ever reach a farmer's field.
            </p>
          </div>

          <div className="mt-8 lg:mt-10">
            <div className="grid grid-cols-2 gap-x-5 gap-y-6 mb-8 border-t border-ink/10 pt-6">
              {nurseryPhases.map((phase, index) => (
                <div key={phase}>
                  <div className="mb-2">
                    <span className="font-jet text-[10px] text-terracotta">0{index + 1}</span>
                  </div>
                  <span className="font-semibold text-forest-deep text-[15px] leading-snug">
                    {phase}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <InlineCta href="/services/nursery">Inspect nursery model</InlineCta>
              <InlineCta href="/contact" variant="light">
                Book facility visit
              </InlineCta>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-lg border border-[#DDE7E1] h-[400px] md:h-[500px] lg:h-full">
            <img
              src={nurseryImg}
              alt="Agaate controlled nursery infrastructure"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#10261F]/95 via-[#10261F]/70 to-transparent p-6 text-cream md:p-8 lg:p-10">
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <div className="font-serif text-[2rem] text-white leading-none">90-98%</div>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/70">
                    Target germination & survival range
                  </p>
                </div>
                <div>
                  <div className="font-serif text-[2rem] text-white leading-none">30-50%</div>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/70">
                    Seed waste reduction vs direct sowing
                  </p>
                </div>
                <div>
                  <div className="font-serif text-[2rem] text-white leading-none">15-30%</div>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/70">
                    Yield improvement potential
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
