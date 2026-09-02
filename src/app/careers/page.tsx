import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import JobList from "@/components/sections/JobList";
import { CAREERS_VALUES, JOB_CATEGORIES, OPEN_POSITIONS } from "@/content/careers";

export const metadata: Metadata = {
  title: "Career With Us",
  description:
    "Open positions at Gary Platt Seating — engineering, upholstery and materials science.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Career With Us"
        crumbs={[{ label: "Home", href: "/" }, { label: "Career" }]}
      />

      {/* ===== Why join ===== */}
      <Container className="pb-section">
        <p className="text-eyebrow uppercase tracking-[0.2em] text-muted-alt">
          {CAREERS_VALUES.eyebrow}
        </p>
        <h2 className="pt-4 font-display text-section font-medium leading-none tracking-tight text-ink">
          {CAREERS_VALUES.title}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          {CAREERS_VALUES.items.map(({ icon, title, body }) => (
            <article key={title} className="flex flex-col items-start">
              <Image
                src={icon}
                alt=""
                width={48}
                height={48}
                className="size-10 md:size-12"
              />
              <h3 className="pt-5 font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
                {title}
              </h3>
              <p className="max-w-[496px] pt-3 text-copy leading-relaxed text-muted">
                {body}
              </p>
            </article>
          ))}
        </div>
      </Container>

      {/* ===== Open positions ===== */}
      <Container className="pb-section">
        <p className="text-eyebrow uppercase tracking-[0.2em] text-muted-alt">
          {OPEN_POSITIONS.eyebrow}
        </p>
        <h2 className="pt-4 font-display text-section font-medium leading-none tracking-tight text-ink">
          {OPEN_POSITIONS.title}
        </h2>

        <JobList
          categories={JOB_CATEGORIES}
          categoriesTitle={OPEN_POSITIONS.categoriesTitle}
          jobs={OPEN_POSITIONS.jobs}
        />
      </Container>
    </>
  );
}
