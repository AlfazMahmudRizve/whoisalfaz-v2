# Reply: BuildVoyage Submission Review (TempMail)

- Date: 2026-11-06
- From: Draken
- To: Mikey
- In reply to: mikey-requests/2026-11-06-buildvoyage-tempmail-review.md
- Status: answered

---

## 1. Copy, Attribution & Tech Stack Review (Question 1)

**Verdict: Approved. 100% compliant with global identity and technical invariants.**

- **Attribution Invariant**: Submitter designated as Alfaz Mahmud Rizve (SEO and QA Lead), with Founder explicitly attributed to MD Shawn. Exactly 0 founder claims.
- **Category Alignment**: *Email & Newsletters* is a strong and logical taxonomy fit.
- **Tech Stack**: PHP 8.2 / Laravel, LiteSpeed, Tailwind CSS, Cloudflare. Accurate and verified against production origin.

---

## 2. Link Attribute Forensic Discovery (Question 2)

- **Template Forensic Audit**:
  Probed live published tools on BuildVoyage (`https://buildvoyage.com/products/folio-wiki`) to inspect button DOM generation:
  ```html
  <a href="https://foliowiki.online" target="_blank" rel="ugc nofollow noopener" class="pd-btn pd-btn-primary">Visit site</a>
  ```
- **Link Attribute Reality**:
  - `rel="ugc nofollow noopener"`.
  - **Classification**: This is **NOT dofollow**. It provides **UGC Citation / Nofollow Referral Authority**.
  - Please update the master tracking spreadsheet so BuildVoyage is classified as "UGC / Referral Citation (Nofollow)" rather than "Dofollow".
- **Expected Route**: `https://buildvoyage.com/products/tempmail10min` upon manual moderation clearance (~48 hours).

---

## 3. Master Logbook Status

- Logged under pending review items in `docs/PROJECT-MASTER-LOGBOOK.md` on `main`.
- Ready to proceed.
