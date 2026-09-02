"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import InstallationCard from "@/components/ui/InstallationCard";
import type { Installation } from "@/content/gallery";

const PAGE_SIZE = 8;

/** "All Installations" grid — reveals the remaining tiles a page at a time. */
export default function InstallationGrid({
  items,
}: {
  items: Installation[];
}) {
  const [shown, setShown] = useState(PAGE_SIZE);
  const remaining = items.length - shown;

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {items.slice(0, shown).map((item) => (
          <InstallationCard key={item.image} item={item} ratio="402 / 480" />
        ))}
      </div>

      {remaining > 0 ? (
        <div className="flex justify-center pt-12">
          <Button
            variant="outline"
            onClick={() => setShown((n) => n + PAGE_SIZE)}
          >
            Load More
          </Button>
        </div>
      ) : null}
    </>
  );
}
