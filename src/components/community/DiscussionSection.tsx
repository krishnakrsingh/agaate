import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, MessageSquare, ShieldCheck, User } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/common/motion";
import { posts } from "./community-data";

export default function DiscussionSection() {
  const [activeCrop, setActiveCrop] = useState("All");
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const filteredPosts = posts.filter((p) => activeCrop === "All" || p.crop === activeCrop);

  const likePost = (author: string, base: number) => {
    setLikes((prev) => ({ ...prev, [author]: (likes[author] ?? base) + 1 }));
    setLiked((prev) => ({ ...prev, [author]: !prev[author] }));
  };

  return (
    <section id="community-feed" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Grower Feed"
            title="Discussion Board"
            description="Share telemetry data observations, check active agronomy disease advisories, and learn from fellow Parivaar farmers."
          />
          <Reveal variant="fade-left" delay={0.1} className="shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {["All", "Tomato", "Chilli", "Irrigation"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCrop(c)}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 font-mono text-[9px] font-bold transition-all duration-300 ${
                    activeCrop === c
                      ? "border-forest bg-forest text-cream"
                      : "border-border bg-card text-forest/70 hover:border-forest"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                key={`${post.author}-${post.crop}`}
                layout
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                whileHover={{ y: -6 }}
                className="flex flex-col justify-between space-y-4 rounded-[2rem] border border-border bg-card p-6 text-left shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-forest/10 bg-forest/5 text-forest">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-forest-deep">{post.author}</span>
                          {post.verified && (
                            <span className="flex items-center gap-0.5 rounded border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 font-mono text-[8px] font-bold text-emerald-600">
                              <ShieldCheck className="h-2.5 w-2.5" /> Verified
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[10px] text-forest/40">
                          {post.location} · {post.time}
                        </span>
                      </div>
                    </div>
                    <span className="rounded border border-border bg-[#F9FAF9] px-2.5 py-1 font-mono text-[9px] font-bold text-forest">
                      {post.crop.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-forest-deep/80 md:text-sm">
                    {post.text}
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-border/50 pt-3 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => likePost(post.author, post.likes)}
                    className={`flex cursor-pointer items-center gap-1.5 transition-colors ${
                      liked[post.author]
                        ? "text-terracotta"
                        : "text-forest/50 hover:text-terracotta"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${liked[post.author] ? "fill-current" : ""}`} />
                    <span>{likes[post.author] ?? post.likes}</span>
                  </button>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1.5 text-forest/50 transition-colors hover:text-forest"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
