import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const practices = [
  { id: "drip", name: "Drip Irrigation", desc: "Cuts pumping energy and water waste.", value: 1.5 },
  {
    id: "tillage",
    name: "Zero Tillage",
    desc: "Keeps carbon locked in the soil structure.",
    value: 2.0,
  },
  {
    id: "bio",
    name: "Organic Bio-Inputs",
    desc: "Replaces chemical nitrogen emissions.",
    value: 1.8,
  },
  {
    id: "burning",
    name: "No Residue Burning",
    desc: "Returns biomass back to the field.",
    value: 1.2,
  },
  {
    id: "cover",
    name: "Cover Cropping",
    desc: "Builds organic soil carbon year-round.",
    value: 2.2,
  },
];

const MAX_CREDITS = practices.reduce((s, p) => s + p.value, 0); // 8.7
const RATE = 1200; // ₹ per tCO₂ estimate

export default function SectionSustainability() {
  const [selected, setSelected] = useState<string[]>(["drip", "tillage"]);
  const [displayCredits, setDisplayCredits] = useState(3.5);
  const [displayPayout, setDisplayPayout] = useState(3.5 * RATE);

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);

  const total = practices.filter((p) => selected.includes(p.id)).reduce((s, p) => s + p.value, 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current?.children || [],
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        ledgerRef.current,
        { opacity: 0, y: 44, rotate: 0.6 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ledgerRef.current, start: "top 88%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate gauge + numbers whenever total changes
  useEffect(() => {
    const C = 2 * Math.PI * 54;
    const obj = { c: displayCredits, p: displayPayout };
    const targetPayout = total * RATE;

    if (arcRef.current) {
      gsap.to(arcRef.current, {
        strokeDashoffset: C * (1 - total / MAX_CREDITS),
        duration: 0.7,
        ease: "power2.inOut",
      });
    }
    const tween = gsap.to(obj, {
      c: total,
      p: targetPayout,
      duration: 0.7,
      ease: "power2.out",
      onUpdate: () => {
        setDisplayCredits(obj.c);
        setDisplayPayout(obj.p);
      },
    });
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const C = 2 * Math.PI * 54;

  return (
    <section
      ref={sectionRef}
      className="bg-cream text-ink py-20 md:py-28 lg:py-32 px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center relative z-10">
        {/* Left copy */}
        <div className="lg:col-span-6" ref={leftRef}>
          <div className="flex items-center gap-6 border-t border-ink/10 pt-5 mb-8">
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest">
              04 / Carbon Credits
            </span>
            <span className="hidden md:block font-jet text-[11px] uppercase tracking-[0.22em] text-ink/40">
              Verified payout stream
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.08] text-forest-deep mb-6">
            Good farming pays. <span className="italic text-terracotta">Literally.</span>
          </h2>
          <p className="text-[#59635D] text-[16px] md:text-[18px] leading-[1.7] max-w-[560px] mb-10">
            Sustainable practices already save carbon. Agaate measures, verifies and monetises it —
            turning climate-smart farming into an annual payout with zero extra land.
          </p>
          <div className="border-t border-ink/10">
            <div className="flex items-baseline justify-between gap-4 py-5 border-b border-ink/10">
              <span className="font-sans font-semibold text-[15px] md:text-[16px]">
                1 carbon credit
              </span>
              <span className="font-jet text-xs md:text-sm text-forest text-right">
                = 1 tCO₂ · satellite + IoT verified
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-5 border-b border-ink/10">
              <span className="font-sans font-semibold text-[15px] md:text-[16px]">Payout</span>
              <span className="font-jet text-xs md:text-sm text-terracotta text-right">
                Direct bank transfer, post-audit
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-5 border-b border-ink/10">
              <span className="font-sans font-semibold text-[15px] md:text-[16px]">Paperwork</span>
              <span className="font-jet text-xs md:text-sm text-ink/50 text-right">
                Handled end-to-end by Agaate
              </span>
            </div>
          </div>
        </div>

        {/* Right: carbon ledger */}
        <div className="lg:col-span-6" ref={ledgerRef}>
          <div className="bg-night text-cream rounded-[1.8rem] border border-cream/10 p-6 md:p-9 shadow-[0_30px_90px_rgba(9,14,10,0.35)] relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-jet text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-emerald-400">
                  Practice Ledger
                </span>
                <span className="font-jet text-[10px] uppercase tracking-[0.18em] text-cream/40">
                  Toggle to estimate
                </span>
              </div>

              <div className="border-t border-cream/10 mb-7">
                {practices.map((p) => {
                  const isOn = selected.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() =>
                        setSelected((prev) =>
                          isOn ? prev.filter((x) => x !== p.id) : [...prev, p.id],
                        )
                      }
                      className={`w-full flex items-center gap-4 py-4 border-b border-cream/10 text-left px-2 -mx-2 transition-colors duration-300 ${isOn ? "bg-cream/[0.04]" : "hover:bg-cream/[0.02]"}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-[6px] border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isOn
                            ? "bg-terracotta border-terracotta text-cream"
                            : "border-cream/25 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span
                          className={`block font-sans font-bold text-[15px] md:text-[16px] transition-colors ${isOn ? "text-cream" : "text-cream/60"}`}
                        >
                          {p.name}
                        </span>
                        <span className="block text-[12px] md:text-[13px] text-cream/40 truncate">
                          {p.desc}
                        </span>
                      </span>
                      <span
                        className={`font-jet text-[11px] md:text-xs flex-shrink-0 transition-colors ${isOn ? "text-emerald-400" : "text-cream/25 line-through"}`}
                      >
                        +{p.value.toFixed(1)} tCO₂
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Gauge + payout */}
              <div className="flex items-center gap-6 md:gap-8">
                <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px] flex-shrink-0">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="8"
                    />
                    <circle
                      ref={arcRef}
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#34D399"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={C}
                      strokeDashoffset={C * (1 - 3.5 / MAX_CREDITS)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-[26px] md:text-[32px] leading-none text-emerald-400">
                      {displayCredits.toFixed(1)}
                    </span>
                    <span className="font-jet text-[8px] md:text-[9px] uppercase tracking-[0.18em] text-cream/45 mt-1">
                      tCO₂ / ha
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-jet text-[10px] uppercase tracking-[0.2em] text-cream/45 mb-2">
                    Estimated annual payout
                  </div>
                  <div className="font-serif text-[clamp(1.9rem,3.4vw,2.9rem)] leading-none text-cream">
                    ₹{Math.round(displayPayout).toLocaleString("en-IN")}
                    <span className="text-[15px] text-cream/45 font-sans"> /yr</span>
                  </div>
                  <div className="font-jet text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-emerald-400/80 mt-2.5">
                    @ ₹{RATE.toLocaleString("en-IN")} per tCO₂ · indicative
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
