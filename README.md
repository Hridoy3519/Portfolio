# Portfolio — The Hridoy Line

My personal portfolio, built as a **rail journey** rather than a conventional résumé page.
Visitors arrive at a split-flap departure board, board the train, and travel through the
stations that make up my career so far.

**Live site:** _not deployed yet_ · [hridoychowdhury.com](https://hridoychowdhury.com) once live

## The route

| Section | What it covers |
| --- | --- |
| Departures | Split-flap board, headline numbers, the hero train |
| Your driver | Short intro, passenger details, languages |
| Branch line | The years before university, and the 2019 fork |
| Stops 01–05 | Leading University → Inverse.AI → University of Helsinki → IntexResearch Lab → GE HealthCare |
| Engine room | Technical skills |
| Observation car | Competitive programming, publication, certifications |
| Next stops | Proposed extensions — what I'm building next |
| Final stop | Contact, shaped like a boarding pass |

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with CSS-variable design tokens
- **Space Grotesk** / **Inter** / **JetBrains Mono** via `next/font`
- Hand-drawn SVG scenery and animation — no animation library
- Dark-first, with a light theme and a no-flash theme script

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
npx tsc --noEmit  # type-check
```

## Editing the content

All copy lives in one file — [`src/content/site.ts`](src/content/site.ts). The components read
from it, so adding a station, a skill group or a new stop propagates to the nav, the rail map
and the departure board automatically. No component changes needed.

## Accessibility & motion

Every animation — the drifting scenery, spinning wheels, split-flap, reveal-on-scroll, the
count-up figures — is disabled under `prefers-reduced-motion: reduce`. Decorative SVG is hidden
from assistive tech, and the page ships `Person` structured data for search engines.

## License

Content and design © Md Hridoy Chowdhury. Code is free to learn from.
