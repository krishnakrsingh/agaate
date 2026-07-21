import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Droplets,
  FileCheck2,
  FlaskConical,
  PackageCheck,
  ScanLine,
  Sprout,
} from "lucide-react";
import agroParkImage from "@/assets/agro-park.jpg";
import fertiliserImage from "@/assets/product-fertiliser.jpg";
import irrigationImage from "@/assets/product-irrigation.jpg";
import marketJourneyImage from "@/assets/journey-09-market.png";
import seedsImage from "@/assets/product-seeds.jpg";
import toolsImage from "@/assets/product-tools.jpg";
import { SectionEyebrow } from "./Shared";

const mallCategories = [
  { name: "Seeds & saplings", image: seedsImage, icon: Sprout },
  { name: "Nutrition", image: fertiliserImage, icon: FlaskConical },
  { name: "Irrigation", image: irrigationImage, icon: ScanLine },
  { name: "Tools & support", image: toolsImage, icon: PackageCheck },
];

export function KisaanMall() {
  return (
    <>
      <section className="bg-[#E5EFE0] px-6 py-16 md:px-10 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <SectionEyebrow>Then make it possible</SectionEyebrow>
          </div>
          <h2 className="max-w-4xl font-serif text-[clamp(2.25rem,4vw,4.2rem)] leading-[1] tracking-[-0.05em] text-[#12382D] lg:col-span-7">
            Good advice cannot end with a farmer having to{" "}
            <span className="italic text-[#C9693B]">guess the next input.</span>
          </h2>
          <div className="flex items-center gap-3 border-l border-[#12382D]/15 pl-5 text-sm leading-6 text-[#486158] lg:col-span-2">
            <PackageCheck className="h-5 w-5 shrink-0 text-[#2E6B50]" />
            That is the hand-off Kisaan Mall is built for.
          </div>
        </div>
      </section>

      <section
        id="kisaan-mall"
        className="scroll-mt-24 bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 border-t border-[#143D31]/15 pt-7 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-6">
              <SectionEyebrow>Core offering / 02</SectionEyebrow>
              <h2 className="mt-6 max-w-2xl font-serif text-[clamp(3rem,5.2vw,5.4rem)] leading-[0.94] tracking-[-0.055em] text-[#12382D]">
                Kisaan <span className="italic text-[#C9693B]">Mall.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-[17px] leading-7 text-[#486158]">
                A trusted place to source the seeds, nutrition, irrigation, and farm support that a
                crop plan actually calls for.
              </p>
            </div>
          </div>

          <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-[#143D31]/15 bg-[#F1F5EC] lg:grid-cols-12">
            <div className="relative min-h-[300px] overflow-hidden lg:col-span-5 lg:min-h-[425px]">
              <img
                src={agroParkImage}
                alt="Agaate's agricultural innovation landscape"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12382D]/75 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-[#12382D]/65 px-3 py-1.5 font-jet text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                From field insight to field-ready input
              </span>
            </div>
            <div className="flex flex-col justify-between p-7 md:p-10 lg:col-span-7 lg:p-12">
              <div>
                <span className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9693B]">
                  One trusted counter
                </span>
                <h3 className="mt-4 max-w-2xl font-serif text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.03] tracking-[-0.045em] text-[#12382D]">
                  Advice should never end with “now find the right product.”
                </h3>
                <p className="mt-5 max-w-xl text-[16px] leading-7 text-[#486158]">
                  Kisaan Mall makes the next purchase more reliable — with essential agri inputs,
                  crop-specific selection, and practical farm support all in one place.
                </p>
              </div>
              <div className="mt-9 flex flex-col gap-4 border-t border-[#143D31]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-sm text-[#38574B]">
                  <BadgeCheck className="h-5 w-5 text-[#387255]" />
                  500+ products across the crop journey
                </div>
                <Link
                  to="/services/kisaan-mall"
                  className="group inline-flex items-center gap-2 font-semibold text-[#12382D] hover:text-[#C9693B]"
                >
                  Explore Kisaan Mall
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8F3] px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 border-t border-[#143D31]/15 pt-7 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <SectionEyebrow>Choose by crop need, not guesswork</SectionEyebrow>
              <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2.6rem,4.8vw,4.8rem)] leading-[0.98] tracking-[-0.05em] text-[#12382D]">
                Everything a crop plan needs, gathered in one{" "}
                <span className="italic text-[#C9693B]">place.</span>
              </h2>
            </div>
            <p className="max-w-sm text-[17px] leading-7 text-[#486158] lg:col-span-4 lg:col-start-9">
              Kisaan Mall brings the core categories of the farm together, so the next purchase is
              easier to identify and easier to trust.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mallCategories.map(({ name, image, icon: Icon }) => (
              <div
                key={name}
                className="group relative min-h-[360px] overflow-hidden rounded-[1.75rem] bg-[#143D31]"
              >
                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C261D]/90 via-[#0C261D]/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-white">
                  <div>
                    <Icon className="mb-8 h-5 w-5 text-[#C2F19D]" />
                    <h3 className="font-serif text-[1.8rem] tracking-[-0.04em]">{name}</h3>
                    <p className="mt-2 text-sm text-white/65">
                      Selected to support the crop journey.
                    </p>
                  </div>
                  <ArrowUpRight className="mb-1 h-5 w-5 text-white/70 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 border-t border-[#143D31]/15 pt-7 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionEyebrow>Built around the field plan</SectionEyebrow>
              <h2 className="mt-6 max-w-xl font-serif text-[clamp(2.6rem,4.8vw,4.9rem)] leading-[0.98] tracking-[-0.05em] text-[#12382D]">
                Not just a shelf of products. A better way to prepare for the{" "}
                <span className="italic text-[#C9693B]">next stage.</span>
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-7 text-[#486158]">
                Kisaan Mall helps farmers connect what they are growing, what the crop needs now,
                and the inputs that support that next action.
              </p>
              <Link
                to="/services/kisaan-mall"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#12382D] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Build an input plan
                <ArrowRight className="h-4 w-4 text-[#B8F08F] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-[#12382D] p-5 text-white sm:p-7 lg:col-span-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <p className="font-jet text-[9px] uppercase tracking-[0.18em] text-[#B8F08F]">
                    Crop kit preview
                  </p>
                  <h3 className="mt-1 font-serif text-2xl">Plan for this field</h3>
                </div>
                <span className="rounded-full border border-white/20 px-2.5 py-1 font-jet text-[9px] uppercase tracking-[0.12em] text-white/65">
                  Tomato
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  [CalendarDays, "Set the crop stage", "Start with what the field needs now."],
                  [
                    FileCheck2,
                    "Choose the input category",
                    "Seeds, nutrition, protection, or irrigation.",
                  ],
                  [Droplets, "Prepare the next field task", "Make the purchase part of the plan."],
                ].map(([Icon, title, text], index) => {
                  const ItemIcon = Icon as typeof CalendarDays;
                  return (
                    <div
                      key={title as string}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#B8F08F] text-[#12382D]">
                        <ItemIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <span className="font-jet text-[9px] text-[#B8F08F]">0{index + 1}</span>
                        <h4 className="mt-0.5 text-sm font-bold text-white">{title as string}</h4>
                        <p className="mt-1 text-xs leading-5 text-white/60">{text as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#E9F1E3] lg:col-span-3">
              <img
                src={marketJourneyImage}
                alt="Fresh produce prepared for market"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12382D]/85 via-[#12382D]/10 to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 font-serif text-2xl leading-[1.04] tracking-[-0.04em] text-white">
                The right input has a job to do in the crop’s larger journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
