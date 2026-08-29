import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { PROJECT_OVERVIEW } from "@/content/company";

export const metadata: Metadata = {
  title: PROJECT_OVERVIEW.name,
  description: PROJECT_OVERVIEW.sections[0].body,
};

function Tile({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1166}
        height={608}
        sizes="(max-width: 1023px) 100vw, 50vw"
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}

export default function ProjectOverviewPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
          { label: PROJECT_OVERVIEW.name },
        ]}
      />

      <Container className="pb-section">
        <div className="mx-auto max-w-[1680px]">
        <h2 className="font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
          {PROJECT_OVERVIEW.name}
        </h2>
        <p className="pt-2 text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-normal text-muted">
          {PROJECT_OVERVIEW.location}
        </p>

        {/* Mosaic gallery — 1166+494 over 679+981, 20px gaps, per the design */}
        <div className="mt-8 flex flex-col gap-5">
          <div className="grid gap-5 lg:grid-cols-[1166fr_494fr]">
            <Tile
              src={PROJECT_OVERVIEW.gallery.blockA.large}
              alt={`${PROJECT_OVERVIEW.name} installation`}
              className="aspect-[1166/608]"
            />
            <div className="grid gap-5 lg:grid-rows-2">
              {PROJECT_OVERVIEW.gallery.blockA.stack.map((src) => (
                <Tile
                  key={src}
                  src={src}
                  alt={`${PROJECT_OVERVIEW.name} installation`}
                  className="aspect-[494/294] lg:aspect-auto lg:h-full"
                />
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[679fr_981fr]">
            <div className="grid gap-5 lg:grid-rows-2">
              {PROJECT_OVERVIEW.gallery.blockB.stack.map((src) => (
                <Tile
                  key={src}
                  src={src}
                  alt={`${PROJECT_OVERVIEW.name} installation`}
                  className="aspect-[679/294] lg:aspect-auto lg:h-full"
                />
              ))}
            </div>
            <Tile
              src={PROJECT_OVERVIEW.gallery.blockB.large}
              alt={`${PROJECT_OVERVIEW.name} installation`}
              className="aspect-[981/608]"
            />
          </div>
        </div>

        {/* Written sections */}
        <div className="max-w-[1400px]">
          {PROJECT_OVERVIEW.sections.map(({ title, body, list }) => (
            <section key={title} className="pt-12">
              <h3 className="font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
                {title}
              </h3>
              {body ? (
                <p className="pt-4 text-copy leading-relaxed text-muted">{body}</p>
              ) : null}
              {list ? (
                <ul className="flex list-disc flex-col gap-2 pl-6 pt-4">
                  {list.map((item) => (
                    <li key={item} className="text-copy leading-relaxed text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
        </div>
      </Container>
    </>
  );
}
