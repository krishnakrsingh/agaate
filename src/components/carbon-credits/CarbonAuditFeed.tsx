import { CheckCircle, ShieldCheck } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/common/motion";

export function CarbonAuditFeed() {
  const auditsList = [
    {
      date: "Jun 15, 2026",
      type: "Sentinel-2 Orbit Satellite Scan",
      status: "Verified",
      desc: "Zero crop residue burning detected across Jhajjar Block C. Cover biomass canopy coverage confirmed at 86%.",
    },
    {
      date: "Jul 02, 2026",
      type: "Soil Organic Carbon Lab Test",
      status: "Verified",
      desc: "Soil Organic Carbon (SOC) baseline verified at 1.45% density (Gurugram Kukrola Zone).",
    },
    {
      date: "Sep 15, 2026",
      type: "Payout Settlement Schedule",
      status: "Scheduled",
      desc: "Next seasonal bank direct credit batch processing cycle post-harvest audit verification.",
    },
  ];

  return (
    <section id="audit-feed" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="AUDIT & VERIFICATION TRANSPARENCY"
        title="Live MRV Integrity Feed."
        description="Immutable record of satellite audits, soil organic carbon testing assays, and seasonal payout settlement cycles."
      />

      <div className="mt-12 space-y-4">
        {auditsList.map((audit) => (
          <div
            key={audit.date + audit.type}
            className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-forest/30 sm:flex-row sm:items-center"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-moss">{audit.date}</span>
                <span className="rounded-full bg-emerald-100 px-3 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                  {audit.status}
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-forest-deep">{audit.type}</h4>
              <p className="text-xs leading-relaxed text-forest/70">{audit.desc}</p>
            </div>
            <ShieldCheck className="h-8 w-8 shrink-0 text-forest/40" />
          </div>
        ))}
      </div>
    </section>
  );
}
