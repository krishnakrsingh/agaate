import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  UserCheck,
  BarChart3,
  Bell,
  Settings,
  PlusCircle,
  FileSpreadsheet,
  PhoneCall,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type CommandItem = {
  id: string;
  category: "Navigation" | "Quick Actions" | "Customers & Leads" | "Agronomists";
  title: string;
  subtitle?: string;
  icon: typeof LayoutDashboard;
  action: () => void;
  keywords?: string[];
};

export function AdminCommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: "nav-dashboard",
        category: "Navigation",
        title: "Go to Dashboard",
        subtitle: "Overview, metrics, conversion charts",
        icon: LayoutDashboard,
        action: () => navigate({ to: "/agaate-admin" }),
        keywords: ["home", "stats", "metrics", "analytics"],
      },
      {
        id: "nav-contacts",
        category: "Navigation",
        title: "Go to Contact Requests",
        subtitle: "CRM pipeline, all incoming farmer requests",
        icon: Users,
        action: () => navigate({ to: "/agaate-admin/contacts" }),
        keywords: ["leads", "requests", "crm", "tickets", "farmers"],
      },
      {
        id: "nav-farm-visits",
        category: "Navigation",
        title: "Go to Farm Visits",
        subtitle: "Field schedule & agronomist visit itinerary",
        icon: Calendar,
        action: () => navigate({ to: "/agaate-admin/farm-visits" }),
        keywords: ["visits", "field", "schedule", "inspection"],
      },
      {
        id: "nav-consultations",
        category: "Navigation",
        title: "Go to Consultations",
        subtitle: "Agronomy advisory & diagnostic tickets",
        icon: FileText,
        action: () => navigate({ to: "/agaate-admin/consultations" }),
        keywords: ["advisory", "advice", "diagnosis", "crop"],
      },
      {
        id: "nav-customers",
        category: "Navigation",
        title: "Go to Customers Directory",
        subtitle: "Farmer profiles, acreage, crop history",
        icon: Users,
        action: () => navigate({ to: "/agaate-admin/customers" }),
        keywords: ["clients", "growers", "landowners", "directory"],
      },
      {
        id: "nav-agronomists",
        category: "Navigation",
        title: "Go to Agronomists Team",
        subtitle: "Field specialists, territory workload & capacity",
        icon: UserCheck,
        action: () => navigate({ to: "/agaate-admin/agronomists" }),
        keywords: ["team", "staff", "assignees", "workload"],
      },
      {
        id: "nav-analytics",
        category: "Navigation",
        title: "Go to Analytics",
        subtitle: "Conversion rates, volume benchmarks",
        icon: BarChart3,
        action: () => navigate({ to: "/agaate-admin/analytics" }),
        keywords: ["reports", "charts", "graphs", "kpi"],
      },
      {
        id: "nav-notifications",
        category: "Navigation",
        title: "Go to Notifications Center",
        subtitle: "Overdue follow-ups, today's visits, new leads",
        icon: Bell,
        action: () => navigate({ to: "/agaate-admin/notifications" }),
        keywords: ["alerts", "reminders", "tasks", "due"],
      },
      {
        id: "nav-settings",
        category: "Navigation",
        title: "Go to Settings",
        subtitle: "Response templates, business hours, team users",
        icon: Settings,
        action: () => navigate({ to: "/agaate-admin/settings" }),
        keywords: ["config", "whatsapp template", "email template", "categories", "users"],
      },
      // Quick Actions
      {
        id: "act-new-contact",
        category: "Quick Actions",
        title: "Create Contact Request",
        subtitle: "Manually log a farmer inquiry or lead",
        icon: PlusCircle,
        action: () => navigate({ to: "/agaate-admin/contacts" }),
        keywords: ["add", "new", "create", "ticket"],
      },
      {
        id: "act-schedule-visit",
        category: "Quick Actions",
        title: "Schedule Field Farm Visit",
        subtitle: "Book an agronomist inspection date",
        icon: Calendar,
        action: () => navigate({ to: "/agaate-admin/farm-visits" }),
        keywords: ["book", "visit", "schedule", "field"],
      },
      {
        id: "act-export-csv",
        category: "Quick Actions",
        title: "Export CRM Contacts to CSV",
        subtitle: "Download all records spreadsheet",
        icon: FileSpreadsheet,
        action: () => navigate({ to: "/agaate-admin/contacts" }),
        keywords: ["download", "excel", "sheets", "backup"],
      },
      // Sample Farmers
      {
        id: "cust-ramesh",
        category: "Customers & Leads",
        title: "Ramesh Patel · Chilli (15–50 Acres)",
        subtitle: "Ticket AGA-2026-8000 · Varanasi, UP · High Priority",
        icon: PhoneCall,
        action: () => navigate({ to: "/agaate-admin/contacts/$id", params: { id: "1" } }),
        keywords: ["ramesh", "patel", "chilli", "varanasi", "8000"],
      },
      {
        id: "cust-sunita",
        category: "Customers & Leads",
        title: "Sunita Devi · Tomato (50+ Acres)",
        subtitle: "Ticket AGA-2026-8001 · Nashik, MH · Urgent Priority",
        icon: PhoneCall,
        action: () => navigate({ to: "/agaate-admin/contacts/$id", params: { id: "2" } }),
        keywords: ["sunita", "devi", "tomato", "nashik", "8001"],
      },
      {
        id: "cust-harpreet",
        category: "Customers & Leads",
        title: "Harpreet Singh · Wheat & Carbon (5–15 Acres)",
        subtitle: "Ticket AGA-2026-8002 · Ludhiana, PB · Medium Priority",
        icon: PhoneCall,
        action: () => navigate({ to: "/agaate-admin/contacts/$id", params: { id: "3" } }),
        keywords: ["harpreet", "singh", "wheat", "carbon", "ludhiana", "8002"],
      },
      // Agronomists
      {
        id: "agro-aman",
        category: "Agronomists",
        title: "Aman Verma · Senior Agronomist",
        subtitle: "aman@agaate.in · 6 Active Farm Visits",
        icon: UserCheck,
        action: () => navigate({ to: "/agaate-admin/agronomists" }),
        keywords: ["aman", "verma", "agronomist", "specialist"],
      },
      {
        id: "agro-rahul",
        category: "Agronomists",
        title: "Rahul Sharma · Agronomy Lead & Admin",
        subtitle: "rahul@agaate.in · 8 Active Cases",
        icon: UserCheck,
        action: () => navigate({ to: "/agaate-admin/agronomists" }),
        keywords: ["rahul", "sharma", "lead"],
      },
    ],
    [navigate],
  );

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase().trim();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle?.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-stone-900/30 pt-[14vh] px-4 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-2xl transition-all animate-in zoom-in-95 duration-150 flex flex-col max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 border-b border-stone-100 px-4 py-3.5">
          <Search className="h-4 w-4 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search requests, farmers, or pages..."
            className="w-full bg-transparent text-sm text-stone-800 placeholder-stone-400 outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10px] font-medium text-stone-500">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="overflow-y-auto p-2 space-y-3">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <Sparkles className="mx-auto h-7 w-7 text-stone-300 mb-2 stroke-[1.5]" />
              <p className="text-sm font-medium text-stone-600">No matching commands or requests</p>
              <p className="text-xs text-stone-400 mt-0.5">Try searching by ticket ID, farmer name, crop, or page</p>
            </div>
          ) : (
            Object.entries(
              filteredCommands.reduce<Record<string, CommandItem[]>>((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item);
                return acc;
              }, {}),
            ).map(([category, items]) => (
              <div key={category}>
                <div className="px-2 py-1 text-[11px] font-semibold tracking-wider text-stone-400 uppercase">
                  {category}
                </div>
                <div className="space-y-0.5 mt-1">
                  {items.map((item) => {
                    const itemGlobalIndex = filteredCommands.findIndex((c) => c.id === item.id);
                    const isSelected = itemGlobalIndex === selectedIndex;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          item.action();
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(itemGlobalIndex)}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                          isSelected
                            ? "bg-emerald-50 text-emerald-950 font-medium"
                            : "text-stone-700 hover:bg-stone-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-1.5 rounded-lg shrink-0 ${
                              isSelected ? "bg-white text-emerald-700 shadow-2xs" : "bg-stone-100 text-stone-500"
                            }`}
                          >
                            <Icon className="h-4 w-4 stroke-[1.75]" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-stone-900">{item.title}</p>
                            {item.subtitle && (
                              <p className="truncate text-[11px] text-stone-500 font-normal">{item.subtitle}</p>
                            )}
                          </div>
                        </div>
                        {isSelected && <ArrowRight className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-stone-100 bg-stone-50/70 px-4 py-2.5 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-stone-200 bg-white px-1 py-0.5 text-[10px]">↑</kbd>
              <kbd className="rounded border border-stone-200 bg-white px-1 py-0.5 text-[10px]">↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-stone-200 bg-white px-1.5 py-0.5 text-[10px]">↵</kbd> to select
            </span>
          </div>
          <span className="text-stone-400 font-medium">Agaate Command</span>
        </div>
      </div>
    </div>
  );
}
