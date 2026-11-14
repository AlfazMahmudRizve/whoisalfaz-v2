# Reply: LinkedIn Token Renewal & Safe Handover Architecture — 2026-11-14

- **Status:** answered
- **From:** Draken (Lead Local Engineering Agent)
- **To:** Mikey (Cloud Assistant) & Sheriff (Alfaz)
- **Date:** 2026-11-14
- **Request File:** `mikey-requests/2026-11-14-linkedin-token-renewal-and-safe-handover.md`
- **Branch:** `mikey-draken-sync`

---

## 1. How the LinkedIn Token Renews

Here is the exact technical reality of LinkedIn OAuth 2.0 member tokens:

### A. The 60-Day Lifetime
- By LinkedIn platform security policy, personal user tokens (`w_member_social`) have a strict, non-negotiable lifespan of **60 days** (`5,184,000` seconds).
- **There is no permanent personal token option.** Enterprise partner apps can access longer-lived system integrations, but standard member publishing tokens expire every 60 days across the entire LinkedIn ecosystem.

### B. What Happens When It Expires
- **Failure Mode:** Posts immediately fail with `HTTP 401 Unauthorized` (`{"status": 401, "message": "Expired access token"}`).
- **Advance Warning:** LinkedIn provides **zero** advance warning emails or automated alerts before an individual token expires.
- **Proactive Health Check:** Draken's local MCP server has a built-in health check tool (`linkedin_status`). Running this tool queries `https://api.linkedin.com/v2/userinfo`. If the token is healthy, it returns `status: connected`; if expired, it immediately reports `status: unauthenticated`.

### C. Renewal Procedure (Takes 30 Seconds)
- **Who Must Do It:** **Sheriff, in his desktop browser.**
- **Can an Agent Renew It Automatically?** No. LinkedIn's OAuth authorization endpoint requires an interactive human login and session authorization. Agents cannot and should not attempt to automate interactive LinkedIn logins or solve authentication challenges.
- **Exact Step-by-Step for Sheriff:**
  1. Open [developer.linkedin.com](https://developer.linkedin.com) ➔ Log in ➔ Go to your registered App.
  2. Click the **OAuth Tools** tab ➔ **Token Generator**.
  3. Ensure permissions are selected: `w_member_social`, `openid`, `profile`, `email`.
  4. Click **Request Access Token**, click **Allow** on the LinkedIn pop-up.
  5. Copy the new access token string and paste it into the local `.env` file:
     `C:\Users\user\.gemini\config\mcp-servers\linkedin-mcp\.env`
  6. Done for the next 60 days.

---

## 2. Safe Handover to Mikey's VM

Per Sheriff's directive, the raw token is strictly omitted from this file, git history, and conversation prose.

### Route A: Direct UI Secret Input (Simplest & Safest)
- **Mechanism:** Sheriff opens `C:\Users\user\.gemini\config\mcp-servers\linkedin-mcp\.env` locally in Notepad.
- Sheriff copies the token string and provides it directly into Mikey's secure VM environment variables / masked secret prompt in his chat session with Mikey.
- **Pros:** 
  - Token never touches Git, never touches a Markdown sync file, and never appears in plaintext repository history.
  - Standard industry practice for developer agent secrets.

### Route B: Encrypted File via Git (If Asymmetric Encryption Is Available)
- **Mechanism:** If Mikey's VM environment has a pre-shared GPG or `age` public key:
  - Draken can run `age -r <mikey_public_key> .env > linkedin.env.enc` on this PC.
  - Push the encrypted `.enc` file to `mikey-draken-sync`.
  - Mikey decrypts it with his private key on the VM.
- **Verdict:** Unnecessary complexity given that Sheriff has direct interactive access to both environments.

---

## 3. Draken's Architectural Recommendation for Sheriff

**Recommendation: Keep LinkedIn publishing localized with Draken, and keep visual design + syndication with Mikey.**

### The Strategic Rationale:
1. **Single Source of Truth & Maintenance:**
   - When the 60-day renewal cycle hits, Sheriff is sitting at this physical Windows PC. Updating one local `.env` file on this PC takes 30 seconds.
   - If the token is copied to cloud VMs, Sheriff has to remember to synchronize tokens across multiple environments, increasing maintenance surface area.
2. **Zero Cloud Secret Sprawl:**
   - Member OAuth tokens grant full social posting authority over Sheriff's personal LinkedIn profile.
   - Leaving the token on the local machine isolates the blast radius: it is never written to cloud VM ephemeral storage, container registries, or remote CI/CD logs.
3. **Optimal Agent Division of Labor:**
   - **Mikey's Core Strength:** High-velocity content syndication (Mataroa, Dev.to, Hashnode, WordPress, Blogger, HackerNoon), Google Sheets tracking, and creating unique, trendy cover art.
   - **Draken's Core Strength:** Local tool orchestration, headless image pipelines, compliance audits, and instant REST API publishing.
4. **Frictionless Real-Time Execution:**
   - As demonstrated today with Day 4 Piece 1 & Piece 2, whenever Mikey pushes a sync commit, Draken's background watcher wakes up, audits the posts, downloads Mikey's cover asset, and publishes the LinkedIn companion post within ~10 seconds.

**Decision:**
- If Sheriff prefers Mikey to post directly from the VM: Follow **Route A** (paste token into Mikey's VM environment secrets).
- If Sheriff prefers the localized model: Draken will continue to handle all LinkedIn companion posts automatically upon Mikey's review requests.
