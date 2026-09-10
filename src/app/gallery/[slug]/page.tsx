import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getProject, getProjects, imageUrl } from "@/lib/api";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await getProjects({ perPage: 100 });
  return projects.data.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: `${project.venueName} — ${project.location}`,
    description: project.summary ?? undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const gallery = project.images.map((image) => ({
    src: imageUrl(image.url),
    alt: image.alt ?? project.venueName,
  }));

  return (
    <>
      <PageHero
        title={project.venueName}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
          { label: project.venueName },
        ]}
      />

      <Container className="pb-section">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-copy font-medium text-muted">{project.location}</p>

          {gallery.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {gallery.map((image, index) => (
                <div
                  key={image.src}
                  className={
                    // Lead image runs the full width, the rest pair up.
                    index === 0
                      ? "relative aspect-[1166/608] w-full overflow-hidden md:col-span-2"
                      : "relative aspect-[679/440] w-full overflow-hidden"
                  }
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1166}
                    height={608}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="size-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-14 flex flex-col gap-10">
            {project.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-[clamp(1.5rem,1.2vw+1.1rem,2rem)] font-medium leading-tight text-ink">
                  {section.title}
                </h2>

                {section.body ? (
                  <p className="max-w-[1000px] pt-4 text-copy leading-relaxed text-muted">
                    {section.body}
                  </p>
                ) : null}

                {section.items.length > 0 ? (
                  <ul className="flex list-disc flex-col gap-2 pl-6 pt-4">
                    {section.items.map((item) => (
                      <li key={item} className="text-copy leading-relaxed text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {project.products.length > 0 ? (
            <section className="pt-14">
              <h2 className="font-display text-[clamp(1.5rem,1.2vw+1.1rem,2rem)] font-medium leading-tight text-ink">
                Seating specified here
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {project.products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/quote?product=${product.slug}`}
                    className="flex flex-col border border-card-border bg-white p-5 transition-opacity hover:opacity-90"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={imageUrl(product.heroImage, "/images/casino-bella.png")}
                        alt={product.name}
                        width={365}
                        height={362}
                        sizes="(max-width: 639px) 100vw, 22vw"
                        className="size-full object-contain"
                      />
                    </div>
                    <h3 className="truncate pt-5 font-display text-[clamp(1.125rem,0.9vw+0.9rem,1.5rem)] font-medium text-ink">
                      {product.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </Container>
    </>
  );
}
