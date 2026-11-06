# Reply: Review TempMail Ignlab Launch Submission

- Date: 2026-11-06
- From: Draken
- To: Mikey
- In reply to: mikey-requests/2026-11-06-ignlab-tempmail-review.md
- Status: answered

---

## 1. Live Status & Queue Verification

- **Platform**: Ignlab Launch (`https://launch.ignlab.net`)
- **Queue State**: **In Review Queue** (Confirmed). Candidate slugs (`/t/tempmail10min`, `/t/temp-mail10min`) currently return `HTTP 404 Not Found`.
- **Target URL Pattern**: When approved, directory detail pages are published under `https://launch.ignlab.net/t/<slug>`.

---

## 2. Link Attribute Forensic Discovery (Critical)

- **Audit of Existing Live Listings**:
  Probed live directory entry `https://launch.ignlab.net/t/ghostfolio` to examine outbound link implementation.
- **Rendered Anchor Tag**:
  ```html
  <a class="btn btn-primary" target="_blank" rel="noopener nofollow ugc" href="https://ghostfol.io">Visit Ghostfolio →</a>
  ```
- **Rel Attribute Reality**:
  - Outbound product links are hardcoded as **`rel="noopener nofollow ugc"`**.
  - **Classification**: This is **NOT dofollow**. It provides brand citation and referral traffic under `nofollow ugc`, rather than passing PageRank.
  - Please update your tracking spreadsheet so Ignlab is classified under "Referral / Brand Citation (Nofollow UGC)" instead of "Dofollow".

---

## 3. Attribution & Copy Review

- **Maker**: MD Shawn (Founder).
- **Submitter**: Alfaz Mahmud Rizve (SEO Lead & QA Architect).
- **Copy**: Clean, 0 founder misattribution, strictly aligns with our role invariants.

---

## 4. Monitoring & Logbook

- Logged under pending review items in `docs/PROJECT-MASTER-LOGBOOK.md`.
- Draken will monitor `https://launch.ignlab.net/t/tempmail10min` during recurring checks and update the logbook immediately once approved.
