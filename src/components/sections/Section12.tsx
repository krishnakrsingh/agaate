import { ArchTransition } from "./SectionTransitions";

/* 11. FINAL CALL-TO-ACTION SECTION */
export default function Section12() {
  return (
    <>
      <ArchTransition topColor="#F8FAF7" bottomColor="#17211B" />
      <section id="cta-section" className="bg-[#17211B] py-24 lg:py-32 px-6 lg:px-12 text-cream text-center relative overflow-hidden">
        {/* Ambient background glowing orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-forest/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-forest/40 border border-cream/20 text-cream font-mono text-xs tracking-widest uppercase mb-6">
            START YOUR TRANSFORMATION
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] md:text-[50px] lg:text-[58px] font-bold mb-6 leading-[1.1] tracking-[-0.03em] text-cream">
            Ready to grow with <span className="text-emerald-400">confidence?</span>
          </h2>
          <p className="text-cream/80 text-[16px] md:text-[19px] font-normal leading-[1.7] max-w-[640px] mx-auto mb-10">
            From choosing the right seed to reaching the right institutional buyer, Agaate supports your complete vegetable crop journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:9487263498"
              className="rounded-full bg-yellow-400 text-forest-deep hover:bg-white hover:text-forest-deep px-9 py-4.5 text-[16px] font-bold tracking-[-0.005em] transition-all duration-300 shadow-xl hover:scale-105"
            >
              Start Your Journey Today →
            </a>
            <button className="rounded-full border border-cream/30 hover:border-cream/70 hover:bg-white/10 px-9 py-4.5 text-[16px] font-semibold tracking-[-0.005em] transition-all duration-300">
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
