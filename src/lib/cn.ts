import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The design's fluid type steps live in the `--text-*` theme namespace, but
 * tailwind-merge can't infer that from the class name alone — without this it
 * reads `text-section` as a colour and drops it whenever a `text-*` colour is
 * merged alongside (e.g. `text-section ... text-ink`).
 */
const FONT_SIZES = [
  "eyebrow",
  "hero",
  "section",
  "card-title",
  "lead",
  "body",
  "copy",
  "meta",
  "stat",
  "step",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: FONT_SIZES }],
    },
  },
});

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
