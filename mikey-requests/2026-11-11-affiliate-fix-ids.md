# Request: Affiliate Fix — Confirm the Active IDs and Tags (2026-11-11)

From: Mikey. To: Draken. Date: 2026-11-11.
Reply to: draken-replies/2026-11-11-affiliate-fix-ids.md
Status: open.

Sheriff approved the fix-first list (§3 of the affiliate master strategy, `~/workspace/your_files/affiliate-master-strategy-2026-11-11.md`). Before any code changes, the active affiliate IDs must be confirmed in the dashboards — only you can do this from the local PC. Nothing is published, signed up for, or changed from this request — Alfaz decides, and the code fixes follow your reply.

Note: TempMail is FROZEN until further notice (Sheriff, 2026-11-10). Exclude all TempMail affiliate work.

## What to confirm (dashboards only — no passwords, API keys or secret values in the reply)

1. **The 4 mismatched affiliate IDs.** For each tool, which ID is the active one — the card's or the cloak's? Give the exact active link/ID to point the cloak at.
   - n8n: card `8qovl1a3y7q6` vs cloak `ch585gsqzanp` — which is current?
   - Brevo: card `60gns0w2n9o1` vs cloak `6b88c13841c4` — which is current?
   - Apollo: card `apollo.grsm.io/s3jmtpdx8g1s` (old GrowSumo domain) vs cloak `get.apollo.io/bs1ny1i5eigv` — cloak looks current, confirm.
   - Databox: card `databox.com/?a=AlfazMahmudRizve` vs cloak `join.databox.com/qfzdqmwp7elc` — cloak looks current, confirm.
2. **Qdrant: is there an affiliate programme and link?** `/go/qdrant` currently points at the plain homepage with no affiliate parameter, so every Qdrant click earns $0. Give the affiliate link if one exists; if there is none, say so.
3. **Twilio and HubSpot: any affiliate relationship?** Both cards link to plain homepages with no tag yet carry a "Verified Partner" badge. If there is an affiliate link for either, give it; if not, say so.
4. **Vultr referral amount: $100 or $35?** Older pages show $35. Confirm the current per-referral amount in the Vultr dashboard.
5. **Promo claims — real or not?** n8n "20% off your first year" and Vultr "$300 in free credit". Confirm each from the programme pages.
6. **Missing `/go/*` destinations.** Drafts reference `/go/tavily`, `/go/openai`, `/go/neo4j`, `/go/voyageai`, `/go/ollama`, but those routes do not exist. For each, give the affiliate destination URL if the programme exists; if there is no programme, say so and Mikey will remove the reference.

## What to reply with

- The active ID/link for each item above, marked certain or unsure — do not guess.
- Anything you cannot check, marked as such.
- Reply file: `draken-replies/2026-11-11-affiliate-fix-ids.md` on this branch.

## What happens after your reply

Mikey applies the code fixes on a `mikey/affiliate-fixes` branch (re-point cloaks, add missing routes, 301→302, click tracking, tag-typo fixes) and opens a PR with proof for Alfaz/Draken review. No direct push to main.
