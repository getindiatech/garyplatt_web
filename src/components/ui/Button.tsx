import Image from "next/image";
import SmartLink from "@/components/ui/SmartLink";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "dark" | "light";

type Common = {
  variant?: Variant;
  /** Optional trailing icon path; sized to match the label. */
  icon?: string;
};

type AnchorProps = Common &
  React.ComponentPropsWithoutRef<"a"> & { href: string };
type NativeProps = Common &
  React.ComponentPropsWithoutRef<"button"> & { href?: undefined };

/** Renders an anchor when given an `href`, a real `<button>` otherwise. */
type ButtonProps = AnchorProps | NativeProps;

const VARIANTS: Record<Variant, string> = {
  /** V2 primary: flat ink fill, 6px radius. */
  solid: "rounded-md border-transparent bg-ink text-white",
  /** V2 secondary: page-tinted fill with a hairline ink rule. */
  outline:
    "rounded-md border-ink bg-[#fbfaf9] text-ink shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
  /** Legacy gradient pair, still used by the footer. */
  dark: "border-ink-strong bg-button-dark text-white",
  light: "border-ink-strong bg-button-light text-ink",
};

export default function Button({
  variant = "solid",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 border px-6 py-3",
    "text-body font-medium leading-6 transition-opacity hover:opacity-88",
    VARIANTS[variant],
    className,
  );

  const inner = (
    <>
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
    </>
  );

  if (props.href !== undefined) {
    return (
      <SmartLink className={classes} {...(props as AnchorProps)}>
        {inner}
      </SmartLink>
    );
  }

  const { type = "button", ...rest } = props as NativeProps;
  return (
    <button type={type} className={classes} {...rest}>
      {inner}
    </button>
  );
}
