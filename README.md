# Kudamalana Tea Estate website

A local React website for Kudamalana Tea Estate in Thalgaswala, Galle. The
site presents the estate story, factory, tea collection, sustainability and
quality information, trade enquiries, visit information, and contact details.

## Technology

- React 19 and Vite
- React Router
- Lucide icons
- Sharp-based responsive image generation
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
- `/our-story` - Estate history
- `/estate-factory` - Factory overview and photograph gallery
- `/teas` - Product catalogue
- `/teas/brew-by-charles` - Brew by Charles tin
- `/teas/charles-brew` - Charles Brew pouch
- `/teas/eddys-taste` - Eddy's Taste
- `/teas/kudamalana-kahata` - Kudamalana Kahata
- `/sustainability` - Farming and environmental practices
- `/quality` - Food-safety and quality information
- `/trade` - Wholesale and trade enquiries
- `/visit` - Visit enquiries
- `/contact` - General contact form

## Product catalogue

The public catalogue contains four products:

1. Brew by Charles - cylindrical tin
2. Charles Brew - red pouch
3. Eddy's Taste - brown pouch
4. Kudamalana Kahata - silver packet

Product content is centralized in `src/data/siteData.js`. Product card and
detail imagery shares the same warm, blended presentation treatment. Source
photographs remain in `public/product-photos`; responsive variants are selected
through `src/ResponsiveImage.jsx` and `src/data/imageManifest.json`.

## Content rules

Do not add unsupported prices, pack sizes, tea grades, acreage, exact elevation,
awards, export destinations, ownership claims, or organic certification. Keep
ISO 22000:2018 food-safety certification distinct from statements about organic
farming practices.

## Images

Factory masters are stored in `assets/factory-ai`, public factory exports in
`public/factory-ai`, original reference photographs in `public/factory-photos`,
product photos in `public/product-photos`, and brand assets in `public/brand`.
See `scripts/README.md` for the optimization workflow and
`assets/factory-ai/README.md` for internal factory-image provenance.

The homepage hero framing is controlled in CSS so the factory remains visible
beside the text overlay. Adjust its crop and position in `src/styles.css` rather
than regenerating the source image for layout-only changes.

## Publishing

The project is configured for local development and production builds only. No
hosting or publishing workflow is included.
