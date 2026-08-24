import { ArrowRight, MapPin } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
type LocalizedHeroStat = {
  value: number;
  suffix: string;
  label: string;
  sub: string;
};

type CareersHeroProps = {
  badge: string;
  title: string;
  description: string;
  locationLine: string;
  stats: LocalizedHeroStat[];
};

export function CareersHero({ badge, title, description, locationLine, stats }: CareersHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] text-[#143d31] pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl opacity-30 blur-3xl bg-gradient-to-b from-[#a3e635]/25 via-emerald-500/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-14">
        <div className="max-w-3xl space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5"
          >
            <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              {badge}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#143d31] leading-[1.08]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="font-sans text-base sm:text-lg text-[#4f624f] leading-relaxed max-w-2xl"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <SlideUpPillButton
              href="#open-roles"
              variant="dark"
              size="md"
              label="Explore Open Positions"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("open-roles")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />

            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#5d7d37]">
              <MapPin className="h-4 w-4 text-[#5d7d37] shrink-0" />
              <span>{locationLine}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10 py-6 sm:py-8"
        >
          {stats.map((stat, idx) => (
            <div
              key={`${stat.label}-${idx}`}
              className={`space-y-1 ${
                idx === 0 ? "md:pr-6" : idx === 3 ? "md:pl-6 pt-4 md:pt-0" : "md:px-6 pt-4 md:pt-0"
              }`}
            >
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143d31] tracking-tight">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37]">
                {stat.label}
              </p>
              <p className="font-sans text-xs text-[#4f624f]/80 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
