import { motion } from "framer-motion";
import { AnimatedHeadline, SectionHeader, Stagger, StaggerItem } from "@/components/common/motion";
import { creditFacts, qualifyingPractices } from "./data";

export function CarbonPracticesGrid() {
  return (
    <section className="relative">
      <SectionHeader
        eyebrow="What Are Carbon Credits"
        title={
          <AnimatedHeadline
            text="Earn Extra Income by Farming Sustainably"
            highlight={(w) => w === "Sustainably"}
          />
        }
        description="Good farming already saves carbon. Agaate helps you measure, verify, and monetise it — turning sustainable practices into a brand-new income stream, with no extra land required."
        align="center"
        className="mx-auto"
      />

      <Stagger
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.12}
      >
        {creditFacts.map((fact) => (
          <StaggerItem key={fact.title} variant="scale-up">
            <div className="group h-full rounded-3xl border border-forest/10 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-forest/25 hover:shadow-xl">
              <motion.div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-deep text-cream shadow-sm"
                whileHover={{ rotate: -8, scale: 1.1 }}
              >
                <fact.icon className="h-6 w-6" strokeWidth={1.8} />
              </motion.div>
              <h3 className="font-serif text-xl font-bold leading-snug text-forest-deep">
                {fact.title}
              </h3>
              <p className="mt-2.5 text-xs leading-relaxed text-forest/70">{fact.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Qualifying Practices Section */}
      <div className="mt-24">
        <SectionHeader
          eyebrow="QUALIFYING PRACTICES"
          title="Practices That Earn You Verified Credits"
          description="Every sustainable agricultural practice on your land has a calculated carbon sequestration value."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {qualifyingPractices.map((prac) => {
            const Icon = prac.icon;
            return (
              <div
                key={prac.name}
                className="rounded-3xl border border-forest/10 bg-card p-6 shadow-sm transition-all hover:border-forest/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase text-moss">
                    {prac.tag}
                  </span>
                  <Icon className="h-6 w-6 text-forest" />
                </div>
                <h4 className="mt-4 font-serif text-xl font-bold text-forest-deep">{prac.name}</h4>
                <p className="mt-2 text-xs leading-relaxed text-forest/70">{prac.benefit}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
