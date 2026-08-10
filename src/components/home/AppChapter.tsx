import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Bug,
  Camera,
  Leaf,
  MapPin,
  MessageCircle,
  Sprout,
  TestTube,
  Wheat,
} from "lucide-react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/common/motion";
import InteractivePhoneApp from "./InteractivePhoneApp";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";

const appSteps = [
  {
    icon: Camera,
    title: "Send a crop photo or describe the problem",
    text: "Leaf spots, fruit damage, yellowing, pest attack — share it directly from the field.",
    tab: "chat" as const,
  },
  {
    icon: Bell,
    title: "Stay ahead with stage-wise alerts",
    text: "Fertigation timing, preventive care, irrigation, harvest readiness — get guidance before losses begin.",
    tab: "farm" as const,
  },
  {
    icon: MessageCircle,
    title: "Chat with a real agronomist",
    text: "Not a bot. A qualified expert gives specific advice for your crop, stage, soil, and weather — right in the app.",
    tab: "chat" as const,
  },
];

const farmersAskAbout = [
  { icon: Bug, label: "Diseases & pests", tab: "chat" as const },
  { icon: Leaf, label: "Fertilizer advisory", tab: "chat" as const },
  { icon: TestTube, label: "Pesticide selection", tab: "mall" as const },
  { icon: Sprout, label: "Soil guidance", tab: "farm" as const },
  { icon: Wheat, label: "Best practices", tab: "farm" as const },
  { icon: MapPin, label: "Agri Park Tour", tab: "park" as const },
];

export default function AppChapter() {
  const sectionRef = useHomeChapterReveal("fade-up");
  const [activeTab, setActiveTab] = useState<"chat" | "mall" | "farm" | "park">("chat");

  return (
    <section
      ref={sectionRef}
      id="agaate-app"
      className="relative scroll-mt-28 overflow-x-clip bg-[#f4f8f5] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="relative mx-auto grid max-w-7xl gap-16 sm:gap-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
        {/* Left — content */}
        <div data-home-reveal className="relative z-10 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1px] bg-[#5d7d37]/50" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                The Agaate app
              </p>
            </div>
            <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-[#143d31] leading-[1.08] md:text-4xl lg:text-5xl">
              Your whole farm —{" "}
              <span className="font-serif italic font-normal text-[#5d7d37]">
                in one app.
              </span>
            </h2>
          </motion.div>

          <Reveal variant="fade-up" delay={0.15}>
            <p className="font-sans mt-4 max-w-2xl text-sm leading-relaxed text-[#4f624f] font-normal md:text-base">
              Track crop stages, log inputs, get stage-wise alerts, and chat with an agronomist when
              you need a second opinion — all from the Agaate app.
            </p>
          </Reveal>

          {/* Farmers use the app for */}
          <div className="mt-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#143d31]/50">
              Farmers use the app for
            </p>
            <Stagger stagger={0.06} delayChildren={0.1} className="mt-3 flex flex-wrap gap-2.5">
              {farmersAskAbout.map((item) => {
                const Icon = item.icon;
                const isTabActive = activeTab === item.tab;
                return (
                  <StaggerItem key={item.label} variant="scale-up">
                    <motion.button
                      onClick={() => setActiveTab(item.tab)}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-colors duration-300 cursor-pointer ${
                        isTabActive
                          ? "bg-[#143d31] border-[#143d31] text-white"
                          : "bg-white border-[#143d31]/15 text-[#143d31] hover:bg-white hover:border-[#143d31]/30"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 transition-colors ${
                        isTabActive ? "text-white" : "text-[#5d7d37]"
                      }`} strokeWidth={1.8} />
                      {item.label}
                    </motion.button>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          {/* Steps */}
          <Stagger stagger={0.12} delayChildren={0.2} className="mt-10 grid gap-8 sm:gap-6">
            {appSteps.map((step) => {
              const Icon = step.icon;
              const isTabActive = activeTab === step.tab;
              return (
                <StaggerItem key={step.title} variant="fade-up">
                  <motion.div
                    onClick={() => setActiveTab(step.tab)}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="grid grid-cols-[40px_1fr] gap-3.5 border-t border-[#143d31]/12 pt-5 first:border-t-0 first:pt-0 transition-colors duration-300 cursor-pointer group"
                  >
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                        isTabActive ? "bg-[#143d31] text-white shadow-md scale-105" : "bg-[#143d31] text-white/90"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-base md:text-lg font-bold tracking-tight text-[#143d31] group-hover:text-[#5d7d37] transition-colors">
                        {step.title}
                      </h3>
                      <p className="font-sans mt-1 max-w-xl text-xs leading-relaxed text-[#4f624f] md:text-sm">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Store badges */}
          <Reveal
            variant="scale-up"
            delay={0.3}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 pb-2 sm:mt-14 sm:gap-x-6 lg:mt-10 lg:justify-start lg:gap-4 lg:pb-0"
          >
            <motion.a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143d31]"
            >
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="h-11 w-[148px] sm:h-12 sm:w-[162px]"
              />
            </motion.a>
            <motion.a
              href="https://apps.apple.com/us/app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143d31]"
            >
              <img
                src={appStoreBadge}
                alt="Download on the App Store"
                className="h-11 w-[148px] sm:h-12 sm:w-[162px]"
              />
            </motion.a>
          </Reveal>
        </div>

        {/* Right — Interactive Agaate Phone OS App */}
        <Reveal
          variant="fade-up"
          delay={0.2}
          className="relative mx-auto mt-10 flex h-max w-full min-w-0 justify-center self-start overflow-hidden pb-8 sm:mt-14 lg:mt-0 lg:sticky lg:top-32 lg:pb-12"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex w-full max-w-[300px] justify-center"
          >
            {/* Ambient Glow — contained inside phone column */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#a3e635]/25 to-[#143d31]/30 opacity-65 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10 w-full px-2">
              <InteractivePhoneApp activeTab={activeTab} onChangeTab={setActiveTab} />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}