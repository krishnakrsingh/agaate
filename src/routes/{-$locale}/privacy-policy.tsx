import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/common/SitePage";

export const Route = createFileRoute("/{-$locale}/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const sections = [
    {
      title: "Information we collect",
      body: "Contact details, farm location, crop profiles, and optional telemetry inputs you share through consultations, forms, or connected field devices.",
    },
    {
      title: "How we use farmer data",
      body: "To schedule agronomist support, tailor nursery and input recommendations, improve advisory models, and operate buyback or logistics programs you enroll in.",
    },
    {
      title: "Telemetry & field signals",
      body: "When IoT or survey data is linked to your account, it is used for advisory decisions and service delivery. We do not sell personal farm data.",
    },
    {
      title: "Your rights",
      body: "You may request access, correction, or deletion of personal information by contacting info@agaate.in. Some operational records may be retained where legally required.",
    },
  ];

  return (
    <SitePage
      eyebrow="PRIVACY POLICY"
      title={
        <>
          How we protect <span className="italic text-terracotta">your data.</span>
        </>
      }
      description="Information on data protection, farmer telemetry inputs, and user rights across Agaate digital and field services."
    >
      <div className="max-w-3xl space-y-10 text-left">
        {sections.map((section) => (
          <div key={section.title} className="border-b border-border pb-8 last:border-0">
            <h2 className="font-serif text-2xl font-bold text-forest-deep mb-3">{section.title}</h2>
            <p className="text-forest/75 text-sm md:text-base leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </SitePage>
  );
}
