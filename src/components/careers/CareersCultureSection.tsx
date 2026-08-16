import { motion } from "framer-motion";
import { AnimatedHeadline, SectionHeader, Stagger, StaggerItem } from "@/components/common/motion";
import { CULTURE_CARDS } from "./careers-data";

export function CareersCultureSection() {
  return (
    <section className="relative">
      <SectionHeader
        eyebrow="LIFE & CULTURE AT AGAATE"
        title={
          <AnimatedHeadline
            text="Where Agronomic Science Meets Operational Rigour"
            highlight={(w) => w === "Agronomic" || w === "Rigour"}
          />
        }
        description="We believe lasting agricultural impact requires living among the fields, testing hardware under 45°C sun, and aligning our incentives directly with farmer success."
        align="center"
        className="mx-auto"
      />

      <Stagger className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3" stagger={0.15}>
        {CULTURE_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <StaggerItem key={card.title} variant="scale-up">
              <div className="group h-full rounded-3xl border border-forest/10 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-forest/30 hover:shadow-xl">
                <motion.div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-deep text-cream shadow-sm"
                  whileHover={{ rotate: -8, scale: 1.1 }}
                >
                  <Icon className="h-7 w-7" />
                </motion.div>
                <h3 className="font-serif text-2xl font-bold text-forest-deep">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-forest/75">{card.desc}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
