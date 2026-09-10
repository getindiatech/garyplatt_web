# Gary Platt — website

Marketing site for Gary Platt Manufacturing, built with Next.js 16 (App
Router), React 19 and Tailwind 4.

Content comes from the backend in
[`../garyplatt_backend`](../garyplatt_backend): the catalogue, gallery, trade
shows, vacancies, representatives and resources are all managed by staff in its
dashboard rather than edited in this repo.

## Getting started

The site needs the API running.

```bash
# 1. backend (see ../garyplatt_backend/README.md)
cd ../garyplatt_backend && docker compose up -d && npm run db:migrate && npm run db:seed && npm run dev

# 2. this site
cp .env.example .env.local     # NEXT_PUBLIC_API_URL, defaults to localhost:4000
npm install
npm run dev                    # http://localhost:3000
```

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Dev server on :3000              |
| `npm run build` | Production build                 |
| `npm start`     | Serve the build                  |
| `npm run lint`  | ESLint                           |

## How the API is used

Everything goes through [`src/lib/api.ts`](src/lib/api.ts) — the typed client
plus the response types. There is no other place that knows the API's shape.

**Reads are server-side.** Pages are server components that fetch with
`revalidate: 300`, so the browser never fetches content and pages stay
statically rendered. `generateStaticParams` asks the API what exists, so
publishing a product, installation, trade show or vacancy in the dashboard adds
a page here on the next revalidation.

**A failed read falls back rather than throwing.** The site builds and renders
with the API down — lists come back empty, detail pages 404. Change `get()` in
`src/lib/api.ts` if you would rather fail loudly.

**Writes happen in the browser.** These post straight to the API:

| Surface                        | Component                                |
| ------------------------------ | ---------------------------------------- |
| Quote configurator             | `sections/SeatConfigurator` + `QuoteModal` |
| Contact form                   | `sections/ContactForm`                   |
| Job application (with CV)      | `sections/JobApplyForm`                  |
| Rep locator                    | `sections/RepLocator`                    |
| Header search                  | `layout/SiteSearch`                      |

## Content still held in this repo

`src/content/*.ts` remains for copy the API does not own — page furniture,
section headings, the design's legal and resource text, and fallbacks used when
the API returns nothing. Anything a client would want to change themselves
(products, prices, people, jobs, venues) lives in the backend.

Two known placeholders inherited from the design, worth replacing with real
figures before launch:

- the About band's stats (`38+ Years of Excellence`, `2,500+ Projects
  Completed`, `95% Client Satisfaction`) in `sections/About.tsx` — template
  numbers, not Gary Platt's;
- the legal and resource copy under `src/content/legal.ts` and
  `resources.ts`, which is still the design's placeholder wording.

## Images

Catalogue artwork is served by the backend from `/uploads`, and falls back to
`www.garyplatt.com` when it has not been downloaded locally. Both hosts are
allowed in `images.remotePatterns` in `next.config.ts`; add your production
media host there before deploying.
