import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  GraduationCap,
  MapPin,
  X,
} from "@phosphor-icons/react";
import type { ExtendedJobPosition } from "@/data/careers-data";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

interface RoleDetailDrawerProps {
  role: ExtendedJobPosition | null;
  onClose: () => void;
  onApply: (role: ExtendedJobPosition) => void;
}

export function RoleDetailDrawer({ role, onClose, onApply }: RoleDetailDrawerProps) {
  if (!role) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end p-0 md:p-6">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-[#143d31]/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />

        {/* Drawer Panel */}
        <motion.div
          className="relative h-full max-h-screen w-full max-w-xl overflow-y-auto border-l border-[#143d31]/10 bg-[#f4f8f5] p-6 text-[#143d31] shadow-2xl md:rounded-3xl md:border md:p-8"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-5 top-5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#143d31]/15 bg-white text-[#143d31] shadow-xs transition-colors hover:bg-[#143d31]/5"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-6 pt-2 text-left">
            {/* Header tags & title */}
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#143d31] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#a3e635]">
                  {role.departmentCategory}
                </span>
                <span className="rounded-full border border-[#143d31]/15 bg-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#143d31]">
                  {role.dept}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] leading-tight">
                {role.title}
              </h3>

              <div className="mt-2.5 flex flex-wrap items-center gap-3 font-mono text-xs text-[#4f624f]">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" /> {role.loc}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-[#5d7d37]" /> {role.type}
                </span>
                {role.experienceLevel && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-[#5d7d37]" /> {role.experienceLevel}
                  </span>
                )}
              </div>
            </div>

            {/* Overview */}
            <div className="rounded-2xl border border-[#143d31]/10 bg-white p-5 shadow-xs">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                Position Overview
              </h4>
              <p className="mt-2 font-sans text-xs sm:text-sm leading-relaxed text-[#4f624f]">
                {role.desc}
              </p>
            </div>

            {/* Responsibilities */}
            {role.responsibilities && role.responsibilities.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                  Key Responsibilities
                </h4>
                <div className="space-y-2">
                  {role.responsibilities.map((resp) => (
                    <div
                      key={resp}
                      className="flex items-start gap-2.5 rounded-xl border border-[#143d31]/10 bg-white/70 p-3 text-xs leading-relaxed text-[#143d31]"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#5d7d37]" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {role.reqs && role.reqs.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                  Qualifications & Requirements
                </h4>
                <div className="space-y-2">
                  {role.reqs.map((req) => (
                    <div
                      key={req}
                      className="flex items-start gap-2.5 rounded-xl border border-[#143d31]/10 bg-white/70 p-3 text-xs leading-relaxed text-[#143d31]"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#5d7d37] shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Apply CTA Bar */}
            <div className="border-t border-[#143d31]/10 pt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer font-mono text-xs font-semibold text-[#4f624f] hover:text-[#143d31]"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onApply(role);
                }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#143d31] px-6 py-3 font-mono text-xs font-bold text-white shadow-sm transition-all hover:bg-[#1a4d3e]"
              >
                <span>Apply for this Role</span>
                <ArrowRight className="h-4 w-4 text-[#a3e635]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
