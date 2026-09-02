export type NavLink = { label: string; href: string; children?: NavLink[] };

export const NAV_LINKS: NavLink[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Casino Seating", href: "/products/casino" },
      { label: "Customize Your Seat", href: "/products/quote" },
    ],
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Representatives", href: "/representatives" },
      { label: "News & Events", href: "/events" },
      { label: "Career With Us", href: "/careers" },
      { label: "OEM Partnerships", href: "/oem-partnerships" },
      { label: "Intellectual Property", href: "/intellectual-property" },
    ],
  },
  {
    label: "Resources",
    href: "/resources/upholstery",
    children: [
      { label: "Upholstery", href: "/resources/upholstery" },
      { label: "Finishes", href: "/resources/finishes" },
      { label: "Look Book", href: "/resources/look-book" },
      { label: "User Guides", href: "/resources/user-guides" },
      { label: "Warranty", href: "/resources/warranty" },
    ],
  },
  { label: "Sustainability", href: "/sustainability" },
  {
    label: "Gallery",
    href: "/gallery",
    children: [
      { label: "Gallery", href: "/gallery" },
      { label: "Project Overview", href: "/gallery/project" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

/**
 * Social profile URLs — the real handles are not in the design, so these point
 * at the brand's own site until the client supplies them.
 */
export const SOCIAL_URLS: Record<string, string> = {
  Instagram: "https://www.garyplatt.com",
  Twitter: "https://www.garyplatt.com",
  YouTube: "https://www.garyplatt.com",
  Facebook: "https://www.garyplatt.com",
  Linkedin: "https://www.garyplatt.com",
};

/**
 * Where "Download PDF" / document buttons lead. No PDFs ship with the design,
 * so they route to Contact where the documents can be requested.
 */
export const DOCUMENT_REQUEST_HREF = "/contact";

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
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;
