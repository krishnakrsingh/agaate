import { CheckCircle2 } from "lucide-react";
import nurseryImg from "@/assets/zones/polyhouse_nursery.png";
import { Eyebrow, InlineCta } from "./Shared";

const nurseryPhases = [
  "Research and crop planning",
  "Controlled cultivation",
  "Quality testing and traceability",
  "Distribution and transplant support",
];

export function ProductionInfrastructure() {
  return (
    <section className="bg-white px-6 py-20 text-ink lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <div className="border-t border-ink/10 pt-6">
            <Eyebrow>Production infrastructure</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] text-forest-deep">
              The 17-acre smart nursery is the quality-control center of the company.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
              Agaate's nursery model replaces risky direct sowing with controlled germination,
              bio-boosted roots, standardized protocols, in-house trials, and traceability before
              seedlings ever reach a farmer's field.
            </p>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-[#DDE7E1] bg-[#DDE7E1]">
            {nurseryPhases.map((phase, index) => (
              <div key={phase} className="grid grid-cols-[72px_1fr] bg-[#F9FBF8]">
                <div className="flex items-center justify-center border-r border-[#DDE7E1] font-jet text-xs text-terracotta">
                  0{index + 1}
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <span className="font-semibold text-forest-deep">{phase}</span>
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-forest" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <InlineCta href="/services/nursery">Inspect nursery model</InlineCta>
            <InlineCta href="/contact" variant="light">
              Book facility visit
            </InlineCta>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-lg border border-[#DDE7E1] bg-bone">
            <img
              src={nurseryImg}
              alt="Agaate controlled nursery infrastructure"
              className="h-[360px] w-full object-cover md:h-[560px]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#10261F]/90 to-transparent p-6 text-cream md:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <div className="font-serif text-3xl text-white">90-98%</div>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">
                    Target germination and survival range from the Bio-Boosted model.
                  </p>
                </div>
                <div>
                  <div className="font-serif text-3xl text-white">30-50%</div>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">
                    Seed waste reduction versus traditional direct sowing.
                  </p>
                </div>
                <div>
                  <div className="font-serif text-3xl text-white">15-30%</div>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">
                    Yield improvement potential when the full system is followed.
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
