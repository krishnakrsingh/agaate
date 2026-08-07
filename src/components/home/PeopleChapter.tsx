import { useHomeChapterReveal } from "./useHomeChapterReveal";

const pillars = [
  {
    number: "01",
    title: "Practical Research",
    text: "Every recommendation we make is grounded in field-tested, actionable science — not theory. If it does not work in a real farm, it does not come from Agaate.",
  },
  {
    number: "02",
    title: "Quality Inputs",
    text: "Seeds, biologicals, irrigation systems, and crop protection — all sourced from certified, verified partners. No duplicates. No unknowns.",
  },
  {
    number: "03",
    title: "Farmer-First Thinking",
    text: "Every product, every advisory, every service is designed around one question: does this make the farmer's season better and safer?",
  },
];

const team = [
  { name: "Ankit Rawat", role: "Founder & CEO" },
  { name: "Kuldeep Singh Singhar", role: "Head of Operations" },
  { name: "Abhay Ranjan", role: "Chief of Staff" },
  { name: "Chanchala Shukla", role: "Agronomist" },
  { name: "Ravi Kumar", role: "Data & Strategy" },
];

export default function PeopleChapter() {
  const sectionRef = useHomeChapterReveal();

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative scroll-mt-20 overflow-hidden bg-[#fffdf4] px-5 py-14 md:px-10 md:py-20"
    >
      {/* Top rule */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#173d30]/10" />

      <div className="mx-auto max-w-7xl">
        {/* Header row */}
        <div data-home-reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1px] bg-[#9a5a2c]/40" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a5a2c]">
                Who we are
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              Built for the farmer.{" "}
              <span className="font-serif italic font-normal text-[#9a5a2c]">Always.</span>
            </h2>
          </div>
          <div className="max-w-2xl border-l border-[#143d31]/15 pl-6 md:pl-8">
            <p className="font-sans text-sm md:text-base leading-relaxed text-[#4b5f51] font-normal">
              Agaate stands with farmers through the entire vegetable crop journey — from seed to
              harvest. We bring together trusted agri companies, modern technology, and on-ground
              support so farmers can grow with confidence, reduce risk, and make better decisions at
              every step.
            </p>
          </div>
        </div>

        {/* Founder quote — Single Horizontal Row (Quote Left, Author Right) */}
        <div
          data-home-reveal
          className="mt-8 rounded-2xl bg-[#eaf0df] p-6 md:p-8 border border-[#143d31]/12 shadow-xs"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Quote Text */}
            <blockquote className="font-serif text-lg md:text-xl lg:text-2xl font-normal italic leading-relaxed text-[#143d31] flex-1">
              "We built Agaate with a simple belief — that every farmer deserves the right guidance,
              the right tools, and the right support, so that their hard work never goes to loss."
            </blockquote>

            {/* Right: Author Info */}
            <div className="flex items-center gap-3.5 shrink-0 lg:pl-6 lg:border-l lg:border-[#143d31]/15">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#143d31] font-display font-extrabold text-xs border border-[#143d31]/15 shadow-xs shrink-0">
                AR
              </div>
              <div className="text-left">
                <p className="font-display text-sm font-extrabold text-[#143d31] leading-tight whitespace-nowrap">
                  Ankit Rawat
                </p>
                <p className="font-sans text-xs font-semibold text-[#5d7d37] mt-0.5 whitespace-nowrap">
                  Founder & CEO, Agaate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Three pillars */}
        <div data-home-reveal className="mt-12">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#143d31]/50">
            Our three commitments
          </p>
          <div className="mt-4 grid gap-px border border-[#143d31]/10 bg-[#143d31]/10 overflow-hidden rounded-2xl md:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.number} className="flex flex-col gap-3 bg-[#fffdf4] p-7 md:p-9">
                <span className="font-mono text-[11px] font-bold text-[#143d31]/40 tracking-[0.16em]">
                  {pillar.number}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#143d31]">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs md:text-sm leading-relaxed text-[#536253] font-normal">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team strip */}
        <div
          data-home-reveal
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0 sm:divide-x sm:divide-[#143d31]/15"
        >
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col gap-0.5 sm:px-6 first:sm:pl-0 last:sm:pr-0"
            >
              <p className="font-display text-sm font-bold text-[#143d31]">{member.name}</p>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#143d31]/50">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
