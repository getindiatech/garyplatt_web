/**
 * Client for the Gary Platt backend (../garyplatt_backend).
 *
 * Pages call these from server components, so the browser never talks to the
 * API for reads; the form helpers at the bottom run in the browser.
 *
 * Reads are cached and revalidated rather than fetched per request, and a
 * failed read returns a fallback instead of throwing: the marketing site should
 * still build and render if the API is briefly unavailable. Detail lookups
 * return null so the caller can decide between notFound() and a fallback.
 */

export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1"
).replace(/\/$/, "");

/** How long a cached read stays fresh, in seconds. */
const REVALIDATE = 300;

// ---------------------------------------------------------------------------
// Types (mirroring the API responses)
// ---------------------------------------------------------------------------

export type PublishStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type ProductTier = "STANDARD" | "PREMIUM" | "LUXURY";
export type FinishKind = "SWATCH" | "EDGE_MOLDING" | "HANDLE" | "POWDER_COAT";
export type RepSegment = "CASINO" | "HOSPITALITY";
export type TerritoryKind = "US_STATE" | "CA_PROVINCE" | "COUNTRY";
export type DocumentKind =
  | "LOOK_BOOK"
  | "USER_GUIDE"
  | "WARRANTY"
  | "SPEC_SHEET"
  | "CATALOGUE"
  | "CERTIFICATE"
  | "OTHER";

export interface Paginated<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CategoryCard {
  id: string;
  slug: string;
  name: string;
  cardBody: string | null;
  cardCta: string | null;
  cardImage: string | null;
  cardImageAlt: string | null;
  intro: string | null;
  heroImage: string | null;
  _count?: { products: number };
}

export interface ProductCard {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  tier: ProductTier;
  heroImage: string | null;
  useCases: string[];
  isFeatured: boolean;
  isConfigurable: boolean;
  sortOrder: number;
  category: { slug: string; name: string };
  collection: { slug: string; name: string } | null;
}

export interface ProductImage {
  url: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  role: "HERO" | "PREVIEW" | "GALLERY" | "DETAIL" | "THUMBNAIL";
}

export interface OptionValue {
  id: string;
  slug: string;
  label: string;
  image: string | null;
  hexColor: string | null;
  surcharge?: string | null;
}

export interface OptionGroup {
  id: string;
  slug: string;
  name: string;
  prompt: string | null;
  isRequired: boolean;
  values: OptionValue[];
  step?: number;
}

export interface Product extends ProductCard {
  description: string | null;
  minOrderQty: number | null;
  seoTitle: string | null;
  seoDescription: string | null;
  images: ProductImage[];
  optionGroups: OptionGroup[];
  installations: {
    slug: string;
    venueName: string;
    location: string;
    coverImage: string | null;
  }[];
}

export interface CategoryDetail extends CategoryCard {
  seoTitle: string | null;
  seoDescription: string | null;
  products: ProductCard[];
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  _count?: { products: number };
}

export interface Finish {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  kind: FinishKind;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  body: string | null;
  logo: string | null;
  websiteUrl: string | null;
}

export interface Testimonial {
  id: string;
  slug: string;
  quote: string;
  author: string;
  role: string | null;
  company: string | null;
  venue: string | null;
  avatar: string | null;
  rating: number | null;
}

export interface ProjectCard {
  id: string;
  slug: string;
  venueName: string;
  location: string;
  city: string | null;
  country: string | null;
  countryCode: string | null;
  coverImage: string | null;
  isFeatured: boolean;
}

export interface ProjectDetail extends ProjectCard {
  summary: string | null;
  completedOn: string | null;
  images: ProductImage[];
  sections: { title: string; body: string | null; items: string[] }[];
  products: {
    slug: string;
    name: string;
    heroImage: string | null;
    tagline: string | null;
  }[];
}

export interface EventCard {
  id: string;
  slug: string;
  code: string | null;
  name: string;
  startsOn: string;
  endsOn: string | null;
  dateLabel: string | null;
  location: string;
  image: string | null;
  imageAlt: string | null;
}

export interface EventDetail extends EventCard {
  address: string | null;
  boothNumber: string | null;
  websiteUrl: string | null;
  timeLabel: string | null;
  intro: string | null;
  sections: { title: string; items: string[] }[];
}

export interface Representative {
  id: string;
  slug: string;
  name: string;
  company: string | null;
  image: string | null;
  email: string | null;
  phone: string | null;
  websiteUrl: string | null;
  segments: RepSegment[];
}

export interface JobCard {
  id: string;
  slug: string;
  title: string;
  summary: string;
  employmentType: string;
  location: string;
  isRemote: boolean;
  deadline: string | null;
  publishedAt: string | null;
  category: { slug: string; name: string };
}

export interface JobDetail extends JobCard {
  description: string | null;
  responsibilities: string[];
  requirements: string[];
  salaryRange: string | null;
}

export interface JobCategory {
  id: string;
  slug: string;
  name: string;
  _count?: { jobs: number };
}

export interface SiteDocument {
  id: string;
  slug: string;
  kind: DocumentKind;
  title: string;
  description: string | null;
  fileUrl: string;
  coverImage: string | null;
  pageCount: number | null;
  sizeBytes: number | null;
}

export interface EditorialPage {
  slug: string;
  kind: "MARKETING" | "LEGAL" | "RESOURCE";
  title: string;
  intro: string | null;
  blocks: { type: string; body?: string; items?: string[] }[];
  seoTitle: string | null;
  seoDescription: string | null;
  effectiveOn: string | null;
  updatedAt: string;
}

export interface SearchHit {
  title: string;
  href: string;
  section: string;
  excerpt?: string | null;
  image?: string | null;
}

export interface ContactSettings {
  phone?: string;
  phoneAlt?: string;
  fax?: string;
  email?: string;
  address?: string;
}

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

/**
 * A read that never throws. The marketing site must still build when the API
 * is down; the caller decides what an empty result means.
 */
async function get<T>(path: string, fallback: T, revalidate = REVALIDATE): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: { accept: "application/json" },
      next: { revalidate },
    });

    if (!response.ok) {
      console.warn(`[api] ${path} -> ${response.status}`);
      return fallback;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn(`[api] ${path} unreachable: ${(error as Error).message}`);
    return fallback;
  }
}

const EMPTY_PAGE = { data: [], meta: { page: 1, perPage: 0, total: 0, totalPages: 0, hasNext: false, hasPrev: false } };

/**
 * Resolves an image path the API returned.
 *
 * Uploads stay relative: `next.config.ts` proxies /uploads to the backend, so
 * the browser sees a same-origin path. Absolute URLs (the seed's fallback to
 * garyplatt.com) are passed through untouched.
 */
export function imageUrl(src: string | null | undefined, fallback = ""): string {
  if (!src) return fallback;
  return src;
}

// ---------------------------------------------------------------------------
// Catalogue
// ---------------------------------------------------------------------------

export const getCategories = () => get<CategoryCard[]>("/categories", []);

export const getCategory = (slug: string) =>
  get<CategoryDetail | null>(`/categories/${slug}`, null);

export const getProducts = (query: Record<string, string | number | undefined> = {}) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const suffix = params.toString() ? `?${params}` : "";
  return get<Paginated<ProductCard>>(`/products${suffix}`, EMPTY_PAGE);
};

export const getProduct = (slug: string) => get<Product | null>(`/products/${slug}`, null);

export const getCollections = () => get<Collection[]>("/collections", []);

export const getOptionGroups = () => get<OptionGroup[]>("/option-groups", []);

export const getFinishes = (kind?: FinishKind) =>
  get<Finish[]>(`/finishes${kind ? `?kind=${kind}` : ""}`, []);

export const getFabricBrands = () => get<Brand[]>("/fabrics", []);

export const getOemPartners = () => get<Brand[]>("/oem-partners", []);

export const getTestimonials = () => get<Testimonial[]>("/testimonials", []);

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export const getProjects = (query: Record<string, string | number | undefined> = {}) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const suffix = params.toString() ? `?${params}` : "";
  return get<Paginated<ProjectCard>>(`/projects${suffix}`, EMPTY_PAGE);
};

export const getProject = (slug: string) => get<ProjectDetail | null>(`/projects/${slug}`, null);

export const getProjectCountries = () => get<string[]>("/projects/countries", []);

// ---------------------------------------------------------------------------
// Company
// ---------------------------------------------------------------------------

export const getEvents = (upcoming?: boolean) =>
  get<EventCard[]>(`/events${upcoming === undefined ? "" : `?upcoming=${upcoming}`}`, []);

export const getEvent = (slug: string) => get<EventDetail | null>(`/events/${slug}`, null);

export const getRepresentatives = (segment?: RepSegment) =>
  get<Representative[]>(`/representatives${segment ? `?segment=${segment}` : ""}`, []);

export const getTerritories = () =>
  get<Record<TerritoryKind, string[]>>("/representatives/territories", {
    US_STATE: [],
    CA_PROVINCE: [],
    COUNTRY: [],
  });

export const getJobs = (category?: string) =>
  get<JobCard[]>(`/jobs${category && category !== "all" ? `?category=${category}` : ""}`, []);

export const getJob = (slug: string) => get<JobDetail | null>(`/jobs/${slug}`, null);

export const getJobCategories = () => get<JobCategory[]>("/job-categories", []);

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

export const getDocuments = (kind?: DocumentKind) =>
  get<SiteDocument[]>(`/documents${kind ? `?kind=${kind}` : ""}`, []);

export const getPage = (slug: string) => get<EditorialPage | null>(`/pages/${slug}`, null);

export const getSettings = () => get<Record<string, unknown>>("/settings", {});

export async function getContactSettings(): Promise<ContactSettings> {
  const settings = await getSettings();
  return (settings.contact ?? {}) as ContactSettings;
}

// ---------------------------------------------------------------------------
// Browser-side calls (search and the public forms)
// ---------------------------------------------------------------------------

export interface SubmitResult {
  ok: boolean;
  message: string;
  reference?: string;
}

/** Shared POST handler for the public forms; surfaces validation text as-is. */
async function post(path: string, body: unknown): Promise<SubmitResult> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      message?: string | string[];
      reference?: string;
    };

    if (!response.ok) {
      const message = Array.isArray(payload.message)
        ? payload.message.join(" ")
        : payload.message;
      return {
        ok: false,
        message: message ?? "Something went wrong. Please try again.",
      };
    }

    return {
      ok: true,
      message: (payload.message as string) ?? "Thank you.",
      reference: payload.reference,
    };
  } catch {
    return { ok: false, message: "Could not reach the server. Please try again." };
  }
}

export interface QuotePayload {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  message: string;
  productSlug?: string;
  quantity?: number;
  selections?: { groupSlug: string; valueSlug: string }[];
  source?: string;
}

export const submitQuote = (payload: QuotePayload) => post("/quotes", payload);

export interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  zip?: string;
  subject?: string;
  message: string;
  hearAboutUs?: string;
  consentToEmail?: boolean;
}

export const submitContact = (payload: ContactPayload) => post("/contact", payload);

export const subscribe = (email: string, source = "footer") =>
  post("/newsletter", { email, source });

export interface WarrantyPayload {
  customerName: string;
  company?: string;
  email: string;
  phone?: string;
  venue?: string;
  productName: string;
  quantity?: number;
  purchaseOrder?: string;
  issue: string;
}

export const submitWarrantyClaim = (payload: WarrantyPayload) =>
  post("/warranty-claims", payload);

/** Header search. Runs in the browser as the user types. */
export async function searchSiteApi(query: string, signal?: AbortSignal): Promise<SearchHit[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  try {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(q)}&limit=8`, {
      signal,
      headers: { accept: "application/json" },
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as { results: SearchHit[] };
    return payload.results ?? [];
  } catch {
    return [];
  }
}

/** Rep locator. Posts nothing - it is a filtered read the browser triggers. */
export async function locateRepresentatives(
  kind: TerritoryKind,
  value: string,
  segment?: RepSegment,
): Promise<Representative[]> {
  const params = new URLSearchParams({ kind, value });
  if (segment) params.set("segment", segment);

  try {
    const response = await fetch(`${API_URL}/representatives/locate?${params}`, {
      headers: { accept: "application/json" },
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as { representatives: Representative[] };
    return payload.representatives ?? [];
  } catch {
    return [];
  }
}
