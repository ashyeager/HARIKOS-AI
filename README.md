# Harikos AI - Landing Page

A premium, production-ready landing page for Harikos AI—an AI Automation Studio building custom AI Agents and Workflow Automation systems for modern businesses.

## Tech Stack

- Frontend: React, Vite
- Styling: Tailwind CSS
- 3D visuals: Three.js, React Three Fiber
- Backend: Vercel Serverless API routes
- Authentication: Firebase

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

### Required environment variables

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

For full contact-form functionality, wire the form handlers to a real email provider or backend service.
