# 🛠️ Action Plan: organic Indexation Recovery
**Target Site:** `whoisalfaz.me`  
**Execution Horizon:** 15–30 Days

Below is the prioritized roadmap to fix the indexation issues found during our site-wide Google Search Console audit. 

---

## 🚨 Phase 1: Critical Fixes (Execute in 24 Hours)

### Action 1.1: Request Re-Crawling for Live Category Pages
*   **The Problem:** Google is ignoring `/services/`, `/blog/`, and `/portfolio/` because its last crawl in January 2026 returned `404 Not Found`. However, these pages are live and fully active today!
*   **The Fix:** 
    1. Log into your **[Google Search Console Dashboard](https://search.google.com/search-console)**.
    2. At the top search bar, paste: `https://whoisalfaz.me/services/` and press Enter.
    3. Click **Request Indexing**.
    4. Repeat this exact process for:
       - `https://whoisalfaz.me/blog/`
       - `https://whoisalfaz.me/portfolio/`
*   **Expected Impact:** Google will re-crawl these pages within 2-5 days and immediately add them to search results. This will unlock visibility for all your secondary blog posts and core services!

---

## ⚡ Phase 2: High Priority (Execute in 7 Days)

### Action 2.1: Elevate Internal Linking for "Discovered" Pages
*   **The Problem:** 14 high-value pages (such as your core service subpages and `/about/` page) are "Discovered - currently not indexed." Google knows they exist but is not crawling them due to a low internal crawl priority.
*   **The Fix:**
    - Add direct links to your service pages (`/services/n8n-automation/`, `/services/growth-consulting/`, `/services/custom-full-stack/`) in your site's global **navigation bar** or **footer**.
    - Insert natural contextual links from your top-performing, high-traffic blog posts (like the *ManyChat Pricing* post) to these service and case study pages.
*   **Expected Impact:** Direct pathways from highly authoritative pages will force Googlebot to crawl and index these target pages immediately.

---

## 📈 Phase 3: Medium Priority (Execute in 14 Days)

### Action 3.1: Quality Upgrades for "Crawled - Currently Not Indexed" Pages
*   **The Problem:** 25 blog posts and guides have been crawled, but Google decided they do not meet the quality threshold for indexing.
*   **The Fix:**
    - **Add Named Entities:** Ensure titles contain at least two validated Wikipedia-level topics (Entities), repeat the title in the H1, and add a third entity in the text.
    - **Avoid Keyword Stuffing:** Check that no keywords are stuffed in your titles or headings.
    - **Direct-Answer Subheadings:** Format all `H2` subheadings as clear questions, and directly answer them in the very first sentence immediately below.
    - **Rich Schema:** Ensure every blog post has `BlogPosting` JSON-LD schema dynamically injected (this schema type has the highest correlation with fast indexing).

---

## 🧩 Phase 4: Maintenance (Execute in 30 Days)

### Action 4.1: Clean Up Duplicate Canonicalization on `/audit/`
*   **The Problem:** `/audit/` is being ignored because GSC flags it as a duplicate of the homepage.
*   **The Fix:**
    - If `/audit/` is meant to be a unique page, rewrite its text so it has at least **350+ words of completely unique copy** not found on the homepage.
    - Double check that the `<link rel="canonical" href="https://whoisalfaz.me/audit/" />` is set correctly in your Next.js project.
