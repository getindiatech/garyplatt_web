import Image from "next/image";
import SmartLink from "@/components/ui/SmartLink";
import { cn } from "@/lib/cn";

type ArrowLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  href: string;
  icon?: string;
};

/** Inline text link with a trailing arrow ("Learn more", "View All Products"). */
export default function ArrowLink({
  className,
  children,
  icon = "/images/icon-arrow-right.svg",
  ...props
}: ArrowLinkProps) {
  return (
    <SmartLink
      className={cn(
        "group inline-flex items-center gap-2 text-body font-medium text-ink",
        "transition-opacity hover:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
      <Image
        src={icon}
        alt=""
        width={16}
        height={16}
        className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
      />
    </SmartLink>
  );
}
