import { Star } from "lucide-react";
import { Marquee, Reveal, SectionHeader } from "@/components/common/motion";
import { TESTIMONIALS, type Testimonial } from "./community-data";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className={`w-[320px] shrink-0 whitespace-normal rounded-[2rem] border p-6 shadow-sm md:w-[400px] ${
        testimonial.featured
          ? "border-terracotta/30 bg-forest-deep text-cream"
          : "border-border bg-card"
      }`}
    >
      <div className="flex gap-0.5 text-terracotta">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p
        className={`mt-4 font-serif text-lg leading-relaxed ${testimonial.featured ? "text-cream" : "text-forest-deep"}`}
      >
        “{testimonial.quote}”
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full font-serif text-xs font-bold ${
            testimonial.featured ? "bg-moss text-forest-deep" : "bg-forest-deep text-moss"
          }`}
        >
          {testimonial.name
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </div>
        <div>
          <p
            className={`text-xs font-bold ${testimonial.featured ? "text-cream" : "text-forest-deep"}`}
          >
            {testimonial.name}
          </p>
          <p
            className={`text-[10px] font-semibold ${testimonial.featured ? "text-moss" : "text-forest/50"}`}
          >
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bone py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          align="center"
          eyebrow="Voices from the Field"
          title={
            <>
              Rated by the people who <span className="italic text-terracotta">grow with us.</span>
            </>
          }
          description="Real feedback from Parivaar farmers and visitors — the trust that keeps the community growing."
        />
      </div>
      <Reveal variant="fade-up" amount={0.1} className="mt-12">
        <Marquee duration={42} className="-rotate-1">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </Marquee>
      </Reveal>
      <Reveal variant="fade-up" amount={0.1} className="mt-8">
        <Marquee duration={48} reverse className="rotate-1">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={`rev-${t.name}`} testimonial={t} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
