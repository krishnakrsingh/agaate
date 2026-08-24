import type { ReactNode } from "react";

export function CmsPageHeader({
  title,
  description,
  actions,
  workflow = "publish",
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  workflow?: "publish" | "live";
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1.5 max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">
          {workflow === "publish"
            ? "Use Publish to make list items live on the website. Draft changes stay hidden until published."
            : "Saving updates the live website immediately — no separate publish step."}
        </p>
      </div>
      {actions ? <div className="flex flex-wrap gap-2 shrink-0">{actions}</div> : null}
    </div>
  );
}
