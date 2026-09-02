import Link from "next/link";

/**
 * Routes internal hrefs through `next/link` (client-side navigation, prefetch)
 * and leaves external ones — plus `mailto:` / `tel:` — as plain anchors.
 */
export function isInternal(href?: string) {
  return typeof href === "string" && href.startsWith("/");
}

type SmartLinkProps = React.ComponentPropsWithoutRef<"a"> & { href: string };

export default function SmartLink({ href, ...props }: SmartLinkProps) {
  if (isInternal(href)) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
