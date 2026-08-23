import { createContext, useContext, type ReactNode } from "react";
import type { AboutPageContent } from "@/lib/cms-types";
import { ABOUT_PAGE_FALLBACK } from "@/data/about-page-fallback";

const AboutPageContext = createContext<AboutPageContent | null>(null);

export function AboutPageProvider({
  content,
  children,
}: {
  content: AboutPageContent;
  children: ReactNode;
}) {
  return <AboutPageContext.Provider value={content}>{children}</AboutPageContext.Provider>;
}

export function useAboutPage(): AboutPageContent {
  const ctx = useContext(AboutPageContext);
  return ctx ?? ABOUT_PAGE_FALLBACK;
}

export function useAboutLang(): "en" | "hi" {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path === "/hi" || path.startsWith("/hi/")) return "hi";
  }
  return "en";
}
