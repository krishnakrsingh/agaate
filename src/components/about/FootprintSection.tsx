import { MapPin } from "lucide-react";
import { locations } from "./data";

export default function FootprintSection() {
  return (
    <section
      id="footprint"
      aria-labelledby="footprint-heading"
      className="border-b border-neutral-200 bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-forest">Where we work</p>
          <h2
            id="footprint-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-deep"
          >
            Three places. One ecosystem.
          </h2>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 md:grid-cols-3">
          {locations.map((loc) => (
            <div key={loc.name} className="bg-white p-6 md:p-8">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-forest/5 text-forest">
                <MapPin className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-neutral-500">
                {loc.tag}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-forest-deep">
                {loc.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{loc.address}</p>
              <p className="mt-4 text-xs text-neutral-400">{loc.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
