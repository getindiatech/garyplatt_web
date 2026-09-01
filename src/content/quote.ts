export type BaseOption = { label: string; image: string };

export const QUOTE_PRODUCT = {
  name: "Kiara",
  tagline: "The Ultimate in Gaming",
  body: "Designed for any area of the casino, the Kiara chair incorporates all of the ergonomics of our casino seating into a modern, simplistic design. Our proprietary foam provides ultimate comfort, rounded seat front reduces leg strain, and a full back provides support. There are multiple options for bases and finishes. Upholstery options along with customizable back fabrics allow you to incorporate your individual brand's feel.",
  preview: "/images/quote-kiara-preview.png",
  gallery: [
    { src: "/images/quote-kiara-large.jpg", w: 586, h: 320 },
    { src: "/images/quote-kiara-detail-1.jpg", w: 282, h: 154 },
    { src: "/images/quote-kiara-detail-2.jpg", w: 282, h: 154 },
  ],
};

/** Preview controls beside the chair render. */
export const PREVIEW_CONTROLS = ["Rotate", "Zoom", "Full view", "Reset"];

/** Configurator steps; only the Base step is drawn out in the design. */
export const CONFIG_STEPS = ["Base", "EGB Base Finish", "EGB Footrest Finish"];

export const BASE_PROMPT = "Choose your preferred chair BASE.";

/** "Dise" is spelled that way in the design. */
export const BASE_OPTIONS: BaseOption[] = [
  { label: "Pedestal", image: "/images/quote-base-pedestal.png" },
  { label: "4 LEG", image: "/images/quote-base-4-leg.png" },
  { label: "Square", image: "/images/quote-base-square.png" },
  { label: "Square", image: "/images/quote-base-square.png" },
  { label: "Swivel 4 LEG", image: "/images/quote-base-swivel-4-leg.png" },
  { label: "Dise", image: "/images/quote-base-dise.png" },
  { label: "Wood 4 LEG", image: "/images/quote-base-wood-4-leg.png" },
];

export const MORE_COLLECTION = {
  eyebrow: "Curated Selection",
  title: "More Collection Form us",
  cta: "View All Products",
  products: [
    { name: "The Angela Series", image: "/images/casino-bella.png" },
    { name: "The Troya Series", image: "/images/casino-sedona.png" },
    { name: "The Callista Series", image: "/images/casino-kiara.png" },
    { name: "The Helena Series", image: "/images/casino-lido-low-back.png" },
  ],
};
