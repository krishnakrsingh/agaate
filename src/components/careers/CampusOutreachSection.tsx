import { ArrowRight, EnvelopeSimple, GraduationCap } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { CAMPUS_SKILLS } from "./careers-data";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

export function CampusOutreachSection() {
  return (
    <section id="campus" className="scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-[#143d31]/10 bg-[#143d31] text-white p-8 sm:p-12 lg:p-14 shadow-lg"
      >
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#a3e635]/15 blur-3xl" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#a3e635]" aria-hidden="true" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#a3e635]">
                University Collaborations & Internships
              </p>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-[1.15]">
              Campus Hiring & Field Research Fellowships.
            </h3>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80 max-w-xl">
              We partner with premier agricultural universities and engineering institutes across India to
              provide students and fresh graduates with hands-on immersion in smart nurseries, automated
              fertigation, and precision agronomy.
            </p>

            {/* Focus areas */}
            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {CAMPUS_SKILLS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xs"
                  >
                    <Icon className="h-5 w-5 text-[#a3e635]" weight="duotone" />
                    <span className="font-mono text-[11px] font-semibold text-white/90">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Placement Card */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-7 text-center backdrop-blur-md lg:col-span-5">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a3e635] text-[#143d31]">
              <GraduationCap className="h-6 w-6" weight="fill" />
            </div>

            <h4 className="font-display text-xl font-bold text-white">
              University Placement Cell?
            </h4>
            <p className="mt-1.5 font-sans text-xs text-white/75 leading-relaxed">
              Invite Agaate for on-campus presentations, technical seminars, and graduate recruitment drives.
            </p>

            <div className="mt-6">
              <SlideUpPillButton
                href="mailto:careers@agaate.in?subject=Campus%20Recruitment%20Inquiry%20%E2%80%94%20Agaate"
                variant="lime"
                size="md"
                fullWidth
                label="Contact Campus Team"
                icon={<EnvelopeSimple className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
