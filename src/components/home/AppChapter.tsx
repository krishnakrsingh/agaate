import {
  ArrowRight,
  Bell,
  Bug,
  Camera,
  Leaf,
  MessageCircle,
  Sprout,
  TestTube,
  Wheat,
} from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import InteractivePhoneApp from "./InteractivePhoneApp";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";

const appSteps = [
  {
    icon: Camera,
    title: "Send a crop photo or describe the problem",
    text: "Leaf spots, fruit damage, yellowing, pest attack — share it directly from the field.",
  },
  {
    icon: Bell,
    title: "Stay ahead with stage-wise alerts",
    text: "Fertigation timing, preventive care, irrigation, harvest readiness — get guidance before losses begin.",
  },
  {
    icon: MessageCircle,
    title: "Chat with a real agronomist",
    text: "Not a bot. A qualified expert gives specific advice for your crop, stage, soil, and weather — right in the app.",
  },
];

const farmersAskAbout = [
  { icon: Bug, label: "Diseases & pests" },
  { icon: Leaf, label: "Fertilizer advisory" },
  { icon: TestTube, label: "Pesticide selection" },
  { icon: Sprout, label: "Soil guidance" },
  { icon: Wheat, label: "Best practices" },
  { icon: MessageCircle, label: "Any crop issue" },
];

export default function AppChapter() {
  const sectionRef = useHomeChapterReveal("slide-right");
  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  return (
    <section
      ref={sectionRef}
      id="agaate-app"
      className="relative scroll-mt-28 overflow-hidden bg-[#eaf0df] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start relative">
        {/* Left — content */}
        <div data-home-reveal className="relative z-10">
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
          <p className="font-sans mt-4 max-w-2xl text-sm leading-relaxed text-[#4f624f] font-normal md:text-base">
            Track crop stages, log inputs, get stage-wise alerts, and chat with an agronomist when
            you need a second opinion — all from the Agaate app.
          </p>

          {/* Farmers ask about chips */}
          <div className="mt-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#143d31]/50">
              Farmers use the app for
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {farmersAskAbout.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#143d31]/15 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-[#143d31] shadow-xs"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#5d7d37]" strokeWidth={1.8} />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Steps */}
          <div className="mt-6 grid gap-4">
            {appSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="grid grid-cols-[40px_1fr] gap-3.5 border-t border-[#143d31]/12 pt-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143d31] text-[#b7cf79] shadow-sm">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-display text-base md:text-lg font-bold tracking-tight text-[#143d31]">
                      {step.title}
                    </h3>
                    <p className="font-sans mt-1 max-w-xl text-xs leading-relaxed text-[#4f624f] md:text-sm">
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#"
                aria-label="Get it on Google Play (coming soon)"
                aria-disabled="true"
                title="Coming soon"
                className="inline-block transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143d31]"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  className="h-12 w-auto"
                />
              </a>
              <a
                href="#"
                aria-label="Download on the App Store (coming soon)"
                aria-disabled="true"
                title="Coming soon"
                className="inline-block transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143d31]"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="h-12 w-auto"
                />
              </a>
            </div>
            <Link
              to={getLocalizedPath("/contact", currentLang) as any}
              className="font-sans inline-flex items-center justify-center gap-2 rounded-full border border-[#143d31]/20 px-8 py-4 text-xs font-bold text-[#143d31] transition-all hover:bg-white/60 hover:-translate-y-0.5 tracking-wide uppercase"
            >
              Ask for crop advice
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right — Interactive Agaate Phone OS App */}
        <div data-home-reveal className="relative mx-auto w-full flex justify-center lg:sticky lg:top-32 self-start h-max pb-12">
          <InteractivePhoneApp />
        </div>
      </div>
    </section>
  );
}
