import Image from "next/image";
import { cn } from "@/lib/cn";

type Variant = "dark" | "light";

type ButtonProps = React.ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  /** Optional trailing icon path; sized to match the label. */
  icon?: string;
};

const VARIANTS: Record<Variant, string> = {
  dark: "border-ink-strong bg-button-dark text-white",
  light: "border-ink-strong bg-button-light text-ink",
};

/**
 * The design's single button treatment: a 1px rule over a subtle top-lit
 * gradient. Height and padding scale with the fluid body step.
 */
export default function Button({
  variant = "dark",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 border px-6 py-3",
        "text-body font-medium leading-6 transition-opacity hover:opacity-88",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon ? (
        <Image
          src={icon}
          alt=""
          width={20}
          height={20}
          className="size-4 shrink-0 md:size-5"
        />
      ) : null}
    </a>
  );
}
