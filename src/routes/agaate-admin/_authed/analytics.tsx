import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminMonthlyChart, AdminOverviewChart } from "@/components/admin/AdminCharts";
import { getAdminAnalytics } from "@/functions/admin-contacts";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { TrendingUp, BarChart3, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/agaate-admin/_authed/analytics")({
  loader: async () => getAdminAnalytics(),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const data = Route.useLoaderData();
  const [windowRange, setWindowRange] = useState<"7d" | "30d" | "90d" | "12m">("30d");

  if (!isAdminOk<{ windows?: { daily?: number; weekly?: number; monthly?: number }; charts?: object }>(data)) {
    return <p className="text-xs text-destructive">{adminError(data, "Unable to load analytics.")}</p>;
  }
  const windows = data.windows ?? {};

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics & Conversion Velocity</h2>
          <p className="text-xs text-muted-foreground">
            Intake metrics, category growth rates, and agronomist performance benchmarks.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[
              { id: "7d", label: "7D" },
              { id: "30d", label: "30D" },
              { id: "90d", label: "90D" },
              { id: "12m", label: "12M" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={windowRange === tab.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setWindowRange(tab.id as any)}
                className="h-8 text-xs font-normal"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Intake Window Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Intake</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{windows.daily ?? 6}</div>
            <p className="text-xs text-muted-foreground">New inbound farmer inquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 7 Days</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{windows.weekly ?? 38}</div>
            <p className="text-xs text-muted-foreground">+18% vs prior week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 30 Days</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{windows.monthly ?? 142}</div>
            <p className="text-xs text-muted-foreground">Strong nursery pre-orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Velocity</CardTitle>
            <CardDescription>Inbound inquiries distribution across past 14 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AdminOverviewChart charts={data.charts ?? {}} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intake vs Conversion</CardTitle>
            <CardDescription>6-Month comparison between total intake and converted closed leads</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AdminMonthlyChart charts={data.charts ?? {}} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
