# Reply — Day 6 Main-Site Posts Published — 2026-11-16

To: Mikey  
From: Draken  
Status: **COMPLETED & VERIFIED 200 OK LIVE ON PRODUCTION**  
Sanity Dataset: `production` (`gfd4n1nu`)  
Production Commits: `7c300b4` + `69aa36e`

---

## 1. Published Post 1 (L, Stripe)

- **Title:** What Stripe actually takes from a $100 payment
- **SEO Title:** What Stripe actually takes from a $100 payment | Alfaz (54 chars $\le 58$)
- **Slug:** `what-stripe-takes-from-100-payment`
- **Live URL:** https://whoisalfaz.me/blog/what-stripe-takes-from-100-payment/
- **HTTP Status:** `200 OK` (Static pre-render verified, 126 KB)
- **Description:** A $100 sale on Stripe puts $96.80 in your account — and an international card takes another $1.50 on top. The exact math, and the three fees that catch people out.
- **SEO Description:** A $100 Stripe sale puts $96.80 in your account. The exact math on card processing, international surcharges, and the three fees that catch people out.
- **Sanity ID:** `post-what-stripe-takes-from-100-payment`
- **Categories:** Tool Comparisons (`4BipTcqouNrKxIUq92q9HG`), Architecture Teardowns (`pJmrsKLAWC800vFHegUEU1`)
- **Affiliates:** `[]`
- **Custom Schema:** Injected FAQPage schema with 3 core mathematical questions for AEO/GEO snippet capture.

---

## 2. Published Post 2 (K, n8n Cloud vs Self-Hosted)

- **Title:** n8n Cloud vs self-hosted: where your workflows should live
- **SEO Title:** n8n Cloud vs self-hosted: where your workflows should live (58 chars $\le 58$)
- **Slug:** `n8n-cloud-vs-self-hosted`
- **Live URL:** https://whoisalfaz.me/blog/n8n-cloud-vs-self-hosted/
- **HTTP Status:** `200 OK` (Static pre-render verified, 186 KB)
- **Description:** Cloud costs $20 a month and caps you at 2,500 runs. Self-hosted costs about $5 a month and caps you at nothing — except your own time. Count your runs, then pick a side.
- **SEO Description:** n8n Cloud costs $20/mo for 2,500 runs; self-hosted costs ~$5/mo with no cap except your time. The execution math and trade-offs to choose the right setup.
- **Sanity ID:** `post-n8n-cloud-vs-self-hosted`
- **Categories:** n8n Automation (`5qLcvm16UXS9Z7siVOpgIN`), Tool Comparisons (`4BipTcqouNrKxIUq92q9HG`), Automation Tools (`Al3E26R37amzsHAqPF1yCU`)
- **Affiliates:** `['n8n', 'vultr']`
- **Custom Schema:** Injected FAQPage schema with 3 pricing/execution threshold questions for AEO/GEO snippet capture.

---

## 3. SEO, Edge Cache & Indexing Actions Completed

1. **Static Pre-Rendering:** Built and deployed to Vercel production edge. Both URLs render clean semantic HTML with zero client-side 404 hydration issues.
2. **On-Demand Cache Revalidation:** Successfully executed via `/api/revalidate` for:
   - `/blog/what-stripe-takes-from-100-payment/`
   - `/blog/n8n-cloud-vs-self-hosted/`
   - `/blog/` (Blog index)
   - `/` (Homepage)
3. **Bing & IndexNow:** Revalidation endpoint automatically submitted all paths to IndexNow API.
4. **Google Indexing API:** Pushed both live URLs via Google Indexing API (`https://indexing.googleapis.com/v3/urlNotifications:publish`):
   - `https://whoisalfaz.me/blog/what-stripe-takes-from-100-payment` -> `HTTP 200 OK`
   - `https://whoisalfaz.me/blog/n8n-cloud-vs-self-hosted` -> `HTTP 200 OK`
5. **Local Inventory Ledger:** `data/existing_sanity_posts.json` updated and synced (105 total posts).

Both main-site originals are live. You can now publish your parasite versions with canonical tags pointing back to these URLs.
