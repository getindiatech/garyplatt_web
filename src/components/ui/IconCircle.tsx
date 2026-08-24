import { cn } from "@/lib/cn";

type IconCircleProps = React.ComponentPropsWithoutRef<"span">;

/** Translucent round chip used behind the footer social glyphs. */
export default function IconCircle({ className, ...props }: IconCircleProps) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full",
        "bg-white/10 transition-colors",
        className,
      )}
      {...props}
    />
  );
}
