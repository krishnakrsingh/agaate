import { Camera, ClipboardCheck, MessageCircleMore, ShoppingBasket } from "lucide-react";
import { SectionEyebrow } from "./Shared";

const flywheel = [
  {
    number: "01",
    title: "A farmer sees a signal",
    text: "A crop photo, field question, or upcoming crop stage starts the conversation.",
    icon: Camera,
  },
  {
    number: "02",
    title: "An agronomist makes it useful",
    text: "Guidance becomes a clear next action, fitted to the crop and crop stage.",
    icon: MessageCircleMore,
  },
  {
    number: "03",
    title: "Kisaan Mall makes it actionable",
    text: "The needed inputs are easy to source in one trusted place — not guessed at.",
    icon: ShoppingBasket,
  },
  {
    number: "04",
    title: "The next decision gets smarter",
    text: "Field activity and crop progress create continuity through the whole season.",
    icon: ClipboardCheck,
  },
];

export function ConnectedModel() {
  return (
    <section
      id="operating-model"
      className="scroll-mt-24 overflow-hidden bg-[#E9F1E3] px-6 py-20 md:px-10 md:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 border-t border-[#143D31]/15 pt-7 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <SectionEyebrow>The connected model</SectionEyebrow>
            <h2 className="mt-6 max-w-2xl font-serif text-[clamp(2.7rem,4.8vw,5rem)] leading-[0.98] tracking-[-0.05em] text-[#12382D]">
              Useful for farmers. <span className="italic text-[#C9693B]">Compounding</span> for
              the ecosystem.
            </h2>
          </div>
          <p className="max-w-md text-[17px] leading-7 text-[#486158] lg:col-span-4 lg:col-start-9">
            Guidance and commerce are not separate transactions. They form a practical service
            loop that stays close to the crop across the season.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {flywheel.map(({ number, title, text, icon: Icon }) => (
            <article
              key={number}
              className="relative rounded-[1.6rem] border border-[#143D31]/15 bg-[#F9FBF6] p-6"
            >
              <div className="flex items-start justify-between">
                <span className="font-jet text-[11px] font-bold text-[#C9693B]">{number}</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#DCECD5] text-[#2E6B50]">
                  <Icon className="h-4.5 w-4.5" />
                </span>
              </div>
              <h3 className="mt-14 font-serif text-[1.8rem] leading-[1.03] tracking-[-0.04em] text-[#12382D]">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#5B7267]">{text}</p>
              <div className="mt-7 h-px w-10 bg-[#12382D]/20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
