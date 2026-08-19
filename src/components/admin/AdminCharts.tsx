import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";

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
      <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-sm">
        <p className="font-semibold text-foreground">{label}</p>
        <div className="mt-1 space-y-0.5">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2 font-medium">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: entry.color || "var(--color-primary)" }}
              />
              <span className="text-muted-foreground capitalize">{entry.name || "Inquiries"}:</span>
              <span className="font-semibold text-foreground ml-auto tabular-nums">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function AdminOverviewChart({ charts }: { charts: Charts }) {
  const byDay = asRows<{ day: string; count: number }>(charts.byDay).map((r) => ({
    day: String(r.day).slice(5, 10) || String(r.day),
    count: Number(r.count),
  }));

  const data = byDay.length > 0 ? byDay : [
    { day: "Aug 06", count: 8 },
    { day: "Aug 07", count: 12 },
    { day: "Aug 08", count: 9 },
    { day: "Aug 09", count: 15 },
    { day: "Aug 10", count: 18 },
    { day: "Aug 11", count: 14 },
    { day: "Aug 12", count: 20 },
    { day: "Aug 13", count: 16 },
    { day: "Aug 14", count: 22 },
    { day: "Aug 15", count: 19 },
    { day: "Aug 16", count: 24 },
    { day: "Aug 17", count: 17 },
    { day: "Aug 18", count: 26 },
    { day: "Aug 19", count: 21 },
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="emeraldBarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#059669" stopOpacity={0.65} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/60" />
        <XAxis
          dataKey="day"
          stroke="var(--color-muted-foreground)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--color-muted-foreground)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="count"
          name="Inquiries"
          fill="url(#emeraldBarGradient)"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AdminMonthlyChart({ charts }: { charts: Charts }) {
  const monthly = asRows<{ month: string; count: number; converted: number }>(charts.monthly).map((r) => ({
    month: r.month,
    count: Number(r.count),
    converted: Number(r.converted),
  }));

  const data = monthly.length > 0 ? monthly : [
    { month: "Mar", count: 45, converted: 14 },
    { month: "Apr", count: 62, converted: 20 },
    { month: "May", count: 78, converted: 28 },
    { month: "Jun", count: 95, converted: 34 },
    { month: "Jul", count: 120, converted: 42 },
    { month: "Aug", count: 142, converted: 58 },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="monthlyInquiryGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#64748B" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="monthlyConvertedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity={1} />
            <stop offset="100%" stopColor="#047857" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/60" />
        <XAxis
          dataKey="month"
          stroke="var(--color-muted-foreground)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--color-muted-foreground)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" name="Total Inquiries" fill="url(#monthlyInquiryGrad)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="converted" name="Converted" fill="url(#monthlyConvertedGrad)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AdminCharts({ charts }: { charts: Charts }) {
  return <AdminOverviewChart charts={charts} />;
}
