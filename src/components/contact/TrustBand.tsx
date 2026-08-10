import { TRUST_ITEMS } from "./data";

export default function TrustBand() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="border-t border-neutral-200 bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-forest">Why reach out</p>
          <h2
            id="trust-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-deep"
          >
            Clear response times. Real places to visit.
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="bg-white p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {item.label}
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-forest-deep">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
