# Image optimization

Keep generated factory PNG masters in `assets/factory-ai`, interior-page artwork
masters in `assets/header-art`, product photos in `public/product-photos`, and
the logo in `public/brand`. The original factory photographs remain in
`public/factory-photos`. After replacing a master, run:

```sh
npm run images:optimize
npm run build
```

Commit the generated `public/optimized` files and `src/data/imageManifest.json`
with the source change, plus the `public/factory-ai` and `public/header-art`
WebP exports. The optimizer preserves originals and creates WebP
variants with content-hashed filenames, plus a small PNG favicon. It performs
resizing and compression only, without changing photo colors or sharpening.

The active product-image mapping is:

- `brew-by-charles-tin-150g.png` - Brew by Charles
- `charles-brew-pouch.png` - Charles Brew
- `eddys-taste-pouch-200g.png` - Eddy's Taste
- `kudamalana-kahata-50g.png` - Kudamalana Kahata

The former Eddy's Taste kraft-pouch image is not displayed. Update
`src/data/siteData.js` when adding, removing, or reassigning a product image;
running the optimizer alone does not change catalogue content.

`ResponsiveImage` uses the manifest to select an image appropriate for the
display size and pixel density. Images default to native lazy loading and async
decoding; the homepage hero and main product image load eagerly. Factory gallery
enlargements use responsive versions requested when their lightbox opens. Normal browser caching
applies; production cache headers remain the hosting server's responsibility.
