export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Resources", href: "/resources/upholstery" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

/** Hero strip: light glyphs sit on the dark photo, dark ones on the white mobile layout. */
export const HERO_SOCIALS = [
  {
    label: "Instagram",
    icon: "/images/icon-instagram.svg",
    iconDark: "/images/icon-instagram-dark.svg",
  },
  {
    label: "Twitter",
    icon: "/images/icon-twitter.svg",
    iconDark: "/images/icon-twitter-dark.svg",
  },
  {
    label: "YouTube",
    icon: "/images/icon-youtube.svg",
    iconDark: "/images/icon-youtube-dark.svg",
  },
] as const;

export const FOOTER_SOCIALS = [
  { name: "Instagram", icon: "/images/icon-social-instagram.svg" },
  { name: "Twitter", icon: "/images/icon-social-twitter.svg" },
  { name: "Facebook", icon: "/images/icon-social-facebook.svg" },
  { name: "Linkedin", icon: "/images/icon-social-linkedin.svg" },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Products",
    links: [
      { label: "Gaming Seating", href: "/products" },
      { label: "Hospitality Seating", href: "/products" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Projects", href: "/gallery" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our Story", href: "/about" },
      { label: "News & Events", href: "/events" },
      { label: "Careers", href: "/contact" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

export const LEGAL_LINKS = ["Privacy Policy", "Disclaimer"] as const;
