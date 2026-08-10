import { Download } from "lucide-react";
import { brochureHref } from "./data";

export default function AboutHero() {
  return (
    <section className="border-b border-neutral-200 bg-white pt-28 md:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-14 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:pb-20">
        <div>
          <p className="text-sm font-medium text-forest">About Agaate</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight text-forest-deep md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Begin with strong roots.{" "}
            <span className="font-serif italic font-normal text-terracotta">
              Growing better tomorrow.
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-600 md:text-lg">
            Agaate empowers Indian farmers with science-backed, sustainable nursery solutions that
            build stronger crops from the very beginning.
          </p>
          <div className="mt-8">
            <a
              href={brochureHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-forest-deep px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
            >
              <Download className="h-4 w-4" strokeWidth={1.75} />
              Download Brochure
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 lg:aspect-[5/4]">
          <img
            src="/about-hero-nursery.png"
            alt="Rows of Bio-Boosted seedlings in Agaate's controlled nursery"
            className="h-full w-full object-cover object-center"
            width={960}
            height={768}
          />
        </div>
      </div>
    </section>
  );
}
