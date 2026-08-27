import Image from "next/image";
import Container from "./Container";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  /** Trail shown under the title; the current page is the last entry. */
  crumbs?: Crumb[];
  className?: string;
};

/**
 * Shared inner-page masthead: centred title over a breadcrumb trail, sitting
 * below the light header. Matches `Frame 2147225230` in the design.
 */
export default function PageHero({ title, crumbs, className }: PageHeroProps) {
  const trail: Crumb[] = crumbs ?? [
    { label: "Home", href: "/" },
    { label: title },
  ];

  return (
    <Container className={cn("pb-10 pt-8 text-center md:pb-14 md:pt-20", className)}>
      <h1 className="font-display text-[clamp(2rem,2.2vw+1.2rem,3.125rem)] font-medium leading-tight text-[#0a0a0a]">
        {title}
      </h1>

      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center justify-center gap-2 pt-4 text-copy leading-normal text-[#0a0a0a]/60"
      >
        {trail.map(({ label, href }, i) => (
          <span key={label} className="flex items-center gap-2">
            {i > 0 ? (
              <Image
                src="/images/icon-arrow-right.svg"
                alt=""
                aria-hidden
                width={24}
                height={24}
                className="size-4 opacity-60"
              />
            ) : null}
            {href ? (
              <a href={href} className="transition-colors hover:text-ink">
                {label}
              </a>
            ) : (
              <span aria-current="page">{label}</span>
            )}
          </span>
        ))}
      </nav>
    </Container>
  );
}
