import { cn } from "@/lib/cn";
import Eyebrow from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  /** Right-aligned slot (e.g. a "View all" link) once there is room for it. */
  action?: React.ReactNode;
  align?: "center" | "start";
  className?: string;
  titleClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  action,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        action && "md:flex-row md:items-end md:justify-between md:gap-6",
        className,
      )}
    >
      <div>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2
          className={cn(
            "pt-3 font-display text-section font-medium leading-none tracking-tight text-ink md:pt-4",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
