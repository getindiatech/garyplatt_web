"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  REPRESENTATIVES,
  REPRESENTATIVE_TABS,
  type RepresentativeSegment,
} from "@/content/company";

export default function RepresentativeList() {
  // Contact's rep locator deep-links here with ?segment=Casino|Hospitality.
  const requested = useSearchParams().get("segment");
  const initial = REPRESENTATIVE_TABS.find((t) => t === requested);
  const [tab, setTab] = useState<RepresentativeSegment>(
    initial ?? REPRESENTATIVE_TABS[0],
  );
  const shown = REPRESENTATIVES.filter((r) => r.segments.includes(tab));

  return (
    <>
      <div className="flex justify-center gap-10 pt-8">
        {REPRESENTATIVE_TABS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setTab(label)}
            aria-pressed={label === tab}
            className={cn(
              "border-b-2 pb-2 text-copy font-medium transition-colors",
              label === tab
                ? "border-ink text-ink"
                : "border-transparent text-muted hover:text-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {shown.map(({ name, image }) => (
          <article key={name} className="flex flex-col">
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
            <Button href="/contact" variant="outline" className="mt-4 h-11 w-fit text-sm">
              View Details
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}
