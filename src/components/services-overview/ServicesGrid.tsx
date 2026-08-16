import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { EASE, SectionHeader, TiltCard } from "@/components/common/motion";
import { getLocalizedPath } from "@/lib/i18n";
import { SERVICES, type ServiceCategory } from "./services-overview-data";

export function ServicesGrid({ currentLang }: { currentLang: string }) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");

  const categories = [
    { id: "all" as const, label: "All Services (6)" },
    { id: "nursery-inputs" as const, label: "Nursery & Inputs" },
    { id: "advisory-tech" as const, label: "Advisory & AI Tech" },
    { id: "scale-infra" as const, label: "Scale & Infrastructure" },
    { id: "buyback" as const, label: "Buyback & Market Linkage" },
  ];

  const filteredServices =
    activeCategory === "all" ? SERVICES : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services-grid" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="OUR FULL SERVICE ECOSYSTEM"
        title="Six Pillars of Agricultural Mastery."
        description="One connected AgTech platform replacing dealer guesswork with science-backed solutions at every step of your crop cycle."
      />

      {/* Category Filter Tabs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`relative cursor-pointer rounded-full px-5 py-2.5 font-mono text-xs font-bold transition-all ${
                isActive
                  ? "text-cream shadow-md"
                  : "border border-border bg-card text-forest/70 hover:border-forest/40"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="service-cat-pill"
                  className="absolute inset-0 rounded-full bg-forest-deep"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Service Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <TiltCard key={service.id} maxTilt={9} className="h-full">
                <Link
                  to={getLocalizedPath(service.href, currentLang) as never}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-[2.2rem] border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-forest/40 hover:shadow-xl"
                >
                  <div className="relative z-10">
                    {/* Card Header */}
                    <div className="mb-6 flex items-start justify-between">
                      <motion.div
                        whileHover={{ rotate: -10, scale: 1.1 }}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-forest/15 bg-bone text-forest transition-colors duration-300 group-hover:bg-forest-deep group-hover:text-cream"
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>

                      {/* Badge Stat */}
                      <div className="text-right">
                        <span className="block font-serif text-2xl font-bold leading-none text-terracotta">
                          {service.badgeStat}
                        </span>
                        <span className="font-mono text-[9px] font-semibold uppercase tracking-tight text-forest/50">
                          {service.badgeLabel}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <span className="mb-2 inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-moss">
                      {service.tag}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-forest-deep transition-colors group-hover:text-forest">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-forest/75">{service.desc}</p>

                    {/* Highlights List */}
                    <ul className="mt-6 space-y-2 border-t border-border/60 pt-4">
                      {service.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs font-medium text-forest/80"
                        >
                          <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer Button */}
                  <div className="relative z-10 mt-8 flex items-center justify-between border-t border-border/60 pt-4 font-mono text-xs font-bold text-forest">
                    <span>EXPLORE VERTICAL</span>
                    <motion.span
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-bone transition-colors group-hover:bg-terracotta group-hover:text-cream"
                      whileHover={{ x: 4 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </div>
                </Link>
              </TiltCard>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
