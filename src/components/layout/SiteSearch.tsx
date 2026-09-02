"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { searchSite } from "@/content/search";

/** Header search: an overlay that filters the page index as you type. */
export default function SiteSearch({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchSite(query), [query]);

  // Every dismissal path funnels through here so the box always reopens empty.
  const close = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 px-4 pt-24"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search this site"
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full max-w-[640px] overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-center gap-3 border-b border-hairline-soft px-5">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, resources, pages..."
            aria-label="Search this site"
            className="h-14 w-full bg-transparent text-copy text-ink outline-none placeholder:text-muted"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="shrink-0 text-2xl leading-none text-muted transition-colors hover:text-ink"
          >
            &times;
          </button>
        </div>

        {query.trim() ? (
          results.length ? (
            <ul className="max-h-[50vh] overflow-y-auto py-2">
              {results.map(({ title, href, section }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={close}
                    className={cn(
                      "flex items-center justify-between gap-4 px-5 py-3",
                      "text-copy text-ink transition-colors hover:bg-surface",
                    )}
                  >
                    <span className="font-medium">{title}</span>
                    <span className="text-meta text-muted">{section}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-6 text-copy text-muted">
              Nothing matches “{query.trim()}”. Try “casino”, “warranty” or
              “finishes”.
            </p>
          )
        ) : (
          <p className="px-5 py-6 text-copy text-muted">
            Start typing to find a product, resource or page.
          </p>
        )}
      </div>
    </div>
  );
}
