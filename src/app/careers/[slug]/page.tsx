import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import JobApplyForm from "@/components/sections/JobApplyForm";
import { getJob, getJobs } from "@/lib/api";

export const revalidate = 300;

const DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const sentenceCase = (value: string) =>
  value.replace(/_/g, " ").toLowerCase().replace(/^./, (c) => c.toUpperCase());

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  return { title: job?.title ?? "Career With Us", description: job?.summary };
}

export default async function JobDetailPage({
  params,
}: PageProps<"/careers/[slug]">) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  const sections = [
    { title: "About the role", body: job.description ?? job.summary },
    { title: "What you will do", bullets: job.responsibilities },
    { title: "What we are looking for", bullets: job.requirements },
  ].filter((section) => section.body || (section.bullets?.length ?? 0) > 0);

  const info = [
    ["Job Category", job.category.name],
    ["Job Position", job.title],
    ["Job Type", sentenceCase(job.employmentType)],
    ["Salary", job.salaryRange ?? "Competitive"],
    ["Job Location", job.isRemote ? `${job.location} · Remote friendly` : job.location],
    ["Deadline", job.deadline ? DATE.format(new Date(job.deadline)) : "Open until filled"],
  ] as const;

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
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-[clamp(1.5rem,1.2vw+1.1rem,2rem)] font-medium leading-tight text-ink">
                  {section.title}
                </h2>

                {section.body ? (
                  <p className="pt-4 text-copy leading-relaxed text-muted">
                    {section.body}
                  </p>
                ) : null}

                {section.bullets?.length ? (
                  <ul className="flex list-disc flex-col gap-2 pl-6 pt-4">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="text-copy leading-relaxed text-muted">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {/* ===== Job information ===== */}
          <aside className="h-fit">
            <div className="bg-surface p-6 md:p-8">
              <h2 className="font-display text-[clamp(1.125rem,0.6vw+1rem,1.25rem)] font-medium leading-tight text-ink">
                Job Information
              </h2>

              <dl className="flex flex-col gap-5 pt-6">
                {info.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-meta leading-normal text-muted">{label}</dt>
                    <dd className="pt-1 text-copy font-medium leading-normal text-ink">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <JobApplyForm slug={job.slug} title={job.title} />
          </aside>
        </div>
      </Container>
    </>
  );
}
