import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sprout,
  Stethoscope,
  ShoppingBag,
  TrendingUp,
  Microscope,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { CountUp, TiltCard, MagneticButton, Reveal, Stagger, StaggerItem, EASE } from "@/components/common/motion";

import agroParkImg from "@/assets/agro-park.jpg";
import advisorImg from "@/assets/about-farmer-advisor.png";
import productSeedsImg from "@/assets/product-seeds.jpg";
import marketImg from "@/assets/journey-09-market.png";

const ecosystemPillars = [
  {
    id: "nursery",
    number: "01",
    label: "Bio Nursery",
    title: "High-Yield Bio-Boosted Seedling Infrastructure",
    subtitle: "Pathogen-free, climate-smart nurseries engineered for zero seedling mortality.",
    desc: "Agaate operates disease-free plug nurseries using climate-controlled misting, bio-fortified coco-peat media, and root-booster treatments so farmers start every season with 100% healthy plants.",
    icon: Sprout,
    image: agroParkImg,
    badge: "Nursery Infrastructure",
    metrics: [
      { label: "Plants Delivered", num: 500000, suffix: "+" },
      { label: "Survival Rate", num: 98, suffix: "%" },
      { label: "Varieties Sourced", num: 25, suffix: "+" },
    ],
    features: [
      "Automated misting & humidity regulation",
      "Trichoderma & mycorrhiza root inoculation",
      "Trays packed in sterile anti-fungal casing",
    ],
    cta: "Explore Bio Nurseries",
    ctaLink: "/services/nursery",
  },
  {
    id: "advisory",
    number: "02",
    label: "Field Advisory",
    title: "On-Ground Expert Agronomist Support",
    subtitle: "Qualified agronomists available directly in the field and on the Agaate App.",
    desc: "No bots, no generic tips. Our field experts and in-app agronomists diagnose crop diseases, calculate exact fertigation doses, and provide hyper-local weather alerts tailored to your soil.",
    icon: Stethoscope,
    image: advisorImg,
    badge: "Field Advisory",
    metrics: [
      { label: "Field Experts", num: 20, suffix: "+" },
      { label: "Farmers Advised", num: 2000, suffix: "+" },
      { label: "Response Time", num: 15, prefix: "< ", suffix: " Mins" },
    ],
    features: [
      "Photo-based pest & disease identification",
      "Stage-wise fertigation & spray schedule",
      "Direct phone call with senior agronomists",
    ],
    cta: "Talk to Agronomist",
    ctaLink: "/services/farm-tech",
  },
  {
    id: "mall",
    number: "03",
    label: "Kisaan Mall",
    title: "100% Genuine Direct Supply Chain",
    subtitle: "Verified seeds, biologicals, and drip kits delivered right to the farm gate.",
    desc: "We partner exclusively with certified seed brands and bio-input manufacturers. Every bag and bottle is batch-tested for zero counterfeits and 100% purity.",
    icon: ShoppingBag,
    image: productSeedsImg,
    badge: "Input Commerce",
    metrics: [
      { label: "Verified Products", num: 500, suffix: "+" },
      { label: "Supply Partners", num: 25, suffix: "+" },
      { label: "Doorstep Delivery", num: 48, prefix: "24-", suffix: " Hrs" },
    ],
    features: [
      "Direct-from-brand inputs at honest prices",
      "QR-verified authenticity guarantee",
      "Custom drip & micro-irrigation packages",
    ],
    cta: "Browse Kisaan Mall",
    ctaLink: "/services/kisaan-mall",
  },
  {
    id: "market",
    number: "04",
    label: "Market & Carbon",
    title: "Guaranteed Off-take & Carbon Credits",
    subtitle: "Transparent pricing, direct buyer access, and extra carbon monetization.",
    desc: "Agaate connects farmers directly to wholesale buyers, institutions, and carbon credit pools — eliminating middleman cuts and boosting net farmer income.",
    icon: TrendingUp,
    image: marketImg,
    badge: "Market Linkage",
    metrics: [
      { label: "Acres Associated", num: 15000, suffix: "+" },
      { label: "Farmer Value", num: 10, prefix: "₹", suffix: " Cr+" },
      { label: "Carbon Enablement", num: 100, suffix: "%" },
    ],
    features: [
      "Guaranteed buyback contract options",
      "Digital weighment & instant payouts",
      "Enrolment in soil carbon offset credits",
    ],
    cta: "View Market Linkage",
    ctaLink: "/services/market-linkage",
  },
];

const pillars = [
  {
    number: "01",
    title: "Practical Research",
    text: "Field-tested science grounded in real farm conditions — not unproven theory.",
    icon: Microscope,
    tag: "Field Science",
  },
  {
    number: "02",
    title: "Quality Inputs",
    text: "Seeds, biologicals, and drip kits sourced from verified partner brands.",
    icon: ShieldCheck,
    tag: "100% Verified",
  },
  {
    number: "03",
    title: "Farmer-First Thinking",
    text: "Every service designed around one question: does this protect the farmer's profit?",
    icon: HeartHandshake,
    tag: "Impact Driven",
  },
];

const team = [
  { name: "Ankit Rawat", role: "Founder & CEO", image: "/team/ankit.png?v=2" },
  { name: "Kuldeep Singh Singhar", role: "Head of Operations", image: "/team/kuldeep.png" },
  { name: "Abhay Ranjan", role: "Chief of Staff", image: "/team/abhay.png" },
  { name: "Chanchala Shukla", role: "Agronomist", image: "/team/chanchala.png" },
  { name: "Ravi Kumar", role: "Data & Strategy", image: "/team/ravi.png" },
];

export default function PeopleChapter() {
  const sectionRef = useHomeChapterReveal("slide-left");
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end end"],
  });

  // Translate across 4 full 100vw panels: 0% to -75%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative bg-[#fafbf7]"
    >
      {/* 400vh Scroll Track for Pinned 100vw Cinematic Horizontal Panels */}
      <div ref={scrollTargetRef} className="relative h-[380vh]">
        <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden">
          
          {/* Horizontal 100vw Panels Track */}
          <div className="h-full w-full flex items-center">
            <motion.div
              style={{ x }}
              className="flex w-[400vw] h-full items-center"
            >
              {ecosystemPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="w-vw h-screen shrink-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-[104px] pb-6 lg:pb-8"
                    style={{ width: "100vw" }}
                  >
                    <div className="mx-auto w-full max-w-[1380px] grid gap-8 lg:grid-cols-12 lg:items-center">
                      
                      {/* Left Column (7 cols): Dynamic Content & Motion */}
                      <motion.div
                        className="lg:col-span-7 flex flex-col justify-center"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                      >
                        
                        {/* 1. Division Tag with Index */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-lg sm:text-xl font-extrabold text-[#5d7d37]">
                            {pillar.number}
                          </span>
                          <span className="h-3.5 w-[1.5px] bg-[#143d31]/20" />
                          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#143d31]">
                            {pillar.label}
                          </span>
                        </div>

                        {/* 2. Display Headline */}
                        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
                          {pillar.title}
                        </h3>

                        {/* 3. Description */}
                        <p className="font-sans mt-3 text-sm sm:text-base lg:text-lg text-[#4f624f] leading-relaxed max-w-2xl font-normal">
                          {pillar.desc}
                        </p>

                        {/* 4. Integrated Metrics & Features HUD Box */}
                        <div className="mt-6 space-y-4">
                          {/* Metrics Row with Live Animated Counters */}
                          <div className="grid grid-cols-3 gap-3 rounded-2xl bg-white p-4 border border-[#143d31]/12 transition-colors duration-300 hover:border-[#143d31]/25">
                            {pillar.metrics.map((m) => (
                              <div key={m.label} className="text-left border-l-2 border-[#5d7d37] pl-3">
                                <p className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#143d31]">
                                  <CountUp
                                    to={m.num}
                                    prefix={m.prefix}
                                    suffix={m.suffix}
                                  />
                                </p>
                                <p className="font-mono text-[9.5px] sm:text-[10.5px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                                  {m.label}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Capabilities Feature Chips */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {pillar.features.map((feat) => (
                              <div
                                key={feat}
                                className="group flex items-center gap-2 rounded-full border border-[#143d31]/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#143d31] transition-all duration-300 hover:bg-[#143d31] hover:text-[#a3e635] hover:border-[#143d31]"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#5d7d37] transition-colors group-hover:text-[#a3e635] shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 5. Magnetic CTA Button */}
                        <div className="mt-6">
                          <MagneticButton strength={0.25} as="a" href={pillar.ctaLink}>
                            <span className="inline-flex items-center gap-3 rounded-full bg-[#143d31] px-7 py-3.5 text-xs sm:text-sm font-bold text-[#a3e635] transition-all hover:bg-[#143d31]/90 hover:gap-4 cursor-pointer">
                              <span>{pillar.cta}</span>
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </MagneticButton>
                        </div>
                      </motion.div>

                      {/* Right Column (5 cols): Pure Clean Image Frame (Nothing on Image, No Shadows, No Gradients) */}
                      <div className="lg:col-span-5 relative">
                        <TiltCard maxTilt={6} glare={false} className="w-full">
                          <div className="relative aspect-[4/3] lg:aspect-[1.12/1] max-h-[360px] sm:max-h-[420px] lg:max-h-[460px] w-full overflow-hidden rounded-3xl border border-[#143d31]/15 bg-white">
                            <img
                              src={pillar.image}
                              alt={pillar.title}
                              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                          </div>
                        </TiltCard>
                      </div>

                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Static Section: Commitments, Founder Quote & Leadership */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24 border-t border-[#143d31]/10">
        {/* Three commitments bar */}
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-5 h-[1px] bg-[#5d7d37]/50" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Our three commitments
            </p>
          </div>
          <Stagger stagger={0.12} className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.number} variant="fade-up">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative flex flex-col justify-between rounded-3xl border border-[#143d31]/12 bg-white p-7 transition-colors duration-300 hover:border-[#143d31]/30 cursor-pointer h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#143d31] text-[#a3e635]"
                        >
                          <Icon className="h-5 w-5" />
                        </motion.div>
                        <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#5d7d37] bg-[#eaf0df] px-3 py-1 rounded-full group-hover:bg-[#143d31] group-hover:text-[#a3e635] transition-colors duration-300">
                          {pillar.tag}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#143d31] mb-2 group-hover:text-[#5d7d37] transition-colors">
                        {pillar.number}. {pillar.title}
                      </h3>
                      <p className="font-sans text-sm text-[#4f624f] leading-relaxed">
                        {pillar.text}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* Founder Quote Banner */}
        <Reveal variant="blur-in" delay={0.15} className="mt-16">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="rounded-3xl bg-[#eaf0df] p-8 md:p-12 border border-[#143d31]/10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <blockquote className="font-serif text-xl md:text-2xl font-normal italic text-[#143d31] flex-1 max-w-4xl leading-relaxed">
              "We built Agaate with a simple belief — that every farmer deserves the right guidance, the right tools, and the right support, so that their hard work never goes to loss."
            </blockquote>
            <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-[#143d31]/15 pt-6 md:pt-0 md:pl-8">
              <motion.img
                whileHover={{ scale: 1.12, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
                src="/team/ankit.png?v=2"
                alt="Ankit Rawat"
                className="h-14 w-14 rounded-full object-cover border-2 border-white shrink-0 cursor-pointer"
              />
              <div>
                <p className="font-display text-base font-extrabold text-[#143d31]">Ankit Rawat</p>
                <p className="font-sans text-xs font-semibold text-[#5d7d37] mt-0.5">Founder & CEO</p>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Team strip */}
        <Reveal variant="fade-up" delay={0.2} className="mt-16 border-t border-[#143d31]/10 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Leadership Team
            </p>
            <Stagger stagger={0.08} delayChildren={0.1} className="flex flex-wrap items-center gap-6 md:gap-10">
              {team.map((member) => (
                <StaggerItem key={member.name} variant="fade-right">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="group flex items-center gap-3 cursor-pointer"
                  >
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={member.image}
                      alt={member.name}
                      className="h-11 w-11 rounded-full object-cover border border-[#143d31]/15 transition-transform duration-300"
                    />
                    <div>
                      <p className="font-display text-base font-bold text-[#143d31] group-hover:text-[#5d7d37] transition-colors">{member.name}</p>
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#5d7d37]">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
