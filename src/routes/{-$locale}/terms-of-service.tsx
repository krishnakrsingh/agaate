import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/common/SitePage";

export const Route = createFileRoute("/{-$locale}/terms-of-service")({
  component: TermsOfService,
});

function TermsOfService() {
  const sections = [
    {
      title: "Seedling pre-booking",
      body: "Nursery reservations are subject to crop calendar capacity, variety availability, and confirmed payment or deposit terms shared at booking.",
    },
    {
      title: "Purchase & delivery",
      body: "Products and services are supplied according to the order confirmation. Transit care guidelines must be followed to preserve transplant quality.",
    },
    {
      title: "Buyback programs",
      body: "Contract buybacks depend on agreed quality grades, volumes, and pickup windows. Pricing and acceptance criteria are set in the program agreement.",
    },
    {
      title: "Advisory scope",
      body: "Agronomist guidance reflects available field data and regional conditions. Outcomes still depend on weather, execution, and grower practices.",
    },
  ];

  return (
    <SitePage
      eyebrow="TERMS OF SERVICE"
      title={
        <>
          Clear terms for <span className="italic text-terracotta">working together.</span>
        </>
      }
      description="Operational terms for seedling pre-booking, purchase, and buyback programs across the Agaate ecosystem."
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
