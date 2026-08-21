import { cn } from "@/lib/utils";
import { CaretDown } from "@phosphor-icons/react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const labelCls =
  "block text-xs sm:text-[13px] font-bold text-[#143d31] tracking-wide mb-1.5";
const inputCls =
  "w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-forest-deep transition-colors placeholder:text-neutral-400 focus:border-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/25 disabled:opacity-60";
const errorCls = "border-destructive focus:border-destructive focus-visible:ring-destructive/30";
const boxContainerCls =
  "relative flex items-center bg-white rounded-xl border border-[#143d31]/15 shadow-2xs transition-all duration-200 focus-within:border-[#143d31] focus-within:ring-2 focus-within:ring-[#143d31]/10 hover:border-[#143d31]/30";
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
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className={labelCls}>
          {label}
        </label>
        {optional ? (
          <span className="text-[11px] font-semibold text-[#4f624f]/70 bg-[#143d31]/5 px-2 py-0.5 rounded-md">
            Optional
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
<p
          id={`${id}-error`}
          className="mt-1.5 text-xs font-medium text-red-600 tracking-wide flex items-center gap-1"
          role="alert"
        >
          <span>●</span> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-[#4f624f]/80">
          {hint}
        </p>
      ) : null}
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
        {leftIcon ? (
          <div className="pl-3.5 pr-1 text-[#5d7d37] shrink-0">{leftIcon}</div>
        ) : null}
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            "w-full bg-transparent px-3.5 py-3 text-sm sm:text-base font-sans font-medium text-[#143d31] placeholder:text-[#143d31]/35 focus:outline-none disabled:opacity-50",
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
        <div className="flex items-center gap-1.5 pl-3.5 pr-2.5 py-3 border-r border-[#143d31]/10 bg-[#f4f8f5]/60 rounded-l-xl text-xs sm:text-sm font-bold text-[#143d31]/80 select-none shrink-0">
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
            "w-full bg-transparent px-3.5 py-3 font-sans text-sm sm:text-base font-medium text-[#143d31] tracking-wide placeholder:text-[#143d31]/35 placeholder:tracking-normal focus:outline-none disabled:opacity-50",
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
    <TextField
      type="email"
      inputMode="email"
      autoComplete="email"
      enterKeyHint="next"
      {...props}
    />
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
        {leftIcon ? (
          <div className="pl-3.5 pr-1 text-[#5d7d37] shrink-0">{leftIcon}</div>
        ) : null}
        <select
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "w-full bg-transparent appearance-none pl-3.5 pr-10 py-3 text-sm sm:text-base font-sans font-medium text-[#143d31] cursor-pointer focus:outline-none disabled:opacity-50",
            leftIcon && "pl-2",
            className,
          )}
          {...props}
        >
          {options.map((opt) => {
            if (typeof opt === "string") {
              return (
                <option key={opt} value={opt} className="bg-white text-[#143d31] py-2">
                  {opt}
                </option>
              );
            }
            return (
              <option key={opt.value} value={opt.value} className="bg-white text-[#143d31] py-2">
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
  maxLength?: number;
  value: string;
  hint?: string;
  optional?: boolean;
  charCount?: { current: number; max: number };
};

export function TextareaField({
  id,
  label,
  error,
  hint,
  optional,
  charCount,
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
            "w-full bg-transparent text-sm sm:text-base font-sans font-medium text-[#143d31] placeholder:text-[#143d31]/35 focus:outline-none min-h-[88px] resize-y leading-relaxed",
            className,
          )}
          {...props}
        />
        {charCount ? (
          <div className="mt-1 pt-1.5 border-t border-[#143d31]/10 text-right text-[11px] font-mono text-[#4f624f]/70">
            {charCount.current} / {charCount.max} characters
          </div>
        ) : (
          <p id={`${id}-count`} className="mt-1.5 text-right font-mono text-[10px] text-forest/45">
            {value.length}/{maxLength}
          </p>
        )}
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
          "flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none",
          checked
            ? "bg-[#143d31]/[0.03] border-[#143d31]/25 shadow-2xs"
            : "bg-white/60 border-[#143d31]/15 hover:bg-white hover:border-[#143d31]/25",
          error && "border-red-500/80 bg-red-50/20",
        )}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-forest/30 text-forest focus-visible:ring-2 focus-visible:ring-forest/40"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
<input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4.5 w-4.5 rounded-md border border-[#143d31]/30 text-[#143d31] accent-[#143d31] focus:ring-2 focus:ring-[#143d31]/20 cursor-pointer shrink-0"
        />
        <span className="font-sans text-xs sm:text-sm text-[#143d31]/90 leading-snug">
          {children}
        </span>
      </label>
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs font-medium text-red-600 tracking-wide flex items-center gap-1"
          role="alert"
        >
          <span>●</span> {error}
        </p>
      ) : null}
        </p>
      ) : null}
    </div>
  );
}
