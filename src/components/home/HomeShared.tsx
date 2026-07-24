import type { ReactNode } from "react";
import { ArrowUpRight, Image } from "lucide-react";

export function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <p
      className={`font-jet text-[10px] font-semibold uppercase tracking-[0.18em] ${
        inverse ? "text-moss" : "text-[#477253]"
      }`}
    >
      {children}
    </p>
  );
}

export function TextAction({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 border-b pb-1 text-sm font-semibold transition-colors ${
        inverse
          ? "border-white/35 text-cream hover:border-moss/20 hover:text-moss"
          : "border-[#174735]/30 text-[#174735] hover:border-[#174735]"
      }`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export function ImagePlaceholder({
  label,
  detail,
  className = "",
}: {
  label: string;
  detail: string;
  className?: string;
}) {
  return (
    <div className={`flex min-h-64 items-end bg-[#DDEBCF] p-6 md:p-8 ${className}`}>
      <div>
        <Image className="h-5 w-5 text-[#174735]" strokeWidth={1.5} />
        <p className="mt-5 font-jet text-[9px] font-bold uppercase tracking-[0.16em] text-[#174735]">
          {label}
        </p>
        <p className="mt-2 max-w-xs text-sm leading-6 text-[#3D6547]">{detail}</p>
      </div>
    </div>
  );
}
