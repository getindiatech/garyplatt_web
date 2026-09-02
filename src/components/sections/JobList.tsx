"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Job } from "@/content/careers";

export default function JobList({
  categories,
  categoriesTitle,
  jobs,
}: {
  categories: string[];
  categoriesTitle: string;
  jobs: Job[];
}) {
  const [active, setActive] = useState(categories[0]);
  const shown =
    active === categories[0] ? jobs : jobs.filter((j) => j.category === active);

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(220px,280px)_1fr] lg:gap-16">
      {/* Categories */}
      <div>
        <h3 className="font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
          {categoriesTitle}
        </h3>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 pt-5 lg:flex-col lg:gap-y-4">
          {categories.map((c) => {
            const count =
              c === categories[0]
                ? jobs.length
                : jobs.filter((j) => j.category === c).length;
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setActive(c)}
                  aria-pressed={c === active}
                  className={cn(
                    "text-copy transition-colors",
                    c === active
                      ? "font-medium text-ink"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {c}
                  <span className="pl-2 text-muted">({count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Listings */}
      {shown.length ? (
        <ul className="flex flex-col divide-y divide-hairline-soft border-y border-hairline-soft">
          {shown.map(({ slug, title, body, type, location, deadline }) => (
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
                <Button href={`/careers/${slug}`} variant="outline" className="h-11 text-sm">
                  View Details
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-y border-hairline-soft py-12">
          <p className="text-copy leading-relaxed text-muted">
            No open positions in {active} right now. We still like to hear from
            people who would be a fit — send us your details and we will get in
            touch when a role opens.
          </p>
          <Button href="/contact" variant="outline" className="mt-6 h-11 text-sm">
            Send an open application
          </Button>
        </div>
      )}
    </div>
  );
}
