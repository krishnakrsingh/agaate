import { MapPin } from "lucide-react";
import seedsImage from "@/assets/product-seeds.jpg";
import { Eyebrow, ImagePlaceholder, TextAction } from "./HomeShared";

export default function MallChapter() {
  return (
    <section
      id="kisaan-mall"
      className="scroll-mt-20 bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <Eyebrow>Agaate Kisaan Mall</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-5xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9] tracking-[-0.06em] text-[#143D31]">
              When the answer is an input, know exactly where to{" "}
              <span className="italic text-[#5D8D53]">go.</span>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <ImagePlaceholder
              label="Kisaan Mall store image"
              detail="Replace with a wide photograph of the Bhora Kalan store, shelves, and farmers choosing inputs."
              className="min-h-[460px]"
            />
          </div>
          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <p className="max-w-md text-[17px] leading-8 text-[#566C5D]">
              Kisaan Mall is the action layer of the Agaate relationship: a trusted physical counter
              and a growing marketplace for what the crop plan calls for next.
            </p>
            <div className="mt-12 border-y border-[#174735]/15">
              {[
                "Seeds & Bio-Boosted saplings",
                "Nutrition & biological inputs",
                "Irrigation & farm infrastructure",
                "Protection, tools & field support",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-baseline justify-between gap-6 border-b border-[#174735]/15 py-5 last:border-b-0"
                >
                  <span className="font-serif text-[1.65rem] leading-none tracking-[-0.035em] text-[#143D31]">
                    {item}
                  </span>
                  <span className="font-jet text-[10px] text-[#5D8D53]">0{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <TextAction href="/services/kisaan-mall">Explore Kisaan Mall</TextAction>
              <span className="flex items-center gap-2 text-sm text-[#566C5D]">
                <MapPin className="h-4 w-4 text-[#4F8553]" /> Bhora Kalan, Gurugram
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid overflow-hidden bg-[#DDEBCF] md:grid-cols-[1fr_1.65fr]">
          <div className="p-7 md:p-10">
            <Eyebrow>One connected action</Eyebrow>
            <p className="mt-12 font-serif text-[clamp(2rem,3.5vw,3.4rem)] leading-[0.98] tracking-[-0.045em] text-[#143D31]">
              Advice tells you what the crop needs. Kisaan Mall helps you get it.
            </p>
          </div>
          <img
            src={seedsImage}
            alt="Agaate agricultural input products"
            className="h-full min-h-64 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
