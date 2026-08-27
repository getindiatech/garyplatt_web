export type Installation = {
  name: string;
  location: string;
  image: string;
};

export const GALLERY_INTRO = {
  /** Kept verbatim from the design, including "Build"/"elovate". */
  title: "Crafted for Comfort, Build to inspire.",
  body: "From world-class casinos to luxury resorts and fine dining, our seating solution enhance experiences and elovate spaces.",
  searchPlaceholder: "Search Casinos or venue...",
  countryPlaceholder: "Select Country",
};

/** The four named venues in the design. */
export const FEATURED_INSTALLATIONS: Installation[] = [
  {
    name: "Bellagio Casino",
    location: "Las Vegas, USA",
    image: "/images/gallery-01.jpg",
  },
  {
    name: "Marina Bay Sands",
    location: "Singapore",
    image: "/images/gallery-02.jpg",
  },
  {
    name: "The Venetian Resort",
    location: "Mecau, China",
    image: "/images/gallery-03.jpg",
  },
  {
    name: "Resorts World",
    location: "Las Vegas, USA",
    image: "/images/gallery-04.jpg",
  },
];

/**
 * The design labels all twelve tiles "Bellagio Casino / Las Vegas, USA", which
 * reads as placeholder repetition, so the four real venues cycle across them
 * rather than inventing names or shipping twelve identical captions.
 */
export const ALL_INSTALLATIONS: Installation[] = Array.from(
  { length: 12 },
  (_, i) => ({
    ...FEATURED_INSTALLATIONS[i % FEATURED_INSTALLATIONS.length],
    image: `/images/gallery-${String(i + 1).padStart(2, "0")}.jpg`,
  }),
);
