import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  ArrowClockwise,
  ArrowRight,
  Bell,
  CaretRight,
  ChatCircleText,
  CheckCircle,
  ClipboardText,
  DeviceMobile,
  Flame,
  GraduationCap,
  Heart,
  Image as ImageIcon,
  Lightning,
  MapPin,
  Medal,
  Package,
  PaperPlaneRight,
  Phone,
  Plant,
  Question,
  Rocket,
  ShieldCheck,
  Sparkle,
  Star,
  TrendUp,
  UserCheck,
  Users,
  X
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AnimatedHeadline,
  CountUp,
  EASE,
  MagneticButton,
  Marquee,
  PageHero,
  Parallax,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/components/common/motion";
import {
  PILLARS,
  STATS,
  TESTIMONIALS,
  WHATSAPP_SCRIPTS,
  posts,
} from "@/components/community/community-data";

export const Route = createFileRoute("/{-$locale}/community")({
  component: CommunityPage,
});

const WHATSAPP_COMMUNITY_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%2C%20I%20want%20to%20join%20the%20Agaate%20Parivaar%20Farmer%20Community.";

// Verified Case Studies
const CASE_STUDIES = [
  {
    id: "watermelon",
    crop: "Watermelon",
    farmer: "Surender Yadav",
    location: "Pachgaon, Gurugram",
    acres: "12 Acres",
    technique: "Staking & Central Line 1ft Mulching",
    metrics: [
      { label: "Yield & Fruit Form", value: "+40%", note: "No soil contact rot" },
      { label: "Additional Revenue", value: "₹1.8L", note: "Per acre gain" },
      { label: "Seedling Survival", value: "96%", note: "Bio-boosted nursery" },
    ],
    summary:
      "By adopting bamboo staking and 1ft central line mulching specified by Agaate agronomists, Surender eliminated fruit soil rot entirely and produced uniform, premium-grade watermelons.",
    tag: "High Value Technique",
  },
  {
    id: "chilli",
    crop: "Chilli",
    farmer: "Balwan Singh",
    location: "Bhora Kalan, Gurugram",
    acres: "8 Acres",
    technique: "18 x 12 Precision Spacing & Bio-Boosted Nursery",
    metrics: [
      { label: "Survival Rate Boost", value: "60% → 95%", note: "Zero early die-off" },
      { label: "Chemical Reduction", value: "-50%", note: "Preventive spray loops" },
      { label: "Harvest Duration", value: "+4 Wks", note: "Extended picking" },
    ],
    summary:
      "Transitioning from direct seed sowing to 18x12 spacing with Bio-Boosted saplings boosted seedling survival from a fragile 60% to an exceptional 95%, cutting chemical spray costs in half.",
    tag: "Survival Benchmark",
  },
  {
    id: "tomato",
    crop: "Tomato",
    farmer: "Vikram Singh",
    location: "Kukrola, Gurugram",
    acres: "15 Acres",
    technique: "Vertical Trellising with Bamboo & Netting",
    metrics: [
      { label: "Harvest Cycles", value: "3x", note: "Vertical sprawl control" },
      { label: "First Grade Yield", value: "+35%", note: "Export quality skin" },
      { label: "Market Linkage", value: "Direct", note: "Handpick buyback tie-up" },
    ],
    summary:
      "Replacing ground sprawling with heavy-duty bamboo trellising extended Vikram's tomato picking window by 3 additional cycles and secured direct buyback through Agaate market linkages.",
    tag: "Turnkey Trellis",
  },
];

// WhatsApp Simulation Workflows
const SIMULATED_WORKFLOWS = [
  {
    id: "stage-guidance",
    title: "Stage-Wise Guidance",
    desc: "Personalized daily alerts mapped to your crop lifecycle.",
    chats: [
      { from: "sathi", text: "Namaste Ramesh Ji! Your Watermelon crop is entering Flowering Stage today (Day 32)." },
      { from: "farmer", text: "What is the recommended fertigation for this stage?" },
      { from: "sathi", text: "Apply NPK 13:40:13 @ 3kg/acre along with Calcium Boron spray. Stage-wise advisory sheet attached." },
      { from: "farmer", text: "Received! Thank you. Direct WhatsApp advice makes it so simple." },
    ],
  },
  {
    id: "photo-diagnosis",
    title: "Photo Disease Diagnosis",
    desc: "Snap a photo of leaf spots for instant 30-min treatment protocol.",
    chats: [
      { from: "farmer", text: "Yellowing and white spots on chilli leaves. Sending field photo.", hasImage: true },
      { from: "sathi", text: "Image scanned. Diagnosis: Early Powdery Mildew due to high morning humidity." },
      { from: "sathi", text: "Prescription: Spray Biocure F @ 3ml/L before sunrise. Repeat after 5 days if humidity stays above 80%." },
      { from: "farmer", text: "Starting spray now. Thanks for the rapid response!" },
    ],
  },
  {
    id: "buyback-market",
    title: "Guaranteed Buyback Linkage",
    desc: "Real-time crop market pricing and pickup confirmation.",
    chats: [
      { from: "farmer", text: "My Watermelon lot (Grade A) will be ready for harvest on Thursday. What is the current buyback rate?" },
      { from: "sathi", text: "Current Agaate Buyback Rate for Grade A Watermelon: ₹18.50/kg direct pickup at your farm gate." },
      { from: "sathi", text: "Transport truck scheduled for Thursday 9:00 AM. No middleman deductions." },
      { from: "farmer", text: "Confirmed! Excellent price security." },
    ],
  },
];

function CommunityPage() {
  const [activeWorkflowId, setActiveWorkflowId] = useState("photo-diagnosis");
  const [activeCaseStudyId, setActiveCaseStudyId] = useState("watermelon");

  // Registration Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regForm, setRegForm] = useState({
    name: "",
    phone: "",
    village: "",
    acres: "1-5 Acres",
    crops: "Watermelon & Chilli",
    support: "Disease Control & Saplings",
  });
  const [registeredMemberId, setRegisteredMemberId] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const activeWorkflow =
    SIMULATED_WORKFLOWS.find((w) => w.id === activeWorkflowId) || SIMULATED_WORKFLOWS[0];
  const activeCaseStudy =
    CASE_STUDIES.find((c) => c.id === activeCaseStudyId) || CASE_STUDIES[0];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setTimeout(() => {
      const memberId = `PARIVAAR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsRegistering(false);
      setRegisteredMemberId(memberId);
    }, 1100);
  };

  return (
    <main className="min-h-screen bg-cream font-sans text-ink antialiased">
      <Header />

      {/* Hero Section */}
      <PageHero
        eyebrow="AGAATE PARIVAAR FARMER NETWORK"
        title={
          <>
            2,000+ Farmers Growing Together with <br />
            <span className="italic text-terracotta">Zero Guesswork.</span>
          </>
        }
        description="Join India's premier agronomist-led farmer community. Get daily WhatsApp stage guidance, photo disease diagnosis, verified staking methods, and direct market buyback."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-cream/90 px-4 py-2">
            <Sparkle className="h-4 w-4 text-moss animate-pulse" />
            <span className="font-jet text-[11px] font-bold uppercase tracking-wider text-forest-deep">
              2,000+ Verified Parivaar Members
            </span>
          </div>

          <MagneticButton
            as="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-cream shadow-lg shadow-forest-deep/20 transition-all hover:bg-forest"
          >
            <UserCheck className="h-4 w-4 text-terracotta" />
            <span>Join the Parivaar Now</span>
          </MagneticButton>

          <MagneticButton
            as="a"
            href={WHATSAPP_COMMUNITY_URL}
            className="inline-flex items-center gap-2 rounded-full border border-forest/30 bg-cream/80 px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-forest hover:bg-bone"
          >
            <ChatCircleText className="h-4 w-4 text-moss" />
            <span>Join WhatsApp Group</span>
          </MagneticButton>
        </div>
      </PageHero>

      {/* Stats Counter Band */}
      <section className="relative z-10 border-y border-forest/15 bg-bone/90 py-10 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center md:text-left border-r border-forest/10 last:border-0 pr-4">
              <div className="font-serif text-4xl font-bold text-forest-deep lg:text-5xl">
                <CountUp to={2000} suffix="+" />
              </div>
              <p className="mt-1 font-jet text-[11px] font-semibold uppercase tracking-wider text-moss">
                Parivaar Farmers
              </p>
              <span className="text-[11px] text-forest/60">Across Gurugram & Haryana</span>
            </div>

            <div className="text-center md:text-left border-r border-forest/10 last:border-0 pr-4">
              <div className="font-serif text-4xl font-bold text-forest-deep lg:text-5xl">
                <CountUp to={15000} suffix="+" />
              </div>
              <p className="mt-1 font-jet text-[11px] font-semibold uppercase tracking-wider text-moss">
                Acres Under Management
              </p>
              <span className="text-[11px] text-forest/60">Precision vegetable cultivation</span>
            </div>

            <div className="text-center md:text-left border-r border-forest/10 last:border-0 pr-4">
              <div className="font-serif text-4xl font-bold text-forest-deep lg:text-5xl">
                <CountUp to={95} suffix="%" />
              </div>
              <p className="mt-1 font-jet text-[11px] font-semibold uppercase tracking-wider text-moss">
                Seedling Survival Guarantee
              </p>
              <span className="text-[11px] text-forest/60">Bio-Boosted nursery model</span>
            </div>

            <div className="text-center md:text-left">
              <div className="font-serif text-4xl font-bold text-forest-deep lg:text-5xl">
                <CountUp to={20} suffix="+" />
              </div>
              <p className="mt-1 font-jet text-[11px] font-semibold uppercase tracking-wider text-moss">
                On-Ground Kisan Sathis
              </p>
              <span className="text-[11px] text-forest/60">Direct field advisors</span>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Agronomy Connect Workflow & DeviceMobile Mockup */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="DAILY AGRONOMY PIPELINE"
            title={
              <>
                Farming Powered by WhatsApp — <br />
                <span className="italic text-terracotta">From Seed to Market Linkage.</span>
              </>
            }
            description="No complex app downloads required. Agaate brings daily stage-wise crop advice, instant photo disease diagnostics, and buyback pricing straight to your WhatsApp."
          />

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Interactive Workflow Tabs */}
            <div className="lg:col-span-6 space-y-4">
              {SIMULATED_WORKFLOWS.map((wf) => {
                const isActive = activeWorkflowId === wf.id;
                return (
                  <button
                    key={wf.id}
                    onClick={() => setActiveWorkflowId(wf.id)}
                    className={`w-full text-left rounded-3xl p-6 transition-all border ${
                      isActive
                        ? "bg-forest-deep text-cream border-forest-deep shadow-xl"
                        : "bg-bone/70 text-forest border-forest/15 hover:bg-bone hover:border-forest/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-jet text-[10px] font-bold uppercase tracking-wider ${
                          isActive ? "bg-terracotta text-cream" : "bg-forest/10 text-forest"
                        }`}
                      >
                        <ChatCircleText className="h-3 w-3" />
                        Live WhatsApp Module
                      </span>
                      <CaretRight
                        className={`h-5 w-5 transition-transform ${
                          isActive ? "rotate-90 text-terracotta" : "text-forest/40"
                        }`}
                      />
                    </div>

                    <h3 className="mt-3 font-serif text-2xl font-bold leading-tight">
                      {wf.title}
                    </h3>
                    <p className={`mt-1 text-xs sm:text-sm leading-relaxed ${isActive ? "text-cream/80" : "text-forest/70"}`}>
                      {wf.desc}
                    </p>
                  </button>
                );
              })}

              {/* Stage Pipeline Process Indicator */}
              <div className="mt-8 rounded-2xl bg-cream p-5 border border-forest/15">
                <span className="block font-jet text-[10px] font-bold uppercase tracking-wider text-moss mb-3">
                  5-Stage Crop Lifecycle Coverage
                </span>
                <div className="grid grid-cols-5 gap-2 text-center">
                  {[
                    "1. Soil Prep",
                    "2. Nursery",
                    "3. Spray Loop",
                    "4. Fertigation",
                    "5. Buyback",
                  ].map((stage, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-bone/80 py-2 font-mono text-[10px] font-bold text-forest-deep"
                    >
                      {stage}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Simulated DeviceMobile UI */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[380px] rounded-[40px] border-[10px] border-forest-deep bg-slate-950 p-4 shadow-2xl">
                {/* Phone Top Notch */}
                <div className="mx-auto h-5 w-32 rounded-b-xl bg-forest-deep flex items-center justify-center mb-3">
                  <div className="h-2 w-2 rounded-full bg-slate-800" />
                </div>

                {/* WhatsApp Chat Header */}
                <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900/90 p-3 rounded-2xl">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-sm">
                    <Plant className="h-5 w-5" />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white leading-tight">
                      Agaate Agronomy Advisory
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-400">
                      ● Active Now · Senior Agronomist
                    </span>
                  </div>
                </div>

                {/* WhatsApp Chat Messages Canvas */}
                <div className="mt-3 space-y-3 min-h-[360px] p-2 overflow-y-auto font-sans text-xs">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeWorkflow.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="space-y-3"
                    >
                      {activeWorkflow.chats.map((chat, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            chat.from === "farmer" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl p-3 shadow.sm ${
                              chat.from === "farmer"
                                ? "bg-emerald-700 text-white rounded-tr-none"
                                : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700"
                            }`}
                          >
                            {chat.hasImage && (
                              <div className="mb-2 overflow-hidden rounded-xl bg-slate-900 border border-slate-700 p-2 text-center text-slate-400">
                                <ImageIcon className="mx-auto h-8 w-8 text-emerald-400 mb-1" />
                                <span className="font-mono text-[9px]">chilli_leaf_photo_scan.jpg</span>
                              </div>
                            )}
                            <p className="leading-relaxed text-xs">{chat.text}</p>
                            <span
                              className={`mt-1 block text-[9px] text-right ${
                                chat.from === "farmer" ? "text-emerald-200" : "text-slate-400"
                              }`}
                            >
                              08:{30 + idx * 2} AM ✓✓
                            </span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Phone Bottom Input Bar */}
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-900 p-2 border border-slate-800">
                  <input
                    type="text"
                    disabled
                    value="Type field question to Agronomist..."
                    className="w-full bg-transparent px-2 font-sans text-[11px] text-slate-400 outline-none"
                  />
                  <a
                    href={WHATSAPP_COMMUNITY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white"
                  >
                    <PaperPlaneRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Farmer Success Stories & Case Studies */}
      <section className="relative overflow-hidden bg-bone/70 py-24 border-t border-forest/15">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="FIELD-TESTED RESULTS"
            title={
              <>
                Verified Farmer Case Studies & <span className="italic text-terracotta">Techniques.</span>
              </>
            }
            description="Real yield metrics and income transformations achieved by Agaate Parivaar farmers in Gurugram, Jhajjar, and Rohtak."
          />

          {/* Case Study Filter Tabs */}
          <div className="mt-10 flex flex-wrap gap-3">
            {CASE_STUDIES.map((cs) => (
              <button
                key={cs.id}
                onClick={() => setActiveCaseStudyId(cs.id)}
                className={`rounded-xl px-5 py-2.5 font-jet text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCaseStudyId === cs.id
                    ? "bg-forest-deep text-cream shadow-md"
                    : "bg-cream text-forest border border-forest/15 hover:bg-bone"
                }`}
              >
                {cs.crop} ({cs.farmer})
              </button>
            ))}
          </div>

          {/* Active Case Study Spotlight */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCaseStudy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-3xl border border-forest/20 bg-cream p-8 lg:p-12 shadow-xl"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-forest/10 pb-6">
                  <div>
                    <span className="inline-block rounded-full bg-terracotta/15 px-3 py-1 font-jet text-[10px] font-bold uppercase tracking-wider text-terracotta mb-2">
                      {activeCaseStudy.tag}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-forest-deep sm:text-4xl">
                      {activeCaseStudy.farmer} — {activeCaseStudy.crop} Farm
                    </h3>
                    <p className="mt-1 font-mono text-xs text-forest/70">
                      📍 Location: {activeCaseStudy.location} | Land Holding: {activeCaseStudy.acres}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-bone/80 p-4 border border-forest/10">
                    <span className="block font-jet text-[9px] uppercase tracking-wider text-moss">
                      Key Agronomic Technique
                    </span>
                    <span className="font-serif text-lg font-bold text-forest-deep">
                      {activeCaseStudy.technique}
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {activeCaseStudy.metrics.map((m, idx) => (
                    <div key={idx} className="rounded-2xl bg-bone/50 p-6 border border-forest/10 text-center sm:text-left">
                      <span className="block font-serif text-4xl font-bold text-forest-deep text-terracotta">
                        {m.value}
                      </span>
                      <span className="mt-1 block font-jet text-[11px] font-bold uppercase tracking-wider text-forest">
                        {m.label}
                      </span>
                      <span className="mt-1 block text-xs text-forest/60">
                        {m.note}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-base leading-relaxed text-forest/80 max-w-4xl">
                  "{activeCaseStudy.summary}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Community Registration Banner & Modal Trigger */}
      <section className="relative overflow-hidden py-24 bg-forest-deep text-cream">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#537d6a_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <span className="font-jet text-[10px] font-bold uppercase tracking-[0.22em] text-moss">
            BECOME AN AGAATE PARIVAAR MEMBER
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl text-cream">
            Ready to Transform Your Farming Outcome?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-cream/80">
            Join over 2,000 farmers in Haryana. Enrolment takes less than 2 minutes and unlocks free disease diagnostics, custom soil fertilizer planning, and direct buyback market access.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              as="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-full bg-terracotta px-8 py-4 font-sans text-xs font-bold uppercase tracking-wider text-cream shadow-xl hover:bg-terracotta/90 transition-transform hover:scale-105"
            >
              <UserCheck className="h-4 w-4" />
              <span>Register for Parivaar Access</span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href={WHATSAPP_COMMUNITY_URL}
              className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 bg-cream/10 px-8 py-4 font-sans text-xs font-bold uppercase tracking-wider text-cream hover:bg-cream/20"
            >
              <ChatCircleText className="h-4 w-4 text-moss" />
              <span>Connect via WhatsApp</span>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Registration Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full max-w-lg rounded-3xl border border-forest/20 bg-cream p-8 shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-bone text-forest/70 hover:bg-forest/10 hover:text-forest"
              >
                <X className="h-4 w-4" />
              </button>

              {registeredMemberId ? (
                <div className="text-center py-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss/20 text-forest-deep">
                    <CheckCircle className="h-8 w-8 text-moss" />
                  </div>
                  <span className="mt-4 block font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-moss">
                    PARIVAAR REGISTRATION CONFIRMED
                  </span>
                  <h3 className="mt-1 font-serif text-3xl font-bold text-forest-deep">
                    Welcome, {regForm.name || "Farmer"}!
                  </h3>
                  <div className="mt-4 rounded-2xl bg-bone p-4 border border-forest/15">
                    <span className="block font-jet text-[10px] uppercase text-forest/60">
                      Your Parivaar Member ID
                    </span>
                    <span className="font-mono text-xl font-bold text-terracotta">
                      {registeredMemberId}
                    </span>
                  </div>

                  <p className="mt-4 text-xs text-forest/80">
                    Your registration has been logged with the Agaate Anzix Farm team. Click below to join the active Haryana Farmers WhatsApp Hub.
                  </p>

                  <div className="mt-6 space-y-3">
                    <a
                      href={WHATSAPP_COMMUNITY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-forest-deep px-6 py-3 font-sans text-xs font-bold text-cream hover:bg-forest"
                    >
                      <ChatCircleText className="h-4 w-4 text-moss" />
                      <span>Enter WhatsApp Farmer Hub Now</span>
                    </a>
                    <button
                      onClick={() => {
                        setRegisteredMemberId(null);
                        setIsModalOpen(false);
                      }}
                      className="w-full rounded-xl border border-forest/20 py-2.5 text-xs font-bold text-forest hover:bg-bone"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="border-b border-forest/10 pb-3">
                    <span className="font-jet text-[10px] font-bold uppercase tracking-wider text-moss">
                      FREE COMMUNITY REGISTRATION
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-forest-deep">
                      Join Agaate Parivaar
                    </h3>
                  </div>

                  <div>
                    <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-1">
                      Farmer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full rounded-xl border border-forest/20 bg-bone/60 px-4 py-2.5 text-sm text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      placeholder="e.g. 98123 45678"
                      className="w-full rounded-xl border border-forest/20 bg-bone/60 px-4 py-2.5 text-sm text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-1">
                        Village / District
                      </label>
                      <input
                        type="text"
                        value={regForm.village}
                        onChange={(e) => setRegForm({ ...regForm, village: e.target.value })}
                        placeholder="e.g. Kukrola"
                        className="w-full rounded-xl border border-forest/20 bg-bone/60 px-4 py-2.5 text-sm text-forest-deep focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-1">
                        Total Land (Acres)
                      </label>
                      <select
                        value={regForm.acres}
                        onChange={(e) => setRegForm({ ...regForm, acres: e.target.value })}
                        className="w-full rounded-xl border border-forest/20 bg-bone/60 px-4 py-2.5 text-sm text-forest-deep focus:border-forest focus:outline-none"
                      >
                        <option value="1-5 Acres">1 – 5 Acres</option>
                        <option value="5-15 Acres">5 – 15 Acres</option>
                        <option value="15+ Commercial Acres">15+ Commercial Acres</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-jet text-[10px] font-bold uppercase tracking-wider text-forest/70 mb-1">
                      Main Support Required
                    </label>
                    <select
                      value={regForm.support}
                      onChange={(e) => setRegForm({ ...regForm, support: e.target.value })}
                      className="w-full rounded-xl border border-forest/20 bg-bone/60 px-4 py-2.5 text-sm text-forest-deep focus:border-forest focus:outline-none"
                    >
                      <option value="Disease Control & Saplings">Disease Control & Bio-Boosted Saplings</option>
                      <option value="Staking & Mulching Guidance">Staking & Mulching Technique</option>
                      <option value="Guaranteed Market Buyback">Guaranteed Market Buyback</option>
                      <option value="Soil Testing & Fertigation">Soil Testing & Fertigation Schedule</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isRegistering}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-forest-deep px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-cream shadow-md hover:bg-forest disabled:opacity-50"
                  >
                    {isRegistering ? (
                      <span>Generating Parivaar ID...</span>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4 text-terracotta" />
                        <span>Complete Registration</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
