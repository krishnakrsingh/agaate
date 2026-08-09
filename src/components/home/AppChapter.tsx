import { useState } from "react";
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
  const sectionRef = useHomeChapterReveal("slide-right");
  const [activeTab, setActiveTab] = useState<"chat" | "mall" | "farm" | "park">("chat");

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

          {/* Farmers use the app for */}
          <div className="mt-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#143d31]/50">
              Farmers use the app for
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {farmersAskAbout.map((item) => {
                const Icon = item.icon;
                const isTabActive = activeTab === item.tab;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(item.tab)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-all duration-300 cursor-pointer ${
                      isTabActive
                        ? "bg-[#143d31] border-[#143d31] text-[#a3e635] scale-105"
                        : "bg-white border-[#143d31]/15 text-[#143d31] hover:bg-white hover:border-[#143d31]/30"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 transition-colors ${
                      isTabActive ? "text-[#a3e635]" : "text-[#5d7d37]"
                    }`} strokeWidth={1.8} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Steps */}
          <div className="mt-10 grid gap-6">
            {appSteps.map((step) => {
              const Icon = step.icon;
              const isTabActive = activeTab === step.tab;
              return (
                <div
                  key={step.title}
                  onClick={() => setActiveTab(step.tab)}
                  className="grid grid-cols-[40px_1fr] gap-3.5 border-t border-[#143d31]/12 pt-5 first:border-t-0 first:pt-0 transition-all duration-300 cursor-pointer"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                    isTabActive ? "bg-[#143d31] text-[#a3e635] shadow-md scale-105" : "bg-[#143d31] text-[#b7cf79]"
                  }`}>
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

          {/* Store badges */}
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className="inline-block transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143d31]"
            >
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="h-10 w-[135px] sm:h-12 sm:w-[162px]"
              />
            </a>
            <a
              href="https://apps.apple.com/us/app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              className="inline-block transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143d31]"
            >
              <img
                src={appStoreBadge}
                alt="Download on the App Store"
                className="h-10 w-[135px] sm:h-12 sm:w-[162px]"
              />
            </a>
          </div>
        </div>

        {/* Right — Interactive Agaate Phone OS App */}
        <div data-home-reveal className="relative mx-auto w-full flex justify-center lg:sticky lg:top-32 self-start h-max pb-12">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -inset-10 -z-10 flex items-center justify-center opacity-65 filter blur-3xl">
            <div className="h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-[#a3e635]/25 to-[#143d31]/30 animate-pulse" style={{ animationDuration: "5s" }} />
          </div>
          <InteractivePhoneApp activeTab={activeTab} onChangeTab={setActiveTab} />
        </div>
      </div>
    </section>
  );
}
