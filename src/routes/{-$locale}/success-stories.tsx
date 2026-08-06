import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/common/SitePage";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/{-$locale}/success-stories")({
  component: SuccessStories,
});

function SuccessStories() {
  const stories = [
    {
      grower: "Hawa Singh Yadav",
      location: "Jhajjar, Haryana",
      crop: "Tomato",
      result: "+28% transplant survival",
      summary:
        "Switched to bio-boosted plugs and stage-matched nutrition. Early blight pressure dropped after agronomist-guided spray timing.",
    },
    {
      grower: "Sunita Devi",
      location: "Rohtak cluster",
      crop: "Chilli",
      result: "18% lower input spend",
      summary:
        "Soil EC probes and drip scheduling cut over-fertilization while keeping flowering density consistent through peak heat.",
    },
    {
      grower: "Partner grower group",
      location: "Gurugram peri-urban",
      crop: "Capsicum",
      result: "Floor price secured",
      summary:
        "Contract buyback and graded logistics replaced mandi volatility, locking a clean price before transplant week.",
    },
  ];

  return (
    <SitePage
      eyebrow="SUCCESS STORIES"
      title={
        <>
          Yield gains from <span className="italic text-terracotta">partner growers.</span>
        </>
      }
      description="Case studies and crop yield optimization reports from growers working with Agaate nursery stock, advisory, and market linkage."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story) => (
          <article
            key={story.grower}
            className="p-8 rounded-[2.5rem] bg-card border border-border text-left flex flex-col justify-between min-h-[280px]"
          >
            <div>
              <span className="font-mono text-[9px] font-bold tracking-wider uppercase bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded">
                {story.crop}
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest-deep mt-5 mb-1">
                {story.grower}
              </h3>
              <p className="text-xs text-forest/50 font-mono mb-4">{story.location}</p>
              <p className="text-forest/70 text-sm leading-relaxed">{story.summary}</p>
            </div>
            <div className="mt-8 pt-4 border-t border-border/50 flex items-center gap-2 text-forest font-semibold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{story.result}</span>
            </div>
          </article>
        ))}
      </div>
    </SitePage>
  );
}
