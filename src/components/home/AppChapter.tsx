import { motion } from "framer-motion";
import { Bell, Camera, ChatCircleText } from "@phosphor-icons/react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { useTranslation } from "react-i18next";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/common/motion";
import InteractivePhoneApp from "./InteractivePhoneApp";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";

const appFeaturesEn = [
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

const appFeaturesHi = [
  {
    icon: Camera,
    title: "फोटो से तुरंत रोग पहचान",
    description:
      "पत्ते की फोटो खींचें — हमारा एआई सिस्टम तुरंत बीमारी पहचान कर सही और असरदार दवा सुझाता है।",
  },
  {
    icon: ChatCircleText,
    title: "कृषि डॉक्टर से सीधी बातचीत",
    description:
      "बिना किसी बॉट के सीधे अनुभवी कृषि वैज्ञानिकों से अपनी भाषा में सटीक और तुरंत समाधान पाएं।",
  },
  {
    icon: Bell,
    title: "फसल के चरण अनुसार अलर्ट",
    description: "मौसम, सिंचाई, स्प्रे और खाद डालने के सही समय का ऑटोमैटिक नोटिफिकेशन पाएं।",
  },
];

export default function AppChapter() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const appFeatures = isHindi ? appFeaturesHi : appFeaturesEn;
  const sectionRef = useHomeChapterReveal("fade-up");

  return (
    <section
      ref={sectionRef}
      id="agaate-app"
      className="relative scroll-mt-28 overflow-x-clip bg-[#f4f8f5] px-5 py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10 text-[#143d31]"
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
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {isHindi ? "अगाते मोबाइल ऐप" : "Agaate Mobile App"}
              </p>
            </div>
            <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-[#143d31] leading-[1.1] sm:text-4xl md:text-5xl">
              {isHindi ? "आपका पूरा खेत — एक आसान ऐप में" : "Your entire farm in one intuitive app"}
            </h2>
          </motion.div>

          <Reveal variant="fade-up" delay={0.15}>
            <p className="font-sans mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#4f624f]">
              {isHindi
                ? "अनुमान छोड़ें, वैज्ञानिक कृषि अपनाएं। आधुनिक किसानों के लिए विशेष रूप से तैयार डिजिटल डैशबोर्ड से अपने खेत की पूरी निगरानी रखें।"
                : "Replace guesswork with precision. Manage your entire farm from a single, intuitive dashboard designed exclusively for modern growers."}
            </p>
          </Reveal>

          {/* Feature List - Zero Card Bloat */}
          <Stagger stagger={0.15} delayChildren={0.2} className="mt-8 max-w-xl space-y-6">
            {appFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.title} variant="fade-up">
                  <div className="flex gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#143d31]/10 text-[#143d31]">
                      <Icon className="h-5 w-5 text-[#143d31]" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#143d31] tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-1 font-sans text-xs sm:text-sm leading-relaxed text-[#4f624f]">
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
            className="mt-10 flex flex-wrap items-center justify-center sm:justify-start gap-4 lg:mt-12"
          >
            <motion.a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-block"
            >
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="h-10 w-auto sm:h-11"
              />
            </motion.a>
            <motion.a
              href="https://apps.apple.com/us/app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-block"
            >
              <img
                src={appStoreBadge}
                alt="Download on the App Store"
                className="h-10 w-auto sm:h-11"
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
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#a3e635]/20 to-[#143d31]/20 opacity-50 blur-3xl"
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
