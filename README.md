# ZADS PLC — static company website

A standalone React + Vite website built from the supplied ZADS website specification, company profile and official logo. No API, database, admin login or email provider is needed for the current frontend.

## Run

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

Deploy `dist/` to a static host. The build generates individual route entry files, route-specific metadata and a sitemap, so direct links work on hosts that serve directory indexes. If the host supports an SPA fallback, map unknown routes to `404.html` or `index.html`. Domain metadata currently uses `https://zadsplc.com`.

## Included

- Home; About; filterable Products; five product detail pages; Services; Markets / Export History; Insights and three source-based guides; Contact / RFQ; Privacy, Terms and Shipping information; a not-found page.
- Tailwind CSS and locally owned shadcn/ui-style Button, Dialog and Tabs components built on Radix primitives.
- Framer Motion section reveals with reduced-motion support.
- Recharts milestone timeline using only the three documented milestone years. No invented revenue, shipment or market-share statistics.
- Locally hosted fonts, official logo, optimized illustrative product images, mobile navigation and accessible form labels.
- Product-prefilled RFQ with EN/AM field labels, native validation, consent and a review dialog. Visitors can open their email application, download or copy the enquiry. Nothing is submitted or persisted automatically.

## Content and assets

Content is centralized in `src/data.js`. The provided profile is named `ZADC_PLC_Company_Profile_updated.pdf`; its content consistently uses ZADS PLC. The original logo is preserved in `public/zads-logo.png`.

Product images were generated as representative commodity imagery and are clearly identified as illustrative. Source PNGs are retained outside the deployed public assets in `design-assets/`. Run `npm run images:optimize` to regenerate WebP assets.

`docs/content-notes.md` lists factual gaps for the company to confirm. They are not presented as fabricated facts or internal development notices on public pages.

The earlier backend source remains in `server/` for reference, but it is not imported, called, started or included in the static build. Admin authentication, persistent inquiries, email automation and CMS functionality are outside the user's current frontend-only scope.
