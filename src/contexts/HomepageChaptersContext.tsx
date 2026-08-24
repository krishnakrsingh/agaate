import { createContext, useContext, type ReactNode } from "react";
import type { HomepageChaptersContent } from "@/lib/cms-types";
import { HOMEPAGE_CHAPTERS_FALLBACK } from "@/data/homepage-chapters-fallback";

const HomepageChaptersContext = createContext<HomepageChaptersContent | null>(null);

export function HomepageChaptersProvider({
  content,
  children,
}: {
  content: HomepageChaptersContent;
  children: ReactNode;
}) {
  return (
    <HomepageChaptersContext.Provider value={content}>{children}</HomepageChaptersContext.Provider>
  );
}

export function useHomepageChapters(): HomepageChaptersContent {
  const ctx = useContext(HomepageChaptersContext);
  return ctx ?? HOMEPAGE_CHAPTERS_FALLBACK;
}
