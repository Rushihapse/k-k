# K & K Associates website

A multi-page architecture website using React, TypeScript, Next-compatible Vinext, Tailwind, and Cloudflare Workers. Source is in app/; editable portfolio and scope content are in app/content.ts. Cloudflare D1 stores preview enquiries. The site starts owner-private.

## Run locally

Use Node 22.13 or later. On Windows in this folder, the ampersand in K&K-Associates can confuse npm's default cmd shell. Set npm_config_script_shell to C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe for installation, and run framework commands directly with Node.

1. Install locked dependencies using the Sites install-dependencies.mjs helper. If npm shim resolution fails, set npm_execpath to your actual npm-cli.js and run node scripts/install-ci.mjs.
2. node node_modules/drizzle-kit/bin.cjs generate
3. Build with the Sites build-site.mjs helper.
4. Apply generated SQL locally using the Wrangler D1 command described in the starter documentation. Local and hosted databases are separate.
5. node scripts/run-framework.mjs dev

## Publication

The existing .openai/hosting.json contains the registered Site identity. Preserve it. Package and push with the Sites site-workflow.mjs helper, using its returned commit SHA and archive when calling save_version_and_deploy_private. Do not place credentials in files. Sites applies the committed D1 migrations during deployment. Do not make this review site public without confirmed production content.

## Pages and interactions

Home, Practice, Expertise, Projects, four individual study pages, 3D Visualisations, Process, Insights and Contact. Portfolio filtering; accessible range comparison with matching illustrative model geometry; drawing categories; full-screen sheet modal with zoom and keyboard handling; conceptual floor separation; conceptual layout views; responsive navigation; loading, error and not-found pages. No real GLB, render pair or movie was supplied, so there is no simulated orbit viewer or fake film playback.

## Enquiries

POST /api/inquiries validates required fields and values, origin, body size and consent. It uses a honeypot, minimum completion time, and a per-network hourly submission cap. D1 queries are parameterised. A salted daily IP hash supports the cap; raw IPs are not saved. The form explicitly describes preview storage and the absence of email delivery. No public read endpoint is provided. Review records using owner-controlled Cloudflare/Sites database administration; do not expose records through an unauthenticated route. Configure a verified recipient and mail provider before production. Set a retention policy and delete preview test records before launch. File uploads are intentionally unavailable until secure storage, file validation, malware scanning and retention are configured.

## Content and media

All portfolio studies are labelled illustrative. Unsplash image URLs are editorial references, not firm project work. Confirm image reuse rights and replace with commissioned assets for production. Images fail over to a local architectural placeholder. Fonts use Google Fonts with Georgia/sans-serif fallbacks. Production may self-host licensed font files. The SVG library is conceptual and not to scale. Scale, approval, engineering and dimensional claims are omitted.

Noindex and robots disallow are intentional for the private review. Once verified production content and the final domain are ready, update metadataBase, canonical URLs, sitemap URLs, Organization data, robots metadata and robots.txt together. Do not add reviews, awards, professional registrations or contact details without verification.

## Missing for production release

- Approved firm description, practice history, team biographies and qualifications.
- Confirmed services and deliverables, including visualisation provision and any external specialist relationship.
- Verified phone, email, exact office address, business hours and enquiry recipient.
- Real project names, categories, locations, stages, years, areas, clients and credits with publication permission.
- Firm-owned or licensed architectural photographs and photorealistic renders.
- Authorised plans, elevations, sections, technical boards and matching drawing-to-render pairs.
- GLB/glTF models with consistent geometry, licensing, texture compression and mobile asset budgets.
- Approved architectural films, MP4/WebM files, posters, caption tracks and descriptions.
- Approved master plans and matching layout/massing/aerial views; no sanction status should be inferred.
- Brand logo assets, domain, privacy policy, data retention rules, email delivery credentials and production anti-spam configuration.

## Structured project media

Extend a project entry with verified optional fields: year, area, location, status, gallery, drawings (title/type/src/scale only if verified), model (GLB URL), renders, videos (src/poster/captions), related services and credits. Keep the conceptual library distinct from verified commissioned work. The reusable MediaGallery component supports supplied images and videos with native controls; connect those fields only after authorisation.
