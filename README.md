# FreshBrew

A premium coffee-shop site: editorial typography, warm photography, and a
scroll-scrubbed film that carries the brand through the page.

> Slow coffee. Deep moments.

## Running it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## What is built

**Pages** — home, `/menu`, `/menu/[slug]` (19 products), `/story`, `/coffee`,
`/visit`, `/cart`, `/checkout`, plus 404, error and loading states. Every route
prerenders as static HTML.

**Ordering** — product customisation (size, milk, extras) with live pricing, a
cart that survives a reload, a slide-over drawer, and a checkout that ends at a
confirmation. No payment provider is wired up.

**The scroll story** — the hero and the bean-to-cup sequence are one pinned
section. Scrolling scrubs a single café film frame by frame while the copy
cross-fades, so each caption lands on the footage that shows it: the bean, the
pour into the grinder, the filled basket, the extraction, the finished cup.
Stage timings live in `src/lib/stages.ts`, measured against the footage. The
story is 340vh of scroll, which works out at roughly 205px of scrolling per
second of film — change `STORY_VH` in `ScrubStory.tsx` to pace it differently.

**Brand** — the bean mark and the "Fresh" roman / "Brew" italic lockup live in
`src/components/brand/Logo.tsx`, and the favicon, SVG icon and Apple touch icon
are all generated from that one path. See [CREDITS.md](CREDITS.md).

**The header** — never paints a background. It floats over the page and only
swaps its ink, reading light over any section marked `data-dark-media` and dark
over paper, so it never cuts a bar across the footage.

**Motion** — GSAP ScrollTrigger drives the story, Lenis smooths the scroll, and
both run off GSAP's single ticker so they never disagree about the current
frame. Plus scroll reveals, page transitions, and a desktop-only custom
cursor. All of it collapses under `prefers-reduced-motion`.

## Layout

```text
src/
├── app/                    routes, metadata, sitemap, robots, OG image
├── components/
│   ├── story/              the scroll film — scrubbed, stacked, shared copy
│   ├── navigation/  coffee/  menu/  cart/  checkout/
│   └── gallery/  location/  footer/  ui/
├── hooks/                  reduced motion, device profile, in-view, hydration
└── lib/                    products, cart store, constants, utils
```

Products live in `src/lib/products.ts` and drive every page that shows them.
Café details live in `src/lib/constants.ts`.

## How the story degrades

The film is 7.4MB, and seeking it every frame is unreliable on mobile Safari.
`useDeviceProfile` measures the device once per load and picks one of three
paths:

| Condition | What renders |
| --- | --- |
| Data saver, a 2G/3G link, ≤2 cores or ≤1 GB RAM | Poster frame only, copy stacked |
| Touch or narrow viewport | Film loops as an ambient backdrop, copy stacked |
| Everything else | Full scroll-scrubbed story |

`prefers-reduced-motion` drops to the poster regardless. The poster is always
the `priority` image and the film never blocks it, so the largest paint is a
54KB still: measured at 184ms, with no layout shift.

Every stage caption is also emitted as a plain ordered list for screen readers,
so the story is never trapped behind the animation.

## Before launch

- Replace the photography. Eight images are CC BY and need attribution — see
  [CREDITS.md](CREDITS.md).
- Re-encode `public/videos/website_video1.mp4`. At 970x720 it upscales on large
  displays, and 7.4MB is the single heaviest asset on the site. A shorter GOP
  would also make scrubbing smoother. See the note in CREDITS.
- Set the real address, phone and coordinates in `src/lib/constants.ts`, and the
  production domain in `BRAND.url` so canonical URLs and OG tags resolve.
- Point checkout at a real payment or order system.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
GSAP + ScrollTrigger · Lenis · Zustand
