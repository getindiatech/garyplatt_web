"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import QuoteModal from "./QuoteModal";
import type { OptionGroup, OptionValue } from "@/lib/api";

export type ConfigurableProduct = {
  slug: string;
  name: string;
  /** Preview first, then any gallery photography the Rotate control steps through. */
  views: string[];
  optionGroups: OptionGroup[];
};

/**
 * Where each chosen part sits on the stage, called out around the chair. Keyed
 * by the step's slug so the artwork lands where that part lives on a real
 * chair; anything unlisted falls through to the side rail.
 */
const CALLOUT_SLOTS: Record<string, string> = {
  "back-style": "right-[4%] top-[6%]",
  "seat-style": "right-[4%] top-[42%]",
  base: "left-[4%] bottom-[10%]",
  "seat-height": "right-[4%] bottom-[10%]",
};

/** How long a chosen tile shows its tick before the next step slides in. */
const ADVANCE_DELAY_MS = 520;

export default function SeatConfigurator({ product }: { product: ConfigurableProduct }) {
  const groups = product.optionGroups;
  const views = product.views.length > 0 ? product.views : ["/images/quote-kiara-preview.png"];

  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [view, setView] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [fullView, setFullView] = useState(false);

  // Bumping this re-keys the chair so it plays its settle animation.
  const [settleKey, setSettleKey] = useState(0);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeGroup = groups[step];

  // Esc closes the enlarged preview.
  useEffect(() => {
    if (!fullView) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFullView(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullView]);

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  // A half-built chair survives a refresh. Restored after mount so the server
  // and client render the same empty state first.
  const storageKey = `gp-config:${product.slug}`;
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(storageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved) as Record<string, string>;
      const valid = Object.fromEntries(
        Object.entries(parsed).filter(([slug, value]) =>
          groups.some((g) => g.slug === slug && g.values.some((v) => v.slug === value)),
        ),
      );
      if (Object.keys(valid).length > 0) {
        // Restoring is not a user action, so no step change and no settle.
        queueMicrotask(() => setChosen(valid));
      }
    } catch {
      // Storage unavailable (private mode, blocked) - start fresh.
    }
  }, [storageKey, groups]);

  useEffect(() => {
    try {
      if (Object.keys(chosen).length === 0) window.sessionStorage.removeItem(storageKey);
      else window.sessionStorage.setItem(storageKey, JSON.stringify(chosen));
    } catch {
      // Nothing to do; the build still works for this visit.
    }
  }, [chosen, storageKey]);

  /** Resolved choices in step order - the stage, the summary and the quote all read this. */
  const selections = useMemo(
    () =>
      groups.flatMap((group) => {
        const value = group.values.find((option) => option.slug === chosen[group.slug]);
        return value ? [{ group, value }] : [];
      }),
    [groups, chosen],
  );

  const requiredDone = groups.filter((g) => g.isRequired).every((g) => chosen[g.slug]);
  const complete = groups.length > 0 && requiredDone;
  const progress = groups.length ? selections.length / groups.length : 0;

  const choose = useCallback(
    (group: OptionGroup, option: OptionValue) => {
      setChosen((current) => ({ ...current, [group.slug]: option.slug }));
      setSettleKey((k) => k + 1);

      // Let the tick land, then move on - unless this was the last step.
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      const index = groups.indexOf(group);
      if (index < groups.length - 1) {
        advanceTimer.current = setTimeout(() => setStep(index + 1), ADVANCE_DELAY_MS);
      }
    },
    [groups],
  );

  const controls = [
    { label: "Rotate", onClick: () => setView((v) => (v + 1) % views.length) },
    { label: "Zoom", onClick: () => setZoomed((z) => !z), pressed: zoomed },
    { label: "Full view", onClick: () => setFullView(true) },
    {
      label: "Reset",
      onClick: () => {
        setView(0);
        setZoomed(false);
        setChosen({});
        setStep(0);
      },
    },
  ];

  const quoteSelections = selections.map(({ group, value }) => ({
    groupSlug: group.slug,
    valueSlug: value.slug,
    label: group.name,
    value: value.label,
  }));

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[577fr_828fr] lg:gap-10">
      {/* ===================================================== Stage ===== */}
      <div className="flex flex-col gap-6">
        <div className="relative aspect-[577/640] w-full overflow-hidden rounded-sm bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#f4f2ee_70%)]">
          {/* The chair. Re-keyed on every choice so it settles once. */}
          <div key={settleKey} className="absolute inset-[10%] motion-safe:animate-settle">
            <Image
              key={views[view]}
              src={views[view]}
              alt={`${product.name} chair preview, view ${view + 1} of ${views.length}`}
              width={577}
              height={585}
              sizes="(max-width: 1023px) 100vw, 40vw"
              className={cn(
                "size-full object-contain transition-transform duration-500",
                zoomed && "scale-150",
              )}
              priority
            />
          </div>

          {/* Callouts: each chosen part lands beside the chair. Keyed on the
              value so swapping a part replays the entrance. */}
          {selections.map(({ group, value }) => (
            <Callout
              key={`${group.slug}-${value.slug}`}
              group={group}
              value={value}
              className={CALLOUT_SLOTS[group.slug] ?? "right-[4%] top-[70%]"}
              onClick={() => setStep(groups.indexOf(group))}
            />
          ))}

          {selections.length === 0 ? (
            <p className="absolute inset-x-0 bottom-5 text-center text-[clamp(0.75rem,0.3vw+0.68rem,0.875rem)] text-muted motion-safe:animate-rise">
              Choose a {groups[0]?.name.toLowerCase() ?? "base"} to start building your chair
            </p>
          ) : null}
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
                className={cn("size-5 rounded-full border border-hairline-soft", pressed && "bg-ink")}
              />
              {label}
            </button>
          ))}
        </div>

        {/* Specification, built up as parts are chosen. */}
        <Specification product={product} groups={groups} chosen={chosen} complete={complete} />
      </div>

      {/* ===================================================== Steps ===== */}
      <div className="flex flex-col bg-white p-6 md:p-8">
        {groups.length > 0 ? (
          <>
            {/* Progress rail */}
            <ol className="flex flex-wrap gap-2 border-b border-hairline-soft pb-5">
              {groups.map((group, i) => {
                const done = Boolean(chosen[group.slug]);
                const active = i === step;
                return (
                  <li key={group.slug}>
                    <button
                      type="button"
                      onClick={() => setStep(i)}
                      aria-current={active ? "step" : undefined}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] font-medium transition-colors",
                        active
                          ? "border-ink bg-ink text-white"
                          : done
                            ? "border-hairline-soft bg-surface text-ink"
                            : "border-hairline-soft text-muted hover:text-ink",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full text-[11px]",
                          active ? "bg-white/15" : done ? "bg-ink text-white" : "bg-surface",
                        )}
                      >
                        {done && !active ? (
                          <Tick className="size-3 motion-safe:animate-tick" />
                        ) : (
                          i + 1
                        )}
                      </span>
                      {group.name}
                    </button>
                  </li>
                );
              })}
            </ol>

            <div
              className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-surface"
              role="progressbar"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-ink transition-[width] duration-500 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* The active step, re-keyed so a change sweeps in from the right. */}
            <div key={activeGroup?.slug} className="motion-safe:animate-sweep">
              <div className="flex items-baseline justify-between gap-4 pt-6">
                <div>
                  <p className="text-eyebrow uppercase tracking-[0.2em] text-muted-alt">
                    Step {step + 1} of {groups.length}
                  </p>
                  <h3 className="pt-1 font-display text-[clamp(1.25rem,1vw+0.95rem,1.625rem)] font-medium leading-tight text-ink">
                    {activeGroup?.name}
                  </h3>
                </div>
                {!activeGroup?.isRequired ? (
                  <span className="text-meta text-muted">Optional</span>
                ) : null}
              </div>

              <p className="pt-2 text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] leading-normal text-muted-alt">
                {activeGroup?.prompt ?? `Choose your preferred ${activeGroup?.name.toLowerCase()}.`}
              </p>

              <OptionGrid
                group={activeGroup}
                selected={chosen[activeGroup?.slug ?? ""]}
                onChoose={(option) => activeGroup && choose(activeGroup, option)}
              />
            </div>

            {/* Step navigation */}
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-hairline-soft pt-5">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-copy font-medium text-ink underline-offset-4 transition-opacity hover:underline disabled:opacity-30 disabled:hover:no-underline"
              >
                ← Back
              </button>

              {step < groups.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(groups.length - 1, s + 1))}
                  className="text-copy font-medium text-ink underline-offset-4 transition-opacity hover:underline"
                >
                  {chosen[activeGroup?.slug ?? ""] ? "Next" : "Skip"} →
                </button>
              ) : (
                <span className="text-meta text-muted">Last step</span>
              )}
            </div>
          </>
        ) : (
          <p className="text-copy leading-relaxed text-muted">
            This chair is quoted to your specification. Send us a request and our team
            will walk you through the options.
          </p>
        )}

        {/* The call to action grows up as the build completes. */}
        <div className={cn("mt-8", complete && "motion-safe:animate-rise")}>
          {complete ? (
            <p className="pb-3 text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] font-medium text-ink">
              <Tick className="mr-2 inline size-4 align-[-2px] text-ink motion-safe:animate-tick" />
              Your chair is configured — send it to our team for pricing.
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => setQuoteOpen(true)}
            className={cn(
              "inline-flex h-12 items-center justify-center rounded-sm border border-ink-strong bg-button-dark px-8 text-sm font-medium text-[#f5f5f5] transition-all hover:opacity-88",
              complete ? "w-full shadow-[0_18px_40px_-18px_rgba(26,26,26,0.5)]" : "",
            )}
          >
            {complete ? "Request a Quote for This Chair" : "Request a Quote"}
          </button>
        </div>
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
        selections={quoteSelections}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------

/** A chosen part, called out beside the chair. */
function Callout({
  group,
  value,
  className,
  onClick,
}: {
  group: OptionGroup;
  value: OptionValue;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={`Change ${group.name.toLowerCase()}`}
      className={cn(
        "absolute z-10 flex max-w-[46%] items-center gap-2.5 rounded-md border border-card-border bg-white/95 p-2 pr-3 text-left shadow-[0_12px_30px_-14px_rgba(26,26,26,0.35)] backdrop-blur transition-transform hover:-translate-y-0.5 motion-safe:animate-pop",
        className,
      )}
    >
      {value.image ? (
        <span className="relative size-11 shrink-0 overflow-hidden rounded bg-surface">
          <Image src={value.image} alt="" width={44} height={44} sizes="44px" className="size-full object-contain" />
        </span>
      ) : (
        <span
          className="grid size-11 shrink-0 place-items-center rounded bg-ink font-display text-[15px] text-white"
          style={value.hexColor ? { background: value.hexColor } : undefined}
        >
          {value.label}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-muted">
          {group.name}
        </span>
        <span className="block truncate text-[clamp(0.75rem,0.3vw+0.68rem,0.8125rem)] font-medium leading-snug text-ink">
          {value.label}
        </span>
      </span>
    </button>
  );
}

/** The build-up beneath the stage: every step, filled in as it is chosen. */
function Specification({
  product,
  groups,
  chosen,
  complete,
}: {
  product: ConfigurableProduct;
  groups: OptionGroup[];
  chosen: Record<string, string>;
  complete: boolean;
}) {
  if (groups.length === 0) return null;

  const tokens = groups.flatMap((group) => {
    const value = group.values.find((option) => option.slug === chosen[group.slug]);
    return value ? [{ key: group.slug, text: value.label }] : [];
  });

  return (
    <div className="border border-card-border bg-white p-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-eyebrow uppercase tracking-[0.2em] text-muted-alt">Your specification</p>
        <span
          className={cn(
            "text-[11px] font-medium uppercase tracking-[0.14em] transition-colors",
            complete ? "text-ink" : "text-muted",
          )}
        >
          {complete ? "Complete" : `${tokens.length} of ${groups.length}`}
        </span>
      </div>

      {/* Reads like a model line: NAME · PART · PART · PART */}
      <p className="flex flex-wrap items-baseline gap-x-2 pt-3 font-display text-[clamp(1.125rem,0.9vw+0.9rem,1.5rem)] leading-tight text-ink">
        <span>{product.name}</span>
        {tokens.map((token) => (
          <span key={`${token.key}-${token.text}`} className="inline-flex items-baseline gap-x-2 motion-safe:animate-rise">
            <span aria-hidden className="text-muted">·</span>
            <span>{token.text}</span>
          </span>
        ))}
      </p>

      <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-hairline-soft pt-4 sm:grid-cols-2">
        {groups.map((group) => {
          const value = group.values.find((option) => option.slug === chosen[group.slug]);
          return (
            <div key={group.slug} className="flex items-baseline justify-between gap-3">
              <dt className="text-meta text-muted">{group.name}</dt>
              <dd
                key={value?.slug ?? "none"}
                className={cn(
                  "truncate text-right text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] font-medium",
                  value ? "text-ink motion-safe:animate-sweep" : "text-muted/60",
                )}
              >
                {value?.label ?? "—"}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

/** Tiles for the active step. Options with no artwork render as large chips. */
function OptionGrid({
  group,
  selected,
  onChoose,
}: {
  group: OptionGroup | undefined;
  selected: string | undefined;
  onChoose: (option: OptionValue) => void;
}) {
  if (!group) return null;

  const pictorial = group.values.some((option) => option.image);

  if (!pictorial) {
    return (
      <div className="mt-5 flex flex-wrap gap-3">
        {group.values.map((option) => {
          const active = option.slug === selected;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChoose(option)}
              aria-pressed={active}
              className={cn(
                "relative flex h-16 min-w-24 items-center justify-center rounded-md border px-6 font-display text-[clamp(1.125rem,0.9vw+0.9rem,1.5rem)] transition-all",
                active
                  ? "border-ink bg-ink text-white shadow-[0_14px_30px_-16px_rgba(26,26,26,0.6)]"
                  : "border-hairline-soft bg-white text-ink hover:border-ink",
              )}
              style={option.hexColor && !active ? { background: option.hexColor } : undefined}
            >
              {option.label}
              {active ? <SelectedBadge /> : null}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mt-5 grid max-h-[520px] grid-cols-2 gap-4 overflow-y-auto pr-1 sm:grid-cols-3">
      {group.values.map((option) => {
        const active = option.slug === selected;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChoose(option)}
            aria-pressed={active}
            className={cn(
              "group relative flex aspect-[180/222] flex-col items-center justify-between rounded-md border p-4 text-center transition-all duration-200",
              active
                ? "border-ink bg-[#f3f2ef] shadow-[0_14px_30px_-16px_rgba(26,26,26,0.45)]"
                : "border-transparent bg-white hover:border-hairline-soft hover:bg-surface",
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
                  className={cn(
                    "absolute inset-0 size-full object-contain transition-transform duration-300",
                    active ? "scale-105" : "group-hover:scale-[1.03]",
                  )}
                />
              ) : (
                <span aria-hidden className="absolute inset-0 rounded bg-surface" />
              )}
            </span>
            <span className="pt-3 text-[clamp(0.875rem,0.4vw+0.78rem,1.125rem)] leading-snug text-[#0a0a0a]">
              {option.label}
            </span>
            {active ? <SelectedBadge /> : null}
          </button>
        );
      })}
    </div>
  );
}

function SelectedBadge() {
  return (
    <span
      aria-hidden
      className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-ink text-white motion-safe:animate-tick"
    >
      <Tick className="size-3.5" />
    </span>
  );
}

function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
