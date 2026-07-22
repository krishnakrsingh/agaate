import { Eyebrow } from "./HomeShared";

export default function BridgeChapter() {
  return (
    <section className="bg-white px-6 py-28 md:px-10 md:py-40 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-3">
          <Eyebrow>Where Agaate becomes useful</Eyebrow>
        </div>
        <div className="lg:col-span-8">
          <h2 className="max-w-5xl font-serif text-[clamp(3rem,6.2vw,6.8rem)] leading-[0.9] tracking-[-0.06em] text-[#143D31]">
            A crop journey has many stages. But a farmer lives it one{" "}
            <span className="italic text-[#5D8D53]">question</span> at a time.
          </h2>
          <p className="mt-10 max-w-xl text-[17px] leading-8 text-[#566C5D]">
            A leaf changes. A crop stage arrives. A purchase needs to happen today. Agaate exists
            for that exact moment between uncertainty and action.
          </p>
        </div>
      </div>
    </section>
  );
}
