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

Catalogue artwork lives on the backend under `/uploads`. `next.config.ts`
**proxies `/uploads` to the backend** rather than linking to it directly, so the
browser only ever sees same-origin image paths.

That is not just tidiness. Next 16 refuses to optimise an absolute image URL
whose hostname resolves to a private IP — which is exactly what
`http://localhost:4000` is in development — and reports it as
`"url" parameter is not allowed`, so every image silently fails to render.
Proxying keeps them local, avoids the `images.dangerouslyAllowLocalIP` escape
hatch, and means the site never needs to know the backend's public hostname.

The one remaining remote source is `www.garyplatt.com`, which the backend's seed
falls back to when artwork has not been downloaded locally; it is allowed in
`images.remotePatterns`. Add any other production media host there.
