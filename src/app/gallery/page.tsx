import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import InstallationCard from "@/components/ui/InstallationCard";
import { Input, Select } from "@/components/ui/Field";
import CustomConfigurator from "@/components/sections/CustomConfigurator";
import InstallationGrid from "@/components/sections/InstallationGrid";
import {
  ALL_INSTALLATIONS,
  FEATURED_INSTALLATIONS,
  GALLERY_INTRO,
} from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: GALLERY_INTRO.body,
};

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
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {FEATURED_INSTALLATIONS.map((item) => (
            <InstallationCard key={item.name} item={item} ratio="402 / 250" withLink />
          ))}
        </div>

        {/* All */}
        <h3 className="pt-14 font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
          All Installations
        </h3>
        <InstallationGrid items={ALL_INSTALLATIONS} />
        </div>
      </div>

      <CustomConfigurator />
    </>
  );
}
