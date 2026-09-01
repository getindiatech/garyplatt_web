export type CasinoProduct = { name: string; image: string };

/** Card order as drawn in the design (3 rows of 4). */
export const CASINO_PRODUCTS: CasinoProduct[] = [
  { name: "Bella", image: "/images/casino-bella.png" },
  { name: "Sedona", image: "/images/casino-sedona.png" },
  { name: "Kiara", image: "/images/casino-kiara.png" },
  { name: "Lido Low Back", image: "/images/casino-lido-low-back.png" },
  { name: "Kiara Revo", image: "/images/casino-kiara-revo.png" },
  { name: "Genesis", image: "/images/casino-genesis.png" },
  { name: "LIDO REVO", image: "/images/casino-lido-revo.png" },
  { name: "Lido High Back", image: "/images/casino-lido-high-back.png" },
  { name: "Lido Revo Mini", image: "/images/casino-lido-revo-mini.png" },
  { name: "Lido High Back", image: "/images/casino-lido-high-back-2.png" },
  { name: "Monaco", image: "/images/casino-monaco.png" },
  { name: "Kopa Chair", image: "/images/casino-kopa-chair.png" },
];

/**
 * Three filter tabs. The design supplies only the pill geometry — the labels
 * live inside component instances, so these names are provisional.
 * Each tab re-orders the same catalogue rather than holding its own set.
 */
export const CASINO_TABS = [
  { label: "All Seating", order: null },
  { label: "Slot Seating", order: [4, 5, 6, 7, 0, 1, 2, 3, 8, 9, 10, 11] },
  { label: "Table Games", order: [8, 9, 10, 11, 4, 5, 6, 7, 0, 1, 2, 3] },
] as const;
