export type Swatch = { name: string; image: string };
export type FinishCard = { name: string; image: string };

const SLUG = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Shared by the Finishes and Edge Moldings tabs — the design shows both. */
export const FINISH_SWATCHES: Swatch[] = [
  "Copper Vein",
  "Gold Vein",
  "Silver Vein",
  "Textured Black",
  "Bengal Black",
  "Terra Brown",
  "Charlie Brown",
  "Sun Gold",
  "Chestnut",
  "Espresso",
  "Gunmetal",
  "Russet",
].map((name) => ({ name, image: `/images/finish-${SLUG(name)}.jpg` }));

export const HANDLE_FINISHES: FinishCard[] = [
  "Plastic Insert Handle Finisher",
  "Metal Insert Handle Finisher",
  "External Insert Handle Finisher",
].map((name) => ({ name, image: `/images/finish-${SLUG(name)}.jpg` }));

export const POWDER_COATS: FinishCard[] = [
  "Tiger Powder Coat Essentials",
  "Cardinal Powder Coat",
  "Tiger Powder Coat Stellix",
].map((name) => ({ name, image: `/images/finish-${SLUG(name)}.jpg` }));

/**
 * Tab labels are not in the CSS export (component instances), so these follow
 * the frame names: Finishes / Finishes_Edge Moldings / Finishes_Handles.
 * The design's count reads "14 finishes available" but twelve are drawn.
 */
export const FINISH_TABS = [
  { id: "finishes", label: "Finishes", count: "14 finishes available" },
  { id: "edge-moldings", label: "Edge Moldings", heading: "Protective Edge Moldings" },
  { id: "handles", label: "Handles", count: "3 finishes available" },
] as const;
