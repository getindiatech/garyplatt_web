"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import { DOCUMENT_REQUEST_HREF } from "@/content/navigation";
import {
  FINISH_SWATCHES,
  FINISH_TABS,
  HANDLE_FINISHES,
  POWDER_COATS,
} from "@/content/finishes";

function SwatchGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
      {FINISH_SWATCHES.map(({ name, image }) => (
        <figure key={name} className="flex flex-col items-start">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface">
            <Image
              src={image}
              alt={name}
              width={260}
              height={260}
              sizes="(max-width: 639px) 45vw, 15vw"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <figcaption className="pt-3 text-[clamp(1rem,0.5vw+0.9rem,1.125rem)] leading-snug text-[#0a0a0a]">
            {name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function CardGrid({ items }: { items: { name: string; image: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {items.map(({ name, image }) => (
        <figure key={name} className="flex flex-col items-start">
          <div className="relative aspect-[547/419] w-full overflow-hidden rounded-lg bg-white">
            <Image
              src={image}
              alt={name}
              width={547}
              height={419}
              sizes="(max-width: 1023px) 100vw, 30vw"
              className="absolute inset-0 size-full object-contain"
            />
          </div>
          <figcaption className="pt-4 text-[clamp(1.125rem,0.8vw+0.95rem,1.5rem)] leading-snug text-[#0a0a0a]">
            {name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function FinishTabs() {
  const [tab, setTab] = useState(0);
  const active = FINISH_TABS[tab];

  return (
    <div className="flex flex-col gap-10">
      {/* 470x44 tab rail with a 158px active underline */}
      <div className="mx-auto flex w-full max-w-[470px] rounded bg-white">
        {FINISH_TABS.map(({ id, label }, i) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(i)}
            aria-pressed={i === tab}
            className={cn(
              "h-11 flex-1 border-b-2 px-2 text-center text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] font-medium transition-colors",
              i === tab
                ? "border-muted-alt text-ink"
                : "border-transparent text-muted hover:text-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {"heading" in active && active.heading ? (
        <h2 className="font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
          {active.heading}
        </h2>
      ) : null}

      {"count" in active && active.count ? (
        <p className="text-[clamp(0.6875rem,0.2vw+0.64rem,0.75rem)] leading-normal text-muted">
          {active.count}
        </p>
      ) : null}

      {tab === 2 ? (
        <div className="flex flex-col gap-14">
          <CardGrid items={HANDLE_FINISHES} />
          <CardGrid items={POWDER_COATS} />
        </div>
      ) : (
        <SwatchGrid />
      )}

      {tab === 1 ? (
        <Button href={DOCUMENT_REQUEST_HREF} variant="outline" className="h-11 w-fit text-sm">
          Download PDF
        </Button>
      ) : null}
    </div>
  );
}
