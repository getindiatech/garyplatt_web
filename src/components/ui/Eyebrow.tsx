import { cn } from "@/lib/cn";

type EyebrowProps = React.ComponentPropsWithoutRef<"p">;

/** Small tracked-out label above a section title. */
export default function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-eyebrow uppercase text-muted-alt tracking-normal md:tracking-[0.2em]",
        className,
      )}
      {...props}
    />
  );
}
