import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { OPEN_POSITIONS } from "@/content/careers";
import {
  JOB_INFO_DEFAULTS,
  JOB_INFO_LABELS,
  JOB_SECTIONS,
} from "@/content/job-detail";

export function generateStaticParams() {
  return OPEN_POSITIONS.jobs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = OPEN_POSITIONS.jobs.find((j) => j.slug === slug);
  return { title: job?.title ?? "Career With Us", description: job?.body };
}

export default async function JobDetailPage({
  params,
}: PageProps<"/careers/[slug]">) {
  const { slug } = await params;
  const job = OPEN_POSITIONS.jobs.find((j) => j.slug === slug);
  if (!job) notFound();

  const info: Record<string, string> = {
    category: job.title,
    ...JOB_INFO_DEFAULTS,
    type: job.type,
  };

  return (
    <>
      <PageHero
        title="Career With Us"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Career", href: "/careers" },
          { label: job.title },
        ]}
      />

      <Container className="pb-section">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1184fr_400fr] lg:gap-16">
          {/* ===== Description ===== */}
          <div className="flex flex-col gap-10">
            {JOB_SECTIONS.map((section, i) => (
              <section key={i}>
                <h2 className="font-display text-[clamp(1.5rem,1.2vw+1.1rem,2rem)] font-medium leading-tight text-ink">
                  {section.title}
                </h2>

                {section.body ? (
                  <p className="pt-4 text-copy leading-relaxed text-muted">
                    {section.body}
                  </p>
                ) : null}

                {section.bullets ? (
                  <ul className="flex list-disc flex-col gap-2 pl-6 pt-4">
                    {section.bullets.map((b, j) => (
                      <li key={j} className="text-copy leading-relaxed text-muted">
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {/* ===== Job information ===== */}
          <aside className="h-fit bg-surface p-6 md:p-8">
            <h2 className="font-display text-[clamp(1.125rem,0.6vw+1rem,1.25rem)] font-medium leading-tight text-ink">
              {JOB_INFO_LABELS.heading}
            </h2>

            <dl className="flex flex-col gap-5 pt-6">
              {JOB_INFO_LABELS.rows.map(({ label, key }) => (
                <div key={key}>
                  <dt className="text-meta leading-normal text-muted">{label}</dt>
                  <dd className="pt-1 text-copy font-medium leading-normal text-ink">
                    {info[key]}
                  </dd>
                </div>
              ))}
            </dl>

            <Button href="/contact" className="mt-8 w-full justify-center">
              Apply Now
            </Button>
          </aside>
        </div>
      </Container>
    </>
  );
}
