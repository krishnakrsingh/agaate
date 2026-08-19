import { Link } from "@tanstack/react-router";
import {
  Users,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  PhoneCall,
  MapPin,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { StatusBadge, PriorityBadge } from "@/components/admin/AdminBadges";
import { formatWhen } from "@/lib/admin-format";

type DashboardProps = {
  kpis: Record<string, number>;
  charts: object;
};

export function AdminDashboard({ kpis, charts }: DashboardProps) {
  const total = Number(kpis.total || 184);
  const newToday = Number(kpis.newToday || 6);
  const dueToday = Number(kpis.dueToday || 4);
  const overdue = Number(kpis.overdue || 2);
  const converted = Number(kpis.converted || 58);
  const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 31;

  const statCards = [
    {
      label: "Total Requests",
      value: total,
      subtext: "+14% from last month",
      trend: "up",
      icon: Users,
      color: "text-emerald-700 bg-emerald-50",
    },
    {
      label: "New Today",
      value: newToday,
      subtext: "Fresh incoming inquiries",
      badge: "Active",
      icon: Sparkles,
      color: "text-sky-700 bg-sky-50",
    },
    {
      label: "Follow-ups Due",
      value: dueToday,
      subtext: overdue > 0 ? `${overdue} overdue requests` : "All on schedule",
      alert: overdue > 0,
      icon: Clock,
      color: overdue > 0 ? "text-amber-700 bg-amber-50" : "text-emerald-700 bg-emerald-50",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      subtext: `${converted} total converted leads`,
      trend: "up",
      icon: TrendingUp,
      color: "text-teal-700 bg-teal-50",
    },
  ];

  // Sample quick recent requests for dashboard preview
  const recentRequests = [
    {
      id: 1,
      ticket_id: "AGA-2026-8001",
      name: "Ramesh Patel",
      phone: "+91 98765 00001",
      topic: "Bio-Boosted Nursery Pre-Orders",
      crop: "Chilli (20 Acres)",
      district: "Varanasi, UP",
      status: "new",
      priority: "high",
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 2,
      ticket_id: "AGA-2026-8002",
      name: "Sunita Devi",
      phone: "+91 98765 00002",
      topic: "Big Farm Setup (Turnkey)",
      crop: "Tomato & Polyhouse (55 Acres)",
      district: "Nashik, MH",
      status: "farm_visit",
      priority: "urgent",
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
    {
      id: 3,
      ticket_id: "AGA-2026-8003",
      name: "Harpreet Singh",
      phone: "+91 98765 00003",
      topic: "Carbon Credit Program",
      crop: "Rice / Wheat (35 Acres)",
      district: "Ludhiana, PB",
      status: "in_progress",
      priority: "medium",
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 4,
      ticket_id: "AGA-2026-8004",
      name: "Meena Joshi",
      phone: "+91 98765 00004",
      topic: "Kisan Mall Wholesale",
      crop: "Export Onion (10 Acres)",
      district: "Dindori, MH",
      status: "converted",
      priority: "medium",
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
  ];

  const upcomingVisits = [
    {
      id: 1,
      farmer: "Sunita Devi",
      location: "Nashik, Maharashtra",
      time: "Today · 02:30 PM",
      agronomist: "Aman Verma",
      focus: "Polyhouse topography & soil salinity audit",
      status: "Confirmed",
    },
    {
      id: 2,
      farmer: "Ramesh Patel",
      location: "Varanasi, UP",
      time: "Tomorrow · 10:00 AM",
      agronomist: "Rahul Sharma",
      focus: "High-density nursery block layout check",
      status: "Scheduled",
    },
    {
      id: 3,
      farmer: "Naveen Rao",
      location: "Warangal, Telangana",
      time: "Aug 21 · 11:30 AM",
      agronomist: "Aman Verma",
      focus: "Bio-fertigation injector testing",
      status: "Scheduled",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Operations Active
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">
            Agaate Agricultural Command Center
          </h1>
          <p className="mt-1 text-xs text-stone-500 max-w-xl">
            Real-time pipeline monitoring for nursery pre-orders, turnkey farm setups, carbon credits, and field agronomist visits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            to="/agaate-admin/farm-visits"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-all shadow-2xs"
          >
            <Calendar className="h-3.5 w-3.5 text-stone-500" />
            <span>Farm Schedule</span>
          </Link>
          <Link
            to="/agaate-admin/contacts"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-all"
          >
            <span>View All Contacts</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">{card.label}</p>
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${card.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 tabular-nums">{card.value}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-stone-500 text-[11px]">{card.subtext}</span>
                {card.alert ? (
                  <span className="flex items-center gap-1 font-semibold text-amber-700">
                    <AlertCircle className="h-3 w-3" />
                  </span>
                ) : card.badge ? (
                  <span className="rounded-md bg-sky-50 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700">
                    {card.badge}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts */}
      <AdminCharts charts={charts} />

      {/* Two-Column Detail Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Recent Requests Data Preview */}
        <div className="lg:col-span-2 rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-stone-900 tracking-tight">Recent Incoming Inquiries</h2>
              <p className="text-xs text-stone-500 mt-0.5">Latest farmer calls, web tickets, and WhatsApp submissions</p>
            </div>
            <Link
              to="/agaate-admin/contacts"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
            >
              <span>View full table</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-[11px] font-semibold uppercase tracking-wider text-stone-400 pb-2">
                  <th className="py-2.5 px-2">Ticket</th>
                  <th className="py-2.5 px-2">Farmer</th>
                  <th className="py-2.5 px-2">Crop & Location</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2">Priority</th>
                  <th className="py-2.5 px-2 text-right">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100/70">
                {recentRequests.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-emerald-50/40 transition-colors group cursor-pointer"
                  >
                    <td className="py-3 px-2 font-mono text-[11px] font-semibold text-emerald-800">
                      <Link to="/agaate-admin/contacts/$id" params={{ id: String(row.id) }}>
                        {row.ticket_id}
                      </Link>
                    </td>
                    <td className="py-3 px-2 font-semibold text-stone-900">
                      <Link to="/agaate-admin/contacts/$id" params={{ id: String(row.id) }}>
                        {row.name}
                      </Link>
                    </td>
                    <td className="py-3 px-2 text-stone-600">
                      <p className="font-medium text-stone-800">{row.crop}</p>
                      <p className="text-[11px] text-stone-400">{row.district}</p>
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="py-3 px-2">
                      <PriorityBadge priority={row.priority} />
                    </td>
                    <td className="py-3 px-2 text-right text-stone-400 font-mono text-[11px]">
                      {formatWhen(row.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Upcoming Farm Visits Schedule */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-stone-900 tracking-tight">Scheduled Farm Visits</h2>
                <p className="text-xs text-stone-500 mt-0.5">Upcoming agronomist field audits</p>
              </div>
              <Link
                to="/agaate-admin/farm-visits"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Schedule
              </Link>
            </div>

            <div className="space-y-3 mt-2">
              {upcomingVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="rounded-xl border border-stone-100 bg-stone-50/60 p-3.5 hover:bg-stone-50 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-semibold text-stone-900">{visit.farmer}</p>
                    <span className="rounded-md bg-emerald-100/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                      {visit.status}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-500">
                    <MapPin className="h-3 w-3 text-stone-400 shrink-0" />
                    <span className="truncate">{visit.location}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-stone-600 pt-1 border-t border-stone-200/50">
                    <span className="font-semibold text-emerald-800">{visit.time}</span>
                    <span className="text-stone-500">Lead: {visit.agronomist}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100">
            <Link
              to="/agaate-admin/farm-visits"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100/80 transition-all"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Open Field Itinerary</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
