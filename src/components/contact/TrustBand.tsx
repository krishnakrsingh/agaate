import { useLocation } from "@tanstack/react-router";
import { useSiteContact } from "@/contexts/SiteContactContext";
import { Reveal } from "@/components/common/motion";

export default function TrustBand() {
  const location = useLocation();
  const isHindi =
    location.pathname === "/hi" || location.pathname.startsWith("/hi/");
  const lang = isHindi ? "hi" : "en";
  const { contact } = useSiteContact();
  const trustItems = contact.contactTrustStats.map((item) => ({
    label: lang === "hi" ? item.labelHi : item.labelEn,
    value: lang === "hi" ? item.valueHi : item.valueEn,
    hint: lang === "hi" ? item.hintHi : item.hintEn,
  }));

  return (
    <section
      aria-labelledby="trust-heading"
      className="border-t border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-10">
        <Reveal variant="fade-up" className="max-w-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              Why Reach Out
            </p>
          </div>
          <h2
            id="trust-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]"
          >
            Clear response times. Real places to visit.
          </h2>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#143d31]/10 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-[#143d31] tracking-tight">
                  {item.value}
                </p>
                <p className="mt-1 font-sans text-xs sm:text-sm text-[#4f624f]">
                  {item.hint}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
