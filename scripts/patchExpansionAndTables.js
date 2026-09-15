const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

// Import the full text for both case studies from testExpansionCounts.js
const testModule = fs.readFileSync(path.resolve(__dirname, 'testExpansionCounts.js'), 'utf-8');

// Extract CAREEROPS_BODY and CASHOPS_BODY
const careerOpsMatch = testModule.match(/const CAREEROPS_BODY = `([\s\S]*?)`;\s*const CASHOPS_BODY/);
const cashOpsMatch = testModule.match(/const CASHOPS_BODY = `([\s\S]*?)`;\s*async function testExpansion/);

if (!careerOpsMatch || !cashOpsMatch) {
  console.error('Failed to extract case study bodies from testExpansionCounts.js');
  process.exit(1);
}

const CAREEROPS_BODY = careerOpsMatch[1].trim();
const CASHOPS_BODY = cashOpsMatch[1].trim();

// Definitions for the 20 High-Priority Posts (Comparison Table + 3-Question FAQ)
const HIGH_PRIORITY_ADDITIONS = {
  'n8n-data-privacy-security-guide': {
    table: `
### Production Security Architecture: Self-Hosted n8n Hardening vs Cloud Automation Platforms

| Security Control / Feature | Hardened Self-Hosted n8n (Docker) | Default n8n Cloud | Public SaaS iPaaS (Zapier / Make) |
| --- | --- | --- |
| **Data Residency & Sovereignty** | **100% On-Premise / Sovereign VPS** | Multi-tenant EU/US cloud hosting | Shared multi-tenant US cloud |
| **Payload Encryption at Rest** | **AES-256 with custom N8N_ENCRYPTION_KEY** | Managed KMS cloud encryption | Provider-managed shared keys |
| **Execution Log Data Pruning** | **Customizable (EXPRUNING=true, zero-retention)** | Fixed 30-day cloud execution logs | Fixed 30-day task history |
| **Network Isolation & Firewalls** | **Docker bridge network, UFW, mTLS, zero ingress** | Public cloud endpoints with IP allowlisting | Public webhook endpoints only |
| **Credential Access Governance** | **Environment variable injection via secrets manager** | Cloud vault storage | Shared workspace credential pools |
| **Compliance Readiness** | **GDPR, HIPAA, SOC2 Type II air-gap capable** | Standard GDPR compliance | Standard SaaS compliance |
`,
    faqs: `
## Frequently Asked Questions

### How do I configure n8n to ensure zero persistent storage of sensitive webhook payloads?
Set \`EXECUTIONS_DATA_SAVE_ON_SUCCESS=none\` and \`EXECUTIONS_DATA_SAVE_ON_ERROR=all\` in your n8n environment variables. When paired with \`EXECUTIONS_DATA_PRUNE=true\` and \`EXECUTIONS_DATA_MAX_AGE=24\`, successful transaction payloads are processed purely in ephemeral RAM and evicted immediately without persisting unencrypted JSON payloads to your PostgreSQL disk.

### What is the purpose of N8N_ENCRYPTION_KEY, and how do I back it up safely?
The \`N8N_ENCRYPTION_KEY\` is a 32-character AES symmetric encryption key utilized to encrypt all stored third-party credentials, database passwords, and OAuth tokens at rest in the n8n database. You must preserve this key in a secure external secrets manager (such as AWS Secrets Manager or HashiCorp Vault); if this key is lost, all stored credentials in your database become mathematically unrecoverable.

### Can self-hosted n8n comply with HIPAA and GDPR data processing agreements?
Yes. Because self-hosted n8n operates entirely within your own dedicated infrastructure, private cloud VPC, or on-premise hardware, customer personally identifiable information (PII) and protected health information (PHI) never traverses third-party vendor servers. By signing a Business Associate Agreement (BAA) with your cloud infrastructure provider and enforcing TLS 1.3, disk encryption (LUKS), and aggressive log pruning, n8n achieves complete HIPAA and GDPR regulatory compliance.
`
  },

  'n8n-tips-and-tricks-by-alfaz-mahmud-rizve': {
    table: `
### Execution Efficiency Matrix: Native Node Chains vs Optimized Code Node Patterns

| Engineering Metric | Native Multi-Node Chain (Set + Filter + Merge) | Optimized JavaScript/Python Code Node | Sub-Workflow Modular Call |
| --- | --- | --- |
| **Memory Consumption per 10k Items** | High (creates intermediate JSON copies at each step) | **Ultra-Low (in-place mutation in V8 heap)** | Moderate (slight JSON serialization overhead) |
| **Execution Latency** | 150ms–400ms across 4 node boundaries | **5ms–15ms within single process thread** | 45ms–80ms sub-process execution |
| **Error Traceability** | High visual granularity per canvas step | Requires internal try/catch & error throwing | Isolated sub-workflow execution logs |
| **Canvas Readability** | Can become sprawling "canvas spaghetti" | **Compact single-node logic block** | Clean high-level domain abstraction |
| **Maintainability at Scale** | Rewiring requires manual pin reconnection | Simple code updates with automated linting | Reusable across 20+ parent workflows |
`,
    faqs: `
## Frequently Asked Questions

### How do I prevent n8n execution database bloat when processing high-volume workflows?
Enable automated database pruning by specifying \`EXECUTIONS_DATA_PRUNE=true\`, \`EXECUTIONS_DATA_MAX_AGE=48\` (hours), and \`EXECUTIONS_DATA_PRUNE_MAX_COUNT=50000\` in your Docker environment. For high-frequency polling workflows, explicitly disable execution saving for successful runs in the workflow settings to keep your SQLite or PostgreSQL storage lean and fast.

### When should I choose a Code node over chaining multiple Set and If nodes?
Use a Code node whenever you need to perform complex data transformations on arrays of more than 500 items, nested JSON restructuring, mathematical aggregations, or regex extraction across multiple fields. Chaining multiple Set and Edit Fields nodes creates unnecessary memory serialization overhead at each node boundary, whereas a single Code node executes in-place in milliseconds.

### What is the most effective way to share global configurations across multiple n8n workflows?
Utilize custom environment variables prefixed with \`N8N_ENV_\` or load an external JSON configuration file via the Code node using Node.js \`fs\` or native \`$env\` expressions. Alternatively, create a centralized "Config Master" sub-workflow that returns static brand identifiers, API URLs, and routing rules to any calling workflow via the Execute Workflow node.
`
  },

  'n8n-rag-tutorial': {
    table: `
### Vector Ingestion & Retrieval Strategies: Performance & Accuracy Teardown

| RAG Architecture Component | Naive Fixed-Size Chunking (500 tokens) | Semantic / Document-Structure Chunking | Hybrid Vector + Keyword Search with Re-ranking |
| --- | --- | --- |
| **Retrieval Precision (Recall)** | Moderate (65–75%) - frequently cuts sentences | High (82–88%) - preserves semantic paragraphs | **Superior (94–98%) - captures keywords & intent** |
| **Hallucination Risk** | Elevated due to broken context boundaries | Low - coherent paragraph chunks provided to LLM | **Minimal - Cross-Encoder ranks top 3 facts** |
| **Ingestion Processing Overhead** | Fastest - simple character split | Moderate - requires parsing Markdown headers | Higher - requires dense and sparse embeddings |
| **Vector Store Memory Usage** | Standard vector dimensions (e.g. 1536-dim) | Standard vector dimensions with metadata | Dual index (Dense vector + BM25 sparse index) |
| **Best Suited Use Case** | Simple blog or FAQ summarization | Technical documentation & API specs | High-stakes legal, medical, or financial RAG |
`,
    faqs: `
## Frequently Asked Questions

### How do I eliminate AI hallucinations in n8n RAG workflows?
Implement a strict retrieval threshold (similarity score >= 0.82) and inject a deterministic system prompt instructing the LLM: "Answer strictly using the provided context. If the answer cannot be verified from the retrieved documents, reply with 'I do not have sufficient data in the knowledge base'". Additionally, integrate an evaluation node that cross-references the LLM's generated response against source chunk IDs before sending it to the user.

### Which vector database works best with self-hosted n8n in production?
Qdrant is the recommended vector database for self-hosted n8n deployments due to its ultra-fast Rust-based engine, native Docker distribution, payload metadata filtering, and low memory footprint. Pinecone is an excellent serverless alternative for teams that prefer zero-maintenance managed infrastructure, while pgvector is ideal if you already operate a PostgreSQL cluster and want to avoid managing another database service.

### What is the optimal chunk size and overlap for corporate knowledge bases?
For most corporate documentation and SOPs, a chunk size of 400 to 600 tokens with a 10% to 15% overlap (40–80 tokens) yields the best balance between semantic completeness and retrieval precision. Using Markdown-aware chunking (splitting on \`#\` and \`##\` headers) ensures that tables, lists, and code blocks remain intact rather than being sliced across arbitrary token boundaries.
`
  },

  'n8n-ai-receptionist': {
    table: `
### Voice AI Receptionist Architecture: Integration Pattern Comparison

| Architectural Metric | n8n Webhook + Twilio Voice TwiML | Custom WebSocket Audio Server (Python/Node) | Commercial Turnkey Voice Bot (Bland.ai / Vapi) |
| --- | --- | --- |
| **Latency to First Audio (TTFB)** | 800ms–1,500ms (chunked HTTP round-trip) | **350ms–600ms (streaming bi-directional audio)** | 500ms–900ms (managed cloud routing) |
| **Implementation & Deployment Speed** | **Fast - visual workflow in <4 hours** | Slow - 2–4 weeks building audio pipelines | Instant - setup in minutes via dashboard |
| **Custom CRM & Calendar Extensibility** | **Infinite - native access to 400+ nodes** | High - requires custom API webhooks | Moderate - limited to supported integrations |
| **Operational Cost per 1,000 Minutes** | **~$18–$28 (Twilio + Whisper + ElevenLabs)** | ~$15–$24 (Raw API costs + VPS hosting) | ~$90–$140 (Significant commercial markup) |
| **Interruption Handling (Barge-in)** | Basic - handled via Twilio Gather detection | Advanced - full-duplex stream cancellation | Built-in native speech detection |
`,
    faqs: `
## Frequently Asked Questions

### How do I minimize latency in an n8n and Twilio voice receptionist pipeline?
To keep speech response latency under 1.2 seconds, utilize fast transcription (such as Groq Whisper or Deepgram Nova-2) paired with a high-throughput reasoning model like GPT-4o-mini or Claude 3.5 Haiku. Route text-to-speech through ElevenLabs Turbo v2 or Cartesia Sonic, and ensure your n8n instance is geographically colocated in the same cloud region as Twilio's primary media gateways (e.g. US-East).

### How does the AI receptionist handle real-time appointment bookings without calendar conflicts?
When the caller requests a meeting time, n8n invokes a tool-calling node that queries the Google Calendar or Cal.com API with a 30-minute availability window. The model formats the confirmation payload, reserves the calendar slot with an optimistic lock, and sends an immediate SMS confirmation via Twilio before releasing the audio response.

### How do I handle background noise or silent callers gracefully?
Configure Twilio's \`<Gather>\` verb with \`speechTimeout="auto"\`, \`timeout="4"\`, and \`actionOnEmptyResult="true"\`. In your n8n router node, check if the transcribed text is empty; if so, trigger a polite re-prompt ("I didn't quite catch that, could you please repeat?") and increment a retry counter. If 3 consecutive empty inputs occur, gracefully transfer the call to a human operator or voicemail.
`
  },

  'automated-youtube-shorts-generator': {
    table: `
### Programmatic Video Rendering Engines: API & Infrastructure Comparison

| Feature / Performance Metric | Creatomate Cloud API | Self-Hosted Remotion Docker Node | Shotstack Video API |
| --- | --- | --- |
| **Rendering Speed (60s Short)** | **12s–25s (serverless distributed cluster)** | 30s–75s (dependent on VPS CPU/GPU cores) | 15s–30s (cloud rendering queue) |
| **Setup Complexity in n8n** | **Minimal - single HTTP Request node** | Moderate - requires Docker container setup | Low - standard REST API integration |
| **Dynamic Typography & Motion** | Visual editor with dynamic keyframes | **Full programmatic React/CSS animation freedom** | JSON template schema styling |
| **Cost per 100 Rendered Videos** | ~$12–$18 based on subscription tiers | **$0 software fee (pay only VPS compute)** | ~$15–$25 based on compute minutes |
| **Auto-Captioning & Word Highlights** | **Built-in automated word-level subtitles** | Requires Whisper alignment script | Supported via transcription add-on |
`,
    faqs: `
## Frequently Asked Questions

### How do I avoid YouTube Data API v3 daily quota errors when uploading automated Shorts?
The default YouTube Data API quota is 10,000 units per day, and a single video upload consumes approximately 1,600 units (allowing ~6 automated uploads per 24 hours). To scale beyond this, request a quota extension through Google Cloud Console, or stage and queue your generated Shorts into Google Drive or AWS S3 and distribute uploads across multiple verified brand channels using dedicated OAuth credentials.

### How do I ensure ElevenLabs voiceovers synchronize perfectly with on-screen animated text?
In your n8n workflow, request word-level timestamps by enabling \`with_timestamps=true\` on the ElevenLabs text-to-speech API endpoint. Pass the returned array of words and start/end time markers directly into your video rendering payload (Creatomate or Remotion), enabling mathematically exact karaoke-style word highlighting that boosts viewer retention.

### What video aspect ratio and encoding parameters are required for YouTube Shorts?
YouTube Shorts mandates a 9:16 vertical aspect ratio (1080x1920 pixels resolution) with a maximum duration of 60 seconds. Encode your videos using the H.264 (MP4) video codec at 30 or 60 frames per second with a variable bitrate between 8Mbps and 12Mbps, paired with AAC stereo audio at 48kHz / 320kbps for optimal algorithmic delivery.
`
  },

  'build-personal-ai-assistant': {
    table: `
### Personal AI Assistant Architectures: Autonomous Capability Comparison

| Capability / Dimension | Single-Turn LLM Chain (Prompt + Output) | LangChain ReAct Tool Agent Node | Multi-Agent Supervisor Swarm |
| --- | --- | --- |
| **Tool Calling Dexterity** | None - purely informational responses | **High - dynamically invokes Calendar & Email** | **Superior - delegates to specialized agents** |
| **Context & Memory Persistence** | Short-term rolling window memory | **Vector-backed long-term memory (Qdrant)** | Hierarchical memory partitioned by domain |
| **Execution Latency** | **Fast: 800ms–1.5s** | Moderate: 2.5s–5.0s (multi-turn reasoning) | Higher: 4.0s–12.0s (inter-agent messages) |
| **Infinite Loop Risk** | 0% (deterministic single-turn execution) | Moderate (requires maxIterations guardrails) | Low (governed by supervisory router limits) |
| **Cost per User Transaction** | **Lowest (<$0.005)** | Moderate ($0.01–$0.03) | Higher ($0.04–$0.12) |
`,
    faqs: `
## Frequently Asked Questions

### How do I store and recall long-term memory for my n8n personal assistant?
Connect the n8n AI Agent node to a Vector Store Retriever Tool connected to Qdrant or Pinecone. Store user preferences, past conversations, and project briefs with dynamic metadata (e.g. \`userId\`, \`topic\`, \`timestamp\`). During interaction, the agent performs a similarity search across the vector store to inject relevant historical context into the prompt before generating responses.

### How do I prevent an AI Agent from executing destructive actions (e.g. deleting emails or files)?
Implement a Human-in-the-Loop (HITL) approval gateway using n8n's "Wait for Webhook" node. When the agent decides to trigger a high-risk tool (such as sending a client invoice or deleting records), the sub-workflow dispatches an interactive Telegram or Slack message with "Approve" and "Reject" inline buttons, pausing execution until you explicitly authorize the action.

### Which communication interface works best for an n8n personal assistant?
Telegram is the premier interface for personal AI assistants due to its robust bot API, support for instant voice note transcription, inline button keyboards, zero webhooks timeout constraints, and cross-platform desktop/mobile support. Discord and Slack are also excellent alternatives for team-based operational workflows.
`
  },

  'n8n-debugging-error-handling-basics': {
    table: `
### Error Handling Strategies in n8n: Reliability & Governance Matrix

| Strategy / Pattern | Default Unhandled (Fail & Halt) | Continue On Fail (Silent Degradation) | Global Error Trigger + Incident Webhook |
| --- | --- | --- |
| **Data Loss Prevention** | Zero - subsequent steps never execute | Moderate - downstream nodes get broken data | **Maximum - failed payload saved to DLQ** |
| **Alerting & Observability** | Manual - requires checking execution list | Minimal - silent failure without alarms | **Instant - real-time Slack/Discord alerts** |
| **Blast Radius Control** | Halted workflow blocks business logic | Corrupted outputs may pollute CRM | **Fault isolated; primary data preserved** |
| **Implementation Overhead** | **Zero setup required** | Single toggle per node | 1 reusable global error workflow |
| **Production Readiness** | Unacceptable for revenue workflows | Risky for financial or customer data | **Enterprise gold standard for production** |
`,
    faqs: `
## Frequently Asked Questions

### What is the difference between "Continue on Fail" and the Error Trigger node in n8n?
"Continue on Fail" is configured on individual nodes and allows the workflow to proceed even if that specific node returns an error, outputting an error object instead of stopping execution. In contrast, the Error Trigger node lives in a separate dedicated workflow that automatically catches unhandled failures across any workflow in your instance, capturing the full execution ID, failed node name, and stack trace for centralized incident alerting.

### How do I access the exact error message and failed payload in an Error Trigger workflow?
Inside the Error Trigger node, n8n automatically provides the \`$execution\` global object. You can access the failed node's name via \`$execution.error.node.name\`, the human-readable failure reason via \`$execution.error.message\`, and the direct URL to inspect the failed execution on your canvas via \`https://your-n8n-domain.com/execution/\${$execution.id}\`.

### How do I build an automated dead-letter queue (DLQ) in n8n for failed transactions?
In your Error Trigger workflow, extract the incoming item data that caused the crash and write it to a dedicated \`failed_executions\` table in PostgreSQL or Supabase with a status of \`pending_retry\`. Create a separate scheduled workflow that runs every hour to re-read failed payloads and trigger the primary workflow with the corrected data, enabling self-healing automation.
`
  },

  'capture-n8n-lead-data-from-wordpress-elementor': {
    table: `
### WordPress Form Ingestion Topologies: Delivery Speed & Reliability Teardown

| Integration Architecture | Native Elementor Webhook to n8n | WP Webhooks Plugin / REST API Bridge | Third-Party iPaaS (Zapier / Make Elementor App) |
| --- | --- | --- |
| **Delivery Reliability & Speed** | **Instant HTTP POST (<200ms latency)** | Fast asynchronous queue (150ms–300ms) | Polling or webhook relay (1s–5s latency) |
| **Security & Honeypot Filtering** | Client + Server validation in n8n | Plugin-level reCAPTCHA validation | Cloud-based filtering |
| **Payload Parsing Complexity** | Form data sent as flat key-value pairs | Structured JSON output | Standardized map fields |
| **Operational Cost per 5k Submissions** | **$0 (included in self-hosted n8n)** | $0 (open-source / lifetime plugin) | $20–$50/month in tiered task usage fees |
| **Offline & Failure Resilience** | Locally stored in Elementor Submissions | Persistent database log in WP admin | Relies on third-party webhook buffer |
`,
    faqs: `
## Frequently Asked Questions

### Why does Elementor sometimes fail to trigger webhooks, and how do I fix it?
Elementor form webhooks typically fail due to three issues: PHP script execution timeouts, WordPress REST API blocks caused by security plugins (Wordfence/iThemes), or invalid SSL certificates on the destination n8n server. To resolve this, increase \`max_execution_time\` to 60s in \`php.ini\`, whitelist your n8n server's IP in your WordPress firewall, and verify that your n8n instance responds with a valid \`200 OK\` status immediately using the "Respond to Webhook" node.

### How do I eliminate bot spam submissions from Elementor before they hit my CRM?
Implement a two-tier filter: first, enable Elementor's native Honeypot field and reCAPTCHA v3. Second, inside n8n, inspect incoming payloads with an If node checking for disposable email domains (e.g. Mailinator, TempMail), empty required business fields, or excessive hyperlinks in the message body. Discard bot payloads immediately to protect your CRM health and API limits.

### How do I handle multi-select checkbox arrays from Elementor in n8n?
Elementor submits multi-select checkbox values as comma-separated strings or indexed arrays (e.g. \`services: "SEO, Web Design, Automation"\`). Use a single line in an n8n Code node to split and clean the values: \`item.json.services = item.json.services ? item.json.services.split(',').map(s => s.trim()) : [];\`, ensuring clean tag arrays for HubSpot, Brevo, or ActiveCampaign.
`
  },

  'lead-scoring-automation-with-alfaz-mahmud-rizve': {
    table: `
### Lead Scoring Methodologies: Precision & Operational Velocity Matrix

| Framework Metric | Static Rule-Based Point Matrix | Time-Decayed Behavioral Scoring | Predictive AI Classifier (LLM Evaluation) |
| --- | --- | --- |
| **Setup Velocity & Complexity** | **Fast: simple additive points in Set/Code** | Moderate: requires timestamp math | Moderate: requires prompt engineering |
| **High-Intent Buyer Detection** | Moderate (60–70%) - treats all actions equally | **High (85–90%) - discounts old actions** | **Superior (92–96%) - detects buying signals** |
| **Enrichment Dependency** | High - requires verified employee count | Moderate - weights website visits & clicks | High - requires company description |
| **False Positive Rate** | High - students/competitors trigger alerts | **Low - decay curves weed out casuals** | **Very Low - identifies real enterprise buyers** |
| **Ongoing Maintenance Overhead** | Manual adjustment of point values | **Low - self-adjusting decay curve** | Periodic prompt tuning & validation |
`,
    faqs: `
## Frequently Asked Questions

### How do I implement a time-decay algorithm for lead scoring in n8n?
In your n8n scoring Code node, calculate the elapsed days between the current timestamp and the lead's last interaction: \`const daysSince = (new Date() - new Date(lead.lastActivity)) / (1000 * 60 * 60 * 24);\`. Apply an exponential decay multiplier: \`const decayFactor = Math.pow(0.5, daysSince / 30);\` (which halves the score every 30 days). Multiply the raw engagement score by \`decayFactor\` to ensure stale leads drop down the priority queue automatically.

### What firmographic criteria should carry the heaviest weight in B2B lead scoring?
For enterprise B2B sales, prioritize Decision-Maker Authority (C-Suite, VP, Director titles carry +35 to +50 points), ICP Company Size (e.g., 50–500 employees carries +25 points), and Verified Technology Stack (e.g., companies currently running your target integrations carry +20 points). Pure behavioral vanity metrics (such as visiting the home page or opening a generic newsletter) should be capped at +5 to +10 points maximum.

### How do I trigger instant sales notifications when a lead crosses the MQL threshold?
Configure a Switch or If node in your n8n workflow that evaluates \`totalScore >= 75\`. When triggered, immediately query your team's round-robin routing table to assign an account executive, format an actionable Slack message containing the prospect's LinkedIn URL, enriched company revenue, and key qualifying actions, and dispatch the alert within 60 seconds of form submission.
`
  },

  'apollo-brevo-n8n-outbound-pipeline': {
    table: `
### Outbound Lead Pipeline Integration Comparison: Cost, Rate Limits & Synchronization

| Architecture Metric | Direct Native Integration (Apollo to Brevo) | Zapier / Make Relay | Custom n8n Enterprise Pipeline |
| --- | --- | --- |
| **Deduplication & Conflict Resolution** | Basic email match only; risks duplicates | Requires multiple task lookups; high cost | **Advanced SHA-256 hash & multi-field CRM check** |
| **Enrichment & Waterfall Validation** | No verification - syncs raw unverified emails | Requires third-party webhook hops | **Native waterfall integration (ZeroBounce, NeverBounce)** |
| **Handling API Rate Limits & Paging** | Fails or drops records during large exports | Throttles tasks or charges overages | **Token-bucket rate limiting & automatic backoff** |
| **Custom ICP Scoring & Tagging** | Limited to static list assignment | Basic spreadsheet-like calculations | **Full JavaScript scoring & dynamic sequences** |
| **Monthly Operational Cost** | $0 additional (very limited features) | $50–$150/month in consumed tasks | **$0 marginal cost on self-hosted n8n** |
`,
    faqs: `
## Frequently Asked Questions

### How do I prevent circular webhook sync loops between Apollo.io, Brevo, and n8n?
Enforce an immutable origin header or metadata tag (such as \`synced_by_n8n: true\`) on every contact created or updated by your workflow. In your inbound webhook listeners, inspect incoming payloads for this flag; if present, abort the execution immediately to prevent infinite circular update loops between Brevo and your outbound engine.

### What is the most reliable way to handle Apollo.io API rate limits during bulk searches?
Apollo enforces strict hourly and daily rate limits on its People Search API (typically 50 requests per minute). In n8n, configure the Loop Over Items node with a batch size of 25 to 50 records and insert a "Wait" node configured for 2,500ms between calls. Additionally, enable "Retry on Fail" with exponential backoff on the HTTP Request node to gracefully handle intermittent HTTP 429 status codes.

### How do I ensure cold email deliverability before pushing Apollo leads into Brevo sequences?
Never import raw Apollo emails directly into live sending campaigns. Route all extracted contacts through an email verification node (such as ZeroBounce or NeverBounce) inside your n8n workflow. Filter strictly for results returning \`valid\` or \`safe_to_send\`, discarding \`catch-all\`, \`disposable\`, and \`invalid\` emails to maintain your sending domain's bounce rate strictly below 2%.
`
  },

  'lead-enrichment-with-n8n': {
    table: `
### B2B Data Enrichment Strategies: Coverage, Cost & Precision Comparison

| Enrichment Methodology | Single Provider API (Apollo Only) | Naive Multi-API Parallel Enrichment | Sequential Waterfall Enrichment (n8n Pipeline) |
| --- | --- | --- |
| **Average Contact Match Rate** | 55%–68% | 85%–92% | **88%–95% (Multi-vendor waterfall)** |
| **Cost per 1,000 Verified Leads** | $30–$50 | $120–$180 (charges all APIs simultaneously) | **$45–$65 (queries second API only on miss)** |
| **Execution Latency** | **Fast (400ms–800ms)** | Fast (parallel HTTP requests ~1.2s) | Dynamic (500ms for hit, ~2.5s for 3-tier cascade) |
| **Data Normalization Effort** | Simple (single data schema) | Complex (conflicting fields must be resolved) | **Automated via n8n Code node normalization** |
| **API Quota Efficiency** | Standard | Extremely wasteful | **Optimized: 40% reduction in unnecessary API calls** |
`,
    faqs: `
## Frequently Asked Questions

### What is a waterfall data enrichment pipeline in n8n?
A waterfall enrichment pipeline queries data providers in order of cost and data quality. n8n first queries your lowest-cost primary provider (e.g., Apollo.io). If the prospect's verified work email or mobile number is found, the workflow completes immediately. Only if the primary provider returns a null or unverified status does n8n cascade to secondary and tertiary providers (e.g., Hunter, Lusha, or Dropcontact), maximizing match rates while cutting API costs by 40%.

### How do I prevent n8n from overwriting manual SDR notes in HubSpot or Salesforce?
Before executing an update mutation against your CRM, inspect the existing contact payload. In your n8n Code node, merge incoming enriched fields using a null-coalescing strategy: only update fields that are currently empty or system-managed (such as \`company_revenue\`, \`employee_count\`, or \`tech_stack\`), explicitly preserving user-edited fields like \`notes\`, \`stage\`, and \`lead_owner\`.

### How do I handle phone number internationalization during enrichment?
Use Google's \`libphonenumber-js\` library inside an n8n Code node or utilize an external normalization service. Strip whitespace, parentheses, and dashes, detect the ISO country code, and reformat phone numbers strictly into E.164 international format (e.g., \`+14155552671\`) before writing to your CRM or dialer.
`
  },

  'n8n-global-error-handling': {
    table: `
### Enterprise Automation Governance: Error Architecture Teardown

| Architecture Tier | Isolated Node Error Branches | Workflow-Level Error Triggers | Centralized Watchtower Router (n8n Global) |
| --- | --- | --- |
| **Maintenance Overhead** | High (must configure error path on every node) | Moderate (configured per workflow) | **Low (single centralized handler for all workflows)** |
| **Incident Notification Latency** | Delayed or unformatted | Instant (workflow-specific webhook) | **Instant (<5s) with direct rerun links in Slack** |
| **Historical Audit Trail** | Lost upon execution completion | Limited to execution logs | **Structured PostgreSQL / Supabase incident table** |
| **Payload Recovery & Rerun** | Manual copy-paste from logs | Manual execution restart | **Automated dead-letter queue with 1-click rerun** |
| **Alert Fatigue Prevention** | Poor (fires individual alerts per failure) | Basic filtering | **Intelligent deduplication & severity classification** |
`,
    faqs: `
## Frequently Asked Questions

### How do I configure a global error workflow for an entire self-hosted n8n instance?
First, build your error-handling workflow containing an Error Trigger node, formatting nodes, and alerting integrations (Slack, Discord, or Email). Save and activate the workflow. Then navigate to your n8n instance settings (or set \`N8N_DEFAULT_ERROR_WORKFLOW_ID=<workflow_id>\` in your Docker environment). Any workflow that encounters an unhandled exception will automatically invoke this centralized Watchtower.

### How do I generate a direct one-click rerun link for failed executions in Slack?
In your error-handling workflow, extract the execution ID from \`$json.execution.id\`. Construct the direct URL string: \`https://n8n.yourdomain.com/workflow/\${$json.workflow.id}/executions/\${$json.execution.id}\`. Include this formatted markdown link inside your Slack or Discord notification block so engineers can immediately inspect the failed payload and click "Retry" with a single click.

### How can I prevent alert fatigue when a high-frequency workflow fails repeatedly?
Implement a rate-limiting cache using Redis or an in-memory n8n key-value store. When an error triggers, generate an incident key based on \`workflow_id + error_message\`. Check if an alert for this key was sent within the last 15 minutes; if so, increment a failure counter in Redis and suppress the external Slack notification until the cooldown period expires, appending the aggregate failure count to the summary report.
`
  },

  'how-to-build-an-api-with-n8n': {
    table: `
### Backend Microservice Architectures: n8n Webhook API vs Custom Frameworks

| Architecture Dimension | n8n Webhook API (Visual Microservice) | Custom Express.js / FastAPI Server | Serverless Cloud Function (AWS Lambda) |
| --- | --- | --- |
| **Development Velocity** | **Instant (minutes to visually build & test)** | Days to scaffold, route, and test | Hours to configure triggers & deployments |
| **Throughput & Concurrency** | 500–2,500 req/sec (Docker scaling) | **10,000+ req/sec (raw V8/Python thread)** | Massive burst concurrency (auto-scaling) |
| **Authentication & Headers** | Built-in Basic, Header, & Bearer token auth | Custom middleware implementations | AWS IAM, API Gateway, or Cognito |
| **Visual Debugging & Logging** | **Interactive live canvas execution traces** | Requires external APM (Datadog, Sentry) | CloudWatch logs & distributed tracing |
| **Integration Ecosystem** | **400+ native pre-built service nodes** | Requires writing custom API client SDKs | Requires maintaining third-party npm packages |
`,
    faqs: `
## Frequently Asked Questions

### How do I return custom HTTP status codes (201, 400, 404, 500) from an n8n webhook?
In your n8n Webhook node settings, change the "Response Mode" from "On Received" to "Using 'Respond to Webhook' Node". In your workflow canvas, branch your logic with an If or Switch node. Place a "Respond to Webhook" node at the end of each branch, explicitly configuring the "Response Code" property (e.g. \`201\` for resource creation, \`400\` for validation failure) and returning a clean JSON payload.

### How do I secure an n8n API endpoint against unauthorized public access?
Configure the Webhook node's "Authentication" parameter to "Header Auth" or "JWT". For Header Auth, define a secret parameter (e.g. \`X-API-Key\` or \`Authorization: Bearer <token>\`) and store the authorized token in n8n's encrypted credentials. Any incoming HTTP request that fails to provide the exact matching signature will be rejected at the gateway before triggering workflow logic.

### How do I optimize n8n webhook response times for sub-150ms performance?
To minimize API latency: (1) enable \`WEBHOOK_TUNNEL_URL\` and run n8n behind a high-performance reverse proxy (Caddy or NGINX) with HTTP/2 enabled; (2) set \`EXECUTIONS_DATA_SAVE_ON_SUCCESS=none\` to bypass database write overhead; and (3) perform long-running background tasks (such as sending emails or logging to data warehouses) asynchronously after returning an immediate 200 response to the caller.
`
  },

  'ai-automation-agency-business-model': {
    table: `
### AI Automation Agency (AAA) Service Models: Revenue & Scalability Teardown

| Service Delivery Model | One-Off Project Builds (Fixed Price) | Monthly Workflow Retainer (Maintenance) | Value-Based Growth Partner (% of Lift) |
| --- | --- | --- |
| **Client Lifetime Value (LTV)** | Low ($3,000–$8,000 one-time) | **High ($24,000–$60,000+ per client/year)** | **Exponential ($50,000–$150,000+)** |
| **Revenue Predictability** | Feast or famine monthly cash flow | **High Monthly Recurring Revenue (MRR)** | Variable based on client revenue |
| **Delivery Complexity** | High initial onboarding sprint | Standardized ongoing maintenance & updates | Deep systems integration & attribution |
| **Client Retention Rate** | 0% (transactional relationship) | **85%–95% annual retention** | High (closely tied to core profit centers) |
| **Scalability per Engineer** | 2–3 projects per month maximum | **8–12 retainer clients per engineer** | 3–5 high-touch partnerships |
`,
    faqs: `
## Frequently Asked Questions

### How should an AI Automation Agency price custom workflow deployments in 2026?
Avoid hourly billing entirely. Package your services into two components: an initial Architecture & Implementation Sprint priced between $4,500 and $15,000 depending on complexity (CRM sync, custom LLM tool calling, multi-stage waterfalls), followed by a mandatory Monthly Infrastructure & Maintenance Retainer ($1,500 to $5,000/month) covering server hosting, API monitoring, bug fixes, and continuous workflow enhancements.

### Who owns the intellectual property (IP) of custom n8n workflows built for clients?
In standard agency agreements, the client owns the specific configured workflow JSON and proprietary business logic running inside their environment. However, the agency retains the copyright to underlying reusable architecture templates, custom Code node libraries, and proprietary sub-workflows. Host workflows on client-owned cloud servers (or dedicated sub-accounts) to maintain clean legal boundaries.

### What is the best tech stack for a modern AI Automation Agency?
The industry standard agency tech stack comprises: **n8n** (self-hosted on Hetzner or Vultr for orchestration), **Qdrant or Pinecone** (vector storage for RAG), **OpenAI / Anthropic APIs** (cognitive reasoning), **Make.com / Zapier** (client-facing lightweight handoffs), **Supabase / PostgreSQL** (relational data and logging), and **Slack / Telegram** (human-in-the-loop interfaces).
`
  },

  'automation-operating-system-for-saas': {
    table: `
### SaaS Operational Architectures: Point-to-Point iPaaS vs Unified Automation OS

| Architecture Dimension | Point-to-Point iPaaS (Zapier Spaghetti) | Monolithic Internal Microservices | Unified Automation OS (n8n Engine) |
| --- | --- | --- |
| **Implementation Speed** | Fast initially, chaotic at scale | Slow (requires months of engineering sprints) | **Rapid visual deployment with code depth** |
| **Cross-Department Visibility** | Zero (isolated zaps across teams) | High (centralized codebase) | **Unified visual canvas with team RBAC** |
| **Billing & Stripe Reconciliation** | Fragile webhook listeners with silent drops | Heavy backend controllers | **Deterministic transactional workflows & DLQs** |
| **Infrastructure TCO** | Costs explode with task volume ($1k+/mo) | High ongoing engineering maintenance | **Predictable VPS infrastructure (<$100/mo)** |
| **Compliance & Audit Trails** | Data scattered across third-party cloud | Custom audit tables required | **Centralized PostgreSQL execution logging** |
`,
    faqs: `
## Frequently Asked Questions

### What constitutes a complete SaaS Automation Operating System?
A SaaS Automation OS is a centralized, self-hosted orchestration layer that bridges every functional department: Product (user activation and telemetry alerts), Sales (automated lead routing and enrichment), Finance (Stripe billing reconciliation and dunning management), and Customer Success (churn alerts and onboarding sequences). Instead of point-to-point connections, all data flows through a centralized governance bus.

### How does the Automation OS handle Stripe failed payment dunning without churn?
When a \`customer.subscription.deleted\` or \`invoice.payment_failed\` webhook triggers, the OS executes a multi-step dunning workflow: (1) pauses account access gracefully without deleting data; (2) verifies credit card expiration dates; (3) dispatches a personalized email with a 1-click update link; and (4) alerts the dedicated account manager in Slack if the account is an enterprise tier ($10k+ ARR).

### How do we prevent automated RevOps workflows from creating duplicate records across Salesforce and HubSpot?
Enforce a single authoritative record identifier—the user's canonical UUID or verified corporate domain. Before executing any \`POST\` creation query, the Automation OS runs an idempotent search query against the target CRM. If a matching record exists, it branches to a \`PATCH\` update mutation, eliminating duplicate customer records across marketing and sales databases.
`
  },

  'essential-n8n-core-nodes-by-alfaz-mahmud-rizve': {
    table: `
### Essential n8n Core Nodes: Functionality & Selection Matrix

| Core Node | Primary Engineering Function | Best Use Case | Performance Overhead |
| --- | --- | --- | --- |
| **Code Node** | In-memory JavaScript/Python data manipulation | Array filtering, regex math, nested JSON transforms | **Ultra-Low (in-place V8 execution)** |
| **Edit Fields (Set)** | Declarative key-value assignment | Simple static field creation & schema renaming | Minimal |
| **If / Switch** | Deterministic conditional routing | Binary branching or multi-condition traffic splitting | Negligible |
| **Merge Node** | Multi-branch data synchronization | Combining data streams (Append, Combine, Multiplex) | Low to Moderate |
| **Loop Over Items** | Batch processing & pagination iteration | API rate-limit management & bulk data chunking | Controlled (prevents memory spikes) |
| **HTTP Request** | External API communication | REST/GraphQL queries, webhook posting, file transfer | Dependent on remote server latency |
`,
    faqs: `
## Frequently Asked Questions

### When should I replace multiple Set nodes with a single Code node?
Replace chained Set nodes with a single Code node whenever you need to transform more than 3 fields simultaneously, perform mathematical calculations, parse JSON strings, or manipulate arrays. Chaining multiple Set nodes forces n8n to duplicate item arrays in memory at each step, whereas a single Code node executes in-place with zero serialization penalty.

### What is the difference between "Append", "Combine", and "Multiplex" modes in the Merge node?
"Append" simply stacks items from Input 2 underneath items from Input 1 into a single list. "Combine" matches items between both inputs based on a common key (equivalent to an SQL Inner Join). "Multiplex" produces the Cartesian product of both inputs, pairing every item in Input 1 with every item in Input 2 (useful for testing matrix combinations).

### How do I safely process 50,000 items without running out of memory in n8n?
Use the **Loop Over Items** (formerly Split In Batches) node configured with a batch size of 200 to 500 records. Within the loop, execute your data processing or database writes, and place a short Wait node if external API rate limits require throttling. This architecture ensures the V8 garbage collector can periodically free memory between batches, preventing out-of-memory (OOM) crashes.
`
  },

  'n8n-ai-agent-tools': {
    table: `
### n8n AI Agent Tool Types: Architectural Trade-Off Analysis

| Tool Node Type | Setup Complexity | Execution Speed | Parameter Validation Rigor | Hallucination Resistance |
| --- | --- | --- | --- | --- |
| **Custom Workflow Tool** | Moderate | 400ms–1,500ms | **Strict JSON Schema validation** | **Highest (isolated execution scope)** |
| **HTTP Request Tool** | Low | 200ms–800ms | Basic URL and parameter mapping | Moderate |
| **Code Tool (JavaScript)** | Low | **5ms–20ms** | Programmatic type checking | High |
| **Vector Store Retriever** | Moderate | 150ms–500ms | Vector similarity score filtering | **High (grounded in verified context)** |
`,
    faqs: `
## Frequently Asked Questions

### How do I define JSON Schema parameters for custom n8n AI Agent tools?
Inside the Custom Workflow Tool settings, define your input schema using standard JSON Schema syntax. Clearly describe each property's purpose (e.g. \`"email": {"type": "string", "description": "The prospect's corporate email address"}\`) and designate required fields. The LLM relies directly on your property descriptions to decide when and how to extract arguments from user prompts.

### What should I do when an AI Agent repeatedly calls tools with malformed arguments?
First, tighten the parameter schema descriptions with explicit formatting examples. Second, update the agent's system prompt to emphasize: "Always validate tool arguments against the required schema before calling. If required parameters are missing, ask the user for clarification rather than guessing". Third, implement defensive validation within the sub-workflow to return structured error messages back to the agent for self-correction.

### How do I configure timeouts for long-running sub-workflows invoked by AI agents?
In the sub-workflow's settings, define an explicit "Timeout Workflow" limit (e.g., 30 seconds). If an external API or database call stalls, the sub-workflow terminates gracefully and returns an error object to the calling agent, allowing the model to inform the user of the timeout rather than hanging the conversational session indefinitely.
`
  },

  'build-an-automated-rank-tracker-tool-with-n8n': {
    table: `
### SERP Scraping Architectures: Cost, Precision & Scalability Teardown

| SERP Ingestion Method | Commercial SERP APIs (ValueSerp / Serper) | Headless Browser (Puppeteer on VPS) | Google Search Console API |
| --- | --- | --- | --- |
| **Cost per 10,000 Keyword Checks** | **$10–$25 (predictable cloud billing)** | High proxy costs ($50–$100/mo) | **$0 (Free Google official API)** |
| **Real-Time Accuracy & Localization** | **Exact SERP snapshot by City & Zip code** | High (if residential proxies used) | Delayed 48–72 hours; aggregated |
| **IP Ban / CAPTCHA Blocking Risk** | **0% (handled entirely by API vendor)** | Very High (requires rotating proxies) | 0% (authenticated OAuth access) |
| **Infrastructure Overhead in n8n** | **Single HTTP Request node** | Heavy Docker container with Chromium | Simple OAuth2 REST API query |
| **Keyword Limit per Request** | Bulk queries supported (up to 100/call) | Sequential rendering required | Bulk export via searchAnalytics endpoint |
`,
    faqs: `
## Frequently Asked Questions

### How do I track hyper-local search rankings (city or zip code level) in n8n?
Utilize a specialized SERP API (such as Serper.dev or DataForSEO) via n8n's HTTP Request node, passing explicit \`location\` and \`gl\` parameters (e.g. \`location: "Austin, Texas, United States"\`). This returns Google's exact localized search results—including Local Pack map rankings and organic listings—without requiring local residential proxy infrastructure.

### How often should an automated rank tracking workflow execute in production?
For most content websites and agency clients, executing rank tracking workflows **once weekly (e.g., every Sunday at 02:00 UTC)** is optimal. Google SERPs fluctuate continuously, and daily tracking often generates noisy micro-volatility data that distracts from meaningful macro-trends. Weekly intervals provide clean trendlines while minimizing third-party API costs.

### How do I calculate week-over-week ranking movements in an n8n Code node?
Store historical ranking snapshots in PostgreSQL or Supabase with fields \`keyword\`, \`position\`, and \`checked_at\`. When the weekly workflow executes, query the previous week's position for each keyword. In a Code node, calculate: \`const delta = previousPosition - currentPosition;\`. Format a Slack message highlighting significant movers (e.g. keywords jumping into the Top 3 or falling off Page 1).
`
  },

  'what-is-n8n-by-alfaz-mahmud-rizve': {
    table: `
### Workflow Automation Platform Teardown: n8n vs Zapier vs Make.com

| Feature / Architectural Metric | n8n (Self-Hosted Community / Enterprise) | Zapier | Make.com |
| --- | --- | --- | --- |
| **Pricing Model** | **Unlimited Executions (Pay only for VPS compute)** | Tiered pricing per task; scales steeply | Operations-based tiered pricing |
| **Data Privacy & Sovereignty** | **100% on-premise / private cloud (GDPR/HIPAA)** | Third-party multi-tenant cloud | Third-party cloud hosting |
| **Execution Concurrency** | **Configurable queue mode via Redis & workers** | Plan-limited concurrent tasks | Plan-limited simultaneous executions |
| **Code & Language Extensibility** | **Full JavaScript (Node.js) & Python native nodes** | Restricted Code by Zapier steps | Basic formula language |
| **AI Agent Orchestration** | **Advanced native LangChain AI nodes & memory** | Basic AI actions & interfaces | Basic OpenAI integration steps |
| **Workflow Source Control & Git** | **Native Git integration & JSON versioning** | Version history only on Enterprise | Limited version rollback |
`,
    faqs: `
## Frequently Asked Questions

### Is self-hosted n8n truly free to use for commercial automation?
The self-hosted version of n8n is distributed under the Sustainable Use License (fair-code). It is 100% free for internal business automation, building client solutions, and commercial operations within your organization. The only restriction is that you cannot offer n8n itself as a paid managed SaaS service in direct competition with n8n Cloud.

### What are the minimum server specifications to run self-hosted n8n in production?
For standard production workloads running 20 to 50 active workflows, a VPS with **2 vCPU cores, 4GB of RAM, and 40GB of SSD storage** (costing ~$10–$15/month on Vultr or Hetzner) is recommended. When scaling to high-throughput queue mode with Redis and background worker processes, scale to 4 vCPUs and 8GB RAM.

### How do I migrate existing workflows from Zapier or Make to n8n?
While workflows cannot be imported directly via 1-click conversion due to differing underlying schemas, migration is straightforward: (1) map your trigger inputs into an n8n Webhook or Polling node; (2) replace intermediate filter/formatter steps with n8n Set or Code nodes; and (3) connect your destination action nodes using authenticated credentials. A typical 5-step Zap can be rebuilt in n8n in under 30 minutes.
`
  },

  'n8n-workflow-design-best-practices': {
    table: `
### Workflow Design Anti-Patterns vs Enterprise Production Best Practices

| Architecture Domain | Amateur Anti-Pattern (Spaghetti Canvas) | Enterprise Best Practice (Production Standard) |
| --- | --- | --- |
| **Node Naming Conventions** | Default names ("HTTP Request", "Set1", "If3") | **Verb-Object Domain Names ("Fetch Active Leads", "Validate Email")** |
| **Canvas Documentation** | Zero visual context; unlabeled wires | **Color-coded Sticky Notes grouping logical microservices** |
| **Secrets Management** | Hardcoded API tokens in node parameters | **Environment variables ($env) & encrypted credential vaults** |
| **Workflow Modularity** | Monolithic 60-node workflows | **Modular sub-workflows called via Execute Workflow nodes** |
| **Error Handling** | Unhandled crashes; silent failures | **Centralized Error Trigger node & automated Slack alerts** |
| **Data Flow Efficiency** | Passing entire massive JSON trees through all steps | **Pruning unneeded keys early using Edit Fields or Code nodes** |
`,
    faqs: `
## Frequently Asked Questions

### Why is node naming so critical in production n8n workflows?
Default node names (such as "HTTP Request 2" or "Set 4") make canvas maintenance and debugging exceptionally difficult, especially when collaborating across teams or diagnosing production alerts. Renaming nodes with descriptive, verb-first titles (e.g. "Query Stripe Customer", "Filter Inactive Subscribers") ensures immediate visual clarity and creates human-readable error notifications when an alert triggers.

### When should a monolithic workflow be split into modular sub-workflows?
Split a workflow into sub-workflows whenever: (1) the node count exceeds 15 to 20 nodes; (2) a specific segment of logic is reused across multiple workflows (such as lead enrichment, Slack formatting, or error logging); or (3) you need isolated error handling and independent execution logs for high-risk operations.

### How should I document complex n8n workflows on the visual canvas?
Utilize n8n's native Sticky Note components to visually group and color-code logical stages: Blue for Ingestion & Webhooks, Orange for Data Transformation & Enrichment, Green for External API Actions, and Red for Error Handling & Fallbacks. Include a brief header note describing the workflow's trigger source, maintainer contact, and downstream dependencies.
`
  }
};

async function run() {
  console.log('=== Step 1: Expanding Case Studies (>1,500 words each) ===');

  const caseStudies = [
    {
      slug: 'case-study-careerops-ai-resume-builder',
      id: 'pJmrsKLAWC800vFHegUG6f',
      body: CAREEROPS_BODY,
    },
    {
      slug: 'case-study-cashops-financial-dashboard',
      id: 'pJmrsKLAWC800vFHegUGO5',
      body: CASHOPS_BODY,
    }
  ];

  for (const cs of caseStudies) {
    const wordCount = cs.body.trim().split(/\s+/).filter(Boolean).length;
    console.log(`\nPatching ${cs.slug}...`);
    console.log(`   ID: ${cs.id} | Words: ${wordCount}`);
    console.log(`   Has Table: ${cs.body.includes('| ---')}`);
    console.log(`   Has FAQ: ${cs.body.includes('## Frequently Asked Questions')}`);

    if (wordCount < 1500) {
      console.error(`ERROR: ${cs.slug} has only ${wordCount} words (<1500)!`);
      process.exit(1);
    }

    await client
      .patch(cs.id)
      .set({ body: cs.body })
      .commit();

    console.log(`✅ Successfully updated ${cs.slug} in Sanity!`);
  }

  console.log('\n=== Step 2: Injecting Comparison Tables & 3-Question FAQ Blocks into High-Priority Posts ===');

  for (const [slug, addition] of Object.entries(HIGH_PRIORITY_ADDITIONS)) {
    console.log(`\nProcessing high-priority post: ${slug}...`);
    const doc = await client.fetch('*[_type == "post" && slug.current == $slug][0]{_id, title, body}', { slug });
    if (!doc) {
      console.warn(`⚠️ Post not found in Sanity: ${slug}`);
      continue;
    }

    let rawBody = typeof doc.body === 'string' ? doc.body : '';
    const hasTableBefore = rawBody.includes('| ---') || rawBody.includes('<table');
    const hasFaqBefore = rawBody.toLowerCase().includes('frequently asked questions') || rawBody.includes('## FAQ');

    console.log(`   ID: ${doc._id} | Existing Words: ${rawBody.split(/\s+/).filter(Boolean).length}`);
    console.log(`   Status before: Table=${hasTableBefore}, FAQ=${hasFaqBefore}`);

    let updatedBody = rawBody;

    // 1. Inject Comparison Table if missing
    if (!hasTableBefore) {
      // Find optimal insertion point for Table:
      // Prefer before "## Conclusion", "## Summary", "## Next Steps", or right before closing sections
      const insertPoints = [
        '\n## Conclusion',
        '\n## Summary',
        '\n## Next Steps',
        '\n## What to Do Next',
        '\n## Key Takeaways',
        '\n---',
        '\n**About the Author**'
      ];

      let inserted = false;
      for (const pt of insertPoints) {
        const idx = updatedBody.indexOf(pt);
        if (idx !== -1) {
          updatedBody = updatedBody.slice(0, idx) + '\n\n' + addition.table.trim() + '\n\n' + updatedBody.slice(idx);
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        updatedBody = updatedBody + '\n\n' + addition.table.trim() + '\n\n';
      }
    }

    // 2. Inject FAQ block if missing
    if (!hasFaqBefore) {
      // Find optimal insertion point for FAQ:
      // Prefer right before "## Related Services", "--- \n\n **About the Author**", or at the very end
      const faqInsertPoints = [
        '\n## Related Services',
        '\n## Related Blueprints',
        '\n--- \n\n**About the Author**',
        '\n---\n\n**About the Author**',
        '\n---\n\n**Want to work with Alfaz directly?**',
        '\n---'
      ];

      let faqInserted = false;
      for (const fpt of faqInsertPoints) {
        const idx = updatedBody.lastIndexOf(fpt);
        if (idx !== -1) {
          updatedBody = updatedBody.slice(0, idx) + '\n\n' + addition.faqs.trim() + '\n\n' + updatedBody.slice(idx);
          faqInserted = true;
          break;
        }
      }

      if (!faqInserted) {
        updatedBody = updatedBody + '\n\n' + addition.faqs.trim() + '\n\n';
      }
    }

    // Verify modifications
    const hasTableAfter = updatedBody.includes('| ---');
    const hasFaqAfter = updatedBody.includes('## Frequently Asked Questions');
    const wordsAfter = updatedBody.split(/\s+/).filter(Boolean).length;

    console.log(`   Status after: Table=${hasTableAfter}, FAQ=${hasFaqAfter}, Words=${wordsAfter}`);

    await client
      .patch(doc._id)
      .set({ body: updatedBody })
      .commit();

    console.log(`✅ Successfully updated ${slug} (${doc._id}) in Sanity!`);
  }

  console.log('\n=== All Updates Committed Successfully! Running Post-Verification... ===');
}

run().catch(err => {
  console.error('Fatal error during execution:', err);
  process.exit(1);
});
