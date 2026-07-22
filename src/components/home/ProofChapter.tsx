import testimonialImage from "@/assets/testimonial-1.jpg";
import { Eyebrow } from "./HomeShared";

export default function ProofChapter() {
  return (
    <section
      id="impact"
      className="scroll-mt-20 bg-white px-6 py-24 md:px-10 md:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <Eyebrow>Impact in the field</Eyebrow>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-serif text-[clamp(5.5rem,13vw,13rem)] leading-[0.72] tracking-[-0.085em] text-[#143D31]">
              15,000+
            </p>
            <p className="mt-8 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-[-0.05em] text-[#143D31]">
              acres under association.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[17px] leading-8 text-[#566C5D]">
              The scale only matters because it is grounded in a practical, farmer-first
              relationship—from crop decisions to the systems that support them.
            </p>
          </div>
        </div>
        <div className="mt-20 flex flex-wrap gap-x-12 gap-y-7 border-y border-[#174735]/15 py-8">
          {[
            ["2,000+", "Parivaar farmers"],
            ["500+", "Agri-input SKUs"],
            ["25+", "Trusted partners"],
            ["20+", "Kisaan Sathi on-ground"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-serif text-[2.5rem] leading-none tracking-[-0.05em] text-[#143D31]">
                {value}
              </p>
              <p className="mt-2 font-jet text-[9px] uppercase tracking-[0.14em] text-[#718171]">
                {label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <img
            src={testimonialImage}
            alt="Agaate farmer community member"
            className="aspect-square w-full object-cover lg:col-span-3"
          />
          <blockquote className="lg:col-span-7">
            <p className="font-serif text-[clamp(2rem,3.8vw,4rem)] leading-[1.04] tracking-[-0.05em] text-[#143D31]">
              “Agaate Kisaan Mall is a one-stop shop for agricultural inputs. Everything a farmer
              needs—under one roof, with real advice.”
            </p>
            <footer className="mt-7 text-sm font-semibold text-[#56705D]">
              Pankaj Gupta{" "}
              <span className="font-normal text-[#809083]">· Farmer, Gurugram belt</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
