import { ArrowRight } from "@phosphor-icons/react";
import {
  CountUp,
  MagneticButton,
  Marquee,
  PageHero,
  Stagger,
  StaggerItem,
} from "@/components/common/motion";
import { CAREER_STATS } from "./careers-data";

export function CareersHero() {
  const marqueeItems = [
    "Kisan Sathi Field Agronomists",
    "Smart Nursery Managers",
    "IoT Systems Engineers",
    "Supply Chain Leads",
    "AI Vision Researchers",
    "Agri-Input Territory Managers",
  ];

  return (
    <>
      <PageHero
        eyebrow="Careers & Campus Outreach at Agaate"
        title={
          <>
            Build the Future of Indian Agriculture —{" "}
            <span className="italic text-terracotta">On the Ground.</span>
          </>
        }
        description="We are agronomists, hardware engineers, and supply chain builders committed to transforming farmer livelihoods across India through science-backed, high-yield agriculture."
      >
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <MagneticButton as="a" href="#open-roles">
            <span className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-forest-deep px-8 py-4 text-sm font-bold text-cream shadow-xl shadow-forest/20 transition-colors hover:bg-forest">
              Explore Open Roles
              <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>
          <span className="font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-forest/70">
            Delhi NCR · Gurugram · Field Operations
          </span>
        </div>
      </PageHero>

      <div className="border-y border-border bg-forest-deep py-3 text-cream">
        <Marquee duration={30}>
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="mx-4 inline-flex items-center gap-8 font-jet text-[11px] font-bold uppercase tracking-[0.22em] text-cream/90"
            >
              {item}
              <span className="text-moss">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto mt-12 w-full max-w-7xl px-6 lg:px-12">
        <Stagger
          className="grid grid-cols-2 gap-6 rounded-3xl border border-forest/10 bg-bone px-8 py-8 shadow-sm sm:grid-cols-4"
          stagger={0.1}
        >
          {CAREER_STATS.map((s) => (
            <StaggerItem key={s.label} variant="fade-up" className="text-center">
              <p className="font-serif text-4xl font-bold text-forest-deep md:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 font-jet text-xs font-bold uppercase tracking-wider text-forest-deep">
                {s.label}
              </p>
              <p className="font-mono text-[10px] text-forest/50">{s.sub}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </>
  );
}
