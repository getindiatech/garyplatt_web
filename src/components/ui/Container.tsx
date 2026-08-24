import { cn } from "@/lib/cn";

type ContainerProps = React.ComponentPropsWithoutRef<"div">;

/** Page gutter: fluid horizontal padding, capped at the 1920 design width. */
export default function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-page px-gutter", className)}
      {...props}
    />
  );
}
