/**
 * Product groups on https://www.garyplatt.com/products/.
 * A chair can sit in more than one section; the first listing is its home.
 * Menu links that 404 on the live site (Milan, Sportsbook Club, Maximus) are omitted.
 */
export const CATALOGUE: Record<string, { sections: { name: string; products: string[] }[] }> = {
  casino: {
    sections: [
      {
        name: "Standard Casino",
        products: [
          "bella",
          "sedona",
          "kiara",
          "kiara-revo",
          "genesis",
          "lido-revo",
          "lido-revo-mini",
          "lido-high-back",
          "lido-low-back",
          "monaco",
          "kopa-chair",
        ],
      },
      {
        name: "Premium",
        products: ["savannah", "lugano-casino", "san-remo", "sonoma-club", "tesla", "ohio"],
      },
      {
        name: "Luxury",
        products: ["aurora", "ezra", "dakota", "valencia", "lugano-executive-sportsbook"],
      },
      {
        name: "Benches",
        products: ["demi-bench", "emory-bench"],
      },
    ],
  },
  hospitality: {
    sections: [
      {
        name: "Banquet & Ballroom",
        products: [
          "chiavari",
          "forum-chair",
          "forum-v1",
          "forum-v2",
          "piazza",
          "soraya-flex-stacker",
          "soraya-flex",
          "vralia",
          "wide-forum",
          "kopa-chair",
        ],
      },
      {
        name: "Dining & Bar",
        products: [
          "modica",
          "nyx-armchair",
          "pesaro",
          "pesaro-2",
          "pesaro-barstool",
          "remini",
          "slat",
          "steakhouse",
          "trappetto",
          "trappetto-barstool",
          "treviso",
          "treviso-armchair",
          "vittoria-barstool",
        ],
      },
      {
        name: "Lounge",
        products: ["anzano", "vittoria", "sovramonte"],
      },
      {
        name: "Imperial",
        products: ["lugano-executive-sportsbook"],
      },
      {
        name: "Conference & Office",
        products: ["eclipse-high-back-upholstered", "eclipse-mid-back-mesh", "lugano", "lugano-executive"],
      },
      {
        name: "Theater",
        products: ["theater"],
      },
    ],
  },
};
