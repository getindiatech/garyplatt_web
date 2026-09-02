"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import QuoteModal from "./QuoteModal";
import {
  BASE_OPTIONS,
  BASE_PROMPT,
  CONFIG_STEPS,
  QUOTE_PRODUCT,
} from "@/content/quote";

/** Fixed selections from the design's summary panel; Base tracks the picker. */
const FIXED_CONFIG = [
  { label: "Frame Finish", value: "Black" },
  { label: "Foot Ring", value: "4 Leg" },
  { label: "Back Style", value: "Flat" },
  { label: "Arm Style", value: "Curvy" },
  { label: "Upholstery", value: "Momentum" },
];

/** Views the Rotate control steps through: the render, then the photography. */
const PREVIEW_VIEWS = [QUOTE_PRODUCT.preview, ...QUOTE_PRODUCT.gallery.map((g) => g.src)];

export default function SeatConfigurator() {
  const [step, setStep] = useState(0);
  const [base, setBase] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [view, setView] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [fullView, setFullView] = useState(false);

  // Esc closes the enlarged preview.
  useEffect(() => {
    if (!fullView) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFullView(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullView]);

  const controls = [
    { label: "Rotate", onClick: () => setView((v) => (v + 1) % PREVIEW_VIEWS.length) },
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

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[577fr_828fr] lg:gap-10">
      {/* ===== Preview ===== */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative aspect-[577/585] w-full max-w-[577px] overflow-hidden">
          <Image
            key={PREVIEW_VIEWS[view]}
            src={PREVIEW_VIEWS[view]}
            alt={`${QUOTE_PRODUCT.name} chair preview, view ${view + 1} of ${PREVIEW_VIEWS.length}`}
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
        <div className="flex flex-wrap gap-8 border-b border-hairline-soft">
          {CONFIG_STEPS.map((label, i) => (
            <button
              key={label}
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
              {label}
            </button>
          ))}
        </div>

        <p className="pt-6 text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] leading-normal text-muted-alt">
          {BASE_PROMPT}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {BASE_OPTIONS.map(({ label, image }, i) => (
            <button
              key={`${label}-${i}`}
              type="button"
              onClick={() => setBase(i)}
              aria-pressed={i === base}
              className={cn(
                "flex aspect-[180/222] flex-col items-center justify-between p-4 transition-colors",
                i === base ? "bg-[#eeeeee]" : "bg-white hover:bg-surface",
              )}
            >
              <span className="relative w-full flex-1">
                <Image
                  src={image}
                  alt={label}
                  width={142}
                  height={150}
                  sizes="180px"
                  className="absolute inset-0 size-full object-contain"
                />
              </span>
              <span className="pt-3 text-[clamp(0.875rem,0.4vw+0.78rem,1.125rem)] leading-snug text-[#0a0a0a]">
                {label}
              </span>
            </button>
          ))}
        </div>

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
          aria-label={`${QUOTE_PRODUCT.name} enlarged preview`}
          onClick={() => setFullView(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
        >
          <Image
            src={PREVIEW_VIEWS[view]}
            alt={`${QUOTE_PRODUCT.name} chair, enlarged`}
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
        config={[
          { label: "Base", value: BASE_OPTIONS[base].label },
          ...FIXED_CONFIG,
        ]}
      />
    </div>
  );
}
