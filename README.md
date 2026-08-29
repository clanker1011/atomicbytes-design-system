# AtomicBytes Design System

## Live site

Browse the design system: https://clanker1011.github.io/atomicbytes-design-system/

> **This design-system site is the source of truth before the marketing rebuild.**
> Steal tokens and component recipes from here. Do not treat the homepage mockup at
> `../index.html` as the system — it is a collage experiment that *uses* the system.

## What this is

A self-contained, polished documentation site for the AtomicBytes brand:

- Mid-century atomic optimism / toy workshop / risograph
- Cream paper, warm ink, coral primary, mint / cobalt / yolk accents as stickers
- Sixtyfour Convergence · Fraunces · Figtree
- Chunky ink-outline buttons with stamp shadows (the recipe the user liked)

Open `index.html` in a browser. No build step.

## Files

| Path | Role |
|---|---|
| `index.html` | Design system one-pager (sticky side nav / mobile top nav) |
| `tokens.css` | Evolved brand tokens — color, type, space, radius, stroke |
| `ds.css` | Documentation chrome + live component recipes |
| `assets/characters/` | Character PNG/SVG assets |
| `README.md` | This note |

Upstream references (do not duplicate as truth):

- `../tokens.css` — original token sheet (DS copy is evolved; keep them aligned)
- `../DESIGN.md` — written principles
- `../index.html` — homepage mockup that proved the button/card recipes

## Sections

1. **Intro** — what the system is for
2. **Principles** — atomic optimism, ink on paper, stickers not glows, craft not circus
3. **Color** — swatches with hex + token names + do/don’t
4. **Typography** — three families + scale
5. **Space** — spacing scale, radius, stroke, stamp shadow
6. **Logo** — mark / mark+wordmark / wordmark lockups, clearspace (½ W), min sizes, don’ts
7. **Characters** — gallery plus usage matrix (who, when, min size)
8. **Icons / doodles** — 2–2.5px ink stroke samples (not an icon font)
9. **Motion** — orbits 18–24s linear, stamp hover lift, reduced-motion
10. **Components** — Button, Card, Stamp, Nav chip, Focus, Links, Issue 00 tray, Field + Say hi
11. **Voice** — tone notes from existing copy
12. **Adoption** — how to use `tokens.css` on a future site

## Characters (expected filenames)

The Characters section expects these files under `assets/characters/`:

| Character | File(s) | Role |
|---|---|---|
| **AtomicByte** | `atomicbyte.png`, `atomicbyte-mark.svg` | Primary logo atom / face mark |
| **Atom Salesman** | `atom-salesman.png` | Full-body mascot |
| **Byte-Bot** | `byte-bot.png` | Robot mascot |
| **Byte Rocket** | `byte-rocket.png` | Rocket mascot |
| **AtomicMark** | `atomic-mark.png` | Geometric trademark atom (no face) |

`atomicbyte-mark.svg` is the Bohr face-mark SVG (same art as `../mascots/A.svg`).
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
3. Replace utility colors; delete dark neon SaaS variables
4. Rebuild components from the recipes on this page
5. Keep copy as written — the system is visual

## Out of scope

This folder is **not** the marketing homepage rebuild. A small example strip in Components is enough. Rebuild the public site against these tokens later.
