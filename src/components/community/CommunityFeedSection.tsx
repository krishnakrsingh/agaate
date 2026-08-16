import { CheckCircle, Heart } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/common/motion";
import { posts, PILLARS } from "./community-data";

export function CommunityFeedSection() {
  return (
    <>
      {/* 3 Pillars of Community */}
      <section id="community-pillars" className="scroll-mt-28">
        <SectionHeader
          align="center"
          eyebrow="SUPPORT INFRASTRUCTURE"
          title="Three Pillars of Agaate Parivaar."
          description="A complete ecosystem ensuring farmers are equipped with technical training, manufacturer inputs, and guaranteed market outlets."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {PILLARS.map((pil) => {
            const Icon = pil.icon;
            return (
              <div
                key={pil.number}
                className="flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:border-forest/40 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-terracotta">
                      PILLAR {pil.number}
                    </span>
                    <Icon className="h-6 w-6 text-forest" />
                  </div>
                  <h4 className="mt-4 font-serif text-2xl font-bold text-forest-deep">
                    {pil.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-forest/75">{pil.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Feed / Live Agronomy Posts */}
      <section id="community-feed" className="scroll-mt-28">
        <SectionHeader
          align="center"
          eyebrow="LIVE COMMUNITY DISCUSSIONS"
          title="Field Notes & Agronomy Bulletins."
          description="Real-time updates shared by regional field agronomists and Parivaar growers."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.author + post.time}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-forest/30"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif text-sm font-bold text-forest-deep">
                        {post.author}
                      </span>
                      {post.verified && <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />}
                    </div>
                    <span className="font-mono text-[10px] text-forest/50">{post.location}</span>
                  </div>
                  <span className="rounded-full bg-bone px-2.5 py-0.5 font-mono text-[9px] font-bold text-moss">
                    {post.crop}
                  </span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-forest/80">"{post.text}"</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-3 text-[10px] text-forest/50">
                <span>{post.time}</span>
                <span className="flex items-center gap-1 font-mono font-bold text-emerald-700">
                  <Heart className="h-3.5 w-3.5" /> {post.likes} Farmer Likes
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
