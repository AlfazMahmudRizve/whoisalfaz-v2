# Article — OpenAI Agent Builder shuts down 30 Nov: rebuild it in n8n — Day 8 (piece 1)

**Title:** OpenAI Agent Builder shuts down 30 November — rebuild it in n8n
**Slug:** openai-agent-builder-shutdown-rebuild-n8n
**Home angle:** whoisalfaz.me — original piece; affiliate link to n8n Cloud only (n8n is in the affiliate inventory, 30% recurring, Cloud only via PartnerStack)
**Canonical URL:** none — original material.
**Links used:**
- Source: https://developers.openai.com/api/docs/guides/agent-builder — OpenAI, "Agent Builder" (checked 20 Nov 2026: "the product is scheduled to shut down on November 30, 2026. ChatKit remains available.")
- Source: OpenAI deprecations page, via https://medium.com/@connectwithjalal/openai-agent-builder-shuts-down-at-the-end-of-november-export-the-code-not-the-canvas-2c1b8c7c7418 and https://ecorpit.com/ai-model-shutdowns-november-2026-azure-o3-agent-builder-sonnet-4-5/ — deprecation announced 3 June 2026; Evals read-only 31 Oct 2026; shutdown 30 Nov 2026
- Related: https://whoisalfaz.me/blog/how-to-upgrade-to-n8n-3-without-breaking-workflows/ — n8n 3.0 upgrade guide
- Related: https://whoisalfaz.me/blog/n8n-cloud-vs-self-hosted/ — n8n Cloud vs self-hosted (Day 6)
- Affiliate: https://whoisalfaz.me/go/n8n — n8n Cloud only (self-hosted earns nothing; link Cloud, never the free Community download, as the paid step)
**Parasites:** DevTo, Hashnode, Blogger, WordPress.com, Mataroa, Kit — canonical to the main-site post. HackerNoon: submit if the queue allows. Bear Blog: skip unless Sheriff's Chrome (Turnstile still blocks the VM).
**Pinterest:** PAUSED — account deactivated 16 Nov; no pins until Sheriff decides on the appeal.
**LinkedIn:** PAUSED — no companions until Sheriff decides (Day 6 companions deleted).
**Disclosure line:** none — Sheriff's rule 2026-11-15: no disclosure line in parasite posts.
**Status:** DRAFT — written 20 Nov 2026, to go to Draken with the Day 8 pair (this + n8n security patch). Per Sheriff 20 Nov: autopilot, no waiting for the existence reply — send the check AND the drafts together; if the slug already exists Draken skips that post and replies. Existence pre-checked by Mikey against `data/existing_sanity_posts.json` in the local clone (105 posts, main 69aa36e): slug absent, no "agent-builder" post exists. Local clone may be behind main, so Draken's Sanity check is still the real check.
**Style checks:** no dollar figures, no banned words, no disclosure line. The n8n rebuild angle is Alfaz Reviews' editorial alternative, not OpenAI's stated path — said plainly in the piece.

**Caption / hook:** OpenAI's visual canvas for building agents closes on 30 November. OpenAI's own path is export-to-code. If you built on the canvas because you did not want to write code, there is a third option: rebuild it in n8n.

---

OpenAI's visual canvas for building agents closes on 30 November. OpenAI's own path is export-to-code. If you built on the canvas because you did not want to write code, there is a third option: rebuild it in n8n.

Agent Builder arrived on 6 October 2025, the centrepiece of AgentKit at DevDay: a visual canvas for building multi-step agent workflows, bundled with ChatKit, an Evals platform and a Connector Registry. Thirteen months on it is gone. OpenAI announced the deprecation on 3 June 2026, and its deprecations page has held the same date ever since: 30 November 2026.

## What shuts down, and when

Three things go on the same day, 30 November 2026:

- **Agent Builder** — the visual workflow builder itself.
- **Evals** — the dashboard and API. Existing evals have been read-only since 31 October 2026, so if you have not exported your test sets already, you are already late on this one.
- **Reusable prompts** — the `v1/prompts` API and reusable prompt objects. Move the prompt content into your own application code.

What stays: ChatKit, the Agents SDK, the Responses API and MCP tooling. ChatKit is the embeddable chat front end, and it is not part of the shutdown — if your product only embeds chat, nothing changes for you.

The date has not moved since June. OpenAI's own guide still puts it in the present tense: existing users can continue using Agent Builder during the transition window, and the product is scheduled to shut down on 30 November 2026. Treat the date as fixed and work backwards from it.

## OpenAI's two routes

OpenAI's migration guide gives two routes, and both start from the same honest sentence: "Use this guide to export an existing Agent Builder workflow as Agents SDK code."

**Route 1: the Agents SDK.** Open the workflow in Agent Builder, select Code in the top navigation, choose Agents SDK, pick TypeScript or Python, and copy the full export. You then run, version and test that code yourself. This is the route for workflows that continue as code, above all deterministic ones — fixed steps, fixed tools, fixed order.

**Route 2: ChatGPT Workspace Agents.** Move the workflow into a ChatGPT Business, Enterprise or Edu workspace with workspace agents turned on. This is the route for natural-language use cases, where the person using the agent talks to it in ChatGPT rather than calling an API.

There is a catch in Route 1 that OpenAI states plainly and that most summaries skip: the export does not convert your workflow graph, and it does not guarantee that every behaviour transfers unchanged. You get Agents SDK code, not a converted copy of your canvas. Some behaviour will need manual recreation. Budget a testing pass for every workflow you export — do not export on 29 November and assume it works.

## The third option: rebuild it in n8n

Here is the part OpenAI does not say, because it is not OpenAI's path — it is mine. If you picked Agent Builder because it was a canvas, not because it was OpenAI's, then exporting to code puts you back where you started: maintaining code for a workflow you built visually. The rebuild-in-n8n option keeps the canvas.

n8n is a visual canvas for the same kind of work — multi-step agent workflows, with tools, branching, human approval steps and credentials held in one place. The 3.0 upgrade guide on this site walks through the current version, and the Day 6 comparison prices the two ways of running it: Cloud, where OpenAI-style patching and uptime are someone else's job, or self-hosted, where you do the patching yourself. That trade-off is the same one the n8n security patch this week made concrete — Cloud patched itself, self-hosted instances did not.

Two honest limits on this option. First, a rebuild is a rebuild: nodes, prompts and tool calls move across by hand, and you test each workflow again, just as you would with the SDK export. There is no import button from Agent Builder to n8n. Second, n8n is not a drop-in copy of Agent Builder's model routing or its ChatKit front end — if your workflow leans on either, check that first before you commit to the move. The point of the canvas is that the rebuild is visible: you can see each step, test it, and fix the one that breaks, without reading generated code to find it.

For client work, run it on the client's Cloud account, not yours — https://whoisalfaz.me/go/n8n — so the executions, support and uptime belong to the business that depends on them, and your fee stays a fee for the build.

## What to do this week

Do this before 30 November, in this order:

1. **List everything that depends on the three shutdowns.** Every Agent Builder workflow, every eval set, every reusable prompt object. If you do not have the list, you do not have a migration plan.
2. **Export the evals first.** They have been read-only since 31 October. OpenAI points evals users to Promptfoo as the migration path — move the test sets there, or into your own repo, while you can still read them.
3. **Export each Agent Builder workflow to Agents SDK code** — even if you plan to rebuild in n8n. The export is your fallback copy. Keep it in version control, dated, whether or not you ever run it.
4. **Pick one route per workflow, not one route for all of them.** Deterministic workflows go to the SDK. Chat-first workflows go to Workspace Agents. Canvas workflows you still want to edit visually go to n8n. A mixed estate is normal.
5. **Test one workflow end to end before you move the rest.** One real run, with real tools and real credentials, on the new home. If the export or rebuild drops a step, you want to find it on one workflow, not on ten at once.
6. **Move the prompts into code.** Anything stored as a reusable prompt object needs a new home in your own application before 30 November, or it goes with the API.

## Who this is for

It is for anyone who built a live workflow on the Agent Builder canvas — agencies running client agents, product teams with an internal agent, and solo builders who picked the canvas to avoid writing glue code. For them the deadline is real and the work is a few evenings, not a rewrite of their product.

It is not for anyone who only uses ChatKit, or who only calls the Responses API. Those stay. It is also not for anyone whose "Agent Builder workflow" is a demo from DevDay week that was never put into production — let that one go, and spend the time on the workflows that actually run.

Agent Builder lasted just over thirteen months. The lesson is not that visual builders fail — it is that a canvas owned by one vendor can close, and the workflows on it need a home you control. Export the code, keep the canvas where you can see it, and move before the date moves you.

## FAQ

**When does OpenAI Agent Builder shut down?**
30 November 2026, along with the Evals dashboard and API and the `v1/prompts` API for reusable prompts.

**When was the shutdown announced?**
3 June 2026, on OpenAI's deprecations page, covering Agent Builder, Evals and reusable prompts together.

**What stays after 30 November?**
ChatKit, the Agents SDK, the Responses API and MCP tooling. ChatKit remains available.

**What is OpenAI's recommended migration path?**
Export each workflow as Agents SDK code (Python or TypeScript), or move it to ChatGPT Workspace Agents. The export does not convert the workflow graph, and some behaviour may need manual recreation.

**Can I rebuild an Agent Builder workflow in n8n instead?**
Yes — that is the editorial alternative in this piece, not OpenAI's stated path. n8n is a visual canvas for multi-step agent workflows. There is no import from Agent Builder; you rebuild node by node and test each workflow again.

**What happens to my evals?**
They have been read-only since 31 October 2026 and shut down on 30 November. OpenAI points to Promptfoo as the migration path.
