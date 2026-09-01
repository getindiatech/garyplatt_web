import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
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

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(220px,280px)_1fr] lg:gap-16">
          {/* Categories */}
          <div>
            <h3 className="font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
              {OPEN_POSITIONS.categoriesTitle}
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 pt-5 lg:flex-col lg:gap-y-4">
              {JOB_CATEGORIES.map((c, i) => (
                <li key={c}>
                  <button
                    type="button"
                    className={
                      i === 0
                        ? "text-copy font-medium text-ink"
                        : "text-copy text-muted transition-colors hover:text-ink"
                    }
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Listings */}
          <ul className="flex flex-col divide-y divide-hairline-soft border-y border-hairline-soft">
            {OPEN_POSITIONS.jobs.map(({ title, body, type, location, deadline }) => (
              <li
                key={title}
                className="flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
                    {title}
                  </h3>
                  <p className="pt-2 text-copy leading-relaxed text-muted">{body}</p>

                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    {[type, location].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface px-3 py-1 text-[clamp(0.6875rem,0.2vw+0.64rem,0.75rem)] font-medium text-muted-alt"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                  {deadline ? (
                    <p className="text-copy leading-normal text-muted">{deadline}</p>
                  ) : null}
                  <Button href="/contact" variant="outline" className="h-11 text-sm">
                    View Details
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
