# K & K Associates

Architecture and planning portfolio with a zoomable image collection, project stories, blueprint page transitions, masked typography, scroll reveals, responsive layouts and a reduced-motion control.

## Deploy on Vercel

1. Import **Rushihapse/k-k** into Vercel.
2. Framework: **Next.js**. Root Directory: **./** (repository root).
3. Build command: `npm run build`. Install command: `npm ci`. Output directory: leave the Next.js default.
4. Use Node.js **22.x**. Deploy the **main** branch.
5. Optional: set `SITE_URL` to your final HTTPS domain and redeploy. Without it, metadata uses Vercel's production domain.

`vercel.json` contains the framework and build configuration. The project uses native Next.js on Vercel; the older Cloudflare preview tooling remains available only through `dev:cloudflare` and `build:cloudflare`.

## Enquiries

The form validates required fields, consent, origin, payload size and a honeypot. To enable actual delivery, set these server-only variables in Vercel:

- `INQUIRY_WEBHOOK_URL`: trusted HTTPS endpoint that receives and stores or emails project enquiries.
- `INQUIRY_WEBHOOK_TOKEN`: optional bearer token for that endpoint.

The endpoint receives JSON including name, email, phone, project details, creation time and a reference ID. It must return a successful HTTP status only after accepting the enquiry. Configure durable spam/rate protection at the receiving endpoint before opening it to visitors. No enquiry is reported as sent when delivery is unconfigured or fails. No enquiries are stored in the Vercel function filesystem.

## Local development

Install Node.js 22, run `npm ci`, then `npm run dev`. Open http://localhost:3000.

For Windows paths containing an ampersand, use PowerShell directly:

```powershell
node node_modules/next/dist/bin/next dev
```

Production check: `node node_modules/next/dist/bin/next build` then `node node_modules/next/dist/bin/next start`.

## Content status

The project collection contains clearly labelled illustrative concepts and AI imagery. They are not represented as completed commissions. Verified project details and office contacts have not been supplied. Search indexing remains disabled until those details are approved; enable indexing in `app/layout.tsx` when ready.

Never commit `.env` files, webhook tokens, Vercel credentials, local database state or generated build output.
