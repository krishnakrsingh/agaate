import { ArrowRight, BookOpen } from "@phosphor-icons/react";
import { MagneticButton, SectionHeader } from "@/components/common/motion";
import { CAMPUS_SKILLS } from "./careers-data";

export function CampusOutreachSection() {
  return (
    <section id="campus" className="scroll-mt-28">
      <div className="relative overflow-hidden rounded-[3rem] border border-border bg-bone p-8 shadow-sm md:p-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-moss">
              UNIVERSITY COLLABORATIONS
            </span>
            <h3 className="font-serif text-3xl font-bold text-forest-deep md:text-5xl">
              Campus Hiring & Field Research Internships.
            </h3>
            <p className="text-sm leading-relaxed text-forest/80">
              We partner with premier agricultural universities and engineering institutes across
              India to provide hands-on experience in sterile plug nursery operations, IoT sensor
              mesh deployment, and agronomic advisory.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {CAMPUS_SKILLS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center"
                  >
                    <Icon className="h-5 w-5 text-forest" />
                    <span className="font-jet text-[11px] font-bold text-forest-deep">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-forest/15 bg-forest-deep p-8 text-center text-cream lg:col-span-5">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-terracotta" />
            <h4 className="font-serif text-2xl font-bold">University Placement Cell?</h4>
            <p className="mt-2 text-xs leading-relaxed text-cream/70">
              Invite Agaate for on-campus technical presentations and graduate recruitment drives.
            </p>

            <a
              href="mailto:careers@agaate.in?subject=Campus%20Recruitment%20Inquiry"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-terracotta py-3.5 font-jet text-xs font-bold uppercase tracking-wider text-cream shadow-md transition-colors hover:bg-terracotta/90"
            >
              <span>Connect with Talent Team</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
