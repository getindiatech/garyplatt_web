"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import QuoteModal from "./QuoteModal";
import type { OptionGroup } from "@/lib/api";

export type ConfigurableProduct = {
  slug: string;
  name: string;
  /** Preview first, then any gallery photography the Rotate control steps through. */
  views: string[];
  optionGroups: OptionGroup[];
};

export default function SeatConfigurator({ product }: { product: ConfigurableProduct }) {
  const [step, setStep] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [view, setView] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [fullView, setFullView] = useState(false);

  // One chosen value per step, keyed by the step's slug.
  const [chosen, setChosen] = useState<Record<string, string>>({});

  const groups = product.optionGroups;
  const activeGroup = groups[step];
  const views = product.views.length > 0 ? product.views : ["/images/quote-kiara-preview.png"];

  // Esc closes the enlarged preview.
  useEffect(() => {
    if (!fullView) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFullView(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullView]);

  const controls = [
    { label: "Rotate", onClick: () => setView((v) => (v + 1) % views.length) },
    { label: "Zoom", onClick: () => setZoomed((z) => !z), pressed: zoomed },
    { label: "Full view", onClick: () => setFullView(true) },
    {
      label: "Reset",
      onClick: () => {
        setView(0);
        setZoomed(false);
      },
    },
  ];

  /** What the quote carries: the ids the API expects and the labels a human reads. */
  const selections = useMemo(
    () =>
      groups.flatMap((group) => {
        const valueSlug = chosen[group.slug];
        const value = group.values.find((option) => option.slug === valueSlug);
        return value
          ? [{ groupSlug: group.slug, valueSlug: value.slug, label: group.name, value: value.label }]
          : [];
      }),
    [groups, chosen],
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[577fr_828fr] lg:gap-10">
      {/* ===== Preview ===== */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative aspect-[577/585] w-full max-w-[577px] overflow-hidden">
          <Image
            key={views[view]}
            src={views[view]}
            alt={`${product.name} chair preview, view ${view + 1} of ${views.length}`}
            width={577}
            height={585}
            sizes="(max-width: 1023px) 100vw, 40vw"
            className={cn(
              "absolute inset-0 size-full object-contain transition-transform duration-500",
              zoomed && "scale-150",
            )}
            priority
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {controls.map(({ label, onClick, pressed }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              aria-pressed={pressed}
              className={cn(
                "flex items-center gap-2 text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] font-medium text-[#0a0a0a] transition-opacity hover:opacity-70",
                pressed && "underline underline-offset-4",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-5 rounded-full border border-hairline-soft",
                  pressed && "bg-ink",
                )}
              />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== Options ===== */}
      <div className="bg-white p-6 md:p-8">
        {groups.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-8 border-b border-hairline-soft">
              {groups.map((group, i) => (
                <button
                  key={group.slug}
                  type="button"
                  onClick={() => setStep(i)}
                  aria-pressed={i === step}
                  className={cn(
                    "-mb-px border-b-2 pb-3 text-[clamp(1rem,0.5vw+0.9rem,1.125rem)] font-medium transition-colors",
                    i === step
                      ? "border-ink text-[#0a0a0a]"
                      : "border-transparent text-muted hover:text-ink",
                  )}
                >
                  {group.name}
                </button>
              ))}
            </div>

            <p className="pt-6 text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] leading-normal text-muted-alt">
              {activeGroup?.prompt ?? `Choose your preferred ${activeGroup?.name.toLowerCase()}.`}
            </p>

            <div className="mt-5 grid max-h-[520px] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3">
              {activeGroup?.values.map((option) => {
                const selected = chosen[activeGroup.slug] === option.slug;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setChosen((current) => ({ ...current, [activeGroup.slug]: option.slug }))
                    }
                    aria-pressed={selected}
                    className={cn(
                      "flex aspect-[180/222] flex-col items-center justify-between p-4 transition-colors",
                      selected ? "bg-[#eeeeee]" : "bg-white hover:bg-surface",
                    )}
                  >
                    <span className="relative w-full flex-1">
                      {option.image ? (
                        <Image
                          src={option.image}
                          alt={option.label}
                          width={142}
                          height={150}
                          sizes="180px"
                          className="absolute inset-0 size-full object-contain"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded bg-surface"
                          style={option.hexColor ? { background: option.hexColor } : undefined}
                        />
                      )}
                    </span>
                    <span className="pt-3 text-center text-[clamp(0.875rem,0.4vw+0.78rem,1.125rem)] leading-snug text-[#0a0a0a]">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <p className="text-copy leading-relaxed text-muted">
            This chair is quoted to your specification. Send us a request and our
            team will walk you through the options.
          </p>
        )}

        <button
          type="button"
          onClick={() => setQuoteOpen(true)}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-sm border border-ink-strong bg-button-dark px-8 text-sm font-medium text-[#f5f5f5] transition-opacity hover:opacity-88"
        >
          Request a Quote
        </button>
      </div>

      {fullView ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} enlarged preview`}
          onClick={() => setFullView(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
        >
          <Image
            src={views[view]}
            alt={`${product.name} chair, enlarged`}
            width={1154}
            height={1170}
            sizes="90vw"
            className="max-h-full w-auto max-w-full object-contain"
          />
          <button
            type="button"
            onClick={() => setFullView(false)}
            aria-label="Close enlarged preview"
            className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-ink"
          >
            &times;
          </button>
        </div>
      ) : null}

      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        productSlug={product.slug}
        productName={product.name}
        selections={selections}
      />
    </div>
  );
}
