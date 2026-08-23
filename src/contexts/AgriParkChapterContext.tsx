import { createContext, useContext, type ReactNode } from "react";
import type { HomeAgriParkChapterContent } from "@/lib/cms-types";
import { AGRI_PARK_CHAPTER_FALLBACK } from "@/data/agri-park-chapter-fallback";

const AgriParkChapterContext = createContext<HomeAgriParkChapterContent | null>(null);

export function AgriParkChapterProvider({
  content,
  children,
}: {
  content: HomeAgriParkChapterContent;
  children: ReactNode;
}) {
  return <AgriParkChapterContext.Provider value={content}>{children}</AgriParkChapterContext.Provider>;
}

export function useAgriParkChapter(): HomeAgriParkChapterContent {
  const ctx = useContext(AgriParkChapterContext);
  return ctx ?? AGRI_PARK_CHAPTER_FALLBACK;
}
