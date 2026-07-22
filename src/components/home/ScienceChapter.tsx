import { Eyebrow } from "./HomeShared";

const comparison = [
  ["Germination & survival", "50–70%", "90–98%"],
  ["Seed waste", "High baseline", "Near zero"],
  ["Chemical dependency", "High baseline", "Significantly reduced"],
  ["Overall crop yield", "Baseline", "15–30% higher potential"],
];

export default function ScienceChapter() {
  return (
    <section
      id="farm-science"
      className="scroll-mt-20 bg-[#F7F4EC] px-6 py-24 md:px-10 md:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>Farm science</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-5xl font-serif text-[clamp(3rem,5.8vw,6.2rem)] leading-[0.9] tracking-[-0.06em] text-[#143D31]">
              Before we recommend the next input, we care about how the crop{" "}
              <span className="italic text-[#5D8D53]">begins.</span>
            </h2>
            <p className="mt-10 max-w-xl text-[17px] leading-8 text-[#566C5D]">
              Agaate’s Bio-Boosted nursery model is not a separate product story. It is the reason
              an advisory can start with more confidence in the first place.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-[1.55fr_1fr_1fr] gap-5 pb-4 font-jet text-[9px] uppercase tracking-[0.14em] text-[#718171]">
            <span>What changes</span>
            <span>Direct sowing</span>
            <span>Agaate Bio-Boosted</span>
          </div>
          {comparison.map(([metric, traditional, agaate]) => (
            <div
              key={metric}
              className="grid grid-cols-[1.55fr_1fr_1fr] gap-5 border-t border-[#174735]/16 py-7 md:py-9"
            >
              <span className="font-serif text-[clamp(1.35rem,2.4vw,2rem)] leading-none tracking-[-0.035em] text-[#143D31]">
                {metric}
              </span>
              <span className="self-end text-[13px] leading-5 text-[#617266]">{traditional}</span>
              <span className="self-end text-[13px] leading-5 font-semibold text-[#397244]">
                {agaate}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xs leading-5 text-[#718171]">
          Figures reflect the Agaate source material and should be confirmed by the business before
          publication.
        </p>
      </div>
    </section>
  );
}
