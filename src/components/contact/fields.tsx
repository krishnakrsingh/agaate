import { cn } from "@/lib/utils";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const labelCls = "mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]";
const inputCls =
  "w-full rounded-2xl border border-[#143d31]/15 bg-white px-4 py-3 text-sm font-sans text-[#143d31] transition-all duration-200 placeholder:text-[#4f624f]/60 focus:border-[#143d31] focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143d31]/20 disabled:opacity-60";
const errorCls = "border-red-500 focus:border-red-500 focus-visible:ring-red-500/20";

function FieldWrap({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 font-mono text-xs font-semibold text-red-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 font-sans text-xs text-[#4f624f]">
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
};

export function TextField({ id, label, error, hint, className, ...props }: TextFieldProps) {
  return (
    <FieldWrap id={id!} label={label} error={error} hint={hint}>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(inputCls, error && errorCls, className)}
        {...props}
      />
    </FieldWrap>
  );
}

export function PhoneField(props: TextFieldProps) {
  return <TextField type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" {...props} />;
}

export function EmailField(props: TextFieldProps) {
  return (
    <TextField type="email" inputMode="email" autoComplete="email" enterKeyHint="next" {...props} />
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: readonly string[];
};

export function SelectField({ id, label, error, options, className, ...props }: SelectFieldProps) {
  return (
    <FieldWrap id={id!} label={label} error={error}>
      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputCls, "cursor-pointer appearance-none", error && errorCls, className)}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldWrap>
  );
}

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
  charCount?: { current: number; max: number };
};

export function TextareaField({
  id,
  label,
  error,
  hint,
  charCount,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldWrap id={id!} label={label} error={error} hint={hint}>
      <textarea
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(inputCls, "min-h-[110px] resize-y", error && errorCls, className)}
        {...props}
      />
      {charCount ? (
        <div className="mt-1 text-right font-mono text-[11px] text-[#4f624f]">
          {charCount.current}/{charCount.max}
        </div>
      ) : null}
    </FieldWrap>
  );
}

export function ConsentCheckbox({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (c: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer select-none">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-4 w-4 rounded-md border-[#143d31]/20 text-[#143d31] accent-[#143d31] focus:ring-[#143d31]/30 cursor-pointer"
        />
        <span className="font-sans text-xs text-[#4f624f] leading-relaxed">{children}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 font-mono text-xs font-semibold text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
