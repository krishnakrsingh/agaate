import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  UserCheck,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Sparkles,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { logoutAdmin } from "@/functions/admin-auth";
import { getAdminNotifications } from "@/functions/admin-contacts";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/admin-constants";
import { ToastProvider } from "@/components/admin/AdminToast";
import { AdminCommandPalette } from "@/components/admin/AdminCommandPalette";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  adminOnly?: boolean;
  badge?: (n: { newToday: number; dueToday: number; overdue: number }) => number;
};

const NAV_GROUPS: Array<{
  group: string;
  items: NavItem[];
}> = [
  {
    group: "Overview",
    items: [
      { to: "/agaate-admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    group: "Operations",
    items: [
      {
        to: "/agaate-admin/contacts",
        label: "Contact Requests",
        icon: Users,
        badge: (n) => n.newToday,
      },
      { to: "/agaate-admin/farm-visits", label: "Farm Visits", icon: Calendar },
      { to: "/agaate-admin/consultations", label: "Consultations", icon: FileText },
    ],
  },
  {
    group: "Directory",
    items: [
      { to: "/agaate-admin/customers", label: "Customers", icon: Users },
      { to: "/agaate-admin/agronomists", label: "Agronomists", icon: UserCheck },
    ],
  },
  {
    group: "Insights & Tools",
    items: [
      { to: "/agaate-admin/analytics", label: "Analytics", icon: BarChart3 },
      {
        to: "/agaate-admin/notifications",
        label: "Notifications",
        icon: Bell,
        badge: (n) => n.dueToday + n.overdue,
      },
      { to: "/agaate-admin/settings", label: "Settings", icon: Settings, adminOnly: true },
    ],
  },
];

export function AdminShell({ user }: { user: SessionUser }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notes, setNotes] = useState({ newToday: 6, dueToday: 4, overdue: 2 });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const res = await getAdminNotifications();
      if (!cancelled && res && "ok" in res && res.ok) {
        setNotes({ newToday: res.newToday, dueToday: res.dueToday, overdue: res.overdue });
      }
    };
    void load();
    const id = window.setInterval(load, 45_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const badgeTotal = notes.newToday + notes.dueToday + notes.overdue;

  // Breadcrumb generator
  const breadcrumb = useMemo(() => {
    if (pathname === "/agaate-admin" || pathname === "/agaate-admin/") return "Dashboard";
    if (pathname.startsWith("/agaate-admin/contacts/")) return "Contacts / Detail";
    if (pathname.startsWith("/agaate-admin/contacts")) return "Operations / Contact Requests";
    if (pathname.startsWith("/agaate-admin/farm-visits")) return "Operations / Farm Visits";
    if (pathname.startsWith("/agaate-admin/consultations")) return "Operations / Consultations";
    if (pathname.startsWith("/agaate-admin/customers")) return "Directory / Customers";
    if (pathname.startsWith("/agaate-admin/agronomists")) return "Directory / Agronomists";
    if (pathname.startsWith("/agaate-admin/analytics")) return "Insights / Analytics";
    if (pathname.startsWith("/agaate-admin/notifications")) return "Insights / Notifications";
    if (pathname.startsWith("/agaate-admin/settings")) return "System / Settings";
    return "Agaate Admin";
  }, [pathname]);

  const currentDateFormatted = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(new Date());
  }, []);

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-[#f8faf8] text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        {/* Command Palette */}
        <AdminCommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

        {/* Mobile Backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-stone-900/20 backdrop-blur-xs md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-stone-200/80 bg-white/95 backdrop-blur-md transition-all duration-200 md:static",
            collapsed ? "w-[72px]" : "w-64",
            mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          )}
        >
          {/* Logo Header */}
          <div className="flex h-16 items-center justify-between border-b border-stone-100 px-4">
            <Link to="/agaate-admin" className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-xs text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight text-stone-900 leading-tight">Agaate</span>
                  <span className="text-[10px] font-medium text-emerald-700 uppercase tracking-wider">
                    Enterprise Admin
                  </span>
                </div>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {NAV_GROUPS.map((group) => {
              const visibleItems = group.items.filter(
                (item) => !item.adminOnly || canManageSettings(user.role as AdminRole),
              );
              if (visibleItems.length === 0) return null;

              return (
                <div key={group.group} className="space-y-1">
                  {!collapsed && (
                    <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                      {group.group}
                    </p>
                  )}
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const active = item.exact
                      ? pathname === item.to
                      : pathname === item.to || pathname.startsWith(`${item.to}/`);
                    const count = item.badge ? item.badge(notes) : 0;

                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          "group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-all",
                          active
                            ? "bg-emerald-50/90 text-emerald-900 font-semibold shadow-2xs"
                            : "text-stone-600 hover:bg-stone-100/70 hover:text-stone-900",
                          collapsed && "justify-center px-0 py-2.5",
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-colors",
                              active ? "text-emerald-700 stroke-[2.2]" : "text-stone-400 group-hover:text-stone-700 stroke-[1.8]",
                            )}
                          />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                        </div>
                        {!collapsed && count > 0 && (
                          <span
                            className={cn(
                              "rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none",
                              active ? "bg-emerald-200/80 text-emerald-900" : "bg-stone-200/80 text-stone-700",
                            )}
                          >
                            {count}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          {/* Profile & Footer */}
          <div className="border-t border-stone-100 p-3">
            <div
              className={cn(
                "flex items-center gap-2.5 rounded-xl p-2 bg-stone-50/80 border border-stone-200/50",
                collapsed && "justify-center p-1.5",
              )}
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800 text-xs shadow-2xs">
                {user.name.charAt(0).toUpperCase()}
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              {!collapsed && (
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate text-xs font-semibold text-stone-900 leading-tight">{user.name}</p>
                  <p className="truncate text-[10px] text-stone-400 capitalize">{user.role.replace("_", " ")}</p>
                </div>
              )}
              {!collapsed && (
                <button
                  type="button"
                  onClick={async () => {
                    await logoutAdmin();
                    await navigate({ to: "/agaate-admin/login", search: { redirect: undefined } });
                  }}
                  title="Sign out"
                  className="rounded-lg p-1 text-stone-400 hover:bg-stone-200/60 hover:text-stone-700 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top Sticky Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200/70 bg-white/90 px-4 md:px-8 backdrop-blur-md">
            {/* Left: Mobile Toggle & Breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex md:hidden h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
              >
                <PanelLeft className="h-4 w-4" />
              </button>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-400">
                <span className="font-medium text-stone-500">Agaate</span>
                <ChevronRight className="h-3 w-3 text-stone-300" />
                <span className="font-semibold text-stone-800">{breadcrumb}</span>
              </div>
            </div>

            {/* Center: Command Palette Trigger Button */}
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-stone-50/70 px-3 py-1.5 text-xs text-stone-500 shadow-2xs hover:bg-stone-100 hover:text-stone-800 transition-all sm:w-64 justify-between"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-stone-400" />
                <span className="hidden sm:inline">Search anything...</span>
                <span className="sm:hidden">Search...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center rounded border border-stone-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-stone-400">
                ⌘K
              </kbd>
            </button>

            {/* Right: Date, Quick Actions, Notifications */}
            <div className="flex items-center gap-2.5">
              <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-stone-400 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-100">
                <span>{currentDateFormatted}</span>
              </div>

              {/* Quick Action Button */}
              <Link
                to="/agaate-admin/contacts"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Request</span>
              </Link>

              {/* Notifications Dropdown Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200/80 bg-white text-stone-600 shadow-2xs hover:bg-stone-50 transition-colors"
                  title="Notifications"
                >
                  <Bell className="h-4 w-4 text-stone-600 stroke-[1.8]" />
                  {badgeTotal > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white shadow-xs">
                      {badgeTotal}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Popover */}
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <div className="absolute right-0 mt-2 z-50 w-80 rounded-2xl border border-stone-200/90 bg-white p-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2 px-1">
                        <span className="text-xs font-semibold text-stone-900">Notifications & Alerts</span>
                        <Link
                          to="/agaate-admin/notifications"
                          onClick={() => setNotifOpen(false)}
                          className="text-[11px] font-medium text-emerald-700 hover:underline inline-flex items-center gap-0.5"
                        >
                          View all <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </div>
                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-start gap-2.5 rounded-xl p-2 bg-emerald-50/60 border border-emerald-100">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                          <div className="text-xs">
                            <p className="font-semibold text-emerald-950">{notes.newToday} New Inquiries Today</p>
                            <p className="text-emerald-700 text-[11px]">Farmers requested nursery & setup calls</p>
                          </div>
                        </div>
                        {notes.dueToday > 0 && (
                          <div className="flex items-start gap-2.5 rounded-xl p-2 bg-amber-50/60 border border-amber-100">
                            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                            <div className="text-xs">
                              <p className="font-semibold text-amber-950">{notes.dueToday} Follow-ups Due Today</p>
                              <p className="text-amber-700 text-[11px]">Scheduled farm inspections & callbacks</p>
                            </div>
                          </div>
                        )}
                        {notes.overdue > 0 && (
                          <div className="flex items-start gap-2.5 rounded-xl p-2 bg-rose-50/60 border border-rose-100">
                            <AlertCircle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                            <div className="text-xs">
                              <p className="font-semibold text-rose-950">{notes.overdue} Overdue Contacts</p>
                              <p className="text-rose-700 text-[11px]">Requires prompt agronomist response</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
