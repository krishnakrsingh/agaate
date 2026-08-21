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
  Sparkles,
  ArrowUpRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronsUpDown,
  Globe,
  Image,
  Video,
  BarChart2,
  UsersRound,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { logoutAdmin } from "@/functions/admin-auth";
import { getAdminNotifications } from "@/functions/admin-contacts";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/admin-constants";
import { ToastProvider } from "@/components/admin/AdminToast";
import { AdminCommandPalette } from "@/components/admin/AdminCommandPalette";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
    group: "Platform",
    items: [
      { to: "/agaate-admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      {
        to: "/agaate-admin/contacts",
        label: "Contact Inquiries",
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
      { to: "/agaate-admin/customers", label: "Growers Directory", icon: Users },
      { to: "/agaate-admin/agronomists", label: "Agronomists", icon: UserCheck },
    ],
  },
  {
    group: "Website",
    items: [
      { to: "/agaate-admin/content", label: "Content overview", icon: Globe, exact: true },
      { to: "/agaate-admin/content/stats", label: "Site statistics", icon: BarChart2 },
      { to: "/agaate-admin/content/logos", label: "Brand logos", icon: Image },
      { to: "/agaate-admin/content/stories", label: "Farmer testimonials", icon: Video },
      { to: "/agaate-admin/content/team", label: "Team members", icon: UsersRound },
    ],
  },
  {
    group: "Configuration",
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
  const [commandOpen, setCommandOpen] = useState(false);
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

  // Global ⌘K listener
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

  const breadcrumbSegments = useMemo(() => {
    if (pathname === "/agaate-admin" || pathname === "/agaate-admin/") {
      return [{ label: "Dashboard", href: "/agaate-admin", current: true }];
    }
    if (pathname.startsWith("/agaate-admin/contacts/")) {
      return [
        { label: "Contacts", href: "/agaate-admin/contacts", current: false },
        { label: "Lead Detail", href: pathname, current: true },
      ];
    }
    if (pathname === "/agaate-admin/contacts") {
      return [
        { label: "Platform", href: "/agaate-admin/contacts", current: false },
        { label: "Contact Inquiries", href: "/agaate-admin/contacts", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/farm-visits")) {
      return [
        { label: "Platform", href: "/agaate-admin/farm-visits", current: false },
        { label: "Farm Visits", href: "/agaate-admin/farm-visits", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/consultations")) {
      return [
        { label: "Platform", href: "/agaate-admin/consultations", current: false },
        { label: "Consultations", href: "/agaate-admin/consultations", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/customers")) {
      return [
        { label: "Directory", href: "/agaate-admin/customers", current: false },
        { label: "Growers", href: "/agaate-admin/customers", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/agronomists")) {
      return [
        { label: "Directory", href: "/agaate-admin/agronomists", current: false },
        { label: "Agronomists", href: "/agaate-admin/agronomists", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/analytics")) {
      return [
        { label: "Configuration", href: "/agaate-admin/analytics", current: false },
        { label: "Analytics", href: "/agaate-admin/analytics", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/notifications")) {
      return [
        { label: "Configuration", href: "/agaate-admin/notifications", current: false },
        { label: "Notifications", href: "/agaate-admin/notifications", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/settings")) {
      return [
        { label: "Configuration", href: "/agaate-admin/settings", current: false },
        { label: "Settings", href: "/agaate-admin/settings", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/stats")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Site statistics", href: "/agaate-admin/content/stats", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/logos")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Brand logos", href: "/agaate-admin/content/logos", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/stories")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Farmer testimonials", href: "/agaate-admin/content/stories", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/team")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Team members", href: "/agaate-admin/content/team", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Content overview", href: "/agaate-admin/content", current: true },
      ];
    }
    return [{ label: "Admin", href: "/agaate-admin", current: true }];
  }, [pathname]);

  return (
    <ToastProvider>
      <AdminCommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
          {/* Header */}
          <SidebarHeader className="h-14 flex flex-row items-center justify-between border-b border-sidebar-border px-4 py-0 shrink-0">
            <Link to="/agaate-admin" className="flex items-center">
              <img
                src="/logo.png"
                alt="Agaate"
                className="h-8 md:h-9 w-auto max-w-[165px] object-contain object-left block"
              />
            </Link>
          </SidebarHeader>

          {/* Nav groups */}
          <SidebarContent className="px-2 py-2">
            {NAV_GROUPS.map((group) => {
              const visibleItems = group.items.filter(
                (item) => !item.adminOnly || canManageSettings(user.role as AdminRole)
              );
              if (visibleItems.length === 0) return null;

              return (
                <SidebarGroup key={group.group} className="py-1">
                  <SidebarGroupLabel className="text-[11px] font-medium text-muted-foreground px-2">
                    {group.group}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {visibleItems.map((item) => {
                        const Icon = item.icon;
                        const active = item.exact
                          ? pathname === item.to
                          : pathname === item.to || pathname.startsWith(`${item.to}/`);
                        const count = item.badge ? item.badge(notes) : 0;

                        return (
                          <SidebarMenuItem key={item.to}>
                            <SidebarMenuButton
                              asChild
                              isActive={active}
                              tooltip={item.label}
                              className={cn(
                                "text-xs font-normal",
                                active && "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                              )}
                            >
                              <Link to={item.to}>
                                <Icon className="size-4" />
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuButton>
                            {count > 0 && (
                              <SidebarMenuBadge className="text-[10px] font-medium">
                                {count}
                              </SidebarMenuBadge>
                            )}
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              );
            })}
          </SidebarContent>

          {/* User profile dropdown in footer */}
          <SidebarFooter className="border-t border-sidebar-border p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg text-xs font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-xs leading-tight">
                        <span className="truncate font-semibold">{user.name}</span>
                        <span className="truncate text-[10px] text-muted-foreground capitalize">
                          {user.role.replace("_", " ")}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarFallback className="rounded-lg text-xs font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-xs leading-tight">
                          <span className="truncate font-semibold">{user.name}</span>
                          <span className="truncate text-[10px] text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {canManageSettings(user.role as AdminRole) && (
                        <DropdownMenuItem onClick={() => navigate({ to: "/agaate-admin/settings" })}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => setCommandOpen(true)}>
                        <Search className="mr-2 h-4 w-4" />
                        <span>Command Search (⌘K)</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        await logoutAdmin();
                        await navigate({ to: "/agaate-admin/login", search: { redirect: undefined } });
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        {/* Main Inset Header & Viewport */}
        <SidebarInset className="bg-background">
          <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border bg-background px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link to="/agaate-admin">Agaate</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbSegments.map((segment) => (
                    <span key={segment.label} className="inline-flex items-center gap-1.5">
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        {segment.current ? (
                          <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={segment.href}>{segment.label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </span>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCommandOpen(true)}
                className="h-8.5 w-9 sm:w-56 justify-between text-xs text-muted-foreground font-normal px-3 rounded-lg bg-card border-border shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <span className="hidden sm:inline-flex items-center gap-2">
                  <Search className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Search...</span>
                </span>
                <span className="sm:hidden">
                  <Search className="h-3.5 w-3.5" />
                </span>
                <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded-md border bg-muted/60 px-1.5 font-mono text-[10px] font-medium opacity-90">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon-sm" className="relative rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors" aria-label="Open notifications">
                    <Bell className="h-4 w-4" />
                    {badgeTotal > 0 && (
                      <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-destructive" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 rounded-xl border border-border shadow-lg" align="end">
                  <div className="flex items-center justify-between border-b p-3.5">
                    <span className="text-xs font-semibold text-foreground">Notifications</span>
                    <Link
                      to="/agaate-admin/notifications"
                      className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 rounded-md px-2 py-0.5 hover:bg-muted"
                    >
                      View all <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="p-2 space-y-1 text-xs">
                    <div className="flex items-start gap-2.5 rounded-md p-2 hover:bg-muted transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">{notes.newToday} New Inquiries Today</p>
                        <p className="text-[11px] text-muted-foreground">Inbound nursery & farm turnkey requests</p>
                      </div>
                    </div>
                    {notes.dueToday > 0 && (
                      <div className="flex items-start gap-2.5 rounded-md p-2 hover:bg-muted transition-colors">
                        <Clock className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{notes.dueToday} Follow-ups Due</p>
                          <p className="text-[11px] text-muted-foreground">Scheduled callbacks for today</p>
                        </div>
                      </div>
                    )}
                    {notes.overdue > 0 && (
                      <div className="flex items-start gap-2.5 rounded-md p-2 hover:bg-muted transition-colors">
                        <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-destructive">{notes.overdue} Overdue Inquiries</p>
                          <p className="text-[11px] text-muted-foreground">Requires immediate staff response</p>
                        </div>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ToastProvider>
  );
}
