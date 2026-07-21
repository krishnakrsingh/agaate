import { ReactNode } from "react";

export function SectionEyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 font-jet text-[10px] font-semibold uppercase tracking-[0.2em] ${
        dark ? "text-[#B8F08F]" : "text-forest"
      }`}
    >
      <span className={`h-px w-8 ${dark ? "bg-[#B8F08F]/60" : "bg-forest/55"}`} />
      {children}
    </div>
  );
}
