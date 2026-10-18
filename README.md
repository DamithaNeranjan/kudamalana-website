# Kudamalana Tea Estate website

A local React website for Kudamalana Tea Estate in Thalgaswala, Galle. The
site presents the estate story, factory, tea collection, sustainability and
quality information, trade enquiries, visit information, and contact details.

## Technology

- React 19 and Vite
- React Router
- Lucide icons
- Sharp-based responsive image generation
- Intersection Observer-based scroll reveals with reduced-motion support
- Lazy-loaded Google Maps embed and directions link for the factory location
- Frontend-only enquiry forms that open a prefilled email to
  `kudamalana@gmail.com`

## Local development

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

## Routes

- `/` - Home
- `/our-story` - Estate history, archival origin plate and timeline
- `/estate-factory` - Factory overview and photograph gallery
- `/teas` - Product catalogue
- `/teas/brew-by-charles` - Brew by Charles tin
- `/teas/charles-brew` - Charles Brew pouch
- `/teas/eddys-taste` - Eddy's Taste
- `/teas/kudamalana-kahata` - Kudamalana Kahata
- `/sustainability` - Farming and environmental practices
- `/quality` - Food-safety and quality information
- `/trade` - Wholesale and trade enquiries
- `/visit` - Visit enquiries, factory location and embedded Google Map
- `/contact` - General contact form and Google Maps link

## Product catalogue

The public catalogue contains four products:

1. Brew by Charles - PEKOE 1, cylindrical tin
2. Charles Brew - FBOPF, red pouch
3. Eddy's Taste - FBOPF, brown pouch
4. Kudamalana Kahata - BOPF, silver packet

Product content is centralized in `src/data/siteData.js`. Product card and
detail imagery shares the same warm, blended presentation treatment. Source
photographs remain in `public/product-photos`; responsive variants are selected
through `src/ResponsiveImage.jsx` and `src/data/imageManifest.json`.

## Content rules

Do not add unsupported prices, pack sizes, acreage, exact elevation, awards,
export destinations, ownership claims, or organic certification. Product grades
in the centralized product records are user-confirmed; do not infer grades for
other products. Keep ISO 22000:2018 food-safety certification distinct from
statements about organic farming practices.

## Images

Factory masters are stored in `assets/factory-ai`, public factory exports in
`public/factory-ai`, original reference photographs in `public/factory-photos`,
page-header artwork masters in `assets/header-art`, product photos in
`public/product-photos`, and brand assets in `public/brand`.
See `scripts/README.md` for the optimization workflow and
the README files within `assets` for internal image provenance.

The homepage hero framing is controlled in CSS so the factory remains visible
beside the text overlay. Adjust its crop and position in `src/styles.css` rather
than regenerating the source image for layout-only changes.

Interior page headers use dedicated route-specific editorial artwork. Each
treatment keeps the shared industrial grid, dark green palette, brass details,
gold line icon, and estate metadata while changing the subject to match the
page. Header artwork is centralized in `src/data/siteData.js`, passed through
the `artwork` prop on `StandardPage`, and styled by the `.page-hero-art` rules.

Cards, information rows, galleries, and section introductions use a shared
scroll-reveal and hover-motion system. The observer is initialized by
`useScrollReveal` in `src/App.jsx`; its visual rules and reduced-motion fallback
are in the final motion section of `src/styles.css`.

## Page treatments

The Our Story chronology pairs its timeline with a CSS-built estate archive
plate. The plate uses the verified original-factory year, location, craft and
factory registration already held in site content; its layout and geometric
decoration are defined under `.heritage-archive` in `src/styles.css`.

The Visit page includes a lazy-loaded Google Maps iframe and an external map
link. Contact also exposes the external map link. The displayed address,
Google Maps search URL and embed URL are centralized as `mapAddress`, `mapUrl`
and `mapEmbedUrl` on the `estate` object in `src/data/siteData.js`. The embed
uses Google's query-based URL and does not require an API key. Update all three
fields together if the public factory listing changes.

## Publishing

The project is configured for local development and production builds only. No
hosting or publishing workflow is included.
