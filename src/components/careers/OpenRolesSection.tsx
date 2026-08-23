import { ArrowRight, Briefcase, GraduationCap, MapPin, Eye } from "@phosphor-icons/react";
import { motion } from "framer-motion";
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

  const getCount = (key: Filter) => {
    if (key === "All") return jobs.length;
    return jobs.filter((j) => j.departmentCategory === key).length;
  };

  return (
    <section id="open-roles" className="scroll-mt-28 space-y-8 sm:space-y-10">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
            Opportunities
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.15]">
              Open Positions Across Verticals
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4f624f] mt-1 leading-relaxed">
              Click on any role to view detailed responsibilities, qualifications, and benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Refined Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-white/80 p-1.5 border border-[#143d31]/10 shadow-2xs backdrop-blur-xs">
          {FILTERS.map((f) => {
            const isActive = filter === f.key;
            const count = getCount(f.key);

            return (
              <button
                key={f.key}
                type="button"
                onClick={() => onFilterChange(f.key)}
                className={`group flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono font-bold transition-all ${
                  isActive
                    ? "bg-[#143d31] text-[#a3e635] shadow-xs"
                    : "text-[#143d31]/75 hover:text-[#143d31] hover:bg-[#143d31]/5"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-[#a3e635] text-[#143d31]"
                      : "bg-[#143d31]/10 text-[#143d31]/80 group-hover:bg-[#143d31]/15"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Jobs Grid: Entire card is clickable */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleJobs.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            onClick={() => onSelectRole(job)}
            className="group relative flex flex-col justify-between rounded-3xl border border-[#143d31]/10 bg-white/80 p-6 sm:p-7 backdrop-blur-xs shadow-xs hover:border-[#143d31]/30 hover:shadow-lg hover:bg-white hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="space-y-4">
              {/* Dept Tag & Full-Time Type */}
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
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-[#4f624f]">
                <span className="flex items-center gap-1 bg-[#143d31]/5 rounded-md px-2.5 py-1">
                  <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" /> {job.loc}
                </span>
                {job.experienceLevel && (
                  <span className="flex items-center gap-1 bg-[#143d31]/5 rounded-md px-2.5 py-1">
                    <GraduationCap className="h-3.5 w-3.5 text-[#5d7d37]" /> {job.experienceLevel}
                  </span>
                )}
              </div>
            </div>

            {/* Actions Bottom Bar */}
            <div className="mt-8 flex items-center justify-between border-t border-[#143d31]/10 pt-4">
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#143d31] group-hover:text-[#5d7d37] transition-colors">
                <Eye className="h-3.5 w-3.5" />
                <span>View Details</span>
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onApplyDirect(job);
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#143d31] px-4 py-2 font-mono text-xs font-bold text-white shadow-xs transition-all hover:bg-[#1a4d3e] hover:shadow-md hover:scale-105"
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
