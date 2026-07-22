import { Eyebrow, TextAction } from "./HomeShared";

export default function BeyondChapter() {
  return (
    <section className="bg-[#DDEBCF] px-6 py-24 md:px-10 md:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Eyebrow>When a farm needs more than the basics</Eyebrow>
        <h2 className="mt-6 max-w-4xl font-serif text-[clamp(3rem,5.5vw,5.9rem)] leading-[0.91] tracking-[-0.06em] text-[#143D31]">
          Agaate grows with the ambition of the farm.
        </h2>
        <div className="mt-16">
          {[
            [
              "Farm technology",
              "See the field sooner with sensors, crop data, drone scouting, and farm management tools.",
              "/services/farm-tech",
            ],
            [
              "Carbon credit program",
              "Turn eligible sustainable practices into a second source of farm income.",
              "/services/carbon-credits",
            ],
            [
              "Big-farm setup",
              "Plan, build, and operate commercial vegetable farms from bare land to first harvest.",
              "/services/big-farm-setup",
            ],
          ].map(([title, copy, href], index) => (
            <article
              key={title}
              className="grid gap-5 border-t border-[#174735]/18 py-8 md:grid-cols-[7rem_1.2fr_.8fr] md:items-end md:gap-10"
            >
              <span className="font-jet text-[10px] text-[#5D8D53]">0{index + 1}</span>
              <div>
                <h3 className="font-serif text-[clamp(2rem,3.5vw,3.6rem)] leading-none tracking-[-0.045em] text-[#143D31]">
                  {title}
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#52685A]">{copy}</p>
              </div>
              <TextAction href={href}>Learn more</TextAction>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
