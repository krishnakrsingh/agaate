import { cn } from "@/lib/utils";
import { CaretDown } from "@phosphor-icons/react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const labelCls = "mb-1.5 block text-xs font-bold tracking-wide text-[#143d31] sm:text-[13px]";
const boxContainerCls =
  "relative flex items-center rounded-xl border border-[#143d31]/15 bg-white shadow-2xs transition-all duration-200 hover:border-[#143d31]/30 focus-within:border-[#143d31] focus-within:ring-2 focus-within:ring-[#143d31]/10";
const errorBoxCls = "border-red-500/80 focus-within:border-red-600 focus-within:ring-red-500/10";

function FieldWrap({
  id,
  label,
  error,
  hint,
  optional,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full text-left", className)}>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className={labelCls}>
          {label}
        </label>
        {optional ? (
          <span className="rounded-md bg-[#143d31]/5 px-2 py-0.5 text-[11px] font-semibold text-[#4f624f]/70">
            Optional
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1 text-xs font-medium tracking-wide text-red-600"
          role="alert"
        >
          <span>●</span> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-[#4f624f]/80">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  leftIcon?: ReactNode;
};

export function TextField({
  id,
  label,
  error,
  hint,
  optional,
  leftIcon,
  className,
  ...props
}: TextFieldProps) {
  return (
    <FieldWrap id={id!} label={label} error={error} hint={hint} optional={optional}>
      <div className={cn(boxContainerCls, error && errorBoxCls)}>
        {leftIcon ? <div className="shrink-0 pl-3.5 pr-1 text-[#5d7d37]">{leftIcon}</div> : null}
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            "w-full bg-transparent px-3.5 py-3 font-sans text-sm font-medium text-[#143d31] placeholder:text-[#143d31]/35 focus:outline-none disabled:opacity-50 sm:text-base",
            leftIcon && "pl-2",
            className,
          )}
          {...props}
        />
      </div>
    </FieldWrap>
  );
}

export function PhoneField({
  id = "phone",
  label = "Mobile / WhatsApp Number *",
  error,
  hint,
  optional,
  className,
  value,
  onChange,
  disabled,
  ...props
}: TextFieldProps) {
  return (
    <FieldWrap id={id} label={label} error={error} hint={hint} optional={optional}>
      <div className={cn(boxContainerCls, error && errorBoxCls)}>
        <div className="flex shrink-0 select-none items-center gap-1.5 rounded-l-xl border-r border-[#143d31]/10 bg-[#f4f8f5]/60 py-3 pl-3.5 pr-2.5 text-xs font-bold text-[#143d31]/80 sm:text-sm">
          <span className="text-base leading-none">🇮🇳</span>
          <span>+91</span>
        </div>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          enterKeyHint="next"
          value={value}
          disabled={disabled}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          placeholder="98123 45678"
          className={cn(
            "w-full bg-transparent px-3.5 py-3 font-sans text-sm font-medium tracking-wide text-[#143d31] placeholder:tracking-normal placeholder:text-[#143d31]/35 focus:outline-none disabled:opacity-50 sm:text-base",
            className,
          )}
          {...props}
        />
      </div>
    </FieldWrap>
  );
}

export function EmailField(props: TextFieldProps) {
  return (
    <TextField type="email" inputMode="email" autoComplete="email" enterKeyHint="next" {...props} />
  );
}

type SelectOption = {
  value: string;
  label: string;
  sublabel?: string;
};

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  leftIcon?: ReactNode;
  options: readonly (string | SelectOption)[];
};

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  leftIcon,
  options,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <FieldWrap id={id!} label={label} error={error} hint={hint} optional={optional}>
      <div className={cn(boxContainerCls, error && errorBoxCls)}>
        {leftIcon ? <div className="shrink-0 pl-3.5 pr-1 text-[#5d7d37]">{leftIcon}</div> : null}
        <select
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "w-full cursor-pointer appearance-none bg-transparent py-3 pl-3.5 pr-10 font-sans text-sm font-medium text-[#143d31] focus:outline-none disabled:opacity-50 sm:text-base",
            leftIcon && "pl-2",
            className,
          )}
          {...props}
        >
          {options.map((opt) => {
            if (typeof opt === "string") {
              return (
                <option key={opt} value={opt} className="bg-white py-2 text-[#143d31]">
                  {opt}
                </option>
              );
            }
            return (
              <option key={opt.value} value={opt.value} className="bg-white py-2 text-[#143d31]">
                {opt.label} {opt.sublabel ? `— ${opt.sublabel}` : ""}
              </option>
            );
          })}
        </select>
        <CaretDown
          className="pointer-events-none absolute right-3.5 h-4 w-4 text-[#143d31]/60"
          weight="bold"
        />
      </div>
    </FieldWrap>
  );
}

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  maxLength?: number;
  value: string;
};

export function TextareaField({
  id,
  label,
  error,
  hint,
  optional,
  maxLength = 600,
  value,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldWrap id={id!} label={label} error={error} hint={hint} optional={optional}>
      <div className={cn(boxContainerCls, "flex-col items-stretch p-3", error && errorBoxCls)}>
        <textarea
          id={id}
          value={value}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : `${id}-count`}
          className={cn(
            "min-h-[88px] w-full resize-y bg-transparent font-sans text-sm font-medium leading-relaxed text-[#143d31] placeholder:text-[#143d31]/35 focus:outline-none sm:text-base",
            className,
          )}
          {...props}
        />
        <div
          id={`${id}-count`}
          className="mt-1 border-t border-[#143d31]/10 pt-1.5 text-right font-mono text-[11px] text-[#4f624f]/70"
        >
          {String(value).length} / {maxLength} characters
        </div>
      </div>
    </FieldWrap>
  );
}

export function ConsentCheckbox({
  id,
  checked,
  onChange,
  error,
  disabled,
  privacyHref,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  disabled?: boolean;
  privacyHref: string;
}) {
  return (
    <div className="w-full text-left">
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer select-none items-start gap-3 rounded-xl border p-3.5 transition-all duration-200",
          checked
            ? "border-[#143d31]/25 bg-[#143d31]/[0.03] shadow-2xs"
            : "border-[#143d31]/15 bg-white/60 hover:border-[#143d31]/25 hover:bg-white",
          error && "border-red-500/80 bg-red-50/20",
        )}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4.5 w-4.5 shrink-0 cursor-pointer rounded-md border border-[#143d31]/30 accent-[#143d31] focus:ring-2 focus:ring-[#143d31]/20"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span className="font-sans text-xs leading-snug text-[#143d31]/90 sm:text-sm">
          By submitting, you agree to our{" "}
          <a
            href={privacyHref}
            className="font-semibold text-[#143d31] underline underline-offset-2 hover:text-[#18483a]"
          >
            Privacy Policy
          </a>
          . We never sell your data.
        </span>
      </label>
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1 text-xs font-medium tracking-wide text-red-600"
          role="alert"
        >
          <span>●</span> {error}
        </p>
      ) : null}
    </div>
  );
}
