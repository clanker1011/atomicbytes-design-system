# AtomicBytes Design System

Published reference: https://atomicbytes.com/design-system/

## Review release 0.1.0

One approved wordmark (Sixtyfour Convergence), Fraunces headings, and Figtree body/control text. Specialty fonts and alternate paper patterns remain explicit experiments. Hard Hat is PNG-only and experimental until an approved SVG exists.

This folder is the source of truth. It contains reusable styles, reference documentation, and clearly labeled page specimens. It does not rebuild or publish the marketing website.

## Preview

No build step or dependency installation is required:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://localhost:8765/ for the documentation, or http://localhost:8765/specimens.html for full landing, case-study, article, and contact specimens. The contact form is a local simulation: it validates, shows loading, supports a failure/retry, and never transmits or stores entered data.

## Files and adoption

| File | Role |
| --- | --- |
| tokens.css | Brand primitives, functional aliases, light/dark themes, type, space, motion |
| components.css | Canonical buttons, cards, fields, links, stamps, code, quotes, marketing chrome |
| theme.js | Optional theme controller; load in the head before CSS |
| ds.css / docs.js | Reference chrome, search, copying, downloads, experiments; do not adopt |
| specimens.html / specimens.css | Complete page compositions using only production styles |
| demo.js | Local-only specimen behavior; do not use as a real delivery service |
| scripts/check.py | Dependency-free contrast and document/asset checks |

Adopt tokens.css and components.css from the same tagged release. This 0.1.0 candidate is not tagged yet. Record the release version alongside your dependency. Include all theme rules, not only the :root block.

```html
<script src="/design-system/theme.js"></script>
<link rel="stylesheet" href="/design-system/tokens.css">
<link rel="stylesheet" href="/design-system/components.css">
<body class="ab-site">
  <a class="btn btn-fill" href="/contact">Say hi</a>
</body>
```

Load Sixtyfour Convergence, Fraunces (opsz + wght), and Figtree as shown in index.html. The optional ab-site body class supplies a base; component classes also work in an existing page. Namespace these generic class names when integrating with an application that already owns .btn or .card.

Use functional text, surface, border, and action tokens. Named inks remain for decoration. Numbered --accent-2/3/4 aliases are deprecated but retained. Use data-expression="quiet", "standard", or "expressive" per composition. Do not add hover motion to static content.

## Component contracts

- Links navigate; native buttons perform actions. Disabled buttons block activation; a disabled link requires its application to block activation. Loading uses disabled plus aria-busy while preserving the control's purpose.
- article.card is static. a.card.card--link has one destination and no nested controls.
- Fields associate hints/errors through aria-describedby, visibly mark required/optional, validate on submit, and retain values after delivery failure. All focus rings remain cobalt.
- Motion uses 150ms/180ms linear timing; decorative orbits use 18/22/24 seconds. Reduced motion removes transforms and animation.
- Images are optional in project cards. Use a text-only card when an approved image is unavailable.

## Verification

```sh
python3 scripts/check.py
```

Before adopting a release, exercise both themes at 320, 375, 768, 1024, and 1280 CSS pixels. Check keyboard search and section navigation, copied markup, download links, form validation/loading/failure/retry, reduced motion, and 200% text zoom. Automated checks are not a complete accessibility audit.

## Maintenance

AtomicBytes maintains the system. Stable recipes need a concrete use case and both-theme verification for changes. Experiments must not silently replace approved identity. Record breaking changes and migration instructions before removing a stable class or token.

0.1.0: separated production styles from docs, corrected contrast, added functional tokens and expression levels, clarified asset/typography status, added search/copy/download controls, and composed complete local page specimens.
