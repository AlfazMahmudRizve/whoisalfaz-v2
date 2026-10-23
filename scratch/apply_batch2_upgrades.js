const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function upgradeManyChatTimeout() {
  const slug = 'manychat-n8n-async-timeout-fix';
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;
  const faqHeader = '## Frequently Asked Questions';
  const newFaqs = `
### What happens if an n8n webhook takes longer than 10 seconds in ManyChat?
If your webhook does not respond within ManyChat's strict 10-second window, ManyChat aborts the HTTP request, logs an external request timeout, and drops the subscriber out of the automated flow. To prevent dropped conversations, always use an asynchronous architecture where n8n returns an immediate 200 OK handshake within 200ms before processing intensive LLM or CRM logic in the background.

### How do you handle Meta's 24-hour messaging window in async n8n flows?
Meta requires all promotional and standard conversational messages to occur within a 24-hour window from the user's last inbound interaction. Because asynchronous n8n workflows usually finish within 5 to 60 seconds, they easily operate within this window. For updates beyond 24 hours, you must use pre-approved WhatsApp message templates or Meta Utility/Event Update message tags.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaqs);
  }

  const metaDesc = 'Fix ManyChat 10-second webhook timeouts in n8n with an asynchronous decoupled queue architecture. Learn immediate HTTP 200 handshakes and callback APIs.';
  
  await client.patch(post._id).set({
    body,
    metaDescription: metaDesc
  }).commit();
  console.log('✅ Updated:', slug);
}

async function upgradeManyChatAlternatives() {
  const slug = 'manychat-alternatives-2026-top-tools-by-use-case';
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  const ghlSection = `

## Best ManyChat Alternatives for Agencies & CRMs: GoHighLevel (LeadConnector)

For B2B agencies and SaaS consultants managing complex client pipelines, **GoHighLevel (LeadConnector)** is the primary enterprise alternative to ManyChat. While ManyChat excels at top-of-funnel Instagram DM gamification and story comment triggers, GoHighLevel provides full-stack CRM infrastructure:

| Evaluation Dimension | ManyChat | GoHighLevel (LeadConnector) |
| :--- | :--- | :--- |
| **Primary Strength** | Social chat gamification (IG, WhatsApp, TikTok) | All-in-one CRM, sales pipelines & client billing |
| **Social DM Builder** | Visual drag-and-drop conversational node canvas | Unified conversation inbox with automation workflows |
| **Agency Multi-Tenancy** | Individual client workspaces ($15-$99/mo each) | Unlimited client sub-accounts on Pro SaaS ($497/mo) |
| **Data Synchronization** | Requires external webhooks (n8n/Make) for CRM sync | Native calendar booking, SMS, pipeline lead scoring |
| **Recommended Strategy** | Top-of-funnel social capture engine | Core CRM database and conversion engine |

### The ManyChat to LeadConnector Integration Pattern
Rather than choosing one over the other, leading growth agencies use a hybrid architecture:
1. **ManyChat for Social Acquisition:** Capture Instagram story replies and reel comments with instant conversational flows.
2. **LeadConnector Webhook Sync:** When a user submits an email or phone number in ManyChat, an n8n webhook instantly formats the contact and pushes it into GoHighLevel via the LeadConnector API.
`;

  const targetHeader = '## Frequently Asked Questions (FAQ)';
  if (body.includes(targetHeader)) {
    body = body.replace(targetHeader, ghlSection + '\n\n' + targetHeader);
  } else {
    body = body + ghlSection;
  }

  const newFaqs = `
### Can GoHighLevel (LeadConnector) replace ManyChat?
GoHighLevel can replace ManyChat for standard multi-channel messaging and appointment booking. However, ManyChat remains superior for high-volume Instagram DM automations, such as keyword auto-replies on Reels and Story mentions. Most scaling agencies use ManyChat for top-of-funnel social acquisition and pipe leads into GoHighLevel via an n8n LeadConnector webhook bridge.

### How does the ManyChat to LeadConnector integration work?
When a subscriber provides their contact info in a ManyChat flow, ManyChat fires an HTTP POST webhook to n8n or Make. The automation middleware formats the lead payload and sends a POST request to GoHighLevel's LeadConnector API (\`/v1/contacts/\`), automatically updating pipeline stages, assigning tags, and triggering email/SMS workflows.
`;

  if (body.includes(targetHeader)) {
    body = body.replace(targetHeader, targetHeader + '\n' + newFaqs);
  }

  const newSeoTitle = 'Best ManyChat Alternatives [2026]: Top Chatbots Ranked'; // 55 chars
  const metaDesc = 'Explore the 12 best ManyChat alternatives in 2026 for Instagram DM, WhatsApp, and agency CRM automation. Compare GoHighLevel, Chatfuel, Botpress, and Tidio.';

  await client.patch(post._id).set({
    body,
    seoTitle: newSeoTitle,
    metaDescription: metaDesc
  }).commit();
  console.log('✅ Updated:', slug);
}

async function upgradeBgeEmbeddings() {
  const slug = 'open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark';
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  const faqHeader = '## Frequently Asked Questions';
  const newFaqs = `
### What is BGE-M3 and why is it popular for RAG pipelines?
BGE-M3 (BAAI General Embedding) is a leading open-source embedding model that natively supports dense retrieval, multi-vector retrieval (ColBERT style), and sparse lexical retrieval (BM25 style) in a single unified architecture. It supports multilingual contexts across 100+ languages with up to 8,192 token context windows, scoring near the top of the MTEB leaderboard.

### How does BGE-M3 compare to Voyage-3 on MTEB retrieval benchmarks?
Voyage-3 and Voyage-3-large consistently achieve state-of-the-art MTEB retrieval accuracy (scoring ~67.5 on NDCG@10), making them the gold standard for high-accuracy closed-source APIs. BGE-M3 delivers ~65.8 NDCG@10 while being 100% open-source and self-hostable via Docker/TEI, reducing embedding API costs to zero on high-throughput vector ingestion pipelines.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaqs);
  }

  const metaDesc = 'Benchmark open-source LLM embeddings for RAG in n8n: Compare BGE-M3, Voyage-3, and mxbai MTEB retrieval scores, inference latency, and Qdrant vector storage.';
  
  await client.patch(post._id).set({
    body,
    metaDescription: metaDesc
  }).commit();
  console.log('✅ Updated:', slug);
}

async function upgradeElevenLabs() {
  const slug = 'elevenlabs-n8n-voice-ai-sales-agent';
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  const faqHeader = '## Frequently Asked Questions';
  const newFaqs = `
### How do you build an autonomous n8n voice agent with ElevenLabs and Twilio?
An autonomous voice agent combines Twilio for telephony SIP/PSTN streaming, ElevenLabs Conversational AI for ultra-low latency speech-to-speech interaction, and n8n as the backend webhook tool executor. When the AI agent needs to check CRM availability or qualify a budget, it fires a Client Tool HTTP call to n8n, which queries your database and returns a real-time JSON answer back to the conversation loop.

### What is the audio latency when connecting ElevenLabs Conversational AI to n8n?
ElevenLabs Conversational AI delivers end-to-end speech latency of 350ms to 600ms over WebSocket streams using ultra-fast WebRTC and Opus codecs. Tool-calling latency depends on your n8n workflow execution time; caching CRM queries and deploying n8n on high-speed NVMe VPS servers ensures total round-trip tool execution stays below 200ms.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaqs);
  }

  const metaDesc = 'Build an autonomous voice AI sales agent with ElevenLabs, n8n, and Twilio. Step-by-step SOP for sub-second latency, tool calling, and CRM lead routing.';

  await client.patch(post._id).set({
    body,
    metaDescription: metaDesc
  }).commit();
  console.log('✅ Updated:', slug);
}

async function upgradeBrevoColdEmail() {
  const slug = 'brevo-cold-email-ip-warming-guide';
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  const faqHeader = '## Frequently Asked Questions';
  const newFaqs = `
### Does Brevo allow cold email outbound outreach?
Brevo officially operates an opt-in policy for its shared IP marketing tiers. However, enterprise and high-volume senders using **Dedicated IPs** via Brevo SMTP can execute outbound B2B campaigns provided strict DNS authentication (SPF, DKIM, DMARC), valid list hygiene, custom domain warmup, and bounce rates below 1.5% are maintained.

### How much does a Brevo dedicated IP cost and how fast can you warm it up?
A Brevo dedicated IP costs approximately $251/year ($20.90/month). Warming up a fresh dedicated IP requires a disciplined 30-day volume ramp: starting at 50–100 emails per day in Week 1, doubling volume weekly, and throttling hourly sends via an n8n orchestration loop to establish pristine reputation with Gmail and Microsoft filters.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaqs);
  }

  const metaDesc = 'Master Brevo cold email deliverability and dedicated IP warming. 30-day volume ramp schedule, SPF/DKIM/DMARC DNS configuration, and automated n8n throttling.';

  await client.patch(post._id).set({
    body,
    metaDescription: metaDesc
  }).commit();
  console.log('✅ Updated:', slug);
}

async function runAll() {
  console.log('🚀 Running Batch 2 Sanity Upgrades...');
  await upgradeManyChatTimeout();
  await upgradeManyChatAlternatives();
  await upgradeBgeEmbeddings();
  await upgradeElevenLabs();
  await upgradeBrevoColdEmail();
  console.log('🎉 All Batch 2 posts upgraded successfully!');
}

runAll().catch(console.error);
