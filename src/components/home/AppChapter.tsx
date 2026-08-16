import { motion } from "framer-motion";
import { Bell, Camera, ChatCircleText } from "@phosphor-icons/react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/common/motion";
import InteractivePhoneApp from "./InteractivePhoneApp";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";

const appFeatures = [
  {
    icon: Camera,
    title: "Instant Crop Diagnosis",
    description:
      "Snap a picture of a diseased leaf. Our AI identifies the issue and prescribes the exact treatment instantly.",
  },
  {
    icon: ChatCircleText,
    title: "Real Agronomist Chat",
    description:
      "Skip the generic bots. Chat directly with verified agricultural experts who understand your local soil and climate.",
  },
  {
    icon: Bell,
    title: "Precision Stage Alerts",
    description:
      "Get notified exactly when it's time to irrigate, apply fertilizers, or harvest based on your crop's current growth stage.",
  },
];

export default function AppChapter() {
  const sectionRef = useHomeChapterReveal("fade-up");

  return (
    <section
      ref={sectionRef}
      id="agaate-app"
      className="relative scroll-mt-28 overflow-x-clip bg-[#f4f8f5] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="relative mx-auto grid max-w-7xl gap-12 sm:gap-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
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
              <span className="font-serif italic font-normal text-[#5d7d37]">in one app.</span>
            </h2>
          </motion.div>

          <Reveal variant="fade-up" delay={0.15}>
            <p className="font-sans mt-5 max-w-lg text-[15px] leading-relaxed text-[#4f624f]">
              Replace guesswork with precision. Manage your entire farm from a single, intuitive
              dashboard designed exclusively for modern growers.
            </p>
          </Reveal>

          {/* Elegant Feature List - No Cards */}
          <Stagger stagger={0.15} delayChildren={0.2} className="mt-10 max-w-xl space-y-7">
            {appFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.title} variant="fade-up">
                  <div className="flex gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#143d31]/5 text-[#5d7d37]">
                      <Icon className="h-5 w-5" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-display text-[17px] font-bold text-[#143d31]">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 font-sans text-[14px] leading-relaxed text-[#4f624f]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Store badges */}
          <Reveal
            variant="fade-up"
            delay={0.3}
            className="mt-12 flex flex-wrap items-center justify-center sm:justify-start gap-4 lg:mt-14"
          >
            <motion.a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143d31]"
            >
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="h-10 w-auto sm:h-12"
              />
            </motion.a>
            <motion.a
              href="https://apps.apple.com/us/app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143d31]"
            >
              <img
                src={appStoreBadge}
                alt="Download on the App Store"
                className="h-10 w-auto sm:h-12"
              />
            </motion.a>
          </Reveal>
        </div>

        {/* Right — Interactive Agaate Phone OS App */}
        <Reveal
          variant="fade-up"
          delay={0.2}
          className="relative mx-auto mt-8 flex w-full min-w-0 justify-center lg:mt-0 lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex w-full max-w-[320px] sm:max-w-[340px] justify-center"
          >
            {/* Ambient Glow */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#a3e635]/25 to-[#143d31]/30 opacity-60 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10 w-full">
              <InteractivePhoneApp />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
