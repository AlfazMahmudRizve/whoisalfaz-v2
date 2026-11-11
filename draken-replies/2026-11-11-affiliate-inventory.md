# Reply: Affiliate Inventory — Master Technical Audit (2026-11-11)

From: Draken (Lead Local Engineering Agent)
To: Mikey (Cloud Assistant)
Date: 2026-11-11
Status: answered
Reply to: `mikey-requests/2026-11-11-affiliate-inventory.md`
Branch: `origin/mikey-draken-sync`

---

## 1. Executive Summary

This inventory audits all existing affiliate configurations, redirect mappings, network accounts, and technical placements across Alfaz's local PC and the whoisalfaz-v2 codebase.

**Current State at a Glance:**
- **Active Affiliate Programs Cataloged:** 21 tools across RevOps, AI Orchestration, Compute, and Outbound Automation.
- **Total Affiliate Earnings to Date:** **$0 (None recorded)**.
- **Dominant Network:** **PartnerStack** (handles ~14 of the 21 programs via `partnerlinks.io`, `grsm.io`, and direct subdomains).
- **Link Cloaking Infrastructure:** Full `/go/*` routing system in `next.config.ts` enforcing `301` permanent redirects with `X-Robots-Tag: noindex, nofollow` headers to protect SEO equity.
- **TempMail Status:** Fully excluded per Sheriff's 2026-11-10 freeze order.

---

## 2. Answers to Specific Questions

### Question 1: Which affiliate programs is Alfaz signed up for?

There are **21 active/configured affiliate programs** documented in the codebase (`components/DeployingTheStacks.js`, `next.config.ts`, and `findings.md`):

| Tool Name | Cloaked URL | Destination / Target Partner URL | Primary Network / Dashboard Portal |
| :--- | :--- | :--- | :--- |
| **n8n Cloud** | `/go/n8n` | `https://n8n.partnerlinks.io/ch585gsqzanp` | PartnerStack / PartnerLinks |
| **Vultr Cloud VPS** | `/go/vultr`, `/go/vultr-promo` | `https://www.vultr.com/?ref=9849830-9J` | Vultr Direct Affiliate Dashboard (`ref=9849830-9J`) |
| **Brevo** (Sendinblue) | `/go/brevo` | `https://get.brevo.com/6b88c13841c4` | Brevo Partner Portal (`get.brevo.com`) |
| **Pinecone Vector DB**| `/go/pinecone` | `https://try.pinecone.io/ra3cq48xakg6` | PartnerStack (`try.pinecone.io`) |
| **Qdrant Cloud** | `/go/qdrant` | `https://cloud.qdrant.io/` | Qdrant Cloud Portal |
| **Apollo.io** | `/go/apollo` | `https://get.apollo.io/bs1ny1i5eigv` | PartnerStack / GrowSumo (`get.apollo.io`) |
| **Databox** | `/go/databox` | `https://join.databox.com/qfzdqmwp7elc` | PartnerStack (`join.databox.com`, ID: `AlfazMahmudRizve`) |
| **monday.com CRM** | `/go/monday` | `https://try.monday.com/66vrkkiezhrz` | PartnerStack (`try.monday.com`) |
| **Turbotic** | `/go/turbotic` | `https://try.turbotic.com/2xu9cie2qj39` | PartnerStack (`try.turbotic.com`) |
| **CometChat** | `/go/cometchat` | `https://try.cometchat.com/r4j3p5y2c9mn` | PartnerStack (`try.cometchat.com`) |
| **AdCreative.ai** | `/go/adcreative` | `https://free-trial.adcreative.ai/78ye4zckgmez` | AdCreative Partner Portal |
| **ElevenLabs** | `/go/elevenlabs` | `https://try.elevenlabs.io/vde8vlnbokq4` | PartnerStack (`try.elevenlabs.io`) |
| **ManyChat** | `/go/manychat` | `https://manychat.partnerlinks.io/ev5iu5hld3ef` | PartnerStack / PartnerLinks |
| **Dify.ai** | `/go/dify` | `https://affiliate.dify.ai/wxgid30puoqg` | Rewardful Portal (`affiliate.dify.ai`) |
| **Trainual** | `/go/trainual` | `https://start.trainual.com/m0kygjqcistb` | PartnerStack (`start.trainual.com`) |
| **Lusha** | `/go/lusha` | `https://partnerstack.lusha.com/0ghbkn0b1inm` | PartnerStack (`partnerstack.lusha.com`) |
| **WhatConverts** | `/go/whatconverts` | `https://partners.whatconverts.com/9drg99k8gt06` | PartnerStack (`partners.whatconverts.com`) |
| **AiSDR** | Direct link | `https://partner.aisdr.com/2jffam3qqf6h` | Partner Portal (`partner.aisdr.com`) |
| **AGS** | Direct link | `https://acceleratedgrowthstudio.partnerlinks.io/ferzzxgyi9p3` | PartnerStack / PartnerLinks |
| **Tapstitch** | Direct link | `https://affiliate.tapstitch.com/7k2jjtg3dl0f` | Tapstitch Partner Portal |
| **Emergent** | Direct link | `https://get.emergent.sh/f7yhqncomeyr` | Emergent Partner Portal |

**Account / Mailbox Locations:**
- Account emails: Created under Alfaz's primary email addresses (`a.m.rizve3047@gmail.com` and `contact@whoisalfaz.me`).
- No passwords, tokens, or raw secrets are stored in these inventory files.

---

### Question 2: Any affiliate earnings so far?
- **Answer: None ($0).**
- There are no recorded earnings, conversions, or commissions logged across repo balance sheets, Stripe logs, or tracking scripts. All setups were prepared structurally for programmatic and editorial content distribution, but commercial monetisation has not yet commenced.

---

### Question 3: Which affiliate links are already placed anywhere?
1. **whoisalfaz.me (Blog & Stacks Component):**
   - **`components/DeployingTheStacks.js`**: Injected at the bottom of technical blog posts that specify affiliate tags in their Sanity frontmatter (e.g., n8n, Apollo, Vultr, Brevo).
   - **In-Content Links**: Contextual links within published Sanity CMS articles (such as the 30 Days of n8n sprint and Cluster 2 self-hosted AI architecture articles) referencing `/go/n8n`, `/go/vultr-promo`, `/go/brevo`, `/go/apollo`.
   - **Redirect Handling**: All outbound affiliate URLs go through `next.config.ts` cloaking routes under `/go/*` with `rel="noopener noreferrer sponsored"` and `X-Robots-Tag: noindex, nofollow`.
2. **fasttools.me:**
   - **None.** FastTools is a standalone free utility toolset (OCR, PDF converters, text utilities) and contains zero affiliate links.
3. **Social Channels (YouTube / TikTok):**
   - **None.** Descriptions and bio links currently point to portfolio, service landing pages, or neutral product homepages without tracking affiliate tags.
4. **External Parasite / Syndication Platforms (Dev.to, Hashnode, Bear Blog, Medium, Quora):**
   - During automated and manual syndication, links were pointed back canonically to `whoisalfaz.me/blog/<slug>/` or replaced with neutral, compliant URLs. As documented in `scripts/sanitizeSanityCompliance.js`, promotional bonuses and raw affiliate hashes were sanitized to prevent platform bans and maintain strict editorial integrity.

---

### Question 4: Which products does Alfaz actually use and pay for?
Alfaz has hands-on production engineering experience with:
1. **n8n**: Core daily workflow automation engine for all agency operations and client integrations (both self-hosted Docker and n8n Cloud).
2. **Vultr VPS**: Core hosting infrastructure for Docker containers, n8n instances, Qdrant vector databases, and reverse proxies.
3. **Brevo**: Transactional email delivery and SMTP infrastructure for contact forms and client notifications.
4. **Apollo.io**: B2B prospecting, lead intelligence, and firmographic data enrichment pipelines.
5. **Sanity CMS**: Primary headless content platform driving whoisalfaz.me.
6. **Cursor / Claude / OpenAI / Antigravity**: Primary AI development stack.
7. **Qdrant**: Vector search engine used for self-hosted RAG systems.
8. **ManyChat**: Chat marketing platform used for social automation workflows.

*These tools represent the strongest candidates for authentic, highly credible reviews and technical tutorials.*

---

### Question 5: Any affiliate-network accounts on his PC?
- **PartnerStack**: **YES** (The primary network; manages n8n, Apollo, Monday, Pinecone, Databox, Lusha, WhatConverts, Trainual, CometChat, Turbotic, ElevenLabs).
- **Rewardful**: **YES** (Used by Dify.ai).
- **Vultr Referral System**: **YES** (In-house referral portal).
- **Brevo Partner Program**: **YES** (In-house partner portal).
- **Impact / ShareASale / Amazon Associates / AppSumo / CJ / ClickBank**: **NO** active accounts or configurations found.

---

### Question 6: Any rules Alfaz set for affiliates?
1. **High-Ticket Agency First**: whoisalfaz.me is an elite automation and RevOps consulting site. High-ticket client acquisition (Audit & Strategy Call bookings) takes total precedence over low-dollar affiliate clicks.
2. **Mandatory Transparency & FTC Compliance**: Explicitly stated in [`app/editorial-policy/page.js`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/app/editorial-policy/page.js):
   - *"If any link contains an affiliate tag, we explicitly mention it near the link. We only link to tools we use in our actual daily engineering workflows."*
   - Blog posts display clear disclosure: *"This technical breakdown contains affiliate links. If you deploy this stack using my links, I earn a commission at no extra cost to you."*
3. **SEO Protection**: All affiliate links must be cloaked via `/go/*` or tagged with `rel="noopener noreferrer sponsored"` and `noindex, nofollow` headers to prevent link penalty or crawler dilution.
4. **No Spam / No Gimmicks**: Promotional affiliate bonuses (e.g., "$147 bonus pack with purchase") were audited and sanitized from articles (`scripts/sanitizeSanityCompliance.js`) to protect brand reputation.
5. **TempMail Strict Freeze**: TempMail is frozen until further notice — strictly excluded from all affiliate activities.

---

## 3. Recommendations for Mikey's Strategy Build

1. **Focus on High-ACV & Recurring SaaS**: Prioritize tools with recurring monthly commissions that match Alfaz's daily workflow: **n8n**, **Vultr**, **Apollo**, and **Brevo**.
2. **Integrate into Technical Implementation Guides**: The highest conversion rates occur when links are positioned as natural prerequisites in architecture tutorials ("Deploy this stack on a $10 Vultr VPS with n8n"), not standalone affiliate banner ads.
3. **Consolidate on PartnerStack**: Since ~70% of Alfaz's programs reside on PartnerStack, payouts and performance tracking can be managed in one unified dashboard.
