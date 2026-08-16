import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  GraduationCap,
  MapPin,
  X,
} from "@phosphor-icons/react";
import { EASE } from "@/components/common/motion";
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
      <div className="fixed inset-0 z-50 flex items-center justify-end p-0 md:p-6">
        <motion.div
          className="absolute inset-0 bg-forest-deep/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
        />
        <motion.div
          className="relative h-full max-h-screen w-full max-w-xl overflow-y-auto border-l border-border bg-cream p-6 shadow-2xl md:rounded-[2.5rem] md:border md:p-10"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-forest/70 shadow-sm transition-colors hover:bg-forest/10 hover:text-forest-deep"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-6 pt-2 text-left">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-forest px-3 py-1 font-jet text-[9px] font-bold uppercase tracking-wider text-cream">
                  {role.departmentCategory}
                </span>
                <span className="rounded-full border border-forest/20 bg-forest/5 px-3 py-1 font-jet text-[9px] font-bold uppercase tracking-wider text-forest">
                  {role.dept}
                </span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-forest-deep md:text-4xl">
                {role.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-4 font-jet text-xs text-forest/60">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-terracotta" /> {role.loc}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-forest" /> {role.type}
                </span>
                {role.experienceLevel && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-moss" /> {role.experienceLevel}
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                Position Overview
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-forest/80">{role.desc}</p>
            </div>

            {role.responsibilities && role.responsibilities.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-jet text-[10px] font-bold uppercase tracking-widest text-forest">
                  Key Responsibilities
                </h4>
                <div className="space-y-2">
                  {role.responsibilities.map((resp) => (
                    <div
                      key={resp}
                      className="flex items-start gap-3 rounded-xl border border-border/80 bg-bone/60 p-3.5 text-xs text-forest-deep"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-jet text-[10px] font-bold uppercase tracking-widest text-moss">
                Candidate Requirements
              </h4>
              <div className="space-y-2">
                {role.reqs.map((req) => (
                  <div
                    key={req}
                    className="flex items-start gap-3 rounded-xl border border-border/80 bg-card p-3.5 text-xs text-forest-deep"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl border border-border bg-card px-5 py-3 font-jet text-xs font-bold uppercase tracking-wider text-forest/70 hover:text-forest-deep"
              >
                Close Drawer
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onApply(role);
                }}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-forest-deep px-6 py-3 font-jet text-xs font-bold uppercase tracking-wider text-cream shadow-md transition-colors hover:bg-forest"
              >
                <span>Apply for Position</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
