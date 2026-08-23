import { ArrowRight, Briefcase, GraduationCap, MapPin } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { ExtendedJobPosition, jobs } from "@/data/careers-data";
import { FILTERS, type Filter } from "./careers-data";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

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
    <section id="open-roles" className="scroll-mt-28 space-y-10">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
            Opportunities
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.15]">
              Open Positions Across Verticals
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4f624f] mt-1.5 leading-relaxed">
              Explore vacancies across field agronomy, farm infrastructure, commerce, and agri-data telemetry.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => {
              const isActive = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => onFilterChange(f.key)}
                  className={`cursor-pointer rounded-full px-4 py-2 font-mono text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#143d31] text-[#a3e635] shadow-xs"
                      : "bg-white/80 border border-[#143d31]/10 text-[#143d31]/80 hover:border-[#143d31]/30 hover:bg-white"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleJobs.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="group flex flex-col justify-between rounded-3xl border border-[#143d31]/10 bg-white/70 p-6 sm:p-7 backdrop-blur-xs shadow-xs hover:border-[#143d31]/25 hover:shadow-md hover:bg-white transition-all duration-300"
          >
            <div className="space-y-4">
              {/* Dept & Type */}
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#143d31]/5 border border-[#143d31]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                  {job.dept}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                  {job.type}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-display text-xl font-bold text-[#143d31] group-hover:text-[#194c3d] transition-colors">
                  {job.title}
                </h3>
                <p className="mt-2 line-clamp-3 font-sans text-xs leading-relaxed text-[#4f624f]">
                  {job.desc}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 font-mono text-[11px] text-[#4f624f]">
                <span className="flex items-center gap-1 bg-[#143d31]/5 rounded-md px-2 py-1">
                  <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" /> {job.loc}
                </span>
                {job.experienceLevel && (
                  <span className="flex items-center gap-1 bg-[#143d31]/5 rounded-md px-2 py-1">
                    <GraduationCap className="h-3.5 w-3.5 text-[#5d7d37]" /> {job.experienceLevel}
                  </span>
                )}
              </div>
            </div>

            {/* Actions Bottom Bar */}
            <div className="mt-8 flex items-center justify-between border-t border-[#143d31]/10 pt-4">
              <button
                type="button"
                onClick={() => onSelectRole(job)}
                className="cursor-pointer font-mono text-xs font-bold text-[#143d31] hover:text-[#5d7d37] transition-colors"
              >
                View Details →
              </button>

              <button
                type="button"
                onClick={() => onApplyDirect(job)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#143d31] px-4 py-2 font-mono text-xs font-bold text-white transition-all hover:bg-[#1a4d3e] hover:shadow-xs"
              >
                <span>Apply</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#a3e635]" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
