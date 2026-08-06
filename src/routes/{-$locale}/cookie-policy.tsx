import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/common/SitePage";

export const Route = createFileRoute("/{-$locale}/cookie-policy")({
  component: CookiePolicy,
});

function CookiePolicy() {
  const sections = [
    {
      title: "What we use cookies for",
      body: "Cookies help remember language selections, keep sessions stable, and understand how visitors use core pages so we can improve navigation and performance.",
    },
    {
      title: "Language & preference cookies",
      body: "Your locale choice (for example English or Hindi) may be stored so the site opens in the language you selected on the next visit.",
    },
    {
      title: "Essential vs optional",
      body: "Essential cookies keep the site working. Analytics or preference cookies may be used where permitted; you can clear cookies anytime in your browser settings.",
    },
    {
      title: "Questions",
      body: "For cookie or privacy questions, contact info@agaate.in.",
    },
  ];

  return (
    <SitePage
      eyebrow="COOKIE POLICY"
      title={
        <>
          Cookies that keep <span className="italic text-terracotta">things working.</span>
        </>
      }
      description="Details regarding cookies used to store user selections and language choices on the Agaate website."
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
