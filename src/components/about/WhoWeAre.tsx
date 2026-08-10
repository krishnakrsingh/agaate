import { mission, whoWeAre } from "./data";

export default function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="border-b border-neutral-200 bg-white py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100 sm:aspect-[5/4] lg:aspect-[4/5]">
          <img
            src={whoWeAre.image}
            alt={whoWeAre.imageAlt}
            className="h-full w-full object-cover"
            width={800}
            height={1000}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-forest">{whoWeAre.eyebrow}</p>
          <h2
            id="who-we-are-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-deep md:text-4xl"
          >
            {whoWeAre.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
            {whoWeAre.body}
          </p>
          <p className="mt-6 border-l-2 border-forest/30 pl-4 font-serif text-lg italic leading-snug text-forest-deep md:text-xl">
            {whoWeAre.pullQuote}
          </p>
          <div className="mt-10 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">
              {mission.eyebrow}
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-forest-deep md:text-2xl">
              {mission.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{mission.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
