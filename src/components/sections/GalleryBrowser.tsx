"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import InstallationCard from "@/components/ui/InstallationCard";
import { Input, Select } from "@/components/ui/Field";
import {
  ALL_INSTALLATIONS,
  FEATURED_INSTALLATIONS,
  GALLERY_INTRO,
  type Installation,
} from "@/content/gallery";

const PAGE_SIZE = 8;

/** Country is the trailing part of an installation's "City, Country" line. */
function countryOf(item: Installation) {
  return item.location.split(",").pop()!.trim();
}

const COUNTRIES = [
  ...new Set([...FEATURED_INSTALLATIONS, ...ALL_INSTALLATIONS].map(countryOf)),
].sort();

export default function GalleryBrowser() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const match = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (item: Installation) =>
      (!q ||
        item.name.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)) &&
      (!country || countryOf(item) === country);
  }, [query, country]);

  const featured = FEATURED_INSTALLATIONS.filter(match);
  const all = ALL_INSTALLATIONS.filter(match);
  const filtering = query.trim() !== "" || country !== "";
  const remaining = all.length - shown;

  return (
    <>
      {/* Search + country filter */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_320px]">
        <Input
          type="search"
          aria-label="Search casinos or venues"
          placeholder={GALLERY_INTRO.searchPlaceholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShown(PAGE_SIZE);
          }}
        />
        <Select
          aria-label="Filter by country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setShown(PAGE_SIZE);
          }}
        >
          <option value="">{GALLERY_INTRO.countryPlaceholder}</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      {featured.length === 0 && all.length === 0 ? (
        <p className="py-16 text-center text-copy leading-relaxed text-muted">
          No installations match that search. Try a different venue or country.
        </p>
      ) : null}

      {featured.length ? (
        <>
          <h3 className="pt-12 font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
            Featured Installations
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {featured.map((item) => (
              <InstallationCard
                key={item.name}
                item={item}
                ratio="402 / 250"
                withLink
              />
            ))}
          </div>
        </>
      ) : null}

      {all.length ? (
        <>
          <h3 className="pt-14 font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
            All Installations
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {all.slice(0, shown).map((item) => (
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
      ) : null}

      {filtering ? (
        <div className="flex justify-center pt-8">
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCountry("");
              setShown(PAGE_SIZE);
            }}
            className="text-copy font-medium text-ink underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Clear filters
          </button>
        </div>
      ) : null}
    </>
  );
}
