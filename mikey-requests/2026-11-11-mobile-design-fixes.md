# Request: Mobile Design Fixes — Homepage (2026-11-11)

From: Mikey. To: Draken. Date: 2026-11-11.
Reply to: draken-replies/2026-11-11-mobile-design-fixes.md
Status: open. Sheriff approved sending this (2026-11-11, "yes" to Mikey's question).

This is a review/fix request only. Nothing is merged, published, or deployed from this request — Alfaz decides.

## Context

The redesigned homepage is live on main (8958688) and Sheriff verified QA himself. Mikey checked mobile design with his own screenshots at 390px and 360px (full-page captures, read directly), plus a PageSpeed mobile run (Moto G Power, Slow 4G).

Verdict: the mobile design is NOT broken — no horizontal overflow, no cut-off text, no overlaps, CLS 0, hero/CTAs/calculator/audit form/About/FAQ all render cleanly. BUT it is not properly mobile-designed: several sections keep their desktop multi-column layouts squeezed onto the phone, so it reads as a desktop page shrunk to fit, not a mobile-first design.

Sheriff's direction: this is a high-ticket agency site, so design is the priority over speed. This request is design-only. (For the record, mobile Performance is 62 and LCP 6.1s — unused JS 336 KiB, render-blocking CSS — but that is NOT the ask here. Do not prioritise speed work over these design fixes.)

## Fixes requested

1. **Navbar — hamburger menu on mobile.** Currently at 390px AND 360px the navbar shows all five links (Services, Case Studies, Blog, Lab, Vault) plus search icon, share icon, "FREE AUDIT" and "Work With Me" buttons in a single row, at roughly 10px text, with tight tap targets. Expected: hamburger menu on mobile widths, full nav on desktop only.

2. **Recent Insights (blog cards) — stack to one column on mobile.** Currently three-across at 390px and 360px, each card about 120px wide with body text around 9–10px. Nothing is cut off, but it is not readable as a mobile layout. Expected: one card per row on mobile, three-across on desktop.

3. **"What happens in the first 60 seconds of a lead arriving?" timeline — stack to one column on mobile.** Currently four steps across in one row on mobile, text very small. Expected: stacked vertically on mobile.

4. **"How we work with you" process steps — stack to one column on mobile.** Currently four steps across in one row on mobile. Expected: stacked vertically on mobile.

5. **Fixed elements — check on a real phone.** The fixed "AUDIO ON" pill (bottom left) and chat button (bottom right) may sit over the bottom edge of the "EXPLORE THREE SOLUTIONS" button when that CTA is at the bottom of the viewport. Text remained readable in the captures, so this is a check, not a confirmed break. Please verify on a real phone and adjust spacing/z-position if it overlaps.

## What to reply with

- What you changed (files, breakpoints used), and on which branch.
- A mobile screenshot or a note of what you checked at 390px (and 360px if you checked it).
- Anything you deliberately did NOT change and why.
- Whether the fixed-elements check (item 5) found an overlap or not.

## Evidence notes (Mikey's checks, for reference)

- Full-page mobile captures at 390px (4206px tall) and 360px (3883px tall), read section by section: hero, services, bottlenecks, Kitchen OS case study, 60-second timeline, ROI calculator, process, audit form, insights, CTA/newsletter, About, technology stack, FAQ.
- PageSpeed mobile: Performance 62, Accessibility 96, Best Practices 100, SEO 100; FCP 2.4s, LCP 6.1s, TBT 380ms, CLS 0, page 913 KiB. Viewport audit passed; no content-wider-than-viewport issue.
- LCP element is the hero paragraph; TTFB 10ms with 2,650ms element render delay. (Speed context only — not this request.)
