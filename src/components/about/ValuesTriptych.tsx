import { guarantees } from "./data";

export default function ValuesTriptych() {
  return (
    <section
      id="values"
      aria-labelledby="values-heading"
      className="border-b border-neutral-200 bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-forest">What we stand for</p>
          <h2
            id="values-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-deep"
          >
            Organic. Sustainable. High quality.
          </h2>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 md:grid-cols-3">
          {guarantees.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.title} className="bg-white p-6 md:p-8">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-forest/5 text-forest">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-forest-deep">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{g.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
