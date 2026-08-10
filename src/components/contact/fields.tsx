import { cn } from "@/lib/utils";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const labelCls = "mb-1.5 block text-sm font-medium text-forest-deep";
const inputCls =
  "w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-forest-deep transition-colors placeholder:text-neutral-400 focus:border-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/25 disabled:opacity-60";
const errorCls = "border-destructive focus:border-destructive focus-visible:ring-destructive/30";

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
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-forest/55">
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
  return (
    <TextField type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" {...props} />
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

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: readonly string[];
};

export function SelectField({
  id,
  label,
  error,
  options,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <FieldWrap id={id!} label={label} error={error}>
      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputCls, error && errorCls, className)}
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
  maxLength?: number;
  value: string;
};

export function TextareaField({
  id,
  label,
  error,
  maxLength = 600,
  value,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldWrap id={id!} label={label} error={error}>
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : `${id}-count`}
        className={cn(inputCls, "min-h-[96px] resize-y", error && errorCls, className)}
        {...props}
      />
      <p id={`${id}-count`} className="mt-1.5 text-right font-mono text-[10px] text-forest/45">
        {value.length}/{maxLength}
      </p>
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
    <div>
      <label htmlFor={id} className="flex items-start gap-3 text-xs leading-relaxed text-forest/75">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-forest/30 text-forest focus-visible:ring-2 focus-visible:ring-forest/40"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span>
          By submitting, you agree to our{" "}
          <a
            href={privacyHref}
            className="font-semibold text-forest-deep underline underline-offset-2 hover:text-forest"
          >
            Privacy Policy
          </a>
          . We never sell your data.
        </span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
