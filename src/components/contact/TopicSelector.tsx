import { Icon } from "@phosphor-icons/react";
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
    <fieldset disabled={disabled} className="space-y-2">
      <legend className="sr-only">What do you need help with?</legend>
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
              "w-full rounded-md border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40",
              selected
                ? "border-forest-deep bg-forest-deep text-white"
                : "border-neutral-200 bg-white text-forest-deep hover:border-neutral-300",
            )}
          >
            <div className="flex items-start gap-3">
              {Icon ? (
                <Icon
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    selected ? "text-white/80" : "text-neutral-400",
                  )}
                  strokeWidth={1.75}
                />
              ) : null}
              <div>
                <span className="block text-sm font-semibold leading-snug">{topic.label}</span>
                {topic.desc ? (
                  <span
                    className={cn(
                      "mt-0.5 block text-xs leading-snug",
                      selected ? "text-white/70" : "text-neutral-500",
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
    <fieldset disabled={disabled}>
      <legend className="mb-1.5 block text-sm font-medium text-forest-deep">
        Preferred callback channel
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
                "rounded-md px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40",
                selected
                  ? "bg-forest-deep text-white"
                  : "border border-neutral-300 bg-white text-forest-deep hover:bg-neutral-50",
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
