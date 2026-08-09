import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Compass,
  Droplets,
  Factory,
  FileCheck2,
  Globe,
  GripHorizontal,
  Info,
  Leaf,
  MapPin,
  Phone,
  Quote,
  Shield,
  ShieldCheck,
  Sprout,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  corporateFacts,
  guarantees,
  locations,
  marqueePhrases,
  milestones,
  pillars,
  stats,
  team,
  TeamMember,
} from "@/components/about/data";
import {
  AnimatedHeadline,
  CountUp,
  EASE,
  MagneticButton,
  Marquee,
  motion,
  PageHero,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/components/common/motion";

export const Route = createFileRoute("/{-$locale}/about")({
  component: About,
});

const DOT_GRID =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5";

function Orb({
  tint,
  className,
  duration = 10,
}: {
  tint: "moss" | "terracotta" | "forest";
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ""}`}
      style={{
        background: `radial-gradient(circle, var(--color-${tint}) 0%, transparent 70%)`,
      }}
      animate={{ y: [0, -22, 0], x: [0, 14, 0], scale: [1, 1.1, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// Interactive Executive Bio Lightbox Modal
function LeaderBioModal({
  leader,
  onClose,
}: {
  leader: TeamMember | null;
  onClose: () => void;
}) {
  if (!leader) return null;
  const Icon = leader.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
          className="absolute inset-0 bg-forest-deep/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
        />
        <motion.div
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2.5rem] border border-border bg-cream p-6 shadow-2xl md:p-10"
          initial={{ opacity: 0, scale: 0.88, y: 36 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-forest/70 shadow-sm transition-colors hover:bg-forest/10 hover:text-forest-deep"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-6 text-left">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-forest/15 bg-forest/10 text-forest shadow-inner">
                <Icon className="h-7 w-7" />
              </span>
              <div>
                <span className="inline-block rounded-full bg-terracotta/15 px-3 py-1 font-jet text-[9px] font-bold uppercase tracking-widest text-terracotta">
                  {leader.tag}
                </span>
                <h3 className="mt-1 font-serif text-3xl font-bold text-forest-deep md:text-4xl">
                  {leader.name}
                </h3>
                <p className="font-jet text-xs font-semibold text-forest/80">
                  {leader.role} · <span className="italic text-terracotta">{leader.focus}</span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="font-jet text-[10px] font-bold uppercase tracking-widest text-forest">
                Executive Biography
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-forest/80 md:text-base">
                {leader.bio}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-jet text-[10px] font-bold uppercase tracking-widest text-moss">
                Key Strategic Accomplishments
              </h4>
              <div className="grid gap-2">
                {leader.keyAch.map((ach) => (
                  <div
                    key={ach}
                    className="flex items-start gap-3 rounded-xl border border-border/80 bg-bone/60 p-3.5 text-xs font-medium text-forest-deep"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-forest/20 bg-forest/5 p-5">
              <div className="flex items-center gap-2 font-jet text-[10px] font-bold uppercase tracking-widest text-forest">
                <BookOpen className="h-4 w-4 text-forest" />
                Featured Agronomy Publication
              </div>
              <p className="mt-2 font-serif text-base italic leading-relaxed text-forest-deep">
                "{leader.pub}"
              </p>
            </div>

            <blockquote className="border-l-4 border-terracotta bg-terracotta/5 p-4 rounded-r-xl italic text-xs leading-relaxed text-forest-deep">
              <Quote className="mb-1 h-4 w-4 rotate-180 text-terracotta" />
              "{leader.quote}"
            </blockquote>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl bg-forest-deep px-6 py-3 font-jet text-xs font-bold uppercase tracking-wider text-cream shadow-md transition-colors hover:bg-forest"
              >
                Close Bio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function About() {
  const [activeLeader, setActiveLeader] = useState<TeamMember | null>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);

  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />

      {/* Hero */}
      <PageHero
        eyebrow="Corporate Governance & Brand Mission"
        title={
          <>
            Begin With Strong Roots — <span className="italic text-terracotta">Growing Better Tomorrow.</span>
          </>
        }
        description="Agaate empowers Indian farmers with science-backed, Bio-Boosted nursery models, precision agronomy inputs, and direct buyback market linkage — replacing risky seed sowing with guaranteed survival and economic growth."
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-2 font-jet text-[10px] font-bold uppercase tracking-wider text-forest-deep">
            <ShieldCheck className="h-4 w-4 text-forest" />
            Anzix Farm Technologies Pvt Ltd
          </span>
          <span className="flex items-center gap-2 rounded-full border border-terracotta/20 bg-terracotta/5 px-4 py-2 font-jet text-[10px] font-bold uppercase tracking-wider text-terracotta">
            <Sprout className="h-4 w-4 text-terracotta" />
            17-Acre Smart Nursery Infrastructure
          </span>
          <span className="flex items-center gap-2 rounded-full border border-moss/20 bg-moss/5 px-4 py-2 font-jet text-[10px] font-bold uppercase tracking-wider text-moss">
            <Users className="h-4 w-4 text-moss" />
            2,000+ Parivaar Farmers
          </span>
        </div>
      </PageHero>

      {/* Brand maxim marquee */}
      <Marquee duration={28} className="border-b border-border bg-forest-deep py-4">
        <span className="flex items-center gap-12">
          {marqueePhrases.map((phrase) => (
            <span key={phrase} className="flex items-center gap-12">
              <span className="font-serif text-2xl italic text-cream md:text-3xl">{phrase}</span>
              <Sprout className="h-5 w-5 text-moss" />
            </span>
          ))}
        </span>
      </Marquee>

      {/* Quantitative Impact Counter Matrix */}
      <section className="relative overflow-hidden border-b border-border bg-bone py-20 px-6 lg:px-12">
        <div className={DOT_GRID} />
        <Orb tint="moss" className="right-0 top-0 h-72 w-72 opacity-20" duration={9} />
        <Orb tint="terracotta" className="bottom-0 left-0 h-64 w-64 opacity-15" duration={12} />
        
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Quantitative Milestones & Operational Scale"
            title="Scale backed by empirical farm data."
            description="Our physical nursery capacity, associated acreage, direct manufacturer partnerships, and advisor teams create an unbroken closed-loop ecosystem."
            align="center"
          />

          <Stagger
            className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6"
            stagger={0.1}
          >
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.label} variant="scale-up">
                  <TiltCard
                    maxTilt={8}
                    className="flex h-full flex-col justify-between rounded-[2rem] border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:border-forest/30 hover:shadow-md"
                  >
                    <div>
                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10 text-forest">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CountUp
                        to={s.to}
                        suffix={s.suffix}
                        className="block font-serif text-3xl font-bold tracking-tight text-forest-deep lg:text-4xl"
                      />
                      <p className="mt-2 font-serif text-xs font-bold leading-snug text-forest-deep">
                        {s.label}
                      </p>
                    </div>
                    <p className="mt-3 font-jet text-[9px] font-medium uppercase tracking-wider text-forest/55">
                      {s.sub}
                    </p>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Three Non-Negotiable Pillars Cards */}
      <section className="relative overflow-hidden py-24 px-6 lg:px-12">
        <Orb tint="forest" className="-left-20 top-24 h-80 w-80 opacity-10" duration={11} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Corporate Philosophy"
            title="Three Non-Negotiable Pillars."
            description="The core foundation guiding every seed sown, every advisory issued, and every buyback contract signed."
          />

          <Stagger className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.15}>
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.id} variant="flip">
                  <TiltCard
                    maxTilt={10}
                    className="group relative flex h-full flex-col justify-between rounded-[2.5rem] border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:border-forest hover:shadow-xl"
                  >
                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-forest/15 bg-forest/5 text-forest transition-transform duration-300 group-hover:scale-110 group-hover:bg-forest group-hover:text-cream">
                          <Icon className="h-7 w-7" />
                        </span>
                        <span className="rounded-full bg-terracotta/10 px-3 py-1 font-jet text-[9px] font-bold uppercase tracking-wider text-terracotta">
                          {p.badge}
                        </span>
                      </div>

                      <h3 className="font-serif text-3xl font-bold text-forest-deep">
                        {p.title}
                      </h3>
                      <p className="mt-1 font-jet text-xs font-semibold text-terracotta">
                        {p.tagline}
                      </p>

                      <p className="mt-4 text-sm leading-relaxed text-forest/75">
                        {p.desc}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-border pt-4">
                      <span className="flex items-center gap-2 font-jet text-[10px] font-bold uppercase tracking-wider text-moss">
                        <CheckCircle2 className="h-4 w-4" />
                        {p.highlight}
                      </span>
                    </div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Paradigm Shift: Direct Sowing vs Bio-Boosted Nursery */}
      <section className="relative overflow-hidden border-y border-border bg-bone py-24 px-6 lg:px-12">
        <div className={DOT_GRID} />
        <Orb tint="terracotta" className="-right-16 top-10 h-72 w-72 opacity-10" duration={10} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Paradigm Shift in Agriculture"
            title="Risky Direct Sowing vs. Agaate Bio-Boosted Nursery."
            description="Quantifiable proof showing why starting with strong seedling roots transforms farmer profitability."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <Reveal variant="fade-up" delay={0.05}>
              <div className="h-full rounded-[2rem] border border-border bg-card p-8 text-left">
                <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                  Metric 01 · Survival Rate
                </span>
                <h4 className="mt-2 font-serif text-2xl font-bold text-forest-deep">
                  90% – 98% Base Survival
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-forest/70">
                  Direct seed sowing yields only 50-70% survival due to weather shock, soil crusting, and early pests. Agaate Bio-Boosted nursery saplings guarantee up to 98% field survival.
                </p>
                <div className="mt-6 flex items-center justify-between rounded-xl bg-forest/5 p-3.5 font-jet text-xs font-bold text-forest-deep">
                  <span>Net Survival Lift:</span>
                  <span className="text-moss">+40% Increase</span>
                </div>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={0.15}>
              <div className="h-full rounded-[2rem] border border-border bg-card p-8 text-left">
                <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                  Metric 02 · Seed Waste & Cost
                </span>
                <h4 className="mt-2 font-serif text-2xl font-bold text-forest-deep">
                  Near Zero Seed Waste
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-forest/70">
                  Expensive hybrid seeds sowed directly into open fields often rot or get washed away. Our climate chambers eliminate 30-50% wasted seed expense for the farmer.
                </p>
                <div className="mt-6 flex items-center justify-between rounded-xl bg-forest/5 p-3.5 font-jet text-xs font-bold text-forest-deep">
                  <span>Seed Savings:</span>
                  <span className="text-moss">30% – 50% Saved</span>
                </div>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={0.25}>
              <div className="h-full rounded-[2rem] border border-border bg-card p-8 text-left">
                <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                  Metric 03 · Final Market Yield
                </span>
                <h4 className="mt-2 font-serif text-2xl font-bold text-forest-deep">
                  15% – 30% Yield Boost
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-forest/70">
                  Vigorous initial root architecture leads to faster canopy development, reduced chemical dependency, and uniform export-grade vegetable harvests.
                </p>
                <div className="mt-6 flex items-center justify-between rounded-xl bg-forest/5 p-3.5 font-jet text-xs font-bold text-forest-deep">
                  <span>Harvest Output:</span>
                  <span className="text-moss">15% – 30% Higher Yield</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership & Management Executive Roster Cards */}
      <section className="relative overflow-hidden py-24 px-6 lg:px-12">
        <Orb tint="moss" className="-right-16 top-24 h-72 w-72 opacity-10" duration={12} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Operational Leadership Roster"
            title="Meet the Minds Behind Agaate."
            description="Click any executive profile card to launch their interactive Bio Lightbox Modal with research publications, background, and key achievements."
          />

          <Stagger
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5"
            stagger={0.1}
          >
            {team.map((member) => {
              const Icon = member.icon;
              return (
                <StaggerItem key={member.id} variant="scale-up">
                  <motion.button
                    type="button"
                    onClick={() => setActiveLeader(member)}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex min-h-[310px] w-full flex-col justify-between rounded-[2rem] border border-border bg-card p-6 text-left shadow-sm transition-all duration-300 hover:border-forest hover:shadow-xl"
                  >
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-forest/10 bg-forest/5 text-forest transition-colors group-hover:bg-forest group-hover:text-cream">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="rounded-full bg-forest/5 px-2.5 py-1 font-jet text-[8px] font-bold uppercase tracking-wider text-forest">
                          View Bio
                        </span>
                      </div>

                      <span className="font-jet block text-[9px] font-bold uppercase tracking-wider text-terracotta">
                        {member.tag}
                      </span>
                      <h3 className="mt-1 font-serif text-2xl font-bold text-forest-deep group-hover:text-forest">
                        {member.name}
                      </h3>
                      <p className="mt-1 font-jet text-[10px] font-semibold text-forest-deep">
                        {member.role}
                      </p>
                      <p className="mt-2 text-[11px] leading-relaxed text-forest/70 line-clamp-3">
                        {member.focus}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-3 text-[10px] font-bold text-forest">
                      <span>Interactive Bio</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.button>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Verified Corporate Governance & Legal Compliance Section */}
      <section className="relative overflow-hidden border-y border-border bg-bone py-24 px-6 lg:px-12">
        <div className={DOT_GRID} />
        <Orb tint="forest" className="-left-20 top-16 h-72 w-72 opacity-10" duration={12} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <Reveal variant="fade-right" className="lg:col-span-5">
              <div>
                <p className="label-mono mb-4">Verified Corporate Governance</p>
                <AnimatedHeadline
                  as="h2"
                  text="Anzix Farm Technologies Private Limited."
                  highlight={(w) => w.startsWith("Anzix")}
                  className="font-serif text-4xl font-bold tracking-tight text-forest-deep md:text-5xl"
                />
                <p className="mt-5 text-base leading-relaxed text-forest/75">
                  Agaate operates under its registered corporate entity, <strong>Anzix Farm Technologies Private Limited</strong>. Formally incorporated on May 28, 2024 under the Registrar of Companies (RoC Delhi), operating out of Haryana.
                </p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-forest/15 bg-card p-3.5">
                    <FileCheck2 className="h-5 w-5 text-forest shrink-0" />
                    <div>
                      <span className="font-jet text-[9px] font-bold uppercase tracking-wider text-forest/60 block">CIN Number</span>
                      <span className="font-jet text-xs font-bold text-forest-deep">U46200HR2024PTC121982</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-forest/15 bg-card p-3.5">
                    <Calendar className="h-5 w-5 text-forest shrink-0" />
                    <div>
                      <span className="font-jet text-[9px] font-bold uppercase tracking-wider text-forest/60 block">Incorporation Date</span>
                      <span className="font-jet text-xs font-bold text-forest-deep">May 28, 2024 (RoC Delhi / Haryana Jurisdiction)</span>
                    </div>
                  </div>
                </div>

                {/* Transparency Note: Platform GMV vs Corporate MCA Filings */}
                <div className="mt-8 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-6 text-left">
                  <div className="flex items-center gap-2 font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                    <Info className="h-4 w-4" />
                    Financial Context: Platform GMV vs MCA Filings
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-forest/80">
                    <strong>Corporate MCA Filings:</strong> Anzix Farm Technologies Private Limited recorded <strong>₹96.9 Lakhs</strong> in revenue for the partial fiscal year ending March 31, 2025 following its formal incorporation in May 2024.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-forest/80">
                    <strong>Platform GMV Metric:</strong> The <strong>₹10 Cr+</strong> milestone represents consolidated Platform Gross Merchandise Value (GMV) and managed crop value processed across Agaate's partner network, Kisan Mall SKUs, direct buyback contracts, and nursery saplings nationwide.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.1} className="lg:col-span-7">
              <div className="rounded-[3rem] border border-border bg-card p-8 md:p-10 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-forest-deep mb-6">
                  Verified Legal Compliance Matrix
                </h3>
                <Stagger stagger={0.08}>
                  {corporateFacts.map((fact) => (
                    <StaggerItem
                      key={fact.label}
                      variant="fade-left"
                      className="border-b border-border/70 py-3.5 last:border-b-0"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-jet text-[10px] font-bold uppercase tracking-wider text-terracotta">
                          {fact.label}
                        </span>
                        <span className="font-jet text-xs font-semibold text-forest-deep text-left sm:text-right">
                          {fact.value}
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>

                <div className="mt-8 flex items-center gap-3 rounded-2xl bg-forest/5 px-5 py-4 ring-1 ring-forest/10">
                  <Building2 className="h-6 w-6 shrink-0 text-forest" />
                  <p className="text-xs leading-relaxed text-forest-deep">
                    Registered Office: I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Milestones — Interactive Drag Strip */}
      <section className="relative overflow-hidden py-24 px-6 lg:px-12">
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Our Journey"
            title="How We Built the Ecosystem."
            description="From a 1-acre experimental nursery plot in 2024 to a 17-acre Smart Nursery, 15,000+ associated acres, and India's first Agri Park in 2026."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {milestones.map((m, idx) => (
              <Reveal key={m.year} variant="fade-up" delay={idx * 0.1}>
                <div
                  className={`group relative h-full rounded-[2.5rem] border p-8 transition-colors ${
                    activeMilestone === idx
                      ? "border-forest bg-forest text-cream shadow-lg"
                      : "border-border bg-card text-forest-deep hover:border-forest/30"
                  }`}
                  onClick={() => setActiveMilestone(idx)}
                >
                  <span className={`font-serif text-5xl font-bold ${activeMilestone === idx ? "text-terracotta" : "text-forest/30"}`}>
                    {m.year}
                  </span>
                  <h4 className={`mt-3 font-serif text-2xl font-bold ${activeMilestone === idx ? "text-cream" : "text-forest-deep"}`}>
                    {m.title}
                  </h4>
                  <p className={`mt-3 text-xs leading-relaxed ${activeMilestone === idx ? "text-cream/80" : "text-forest/70"}`}>
                    {m.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Footprint / Facilities */}
      <section className="relative overflow-hidden border-t border-border bg-bone py-24 px-6 lg:px-12">
        <div className={DOT_GRID} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Physical Infrastructure Footprint"
            title="Three Homes, One Closed Ecosystem."
            description="From nursery climate beds to retail experience counters to registered corporate office — anchored in Gurugram, Haryana."
          />
          
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.14}>
            {locations.map((loc, idx) => (
              <StaggerItem
                key={loc.name}
                variant={idx === 0 ? "fade-left" : idx === 1 ? "blur-in" : "fade-right"}
              >
                <div className="group flex h-full flex-col justify-between rounded-[2rem] border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-forest/30 hover:shadow-md">
                  <div>
                    <span className="relative mb-6 flex h-12 w-12 items-center justify-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-forest/15" />
                      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-forest text-cream shadow-sm">
                        <MapPin className="h-5 w-5" />
                      </span>
                    </span>
                    <span className="font-jet text-[10px] font-bold uppercase tracking-wider text-terracotta">{loc.tag}</span>
                    <h3 className="mt-2 font-serif text-2xl font-bold text-forest-deep">
                      {loc.name}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-forest/75">{loc.address}</p>
                  </div>
                  <p className="mt-6 border-t border-border pt-3 font-jet text-[10px] font-medium text-forest/50">
                    {loc.sub}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28 px-6 lg:px-12 bg-forest-deep text-cream">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-cream)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10" />
        <Orb tint="moss" className="-left-16 top-10 h-64 w-64 opacity-20" duration={9} />
        <Orb tint="terracotta" className="-right-16 bottom-0 h-64 w-64 opacity-15" duration={12} />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Reveal variant="flip">
            <p className="font-jet text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta mb-4">
              Start Your Journey with Agaate
            </p>
            <AnimatedHeadline
              as="h2"
              text="From Seed to Sale, We Stand With the Farmer."
              highlight={(w) => w === "Farmer."}
              className="font-serif text-4xl font-bold tracking-tight text-cream md:text-6xl"
            />
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/75">
              Connect directly with our agronomists, reserve bio-boosted nursery saplings, or explore wholesale partner inputs across Haryana.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton as="a" href="tel:8350085005" strength={0.35}>
                <span className="inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 font-jet text-xs font-bold uppercase tracking-[0.18em] text-forest-deep shadow-xl transition-colors hover:bg-bone">
                  <Phone className="h-4 w-4 text-forest" />
                  Call: +91 8350085005
                </span>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LeaderBioModal
        leader={activeLeader}
        onClose={() => setActiveLeader(null)}
      />

      <Footer />
    </main>
  );
}
