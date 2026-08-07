import {
  ArrowRight,
  Battery,
  Bell,
  Bug,
  Camera,
  CheckCircle2,
  Leaf,
  MessageCircle,
  Phone,
  Signal,
  Smartphone,
  Sprout,
  TestTube,
  Wheat,
  Wifi,
} from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import InteractivePhoneApp from "./InteractivePhoneApp";

const appSteps = [
  {
    icon: Camera,
    title: "Send a crop photo or describe the problem",
    text: "Leaf spots, fruit damage, yellowing, pest attack — share it directly from the field.",
  },
  {
    icon: MessageCircle,
    title: "A real agronomist responds",
    text: "Not a bot. A qualified expert gives specific advice for your crop, stage, soil, and weather.",
  },
  {
    icon: Bell,
    title: "Stay ahead with stage-wise alerts",
    text: "Fertigation timing, preventive care, irrigation, harvest readiness — get guidance before losses begin.",
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
  const sectionRef = useHomeChapterReveal();
  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  return (
    <section
      ref={sectionRef}
      id="agaate-app"
      className="relative scroll-mt-28 overflow-hidden bg-[#eaf0df] px-5 pt-24 pb-14 md:px-10 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* Left — content */}
        <div data-home-reveal className="relative z-10">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-[1px] bg-[#5d7d37]/50" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Talk to agronomist — mobile app
            </p>
          </div>
          <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-[#143d31] leading-[1.08] md:text-4xl lg:text-5xl">
            Whatever the crop problem —{" "}
            <span className="font-serif italic font-normal text-[#5d7d37]">
              a real expert gives you a specific answer.
            </span>
          </h2>
          <p className="font-sans mt-4 max-w-2xl text-sm leading-relaxed text-[#4f624f] font-normal md:text-base">
            Whether it is a disease you cannot identify, a new season to plan, or an input decision
            you are unsure about — the Agaate app connects you directly to an agronomist.
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:9487263498"
              className="font-sans inline-flex items-center justify-center gap-2 rounded-full bg-[#143d31] px-8 py-4 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#143d31]/20 tracking-wide uppercase"
            >
              <Phone className="h-4 w-4" />
              Download the App
            </a>
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
        <div data-home-reveal className="relative mx-auto w-full flex justify-center">
          <InteractivePhoneApp />
        </div>
      </div>
    </section>
  );
}
