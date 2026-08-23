import { useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Settings,
  Globe,
  BarChart2,
  Image,
  Video,
  UsersRound,
  Smartphone,
  MapPin,
  Store,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
      <CommandInput placeholder="Search admin pages..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Overview">
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin" }))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Website content">
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content" }))}>
            <Globe className="mr-2 h-4 w-4" />
            <span>Content overview</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/stats" }))}>
            <BarChart2 className="mr-2 h-4 w-4" />
            <span>Site statistics</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/logos" }))}>
            <Image className="mr-2 h-4 w-4" />
            <span>Brand logos</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/stories" }))}>
            <Video className="mr-2 h-4 w-4" />
            <span>Farmer testimonials</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/team" }))}>
            <UsersRound className="mr-2 h-4 w-4" />
            <span>Team members</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/app-links" }))}>
            <Smartphone className="mr-2 h-4 w-4" />
            <span>App store links</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/agri-park-tour" }))}>
            <Video className="mr-2 h-4 w-4" />
            <span>Agri Park video</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/content/kisaan-mall" }))}>
            <Store className="mr-2 h-4 w-4" />
            <span>Kisaan Mall waitlist</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Inquiries">
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/farm-visits" }))}>
            <MapPin className="mr-2 h-4 w-4" />
            <span>Farm Visits</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Configuration">
          <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/agaate-admin/settings" }))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Email & SMTP settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
