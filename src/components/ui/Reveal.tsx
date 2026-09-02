"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = React.ComponentPropsWithoutRef<"div"> & {
  /** Stagger in ms, for revealing siblings in sequence. */
  delay?: number;
};

/**
 * Fades and lifts its children into view once, the first time they approach the
 * viewport. Anyone who prefers reduced motion, or has no IntersectionObserver,
 * simply gets the content — it is never hidden without a way to show it.
 */
export default function Reveal({
  delay = 0,
  className,
  children,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!el || reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={shown && delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out",
        shown
          ? "translate-y-0 opacity-100"
          : "motion-safe:translate-y-6 motion-safe:opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
