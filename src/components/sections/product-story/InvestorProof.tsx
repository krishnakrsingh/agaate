import { Leaf, PackageCheck, Store } from "lucide-react";
import advisorImage from "@/assets/about-farmer-advisor.png";
import { SectionEyebrow } from "./Shared";

const scale = [
  { value: "15,000+", label: "acres under association" },
  { value: "2,000+", label: "Parivaar farmers" },
  { value: "25+", label: "direct supply partners" },
  { value: "500+", label: "input SKUs" },
];

export function InvestorProof() {
  return (
    <section
      id="investor-snapshot"
      className="scroll-mt-24 bg-[#112F25] px-6 py-20 text-[#F8F7F0] md:px-10 md:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 border-t border-white/15 pt-7 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionEyebrow dark>Built with field proximity</SectionEyebrow>
            <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2.8rem,4.9vw,5.1rem)] leading-[0.97] tracking-[-0.055em]">
              A real agricultural network, not a distant{" "}
              <span className="italic text-[#B8F08F]">marketplace.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[17px] leading-7 text-white/65 lg:col-span-4 lg:col-start-9">
            Agaate brings farm support, expert context, and input availability closer together —
            an operating model designed around repeatable crop seasons.
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-white/15 lg:grid-cols-12">
          <div className="relative min-h-[340px] lg:col-span-5 lg:min-h-[490px]">
            <img
              src={advisorImage}
              alt="Farmer and agronomist in the field"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#112F25]/80 via-transparent to-transparent" />
            <p className="absolute bottom-7 left-7 right-7 max-w-xs font-serif text-2xl leading-[1.05] tracking-[-0.03em] text-white">
              Field intelligence is only valuable when it reaches a farmer in time.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2">
              {scale.map(({ value, label }) => (
                <div
                  key={label}
                  className="border-b border-white/12 p-7 sm:p-9 [&:nth-child(odd)]:sm:border-r [&:nth-child(odd)]:sm:border-white/12"
                >
                  <p className="font-serif text-5xl tracking-[-0.05em] text-[#B8F08F]">{value}</p>
                  <p className="mt-3 max-w-[150px] text-sm leading-5 text-white/65">{label}</p>
                </div>
              ))}
            </div>
            <div className="p-7 sm:p-9">
              <p className="font-jet text-[10px] font-bold uppercase tracking-[0.19em] text-[#B8F08F]">
                What holds it together
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {[
                  [Leaf, "Practical research", "Field learning made usable."],
                  [PackageCheck, "Quality inputs", "The right input for the decision."],
                  [Store, "Farmer-first access", "Support available through the season."],
                ].map(([Icon, title, text]) => {
                  const ItemIcon = Icon as typeof Leaf;
                  return (
                    <div key={title as string}>
                      <ItemIcon className="h-5 w-5 text-[#B8F08F]" />
                      <h3 className="mt-3 text-sm font-bold text-white">{title as string}</h3>
                      <p className="mt-1 text-xs leading-5 text-white/55">{text as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
