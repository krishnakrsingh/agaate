import type { LucideIcon } from "lucide-react";
import {
  BarChart2,
  BookOpen,
  Briefcase,
  ClipboardCheck,
  FileSearch,
  Globe,
  Image,
  Layout,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  MessageSquare,
  Search,
  Settings,
  Smartphone,
  Store,
  TreePine,
  UserCheck,
  UsersRound,
  Video,
  ArrowRightLeft,
} from "lucide-react";

export type AdminCmsNavItem = {
  to: string;
  label: string;
  group: string;
  icon: LucideIcon;
  keywords?: string;
  id?: string;
  search?: {
    tab?: "sections" | "agri-park" | "email" | "users" | "app-links";
  };
};

export const ADMIN_COMMAND_PAGES: AdminCmsNavItem[] = [
  { to: "/agaate-admin", label: "Dashboard", group: "Overview", icon: LayoutDashboard },
  {
    to: "/agaate-admin/content",
    label: "Content library",
    group: "Website",
    icon: Globe,
    keywords: "overview cms",
  },
  {
    to: "/agaate-admin/content/site-contact",
    label: "Site contact & social",
    group: "Global",
    icon: MessageCircle,
    keywords: "phone whatsapp email footer",
  },
  {
    to: "/agaate-admin/content/stats",
    label: "Site statistics",
    group: "Homepage",
    icon: BarChart2,
    keywords: "numbers metrics",
  },
  {
    to: "/agaate-admin/content/logos",
    label: "Brand logos",
    group: "Homepage",
    icon: Image,
    keywords: "partners buyers",
  },
  {
    to: "/agaate-admin/content/stories",
    label: "Farmer testimonials",
    group: "Homepage",
    icon: Video,
    keywords: "reviews reels video",
  },
  { to: "/agaate-admin/content/team", label: "Team members", group: "Homepage", icon: UsersRound },
  {
    to: "/agaate-admin/content/homepage-chapters",
    label: "Homepage sections",
    group: "Homepage",
    icon: Layout,
    keywords: "pillars app closing agri park",
  },
  {
    to: "/agaate-admin/content/homepage-chapters",
    id: "homepage-agri-park",
    label: "Agri Park",
    group: "Homepage",
    icon: TreePine,
    keywords: "video tour chapter nursery",
    search: { tab: "agri-park" },
  },
  { to: "/agaate-admin/content/about", label: "About page", group: "Pages", icon: BookOpen },
  {
    to: "/agaate-admin/content/contact-page",
    label: "Contact page",
    group: "Pages",
    icon: MessageSquare,
    keywords: "faq form",
  },
  {
    to: "/agaate-admin/content/kisaan-mall",
    label: "Kisaan Mall",
    group: "Pages",
    icon: Store,
    keywords: "waitlist mall",
  },
  {
    to: "/agaate-admin/careers",
    label: "Careers",
    group: "Operations",
    icon: Briefcase,
    keywords: "jobs applications hiring",
  },
  {
    to: "/agaate-admin/locations",
    label: "Locations",
    group: "Operations",
    icon: MapPin,
    keywords: "facilities hubs map contact franchise",
  },
  { to: "/agaate-admin/farm-visits", label: "Farm visits", group: "Inquiries", icon: MapPin },
  {
    to: "/agaate-admin/seo",
    label: "SEO Manager",
    group: "SEO",
    icon: Search,
    keywords: "meta title description sitemap robots",
  },
  {
    to: "/agaate-admin/seo/global",
    label: "Global SEO settings",
    group: "SEO",
    icon: Globe,
    keywords: "website url verification",
  },
  {
    to: "/agaate-admin/seo/pages",
    label: "Page SEO",
    group: "SEO",
    icon: FileSearch,
    keywords: "canonical og twitter",
  },
  {
    to: "/agaate-admin/seo/redirects",
    label: "URL redirects",
    group: "SEO",
    icon: ArrowRightLeft,
    keywords: "301 302",
  },
  {
    to: "/agaate-admin/seo/audit",
    label: "SEO audit",
    group: "SEO",
    icon: ClipboardCheck,
    keywords: "scan issues",
  },
  {
    to: "/agaate-admin/access",
    label: "Users & access",
    group: "Configuration",
    icon: UsersRound,
    keywords: "roles permissions staff accounts",
  },
  {
    to: "/agaate-admin/profile",
    label: "My profile",
    group: "Configuration",
    icon: UserCheck,
    keywords: "password name account",
  },
  {
    to: "/agaate-admin/settings",
    id: "settings-app-links",
    label: "App store links",
    group: "Configuration",
    icon: Smartphone,
    keywords: "google play apple download badges",
    search: { tab: "app-links" },
  },
  {
    to: "/agaate-admin/settings",
    id: "settings-email",
    label: "Email & SMTP settings",
    group: "Configuration",
    icon: Settings,
  },
];

export const ADMIN_COMMAND_GROUPS = [
  "Overview",
  "Website",
  "Global",
  "Homepage",
  "Pages",
  "Operations",
  "Inquiries",
  "SEO",
  "Configuration",
] as const;
