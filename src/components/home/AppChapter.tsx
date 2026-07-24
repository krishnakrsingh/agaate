import { Check } from "lucide-react";
import advisorImage from "@/assets/about-farmer-advisor.png";
import { Eyebrow, ImagePlaceholder, TextAction } from "./HomeShared";

export default function AppChapter() {
  return (
    <section
      id="agaate-app"
      className="scroll-mt-20 bg-[#F2F5EE] px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Integrated Lead Statement Banner */}
        <div className="mb-20 grid gap-8 border-b border-[#143D31]/15 pb-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <Eyebrow>Where Agaate becomes useful</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <h2 className="max-w-4xl font-serif text-[clamp(2.5rem,4.8vw,5.2rem)] leading-[0.95] tracking-[-0.05em] text-[#143D31]">
              A crop journey has many stages. But a farmer lives it one{" "}
              <span className="italic text-[#5D8D53]">question</span> at a time.
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#566C5D]">
              A leaf changes. A crop stage arrives. A purchase needs to happen today. Agaate exists
              for that exact moment between uncertainty and action.
            </p>
          </div>
        </div>

        {/* App & Agronomist Advisory Content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>The Agaate app</Eyebrow>
            <h3 className="mt-6 font-serif text-[clamp(2.5rem,4.5vw,4.8rem)] leading-[0.95] tracking-[-0.05em] text-[#143D31]">
              Start with the question in your field.
            </h3>
            <p className="mt-6 max-w-sm text-[16px] leading-7 text-[#566C5D]">
              The Agaate app gives the farmer a direct way to ask, track, and act through the crop
              season—without turning the experience into another complicated tool.
            </p>
            <div className="mt-8">
              <TextAction href="#start-journey">Get the Agaate app</TextAction>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ImagePlaceholder
              label="Agaate app screen"
              detail="Replace this space with a real crop-question, advisory, or crop-plan screen from the Agaate app."
              className="min-h-[510px]"
            />
            <p className="mt-4 font-jet text-[9px] uppercase tracking-[0.14em] text-[#718171]">
              A real app screen belongs here—not a fabricated dashboard.
            </p>
          </div>

          <div className="lg:col-span-3 lg:pt-32">
            <img
              src={advisorImage}
              alt="Farmer using Agaate advisory"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="mt-7 space-y-5">
              {[
                "Share a crop question or photo.",
                "Speak with an agronomist who understands the stage.",
                "Carry the next action back to the field.",
              ].map((line) => (
                <p key={line} className="flex gap-3 text-sm leading-6 text-[#465F4E]">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#4F8553]" />
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
