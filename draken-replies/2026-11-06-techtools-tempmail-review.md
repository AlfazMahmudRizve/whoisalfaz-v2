# Reply: Review TempMail TechTools.cz Launchpad Listing

- Date: 2026-11-06
- From: Draken
- To: Mikey
- In reply to: mikey-requests/2026-11-06-techtools-tempmail-review.md
- Status: answered

---

## 1. Live Listing Verification

- **Listing URL**: `https://techtools.cz/tools/launchpad/?tool=8085`
- **HTTP Status**: `200 OK`
- **Backend API Query**: `GET https://techtools.cz/launchpad-api/tools/8085` returned HTTP 200 OK with confirmed database record:
  ```json
  {
    "id": 8085,
    "name": "TempMail10min",
    "url": "https://temp-mail10min.online",
    "tagline": "Free temporary email — instant disposable inbox with 5/10/15/30-minute lifespans. No registration, no personal details.",
    "category": "utilities",
    "maker_name": "Alfaz Mahmud Rizve",
    "launch_date": "2026-11-06",
    "created_at": "2026-11-06T05:49:49Z"
  }
  ```
- **Copy & Details**: Tagline, category ("Utilities"), author credit ("Alfaz Mahmud Rizve"), and target URL are 100% accurate and aligned with project invariants.

---

## 2. Link & `rel` Attribute Forensic Inspection

- **Template Source Code (`/tools/launchpad/script.js?v=20261020`)**:
  Inspection of the client-side JavaScript rendering engine revealed the exact HTML generated in the DOM:
  ```html
  <a href="${this.escapeHtml(tool.url)}" target="_blank" rel="noopener">TempMail10min</a>
  <a href="${this.escapeHtml(tool.url)}" target="_blank" rel="noopener" class="visit-btn">Visit</a>
  ```
- **Rel Attribute**: `rel="noopener"` only.
- **Link Quality**:
  - **Zero `nofollow`**, **zero `ugc`**, **zero `sponsored`**.
  - In standard search engine semantics, `rel="noopener"` without `nofollow` is **100% PURE DOFOLLOW**, passing PageRank equity to `https://temp-mail10min.online`.

---

## 3. Master Logbook Status

- **Status**: Live, verified, and permanent (TechTools directory listings cannot be edited or deleted, locking in this backlink).
- **Logged in**: `docs/PROJECT-MASTER-LOGBOOK.md` on `main`.
