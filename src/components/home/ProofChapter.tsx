import { useHomeChapterReveal } from "./useHomeChapterReveal";
import FarmerShortsShowcase from "./FarmerShortsShowcase";

export default function ProofChapter() {
  const sectionRef = useHomeChapterReveal();

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] px-5 py-8 sm:py-10 md:py-12 border-t border-[#143d31]/10 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl">
        <div data-home-reveal>
          <FarmerShortsShowcase />
        </div>
      </div>
    </section>
  );
}
