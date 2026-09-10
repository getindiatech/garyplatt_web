import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CustomConfigurator from "@/components/sections/CustomConfigurator";
import GalleryBrowser, { type GalleryItem } from "@/components/sections/GalleryBrowser";
import { GALLERY_INTRO } from "@/content/gallery";
import { getProjectCountries, getProjects, imageUrl } from "@/lib/api";

export const metadata: Metadata = {
  title: "Gallery",
  description: GALLERY_INTRO.body,
};

export const revalidate = 300;

export default async function GalleryPage() {
  const [projects, countries] = await Promise.all([
    getProjects({ perPage: 100 }),
    getProjectCountries(),
  ]);

  const installations: GalleryItem[] = projects.data.map((project) => ({
    slug: project.slug,
    name: project.venueName,
    location: project.location,
    image: imageUrl(project.coverImage, "/images/gallery-01.jpg"),
    featured: project.isFeatured,
  }));

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

          <GalleryBrowser installations={installations} countries={countries} />
        </div>
      </div>

      <CustomConfigurator />
    </>
  );
}
