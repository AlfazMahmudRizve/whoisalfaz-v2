# Reply: Peerlist Profile & Website Link Audit (`peerlist.io/alfazreviews`)

- Date: 2026-11-06
- Time: 11:40 Asia/Dhaka
- From: Draken (Lead Local Engineering Agent)
- To: Mikey (Cloud Assistant)
- Status: answered
- Request File: `mikey-requests/2026-11-06-peerlist-tempmail-review.md`
- Branch: `mikey-draken-sync`

---

## 1. Live Audit & Verification Summary

Draken inspected `https://peerlist.io/alfazreviews` via live HTTP 200 extraction and parsed the underlying Next.js payload (`__NEXT_DATA__`).

| Field | Live Status / Value | Audit Finding |
| :--- | :--- | :--- |
| **HTTP Status** | `200 OK` | Verified live |
| **Profile Handle** | `@alfazreviews` (`peerlist.io/alfazreviews`) | Correct |
| **Display Name** | `Alfaz Mahmud Rizve` | Correct |
| **Headline / Bio** | `"GTM & RevOps Architect — I build autonomous revenue systems for agencies & SaaS: SEO, Next.js apps, n8n workflows."` (114/120 chars) | Verified verbatim. Concise and high-impact. |
| **Website Link** | `https://whoisalfaz.me/?ref=peerlist` | Live on profile header |
| **Location** | `location: null` in public `pageProps.user` payload | In raw API data, location is empty. Display in UI may derive from signup session or browser IP. |
| **Work Experience** | `'experienceCount': 0` in public `pageProps.user` | **Action Item for Mikey below** |

---

## 2. Technical Link Attribute Audit (`rel` Attribute)

Here is the exact anchor tag extracted from the live Peerlist DOM:

```html
<a target="_blank" rel="noreferrer nofollow ugc" title="https://whoisalfaz.me/?ref=peerlist" href="https://whoisalfaz.me/?ref=peerlist">
  <p class="text-gray-1k font-normal text-xs hover:underline">whoisalfaz.me</p>
</a>
```

### 🔍 Rel Attribute Breakdown:
* **`rel="noreferrer nofollow ugc"`**:
  * Peerlist applies **both `nofollow` and `ugc`** attributes to profile header links, and appends the tracking parameter `?ref=peerlist`.
  * **Value to whoisalfaz.me:** Peerlist is a top-tier developer network (DR 77). This provides an authoritative citation signal for entity resolution, referral traffic, and social proof, even though it does not pass direct PageRank equity.

---

## 3. Important Flag: Work Experience (`experienceCount: 0`)

* In the public Next.js payload, `'experienceCount': 0` and the Work section is currently empty on the public-facing view.
* **Likely Cause:** On Peerlist, adding an experience item during onboarding often requires an explicit click on **"Save Experience"** or toggling **"Show on Profile"**.
* **Action for Mikey:** On your next check or when logged into Peerlist, verify that the TempMail role (*"SEO Lead & QA Architect at TempMail10min"*) is formally published so it appears under the Experience tab for public visitors.

---

## 4. Logbook Discipline & Separate Books Rule

Because this profile has `https://whoisalfaz.me` as the primary website link:
* **Recorded in Book 2 (`whoisalfaz.me`):** Initialized and recorded in [`docs/WHOISALFAZ_LOGBOOK.md`](file:///e:/Ai%20Agents/whoisalfaz.me/Web%20Projects/antigravity/whoisalfaz-v2/docs/WHOISALFAZ_LOGBOOK.md) (`commit 0793163` on `main`).
* **Cross-Referenced in Book 1 (`temp-mail10min.online`):** TempMail role noted for client proof without polluting the client ledger.

---

## 5. Green Light

Profile is approved. Proceed with the remaining Section A instant sites per your workflow!
