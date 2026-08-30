# AtomicBytes Design System

## Live site

Browse the design system: https://clanker1011.github.io/atomicbytes-design-system/

> **This design-system site is the source of truth before the marketing rebuild.**
> Steal tokens and component recipes from here. Do not treat the homepage mockup at
> `../index.html` as the system — it is a collage experiment that *uses* the system.

## What this is

A self-contained, polished documentation site for the AtomicBytes brand:

- Mid-century atomic optimism / toy workshop / risograph
- Cream paper (default) and night-paper dark — warm ink field, cream type, same sticker accents
- Coral primary, mint / cobalt / yolk accents as stickers
- Sixtyfour Convergence · Fraunces · Figtree
- Chunky ink-outline buttons with stamp shadows (the recipe the user liked)
- Mobile-first layout (320px floor) — the site is the spec, so it has to fit the pocket

Open `index.html` in a browser. No build step.

## Files

| Path | Role |
|---|---|
| `index.html` | Design system one-pager (sticky side nav / mobile top nav) |
| `tokens.css` | Evolved brand tokens — color, type, space, radius, stroke, layout |
| `ds.css` | Documentation chrome + live component recipes |
| `assets/characters/` | Character PNG/SVG assets |
| `README.md` | This note |

Upstream references (do not duplicate as truth):

- `../tokens.css` — original token sheet (DS copy is evolved; keep them aligned)
- `../DESIGN.md` — written principles
- `../index.html` — homepage mockup that proved the button/card recipes

## Sections

1. **Intro** — what the system is for
2. **Principles** — atomic optimism, ink on paper, stickers not glows, craft not circus, fits the pocket
3. **Responsiveness** — why it matters, mobile-first as default, fluid type/space, 44px taps, no sideways scroll, test at 320 / 375 / 768 / 1024+
4. **Color** — swatches with hex + token names + do/don’t (hexes follow the active theme)
5. **Theming** — light / night-paper tokens, toggle + `localStorage`, dark rules
6. **Typography** — three families + scale
7. **Space** — spacing scale, radius, stroke, stamp shadow
8. **Layout** — marketing-page recipes: widths, section rhythm, header, footer, hero, project card
9. **Logo** — mark / mark+wordmark / wordmark lockups, clearspace (½ W), min sizes, don’ts
10. **Characters** — gallery plus usage matrix (who, when, min size)
11. **Labels** — Human Made stamp + HUMAN sticker for human-authored work
12. **Shapes** — mid-century SVG sheet (`shapes.html` + `assets/shapes/`)
13. **Icons / doodles** — 2–2.5px ink stroke samples (not an icon font)
14. **Motion** — orbits 18–24s linear, stamp hover lift, reduced-motion
15. **Components** — Button, Card, Stamp, Nav chip, Focus, Links, Issue 00 tray, Field + Say hi
16. **Code** — inline, fenced TS, YAML/JSON config, terminal, filename tabs, short vs noisy
17. **Quotes** — body quote (ink rule) and callout (mint stamp bar, Fraunces)
18. **Blog example** — composed specimen post using quotes + snippets (not a live Issue)
19. **Voice** — tone notes from existing copy
20. **Adoption** — how to use `tokens.css` on a future site

## Characters (expected filenames)

The Characters section expects these files under `assets/characters/`:

| Character | File(s) | Role |
|---|---|---|
| **AtomicByte** | `atomicbyte.svg`, `atomicbyte.png` | Logo — same asset as Characters |
| **Atom Salesman** | `atom-salesman.png` | Full-body mascot |
| **Byte-Bot** | `byte-bot.png` | Robot mascot |
| **Byte Rocket** | `byte-rocket.png` | Rocket mascot |
| **AtomicMark** | `atomic-mark.png` | Geometric trademark atom (no face) |

The logo is AtomicByte (`atomicbyte.svg` / `atomicbyte.png`) — not a separate mark file.
If a PNG is missing, the page shows a dashed “Asset pending” placeholder for that filename.

**Rejected:** Lab Tech — do not include.

### Usage quick rules

- **Logo mark (AtomicByte)** — default identity, header, favicon (keep the face). Clearspace = ½ mark width. Don’t stretch, glow, or recolor the nucleus.
- **Full characters** — personality beats; one hero per view; don’t stretch
- **AtomicMark** — trademark / formal / quiet corners / small monograms
- **Accents** — stickers, not glows

## Adopting on the live site

1. Copy `tokens.css` as the single source of truth
2. Load Sixtyfour Convergence, Fraunces (opsz, wght), Figtree
3. Replace utility colors; delete neon SaaS variables. Keep cream + night-paper themes from this sheet.
4. Rebuild components from the recipes on this page
5. Keep copy as written — the system is visual
6. Build mobile-first — 44px taps, no document sideways scroll, usable at 320

## Shapes

- Gallery page: [`shapes.html`](shapes.html)
- SVGs: `assets/shapes/` (20 original mid-century marks)
- Inspiration only: `assets/inspiration/mid-century/` (Matt’s era refs — do not ship)

## Labels (authorship)

Locked marks under `assets/labels/`:

| Mark | Files | Role |
|---|---|---|
| **Human Made stamp** | `human-made-stamp.png`, `.svg` | Circular claim: Human Made · Set by hand |
| **HUMAN sticker** | `human-sticker.png`, `.svg` | One-word poster-lineage badge |

Also in the folder (not locked on the site): `human-poster.*`, `handset-stamp.svg`, `human-made-badge.svg`.

## Out of scope

This folder is **not** the marketing homepage rebuild. Layout recipes (header, footer, hero, project card) are live specimens — steal them. Do not treat this page as the live site.
