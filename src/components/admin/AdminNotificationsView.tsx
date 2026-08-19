import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";

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
    message: "General Agronomy advisory ticket pending agronomist IPM review for 24+ hours.",
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Activity Stream
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">Notification Center</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time alerts for incoming farmer leads, follow-up deadlines, and agronomist schedules.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllRead}
          className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition-all shrink-0"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
            filter === "all"
              ? "bg-emerald-700 text-white shadow-2xs"
              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter("unread")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
            filter === "unread"
              ? "bg-emerald-700 text-white shadow-2xs"
              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
          }`}
        >
          Unread ({notifications.filter((n) => n.unread).length})
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              item.unread
                ? "bg-white border-emerald-200/80 shadow-xs ring-1 ring-emerald-600/10"
                : "bg-white/80 border-stone-200/70"
            }`}
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="mt-0.5 shrink-0">
                {item.type === "new_lead" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
                {item.type === "due_today" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <Clock className="h-4 w-4" />
                  </div>
                )}
                {item.type === "overdue" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                )}
                {item.type === "visit_confirmed" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Calendar className="h-4 w-4" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-stone-900">{item.title}</p>
                  {item.unread && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{item.message}</p>
                <p className="text-[11px] text-stone-400 font-mono mt-1">{item.time}</p>
              </div>
            </div>

            <div className="shrink-0 flex items-center justify-end">
              <Link
                to={item.link as any}
                className="inline-flex items-center gap-1 rounded-xl bg-stone-50 border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
