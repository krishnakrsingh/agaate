import agroParkImage from "@/assets/agro-park.jpg";
import { Eyebrow, TextAction } from "./HomeShared";

const zones = [
  "Seed",
  "Nursery",
  "Irrigation",
  "Nutrition",
  "Protection",
  "Tech & drone",
  "Training",
  "Market",
];

export default function AgriParkChapter() {
  return (
    <section
      id="agri-park"
      className="scroll-mt-20 bg-white px-6 py-20 md:px-10 md:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Eyebrow>Agaate Agri Park</Eyebrow>
              <h2 className="mt-6 font-serif text-[clamp(3rem,5.2vw,5.6rem)] leading-[0.91] tracking-[-0.06em] text-[#143D31]">
                A farm made for seeing before believing.
              </h2>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8 border-t border-[#174735]/15 pt-6">
                {zones.map((zone, index) => (
                  <div
                    key={zone}
                    className="flex items-baseline justify-between border-b border-[#174735]/10 pb-2.5"
                  >
                    <span className="font-serif text-[1.15rem] tracking-[-0.02em] text-[#143D31]">
                      {zone}
                    </span>
                    <span className="font-jet text-[9px] text-[#5D8D53]">0{index + 1}</span>
                  </div>
                ))}
              </div>
              <TextAction href="/agri-park">Plan a visit to Agri Park</TextAction>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <img
              src={agroParkImage}
              alt="Agaate Agri Park"
              className="aspect-[16/9] w-full object-cover"
            />
            <p className="mt-8 max-w-2xl text-[17px] leading-8 text-[#566C5D]">
              Agaate brings seed, nursery, irrigation, nutrition, protection, technology, training,
              and market access onto one living farm—so farmers can judge solutions on real crops,
              not catalogues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
