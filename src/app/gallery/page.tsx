import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CustomConfigurator from "@/components/sections/CustomConfigurator";
import GalleryBrowser from "@/components/sections/GalleryBrowser";
import { GALLERY_INTRO } from "@/content/gallery";

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

        <GalleryBrowser />
        </div>
      </div>

      <CustomConfigurator />
    </>
  );
}
