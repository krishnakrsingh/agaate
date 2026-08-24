import type { CmsStatus } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<CmsStatus, string> = {
  draft: "border-amber-500/20 bg-amber-500/10 text-amber-800",
  published: "border-emerald-500/20 bg-emerald-500/10 text-emerald-800",
  archived: "border-slate-500/20 bg-slate-500/10 text-slate-600",
};

export function CmsStatusBadge({ status, pending }: { status: CmsStatus; pending?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize",
          STATUS_STYLES[status],
        )}
      >
        {status}
      </span>
      {pending && status === "published" && (
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
          Unpublished edits
        </span>
      )}
    </span>
  );
}
