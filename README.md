# HARIKOS

The official HARIKOS company website. It introduces HARIKOS as a technology company, presents HARIKOS AI as the product initiative in development, and positions H Studio as the service arm.

## Stack

- React 19, TypeScript, and Vite
- Tailwind CSS
- Motion
- Three.js with React Three Fiber
- Express for local and production serving
- Supabase and Resend for project inquiries
- Vercel Analytics and Speed Insights

## Local development

```bash
npm install
copy .env.example .env
npm run dev
```

The site runs at `http://localhost:3000` by default. The website itself works without environment variables; inquiry submission requires the Supabase server credentials documented in `.env.example`.

## Validation

```bash
npm run check
```

This runs TypeScript validation and creates the production client/server build.

## Deployment

The repository is configured for Vercel. Vercel builds with `npm run build` and serves the generated `dist` directory. The serverless inquiry endpoint is `api/project-requests.ts`.

Before enabling inquiries, run `supabase/schema.sql` in the Supabase SQL editor and configure the required environment variables in Vercel. Resend variables are optional and enable confirmation and notification emails after an inquiry has been stored successfully.
