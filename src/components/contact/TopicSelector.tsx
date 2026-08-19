import { type Icon, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Option = {
  id: string;
  label: string;
  desc?: string;
  icon?: Icon;
};

export function TopicSelector({
  options,
  value,
  onChange,
  disabled,
}: {
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset disabled={disabled} className="space-y-2.5">
      <legend className="sr-only">What do you need help with?</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {options.map((topic) => {
          const Icon = topic.icon;
          const selected = value === topic.id;
          return (
            <button
              key={topic.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(topic.id)}
              className={cn(
                "w-full rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143d31]/30",
                selected
                  ? "border-[#143d31] bg-[#143d31] text-white shadow-md -translate-y-0.5"
                  : "border-[#143d31]/12 bg-white text-[#143d31] hover:border-[#143d31]/30 hover:bg-[#f4f8f5]/80",
              )}
            >
              <div className="flex items-start gap-3">
                {Icon ? (
                  <div
                    className={cn(
                      "mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl shrink-0 transition-colors",
                      selected
                        ? "bg-white/10 text-[#a3e635]"
                        : "bg-[#143d31]/5 text-[#5d7d37]",
                    )}
                  >
                    <Icon className="h-4 w-4" weight={selected ? "duotone" : "bold"} />
                  </div>
                ) : null}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="block text-sm font-bold font-display leading-snug truncate">
                      {topic.label}
                    </span>
                    {selected && (
                      <Check className="h-3.5 w-3.5 text-[#a3e635] shrink-0" weight="bold" />
                    )}
                  </div>
                  {topic.desc ? (
                    <span
                      className={cn(
                        "mt-1 block text-xs leading-relaxed font-sans line-clamp-2",
                        selected ? "text-white/75" : "text-[#4f624f]",
                      )}
                    >
                      {topic.desc}
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ChannelGroup({
  options,
  value,
  onChange,
  disabled,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset disabled={disabled} className="space-y-2">
      <legend className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
        Preferred Callback Channel
      </legend>
      <div className="flex flex-wrap gap-2" role="radiogroup">
        {options.map((ch) => {
          const selected = value === ch;
          return (
            <button
              key={ch}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(ch)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-xs font-mono font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143d31]/30",
                selected
                  ? "bg-[#143d31] text-[#a3e635] shadow-xs"
                  : "border border-[#143d31]/15 bg-white text-[#143d31] hover:bg-[#f4f8f5]",
              )}
            >
              {ch}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
