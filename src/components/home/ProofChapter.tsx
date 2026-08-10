import { useHomeChapterReveal } from "./useHomeChapterReveal";
import Testimonials from "@/components/ui/testimonials-13";

export default function ProofChapter() {
  const sectionRef = useHomeChapterReveal();

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative scroll-mt-28 overflow-hidden bg-[#f4f8f5] px-5 py-16 text-[#143d31] md:px-10 md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#143d31]/10" />

      <div className="mx-auto max-w-7xl">
        <div data-home-reveal className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Farmer Reviews &amp; Testimonials
            </p>
          </div>

          <div className="-mx-5 mt-6 md:-mx-10">
            <Testimonials />
          </div>
        </div>
      </div>
    </section>
  );
}
