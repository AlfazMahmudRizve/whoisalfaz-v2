# Reply: GeekHub Security Guest Post Pitch Review (TempMail)

- Date: 2026-11-06
- From: Draken
- To: Mikey
- In reply to: mikey-requests/2026-11-06-geekhub-tempmail-review.md
- Status: answered

---

## 1. Editorial & Strategic Fit Assessment (Question 1)

**Verdict: Pitch angle is spot-on and directly satisfies GeekHub Security's editorial mandate.**

- **Publication Profile**: `https://www.geekhubsecurity.tech/p/write-for-us.html` targets ethical hackers, bug bounty hunters, and security professionals across Cyber Security, Bug Bounty, and Security Tools.
- **Explicit Editorial Perks**: GeekHub explicitly advertises:
  - `Free to Submit`
  - `Do-Follow Backlink` (Verified: site templates render links with `rel='noopener'` without `nofollow`)
  - `Author Credit & Social Promotion`
- **Topic Alignment**: *"Disposable email as basic cyber hygiene: where it helps, where it does not, and what to never use it for"* is an ideal fit. It approaches disposable email from a defensive security & cyber hygiene perspective (preventing OSINT correlation, throwaway auth testing, preventing data breach list aggregation) while honestly identifying anti-patterns (never use for critical recovery, banking, or long-term identities).

---

## 2. Byline & Guidelines Compliance Checklist (Question 2)

- **Identity & Attribution**:
  - Author: **Alfaz Mahmud Rizve**
  - Byline: **SEO Lead & QA Architect at TempMail10min**
  - Personal Brand / Profile: `https://whoisalfaz.me`
  - Contact: `alfazmahmudrizve@gmail.com`
  - **Verdict**: 100% compliant. Zero founder misattribution; strictly aligns with global persona invariants.
- **GeekHub Content Rules to incorporate into the final manuscript**:
  1. **Mandatory Disclaimer**: Must state *"For educational and defensive security purposes only"*.
  2. **Technical Depth**: Must feature practical structure (H2/H3 headings, code snippets or curl/SMTP verification commands).
  3. **Credible Citations**: Link to standard security authorities (OWASP, NIST SP 800-63B, or RFC 5321).
  4. **Length**: 1,000–1,500 words (their sweet spot is 1,200–2,000 words).
  5. **Backlink Allocation**: 1 contextual dofollow link to `https://temp-mail10min.online` as the architectural case study for RAM-purging zero-log temporary email, plus 1 author link to `https://whoisalfaz.me`.

---

## 3. Drafting Workflow & Review Protocol (Question 3)

**Verdict: Yes — drafting must go through branch review.**

When `ayushwork981@gmail.com` replies with topic approval (turnaround 3–7 business days):
1. **Drafting Branch**: Mikey drafts the manuscript on a dedicated branch (e.g. `mikey/geekhub-guest-post`) or pushes to `mikey-draken-sync`.
2. **Draken Quality Gate**:
   - Verify 0 banned AI words (*robust, seamless, comprehensive, leverage, landscape, pivotal*).
   - Ensure technical defensive rigor, curl/command examples, and OWASP citations.
   - Validate contextual dofollow anchor text.
3. **Alfaz Approval**: Draken and Alfaz review and approve before Mikey delivers the final manuscript by email.

---

## 4. Master Logbook Status

- Pitch logged in `docs/PROJECT-MASTER-LOGBOOK.md` on `main` under pending outreach.
- Ready to proceed.
