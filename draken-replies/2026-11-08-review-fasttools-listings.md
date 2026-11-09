# Reply: Draken review of live fasttools.me listings — 2026-11-08

From: Draken  
To: Mikey  
Date: 2026-11-09  
Status: answered  
Request file: mikey-requests/2026-11-08-review-fasttools-listings.md  

## Tool used
Automated HTTP parsing via Python `urllib` / `BeautifulSoup4` and official WordPress REST API (`https://public-api.wordpress.com/wp/v2/sites/alfazreviews.wordpress.com/posts`).

## Result

All 4 live listings were independently crawled and verified live. Total: **10 dofollow links confirmed**.

### 1. Viberank — FastTools
- **URL:** `https://viberank.dev/apps/FastTools`
- **Status:** HTTP 200 OK
- **Outbound Link:** `https://fasttools.me/`
- **Anchor:** "Visit Website"
- **Rel:** `rel="noopener noreferrer"` (dofollow; zero `nofollow` directives).
- **Metadata:** Category: Developer Tools, Tags: "developer tools", "free tools".

### 2. DevTo — Cron Expressions Article
- **URL:** `https://dev.to/alfazreviews/cron-expressions-finally-explained-copy-paste-schedules-that-actually-run-327`
- **Status:** HTTP 200 OK
- **Title:** "Cron Expressions, Finally Explained: Copy-Paste Schedules That Actually Run"
- **Dofollow Links (3):**
  1. `https://fasttools.me/crontab-generator` (Anchor: "free crontab generator", `rel="noopener noreferrer"`)
  2. `https://fasttools.me/crontab-generator/every-5-minutes` (Anchor: "every 5 minutes", `rel="noopener noreferrer"`)
  3. `https://fasttools.me/freelance-rate-calculator` (Anchor: "freelance rate calculator", `rel="noopener noreferrer"`)

### 3. Blogger — Freelance Rate Article
- **URL:** `https://alfazreviews.blogspot.com/2026/11/what-should-you-charge-how-freelancers.html`
- **Status:** HTTP 200 OK
- **Title:** "What Should You Charge? How Freelancers Actually Set a Rate That Pays"
- **Dofollow Links (3):**
  1. `https://fasttools.me/freelance-rate-calculator` (Anchor: "freelance rate calculator", no `rel` = dofollow)
  2. `https://fasttools.me/freelance-rate-calculator/billable-hours` (Anchor: "billable hours", no `rel` = dofollow)
  3. `https://fasttools.me/freelance-rate-calculator/take-home-pay` (Anchor: "take-home pay", no `rel` = dofollow)

### 4. WordPress.com — Stripe Fees Article
- **URL:** `https://alfazreviews.wordpress.com/2026/11/08/what-stripe-actually-takes-from-a-100-payment/`
- **Status:** HTTP 200 OK (verified via public REST API endpoint `post?id=11`)
- **Title:** "What Stripe Actually Takes From a $100 Payment"
- **Dofollow Links (3 intentional anchors):**
  1. `https://fasttools.me/stripe-fee-calculator` (Anchor: "Stripe fee calculator", no `rel` = dofollow)
  2. `https://fasttools.me/stripe-fee-calculator/reverse` (Anchor: "reverse calculator", no `rel` = dofollow)
  3. `https://fasttools.me/stripe-fee-calculator/international` (Anchor: "international", no `rel` = dofollow)
- **Call on WordPress Duplicate Links:**
  - WordPress auto-linked the bare parenthetical URLs directly following each anchor as `rel="nofollow"`.
  - **Draken's Recommendation:** **Edit them out.** Having an immediate `rel="nofollow"` duplicate of the exact target URL right after the keyword-rich dofollow anchor can dilute link equity and cause anchor text ambiguity in Google's link graph. In the WordPress block editor, simply unlink the parenthetical text so only the anchor text carries the link.

## Run details
- Run at: 2026-11-09 10:38 Asia/Dhaka
- Source: Live HTTP crawl & WP REST API

## Limits
- Automattic edge gateway serves 403 on standard automated user-agents for direct HTML scrape, but full rendered post DOM was audited via official WordPress.com v2 REST API.
- Substack remains blocked as previously noted.
