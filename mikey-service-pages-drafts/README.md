# Service commercial pages — drafts only, branch review

Status: Drafts for review by Alfaz Mahmud Rizve and his local agent. Not published. No PR opened. Do not merge without Alfaz's review.

Branch: mikey/service-commercial-pages
Base: main at 9cbb93cd58cec37ed07e8c8eff5b3355c1ba070a
Date prepared: 2026-11-04

## Files in this folder

- n8n-automation.md — Custom Workflow Automation with n8n, starting at $750
- seo-organic-growth.md — SEO and Organic Growth, starting at $1,500
- custom-full-stack.md — Custom Full-Stack Applications, starting at $2,500
- headless-architecture.md — Headless CMS Infrastructure, starting at $1,500
- growth-consulting.md — Growth Consulting, $200/hr
- websites-nextjs.md — New High-Speed Next.js Websites page, price to confirm

## Price source, verified 2026-11-04

Prices above are taken from the existing /services/ price list, in
app/services/page.js, and confirmed in lib/serviceData.js:

- n8n-automation: $750
- headless-architecture: $1,500
- growth-consulting: $200/hr (shown as $200/h on /services/)
- seo-organic-growth: $1,500
- custom-full-stack: $2,500

These are shown as starting prices, matching the site's "Starting From" wording.
The $1,500-$5,000/mo range in the /services/ FAQ is general agency pricing
information, not a stated price for Alfaz's services, and was not used as a price here.

No price was found for the new websites-nextjs page in the /services/ price
list or in lib/serviceData.js, so no price was added to that draft.

## Timeline

Timeline is deferred, per Alfaz on 2026-11-04. Do not copy timelines from
other services onto these pages. Timeline TODOs remain in the drafts.

## Quality checks done 2026-11-04

- SEO: title, who it is for, problem, deliverables, 4-step process, buyer requirements, FAQ, and CTA to /contact/ in each draft.
- AEO: direct problem and answer at the top, FAQ with direct answers, no ranking or traffic guarantees.
- GEO: entities and facts are taken from the live service pages; VibeViso and FlowerShop work is labelled as SEO work, not site building; the 40,000+ impressions and 679 pages figures are labelled self-published, not independently verified.
- Banned words check: no matches for comprehensive, innovative, transformative, revolutionary, leverage, utilize, robust, seamless, holistic, landscape, crucial, pivotal.
- No invented prices, timelines, testimonials, client names, or results.

## Important for the local agent

These are markdown drafts, not publishable pages in this repo's current form.
The existing service detail pages are code-driven from lib/serviceData.js and
app/services/[slug]/page.js, not from markdown drafts. Converting these drafts
into live pages will need a code change in that service data, or a new route
for websites-nextjs, which has no entry in lib/serviceData.js yet.

Do not touch protected files: lib/audit.ts, lib/audit-email.ts, pricing/plan
IDs or checkout links in data/vaultWorkflows.ts, or root proxy.ts.
