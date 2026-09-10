"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

const PAGE_SIZE = 12;

export type CatalogueProduct = {
  slug: string;
  name: string;
  tier: "STANDARD" | "PREMIUM" | "LUXURY";
  image: string;
};

/** Tabs map to the tiers editors set on each product in the dashboard. */
const TABS = [
  { label: "Standard", tier: "STANDARD" as const },
  { label: "Premium", tier: "PREMIUM" as const },
  { label: "Luxury", tier: "LUXURY" as const },
];

export default function CasinoCatalogue({
  products,
  categorySlug,
}: {
  products: CatalogueProduct[];
  categorySlug: string;
}) {
  const [tab, setTab] = useState(0);
  const [shown, setShown] = useState(PAGE_SIZE);

  // Tiers an editor has not used yet are hidden rather than shown empty.
  const tabs = useMemo(
    () => TABS.filter((entry) => products.some((product) => product.tier === entry.tier)),
    [products],
  );

  const active = tabs[tab] ?? tabs[0];
  const shownProducts = useMemo(
    () => (active ? products.filter((product) => product.tier === active.tier) : products),
    [products, active],
  );

  if (products.length === 0) {
    return (
      <div className="px-gutter pb-section text-center text-copy text-muted">
        No products are published in this category yet.
      </div>
    );
  }

  return (
    <div className="px-gutter pb-section">
      <div className="mx-auto flex max-w-[1680px] flex-col items-center gap-10">
        {tabs.length > 1 ? (
          <div className="flex w-full max-w-[705px] rounded bg-white">
            {tabs.map(({ label }, i) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setTab(i);
                  setShown(PAGE_SIZE);
                }}
                aria-pressed={i === tab}
                className={cn(
                  "h-11 flex-1 px-6 text-center text-[clamp(0.8125rem,0.3vw+0.74rem,1rem)] font-medium transition-colors",
                  i === tab
                    ? "rounded border border-ink-strong bg-[#fafafa] text-ink-strong"
                    : "rounded-full text-[#0a0a0a] hover:bg-surface",
                )}
              >
                {label}
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
