import { PRIORITY_LABELS, STATUS_LABELS, type RequestPriority, type RequestStatus } from "@/lib/admin-constants";
import { cn } from "@/lib/utils";

const STATUS_CLASS: Record<RequestStatus, string> = {
  new: "bg-sky-50 text-sky-700 ring-1 ring-sky-600/20 border border-sky-100",
  assigned: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 border border-emerald-100",
  contacted: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-600/20 border border-cyan-100",
  in_progress: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 border border-amber-100",
  waiting: "bg-orange-50 text-orange-700 ring-1 ring-orange-600/20 border border-orange-100",
  farm_visit: "bg-teal-50 text-teal-700 ring-1 ring-teal-600/20 border border-teal-100",
  converted: "bg-emerald-100/80 text-emerald-800 ring-1 ring-emerald-600/30 border border-emerald-200 font-semibold",
  closed: "bg-stone-100 text-stone-600 ring-1 ring-stone-400/20 border border-stone-200",
  spam: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 border border-rose-100",
};

const PRIORITY_CLASS: Record<RequestPriority, string> = {
  low: "bg-stone-100 text-stone-600 ring-1 ring-stone-400/20 border border-stone-200",
  medium: "bg-sky-50 text-sky-700 ring-1 ring-sky-600/20 border border-sky-100",
  high: "bg-orange-50 text-orange-700 ring-1 ring-orange-600/20 border border-orange-100 font-medium",
  urgent: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/30 border border-rose-200 font-semibold",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const key = status as RequestStatus;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-tight whitespace-nowrap shadow-2xs",
        STATUS_CLASS[key] ?? "bg-stone-100 text-stone-600",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          key === "new" && "bg-sky-500",
          key === "assigned" && "bg-emerald-500",
          key === "contacted" && "bg-cyan-500",
          key === "in_progress" && "bg-amber-500",
          key === "waiting" && "bg-orange-500",
          key === "farm_visit" && "bg-teal-500",
          key === "converted" && "bg-emerald-600 animate-pulse",
          key === "closed" && "bg-stone-400",
          key === "spam" && "bg-rose-500",
        )}
      />
      {STATUS_LABELS[key] ?? status}
    </span>
  );
}

export function PriorityBadge({ priority, className }: { priority: string; className?: string }) {
  const key = priority as RequestPriority;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-tight whitespace-nowrap shadow-2xs",
        PRIORITY_CLASS[key] ?? "bg-stone-100 text-stone-600",
        className,
      )}
    >
      {key === "urgent" && <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />}
      {PRIORITY_LABELS[key] ?? priority}
    </span>
  );
}
