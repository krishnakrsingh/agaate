import { useHomeChapterReveal } from "./useHomeChapterReveal";
import FarmerShortsShowcase from "./FarmerShortsShowcase";
import type { HomeCmsStory } from "@/lib/cms-types";

export default function ProofChapter({
  storiesEn,
  storiesHi,
}: {
  storiesEn?: HomeCmsStory[];
  storiesHi?: HomeCmsStory[];
}) {
  const sectionRef = useHomeChapterReveal();

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative scroll-mt-28 overflow-hidden bg-[#f4f8f5] px-5 py-12 md:px-10 md:py-16 border-t border-[#143d31]/10 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl">
        <div data-home-reveal>
          <FarmerShortsShowcase storiesEn={storiesEn} storiesHi={storiesHi} />
        </div>
      </div>
    </section>
  );
}
