"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Field, Select } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import { REP_LOCATIONS } from "@/content/contact";
import {
  imageUrl,
  locateRepresentatives,
  type Representative,
  type TerritoryKind,
} from "@/lib/api";

type Territories = Record<TerritoryKind, string[]>;

export default function RepLocator({ territories }: { territories: Territories }) {
  const [tab, setTab] = useState(REP_LOCATIONS.tabs[0]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [results, setResults] = useState<Representative[] | null>(null);
  const [busy, setBusy] = useState(false);

  const states = territories.US_STATE ?? [];
  const provinces = territories.CA_PROVINCE ?? [];
  const countries = territories.COUNTRY ?? [];

  // Picking one side of the "Or" clears the other, so the lookup is unambiguous.
  const selection = state || country;

  async function find() {
    if (!selection) return;
    setBusy(true);

    const kind: TerritoryKind = country
      ? "COUNTRY"
      : provinces.includes(state)
        ? "CA_PROVINCE"
        : "US_STATE";

    const found = await locateRepresentatives(
      kind,
      selection,
      tab === "Hospitality" ? "HOSPITALITY" : "CASINO",
    );

    setResults(found);
    setBusy(false);
  }

  return (
    <div>
      <h2 className="font-display text-[clamp(1.75rem,1.5vw+1.2rem,2.5rem)] font-medium leading-tight text-ink">
        {REP_LOCATIONS.title}
      </h2>

      <div className="flex gap-8 pt-6">
        {REP_LOCATIONS.tabs.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              setTab(label);
              setResults(null);
            }}
            aria-pressed={label === tab}
            className={cn(
              "border-b-2 pb-2 text-copy font-medium transition-colors",
              label === tab
                ? "border-ink text-ink"
                : "border-transparent text-muted hover:text-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 pt-6">
        <Field label={REP_LOCATIONS.domesticLabel} htmlFor="state">
          <Select
            id="state"
            name="state"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setCountry("");
              setResults(null);
            }}
          >
            <option value="">{REP_LOCATIONS.domesticPlaceholder}</option>
            <optgroup label="United States">
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </optgroup>
            <optgroup label="Canada">
              {provinces.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </optgroup>
          </Select>
        </Field>

        <p className="text-copy leading-normal text-muted">{REP_LOCATIONS.divider}</p>

        <Field label={REP_LOCATIONS.internationalLabel} htmlFor="country">
          <Select
            id="country"
            name="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState("");
              setResults(null);
            }}
          >
            <option value="">{REP_LOCATIONS.internationalPlaceholder}</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <p className="pt-6 text-copy leading-relaxed text-muted">{REP_LOCATIONS.note}</p>

      <Button
        type="button"
        onClick={find}
        disabled={!selection || busy}
        className="mt-6"
      >
        {busy ? "Searching..." : REP_LOCATIONS.cta}
      </Button>

      {results !== null ? (
        <div className="mt-8">
          {results.length === 0 ? (
            <p className="text-copy leading-relaxed text-muted">
              We do not have a {tab.toLowerCase()} representative listed for{" "}
              {selection} yet. Please{" "}
              <a href="/contact" className="text-ink underline underline-offset-4">
                contact the factory
              </a>{" "}
              and we will point you to the right person.
            </p>
          ) : (
            <>
              <h3 className="font-display text-[clamp(1.125rem,0.8vw+0.95rem,1.5rem)] font-medium leading-tight text-ink">
                Your representative{results.length > 1 ? "s" : ""} for {selection}
              </h3>
              <ul className="mt-5 flex flex-col gap-5">
                {results.map((rep) => (
                  <li key={rep.slug} className="flex items-center gap-4">
                    <Image
                      src={imageUrl(rep.image, "/images/rep-01.jpg")}
                      alt={rep.name}
                      width={72}
                      height={72}
                      className="size-18 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-copy font-medium leading-normal text-ink">
                        {rep.name}
                      </p>
                      {rep.company ? (
                        <p className="text-meta leading-normal text-muted">{rep.company}</p>
                      ) : null}
                      {rep.email ? (
                        <a
                          href={`mailto:${rep.email}`}
                          className="text-meta leading-normal text-ink underline underline-offset-4"
                        >
                          {rep.email}
                        </a>
                      ) : null}
                      {rep.phone ? (
                        <p className="text-meta leading-normal text-muted">{rep.phone}</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
