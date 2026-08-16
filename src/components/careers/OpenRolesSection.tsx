import { useState } from "react";
import { ArrowRight, Briefcase, GraduationCap, MapPin } from "@phosphor-icons/react";
import { SectionHeader, TiltCard } from "@/components/common/motion";
import { ExtendedJobPosition, jobs } from "@/data/careers-data";
import { FILTERS, type Filter } from "./careers-data";

interface OpenRolesSectionProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onSelectRole: (role: ExtendedJobPosition) => void;
  onApplyDirect: (role: ExtendedJobPosition) => void;
}

export function OpenRolesSection({
  filter,
  onFilterChange,
  onSelectRole,
  onApplyDirect,
}: OpenRolesSectionProps) {
  const visibleJobs = jobs.filter((job) => filter === "All" || job.departmentCategory === filter);

  return (
    <section id="open-roles" className="scroll-mt-28">
      <SectionHeader
        eyebrow="CURRENT VACANCIES"
        title="Open Positions Across Verticals"
        description="Join our multidisciplinary team of field agronomists, systems engineers, and operations managers."
        align="center"
        className="mx-auto"
      />

      {/* Filter Tabs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(f)}
            className={`cursor-pointer rounded-full px-6 py-2.5 font-jet text-xs font-bold transition-all ${
              filter === f
                ? "bg-forest-deep text-cream shadow-md"
                : "border border-border bg-card text-forest/70 hover:border-forest/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleJobs.map((job) => (
          <TiltCard key={job.id} maxTilt={7} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-forest/10 bg-card p-7 shadow-sm transition-all hover:border-forest/30 hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-bone px-3 py-1 font-jet text-[9px] font-bold uppercase text-moss">
                    {job.dept}
                  </span>
                  <span className="font-jet text-[10px] text-forest/50">{job.type}</span>
                </div>

                <h4 className="mt-4 font-serif text-2xl font-bold text-forest-deep">{job.title}</h4>
                <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-forest/75">
                  {job.desc}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 font-jet text-[11px] text-forest/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-terracotta" /> {job.loc}
                  </span>
                  {job.experienceLevel && (
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5 text-forest" /> {job.experienceLevel}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => onSelectRole(job)}
                  className="cursor-pointer font-jet text-xs font-bold text-forest hover:text-terracotta"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => onApplyDirect(job)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full bg-forest-deep px-4 py-2 font-jet text-xs font-bold text-cream shadow-sm hover:bg-forest"
                >
                  <span>Apply</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
