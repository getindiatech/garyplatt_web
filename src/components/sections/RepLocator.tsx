"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Field, Select } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import {
  CA_PROVINCES,
  REP_COUNTRIES,
  REP_LOCATIONS,
  US_STATES,
} from "@/content/contact";

export default function RepLocator() {
  const [tab, setTab] = useState(REP_LOCATIONS.tabs[0]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  // Picking one side of the "Or" clears the other, so the lookup is unambiguous.
  const selection = state || country;

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
            onClick={() => setTab(label)}
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
            }}
          >
            <option value="">{REP_LOCATIONS.domesticPlaceholder}</option>
            <optgroup label="United States">
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </optgroup>
            <optgroup label="Canada">
              {CA_PROVINCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </optgroup>
          </Select>
        </Field>

        <p className="text-copy leading-normal text-muted">
          {REP_LOCATIONS.divider}
        </p>

        <Field label={REP_LOCATIONS.internationalLabel} htmlFor="country">
          <Select
            id="country"
            name="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState("");
            }}
          >
            <option value="">{REP_LOCATIONS.internationalPlaceholder}</option>
            {REP_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <p className="pt-6 text-copy leading-relaxed text-muted">
        {REP_LOCATIONS.note}
      </p>

      <Button
        href={`/representatives?segment=${encodeURIComponent(tab)}${
          selection ? `&location=${encodeURIComponent(selection)}` : ""
        }`}
        className="mt-6"
      >
        {REP_LOCATIONS.cta}
      </Button>
    </div>
  );
}
