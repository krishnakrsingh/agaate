import type { LucideIcon } from "lucide-react";
import {
  BarChart2,
  BookOpen,
  Briefcase,
  Globe,
  Image,
  Layout,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  MessageSquare,
  Settings,
  Smartphone,
  Store,
  TreePine,
  UsersRound,
  Video,
} from "lucide-react";

export type AdminCmsNavItem = {
  to: string;
  label: string;
  group: string;
  icon: LucideIcon;
  keywords?: string;
};

export const ADMIN_COMMAND_PAGES: AdminCmsNavItem[] = [
  { to: "/agaate-admin", label: "Dashboard", group: "Overview", icon: LayoutDashboard },
  { to: "/agaate-admin/content", label: "Content library", group: "Website", icon: Globe, keywords: "overview cms" },
  { to: "/agaate-admin/content/site-contact", label: "Site contact & social", group: "Global", icon: MessageCircle, keywords: "phone whatsapp email footer" },
  { to: "/agaate-admin/content/stats", label: "Site statistics", group: "Homepage", icon: BarChart2, keywords: "numbers metrics" },
  { to: "/agaate-admin/content/logos", label: "Brand logos", group: "Homepage", icon: Image, keywords: "partners buyers" },
  { to: "/agaate-admin/content/stories", label: "Farmer testimonials", group: "Homepage", icon: Video, keywords: "reviews reels video" },
  { to: "/agaate-admin/content/team", label: "Team members", group: "Homepage", icon: UsersRound },
  { to: "/agaate-admin/content/homepage-chapters", label: "Homepage sections", group: "Homepage", icon: Layout, keywords: "pillars app closing" },
  { to: "/agaate-admin/content/app-links", label: "App store links", group: "Homepage", icon: Smartphone },
  { to: "/agaate-admin/content/agri-park-tour", label: "Agri Park", group: "Homepage", icon: TreePine, keywords: "video tour chapter" },
  { to: "/agaate-admin/content/about", label: "About page", group: "Pages", icon: BookOpen },
  { to: "/agaate-admin/content/contact-page", label: "Contact page", group: "Pages", icon: MessageSquare, keywords: "faq form" },
  { to: "/agaate-admin/content/kisaan-mall", label: "Kisaan Mall", group: "Pages", icon: Store, keywords: "waitlist mall" },
  { to: "/agaate-admin/content/careers", label: "Careers", group: "Pages", icon: Briefcase, keywords: "jobs applications" },
  { to: "/agaate-admin/farm-visits", label: "Farm visits", group: "Inquiries", icon: MapPin },
  { to: "/agaate-admin/settings", label: "Email & SMTP settings", group: "Configuration", icon: Settings },
];

export const ADMIN_COMMAND_GROUPS = [
  "Overview",
  "Website",
  "Global",
  "Homepage",
  "Pages",
  "Inquiries",
  "Configuration",
] as const;
