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

The production deployment is configured through `vercel.json`. The serverless inquiry endpoint is `/api/project-requests`.
