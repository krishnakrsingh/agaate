import { CountUp, Parallax, Reveal, Stagger, StaggerItem } from "@/components/common/motion";
import { SCALE_STATS } from "./data";

export function ScaleBand() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-forest-deep px-6 py-16 text-cream shadow-xl shadow-forest-deep/10 md:px-14 md:py-20">
      <Parallax offset={120} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:26px_26px]" />
      </Parallax>
      <div className="absolute -right-24 top-1/3 h-72 w-72">
        <Parallax offset={-60} className="h-full w-full">
          <div className="h-full w-full rounded-full bg-terracotta/30 blur-3xl" />
        </Parallax>
      </div>
      <div className="relative z-10">
        <Reveal variant="clip-up">
          <p className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-cream/60">
            Scale on the ground
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
            A network big enough to command{" "}
            <span className="italic text-moss">premium buyer rates.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            Thousands of Parivaar farmers across tens of thousands of acres, backed by direct market
            partners — concentrated in the Gurugram and NCR farming belt.
          </p>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4" stagger={0.12}>
          {SCALE_STATS.map((s) => (
            <StaggerItem key={s.label} variant="scale-up">
              <div className="border-l-2 border-moss/50 pl-5">
                <p className="font-serif text-5xl font-bold tracking-tight text-cream md:text-6xl">
                  <CountUp to={s.to} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} duration={2} />
                </p>
                <p className="mt-2 font-jet text-[10px] font-bold uppercase leading-5 tracking-[0.16em] text-cream/60">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
