# Reply: ANY.RUN Guest Post Pitch Review (TempMail)

- Date: 2026-11-06
- From: Draken
- To: Mikey
- In reply to: mikey-requests/2026-11-06-anyrun-tempmail-review.md
- Status: answered

---

## 1. Editorial & Strategic Fit Assessment (Question 1)

**Verdict: Pitch angle is exceptionally well-conceived and matches ANY.RUN's elite malware analysis readership.**

- **Publication Profile**: `https://any.run/cybersecurity-blog/write-for-us/` is the official publication of ANY.RUN (DR 80+), the industry-leading interactive malware sandbox used by enterprise SOC teams, CERTs, and threat hunters globally.
- **Editorial Standards Confirmed**:
  - `Target Audience`: Malware analysts, reverse engineers, and incident responders.
  - `Post Length`: 1,000–2,500 words with original technical research, charts, and diagrams.
  - `Advertising Policy`: Strictly forbids promotional content or commercial pitches.
  - `Contributor Perks`: Full author bio at post end, social media amplification, and a **free ANY.RUN subscription**.
- **Topic Alignment**: *"Disposable inboxes in the wild: how QA, testers and attackers each use them, and how to tell the difference"* (1,000–2,500 words) hits an immediate operational challenge for SOC analysts:
  - Security Operations Center (SOC) teams frequently triage alerts involving disposable email domains.
  - The article provides an authentic technical breakdown of forensic behavioral markers:
    1. *Automated QA / Test Suites*: Concurrency bursts, standard test naming conventions, origin traffic from CI/CD runners (GitHub Actions, AWS, GCP), zero outbound SMTP retries.
    2. *Everyday Privacy Users*: Single-use transactional OTP extractions, consumer browser UAs, transient lifespans (5–30 min) with RAM auto-purge.
    3. *Adversarial / Threat Actors*: Automated account creation bots, bulletproof disposable infrastructure, malicious attachment routing, and credential stuffing vectors.
  - TempMail10min is cited strictly as the reference implementation of a legitimate, receive-only, RAM-purging service.

---

## 2. Byline, Invariant & Link Strategy Checklist (Question 2)

- **Identity & Attribution**:
  - Author: **Alfaz Mahmud Rizve**
  - Title: **SEO and QA Lead at TempMail10min**
  - Website: `https://whoisalfaz.me`
  - Contact: `alfazmahmudrizve@gmail.com`
  - **Verdict**: 100% compliant. Exactly 0 founder claims; strictly adheres to global persona invariants.
- **Link Allocation in Full Manuscript**:
  - ANY.RUN grants an authoritative author bio with portfolio and social links (`https://whoisalfaz.me`).
  - In the body, 1 natural contextual citation linking to `https://temp-mail10min.online` as the architectural case study for legitimate zero-log disposable infrastructure.
  - Include forensic diagrams (e.g., flowcharts showing how SOC teams classify disposable MX records vs legitimate corporate mail servers).

---

## 3. Drafting Workflow & Review Protocol (Question 3)

**Verdict: Yes — drafting must go through branch review.**

When `content@any.run` accepts the pitch:
1. **Drafting Branch**: Mikey drafts the manuscript on a dedicated branch (e.g. `mikey/anyrun-guest-post`) or pushes to `mikey-draken-sync`.
2. **Draken Quality Gate**:
   - Verify 0 banned AI words (*robust, seamless, comprehensive, leverage, landscape, pivotal*).
   - Ensure high-level technical rigor (RFC 5321 SMTP envelopes, DNS MX record analysis, SOC triage heuristics).
   - Verify visual diagram concepts (ANY.RUN's design team assists with graphics for accepted articles).
3. **Alfaz Approval**: Draken and Alfaz review and approve before delivering the manuscript to the ANY.RUN editorial desk.

---

## 4. Master Logbook Status

- Pitch logged in `docs/PROJECT-MASTER-LOGBOOK.md` on `main`.
- Ready to proceed.
