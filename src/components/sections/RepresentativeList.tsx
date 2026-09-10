"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type RepCard = {
  slug: string;
  name: string;
  image: string;
  email: string | null;
  segments: ("CASINO" | "HOSPITALITY")[];
};

const TABS = [
  { label: "Casino", segment: "CASINO" as const },
  { label: "Hospitality", segment: "HOSPITALITY" as const },
];

export default function RepresentativeList({ representatives }: { representatives: RepCard[] }) {
  // Contact's rep locator deep-links here with ?segment=Casino|Hospitality.
  const requested = useSearchParams().get("segment");
  const initial = TABS.find((t) => t.label.toLowerCase() === requested?.toLowerCase());
  const [tab, setTab] = useState(initial?.segment ?? TABS[0].segment);

  const shown = representatives.filter((rep) => rep.segments.includes(tab));

  return (
    <>
      <div className="flex justify-center gap-10 pt-8">
        {TABS.map(({ label, segment }) => (
          <button
            key={label}
            type="button"
            onClick={() => setTab(segment)}
            aria-pressed={segment === tab}
            className={cn(
              "border-b-2 pb-2 text-copy font-medium transition-colors",
              segment === tab
                ? "border-ink text-ink"
                : "border-transparent text-muted hover:text-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-copy leading-relaxed text-muted">
          No representatives are listed for this segment yet.
        </p>
      ) : null}

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {shown.map(({ slug, name, image, email }) => (
          <article key={slug} className="flex flex-col">
            <div className="relative aspect-[354/322] w-full overflow-hidden bg-surface">
              <Image
                src={image}
                alt={name}
                width={354}
                height={322}
                sizes="(max-width: 639px) 100vw, 22vw"
                className="size-full object-cover"
              />
            </div>
            <h3 className="pt-5 font-display text-[clamp(1.125rem,0.8vw+0.95rem,1.5rem)] font-semibold leading-tight text-ink">
              {name}
            </h3>
            <Button
              href={email ? `mailto:${email}` : "/contact"}
              variant="outline"
              className="mt-4 h-11 w-fit text-sm"
            >
              Contact
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}
