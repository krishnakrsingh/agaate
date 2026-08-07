import { MapPin, ShieldCheck, Star, Users, Building2 } from "lucide-react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import Testimonials from "@/components/ui/testimonials-13";
import testimonialImage from "@/assets/testimonial-1.jpg";
import { cn } from "@/lib/utils";
const proofStats = [
  { value: "15,000+", label: "Acres under association" },
  { value: "2,000+", label: "Agaate Parivaar farmers" },
  { value: "500+", label: "Agri-input products in Kisaan Mall" },
  { value: "200+", label: "Irrigation installations" },
  { value: "20+", label: "Kisan Sathi on-ground members" },
  { value: "25+", label: "Direct manufacturer partners" },
];

const manufacturerBrands = [
  "Bayer CropScience",
  "Syngenta India",
  "UPL Limited",
  "Mahyco Seeds",
  "Netafim Drip",
  "Coromandel International",
];

const testimonials = [
  {
    quote:
      "Agaate Kisan Mall is a one-stop shop for authentic agricultural inputs directly from manufacturers.",
    name: "Pankaj Gupta",
    detail: "Verified Farmer · Karnal, Haryana",
    image: testimonialImage,
    stars: 5,
  },
  {
    quote:
      "A farm to experience — multiple farming technologies, seed varieties, nursery, and best practices all in one place.",
    name: "Abhay Ranjan",
    detail: "Agaate Parivaar Member · Gurugram",
    image: null,
    stars: 5,
  },
];

export default function ProofChapter() {
  const sectionRef = useHomeChapterReveal();

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative scroll-mt-28 overflow-hidden bg-[#eaf0df] px-5 py-16 text-[#143d31] md:px-10 md:py-24"
    >
      {/* Top rule */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#143d31]/10" />

      <div className="mx-auto max-w-7xl space-y-16">
        {/* ---------------------------------------------------- */}
        {/* SUB-SECTION 1: IMPACT NUMBERS & SCALE */}
        {/* ---------------------------------------------------- */}
        <div data-home-reveal className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-5 h-[1px] bg-[#5d7d37]" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                  01 · Impact Scale
                </p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
                Proof on the ground.{" "}
                <span className="font-serif italic font-normal text-[#5d7d37]">
                  The numbers show our reach.
                </span>
              </h2>
            </div>
            <div>
              <p className="font-sans max-w-3xl text-sm md:text-base leading-relaxed text-[#4b5f51] font-normal">
                Agaate has enough operational scale to give farmers genuine confidence. A large
                associated farm network, a growing Parivaar community, on-ground Kisan Sathi
                members, and direct manufacturer supply — concentrated in the Gurugram and NCR
                farming belt.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#143d31]/12 px-3.5 py-1.5 text-xs font-bold text-[#143d31] shadow-xs">
                <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" strokeWidth={2} />
                Operating across Gurugram, Haryana, and NCR farming belt
              </div>
            </div>
          </div>

          {/* Stats Grid - Unified Editorial Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 lg:divide-x divide-[#143d31]/10 rounded-3xl bg-white/70 backdrop-blur-xl border border-[#143d31]/10 shadow-xs overflow-hidden">
            {proofStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={cn(
                  "p-6 sm:p-8 transition-colors hover:bg-white",
                  idx > 0 && idx % 3 !== 0 && "md:border-l border-[#143d31]/10",
                  idx > 0 && idx % 2 !== 0 && "max-md:border-l border-[#143d31]/10",
                  (idx === 3 || idx === 4 || idx === 5) &&
                    "md:border-t lg:border-t-0 border-[#143d31]/10",
                )}
              >
                <div className="flex flex-col justify-between h-full gap-4">
                  <p className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#143d31]">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[10px] font-bold uppercase leading-5 tracking-[0.15em] text-[#5d7d37]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SUB-SECTION 2: DIRECT MANUFACTURER BRAND PARTNERS */}
        {/* ---------------------------------------------------- */}
        <div
          data-home-reveal
          className="rounded-3xl bg-white/80 border border-[#143d31]/12 p-6 md:p-8 shadow-xs space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#143d31]/10">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#5d7d37]" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                02 · Verified Input Supply Network
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#143d31] px-3 py-1 text-[10px] font-mono font-bold text-[#a3e635] uppercase">
              <ShieldCheck className="h-3 w-3" /> 100% Genuine Partner Supply
            </span>
          </div>

          <p className="text-xs md:text-sm font-medium text-[#4b5f51]">
            Direct supply partnerships with India's leading certified agri-input manufacturers — no
            middlemen, no duplicates.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {manufacturerBrands.map((brand) => (
              <span
                key={brand}
                className="rounded-xl bg-white px-4 py-2 text-xs font-extrabold text-[#143d31] border border-[#143d31]/12 shadow-2xs hover:border-[#5d7d37] hover:bg-[#eaf0df]/50 transition-all"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SUB-SECTION 3: VERIFIED FARMER TESTIMONIALS */}
        {/* ---------------------------------------------------- */}
        <div data-home-reveal className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-[1px] bg-[#5d7d37]" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              03 · Farmer Reviews & Testimonials
            </p>
          </div>

          {/* New Animated Shadcn Testimonials Component */}
          <div className="-mx-5 md:-mx-10 mt-6">
            <Testimonials />
          </div>
        </div>
      </div>
    </section>
  );
}
