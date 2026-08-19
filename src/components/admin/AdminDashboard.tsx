import { Link } from "@tanstack/react-router";
import {
  Users,
  Activity,
  CreditCard,
  Clock,
  Calendar,
  ArrowRight,
  Download,
} from "lucide-react";
import { AdminOverviewChart } from "@/components/admin/AdminCharts";
import { StatusBadge, PriorityBadge } from "@/components/admin/AdminBadges";
import { formatWhen } from "@/lib/admin-format";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  const conversionRate = total > 0 ? (converted / total) * 100 : 31.5;

  const recentInquiriesList = [
    {
      id: 1,
      ticket_id: "AGA-2026-8001",
      name: "Ramesh Patel",
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
      topic: "Kisan Mall Wholesale",
      crop: "Export Onion (10 Acres)",
      district: "Dindori, MH",
      status: "converted",
      priority: "medium",
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 5,
      ticket_id: "AGA-2026-8005",
      name: "Naveen Rao",
      topic: "Drip Irrigation Setup",
      crop: "Cotton (30 Acres)",
      district: "Warangal, TS",
      status: "assigned",
      priority: "high",
      created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
  ];

  const upcomingVisits = [
    {
      id: 1,
      farmer: "Sunita Devi",
      location: "Nashik, Maharashtra",
      time: "Today · 02:30 PM",
      agronomist: "Aman Verma",
      status: "Confirmed",
    },
    {
      id: 2,
      farmer: "Ramesh Patel",
      location: "Varanasi, UP",
      time: "Tomorrow · 10:00 AM",
      agronomist: "Rahul Sharma",
      status: "Scheduled",
    },
    {
      id: 3,
      farmer: "Naveen Rao",
      location: "Warangal, Telangana",
      time: "Aug 21 · 11:30 AM",
      date: "Aug 21",
      agronomist: "Aman Verma",
      status: "Scheduled",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Row with Modern Rounded Square Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-sidebar-accent/80 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary dark:bg-primary" />
              Live Operations
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Operations Center</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time agricultural pipeline, nursery bookings, and agronomist operations.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild className="rounded-lg px-4 h-9 bg-card border-border shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-xs font-medium">
            <Link to="/agaate-admin/contacts">
              <span>Inquiries CRM</span>
            </Link>
          </Button>
          <Button size="sm" asChild className="rounded-lg px-4 h-9 bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 text-xs font-semibold">
            <Link to="/agaate-admin/farm-visits">
              <Calendar className="mr-1.5 h-3.5 w-3.5" />
              <span>Schedule Visit</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* 4 Rounded-Square Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="group relative rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-sidebar-accent hover:shadow-sm transition-all flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] font-medium text-muted-foreground block truncate">Total Inquiries</span>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums">{total.toLocaleString()}</div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-sidebar-accent/50 px-2 py-0.5 text-[11px] font-medium text-sidebar-accent-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary dark:bg-primary" />
              <span>+14.2% monthly</span>
            </div>
          </div>
          <div className="h-11 w-11 rounded-xl bg-sidebar-accent/60 flex items-center justify-center text-sidebar-primary dark:text-primary shrink-0 group-hover:scale-105 transition-transform">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="group relative rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-sidebar-accent hover:shadow-sm transition-all flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] font-medium text-muted-foreground block truncate">New Today</span>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums">+{newToday}</div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              <span>+4 vs yesterday</span>
            </div>
          </div>
          <div className="h-11 w-11 rounded-xl bg-sidebar-accent/60 flex items-center justify-center text-sidebar-primary dark:text-primary shrink-0 group-hover:scale-105 transition-transform">
            <Activity className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="group relative rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-sidebar-accent hover:shadow-sm transition-all flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] font-medium text-muted-foreground block truncate">Follow-ups Due</span>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums">{dueToday}</div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium">
              {overdue > 0 ? (
                <span className="text-rose-600 dark:text-rose-400 font-medium">{overdue} overdue</span>
              ) : (
                <span className="text-muted-foreground">On schedule</span>
              )}
            </div>
          </div>
          <div className="h-11 w-11 rounded-xl bg-sidebar-accent/60 flex items-center justify-center text-sidebar-primary dark:text-primary shrink-0 group-hover:scale-105 transition-transform">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="group relative rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-sidebar-accent hover:shadow-sm transition-all flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] font-medium text-muted-foreground block truncate">Conversion Rate</span>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums">{conversionRate.toFixed(1)}%</div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-sidebar-accent/50 px-2 py-0.5 text-[11px] font-medium text-sidebar-accent-foreground">
              <span>{converted} leads won</span>
            </div>
          </div>
          <div className="h-11 w-11 rounded-xl bg-sidebar-accent/60 flex items-center justify-center text-sidebar-primary dark:text-primary shrink-0 group-hover:scale-105 transition-transform">
            <CreditCard className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Grid: Overview Chart + Recent Inquiries (Rounded-2xl composition) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Col-span-4: Overview Chart Island */}
        <div className="col-span-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                  Inquiry Velocity
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground mt-1">14-Day Inbound Volume</h3>
              <p className="text-xs text-muted-foreground">Daily incoming farmer inquiries across nursery and turnkey programs</p>
            </div>
          </div>
          <div className="pt-2">
            <AdminOverviewChart charts={charts} />
          </div>
        </div>

        {/* Col-span-3: Recent Inquiries List */}
        <div className="col-span-3 rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                  Recent Queue
                </span>
                <h3 className="text-base font-bold text-foreground mt-1">Latest Inquiries</h3>
                <p className="text-xs text-muted-foreground">{newToday} inquiries received today</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="rounded-lg h-8 px-2.5 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Link to="/agaate-admin/contacts">
                  <span>View All</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>

            <div className="space-y-2.5">
              {recentInquiriesList.slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  to="/agaate-admin/contacts/$id"
                  params={{ id: String(item.id) }}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 hover:bg-sidebar-accent/40 p-2.5 pr-3.5 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-8 w-8 rounded-lg border border-border shrink-0">
                      <AvatarFallback className="rounded-lg text-[10px] font-semibold bg-muted text-foreground">
                        {item.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground group-hover:text-sidebar-primary truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {item.topic}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 shrink-0">
                    <StatusBadge status={item.status} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Operational SLA benchmark</span>
            <span className="font-semibold text-foreground">2.4h avg response</span>
          </div>
        </div>
      </div>

      {/* Operational Inquiries Table + Scheduled Visits (Rounded-2xl Cards) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Inbound Queue Island */}
        <div className="col-span-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                Active Requests
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">Inbound Queue</h3>
              <p className="text-xs text-muted-foreground">Farmer requests awaiting callback or farm audit</p>
            </div>
            <Button variant="outline" size="sm" asChild className="rounded-lg h-8 px-3 text-xs bg-card border-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-2xs">
              <Link to="/agaate-admin/contacts">
                <span>View CRM</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>

          <div className="space-y-2">
            {recentInquiriesList.slice(0, 5).map((row) => (
              <Link
                key={row.id}
                to="/agaate-admin/contacts/$id"
                params={{ id: String(row.id) }}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/10 hover:bg-sidebar-accent/30 p-3 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-[11px] font-semibold text-muted-foreground bg-muted/50 rounded-md px-2 py-0.5">
                    {row.ticket_id}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground group-hover:text-sidebar-primary truncate">
                      {row.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">{row.crop || row.topic}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={row.status} />
                  <PriorityBadge priority={row.priority} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scheduled Field Visits Island */}
        <div className="col-span-3 rounded-2xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                Inspection Agenda
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">Field Audits</h3>
              <p className="text-xs text-muted-foreground">Upcoming agronomist farm visits</p>
            </div>
            <Button variant="outline" size="sm" asChild className="rounded-lg h-8 px-3 text-xs bg-card border-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-2xs">
              <Link to="/agaate-admin/farm-visits">
                <span>Itinerary</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>

          <div className="space-y-3">
            {upcomingVisits.map((visit) => (
              <div
                key={visit.id}
                className="rounded-xl border border-border/60 bg-muted/10 p-3.5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-foreground">{visit.farmer}</p>
                  <span className="font-mono text-[10px] text-muted-foreground bg-muted/60 rounded-md px-2 py-0.5">
                    {visit.date}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">{visit.location}</p>
                <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px]">
                  <span className="text-muted-foreground">Specialist: <span className="font-medium text-foreground">{visit.agronomist}</span></span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-sidebar-accent/60 px-2 py-0.5 text-[10px] font-medium text-sidebar-accent-foreground">
                    Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
