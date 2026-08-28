import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  CalendarClock,
  ExternalLink,
  Globe,
  Inbox,
  MapPin,
  Search,
  Settings,
  UserCheck,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { kpi } from "@/lib/admin-api";
import {
  canEditInquiries,
  canManageSeo,
  canManageSettings,
  canManageUsers,
  canViewAllInquiries,
  canViewCms,
  STATUS_LABELS,
  type RequestStatus,
  type SessionUser,
} from "@/lib/admin-constants";
import { cn } from "@/lib/utils";

const CHART_PRIMARY = "var(--chart-1)";
const CHART_SECONDARY = "var(--chart-2)";

export type DashboardAnalytics = {
  windows: { daily: number; weekly: number; monthly: number };
  kpis: Record<string, number>;
  charts: {
    byDay: Array<{ day: string | Date; count: number }>;
    byCategory: Array<{ name: string; count: number }>;
    byStatus: Array<{ name: string; count: number }>;
    monthly: Array<{ month: string; count: number; converted: number }>;
    team: Array<{ name: string; count: number }>;
    conversionRate: number;
  };
};

export type DashboardData = {
  analytics: DashboardAnalytics;
  operations: {
    pendingFarmVisits: number;
    careerApplications: number;
    newsletterWaitlist: number;
  };
  smtpReady: boolean;
  dbConfigured: boolean;
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatToday() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function dayKey(value: string | Date) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function fillDaySeries(rows: Array<{ day: string | Date; count: number }>) {
  const map = new Map<string, number>();
  for (const row of rows) {
    map.set(dayKey(row.day), Number(row.count));
  }
  const result: Array<{ label: string; count: number }> = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push({
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      count: map.get(key) ?? 0,
    });
  }
  return result;
}

function KpiCard({
  label,
  value,
  hint,
  accent,
  to,
}: {
  label: string;
  value: number;
  hint?: string;
  accent?: "danger";
  to?: string;
}) {
  const inner = (
    <div
      className={cn(
        "rounded-xl border bg-card p-4 shadow-sm transition-colors",
        to && "hover:border-primary/30 hover:bg-muted/30",
      )}
    >
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 text-2xl font-bold tabular-nums",
          accent === "danger" && value > 0 && "text-rose-600",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}

function QuickLink({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: typeof MapPin;
}) {
  return (
    <Button
      asChild
      variant="default"
      className="h-auto flex-col gap-2 rounded-xl px-4 py-4 shadow-sm"
    >
      <Link to={to}>
        <Icon className="h-5 w-5 text-primary-foreground/90" />
        <span className="text-xs font-medium">{label}</span>
      </Link>
    </Button>
  );
}

export function AdminDashboard({ data, user }: { data: DashboardData; user: SessionUser }) {
  const { analytics, operations, smtpReady, dbConfigured } = data;
  const { kpis, charts, windows } = analytics;

  const overdue = kpi(kpis, "overdue");
  const dueToday = kpi(kpis, "dueToday");
  const followUps = dueToday + overdue;

  const daySeries = fillDaySeries(charts.byDay);
  const topTopics = [...charts.byCategory]
    .sort((a, b) => Number(b.count) - Number(a.count))
    .slice(0, 6)
    .map((row) => ({
      name: row.name || "Other",
      count: Number(row.count),
    }));

  const statusBreakdown = charts.byStatus.map((row) => ({
    name: STATUS_LABELS[(row.name as RequestStatus) ?? "new"] ?? row.name,
    count: Number(row.count),
  }));

  const teamData = charts.team.map((row) => ({
    name: row.name,
    count: Number(row.count),
  }));

  const alerts: Array<{ message: string; to?: string; label?: string }> = [];
  if (!smtpReady && canManageSettings(user)) {
    alerts.push({
      message: "SMTP is not configured — contact form emails may not be delivered.",
      to: "/agaate-admin/settings",
      label: "Email settings",
    });
  }
  if (operations.pendingFarmVisits > 0) {
    alerts.push({
      message: `${operations.pendingFarmVisits} farm visit booking${operations.pendingFarmVisits === 1 ? "" : "s"} awaiting confirmation.`,
      to: "/agaate-admin/farm-visits",
      label: "View bookings",
    });
  }
  if (overdue > 0 && canEditInquiries(user)) {
    alerts.push({
      message: `${overdue} follow-up${overdue === 1 ? "" : "s"} overdue.`,
      to: "/agaate-admin/farm-visits",
      label: "Review inquiries",
    });
  }

  const quickLinks = [
    canEditInquiries(user)
      ? { to: "/agaate-admin/farm-visits", label: "Farm visits", icon: MapPin }
      : null,
    canViewCms(user)
      ? { to: "/agaate-admin/content", label: "Content", icon: Globe }
      : null,
    canManageSeo(user)
      ? { to: "/agaate-admin/seo", label: "SEO", icon: Search }
      : null,
    canManageSettings(user)
      ? { to: "/agaate-admin/settings", label: "Settings", icon: Settings }
      : null,
    canManageUsers(user)
      ? { to: "/agaate-admin/access", label: "Users & roles", icon: UserCheck }
      : null,
  ].filter(Boolean) as Array<{ to: string; label: string; icon: typeof MapPin }>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {greeting()}, {user.name} · {formatToday()}
          </p>
        </div>
        <Button asChild size="sm" className="shadow-sm">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            View website
          </a>
        </Button>
      </div>

      {!dbConfigured ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Database not connected — showing empty analytics. Configure MySQL in your environment to
          see live data.
        </div>
      ) : null}

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
        <KpiCard label="New today" value={kpi(kpis, "newToday")} />
        <KpiCard label="Open inquiries" value={kpi(kpis, "unreadNew")} />
        <KpiCard
          label="Follow-ups due"
          value={followUps}
          hint={overdue > 0 ? `${overdue} overdue` : dueToday > 0 ? `${dueToday} due today` : undefined}
          accent={overdue > 0 ? "danger" : undefined}
        />
        <KpiCard
          label="Farm visits pending"
          value={operations.pendingFarmVisits}
          to="/agaate-admin/farm-visits"
        />
        <KpiCard
          label="Career applications"
          value={operations.careerApplications}
          hint={
            operations.newsletterWaitlist > 0
              ? `${operations.newsletterWaitlist} Kisaan Mall waitlist`
              : undefined
          }
          to="/agaate-admin/careers"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Inquiries</p>
              <p className="text-xs text-muted-foreground">Last 14 days</p>
            </div>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={daySeries} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="inquiryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_PRIMARY} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={CHART_PRIMARY} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Inquiries"
                  stroke={CHART_PRIMARY}
                  fill="url(#inquiryGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">By topic</p>
              <p className="text-xs text-muted-foreground">Top inquiry categories</p>
            </div>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="h-56">
            {topTopics.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topTopics}
                  layout="vertical"
                  margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={96}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" name="Inquiries" fill={CHART_PRIMARY} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No inquiry data yet
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-sm lg:col-span-1">
          <p className="text-sm font-medium">Status breakdown</p>
          <p className="text-xs text-muted-foreground">All inquiries by status</p>
          <ul className="mt-4 space-y-2">
            {statusBreakdown.length > 0 ? (
              statusBreakdown.map((row) => (
                <li key={row.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{row.name}</span>
                  <span className="font-semibold tabular-nums">{row.count}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">No inquiries yet</li>
            )}
          </ul>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm lg:col-span-1">
          <p className="text-sm font-medium">Performance</p>
          <p className="text-xs text-muted-foreground">Conversion and volume windows</p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-3xl font-bold tabular-nums">{charts.conversionRate}%</p>
              <p className="text-xs text-muted-foreground">Conversion rate</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-muted/50 px-3 py-2">
                <p className="text-lg font-semibold tabular-nums">{Number(windows.daily)}</p>
                <p className="text-[10px] text-muted-foreground">Today</p>
              </div>
              <div className="rounded-lg bg-muted/50 px-3 py-2">
                <p className="text-lg font-semibold tabular-nums">{Number(windows.weekly)}</p>
                <p className="text-[10px] text-muted-foreground">7 days</p>
              </div>
              <div className="rounded-lg bg-muted/50 px-3 py-2">
                <p className="text-lg font-semibold tabular-nums">{Number(windows.monthly)}</p>
                <p className="text-[10px] text-muted-foreground">30 days</p>
              </div>
            </div>
          </div>
        </div>

        {canViewAllInquiries(user) && teamData.length > 0 ? (
          <div className="rounded-xl border bg-card p-5 shadow-sm lg:col-span-1">
            <p className="text-sm font-medium">Team workload</p>
            <p className="text-xs text-muted-foreground">Assigned inquiries by staff</p>
            <div className="mt-4 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamData} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={72}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" name="Assigned" fill={CHART_SECONDARY} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-5 shadow-sm lg:col-span-1">
            <div className="flex items-start gap-3">
              <CalendarClock className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Pipeline summary</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {kpi(kpis, "assigned")} assigned · {kpi(kpis, "converted")} converted ·{" "}
                  {kpi(kpis, "closed")} closed
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {kpi(kpis, "total")} total inquiries in your scope
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {alerts.length > 0 ? (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.message}
              className="flex flex-col gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{alert.message}</span>
              </div>
              {alert.to && alert.label ? (
                <Button asChild size="sm" className="shrink-0 shadow-sm">
                  <Link to={alert.to}>
                    {alert.label}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {quickLinks.length > 0 ? (
        <div>
          <p className="mb-3 text-sm font-medium text-muted-foreground">Quick links</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {quickLinks.map((link) => (
              <QuickLink key={link.to} to={link.to} label={link.label} icon={link.icon} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
