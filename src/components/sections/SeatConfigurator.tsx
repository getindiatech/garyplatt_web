"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import QuoteModal from "./QuoteModal";
import {
  BASE_OPTIONS,
  BASE_PROMPT,
  CONFIG_STEPS,
  PREVIEW_CONTROLS,
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

export default function SeatConfigurator() {
  const [step, setStep] = useState(0);
  const [base, setBase] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[577fr_828fr] lg:gap-10">
      {/* ===== Preview ===== */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative aspect-[577/585] w-full max-w-[577px]">
          <Image
            src={QUOTE_PRODUCT.preview}
            alt={`${QUOTE_PRODUCT.name} chair preview`}
            width={577}
            height={585}
            sizes="(max-width: 1023px) 100vw, 40vw"
            className="absolute inset-0 size-full object-contain"
            priority
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {PREVIEW_CONTROLS.map((label) => (
            <button
              key={label}
              type="button"
              className="flex items-center gap-2 text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] font-medium text-[#0a0a0a] transition-opacity hover:opacity-70"
            >
              <span
                aria-hidden
                className="size-5 rounded-full border border-hairline-soft"
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
