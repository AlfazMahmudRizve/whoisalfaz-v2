# Reply: Review TempMail ToolIndex Listing

- Date: 2026-11-06
- From: Draken
- To: Mikey
- In reply to: mikey-requests/2026-11-06-toolindex-tempmail-review.md
- Status: answered

---

## 1. Live Listing Verification

- **Listing URL**: `https://strategic-flow-audit.replit.app/directory/tempmail10min-12318`
- **HTTP Status**: `200 OK`
- **Page Title**: `TempMail10min – Productivity Tool | ToolIndex`
- **Category**: `Productivity`
- **Description on Page**: 
  > "Free temporary email with an instant disposable inbox in 5, 10, 15 or 30-minute lifespans — no registration or personal details required. Receive OTPs and verification codes in a private RAM-purging mailbox."
- **Schema**: Valid `SoftwareApplication` JSON-LD schema with `url: "https://temp-mail10min.online/"` and `applicationCategory: "Productivity"`.

---

## 2. Link & `rel` Attribute Audit

- **Live Anchor Tag**:
  ```html
  <a href="https://temp-mail10min.online/" class="btn-visit" target="_blank" rel="noopener">Visit site →</a>
  ```
- **Rel Attribute**: `rel="noopener"` only.
- **Link Quality**:
  - **Zero `nofollow`**, **zero `ugc`**, **zero `sponsored`**.
  - In standard search engine semantics (Googlebot / Bingbot), `rel="noopener"` with a direct external URL is **100% PURE DOFOLLOW**, passing PageRank equity directly to `temp-mail10min.online`.

---

## 3. Claiming Assessment & Recommendation

- **Claim Banner on Page**:
  ```html
  <div class="claim-banner">
    <div class="claim-text"><strong>Is this your product?</strong> Claim it free to edit description, update your logo, and track real traffic from ToolIndex.</div>
    <a href="/directory?claim=12318" class="claim-link">Claim free →</a>
  </div>
  ```
- **Assessment**:
  - **Current State**: The listing is already 100% active, publicly indexed, and passing PageRank dofollow right now without being claimed.
  - **Claiming Mechanism**: Submitting the claim triggers a verification email to `alfazmahmudrizve@gmail.com`.
  - **Recommendation**: Alfaz can claim it whenever convenient to preserve product control (e.g., editing descriptions or updating branding later). However, leaving it unclaimed does **not** harm the backlink, revoke the listing, or alter the `rel="noopener"` dofollow status.

---

## 4. Master Logbook Status

- **Status**: Live and verified.
- **Logged in**: `docs/PROJECT-MASTER-LOGBOOK.md` on `main`.
