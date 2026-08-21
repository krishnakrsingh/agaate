import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
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
  Sprout,
  ShieldAlert,
  Globe,
  BarChart2,
  Image,
  Video,
  UsersRound,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function AdminCommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const handleSelect = (action: () => void) => {
    onClose();
    action();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* Navigation Group */}
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin" }))}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/contacts" }))}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Contact Requests & CRM</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/farm-visits" }))}
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>Farm Visits</span>
            <CommandShortcut>⌘V</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/consultations" }))}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Consultations</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/customers" }))}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Grower Directory</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/agronomists" }))}
          >
            <UserCheck className="mr-2 h-4 w-4" />
            <span>Agronomists Team</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/analytics" }))}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics & Velocity</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content" }))}
          >
            <Globe className="mr-2 h-4 w-4" />
            <span>Website content</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/stats" }))}
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            <span>Site statistics</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/logos" }))}
          >
            <Image className="mr-2 h-4 w-4" />
            <span>Brand logos</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/stories" }))}
          >
            <Video className="mr-2 h-4 w-4" />
            <span>Farmer testimonials</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/team" }))}
          >
            <UsersRound className="mr-2 h-4 w-4" />
            <span>Team members</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/notifications" }))}
          >
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications Center</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/settings" }))}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings & Configuration</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/contacts" }))}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>View All Contact Inquiries</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/farm-visits" }))}
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>Open Field Inspection Schedule</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Recent High Priority Leads */}
        <CommandGroup heading="High Priority Requests">
          <CommandItem
            onSelect={() =>
              handleSelect(() =>
                navigate({ to: "/agaate-admin/contacts/$id", params: { id: "2" } })
              )
            }
          >
            <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />
            <span>Sunita Devi · Big Farm Turnkey (55 Acres)</span>
            <CommandShortcut>Urgent</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              handleSelect(() =>
                navigate({ to: "/agaate-admin/contacts/$id", params: { id: "1" } })
              )
            }
          >
            <Sprout className="mr-2 h-4 w-4 text-emerald-500" />
            <span>Ramesh Patel · Bio-Boosted Nursery (20 Acres)</span>
            <CommandShortcut>High</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              handleSelect(() =>
                navigate({ to: "/agaate-admin/contacts/$id", params: { id: "3" } })
              )
            }
          >
            <PhoneCall className="mr-2 h-4 w-4 text-sky-500" />
            <span>Harpreet Singh · Carbon Credit Program (35 Acres)</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
