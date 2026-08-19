import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  ROLE_LABELS,
  type RequestPriority,
  type RequestStatus,
  type AdminRole,
} from "@/lib/admin-constants";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  RequestStatus,
  { label: string; dot: string; badgeClass: string }
> = {
  new: {
    label: "New",
    dot: "bg-sidebar-primary dark:bg-primary",
    badgeClass: "border-border bg-muted/50 text-foreground font-medium",
  },
  assigned: {
    label: "Assigned",
    dot: "bg-muted-foreground",
    badgeClass: "border-border bg-muted/40 text-foreground",
  },
  contacted: {
    label: "Contacted",
    dot: "bg-muted-foreground",
    badgeClass: "border-border bg-muted/40 text-foreground",
  },
  in_progress: {
    label: "In Progress",
    dot: "bg-amber-500",
    badgeClass: "border-amber-500/20 bg-amber-500/5 text-amber-800 dark:text-amber-300",
  },
  waiting: {
    label: "Waiting",
    dot: "bg-muted-foreground",
    badgeClass: "border-border bg-muted/30 text-muted-foreground",
  },
  farm_visit: {
    label: "Farm Visit",
    dot: "bg-sidebar-primary dark:bg-primary",
    badgeClass: "border-sidebar-border bg-sidebar-accent/60 text-sidebar-accent-foreground font-medium",
  },
  converted: {
    label: "Converted",
    dot: "bg-sidebar-primary dark:bg-primary",
    badgeClass: "border-sidebar-primary/20 bg-sidebar-primary/10 text-sidebar-primary dark:text-primary font-semibold",
  },
  closed: {
    label: "Closed",
    dot: "bg-slate-400",
    badgeClass: "border-border/60 bg-muted/20 text-muted-foreground",
  },
  spam: {
    label: "Spam",
    dot: "bg-rose-500",
    badgeClass: "border-rose-500/20 bg-rose-500/5 text-rose-700 dark:text-rose-400",
  },
};

const PRIORITY_CONFIG: Record<
  RequestPriority,
  { label: string; badgeClass: string }
> = {
  low: {
    label: "Low",
    badgeClass: "border-border/60 bg-muted/20 text-muted-foreground",
  },
  medium: {
    label: "Medium",
    badgeClass: "border-border bg-muted/40 text-foreground",
  },
  high: {
    label: "High",
    badgeClass: "border-amber-500/20 bg-amber-500/5 text-amber-800 dark:text-amber-300 font-medium",
  },
  urgent: {
    label: "Urgent",
    badgeClass: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-medium",
  },
};

const ROLE_CONFIG: Record<
  AdminRole,
  { label: string; badgeClass: string }
> = {
  super_admin: {
    label: "Super Admin",
    badgeClass: "border-border bg-muted/60 text-foreground font-semibold",
  },
  admin: {
    label: "Admin",
    badgeClass: "border-sidebar-border bg-sidebar-accent/70 text-sidebar-accent-foreground font-medium",
  },
  agronomist: {
    label: "Agronomist",
    badgeClass: "border-sidebar-border bg-sidebar-accent/70 text-sidebar-accent-foreground font-medium",
  },
  support: {
    label: "Support",
    badgeClass: "border-border bg-muted/40 text-muted-foreground",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const key = (status as RequestStatus) in STATUS_CONFIG ? (status as RequestStatus) : "new";
  const conf = STATUS_CONFIG[key];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium select-none shadow-2xs",
        conf.badgeClass,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", conf.dot)} />
      {STATUS_LABELS[key] ?? status}
    </span>
  );
}

export function PriorityBadge({
  priority,
  className,
}: {
  priority: string;
  className?: string;
}) {
  const key = (priority as RequestPriority) in PRIORITY_CONFIG ? (priority as RequestPriority) : "medium";
  const conf = PRIORITY_CONFIG[key];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium select-none shadow-2xs",
        conf.badgeClass,
        className
      )}
    >
      {PRIORITY_LABELS[key] ?? priority}
    </span>
  );
}

export function RoleBadge({
  role,
  className,
}: {
  role: string;
  className?: string;
}) {
  const key = (role as AdminRole) in ROLE_CONFIG ? (role as AdminRole) : "support";
  const conf = ROLE_CONFIG[key];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium select-none shadow-2xs",
        conf.badgeClass,
        className
      )}
    >
      {ROLE_LABELS[key] ?? role}
    </span>
  );
}
