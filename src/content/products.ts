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
