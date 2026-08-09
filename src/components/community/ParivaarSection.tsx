import { motion } from "framer-motion";
import { Handshake, Users } from "lucide-react";
import {
  AnimatedHeadline,
  CountUp,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/components/common/motion";
import { PILLARS } from "./community-data";

export default function ParivaarSection() {
  return (
    <section id="parivaar" className="relative overflow-hidden py-24">
      <motion.div
        className="pointer-events-none absolute -right-32 top-24 h-[420px] w-[420px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)" }}
        animate={{ y: [0, 26, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          eyebrow="The Parivaar"
          title={
            <>
              A farmer community, <span className="italic text-terracotta">2,000+ strong.</span>
            </>
          }
          description="The core Agaate community — farmers supported through the entire vegetable crop journey, from seed to sale, with guidance, inputs and market linkage."
        />

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-2" stagger={0.15}>
          <StaggerItem className="h-full">
            <TiltCard className="relative h-full rounded-[2rem] border border-border bg-card p-8 shadow-sm">
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                className="flex h-full flex-col gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-deep text-moss">
                  <Users className="h-6 w-6" />
                </div>
                <div className="font-serif text-7xl font-bold tracking-tight text-forest-deep">
                  <CountUp to={2000} suffix="+" duration={2.2} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest-deep">Parivaar Farmers</h3>
                <p className="text-sm leading-relaxed text-forest/70">
                  The Parivaar is Agaate's farming family — 2,000+ farmers getting daily guidance,
                  certified inputs and a guaranteed buyback market for their produce.
                </p>
              </motion.div>
            </TiltCard>
          </StaggerItem>
          <StaggerItem className="h-full">
            <TiltCard className="relative h-full rounded-[2rem] border border-border bg-card p-8 shadow-sm">
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                className="flex h-full flex-col gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta text-cream">
                  <Handshake className="h-6 w-6" />
                </div>
                <div className="font-serif text-7xl font-bold tracking-tight text-forest-deep">
                  <CountUp to={20} suffix="+" duration={2.2} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest-deep">
                  Kisan Sathi on Ground
                </h3>
                <p className="text-sm leading-relaxed text-forest/70">
                  A 20+ member on-ground team visiting fields, delivering inputs, and connecting
                  every farmer directly to Agaate's agronomists and experts.
                </p>
              </motion.div>
            </TiltCard>
          </StaggerItem>
        </Stagger>

        <Reveal className="mt-16 text-center">
          <AnimatedHeadline
            as="p"
            text="From advice to action — Agaate stays with you at every step."
            className="mx-auto max-w-3xl font-serif text-2xl font-bold leading-snug text-forest-deep md:text-3xl"
            highlight={(word) => word === "action" || word === "step."}
          />
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <p className="font-jet text-[10px] font-semibold uppercase tracking-[0.18em] text-moss">
              Farmer Enablement Pillars
            </p>
          </Reveal>
          <Stagger className="mt-6 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.title} className="h-full">
                  <TiltCard className="h-full rounded-[2rem] border border-border bg-bone p-7">
                    <motion.div
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex h-full flex-col gap-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-forest/15 bg-card text-forest">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="font-jet text-[10px] font-bold tracking-widest text-terracotta">
                          {pillar.number}
                        </span>
                        <h3 className="mt-1 font-serif text-2xl font-bold text-forest-deep">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-forest/70">{pillar.text}</p>
                    </motion.div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
