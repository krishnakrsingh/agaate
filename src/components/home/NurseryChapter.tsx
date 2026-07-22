import nurseryImage from "@/assets/hero-plant.jpg";
import { Eyebrow, TextAction } from "./HomeShared";

export default function NurseryChapter() {
  return (
    <section
      id="smart-nursery"
      className="scroll-mt-20 bg-[#143D31] px-6 py-20 text-white md:px-10 md:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow inverse>17-acre Smart Nursery</Eyebrow>
            <h2 className="mt-6 max-w-xl font-serif text-[clamp(3rem,5.2vw,5.6rem)] leading-[0.91] tracking-[-0.06em]">
              The science behind a stronger start.
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-7 text-white/68">
              The nursery turns research, cultivation, quality checks, and distribution into one
              visible beginning for the crop.
            </p>
          </div>
          <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <img
              src={nurseryImage}
              alt="Young plants growing in a nursery"
              className="aspect-[4/3] w-full object-cover"
            />
            <p className="mt-4 font-jet text-[9px] uppercase tracking-[0.15em] text-white/45">
              Agaate Smart Nursery · Kukrola, Gurugram
            </p>
          </div>
        </div>
        <div className="mt-16 grid gap-y-10 border-t border-white/18 pt-8 md:grid-cols-2 md:gap-x-16 lg:grid-cols-4">
          {[
            [
              "01",
              "Research & selection",
              "Test varieties and approaches before they reach a farmer’s field.",
            ],
            [
              "02",
              "Cultivation",
              "Give each seedling a more controlled and supported early stage.",
            ],
            [
              "03",
              "Quality testing",
              "Use standard checks to make batches easier to assess and trace.",
            ],
            ["04", "Distribution", "Move crop-ready saplings to the farm at the right time."],
          ].map(([number, title, copy]) => (
            <div key={number}>
              <span className="font-jet text-[10px] text-[#DCECCB]">{number}</span>
              <h3 className="mt-7 font-serif text-[1.8rem] leading-none tracking-[-0.04em]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <TextAction href="/services/nursery" inverse>
            Explore the nursery
          </TextAction>
        </div>
      </div>
    </section>
  );
}
