import { ArrowRight, MessageCircleMore, ShoppingBasket } from "lucide-react";
import { SectionEyebrow } from "./Shared";

export function ProductStoryIntro() {
  return (
    <section className="bg-[#F4F7F0] px-6 py-20 md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 border-t border-[#143D31]/15 pt-7 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionEyebrow>Where Agaate begins</SectionEyebrow>
            <p className="mt-6 max-w-sm text-[17px] leading-7 text-[#486158]">
              The crop journey is long. The decisions inside it are immediate: a leaf changes, a
              crop stage arrives, or an input needs to be bought today.
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-4xl font-serif text-[clamp(2.6rem,5vw,5.15rem)] leading-[0.98] tracking-[-0.045em] text-[#12382D]">
              Agaate turns the moment of{" "}
              <span className="italic text-[#C9693B]">uncertainty</span> into the next right move.
            </h2>
            <p className="mt-7 max-w-2xl text-[17px] leading-7 text-[#486158]">
              First, a farmer gets the right context from an agronomist. Then, they can find the
              right inputs to carry that decision into the field. One connected experience,
              designed around a real crop season.
            </p>
          </div>
        </div>

        {/* Keep the two primary products together here; their full chapters follow below. */}
        <div className="mt-14 overflow-hidden rounded-[1.75rem] border border-[#143D31]/15 bg-white">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <a
              href="#talk-to-agronomist"
              className="group flex items-center justify-between gap-5 p-6 transition-colors hover:bg-[#EAF3E5] md:p-8"
            >
              <div>
                <span className="font-jet text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9693B]">
                  01 / Guidance
                </span>
                <span className="mt-3 block font-serif text-[clamp(1.9rem,3vw,2.7rem)] leading-none tracking-[-0.045em] text-[#12382D]">
                  Talk to Agronomist
                </span>
              </div>
              <MessageCircleMore className="h-6 w-6 shrink-0 text-[#2E6B50] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <div className="relative grid min-h-12 place-items-center border-y border-[#143D31]/12 bg-[#F3F6EF] lg:min-h-full lg:w-20 lg:border-x lg:border-y-0">
              <ArrowRight className="h-5 w-5 rotate-90 text-[#C9693B] lg:rotate-0" />
            </div>
            <a
              href="#kisaan-mall"
              className="group flex items-center justify-between gap-5 p-6 transition-colors hover:bg-[#EAF3E5] md:p-8"
            >
              <div>
                <span className="font-jet text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9693B]">
                  02 / Inputs
                </span>
                <span className="mt-3 block font-serif text-[clamp(1.9rem,3vw,2.7rem)] leading-none tracking-[-0.045em] text-[#12382D]">
                  Kisaan Mall
                </span>
              </div>
              <ShoppingBasket className="h-6 w-6 shrink-0 text-[#2E6B50] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
          <div className="border-t border-[#143D31]/12 bg-[#F7F9F4] px-6 py-3.5 text-center font-jet text-[9px] font-semibold uppercase tracking-[0.18em] text-[#5B7267]">
            Guidance informs the input · the input makes guidance actionable
          </div>
        </div>
      </div>
    </section>
  );
}
