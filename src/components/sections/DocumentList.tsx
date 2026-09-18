"use client";

import { useState } from "react";
import { API_URL, imageUrl, type AttachedDocument, type DocumentKind } from "@/lib/api";
import { cn } from "@/lib/cn";

const KIND_LABEL: Record<DocumentKind, string> = {
  LOOK_BOOK: "Look book",
  USER_GUIDE: "Instructions",
  WARRANTY: "Warranty",
  SPEC_SHEET: "Specification",
  CATALOGUE: "Catalogue",
  CERTIFICATE: "Certificate",
  OTHER: "PDF",
};

function readableSize(bytes: number | null): string | null {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * PDFs attached to a product or a case study. Each can be previewed in place
 * or downloaded; downloads go through the API so they are counted.
 *
 * Renders nothing when there is nothing attached - the section is optional by
 * design, so a product without paperwork shows no empty heading.
 */
export default function DocumentList({
  documents,
  heading = "Downloads",
  intro,
}: {
  documents: AttachedDocument[];
  heading?: string;
  intro?: string;
}) {
  const [open, setOpen] = useState<string | null>(null);

  if (documents.length === 0) return null;

  return (
    <section className="pt-14">
      <h2 className="font-display text-[clamp(1.5rem,1.2vw+1.1rem,2rem)] font-medium leading-tight text-ink">
        {heading}
      </h2>
      {intro ? <p className="pt-3 text-copy leading-relaxed text-muted">{intro}</p> : null}

      <ul className="mt-6 flex flex-col gap-4">
        {documents.map((doc) => {
          const previewing = open === doc.slug;
          const size = readableSize(doc.sizeBytes);
          const src = imageUrl(doc.fileUrl);

          return (
            <li key={doc.slug} className="border border-card-border bg-white">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded bg-surface font-display text-[11px] font-semibold tracking-[0.12em] text-ink"
                >
                  PDF
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-meta uppercase tracking-[0.16em] text-muted-alt">
                    {KIND_LABEL[doc.kind] ?? "PDF"}
                    {doc.pageCount ? ` · ${doc.pageCount} page${doc.pageCount === 1 ? "" : "s"}` : ""}
                    {size ? ` · ${size}` : ""}
                  </p>
                  <h3 className="pt-1 font-display text-[clamp(1.125rem,0.7vw+0.95rem,1.375rem)] font-medium leading-tight text-ink">
                    {doc.title}
                  </h3>
                  {doc.description ? (
                    <p className="pt-1 text-copy leading-relaxed text-muted">{doc.description}</p>
                  ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(previewing ? null : doc.slug)}
                    aria-expanded={previewing}
                    className={cn(
                      "inline-flex h-11 items-center justify-center rounded-sm border px-5 text-sm font-medium transition-colors",
                      previewing
                        ? "border-ink bg-ink text-white"
                        : "border-ink-strong bg-white text-ink hover:bg-surface",
                    )}
                  >
                    {previewing ? "Close preview" : "Preview"}
                  </button>
                  <a
                    href={`${API_URL}/documents/${doc.slug}/download`}
                    className="inline-flex h-11 items-center justify-center rounded-sm border border-ink-strong bg-button-dark px-5 text-sm font-medium text-[#f5f5f5] transition-opacity hover:opacity-88"
                  >
                    Download
                  </a>
                </div>
              </div>

              {previewing ? (
                <div className="border-t border-card-border bg-surface p-3 motion-safe:animate-rise">
                  {/* Same-origin via the /uploads proxy, so the browser's own
                      PDF viewer renders it in place. */}
                  <iframe
                    src={`${src}#toolbar=1&view=FitH`}
                    title={doc.title}
                    className="h-[70vh] min-h-[480px] w-full bg-white"
                  />
                  <p className="pt-3 text-center text-meta text-muted">
                    Not rendering?{" "}
                    <a href={src} target="_blank" rel="noreferrer" className="text-ink underline underline-offset-4">
                      Open the PDF in a new tab
                    </a>
                    .
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
