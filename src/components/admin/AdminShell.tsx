import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Search,
  ChevronsUpDown,
  Globe,
  Image,
  Video,
  BarChart2,
  UsersRound,
  Smartphone,
  MapPin,
  Store,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { logoutAdmin } from "@/functions/admin-auth";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  adminOnly?: boolean;
};

const NAV_GROUPS: Array<{
  group: string;
  items: NavItem[];
}> = [
  {
    group: "Overview",
    items: [{ to: "/agaate-admin", label: "Dashboard", icon: LayoutDashboard, exact: true }],
  },
  {
    group: "Website",
    items: [
      { to: "/agaate-admin/content", label: "Content overview", icon: Globe, exact: true },
      { to: "/agaate-admin/content/stats", label: "Site statistics", icon: BarChart2 },
      { to: "/agaate-admin/content/logos", label: "Brand logos", icon: Image },
      { to: "/agaate-admin/content/stories", label: "Farmer testimonials", icon: Video },
      { to: "/agaate-admin/content/team", label: "Team members", icon: UsersRound },
      { to: "/agaate-admin/content/app-links", label: "App store links", icon: Smartphone },
      { to: "/agaate-admin/content/agri-park-tour", label: "Agri Park video", icon: Video },
      { to: "/agaate-admin/content/kisaan-mall", label: "Kisaan Mall waitlist", icon: Store },
    ],
  },
  {
    group: "Inquiries",
    items: [{ to: "/agaate-admin/farm-visits", label: "Farm Visits", icon: MapPin }],
  },
  {
    group: "Configuration",
    items: [{ to: "/agaate-admin/settings", label: "Settings", icon: Settings, adminOnly: true }],
  },
];

export function AdminShell({ user }: { user: SessionUser }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [commandOpen, setCommandOpen] = useState(false);

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

  const breadcrumbSegments = useMemo(() => {
    if (pathname === "/agaate-admin" || pathname === "/agaate-admin/") {
      return [{ label: "Dashboard", href: "/agaate-admin", current: true }];
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
    if (pathname.startsWith("/agaate-admin/content/app-links")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "App store links", href: "/agaate-admin/content/app-links", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/agri-park-tour")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Agri Park video", href: "/agaate-admin/content/agri-park-tour", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/kisaan-mall")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Kisaan Mall waitlist", href: "/agaate-admin/content/kisaan-mall", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/farm-visits")) {
      return [
        { label: "Inquiries", href: "/agaate-admin/farm-visits", current: false },
        { label: "Farm Visits", href: "/agaate-admin/farm-visits", current: true },
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
          <SidebarHeader className="h-14 flex flex-row items-center justify-between border-b border-sidebar-border px-4 py-0 shrink-0">
            <Link to="/agaate-admin" className="flex items-center">
              <img
                src="/logo.png"
                alt="Agaate"
                className="h-8 md:h-9 w-auto max-w-[165px] object-contain object-left block"
              />
            </Link>
          </SidebarHeader>

          <SidebarContent className="px-2 py-2">
            {NAV_GROUPS.map((group) => {
              const visibleItems = group.items.filter(
                (item) => !item.adminOnly || canManageSettings(user.role as AdminRole),
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

                        return (
                          <SidebarMenuItem key={item.to}>
                            <SidebarMenuButton
                              asChild
                              isActive={active}
                              tooltip={item.label}
                              className={cn(
                                "text-xs font-normal",
                                active && "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
                              )}
                            >
                              <Link to={item.to}>
                                <Icon className="size-4" />
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              );
            })}
          </SidebarContent>

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
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ToastProvider>
  );
}
