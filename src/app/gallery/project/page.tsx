import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { PROJECT_OVERVIEW } from "@/content/company";

export const metadata: Metadata = {
  title: PROJECT_OVERVIEW.name,
  description: PROJECT_OVERVIEW.sections[0].body,
};

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
        <h2 className="font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
          {PROJECT_OVERVIEW.name}
        </h2>
        <p className="pt-2 text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-normal text-muted">
          {PROJECT_OVERVIEW.location}
        </p>

        {/* Mosaic gallery */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {PROJECT_OVERVIEW.gallery.map(({ src, span }, i) => (
            <div
              key={src}
              className={`relative aspect-[679/294] w-full overflow-hidden ${span}`}
            >
              <Image
                src={src}
                alt={`${PROJECT_OVERVIEW.name} installation ${i + 1}`}
                width={981}
                height={608}
                sizes="(max-width: 1023px) 50vw, 25vw"
                className="size-full object-cover"
              />
            </div>
          ))}
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
      </Container>
    </>
  );
}
