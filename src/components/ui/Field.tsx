import { cn } from "@/lib/cn";

const CONTROL =
  "w-full rounded-md border border-hairline-soft bg-white px-3 py-3 text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] " +
  "leading-normal text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20";

type FieldProps = {
  label: string;
  /** Rendered as a red asterisk and mirrored onto the control. */
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  htmlFor: string;
};

export function Field({ label, required, className, children, htmlFor }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] font-medium leading-normal text-ink"
      >
        {label}
        {required ? <span aria-hidden className="text-gold-deep"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return <input className={cn(CONTROL, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cn(CONTROL, "resize-y", className)} {...props} />;
}

export function Select({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"select">) {
  return <select className={cn(CONTROL, "appearance-none", className)} {...props} />;
}
