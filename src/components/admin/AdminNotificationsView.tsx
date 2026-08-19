import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type NotificationItem = {
  id: string;
  type: "new_lead" | "due_today" | "overdue" | "visit_confirmed";
  title: string;
  message: string;
  time: string;
  unread: boolean;
  link: string;
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "new_lead",
    title: "New 20-Acre Nursery Pre-Order Inquiry",
    message: "Ramesh Patel submitted inquiry for 45,000 chilli saplings (Ticket AGA-2026-8001).",
    time: "15 minutes ago",
    unread: true,
    link: "/agaate-admin/contacts/1",
  },
  {
    id: "notif-2",
    type: "due_today",
    title: "Follow-up Scheduled Today · Sunita Devi",
    message: "Field visit for polyhouse topography and drip layout review at Nashik.",
    time: "1 hour ago",
    unread: true,
    link: "/agaate-admin/contacts/2",
  },
  {
    id: "notif-3",
    type: "overdue",
    title: "Overdue Response · Fatima Khan",
    message: "General Agronomy advisory ticket pending agronomist review for 24+ hours.",
    time: "3 hours ago",
    unread: true,
    link: "/agaate-admin/contacts/6",
  },
  {
    id: "notif-4",
    type: "visit_confirmed",
    title: "Farm Audit Confirmed · Naveen Rao",
    message: "Aman Verma confirmed site visit for bio-fertigation testing on Aug 21.",
    time: "Yesterday",
    unread: false,
    link: "/agaate-admin/farm-visits",
  },
];

export function AdminNotificationsView() {
  const toast = useToast();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = notifications.filter((n) => filter === "all" || n.unread);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success("Notifications Cleared", "All notifications marked as read.");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Notifications</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            System alerts for inbound farmer inquiries, follow-up deadlines, and agronomist inspection schedules.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={markAllRead}
          className="h-8.5 rounded-lg px-3.5 text-xs bg-card border-border shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-medium"
        >
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
          <span>Mark all as read</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="inline-flex items-center rounded-lg bg-muted/60 p-0.5 border border-border/80 shadow-2xs">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
            filter === "all"
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter("unread")}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
            filter === "unread"
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Unread ({notifications.filter((n) => n.unread).length})
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between rounded-xl border p-4 transition-colors shadow-xs ${
              item.unread
                ? "bg-card border-border hover:border-sidebar-accent"
                : "bg-muted/20 border-border/60 opacity-80"
            }`}
          >
            <div className="flex items-start space-x-3.5 min-w-0">
              <div className="shrink-0 p-2.5 rounded-lg bg-muted border border-border text-muted-foreground">
                {item.type === "new_lead" && <Sparkles className="h-4 w-4" />}
                {item.type === "due_today" && <Clock className="h-4 w-4" />}
                {item.type === "overdue" && <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />}
                {item.type === "visit_confirmed" && <Calendar className="h-4 w-4" />}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold leading-none text-foreground">{item.title}</p>
                  {item.unread && (
                    <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary dark:bg-primary shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{item.message}</p>
                <span className="text-[11px] text-muted-foreground font-mono inline-block">{item.time}</span>
              </div>
            </div>

            <Button variant="ghost" size="sm" asChild className="ml-4 shrink-0 text-xs rounded-lg px-2.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Link to={item.link as any}>
                <span>View</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border/80 p-8 text-center bg-card/50">
            <p className="text-xs text-muted-foreground">No notifications in this view.</p>
          </div>
        )}
      </div>
    </div>
  );
}
