"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

const PAGE_SIZE = 12;

export type CatalogueProduct = {
  slug: string;
  name: string;
  image: string;
};

export type CatalogueSection = {
  name: string;
  products: CatalogueProduct[];
};

export default function CasinoCatalogue({
  sections,
  categorySlug,
}: {
  sections: CatalogueSection[];
  categorySlug: string;
}) {
  const [tab, setTab] = useState(0);
  const [shown, setShown] = useState(PAGE_SIZE);

  const active = sections[tab] ?? sections[0];
  const shownProducts = useMemo(() => active?.products ?? [], [active]);

  if (sections.length === 0) {
    return (
      <div className="px-gutter pb-section text-center text-copy text-muted">
        No products are published in this category yet.
      </div>
    );
  }

  return (
    <div className="px-gutter pb-section">
      <div className="mx-auto flex max-w-[1680px] flex-col items-center gap-10">
        {sections.length > 1 ? (
          <div className="flex w-full max-w-[1100px] flex-wrap justify-center gap-2">
            {sections.map(({ name }, i) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setTab(i);
                  setShown(PAGE_SIZE);
                }}
                aria-pressed={i === tab}
                className={cn(
                  "h-11 px-5 text-center text-[clamp(0.8125rem,0.3vw+0.74rem,1rem)] font-medium transition-colors",
                  i === tab
                    ? "rounded border border-ink-strong bg-[#fafafa] text-ink-strong"
                    : "rounded-full text-[#0a0a0a] hover:bg-surface",
                )}
              >
                {name}
              </button>
            ))}
          </div>
        ) : null}

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shownProducts.slice(0, shown).map(({ slug, name, image }) => (
            <article
              key={slug}
              className="flex aspect-[405/480] flex-col border border-card-border bg-white p-5"
            >
              <div className="relative w-full flex-1">
                <Image
                  src={image}
                  alt={name}
                  width={365}
                  height={362}
                  sizes="(max-width: 639px) 100vw, 22vw"
                  className="absolute inset-0 size-full object-contain"
                />
              </div>

              <div className="relative flex items-center justify-between gap-4 pt-8">
                <h2 className="min-w-0 truncate font-display text-[clamp(1.125rem,0.9vw+0.9rem,1.625rem)] font-medium leading-tight text-black">
                  {name}
                </h2>
                <Link
                  href={`/products/quote?product=${slug}&category=${categorySlug}`}
                  aria-label={`Request a quote for ${name}`}
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ink-strong bg-button-dark transition-opacity hover:opacity-85"
                >
                  <Image
                    src="/images/icon-arrow-up-right.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {shown < shownProducts.length ? (
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE_SIZE)}
            className="inline-flex h-11 items-center justify-center rounded-sm border border-ink-strong bg-button-dark px-6 text-sm font-medium text-[#f5f5f5] transition-opacity hover:opacity-88"
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
}
