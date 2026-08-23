import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  GraduationCap,
  MapPin,
  Sparkle,
  X,
  Buildings,
  ShieldCheck,
} from "@phosphor-icons/react";
import type { ExtendedJobPosition } from "@/data/careers-data";

interface RoleDetailDrawerProps {
  role: ExtendedJobPosition | null;
  onClose: () => void;
  onApply: (role: ExtendedJobPosition) => void;
}

export function RoleDetailDrawer({ role, onClose, onApply }: RoleDetailDrawerProps) {
  if (!role) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-[#143d31]/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#143d31]/10 bg-[#f4f8f5] p-6 sm:p-8 text-[#143d31] shadow-2xl z-10 space-y-6"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-5 top-5 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#143d31]/15 bg-white text-[#143d31] shadow-xs transition-all hover:bg-[#143d31]/10 hover:scale-105"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="space-y-3 pr-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#143d31] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#a3e635]">
                {role.departmentCategory}
              </span>
              <span className="rounded-full border border-[#143d31]/15 bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                {role.dept}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] leading-tight">
              {role.title}
            </h3>

            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#4f624f]">
              <span className="flex items-center gap-1 bg-white border border-[#143d31]/10 rounded-lg px-2.5 py-1">
                <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" /> {role.loc}
              </span>
              <span className="flex items-center gap-1 bg-white border border-[#143d31]/10 rounded-lg px-2.5 py-1">
                <Briefcase className="h-3.5 w-3.5 text-[#5d7d37]" /> {role.type}
              </span>
              {role.experienceLevel && (
                <span className="flex items-center gap-1 bg-white border border-[#143d31]/10 rounded-lg px-2.5 py-1">
                  <GraduationCap className="h-3.5 w-3.5 text-[#5d7d37]" /> {role.experienceLevel}
                </span>
              )}
            </div>

            {/* Highlights chips if available */}
            {role.highlights && role.highlights.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {role.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1 rounded-md bg-[#a3e635]/15 border border-[#5d7d37]/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#143d31]"
                  >
                    <Sparkle className="h-3 w-3 text-[#5d7d37]" />
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Position Overview Card */}
          <div className="rounded-2xl border border-[#143d31]/10 bg-white p-5 shadow-xs space-y-2">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
              Role Overview & Impact
            </h4>
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#4f624f]">
              {role.desc}
            </p>
          </div>

          {/* Key Responsibilities */}
          {role.responsibilities && role.responsibilities.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#143d31] flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#5d7d37]" />
                Key Responsibilities
              </h4>
              <div className="space-y-2">
                {role.responsibilities.map((resp) => (
                  <div
                    key={resp}
                    className="flex items-start gap-3 rounded-xl border border-[#143d31]/10 bg-white/75 p-3.5 text-xs leading-relaxed text-[#143d31]"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#5d7d37] shrink-0" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements & Qualifications */}
          {role.reqs && role.reqs.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#143d31] flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#5d7d37]" />
                Required Qualifications & Skills
              </h4>
              <div className="space-y-2">
                {role.reqs.map((req) => (
                  <div
                    key={req}
                    className="flex items-start gap-3 rounded-xl border border-[#143d31]/10 bg-white/75 p-3.5 text-xs leading-relaxed text-[#143d31]"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#5d7d37] shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why Agaate Perks */}
          <div className="rounded-2xl border border-[#143d31]/10 bg-white/50 p-4 sm:p-5">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#5d7d37]" />
              Why Join Agaate
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#4f624f]">
              <div>✓ Direct on-ground farmer impact</div>
              <div>✓ 17-acre smart nursery & R&D lab</div>
              <div>✓ Fast career progression & leadership</div>
              <div>✓ Competitive salary & travel allowances</div>
            </div>
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="border-t border-[#143d31]/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer font-mono text-xs font-semibold text-[#4f624f] hover:text-[#143d31] transition-colors"
            >
              ← Back to all openings
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onApply(role);
              }}
              className="w-full sm:w-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#143d31] px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#1a4d3e] hover:shadow-md hover:scale-105"
            >
              <span>Apply for this Role</span>
              <ArrowRight className="h-4 w-4 text-[#a3e635]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
