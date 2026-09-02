import type { ExperienceCardProps } from "@/components/ui/ExperienceCard";

/** Product category cards on /products — same treatment as the home page band. */
export const PRODUCT_CATEGORIES: ExperienceCardProps[] = [
  {
    title: "Casino",
    body: "Seating solutions built for casinos, sportsbooks, gaming lounges and more.",
    cta: "Explore Casino",
    href: "/products/casino",
    image: "/images/product-cat-casino.jpg",
    alt: "Casino floor lined with gaming chairs",
  },
  {
    title: "Hospitality",
    body: "Elevating comfort in hotels, restaurants, lounges, theatres and beyond.",
    cta: "Explore Hospitality",
    href: "/products/hospitality",
    image: "/images/product-cat-hospitality.jpg",
    alt: "Hotel lounge with upholstered seating",
  },
  {
    title: "Gaming",
    body: "Seating solutions built for casinos, sportsbooks, gaming lounges and more.",
    cta: "Explore Gaming",
    href: "/products/gaming",
    image: "/images/product-cat-gaming.jpg",
    alt: "Gaming stools at a casino bar",
  },
  {
    title: "Service Table",
    body: "Elevating comfort in hotels, restaurants, lounges, theatres and beyond.",
    cta: "Explore Service Table",
    href: "/products/service-table",
    image: "/images/product-cat-service-table.jpg",
    alt: "Service tables in a hospitality setting",
  },
];

/**
 * Category detail pages. The design only draws the Casino catalogue, and the
 * chair range it lists is the same one specified across every setting, so all
 * four categories share that grid and differ by masthead and intro copy.
 */
export const PRODUCT_CATEGORY_PAGES = {
  casino: {
    name: "Casino",
    intro:
      "Seating specified for casino floors, sportsbooks and gaming lounges — built to take continuous use and to keep players comfortable for hours at a time.",
  },
  hospitality: {
    name: "Hospitality",
    intro:
      "Chairs, stools and banquettes for hotels, restaurants, lounges and theatres, finished to match the room rather than fight it.",
  },
  gaming: {
    name: "Gaming",
    intro:
      "Slot, table and bar seating engineered around the machine, with swivel, lift and footrest options across the range.",
  },
  "service-table": {
    name: "Service Table",
    intro:
      "Service tables and companion pieces that complete a floor plan, built in the same materials and finishes as the seating.",
  },
} as const;

export type ProductCategorySlug = keyof typeof PRODUCT_CATEGORY_PAGES;
