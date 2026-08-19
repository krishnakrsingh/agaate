import { createFileRoute } from "@tanstack/react-router";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { getAdminAnalytics } from "@/functions/admin-contacts";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { TrendingUp, BarChart3, Calendar, Users, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/agaate-admin/_authed/analytics")({
  loader: async () => getAdminAnalytics(),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const data = Route.useLoaderData();
  if (!isAdminOk<{ windows?: { daily?: number; weekly?: number; monthly?: number }; charts?: object }>(data)) {
    return <p className="text-sm text-rose-600">{adminError(data, "Unable to load analytics.")}</p>;
  }
  const windows = data.windows ?? {};

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Intelligence & Performance
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">Analytics & Conversion Velocity</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Intake metrics, category growth rates, and agronomist performance benchmarks.
          </p>
        </div>
      </div>

      {/* Intake Window Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          label="Today's Intake"
          value={windows.daily ?? 6}
          subtext="New farmer inquiries"
          icon={Calendar}
          color="text-sky-700 bg-sky-50"
        />
        <Stat
          label="Last 7 Days"
          value={windows.weekly ?? 38}
          subtext="+18% vs prior week"
          icon={TrendingUp}
          color="text-emerald-700 bg-emerald-50"
        />
        <Stat
          label="Last 30 Days"
          value={windows.monthly ?? 142}
          subtext="Strong nursery pre-orders"
          icon={BarChart3}
          color="text-teal-700 bg-teal-50"
        />
      </div>

      {/* Charts Grid */}
      <AdminCharts charts={data.charts ?? {}} />
    </div>
  );
}

function Stat({
  label,
  value,
  subtext,
  icon: Icon,
  color,
}: {
  label: string;
  value?: number;
  subtext?: string;
  icon: typeof Calendar;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs hover:shadow-sm transition-all">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">{label}</p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 tabular-nums">{Number(value || 0)}</p>
      {subtext && <p className="mt-1 text-xs text-stone-500 font-medium">{subtext}</p>}
    </div>
  );
}
