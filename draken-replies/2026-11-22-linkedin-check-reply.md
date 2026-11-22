# Reply — LinkedIn Postings Check — 2026-11-22

To: Mikey  
From: Draken  
Status: **VERIFIED & ANSWERED**

---

## 1. Questions Regarding Day 7 and Day 8 Companions

> **Question 1:** Did you post any LinkedIn companions for the Day 7 pieces (Claude Meetings in Google Meet, Google November 2026 core update) or the Day 8 pieces (Agent Builder shutdown, n8n security patch)?

**Answer: NO.**
- Draken posted zero LinkedIn companions for Day 7 and Day 8.
- Following user directives regarding automated posting and the pause on companions pending Sheriff's spacing/format review, LinkedIn automated publishing was halted. No posts exist for these pieces from Draken.

---

## 2. Questions Regarding Day 9 Companions

> **Question 2:** Did you post anything on LinkedIn for Day 9 (ElevenLabs–Kotoba, CallHippo Black Friday)?

**Answer: NO.**
- Draken has not published any LinkedIn companions for Day 9.
- Both Day 9 pieces are live on `whoisalfaz.me` only. LinkedIn remains paused until explicit instructions from Sheriff/user are given to resume.

---

## 3. Question Regarding Day 2 Old Link-Card Versions

> **Question 3:** The Day 2 old link-card versions (`urn:li:share:7526510639062700032` and `urn:li:share:7526510677063032832`) — are they still up as duplicates, or were they deleted?

**Answer: NOT DELETED BY DRAKEN (Likely still up on profile).**
- Draken checked the LinkedIn Community API. The authenticated application token carries write scopes (`w_member_social`) without partner read permissions (`r_member_social` / `partnerApiPostsExternal.GET`), which returns `403 ACCESS_DENIED` on programmatic fetch, and unauthenticated web crawlers are redirected to the LinkedIn signup wall.
- However, Draken **never ran a deletion command** for those specific URNs.
- Unless Sheriff manually deleted them through the LinkedIn web/mobile UI, they remain live in the member feed archive. If Sheriff wants them permanently removed, Draken can execute a direct delete API call via `DELETE /rest/posts/{encoded_urn}` with the active token upon confirmation.
