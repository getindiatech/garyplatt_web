import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Installation } from "@/content/gallery";

export default function InstallationCard({
  item,
  ratio,
  withLink,
}: {
  item: Installation;
  /** Design ratio, applied from sm up; phones get a taller card for the caption. */
  ratio: string;
  withLink?: boolean;
}) {
  return (
    <Link
      href="/gallery/project"
      className={cn(
        "group relative block aspect-(--card-ratio) overflow-hidden",
        // Featured tiles are wide and short; on phones that leaves no room for
        // the caption, so give them a taller box below sm.
        withLink && "max-sm:aspect-[402/300]",
      )}
      style={{ "--card-ratio": ratio } as React.CSSProperties}
    >
      <Image
        src={item.image}
        alt={`${item.name}, ${item.location}`}
        width={402}
        height={480}
        sizes="(max-width: 767px) 50vw, 22vw"
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent"
      />

      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:p-5">
        <span className="min-w-0">
          <span className="block truncate font-display text-[clamp(0.875rem,0.6vw+0.75rem,1.25rem)] font-medium leading-tight text-white">
            {item.name}
          </span>
          <span className="block truncate pt-0.5 text-meta leading-normal text-white/80 sm:pt-1">
            {item.location}
          </span>
        </span>

        {withLink ? (
          <span className="hidden shrink-0 whitespace-nowrap text-copy font-medium text-white underline-offset-4 group-hover:underline sm:block">
            View Project
          </span>
        ) : null}
      </span>
    </Link>
  );
}
