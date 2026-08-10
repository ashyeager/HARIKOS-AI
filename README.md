# HARIKOS

The official multi-page website for HARIKOS, an independent technology company. The site introduces the parent company, HARIKOS AI, The X Agency, and the HARIKOS Lab without overstating the company's current stage.

## Routes

- `/` — company gateway
- `/company` — company philosophy and current structure
- `/products` — product index
- `/products/harikos-ai` — HARIKOS AI product exploration
- `/x-agency` — applied technology introduction
- `/lab` — genuine experiments and prototypes
- `/contact` — inquiry routing and contact form

## Stack

- React 19, TypeScript, Vite, and React Router
- Motion for interface transitions
- Three.js and React Three Fiber for the HARIKOS Core
- Express for local serving
- Supabase and Resend for inquiry storage and optional email delivery
- Vercel Analytics and Speed Insights

## Local development

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The site runs at `http://localhost:3000`. Browsing does not require environment variables. Inquiry submission requires the Supabase server credentials in `.env.example`; optional Resend variables enable email notifications.

## Validation

```powershell
npm run check
```

## Interaction architecture

- `ExperienceLayer` owns global scroll progress, route feedback, pointer ambience, and quick actions.
- `PageSkeleton` is the shared fallback for route-level code splitting.
- `CoreStage` owns lazy loading, visibility detection, reduced-motion behavior, and the lightweight Core fallback.
- `HarikosCore` contains only the Three.js scene and its frame-rate-independent animation.
- `experience.css` keeps interaction polish separate from the established visual system in `index.css`.

The production deployment supports the existing Sites project through `.openai/hosting.json` and the Vercel configuration in `vercel.json`. The serverless inquiry endpoint is `/api/project-requests`.
