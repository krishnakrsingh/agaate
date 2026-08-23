import { createContext, useContext, type ReactNode } from "react";
import type { ContactPageContent } from "@/lib/cms-types";
import { CONTACT_PAGE_FALLBACK } from "@/data/contact-page-fallback";

const ContactPageContext = createContext<ContactPageContent | null>(null);

export function ContactPageProvider({
  content,
  children,
}: {
  content: ContactPageContent;
  children: ReactNode;
}) {
  return <ContactPageContext.Provider value={content}>{children}</ContactPageContext.Provider>;
}

export function useContactPage(): ContactPageContent {
  const ctx = useContext(ContactPageContext);
  return ctx ?? CONTACT_PAGE_FALLBACK;
}
