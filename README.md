# Harikos AI - Landing Page

A premium, production-ready landing page for Harikos AI—an AI Automation Studio building custom AI Agents and Workflow Automation systems for modern businesses.

## Tech Stack

- Frontend: React, Vite
- Styling: Tailwind CSS
- 3D visuals: Three.js, React Three Fiber
- Backend: Vercel Serverless API routes
- Authentication: Supabase Auth (Google OAuth)

## Local Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Create a local environment file
   ```bash
   cp .env.example .env
   ```
3. Start the development server
   ```bash
   npm run dev
   ```

## Deployment

This project is configured for Vercel.

- Build command: npm run build
- Output directory: dist
- API routes are served from the api folder

### Supabase authentication

1. Create a Supabase project and enable **Google** under Authentication → Providers.
2. Add the Google OAuth client ID and secret in Supabase (never in this repository).
3. In Authentication → URL Configuration, set the Site URL to your Vercel production URL and add these Redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:5173/auth/callback` (if using `vite` directly)
   - `https://YOUR-VERCEL-DOMAIN/auth/callback`
4. Add the following variables in Vercel for Production, Preview, and Development as appropriate:

   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_URL` (server-only; used by privileged API routes)
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only; never prefix this with `VITE_`)

The browser only receives the two `VITE_` variables. Google OAuth sessions are persisted and refreshed by Supabase.

For full contact-form functionality, wire the form handlers to a real email provider or backend service.
