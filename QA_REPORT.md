# Website verification — 25 October 2026

## Changes

- Email updated to `kudamalana.info@kudamalana.lk` in Contact, every shared
  footer, and prepared enquiry emails.
- Phone displays updated to `(+94) 91 4203 449` and `(+94) 71 1254 964`.
  Both views share the same display data and existing international dial links.
- Corrected clipped 320px hero headings, product-image grid overflow, narrow
  trade cards, and tablet Contact/Visit headings. Long contact addresses wrap
  inside their cards and footer columns.
- Mobile navigation fits short landscape screens and scrolls internally.
  Escape, current-route selection, and resizing to desktop close it correctly;
  the button exposes its expanded state.
- Gallery focus enters the dialog, cycles within its controls, and returns to
  the opening thumbnail after closing. Short-screen images leave room for the
  caption and controls.
- Form errors are associated with their fields, announced, and focus the first
  invalid field. Mobile fields use 16px text and the email keyboard hint.
  The existing validation wording, enquiry options, and Prepare Email workflow
  are preserved. A native mailto-link handoff allows tests to intercept it.

## Coverage and evidence

- Regression run for the initial update: **58 passed** (29 Chromium, 29 WebKit), with zero
  failures, using the production build. Firefox could not start; see below.
  Each engine checks 364 route/width combinations plus 13 zoom-equivalent
  reflow cases, along with the interaction scenarios below.
- All 13 public routes checked at 320, 360, 390, 430, 768, 820, 1024, 1100,
  1280, 1440, 1920, and 2560 CSS pixels, plus 16 widths at and adjacent to the
  520, 820, 900, 1100, 1180, and 1400 breakpoints.
- Before/after full-page screenshots saved for every route at 320, 768, and
  1440px: 39 images in each set. Chromium's initial 156-case audit identified
  clipping/overflow in 14 cases. The updated 156-case audit has none.
- Compared visible page text against the baseline for all 13 routes, permitting
  only the three requested contact replacements: passed.
- Desktop image comparison at 1440px preserves every page's original height.
  Changed pixels are approximately 0.04–0.27% per page, localized to the contact
  details. Screenshot evidence is in `qa-artifacts/desktop-comparison.json`.
- Interaction checks cover internal destinations, active links, route reloads,
  back/forward, product/unknown-route recovery, short landscape menus, gallery
  wraparound/arrows/Escape/focus, and touch form use at 320×568.
- Validation checks cover empty and whitespace names, invalid email, the
  11/12-character message boundary, correction, all six enquiry types, and
  punctuation, Unicode, plus signs, and line breaks in prepared emails.
- Verified page metadata, local HTTP/runtime failures, broken images, keyboard
  focus, scroll reveals, and normal/reduced-motion styles. Reflow checked at
  720×450, equivalent to a 1440×900 desktop viewport at 200% browser zoom.
- Live Google Maps smoke check returned HTTP 301 followed by HTTP 200 for the
  embed. Deterministic regression tests stub this third-party frame.
- Production build passes. Existing React Router `use client` bundling notices
  are non-fatal and also occurred before these changes.

## Limits and follow-up

- Firefox 157 / Playwright build 1555 fails before loading the site on this
  Windows host (`browserType.launch: spawn UNKNOWN`). Direct launch identifies
  an incorrect side-by-side configuration; Windows' SideBySide log names the
  `mozglue` assembly. Reinstalling the official browser bundle did not repair
  startup. Firefox compatibility remains unverified here; its project remains
  enabled in the test configuration for a working host.
- WebKit's Windows defaults skip links during ordinary Tab traversal. Its
  keyboard check explicitly focuses links and verifies Enter activation;
  normal Tab traversal through buttons and dialog controls is also tested.
- Browser viewport/touch emulation does not verify physical devices, native
  mobile keyboards, OS-level zoom, or OS email-client configuration. Tests
  capture the mailto destination and content; no emails were sent and mailbox
  delivery was not tested.
- The dependency audit reports two existing high-severity findings in Vite
  7.3.6 and source-map-js 1.2.1. Those versions were already locked before this
  change; dependency upgrades were kept outside this visual/functional update.
- No hosting configuration or deployment was changed.

## Follow-up: consistent product-card widths

- Reproduced the reported sizing problem: the mobile cards used automatic
  horizontal margins without an explicit width, allowing shorter product text
  to shrink the card. At 320px Eddy's Taste measured 202.69px wide while the
  other cards measured 284px.
- Added `width: 100%` to the existing mobile card rule, retaining its 440px cap
  and centered position. No content, colors, images, or animations changed.
- New regression checks equal widths and expected available width on Home and
  Teas at 17 sizes from 320–1440px, including 515, 516, 517, 519, 520, and
  521px. Both Chromium and WebKit tests pass (68 route/viewport/browser cases).
  Captured and inspected the corrected 516px product grids. Production build
  and whitespace checks pass. The Firefox limitation above still applies.

## Follow-up: full product photos on mobile

- Reproduced the Brew by Charles bottom crop: the portrait image's automatic
  height exceeded the square frame on narrow screens, which clipped it.
- At widths up to 820px, constrain the image height to its frame and remove
  its automatic minimum height. Existing `object-fit: contain` preserves the
  complete image and its proportions; frame dimensions, desktop styling,
  artwork, and animation rules are unchanged.
- Both Chromium and WebKit containment tests pass for all four product-detail
  photos at 11 widths from 320–820px (88 route/viewport/browser cases), including
  375px. Inspected screenshots from both engines show the complete tin base.
  Production build and whitespace checks pass.
