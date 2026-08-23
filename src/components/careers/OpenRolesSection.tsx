import { ArrowRight, Briefcase, GraduationCap, MapPin, Eye } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import type { CareerJob } from "@/lib/cms-types";
import { useSiteContact } from "@/contexts/SiteContactContext";

interface OpenRolesSectionProps {
  jobs: CareerJob[];
  sectionTitle: string;
  sectionSubtitle: string;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onSelectRole: (role: CareerJob) => void;
  onApplyDirect: (role: CareerJob) => void;
}

export function OpenRolesSection({
  jobs,
  sectionTitle,
  sectionSubtitle,
  filter,
  onFilterChange,
  onSelectRole,
  onApplyDirect,
}: OpenRolesSectionProps) {
  const { contact } = useSiteContact();
  const visibleJobs = jobs.filter((job) => filter === "All" || job.departmentCategory === filter);

  const getCount = (key: Filter) => {
    if (key === "All") return jobs.length;
    return jobs.filter((j) => j.departmentCategory === key).length;
  };

  return (
    <section id="open-roles" className="scroll-mt-28 space-y-8 sm:space-y-10">
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
              {sectionTitle}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4f624f] mt-1 leading-relaxed">
              {sectionSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
        {FILTERS.map((f) => {
          const isActive = filter === f.key;
          const count = getCount(f.key);
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onFilterChange(f.key)}
              className={`shrink-0 rounded-full border px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive
                  ? "border-[#143d31] bg-[#143d31] text-white"
                  : "border-[#143d31]/15 bg-white text-[#143d31] hover:border-[#143d31]/30"
              }`}
            >
              {f.label}
              <span className="ml-1.5 opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {visibleJobs.length === 0 ? (
        <p className="font-sans text-sm text-[#4f624f] py-8 text-center">
          No open positions in this category right now. Check back soon or email {contact.careersEmail}.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {visibleJobs.map((job, idx) => (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group flex flex-col justify-between rounded-2xl border border-[#143d31]/10 bg-white p-6 sm:p-7 shadow-2xs hover:border-[#143d31]/25 hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#143d31] text-[#a3e635]">
                    <Briefcase className="h-5 w-5" weight="duotone" />
                  </div>
                  <span className="rounded-full bg-[#5d7d37]/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                    {job.departmentCategory}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#143d31] tracking-tight">
                    {job.title}
                  </h3>
                  <p className="font-mono text-xs text-[#5d7d37] mt-1 font-semibold">{job.dept}</p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#4f624f] leading-relaxed line-clamp-3">
                  {job.desc}
                </p>

                <div className="flex flex-wrap gap-3 font-mono text-[10px] font-semibold text-[#4f624f] uppercase tracking-wide">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" />
                    {job.loc}
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-[#5d7d37]" />
                    {job.type}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={() => onSelectRole(job)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-[#143d31]/15 bg-[#f4f8f5] px-4 py-2.5 font-sans text-xs font-semibold text-[#143d31] hover:bg-white transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => onApplyDirect(job)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#143d31] px-4 py-2.5 font-sans text-xs font-semibold text-white hover:bg-[#1b4e3f] transition-colors"
                >
                  Apply
                  <ArrowRight className="h-3.5 w-3.5 text-[#a3e635]" weight="bold" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}

export default OpenRolesSection;
