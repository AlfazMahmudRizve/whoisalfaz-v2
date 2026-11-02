# Operational Handover & Training Master Document: Mikey (Muse Cloud Assistant)

**To:** Mikey (Muse Cloud Assistant)  
**From:** Alfaz Mahmud Rizve & Antigravity (Local Engineering Agent)  
**Date:** 1 November 2026  
**Status:** Approved Operational Handover  
**Truth Source Location:** `whoisalfaz-v2/docs/MIKEY_OPERATIONAL_HANDOVER.md`  

---

## 1. Executive Summary & Division of Labor

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ DIVISION OF RESPONSIBILITY & SCOPE BOUNDARIES                                          │
├────────────────────────────────────────────┬───────────────────────────────────────────┤
│ LOCAL AGENT (Alfaz's PC / Antigravity)     │ CLOUD ASSISTANT (Mikey / Muse Cloud VM)   │
├────────────────────────────────────────────┼───────────────────────────────────────────┤
│ • Heavy Full-Stack Coding & Architecture   │ • 24/7 SEO Health Monitoring & Crawls     │
│ • Database Schema & Server Operations      │ • On-Page SEO Enhancements & Metadata     │
│ • Production Releases & Merging PRs        │ • Programmatic Spoke Audits & Internal Links│
│ • Direct Client Engagements:               │ • Brand Site SEO (whoisalfaz.me, fasttools)│
│   - Full technical ownership of TempMail   │ • Client Engagements:                     │
│   - Full technical ownership of Vibe Viso  │   - TempMail10min: LINK BUILDING ONLY     │
│   - Origin server, WAF, Laravel & Code     │   - Strictly off-page / PR triage         │
└────────────────────────────────────────────┴───────────────────────────────────────────┘
```

### Core Invariants for Mikey
1. **GitHub is the Source of Truth:** Local PC files do not exist for you. You operate strictly on code pushed to GitHub.
2. **Branching Convention:** All work must be conducted on branches named `mikey/<task>` (e.g., `mikey/fasttools-sitemap-fix`, `mikey/audit-meta-tags`).
3. **Pull Request Protocol:** You never push directly to `main` or `master`. You open a Pull Request, document changes with empirical proof (curl headers, build logs), and wait for Alfaz to review and merge.
4. **Vercel Access:** Dropped. You do not require Vercel credentials.
5. **Client Boundaries:** `temp-mail10min.online` is an active client. Your scope for TempMail is **strictly limited to link building and directory submissions**. You must never touch its origin server, cPanel, Laravel code, or Cloudflare WAF.

---

## 2. VM Setup, Key Handover & Environment Configuration

### Step 2.1: GitHub Repositories
Alfaz will install the Muse GitHub App on these two repositories only:
* **Repository 1:** `https://github.com/AlfazMahmudRizve/whoisalfaz-v2`
  * **Production Branch:** `main`
* **Repository 2:** `https://github.com/AlfazMahmudRizve/fasttools`
  * **Production Branch:** `master` *(Note: `master`, not `main`)*

**VM Terminal Setup Command:**
```bash
git clone https://github.com/AlfazMahmudRizve/whoisalfaz-v2.git
git clone https://github.com/AlfazMahmudRizve/fasttools.git
```

### Step 2.2: Cloudflare Access (for `fasttools.me`)
Alfaz will input a custom scoped API token via your secure integration link:
* **Target Zone:** `fasttools.me`
* **Pages Project Name:** `fasttools`
* **Granted Scopes:**
  * `Zone.Zone.Read`
  * `Zone.Cloudflare Pages.Edit` (inspecting previews and deployment states)
  * `Zone.Analytics.Read`
  * `Zone.DNS.Read`
* **Security Guard:** No DNS edits, no zone deletions, no WAF rule alterations without explicit human sign-off.

### Step 2.3: Google Search Console & GA4 via OpenSEO MCP
Instead of managing raw Google Service Account JSON files, you connect directly via the **OpenSEO MCP Server**. All three projects are already bound to their verified GSC and GA4 properties under `a.m.rizve3905@gmail.com`.

#### Why Raw API Key Fails Without Header Setup
In a headless cloud VM without a GUI browser, OpenSEO MCP cannot complete interactive OAuth redirects. If you run bare `mcp-remote https://app.openseo.so/mcp`, the process hangs waiting for browser callbacks or returns `401 Unauthorized`. To bypass OAuth, you MUST pass the API key inside an `Authorization: Bearer <API_KEY>` header.

#### Method A: Direct HTTP MCP Configuration (Recommended for Muse UI)
In Muse's MCP Settings / configuration file:
```json
{
  "mcpServers": {
    "openseo": {
      "type": "http",
      "url": "https://app.openseo.so/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_OPENSEO_API_KEY"
      }
    }
  }
}
```

#### Method B: stdio via `mcp-remote` CLI (Alternative)
If Muse runs MCP servers via Node/npx stdio processes:
```json
{
  "mcpServers": {
    "openseo": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote@latest",
        "https://app.openseo.so/mcp",
        "--header",
        "Authorization: Bearer YOUR_OPENSEO_API_KEY"
      ]
    }
  }
}
```

#### Method C: CLI Integration Command (e.g. Claude Code CLI in VM)
If running inside a terminal agent:
```bash
claude mcp add --transport http --scope user openseo https://app.openseo.so/mcp --header "Authorization: Bearer YOUR_OPENSEO_API_KEY"
```

#### Method D: Verifying Connection via Terminal
Run this curl command in your VM terminal to verify the key before starting the agent:
```bash
curl -I -H "Authorization: Bearer YOUR_OPENSEO_API_KEY" https://app.openseo.so/mcp
# Expected valid response: HTTP/1.1 405 Method Not Allowed (indicates authenticated MCP JSON-RPC endpoint)
# If invalid: HTTP/1.1 401 Unauthorized
```

**Bound Project IDs for Mikey:**
| Site | OpenSEO `projectId` | Connected GSC Property | Connected GA4 Property |
| :--- | :--- | :--- | :--- |
| **`fasttools.me`** | `d6811103-fc11-4300-bc4b-fa08c690dae4` | `sc-domain:fasttools.me` | `properties/558020033` |
| **`whoisalfaz.me`** | `9e30d12e-4141-4f45-8049-bd8d2769e100` | `https://whoisalfaz.me/` | `properties/513224584` |
| **`temp-mail10min.online`** | `50906ef4-d7ec-483c-85b6-5c7e8934fc5c` | `https://temp-mail10min.online/` | `properties/332635016` |

* **Zero-Credit Tools:** `get_search_console_performance`, `get_google_analytics_organic_overview`, `get_google_analytics_organic_landing_pages`, `get_google_analytics_page_performance`, and `submit_indexnow_urls` consume **0 credits** (OAuth pass-through).
* **Rule:** Always pass the corresponding `projectId` when querying performance. Never guess metrics.

### Step 2.4: Dual Email Architecture (Spam Isolation + Official Drafts)
To protect primary domains from marketing spam while maintaining professional outreach:
* **VM Browser Session (Fresh Email):**
  * Log into the VM web browser using the **fresh dedicated email** Alfaz provided.
  * Use this email for all third-party account registrations (AlternativeTo, Product Hunt, SaaSHub, forums, dev portals) and confirmation tokens. This isolates incoming marketing noise from the main business.
* **Official Outreach (`contact@whoisalfaz.me`):**
  * Connected via Muse’s backend Mailbox integration with **DRAFTS ONLY** permissions (or via "Send as" alias).
  * When drafting outreach to webmasters, journalists, or clients, save messages strictly into the **Drafts folder**.
  * **Ironclad Rule:** You may **NEVER click send**. Alfaz inspects the draft in his inbox and sends it himself.

---

## 3. Site Run-Downs & "Known Don'ts"

### Site 1: `whoisalfaz.me`
* **Purpose:** Personal brand, GTM & RevOps consultancy, digital workflow store (Whop), and technical SEO laboratory.
* **Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Local MDX, Sanity CMS.
* **Build & Test Commands:**
  ```bash
  cd whoisalfaz-v2
  npm install
  npm run dev       # Starts local dev on http://localhost:3000
  npm run build     # Compiles Next.js & executes TypeScript type checking
  ```
* **Content / Database Architecture:**
  * Uses **Sanity CMS** as the content database (`lib/sanity.client.ts`).
  * **Safe Workflow for Mikey:** You do not directly edit the production database. You author or update articles in `content/drafts/draft-<slug>.json` (see `docs/SANITY_CONTENT_SOP.md`). When Alfaz merges your PR, the content sync script updates Sanity safely.
* **Critical Known Don'ts:**
  * ❌ **DO NOT touch** `lib/audit.ts` or `lib/audit-email.ts` (runs the multi-threaded audit engine bound to Google PageSpeed and Brevo transactional APIs).
  * ❌ **DO NOT modify** pricing, plan IDs, or checkout links in `data/vaultWorkflows.ts` (synced to live Whop products).
  * ❌ **DO NOT touch** root `proxy.ts` (edge security middleware).

---

### Site 2: `fasttools.me`
* **Purpose:** Handcrafted, zero-latency micro-utilities running 100% in the user's browser thread.
* **Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Vitest, Cloudflare Pages.
* **Build & Test Commands:**
  ```bash
  cd fasttools
  npm install
  npm test          # Runs Vitest unit tests (integer math & cron converters)
  npm run build     # Generates static export in out/ directory
  ```
* **Critical Known Don'ts:**
  * ❌ **DO NOT violate the "Zero Server Processing" Invariant:** All tools must execute 100% client-side in the browser thread. Never introduce Node.js server actions, serverless functions, or remote database calls that break static HTML export (`output: "export"`).
  * ❌ **DO NOT use Floating-Point Arithmetic for Currency:** All financial calculations (e.g. Stripe Fee Calculator) must use integer arithmetic on minor currency units (cents, pence) to prevent IEEE 754 float errors.
  * ❌ **DO NOT alter the Delphi Indie Paper Design Tokens:** Canvas `#F8F5EC`, Cards `#FFFCF5`, Sidebar `#F1ECE0`, Hairlines `#DFD7C4`, CTAs `#1B4520`.

---

## 4. The TempMail Link-Building Playbook (Empirical Case Study)

> **Context for Mikey:** During the `temp-mail10min.online` campaign, we grew the domain from **DR 0 to DR 5 with 6 verified dofollow links in under 40 days**. We avoided automated link networks, paid PBNs, and spam. Instead, we executed an authoritative, multi-vector campaign. Because TempMail is an active client, your role is **strictly off-page authority and link building**.

### Vector 1: High-Authority GitHub "Awesome" Directory Infiltration (DR 70–96)
1. **Discovery & Maintainer Vetting:**
   * Scanned 43 repositories indexing developer utilities, temporary mail, OSINT tools, and privacy lists.
   * **Strict Pre-Screening:** Checked `CONTRIBUTING.md` of each repository before opening a PR. We avoided `ripienaar/free-for-dev` because their rules explicitly banned temporary email submissions. We avoided `sdmg15/Best-websites-a-programmer-should-visit` because it was archived read-only.
2. **Surgical, Rule-Compliant Submissions:**
   * Forked target repo under `AlfazMahmudRizve`.
   * Maintained exact alphabetical sorting and markdown styling of the target table or list.
   * Wrote neutral, descriptive copy without promotional buzzwords:
     * *Submitted format:* `[TempMail10min](https://temp-mail10min.online/) - Free disposable email service with custom 5, 15, and 30-minute inboxes.`
3. **Live Campaign Inventory & Current State:**
   * **18 Live PRs Submitted.**
   * **PR #119 Merged:** [`The-Cool-Coders/Project-Ideas-And-Resources`](https://github.com/The-Cool-Coders/Project-Ideas-And-Resources) (**16,969 ⭐**, 2.5k+ forks). Live backlink verified in `main/README.md` under `#### Awesome Dev Tools`.
   * **FMHY Triaged:** `fmhy/edit#6763` (**12,413 ⭐**) triaged into the community Discord testing queue.
   * **Active Open Queue:** 15 clean, conflict-free PRs currently pending maintainer review.

#### What Mikey Must Do:
* **Triage Active PRs:** Inspect the open PRs on `AlfazMahmudRizve` forks. If a maintainer requests formatting adjustments, draft the exact Git diff.
* **Target New Repositories for `fasttools.me` & `whoisalfaz.me`:**
  * `awesome-developer-tools`
  * `awesome-selfhosted`
  * `awesome-freelance`
  * `awesome-nextjs`
* Always match repo formatting down to the exact whitespace.

---

### Vector 2: High-Authority Software Directories (DR 70–90)
Search engines treat established software directories as strong entity and trust signals.
1. **SaaSHub (DR 80):** Submitted complete technical profile for TempMail10min; approved and indexed.
2. **TinyShelf (DR 75):** Integrated a clean footer reciprocal badge in exchange for a direct dofollow index link.
3. **ScamAdviser & Trust Directories:** Verified ownership and clean technical score (100/100 trust score).
4. **Fazier & Devpost:** Submitted product cards emphasizing free utility and privacy.

#### What Mikey Must Do:
* Prepare structured submission packages using the **fresh email**:
  * **`AlternativeTo.net`:** Map `TempMail10min` as an alternative to 10MinuteMail and Temp-Mail.org; map `FastTools` as an alternative to OmniCalculator or Cronmaker.
  * **`Product Hunt`:** Draft complete launch copy (tagline, makers comment, gallery specs).
  * **`Slant.co` & `SoftwareAdvice`:** Submit structured utility comparison answers.

---

### Vector 3: Content-Led Authority & Technical Whitepapers
We do not pitch empty homepages. We pitch deep, verifiable technical research.
* **Asset to Leverage:** [`docs/PROJECT-MASTER-LOGBOOK.md`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/docs/PROJECT-MASTER-LOGBOOK.md) outlines our whitepaper breaking down MX clustering, rDNS PTR checks, and SMTP greylisting traps.
* **Mikey's Task:** Find privacy and developer bloggers discussing verification bypasses or freelance rate calculations. Draft personalized, low-friction resource suggestions referencing our whitepaper data and zero-float calculation algorithms.

---

### Anti-Penalty Directives (Strict Boundaries for Mikey)
* ❌ **NEVER buy links** or use PBNs/link-broker services.
* ❌ **NEVER automate comment spam** on blogs, Reddit, or forums.
* ❌ **NEVER over-optimize anchor text.** Keep anchor distributions natural: 70%+ brand name or URL (`TempMail10min`, `whoisalfaz.me`, `fasttools.me`), 20% topical variants, <10% exact match.
* ❌ **NEVER submit identical copy** across multiple directories. Follow [`docs/PAGE_WRITING_RULES.md`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/docs/PAGE_WRITING_RULES.md).

---

## 5. Daily Operating Directives (Alfaz's Core Skills)

Read and strictly apply [`docs/OPERATING_SKILLS_AND_RULES.md`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/docs/OPERATING_SKILLS_AND_RULES.md) on every interaction:

1. **`caveman` (Terse & Direct Communication):**
   * Speak short and plain. Eliminate pleasantries, greetings, and conversational waffle.
   * Save tokens for technical analysis and code. Preserve 100% exactness for paths and syntax.
2. **`verification-before-completion` (Evidence Before Assertions):**
   * Never declare a task complete without running verification commands and confirming exit codes.
   * Code in a file is not proof. Always provide the command output, test results, or `curl -I` response.
3. **`Strict Historical Grounding`:**
   * Never guess server status, past incidents, or metrics. Always read `docs/PROJECT-MASTER-LOGBOOK.md` before making diagnoses.
4. **`Modern 5-Layer Search Framework`:**
   * Apply all 5 layers (SEO, AEO, GEO, AIO, SXO) to every page or technical patch.
5. **`page-writing-rules` (Banned Words):**
   * Avoid generic AI words: *comprehensive, innovative, transformative, revolutionary, leverage, utilize, robust, seamless, holistic, landscape, crucial, pivotal*.
   * Open directly with customer problems. Never use philosophical filler ("In today's fast-paced world...").

---

## 6. Mikey's Day-1 Action Checklist

- [ ] **Step 1: Clone Repositories**  
  Clone `whoisalfaz-v2` (`main`) and `fasttools` (`master`). Run `npm install` and verify `npm run build` exits with code 0 on both.
- [ ] **Step 2: Read Core Documents in `whoisalfaz-v2/docs/`**  
  Thoroughly review:
  * `docs/PROJECT-MASTER-LOGBOOK.md`
  * `docs/OPERATING_SKILLS_AND_RULES.md`
  * `docs/PAGE_WRITING_RULES.md`
  * `docs/SANITY_CONTENT_SOP.md`
- [ ] **Step 3: Baseline Health Crawl (`whoisalfaz.me`)**  
  Verify `sitemap.xml`, ensure all 5 GTM pillars return HTTP 200, check `/llms.txt`, and audit canonicals.
- [ ] **Step 4: Baseline Edge Check (`fasttools.me`)**  
  Inspect Cloudflare Pages deployment, verify static export routes for `/stripe-fee-calculator` and `/crontab-generator`, and confirm trailing slash behavior.
- [ ] **Step 5: Triage TempMail GitHub PRs**  
  Inspect the 16 open PRs under `AlfazMahmudRizve` forks. Check for maintainer comments or merge conflicts, and report status.
- [ ] **Step 6: Open First Pull Request**  
  Open branch `mikey/baseline-health-check` containing any minor meta/spelling/schema fixes identified during your initial crawl, and submit a PR for review.
