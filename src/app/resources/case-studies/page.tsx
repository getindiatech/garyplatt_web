import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getProjects, imageUrl } from "@/lib/api";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How Gary Platt seating performs on real floors — installations at casinos, resorts and venues around the world.",
};

export const revalidate = 300;

export default async function CaseStudiesPage() {
  const projects = await getProjects({ perPage: 100 });

  // The API already leads with featured venues; the first one becomes the
  // lead story and the rest fill the grid.
  const [lead, ...rest] = projects.data;

  return (
    <>
      <PageHero
        title="Case Studies"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "Case Studies" },
        ]}
      />

      <Container className="pb-section">
        <div className="mx-auto max-w-[1180px] text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.2vw+1.1rem,3.125rem)] font-medium leading-tight text-ink">
            Seating that earns its place on the floor
          </h2>
          <p className="mx-auto max-w-[900px] pt-5 text-copy leading-relaxed text-muted">
            What we specified, why, and how it has held up — venue by venue.
          </p>
        </div>

        {projects.data.length === 0 ? (
          <p className="py-16 text-center text-copy leading-relaxed text-muted">
            Case studies are being written up. Check back soon.
          </p>
        ) : null}

        {lead ? (
          <Link
            href={`/resources/case-studies/${lead.slug}`}
            className="group mt-14 grid grid-cols-1 overflow-hidden bg-surface lg:grid-cols-[3fr_2fr]"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={imageUrl(lead.coverImage, "/images/gallery-01.jpg")}
                alt={`${lead.venueName}, ${lead.location}`}
                width={1000}
                height={620}
                sizes="(max-width: 1023px) 100vw, 60vw"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-eyebrow uppercase tracking-[0.2em] text-muted-alt">
                Featured case study
              </p>
              <h3 className="pt-3 font-display text-[clamp(1.75rem,1.8vw+1.2rem,2.75rem)] font-medium leading-tight text-ink">
                {lead.venueName}
              </h3>
              <p className="pt-1 text-copy font-medium text-muted-alt">{lead.location}</p>
              <p className="pt-5 text-copy leading-relaxed text-muted">
                {lead.summary ?? "A full-floor seating programme, specified to the venue's own finish palette."}
              </p>
              <span className="pt-8 text-copy font-medium text-ink underline-offset-4 group-hover:underline">
                Read the case study →
              </span>
            </div>
          </Link>
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {rest.map((project) => (
              <Link
                key={project.slug}
                href={`/resources/case-studies/${project.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[402/250] w-full overflow-hidden bg-surface">
                  <Image
                    src={imageUrl(project.coverImage, "/images/gallery-01.jpg")}
                    alt={`${project.venueName}, ${project.location}`}
                    width={402}
                    height={250}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="pt-5 text-meta uppercase tracking-[0.16em] text-muted-alt">
                  {project.location}
                </p>
                <h3 className="pt-2 font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
                  {project.venueName}
                </h3>
                {project.summary ? (
                  <p className="line-clamp-2 pt-3 text-copy leading-relaxed text-muted">
                    {project.summary}
                  </p>
                ) : null}
                <span className="pt-4 text-copy font-medium text-ink underline-offset-4 group-hover:underline">
                  Read case study →
                </span>
              </Link>
            ))}
          </div>
        ) : null}
      </Container>
    </>
  );
}
