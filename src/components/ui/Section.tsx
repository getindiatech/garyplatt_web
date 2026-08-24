import { cn } from "@/lib/cn";

type SectionProps = React.ComponentPropsWithoutRef<"section">;

/** Section rhythm: fluid vertical padding shared by every band on the page. */
export default function Section({ className, ...props }: SectionProps) {
  return <section className={cn("py-section", className)} {...props} />;
}
