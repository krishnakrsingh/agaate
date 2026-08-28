import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Search,
  ChevronsUpDown,
  Image,
  Video,
  BarChart2,
  UsersRound,
  MapPin,
  Store,
  Briefcase,
  MessageCircle,
  MessageSquare,
  BookOpen,
  Layout,
  ExternalLink,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { logoutAdmin } from "@/functions/admin-auth";
import { canManageSettings, canManageUsers, type AdminRole } from "@/lib/admin-constants";
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
  SidebarSeparator,
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
import { CmsReadOnlyBanner } from "@/components/admin/cms/CmsReadOnlyBanner";

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
  hideLabel?: boolean;
}> = [
  {
    group: "Overview",
    hideLabel: true,
    items: [{ to: "/agaate-admin", label: "Dashboard", icon: LayoutDashboard, exact: true }],
  },
  {
    group: "Site pages",
    items: [
      { to: "/agaate-admin/content/site-contact", label: "Contact & social", icon: MessageCircle },
      { to: "/agaate-admin/content/about", label: "About page", icon: BookOpen },
      { to: "/agaate-admin/content/contact-page", label: "Contact page", icon: MessageSquare },
      { to: "/agaate-admin/content/kisaan-mall", label: "Kisaan Mall", icon: Store },
      { to: "/agaate-admin/content/careers", label: "Careers", icon: Briefcase },
    ],
  },
  {
    group: "Homepage",
    items: [
      {
        to: "/agaate-admin/content/homepage-chapters",
        label: "Sections & narrative",
        icon: Layout,
      },
      { to: "/agaate-admin/content/stats", label: "Statistics", icon: BarChart2 },
      { to: "/agaate-admin/content/logos", label: "Partner logos", icon: Image },
      { to: "/agaate-admin/content/stories", label: "Testimonials", icon: Video },
      { to: "/agaate-admin/content/team", label: "Team members", icon: UsersRound },
    ],
  },
  {
    group: "Operations",
    items: [{ to: "/agaate-admin/farm-visits", label: "Farm visit bookings", icon: MapPin }],
  },
  {
    group: "SEO",
    items: [{ to: "/agaate-admin/seo", label: "SEO Manager", icon: Search, exact: true }],
  },
];

const ACCESS_NAV: NavItem = {
  to: "/agaate-admin/access",
  label: "Users & access",
  icon: UsersRound,
  adminOnly: true,
};

const SETTINGS_NAV: NavItem = {
  to: "/agaate-admin/settings",
  label: "Settings",
  icon: Settings,
  adminOnly: true,
};

function isNavActive(pathname: string, item: NavItem) {
  return item.exact
    ? pathname === item.to
    : pathname === item.to || pathname.startsWith(`${item.to}/`);
}

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
        { label: "System", href: "/agaate-admin/settings", current: false },
        { label: "Settings", href: "/agaate-admin/settings", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/access")) {
      return [
        { label: "System", href: "/agaate-admin/access", current: false },
        { label: "Users & access", href: "/agaate-admin/access", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/profile")) {
      return [{ label: "My profile", href: "/agaate-admin/profile", current: true }];
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
    if (pathname.startsWith("/agaate-admin/content/site-contact")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        {
          label: "Site contact & social",
          href: "/agaate-admin/content/site-contact",
          current: true,
        },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/homepage-chapters")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        {
          label: "Homepage sections",
          href: "/agaate-admin/content/homepage-chapters",
          current: true,
        },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/about")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "About page", href: "/agaate-admin/content/about", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/contact-page")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Contact page", href: "/agaate-admin/content/contact-page", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/kisaan-mall")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Kisaan Mall waitlist", href: "/agaate-admin/content/kisaan-mall", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/content/careers")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Careers", href: "/agaate-admin/content/careers", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/farm-visits")) {
      return [
        { label: "Inquiries", href: "/agaate-admin/farm-visits", current: false },
        { label: "Farm visits", href: "/agaate-admin/farm-visits", current: true },
      ];
    }
    if (pathname.startsWith("/agaate-admin/seo")) {
      const segments = [
        { label: "SEO", href: "/agaate-admin/seo", current: pathname === "/agaate-admin/seo" },
      ];
      if (pathname.includes("/global")) {
        segments.push({ label: "Global settings", href: "/agaate-admin/seo/global", current: true });
      } else if (pathname.includes("/pages")) {
        segments.push({ label: "Pages", href: "/agaate-admin/seo/pages", current: pathname.endsWith("/pages") || pathname.endsWith("/pages/") });
        if (!pathname.endsWith("/pages") && !pathname.endsWith("/pages/")) {
          segments.push({ label: "Edit page", href: pathname, current: true });
        }
      } else if (pathname.includes("/redirects")) {
        segments.push({ label: "Redirects", href: "/agaate-admin/seo/redirects", current: true });
      } else if (pathname.includes("/audit")) {
        segments.push({ label: "Audit", href: "/agaate-admin/seo/audit", current: true });
      }
      return segments;
    }
    if (pathname.startsWith("/agaate-admin/content")) {
      return [
        { label: "Website", href: "/agaate-admin/content", current: false },
        { label: "Content library", href: "/agaate-admin/content", current: true },
      ];
    }
    return [{ label: "Admin", href: "/agaate-admin", current: true }];
  }, [pathname]);

  return (
    <ToastProvider>
      <AdminCommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
      <SidebarProvider defaultOpen>
        <Sidebar
          collapsible="icon"
          className="border-r border-sidebar-border/70 bg-sidebar text-sidebar-foreground"
        >
          <SidebarHeader className="border-b border-sidebar-border/60 px-2 py-3">
            <Link
              to="/agaate-admin"
              className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent/60 group-data-[collapsible=icon]:justify-center"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/10 ring-1 ring-sidebar-border/80">
                <img src="/logo11.png" alt="" className="h-6 w-6 object-contain" />
              </div>
              <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">
                  Agaate
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-sidebar-foreground/50">
                  Admin Console
                </p>
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent className="gap-0 px-2 py-3">
            <SidebarGroup className="py-0">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip="Search (⌘K)"
                      onClick={() => setCommandOpen(true)}
                      className="h-9 rounded-lg border border-sidebar-border/60 bg-sidebar-accent/30 text-sidebar-foreground/80 shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <Search className="size-4 opacity-70" />
                      <span className="font-medium">Search</span>
                      <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-0.5 rounded border border-sidebar-border/80 bg-background/60 px-1.5 font-mono text-[10px] font-medium text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
                        ⌘K
                      </kbd>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator className="my-2 bg-sidebar-border/60" />

            {NAV_GROUPS.map((group) => {
              const visibleItems = group.items.filter(
                (item) => !item.adminOnly || canManageSettings(user.role as AdminRole),
              );
              if (visibleItems.length === 0) return null;

              return (
                <SidebarGroup key={group.group} className="py-1">
                  {!group.hideLabel ? (
                    <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-sidebar-foreground/45">
                      {group.group}
                    </SidebarGroupLabel>
                  ) : null}
                  <SidebarGroupContent>
                    <SidebarMenu className="gap-0.5">
                      {visibleItems.map((item) => {
                        const Icon = item.icon;
                        const active = isNavActive(pathname, item);

                        return (
                          <SidebarMenuItem key={item.to}>
                            <SidebarMenuButton
                              asChild
                              isActive={active}
                              tooltip={item.label}
                              className={cn(
                                "h-9 rounded-lg text-[13px] font-medium text-sidebar-foreground/75 transition-all",
                                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                active &&
                                  "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground",
                              )}
                            >
                              <Link to={item.to}>
                                <Icon
                                  className={cn("size-4", active ? "opacity-100" : "opacity-70")}
                                />
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

            {canManageUsers(user.role as AdminRole) ? (
              <>
                <SidebarSeparator className="my-2 bg-sidebar-border/60" />
                <SidebarGroup className="py-1">
                  <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-sidebar-foreground/45">
                    System
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isNavActive(pathname, ACCESS_NAV)}
                          tooltip={ACCESS_NAV.label}
                          className={cn(
                            "h-9 rounded-lg text-[13px] font-medium text-sidebar-foreground/75 transition-all",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isNavActive(pathname, ACCESS_NAV) &&
                              "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground",
                          )}
                        >
                          <Link to={ACCESS_NAV.to}>
                            <UsersRound className="size-4 opacity-70" />
                            <span>{ACCESS_NAV.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      {canManageSettings(user.role as AdminRole) ? (
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={isNavActive(pathname, SETTINGS_NAV)}
                            tooltip={SETTINGS_NAV.label}
                            className={cn(
                              "h-9 rounded-lg text-[13px] font-medium text-sidebar-foreground/75 transition-all",
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              isNavActive(pathname, SETTINGS_NAV) &&
                                "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground",
                            )}
                          >
                            <Link to={SETTINGS_NAV.to}>
                              <Settings className="size-4 opacity-70" />
                              <span>{SETTINGS_NAV.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ) : null}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            ) : canManageSettings(user.role as AdminRole) ? (
              <>
                <SidebarSeparator className="my-2 bg-sidebar-border/60" />
                <SidebarGroup className="py-1">
                  <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-sidebar-foreground/45">
                    System
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isNavActive(pathname, SETTINGS_NAV)}
                          tooltip={SETTINGS_NAV.label}
                          className={cn(
                            "h-9 rounded-lg text-[13px] font-medium text-sidebar-foreground/75 transition-all",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isNavActive(pathname, SETTINGS_NAV) &&
                              "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground",
                          )}
                        >
                          <Link to={SETTINGS_NAV.to}>
                            <Settings className="size-4 opacity-70" />
                            <span>{SETTINGS_NAV.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            ) : null}
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border/60 p-2">
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="View public website"
                  className="h-9 rounded-lg text-[13px] font-medium text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4 opacity-70" />
                    <span>View website</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="h-12 rounded-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/60"
                    >
                      <Avatar className="h-8 w-8 rounded-lg ring-1 ring-sidebar-border/60">
                        <AvatarFallback className="rounded-lg bg-sidebar-primary/15 text-xs font-semibold text-sidebar-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-xs leading-tight">
                        <span className="truncate font-semibold text-sidebar-foreground">
                          {user.name}
                        </span>
                        <span className="truncate text-[10px] font-medium uppercase tracking-wide text-sidebar-foreground/50">
                          {user.role.replace("_", " ")}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4 text-sidebar-foreground/40" />
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
                          <span className="truncate text-[10px] text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate({ to: "/agaate-admin/profile" })}>
                        <UserCheck className="mr-2 h-4 w-4" />
                        <span>My profile</span>
                      </DropdownMenuItem>
                      {canManageSettings(user.role as AdminRole) && (
                        <DropdownMenuItem
                          onClick={() => navigate({ to: "/agaate-admin/settings" })}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      )}
                      {canManageUsers(user.role as AdminRole) && (
                        <DropdownMenuItem onClick={() => navigate({ to: "/agaate-admin/access" })}>
                          <UsersRound className="mr-2 h-4 w-4" />
                          <span>Users & access</span>
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
                        await navigate({
                          to: "/agaate-admin/login",
                          search: { redirect: undefined },
                        });
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
            {!canManageSettings(user.role as AdminRole) ? <CmsReadOnlyBanner /> : null}
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ToastProvider>
  );
}
