"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/content/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // Sticky on phones (in flow, above the hero); fixed glass over the hero
        // photo from md up.
        "sticky top-0 z-30 flex h-16 items-center justify-center bg-white px-4 py-[5px]",
        "backdrop-blur-[2.688px] transition-[background,box-shadow]",
        "md:fixed md:inset-x-0 md:h-20 md:bg-white/15 md:px-9 md:py-6 md:backdrop-blur-md",
        scrolled && "shadow-[0_1px_0_rgba(26,26,26,0.08)]",
        // Past the hero the glass sits over light sections, so drop onto the
        // design's dark surface to keep the white nav legible.
        scrolled && "md:bg-dark/92 md:shadow-[0_1px_0_rgba(255,255,255,0.06)]",
      )}
    >
      <div className="relative flex h-full w-full max-w-page items-center justify-between md:h-20 md:px-gutter">
        <a href="#" className="block shrink-0" aria-label="Gary Platt Seating">
          <Image
            src="/images/logo-dark.svg"
            alt="Gary Platt Seating"
            width={102}
            height={32}
            className="h-8 w-[101.75px] md:hidden"
            priority
          />
          <Image
            src="/images/logo-light.svg"
            alt="Gary Platt Seating"
            width={132}
            height={42}
            className="hidden h-[41.575px] w-[132.2px] md:block"
            priority
          />
        </a>

        {/* Centre pill menu */}
        <nav className="absolute left-1/2 top-1/2 hidden h-[67px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-7 rounded-[40px] p-6 backdrop-blur-md lg:flex xl:gap-[46px] xl:px-[38px]">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="whitespace-nowrap text-center text-[15px] font-medium leading-6 text-white transition-opacity hover:opacity-70 xl:text-base"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <button type="button" className="flex items-center justify-center p-2" aria-label="Search">
            <Image src="/images/icon-search.svg" alt="" width={20} height={20} className="size-5" />
          </button>
          <a
            href="#contact"
            className="inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full border border-[#f5f5f5] px-6 text-base font-medium leading-6 text-[#f5f5f5] transition-colors hover:bg-[#f5f5f5] hover:text-ink"
          >
            Request a Quote
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex size-8 items-center justify-center rounded-lg bg-white shadow-[0_0_0_0.8px_rgba(155,155,155,0.12),0_1px_2px_-1px_rgba(3,7,18,0.08),0_4px_4px_0_rgba(3,7,18,0.04)] lg:hidden"
        >
          <Image src="/images/icon-menu.svg" alt="" width={18} height={18} className="size-[18px]" />
        </button>

        {open ? (
          <nav className="absolute inset-x-0 top-16 flex flex-col gap-1 border-t border-ink/8 bg-white p-4 shadow-[0_12px_24px_-12px_rgba(3,7,18,0.12)] md:top-20 lg:hidden">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="py-3 text-base font-medium leading-6 text-ink">
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex h-11 items-center justify-center border border-ink-strong bg-button-dark px-6 text-center text-sm font-medium leading-5 tracking-[0.35px] text-white"
            >
              Request a Quote
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
