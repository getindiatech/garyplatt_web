"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { QUOTE_PRODUCT } from "@/content/quote";

type QuoteModalProps = {
  open: boolean;
  onClose: () => void;
  /** Label/value pairs shown in the summary panel. */
  config: { label: string; value: string }[];
};

export default function QuoteModal({ open, onClose, config }: QuoteModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on Escape and lock the page behind the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 md:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        tabIndex={-1}
        className="my-auto w-full max-w-[1200px] rounded-lg bg-white p-6 outline-none md:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-eyebrow uppercase tracking-[0.2em] text-muted-alt">
              Request a Quote
            </p>
            <h2
              id="quote-modal-title"
              className="pt-2 font-display text-[clamp(1.25rem,1vw+1rem,1.5rem)] font-medium leading-tight text-ink"
            >
              {QUOTE_PRODUCT.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded p-2 text-2xl leading-none text-muted transition-colors hover:text-ink"
          >
            ×
          </button>
        </div>

        <hr className="my-6 border-hairline-soft" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[454fr_634fr] lg:gap-10">
          {/* ===== Configuration summary ===== */}
          <div className="rounded-lg bg-[#fafafa] p-6">
            <div className="relative mx-auto aspect-[260/264] w-full max-w-[260px]">
              <Image
                src={QUOTE_PRODUCT.preview}
                alt={`${QUOTE_PRODUCT.name} configured`}
                width={260}
                height={264}
                sizes="260px"
                className="absolute inset-0 size-full object-contain"
              />
            </div>

            <h3 className="pt-6 font-display text-[clamp(1.125rem,0.6vw+1rem,1.25rem)] font-medium leading-tight text-ink">
              Your Configuration
            </h3>

            <dl className="flex flex-col gap-3 pt-4">
              {config.map(({ label, value }) => (
                <div key={label} className="flex items-baseline justify-between gap-4">
                  <dt className="text-copy leading-normal text-muted">{label}</dt>
                  <dd className="text-copy font-medium leading-normal text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ===== Enquiry form ===== */}
          <form className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Full Name" required htmlFor="q-name" className="sm:col-span-2">
              <Input id="q-name" name="name" required placeholder="Enter Full Name" />
            </Field>

            <Field label="Phone Number" required htmlFor="q-phone">
              <Input id="q-phone" name="phone" type="tel" required placeholder="Enter Phone Number" />
            </Field>
            <Field label="Email Address" required htmlFor="q-email">
              <Input id="q-email" name="email" type="email" required placeholder="Enter Email Address" />
            </Field>

            <Field label="Company Name" required htmlFor="q-company">
              <Input id="q-company" name="company" required placeholder="Enter Company Name" />
            </Field>
            <Field label="Street No." htmlFor="q-street">
              <Input id="q-street" name="street" placeholder="Enter Street No." />
            </Field>

            <Field label="Post Code / City" htmlFor="q-city">
              <Input id="q-city" name="city" placeholder="Enter Post Code / City" />
            </Field>
            <Field label="Country" htmlFor="q-country">
              <Input id="q-country" name="country" placeholder="Enter Country" />
            </Field>

            <Field label="Message" required htmlFor="q-message" className="sm:col-span-2">
              <Textarea id="q-message" name="message" rows={5} required placeholder="Write Here..." />
            </Field>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-sm border border-ink-strong bg-button-dark px-8 text-sm font-medium text-[#f5f5f5] transition-opacity hover:opacity-88 sm:w-auto"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
