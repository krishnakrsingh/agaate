import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type SitePageProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
};

export function SitePage({ eyebrow, title, description, children }: SitePageProps) {
  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            {eyebrow}
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {children ? (
        <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow">{children}</div>
      ) : null}

      <Footer />
    </main>
  );
}
