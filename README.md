# Grade X Commercial Solutions — Website

Next.js 16 website for **Grade X Commercial Solutions Pty Ltd** (Balga, WA): robotic kitchen exhaust cleaning, digital grease measurement, and commercial kitchen hygiene.

Built from the Grade X website brief: high-end 3D hero, all required pages, 21 services, CMS so Grade X can edit after handover, quote API, SEO, and Australian privacy/terms templates.

## Stack

- **Frontend:** Next.js App Router, Tailwind CSS 4, React Three Fiber (WebGL), GSAP + Lenis smooth scroll
- **Backend:** Next.js Route Handlers, JSON file CMS in `/data`, JWT admin session
- **3D approach:** Real-time WebGL scene of an exhaust duct cross-section with a camera/scan crawler — not a generic particle field. Lazy-loaded, DPR capped, Adaptive DPR, static CSS fallback if `prefers-reduced-motion` or Save-Data is on. Mobile still shows the scene (lower DPR), it is not hidden.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and change `AUTH_SECRET` and `ADMIN_PASSWORD` before any public deploy.

## CMS (no WordPress)

The brief asked for WordPress/Webflow so Grade X can edit without a developer. This project instead ships a **built-in admin CMS** on the same Next.js app — one codebase, one host, still editable after handover.

- URL: `/admin/login`
- Default login: `admin@gradex.com.au` / `GradeX2026!` (change immediately)
- Quote inbox: `/admin/quotes`
- Services, FAQs, testimonials, case studies, blog: `/admin/content`
- Notification email / GA id: `/admin/settings`

Content is stored as JSON in `/data`. Quote submissions land in `data/quotes.json`.

## Pages

Home, About, Technology, Services (21 + detail), Methodology (8 steps), Digital evidence, Compliance & WHS, Case studies, Service area, FAQ, Contact/quote, Blog/resources, Privacy, Terms.

## SEO

On-page titles/descriptions, canonicals, `sitemap.xml`, `robots.txt`, LocalBusiness JSON-LD (Perth / WA), clean URLs. Google Analytics ID can be stored in CMS settings and wired at launch. Google Business Profile should be linked to the live domain by Grade X after DNS is live.

## Hosting after launch

Vercel, or any Node host. Grade X can keep the CMS on the same deployment. Optional paid care: hosting + content edits + dependency updates (quote separately). Bug-fix window proposed: **30 days** after go-live.

## Performance notes

- 3D is client-only (`dynamic` import, `ssr: false`)
- Hero copy and CTA are HTML, not baked into the canvas
- Fog + modest geometry; no HDRI fetch
- Smooth scroll disabled when the user prefers reduced motion
