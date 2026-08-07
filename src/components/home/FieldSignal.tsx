import { useHomeChapterReveal } from "./useHomeChapterReveal";

const painPoints = [
  {
    number: "01",
    headline: "Something is wrong with the crop.",
    body: "Yellowing leaves. Wilting at the tips. Spots that appeared overnight. The problem is clear — but the cause, and the right fix, is not.",
  },
  {
    number: "02",
    headline: "Which input is actually right?",
    body: "Hundreds of packets on the shelf. Similar names, overlapping claims. No clear way to know which one fits your crop, your soil, your stage.",
  },
  {
    number: "03",
    headline: "Planning alone, without a guide.",
    body: "Every season starts with big decisions — seed choice, sowing dates, fertigation plan, harvest timing. Most farmers make them without expert input and hope for the best.",
  },
];

export default function FieldSignal() {
  const sectionRef = useHomeChapterReveal();

  return (
    <section
      ref={sectionRef}
      id="start-here"
      className="relative scroll-mt-20 overflow-hidden bg-[#f3f1e7] px-5 py-14 md:px-10 md:py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#173d30]/15" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div data-home-reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1px] bg-[#5d7d37]/40" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                The farmer's reality
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              Every farmer faces moments where{" "}
              <span className="font-serif italic font-normal text-[#5d7d37]">
                guesswork costs money.
              </span>
            </h2>
          </div>
          <p className="font-sans max-w-2xl border-l border-[#143d31]/20 pl-6 text-sm md:text-base leading-relaxed text-[#4b5f51] md:pl-8 font-normal">
            Farming in India is already hard. Unpredictable weather, fluctuating prices, disease
            pressure. What makes it harder is facing critical decisions — alone, without expert
            backup, and with no room for error.
          </p>
        </div>

        {/* Three pain points */}
        <div
          data-home-reveal
          className="mt-12 grid gap-px border-y border-[#143d31]/12 bg-[#143d31]/12 overflow-hidden md:grid-cols-3"
        >
          {painPoints.map((point) => (
            <div
              key={point.number}
              className="flex flex-col gap-4 bg-[#f3f1e7] px-7 py-8 md:px-8 md:py-10"
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#143d31]/40">
                {point.number}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-semibold leading-snug tracking-tight text-[#143d31]">
                {point.headline}
              </h3>
              <p className="font-sans text-xs md:text-sm leading-relaxed text-[#536253] font-normal">
                {point.body}
              </p>
            </div>
          ))}
        </div>

        {/* Pull-quote + bridge */}
        <div data-home-reveal className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="rounded-2xl bg-[#143d31] px-7 py-6 md:px-9 md:py-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#b7cf79]">
              Field reality
            </p>
            <p className="font-sans mt-3 text-lg md:text-xl font-medium leading-relaxed text-white/90">
              Most Indian farmers make 3 or more critical crop decisions every season without access
              to any expert guidance.
            </p>
          </div>
          <div className="max-w-sm lg:text-right">
            <p className="font-display text-base md:text-lg font-bold leading-relaxed text-[#143d31]">
              Agaate was built to fix exactly this.
            </p>
            <p className="font-sans mt-1 text-xs md:text-sm leading-relaxed text-[#65766b]">
              From crop advice to the right input — seed to sale, with you at every step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
