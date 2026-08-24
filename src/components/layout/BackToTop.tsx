"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show once the reader is well past the hero and heading for the footer.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-4 right-4 z-40 inline-flex size-10 items-center justify-center",
        "rounded-full border border-ink-strong bg-button-dark md:bottom-12 md:right-12 md:size-12",
        // The ring keeps the dark pill readable where it lands on the dark footer.
        "shadow-[0_12px_24px_-10px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.14)]",
        "transition-[opacity,transform,visibility] hover:opacity-85",
        "motion-reduce:transform-none",
        visible
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-3 opacity-0",
      )}
    >
      <Image
        src="/images/icon-arrow-up-right.svg"
        alt=""
        width={20}
        height={20}
        /* The design ships this glyph as an up-right arrow; square it to point up. */
        className="size-4 -rotate-45 md:size-5"
      />
    </button>
  );
}
