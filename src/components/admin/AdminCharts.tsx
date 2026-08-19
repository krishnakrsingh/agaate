import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = [
  "#059669", // Emerald
  "#0284c7", // Sky Blue
  "#d97706", // Amber
  "#0d9488", // Teal
  "#84cc16", // Lime
  "#8b5cf6", // Purple
  "#f43f5e", // Rose
];

type Charts = {
  byDay?: unknown;
  byCategory?: unknown;
  byStatus?: unknown;
  monthly?: unknown;
  team?: unknown;
  conversionRate?: number;
};

export type AdminChartsData = Charts;

function asRows<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-stone-200/90 bg-white/95 p-2.5 shadow-lg backdrop-blur-sm">
        <p className="text-[11px] font-semibold text-stone-700">{label}</p>
        <div className="mt-1 space-y-0.5">
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-xs font-medium" style={{ color: entry.color || "#059669" }}>
              <span className="capitalize">{entry.name || "Count"}: </span>
              <span className="font-semibold text-stone-900">{entry.value}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function AdminCharts({ charts }: { charts: Charts }) {
  const byDay = asRows<{ day: string; count: number }>(charts.byDay).map((r) => ({
    ...r,
    day: String(r.day).slice(5, 10) || String(r.day),
    count: Number(r.count),
  }));

  const byCategory = asRows<{ name: string; count: number }>(charts.byCategory).map((r) => ({
    name: r.name || "Unknown",
    count: Number(r.count),
  }));

  const byStatus = asRows<{ name: string; count: number }>(charts.byStatus).map((r) => ({
    name: r.name || "Unknown",
    count: Number(r.count),
  }));

  const monthly = asRows<{ month: string; count: number; converted: number }>(charts.monthly).map((r) => ({
    month: r.month,
    count: Number(r.count),
    converted: Number(r.converted),
  }));

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Intake Velocity Area Chart */}
      <ChartCard
        title="Intake Velocity"
        subtitle="Daily incoming requests over the past 14 days"
        badge="Active Stream"
      >
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={byDay} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f0" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#78716c", fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#78716c", fontSize: 11, fontWeight: 500 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              name="Inquiries"
              stroke="#059669"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#emeraldGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Inquiry Categories Bar Chart */}
      <ChartCard
        title="Inquiries by Program"
        subtitle="Distribution across turnkey, nursery, carbon & advisory"
        badge="All Channels"
      >
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={byCategory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f0" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#78716c", fontSize: 10, fontWeight: 500 }}
              interval={0}
              tickFormatter={(val) => (val.length > 12 ? `${val.slice(0, 10)}…` : val)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#78716c", fontSize: 11, fontWeight: 500 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" name="Requests" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Status Mix Donut Chart */}
      <ChartCard
        title="Pipeline Health & Status"
        subtitle={`Current request stages · Conversion rate: ${charts.conversionRate ?? 0}%`}
        badge={`${charts.conversionRate ?? 0}% Converted`}
      >
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={byStatus}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
            >
              {byStatus.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: "11px", paddingTop: "12px", color: "#57534e" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Monthly Volume vs Converted */}
      <ChartCard
        title="Monthly Volume vs Converted"
        subtitle="Performance and pipeline progression month-over-month"
        badge="6-Month Trend"
      >
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={monthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f0" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#78716c", fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#78716c", fontSize: 11, fontWeight: 500 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: "11px", paddingTop: "12px", color: "#57534e" }}
            />
            <Bar dataKey="count" fill="#93c5fd" name="Total Intake" radius={[4, 4, 0, 0]} barSize={18} />
            <Bar dataKey="converted" fill="#10b981" name="Converted" radius={[4, 4, 0, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6 shadow-xs hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-semibold text-stone-900 tracking-tight">{title}</h2>
          <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
        </div>
        {badge && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800 ring-1 ring-emerald-600/10">
            {badge}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
