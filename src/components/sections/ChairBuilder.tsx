"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import QuoteModal, { type QuoteSelection } from "./QuoteModal";

export type ChairPart = { name: string; detail?: string; image: string | null };
export type ChairBase = { name: string; image: string | null; heights: string[] };
export type ChairVariant = {
  name: string;
  image: string | null;
  backs: ChairPart[];
  backOptions: string[];
  seatOptions: string[];
  bases: ChairBase[];
  upholstery: string[];
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/**
 * The garyplatt.com "Build Your Chair" interaction: pick the use, then click a
 * back, the add-ons, a base and its seat height. The stage follows the click.
 */
export default function ChairBuilder({
  productName,
  productSlug,
  fallbackImage,
  variants,
}: {
  productName: string;
  productSlug: string;
  fallbackImage: string;
  variants: ChairVariant[];
}) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [backName, setBackName] = useState<string | null>(null);
  const [backExtras, setBackExtras] = useState<string[]>([]);
  const [seatExtras, setSeatExtras] = useState<string[]>([]);
  const [baseName, setBaseName] = useState<string | null>(null);
  const [height, setHeight] = useState<string | null>(null);
  const [colors, setColors] = useState<Record<string, string>>({});
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [showBase, setShowBase] = useState(false);

  const variant = variants[variantIndex] ?? variants[0];
  const base = variant?.bases.find((item) => item.name === baseName) ?? null;
  const chairImage = variant?.image || fallbackImage;
  const stageImage = showBase && base?.image ? base.image : chairImage;

  function pickVariant(index: number) {
    setVariantIndex(index);
    setBackName(null);
    setBackExtras([]);
    setSeatExtras([]);
    setBaseName(null);
    setHeight(null);
    setColors({});
    setShowBase(false);
  }

  function pickBase(next: ChairBase) {
    setBaseName(next.name);
    setHeight(next.heights[0] ?? null);
    setShowBase(Boolean(next.image));
  }

  const selections: QuoteSelection[] = useMemo(() => {
    if (!variant) return [];
    const rows: QuoteSelection[] = [
      { groupSlug: "use", valueSlug: slugify(variant.name), label: "Use", value: variant.name },
    ];
    if (backName) {
      const back = variant.backs.find((item) => item.name === backName);
      rows.push({
        groupSlug: "back-style",
        valueSlug: slugify(backName),
        label: "Back style",
        value: back?.detail ? `${backName} (${back.detail})` : backName,
      });
    }
    for (const extra of backExtras) {
      rows.push({ groupSlug: "back-style", valueSlug: slugify(extra), label: "Back option", value: extra });
    }
    for (const extra of seatExtras) {
      rows.push({ groupSlug: "seat-style", valueSlug: slugify(extra), label: "Seat option", value: extra });
    }
    if (base) {
      rows.push({ groupSlug: "base", valueSlug: slugify(base.name), label: "Base", value: base.name });
    }
    if (height) {
      rows.push({ groupSlug: "seat-height", valueSlug: slugify(height), label: "Seat height", value: height });
    }
    for (const zone of variant.upholstery) {
      const color = colors[zone]?.trim();
      if (color) rows.push({ groupSlug: "finish", valueSlug: slugify(color), label: zone, value: color });
    }
    return rows;
  }, [variant, backName, backExtras, seatExtras, base, height, colors]);

  if (!variant) return null;

  return (
    <div className="flex flex-col gap-8">
      <p className="text-copy leading-relaxed text-muted">
        Click a chair, then click any option. Some configurations may not be compatible.
        Contact customer service if you need a combination confirmed.
      </p>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {variants.map((item, index) => {
          const active = index === variantIndex;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => pickVariant(index)}
              aria-pressed={active}
              className={cn(
                "w-36 shrink-0 border bg-white p-2 text-left transition-colors",
                active ? "border-ink" : "border-card-border hover:border-ink",
              )}
            >
              <span className="relative block aspect-square">
                {item.image ? (
                  <Image src={item.image} alt="" fill sizes="144px" className="object-contain" />
                ) : null}
              </span>
              <span className="block pt-2 text-[13px] font-medium leading-snug text-ink">{item.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[420px_1fr] lg:gap-10">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-sm bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#f4f2ee_70%)]">
            <Image
              key={stageImage}
              src={stageImage}
              alt={`${productName}, ${variant.name}`}
              fill
              sizes="(max-width: 1023px) 100vw, 420px"
              className="object-contain p-6"
              priority
            />
          </div>
          {base?.image ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowBase(false)}
                aria-pressed={!showBase}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm",
                  !showBase ? "border-ink bg-ink text-white" : "border-hairline-soft",
                )}
              >
                Chair
              </button>
              <button
                type="button"
                onClick={() => setShowBase(true)}
                aria-pressed={showBase}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm",
                  showBase ? "border-ink bg-ink text-white" : "border-hairline-soft",
                )}
              >
                {base.name}
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-8 bg-white p-6 md:p-8">
          {variant.backs.length > 0 ? (
            <Step n={1} title="Select Back Style">
              <div className="flex flex-wrap gap-3">
                {variant.backs.map((back) => (
                  <button
                    key={back.name}
                    type="button"
                    onClick={() => setBackName(back.name)}
                    aria-pressed={backName === back.name}
                    className={cn(
                      "flex w-36 flex-col items-center border p-3 text-center",
                      backName === back.name ? "border-ink bg-[#f3f2ef]" : "border-card-border",
                    )}
                  >
                    {back.image ? (
                      <span className="relative block h-20 w-full">
                        <Image src={back.image} alt="" fill sizes="144px" className="object-contain" />
                      </span>
                    ) : null}
                    <span className="pt-2 text-sm font-medium">{back.name}</span>
                    {back.detail ? <span className="text-xs text-muted">{back.detail}</span> : null}
                  </button>
                ))}
              </div>
              <ToggleRow
                options={variant.backOptions}
                selected={backExtras}
                onToggle={(value) => setBackExtras((current) => toggle(current, value))}
              />
            </Step>
          ) : null}

          {variant.seatOptions.length > 0 ? (
            <Step n={2} title="Seat options">
              <ToggleRow
                options={variant.seatOptions}
                selected={seatExtras}
                onToggle={(value) => setSeatExtras((current) => toggle(current, value))}
              />
            </Step>
          ) : null}

          {variant.bases.length > 0 ? (
            <Step n={3} title="Select a Base">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {variant.bases.map((item) => {
                  const active = item.name === baseName;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => pickBase(item)}
                      aria-pressed={active}
                      className={cn(
                        "flex flex-col border p-3 text-center",
                        active ? "border-ink bg-[#f3f2ef]" : "border-transparent hover:border-hairline-soft",
                      )}
                    >
                      {item.image ? (
                        <span className="relative block aspect-square w-full">
                          <Image src={item.image} alt="" fill sizes="160px" className="object-contain" />
                        </span>
                      ) : null}
                      <span className="pt-2 text-sm leading-snug">{item.name}</span>
                    </button>
                  );
                })}
              </div>
              {base && base.heights.length > 0 ? (
                <label className="mt-4 flex flex-col gap-2 text-sm text-ink">
                  Select seat height for {base.name}
                  <select
                    value={height ?? ""}
                    onChange={(event) => setHeight(event.target.value)}
                    className="h-11 max-w-xs border border-hairline-soft bg-white px-3"
                  >
                    {base.heights.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
            </Step>
          ) : null}

          {variant.upholstery.length > 0 ? (
            <Step n={4} title="Select Upholstery">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {variant.upholstery.map((zone) => (
                  <label key={zone} className="flex flex-col gap-1 text-sm">
                    <span className="font-medium">{zone}</span>
                    <input
                      value={colors[zone] ?? ""}
                      onChange={(event) =>
                        setColors((current) => ({ ...current, [zone]: event.target.value }))
                      }
                      placeholder="Click to enter a color"
                      className="h-11 border border-hairline-soft px-3"
                    />
                  </label>
                ))}
              </div>
            </Step>
          ) : null}

          <button
            type="button"
            onClick={() => setQuoteOpen(true)}
            disabled={!baseName}
            className="inline-flex h-12 items-center justify-center rounded-sm border border-ink-strong bg-button-dark px-8 text-sm font-medium text-[#f5f5f5] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {baseName ? "Request a Quote for This Chair" : "Select a base to request a quote"}
          </button>
        </div>
      </div>

      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        productSlug={productSlug}
        productName={`${productName} — ${variant.name}`}
        preview={stageImage}
        selections={selections}
      />
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="flex items-center gap-3 font-display text-xl font-medium text-ink">
        <span className="grid size-8 place-items-center rounded-full bg-ink text-sm text-white">{n}</span>
        {title}
      </h3>
      <div className="pt-4">{children}</div>
    </section>
  );
}

function ToggleRow({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            aria-pressed={active}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm",
              active ? "border-ink bg-ink text-white" : "border-hairline-soft bg-white text-ink",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
