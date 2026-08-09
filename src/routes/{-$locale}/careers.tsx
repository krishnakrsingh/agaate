import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Database,
  FileText,
  GraduationCap,
  Handshake,
  Leaf,
  MapPin,
  Microscope,
  PenLine,
  Send,
  ShieldCheck,
  Smartphone,
  Sprout,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExtendedJobPosition, jobs } from "@/data/careers-data";
import ApplicationModal from "@/components/careers/ApplicationModal";
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

export const Route = createFileRoute("/{-$locale}/careers")({
  component: Careers,
});

type Filter = "All" | "Agronomy" | "Corporate" | "Retail";
const FILTERS: Filter[] = ["All", "Agronomy", "Corporate", "Retail"];

const cultureCards = [
  {
    title: "On-Field Groundwork",
    desc: "We don't work in high-rise bubble offices. Our engineers spend time testing hardware setups and training growers directly in Haryana fields.",
    icon: Sprout,
  },
  {
    title: "Scientific Rigour",
    desc: "Every intervention is backed by lab soil core assays, satellite analytics, and telemetry logs. We build evidence-based agriculture.",
    icon: Microscope,
  },
  {
    title: "Ecosystem Ownership",
    desc: "Growers trust us. We honor price floors and guarantee container seed delivery cycles, treating farmers as operational partners.",
    icon: Handshake,
  },
];

const campusSkills = [
  { icon: Leaf, label: "Field advisory" },
  { icon: Smartphone, label: "Digital farm tools" },
  { icon: Database, label: "Data collection" },
  { icon: PenLine, label: "Technical content" },
];

const stats = [
  { value: 20, suffix: "+", label: "Kisan Sathi team", sub: "Advisors on the ground" },
  { value: 2000, suffix: "+", label: "Farmers served", sub: "Across the Parivaar" },
  { value: 25, suffix: "+", label: "Agri partners", sub: "Direct manufacturer supply" },
  { value: 15000, suffix: "+", label: "Acres associated", sub: "Land under cultivation" },
];

// Role Detail Drawer Modal
function RoleDetailDrawer({
  role,
  onClose,
  onApply,
}: {
  role: ExtendedJobPosition | null;
  onClose: () => void;
  onApply: (role: ExtendedJobPosition) => void;
}) {
  if (!role) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end p-0 md:p-6">
        <motion.div
          className="absolute inset-0 bg-forest-deep/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
        />
        <motion.div
          className="relative h-full max-h-screen w-full max-w-xl overflow-y-auto border-l border-border bg-cream p-6 shadow-2xl md:rounded-[2.5rem] md:border md:p-10"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-forest/70 shadow-sm transition-colors hover:bg-forest/10 hover:text-forest-deep"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-6 text-left pt-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rounded-full bg-forest px-3 py-1 font-jet text-[9px] font-bold uppercase tracking-wider text-cream">
                  {role.departmentCategory}
                </span>
                <span className="rounded-full border border-forest/20 bg-forest/5 px-3 py-1 font-jet text-[9px] font-bold uppercase tracking-wider text-forest">
                  {role.dept}
                </span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-forest-deep md:text-4xl">
                {role.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-4 font-jet text-xs text-forest/60">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-terracotta" /> {role.loc}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-forest" /> {role.type}
                </span>
                {role.experienceLevel && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-moss" /> {role.experienceLevel}
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                Position Overview
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-forest/80">
                {role.desc}
              </p>
            </div>

            {role.responsibilities && role.responsibilities.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-jet text-[10px] font-bold uppercase tracking-widest text-forest">
                  Key Responsibilities
                </h4>
                <div className="space-y-2">
                  {role.responsibilities.map((resp) => (
                    <div
                      key={resp}
                      className="flex items-start gap-3 rounded-xl border border-border/80 bg-bone/60 p-3.5 text-xs text-forest-deep"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-jet text-[10px] font-bold uppercase tracking-widest text-moss">
                Candidate Requirements
              </h4>
              <div className="space-y-2">
                {role.reqs.map((req) => (
                  <div
                    key={req}
                    className="flex items-start gap-3 rounded-xl border border-border/80 bg-card p-3.5 text-xs text-forest-deep"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl border border-border bg-card px-5 py-3 font-jet text-xs font-bold uppercase tracking-wider text-forest/70 hover:text-forest-deep"
              >
                Close Drawer
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onApply(role);
                }}
                className="flex items-center gap-2 rounded-xl bg-forest-deep px-6 py-3 font-jet text-xs font-bold uppercase tracking-wider text-cream shadow-md transition-colors hover:bg-forest"
              >
                <span>Apply for Position</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function Careers() {
  const [selectedJob, setSelectedJob] = useState<ExtendedJobPosition | null>(null);
  const [drawerJob, setDrawerJob] = useState<ExtendedJobPosition | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const visibleJobs = jobs.filter(
    (job) => filter === "All" || job.departmentCategory === filter
  );

  const handleOpenApplication = (job: ExtendedJobPosition) => {
    setSelectedJob(job);
  };

  const focusCategory = (cat: Filter) => {
    setFilter(cat);
    requestAnimationFrame(() => {
      document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <PageHero
        eyebrow="Careers & Campus Outreach at Agaate"
        title={
          <>
            Build the Future of Indian AgTech — <span className="italic text-terracotta">Join the Agaate Mission.</span>
          </>
        }
        description="We are hiring agronomists, farm infrastructure supervisors, retail managers, and remote sensing specialists to modernize cultivation for 2,000+ Parivaar farmers."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { icon: Users, label: "20+ Kisan Sathi Field Advisors" },
            { icon: Building2, label: "Gurugram HQ & 17-Acre Smart Nursery" },
            { icon: GraduationCap, label: "CSAUAT Kanpur Placement Drives" },
          ].map((chip, i) => {
            const Icon = chip.icon;
            return (
              <motion.span
                key={chip.label}
                className="flex items-center gap-2 rounded-full border border-forest/15 bg-cream/80 px-4 py-2 font-jet text-[10px] font-bold uppercase tracking-wider text-forest-deep shadow-sm backdrop-blur-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.1 }}
              >
                <Icon className="h-3.5 w-3.5 text-terracotta" />
                {chip.label}
              </motion.span>
            );
          })}
        </div>
      </PageHero>

      {/* Marquee ticker */}
      <div className="border-b border-border bg-bone">
        <Marquee className="py-4" duration={30}>
          {[
            "Farmer-First Mission",
            "CSAUAT Kanpur Placement Gateway",
            "Begin With Strong Roots",
            "Bio-Boosted Nursery Agronomy",
            "15,000+ Associated Acres",
            "Remote Sensing & IoT Telemetry",
          ].map((t) => (
            <span
              key={t}
              className="flex items-center gap-3 font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-forest/60"
            >
              {t}
              <Leaf className="h-3.5 w-3.5 text-terracotta" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-grow space-y-28 px-6 py-24 lg:px-12">
        {/* Culture & Life at Agaate */}
        <section id="life" className="relative text-left">
          <SectionHeader
            eyebrow="Life at Agaate"
            title="A team that works in the field, not just on paper."
            description="Small teams, real farms, high ownership. The engineers and agronomists who build Agaate are the same people farmers trust on-site."
          />

          <Stagger className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {cultureCards.map((c) => {
              const Icon = c.icon;
              return (
                <StaggerItem key={c.title}>
                  <TiltCard
                    maxTilt={8}
                    className="relative h-full rounded-[2.5rem] border border-border bg-card p-8 text-left shadow-sm transition-all duration-300 hover:border-forest/30 hover:shadow-md"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-forest/10 bg-forest/5 text-forest">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-forest-deep">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-forest/75">{c.desc}</p>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        {/* Campus Outreach & University Placement Gateway */}
        <section className="relative overflow-hidden rounded-[3rem] bg-forest-deep px-6 py-20 text-left md:px-12 md:py-24 text-cream">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-cream)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10" />
          <motion.div
            className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)" }}
            animate={{ y: [0, 24, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal variant="fade-up">
              <span className="font-jet text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta">
                Campus Outreach & Placement Gateway
              </span>
              <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-cream md:text-5xl">
                Recruitment Partnerships with <span className="italic text-terracotta">CSAUAT Kanpur.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/80 md:text-base">
                Agaate conducts active recruitment drives at <strong>Chandra Shekhar Azad University of Agriculture & Technology (CSAUAT Kanpur)</strong> and premier agricultural institutes — bringing top agronomy graduates straight into high-impact vegetable crop operations and IoT telemetry.
              </p>
              
              <Stagger className="mt-8 flex flex-wrap gap-2.5">
                {campusSkills.map((s) => {
                  const Icon = s.icon;
                  return (
                    <StaggerItem key={s.label}>
                      <span className="flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-2 font-jet text-[10px] font-bold uppercase tracking-wider text-cream/90 backdrop-blur-sm">
                        <Icon className="h-3.5 w-3.5 text-moss" />
                        {s.label}
                      </span>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15}>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-cream/20 bg-cream/5 p-8 backdrop-blur-sm md:p-10">
                <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-moss/20 blur-2xl" />
                <span className="font-jet text-[10px] font-bold uppercase tracking-[0.18em] text-terracotta block">
                  Campus Placement Priority Track
                </span>
                <h3 className="mt-2 font-serif text-3xl font-bold text-cream">
                  Executive – Agronomy
                </h3>
                <p className="mt-2 flex items-center gap-1.5 font-jet text-[10px] text-cream/70">
                  <MapPin className="h-3.5 w-3.5 text-terracotta" /> Gurugram / Field Sector · Full-Time
                </p>
                <p className="mt-4 text-xs leading-relaxed text-cream/80">
                  Designed specifically for recent agronomy graduates: lead on-field advisory, master digital farm tools, direct seedless nursery germination trials, and author bilingual technical guides.
                </p>
                <MagneticButton
                  onClick={() => focusCategory("Agronomy")}
                  className="mt-8"
                  strength={0.25}
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 font-jet text-[10px] font-bold uppercase tracking-wider text-cream shadow-lg hover:bg-terracotta/90 transition-colors">
                    Explore Agronomy Roles <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Interactive Open Positions Board */}
        <section id="open-roles" className="scroll-mt-24 border-t border-border pt-20 text-left">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Interactive Open Positions Board"
              title="Join the Agaate Team."
              description="Filter by department category (Agronomy, Corporate, Retail), click any role to view complete details in the detail drawer, and apply directly."
            />
            <Reveal variant="fade-up" delay={0.1}>
              <p className="font-jet text-[10px] font-bold uppercase tracking-widest text-forest/50">
                Showing {visibleJobs.length} of {jobs.length} Active Positions
              </p>
            </Reveal>
          </div>

          {/* Filter Tabs */}
          <Reveal variant="fade-up" delay={0.1} className="mt-8">
            <div className="flex flex-wrap gap-2.5">
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`relative cursor-pointer rounded-full px-6 py-3 font-jet text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                      active ? "text-cream" : "text-forest/70 hover:text-forest-deep bg-card border border-border"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-forest-deep shadow-md"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{f} Positions</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Job List */}
          <motion.ul layout className="mt-10 space-y-5">
            <AnimatePresence mode="popLayout">
              {visibleJobs.map((job, i) => (
                <motion.li
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 28, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setDrawerJob(job)}
                  className="cursor-pointer"
                >
                  <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 transition-all duration-300 hover:border-forest/40 hover:shadow-lg md:p-8">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-forest/5 blur-2xl" />
                    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="rounded-full bg-forest px-3 py-1 font-jet text-[9px] font-bold uppercase tracking-wider text-cream">
                            {job.departmentCategory}
                          </span>
                          <span className="rounded-full border border-forest/15 bg-forest/5 px-3 py-1 font-jet text-[9px] font-bold uppercase tracking-wider text-forest">
                            {job.dept}
                          </span>
                          <span className="flex items-center gap-1 font-jet text-[10px] text-forest/60">
                            <MapPin className="h-3.5 w-3.5 text-terracotta" /> {job.loc}
                          </span>
                          <span className="flex items-center gap-1 font-jet text-[10px] text-forest/60">
                            <Briefcase className="h-3.5 w-3.5" /> {job.type}
                          </span>
                        </div>
                        
                        <h3 className="font-serif text-2xl font-bold text-forest-deep group-hover:text-forest">
                          {job.title}
                        </h3>
                        
                        <p className="max-w-2xl text-xs leading-relaxed text-forest/75 md:text-sm">
                          {job.desc}
                        </p>

                        {job.highlights && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {job.highlights.map((h) => (
                              <span key={h} className="rounded-md bg-bone px-2.5 py-1 font-jet text-[9px] font-semibold text-forest-deep">
                                • {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 self-start md:self-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDrawerJob(job);
                          }}
                          className="cursor-pointer rounded-xl border border-border bg-bone px-4 py-2.5 font-jet text-xs font-bold text-forest-deep hover:bg-forest/10"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenApplication(job);
                          }}
                          className="cursor-pointer flex items-center gap-1.5 rounded-xl bg-forest-deep px-5 py-2.5 font-jet text-xs font-bold text-cream hover:bg-forest shadow-sm"
                        >
                          <span>Apply Now</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {visibleJobs.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 rounded-[2rem] border border-dashed border-forest/30 bg-card p-10 text-center font-jet text-xs text-forest/60"
            >
              No active roles currently in {filter}. Check back soon or send your resume directly to info@agaate.in.
            </motion.p>
          )}
        </section>

        {/* Why Join Agaate & Operational Metrics */}
        <section className="border-t border-border pt-20 text-left">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="Why Agaate"
                title="Work that transforms Indian farming."
                description="We don't just sell inputs — we walk with growers through the entire vegetable crop journey, from seed to harvest."
              />
              
              <Stagger className="mt-8 space-y-5">
                {[
                  {
                    num: "01",
                    title: "Practical Science, Zero Guesswork",
                    text: "Every advisory prescribed is backed by soil testing and micro-climate weather models.",
                  },
                  {
                    num: "02",
                    title: "Certified Input Integrity",
                    text: "Guaranteed authentic biologicals and seedlings directly from 25+ certified manufacturing partners.",
                  },
                  {
                    num: "03",
                    title: "Farmer-First Economics",
                    text: "Every product and advisory is designed around protecting farmer profits and yield stability.",
                  },
                ].map((v) => (
                  <StaggerItem key={v.num} variant="fade-right">
                    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                      <span className="font-jet text-xs font-bold tracking-widest text-terracotta">
                        {v.num}
                      </span>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-forest-deep">{v.title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-forest/70">{v.text}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div>
              <Stagger className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <StaggerItem key={s.label}>
                    <div className="rounded-[2rem] border border-border bg-bone p-6 text-left shadow-sm">
                      <CountUp
                        to={s.value}
                        suffix={s.suffix}
                        className="font-serif text-4xl font-bold tracking-tight text-forest-deep md:text-5xl"
                      />
                      <p className="mt-3 text-xs font-bold uppercase tracking-wider text-forest-deep">
                        {s.label}
                      </p>
                      <p className="mt-1 font-jet text-[9px] uppercase tracking-widest text-forest/50">
                        {s.sub}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-[3rem] bg-forest px-6 py-20 text-center md:px-12 md:py-24 text-cream">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-cream)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10" />
          <Reveal variant="scale-up" className="relative z-10">
            <span className="font-jet text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta block mb-2">
              Start Your Career Journey
            </span>
            <h2 className="mx-auto max-w-2xl font-serif text-4xl font-bold tracking-tight text-cream md:text-6xl">
              Grow Your Career Where <span className="italic text-terracotta">Farmers Grow.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/80 md:text-base">
              Submit your application in under two minutes. Our operations team responds to every application within 48 hours.
            </p>
            <MagneticButton
              onClick={() => {
                if (jobs[0]) handleOpenApplication(jobs[0]);
              }}
              className="mt-10"
              strength={0.3}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full bg-cream px-9 py-4 font-jet text-xs font-bold uppercase tracking-wider text-forest-deep shadow-xl hover:bg-bone transition-colors">
                Apply Now <ArrowRight className="h-4 w-4 text-forest" />
              </span>
            </MagneticButton>
          </Reveal>
        </section>
      </div>

      {/* Role Detail Drawer */}
      <RoleDetailDrawer
        role={drawerJob}
        onClose={() => setDrawerJob(null)}
        onApply={(role) => handleOpenApplication(role)}
      />

      {/* Job Application Modal */}
      <ApplicationModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      <Footer />
    </main>
  );
}
