"use client";

import { useState } from "react";
import Image from "next/image";
import QuoteModal from "./QuoteModal";

/** Chairs the live site shows without a Build Your Chair form. */
export default function PlainQuote({
  productName,
  productSlug,
  image,
}: {
  productName: string;
  productSlug: string;
  image: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[420px_1fr] lg:gap-10">
      <div className="relative aspect-square overflow-hidden rounded-sm bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#f4f2ee_70%)]">
        <Image
          src={image}
          alt={productName}
          fill
          sizes="(max-width: 1023px) 100vw, 420px"
          className="object-contain p-6"
          priority
        />
      </div>
      <div className="flex max-w-xl flex-col gap-5">
        <p className="text-copy leading-relaxed text-muted">
          This chair is ordered as shown on garyplatt.com. Send the quantity, finish and upholstery
          you need and we will quote it.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-12 w-fit items-center justify-center rounded-sm border border-ink-strong bg-button-dark px-8 text-sm font-medium text-[#f5f5f5] transition-opacity hover:opacity-90"
        >
          Request a Quote for This Chair
        </button>
      </div>
      <QuoteModal
        open={open}
        onClose={() => setOpen(false)}
        productSlug={productSlug}
        productName={productName}
        preview={image}
        selections={[]}
      />
    </div>
  );
}
