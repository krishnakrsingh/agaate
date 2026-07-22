import testimonialImage from "@/assets/testimonial-1.jpg";
import { Eyebrow } from "./HomeShared";

export default function ProofChapter() {
  return (
    <section
      id="impact"
      className="scroll-mt-20 bg-white px-6 py-20 md:px-10 md:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left Column: Big Numbers */}
          <div className="lg:col-span-7">
            <Eyebrow>Impact in the field</Eyebrow>
            <p className="mt-8 font-serif text-[clamp(5.5rem,13vw,13rem)] leading-[0.72] tracking-[-0.085em] text-[#143D31]">
              15,000+
            </p>
            <p className="mt-4 lg:mt-8 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-[-0.05em] text-[#143D31]">
              acres under association.
            </p>
          </div>

          {/* Right Column: Text and Stats */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-between pt-2 lg:pt-16">
            <p className="text-[17px] leading-8 text-[#566C5D] max-w-md">
              The scale only matters because it is grounded in a practical, farmer-first
              relationship—from crop decisions to the systems that support them.
            </p>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 mt-14 lg:mt-auto border-t border-[#174735]/15 pt-8">
              {[
                ["2,000+", "Parivaar farmers"],
                ["500+", "Agri-input SKUs"],
                ["25+", "Trusted partners"],
                ["20+", "Kisaan Sathi on-ground"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-serif text-[2.2rem] leading-none tracking-[-0.05em] text-[#143D31]">
                    {value}
                  </p>
                  <p className="mt-3 font-jet text-[9px] uppercase tracking-[0.14em] text-[#718171]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-20 lg:mt-24 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16 border-t border-[#174735]/15 pt-16 lg:pt-20">
          <div className="lg:col-span-3">
            <img
              src={testimonialImage}
              alt="Agaate farmer community member"
              className="aspect-square w-full md:w-1/2 lg:w-full object-cover rounded-sm"
            />
          </div>
          <blockquote className="lg:col-span-8 lg:col-start-5">
            <p className="font-serif text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.05] tracking-[-0.04em] text-[#143D31]">
              “Agaate Kisaan Mall is a one-stop shop for agricultural inputs. Everything a farmer
              needs—under one roof, with real advice.”
            </p>
            <footer className="mt-8 text-sm font-semibold text-[#56705D]">
              Pankaj Gupta{" "}
              <span className="font-normal text-[#809083]">· Farmer, Gurugram belt</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
