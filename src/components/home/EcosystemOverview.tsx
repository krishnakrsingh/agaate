import { ArrowRight, MessageCircle, Route, ShoppingBag, Sprout } from "lucide-react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";

const farmerPaths = [
  {
    icon: MessageCircle,
    title: "Ask before you spend",
    text: "Send crop photos, symptoms, or planning questions and get practical advice from real agronomists.",
    href: "#agaate-app",
  },
  {
    icon: ShoppingBag,
    title: "Buy the right input",
    text: "Find seeds, bio-inputs, irrigation, mulching, tools, and crop support material from trusted suppliers.",
    href: "#kisaan-mall",
  },
  {
    icon: Sprout,
    title: "Start with stronger roots",
    text: "Use Bio-Boosted nursery plants and see crop practices tested live at the Agri Park.",
    href: "#agri-park",
  },
];

const journey = [
  "Seed selection",
  "Bio-Boosted nursery",
  "Land preparation",
  "Crop advisory",
  "Fertigation",
  "Preventive care",
  "Harvest",
  "Market linkage",
];

export default function EcosystemOverview() {
  const sectionRef = useHomeChapterReveal();

  return (
    <section
      ref={sectionRef}
      id="start-here"
      className="relative overflow-hidden bg-[#f7f4ea] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div
          data-home-reveal
          className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end bg-white/40 rounded-3xl p-8 md:p-12 shadow-sm border border-white"
        >
          <div>
            <p className="font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-[#5d7d37]">
              Start here
            </p>
            <h2 className="font-display mt-5 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-tight text-[#143d31] md:text-5xl lg:text-6xl">
              Farming support that begins before the seed touches soil.
            </h2>
          </div>

          <div className="border-l-2 border-[#143d31]/10 pl-6 md:pl-10">
            <p className="font-sans max-w-2xl text-lg leading-relaxed text-[#42594c] md:text-xl font-normal">
              Agaate gives farmers one connected place to ask an agronomist, buy genuine farm
              inputs, use Bio-Boosted nursery plants, and learn modern practices at the Agri Park.
              The page now follows that exact decision journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold tracking-wide text-[#143d31] uppercase">
              <span className="font-jet border border-white/60 px-4 py-2 bg-white/80 rounded-full shadow-sm">
                1000+ farmers connected
              </span>
              <span className="font-jet border border-white/60 px-4 py-2 bg-white/80 rounded-full shadow-sm">
                500+ agri-input SKUs
              </span>
              <span className="font-jet border border-white/60 px-4 py-2 bg-white/80 rounded-full shadow-sm">
                17-acre smart nursery
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {farmerPaths.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.href}
                data-home-reveal
                className="group flex min-h-[260px] flex-col justify-between rounded-3xl bg-white p-8 md:p-10 shadow-sm border border-[#143d31]/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#143d31]/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f7ef] transition-colors group-hover:bg-[#e4edcc]">
                      <Icon className="h-6 w-6 text-[#476f2d]" strokeWidth={1.8} />
                    </div>
                    <span className="font-jet text-xs font-bold text-[#143d31]/30 tracking-wider">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-display mt-8 text-2xl font-bold tracking-tight text-[#143d31] md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="font-sans mt-4 max-w-sm text-base leading-relaxed text-[#506353]">
                    {item.text}
                  </p>
                </div>
                <span className="font-sans mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#143d31] transition-transform group-hover:translate-x-1">
                  See how it works
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            );
          })}
        </div>

        <div
          data-home-reveal
          className="mt-14 bg-white/40 rounded-3xl p-8 shadow-sm border border-white"
        >
          <div className="mb-5 flex items-center gap-3 text-[#143d31]">
            <Route className="h-5 w-5" strokeWidth={1.5} />
            <p className="font-jet text-[10px] font-bold uppercase tracking-[0.18em]">
              Seed-to-sale support line
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
            {journey.map((stage) => (
              <div
                key={stage}
                className="flex min-h-24 items-center justify-center rounded-2xl bg-white p-4 text-center text-sm font-semibold leading-5 text-[#143d31] shadow-sm border border-[#143d31]/5 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {stage}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
