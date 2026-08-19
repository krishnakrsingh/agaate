import { TRUST_ITEMS } from "./data";

export default function TrustBand() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="bg-[#f4f8f5] text-[#143d31] py-12 sm:py-16 border-t border-[#143d31]/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                02 · Verified Response Commitments
              </p>
            </div>
            <h2
              id="trust-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#143d31]"
            >
              Clear Response Times. Real Places to Visit.
            </h2>
          </div>
        </div>

        {/* Card-less Hairline Metrics Ledger */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10 py-6">
          {TRUST_ITEMS.map((item, idx) => (
            <div
              key={item.label}
              className={`space-y-1 text-left ${
                idx === 0
                  ? "sm:pr-6"
                  : idx === TRUST_ITEMS.length - 1
                  ? "sm:pl-6 pt-4 sm:pt-0"
                  : "sm:px-6 pt-4 sm:pt-0"
              }`}
            >
              <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                {item.label}
              </p>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                {item.value}
              </p>
              <p className="font-sans text-xs text-[#4f624f]">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
