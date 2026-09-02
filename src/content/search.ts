export type SearchEntry = {
  title: string;
  href: string;
  section: string;
  /** Extra terms that should match this page but do not appear in its title. */
  keywords: string;
};

/** Everything the header search can reach. Keep in step with the app routes. */
export const SEARCH_INDEX: SearchEntry[] = [
  { title: "Home", href: "/", section: "Gary Platt", keywords: "gary platt seating homepage" },
  { title: "About Us", href: "/about", section: "Company", keywords: "our story history craftsmanship reno nevada" },
  { title: "All Products", href: "/products", section: "Products", keywords: "catalogue range chairs stools categories" },
  { title: "Casino Seating", href: "/products/casino", section: "Products", keywords: "slot table sportsbook gaming lounge bella sedona kiara lido monaco genesis" },
  { title: "Hospitality Seating", href: "/products/hospitality", section: "Products", keywords: "hotel restaurant lounge theatre banquette dining" },
  { title: "Gaming Seating", href: "/products/gaming", section: "Products", keywords: "slot stool swivel lift footrest" },
  { title: "Service Tables", href: "/products/service-table", section: "Products", keywords: "table beverage service floor plan" },
  { title: "Customize Your Seat", href: "/products/quote", section: "Products", keywords: "configurator request a quote base finish upholstery custom" },
  { title: "Gallery", href: "/gallery", section: "Gallery", keywords: "installations venues casinos projects photos" },
  { title: "Project Overview", href: "/gallery/project", section: "Gallery", keywords: "case study installation detail" },
  { title: "Sustainability", href: "/sustainability", section: "Company", keywords: "recycled materials environment responsible manufacturing" },
  { title: "Representatives", href: "/representatives", section: "Company", keywords: "sales rep agent territory find a rep" },
  { title: "News & Events", href: "/events", section: "Company", keywords: "trade shows iga hd expo conference booth" },
  { title: "Career With Us", href: "/careers", section: "Company", keywords: "jobs open positions hiring vacancies apply" },
  { title: "OEM Partnerships", href: "/oem-partnerships", section: "Company", keywords: "original equipment manufacturer partner supply" },
  { title: "Intellectual Property", href: "/intellectual-property", section: "Company", keywords: "patents trademarks designs" },
  { title: "Upholstery", href: "/resources/upholstery", section: "Resources", keywords: "fabric leather vinyl brands com" },
  { title: "Finishes", href: "/resources/finishes", section: "Resources", keywords: "wood metal powder coat swatches colours colors" },
  { title: "Look Book", href: "/resources/look-book", section: "Resources", keywords: "brochure inspiration catalogue" },
  { title: "User Guides", href: "/resources/user-guides", section: "Resources", keywords: "chair adjustment mechanism instructions manual" },
  { title: "Warranty", href: "/resources/warranty", section: "Resources", keywords: "guarantee claim repair maintenance care cleaning" },
  { title: "Contact Us", href: "/contact", section: "Contact", keywords: "phone email address enquiry get in touch quote" },
  { title: "Privacy Policy", href: "/privacy-policy", section: "Legal", keywords: "data cookies personal information" },
  { title: "Disclaimer", href: "/disclaimer", section: "Legal", keywords: "liability terms accuracy" },
];

export function searchSite(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return SEARCH_INDEX.map((entry) => {
    const haystack = `${entry.title} ${entry.section} ${entry.keywords}`.toLowerCase();
    // Title hits rank above keyword hits; every term must match somewhere.
    if (!terms.every((t) => haystack.includes(t))) return null;
    const score = terms.every((t) => entry.title.toLowerCase().includes(t)) ? 0 : 1;
    return { entry, score };
  })
    .filter((x): x is { entry: SearchEntry; score: number } => x !== null)
    .sort((a, b) => a.score - b.score)
    .map((x) => x.entry)
    .slice(0, 8);
}
