import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import CustomConfigurator from "@/components/sections/CustomConfigurator";
import {
  ALL_INSTALLATIONS,
  FEATURED_INSTALLATIONS,
  GALLERY_INTRO,
  type Installation,
} from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: GALLERY_INTRO.body,
};

function InstallationCard({
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
    <a
      href="#"
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
    </a>
  );
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "Gallery" },
        ]}
      />

      <div className="px-gutter pb-section">
        <div className="mx-auto max-w-[1680px]">
        <div className="mx-auto max-w-[1180px] text-center">
          <h2 className="font-display text-[clamp(2rem,2.2vw+1.2rem,3.125rem)] font-medium leading-tight text-ink">
            {GALLERY_INTRO.title}
          </h2>
          <p className="mx-auto max-w-[900px] pt-5 text-copy leading-relaxed text-muted">
            {GALLERY_INTRO.body}
          </p>
        </div>

        {/* Search + country filter */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_320px]">
          <Input
            type="search"
            aria-label="Search casinos or venues"
            placeholder={GALLERY_INTRO.searchPlaceholder}
          />
          <Select aria-label="Filter by country" defaultValue="">
            <option value="" disabled>
              {GALLERY_INTRO.countryPlaceholder}
            </option>
          </Select>
        </div>

        {/* Featured */}
        <h3 className="pt-12 font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
          Featured Installations
        </h3>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {FEATURED_INSTALLATIONS.map((item) => (
            <InstallationCard key={item.name} item={item} ratio="402 / 250" withLink />
          ))}
        </div>

        {/* All */}
        <h3 className="pt-14 font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
          All Installations
        </h3>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {ALL_INSTALLATIONS.map((item) => (
            <InstallationCard key={item.image} item={item} ratio="402 / 480" />
          ))}
        </div>

        <div className="flex justify-center pt-12">
          <Button href="#" variant="outline">
            Load More
          </Button>
        </div>
        </div>
      </div>

      <CustomConfigurator />
    </>
  );
}
