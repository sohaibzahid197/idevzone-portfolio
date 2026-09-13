# Developer Portfolio

Personal portfolio for **Sohaib Zahid** — Full Stack Web & Mobile Developer, founder of iDevZone.
Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

## Features

- **Single-page layout** — nine sections with smooth scroll navigation
- **Motion-rich** — GSAP scroll reveals, Framer Motion transitions, Lenis smooth scrolling, an interactive particle field
- **Accessible by default** — skip link, live regions, honours `prefers-reduced-motion` throughout
- **SEO-ready** — generated Open Graph image, JSON-LD Person schema, sitemap and robots routes
- **Working contact form** — validated, rate-limited API route that delivers via Resend
- **Fully responsive** — mobile-first, with touch-reachable controls

## Sections

Hero · Tech marquee · Projects · Skills · About · Experience · Achievements · Education · Contact

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config`) |
| Animation | GSAP + ScrollTrigger, Framer Motion, Lenis |
| Particles | tsparticles (desktop only) |
| Icons | Lucide React |
| Email | Resend REST API (no SDK dependency) |
| Deployment | Vercel-ready |

## Getting Started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

The contact form needs these to deliver mail. Copy `.env.example` to `.env.local` and fill it in.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key. Without it the form returns a clear 503 and points visitors at the email address instead of failing silently. |
| `CONTACT_TO_EMAIL` | no | Destination address. Defaults to the address in `src/lib/site-config.ts`. |
| `CONTACT_FROM_EMAIL` | no | Verified sender. Defaults to Resend's onboarding sender. |

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # Validated, rate-limited contact endpoint
│   ├── globals.css            # Theme tokens + keyframes (Tailwind v4 @theme)
│   ├── layout.tsx             # Metadata, JSON-LD, skip link
│   ├── opengraph-image.tsx    # Generated 1200x630 social card
│   ├── robots.ts
│   ├── sitemap.ts
│   └── page.tsx
├── components/
│   ├── sections/              # The nine page sections
│   └── *.tsx                  # Navbar, Footer, motion primitives
├── hooks/
│   └── use-reduced-motion.ts  # SSR-safe motion preference
├── lib/
│   ├── data.ts                # Projects + skills
│   └── site-config.ts         # Single source of truth for identity
└── types/
```

## Customising

Almost everything lives in two files:

- **`src/lib/site-config.ts`** — name, role, email, phone, location, social links, headline stats, tagline
- **`src/lib/data.ts`** — projects and skills

Experience, achievements and education are currently inline in their own section components.

### Before deploying

- [ ] Point `siteConfig.url` at the real domain — the current value does not resolve, and canonical URLs, OG tags and the sitemap all derive from it
- [ ] Replace the four Unsplash placeholder images in `data.ts` with real project screenshots
- [ ] Add `liveUrl` / `githubUrl` per project once real URLs exist (cards hide the buttons while absent)
- [ ] Set `RESEND_API_KEY` so the contact form can deliver

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## License

MIT
