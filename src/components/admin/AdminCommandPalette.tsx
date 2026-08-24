import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ADMIN_COMMAND_GROUPS, ADMIN_COMMAND_PAGES } from "@/lib/admin-cms-nav";

export function AdminCommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  const handleSelect = (action: () => void) => {
    onClose();
    action();
  };

  const grouped = useMemo(() => {
    return ADMIN_COMMAND_GROUPS.map((group) => ({
      group,
      items: ADMIN_COMMAND_PAGES.filter((item) => item.group === group),
    })).filter((g) => g.items.length > 0);
  }, []);

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Search admin pages and content…" />
      <CommandList>
        <CommandEmpty>No matching pages.</CommandEmpty>
        {grouped.map(({ group, items }) => (
          <CommandGroup key={group} heading={group}>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.id ?? item.to}
                  value={`${item.label} ${item.keywords ?? ""} ${item.group}`}
                  onSelect={() =>
                    handleSelect(() =>
                      navigate({
                        to: item.to,
                        search: item.search,
                      }),
                    )
                  }
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
