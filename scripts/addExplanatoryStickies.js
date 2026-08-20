const fs = require('fs');
const path = require('path');

// 1. Upgrade ManyChat Template with Comprehensive Sticky Notes
function upgradeManychatTemplate() {
  const filePath = path.resolve(__dirname, '../ecosystem/n8n-templates/manychat-async-timeout-handler.json');
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Filter out any old sticky node
  const nonStickyNodes = raw.nodes.filter(n => !n.type.includes('sticky'));

  const stickyNotes = [
    {
      parameters: {
        content: `## ⚡ ManyChat Async Webhook Timeout Handler
**Author:** Alfaz Mahmud Rizve ([whoisalfaz.me](https://whoisalfaz.me))
**Category:** Chatbots / AI SDR / WhatsApp Automation

### 💡 Overview
ManyChat enforces a strict **10-second timeout** on external webhooks. If an automation (LLM synthesis, CRM lookups, DB queries) takes longer than 10s, ManyChat marks the step as failed.

### 🚀 The Solution
This workflow immediately returns an **HTTP 200 OK (<150ms)** handshake to satisfy ManyChat, then executes AI lead scoring, Brevo CRM contact sync, and pushes a personalized WhatsApp reply asynchronously via ManyChat's API.`,
        height: 280,
        width: 480,
        color: 5
      },
      id: "sticky-overview",
      name: "Sticky: Overview & Architecture",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [100, -320]
    },
    {
      parameters: {
        content: `### 🔑 Credentials Setup
Ensure these environment variables or credentials are configured:
- **OpenAI API Key**: For GPT-4o-mini message generation
- **Brevo API Key**: For CRM contact creation & scoring
- **ManyChat API Key**: Access token for WhatsApp sendContent API
- **Slack Webhook URL**: For SDR hot lead alerts`,
        height: 280,
        width: 380,
        color: 7
      },
      id: "sticky-credentials",
      name: "Sticky: Setup & Credentials",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [620, -320]
    },
    {
      parameters: {
        content: `### 1. Ingestion & Fast Handshake (<150ms)
- **Webhook Ingest**: Receives subscriber data from ManyChat.
- **Respond to Webhook**: Returns instant HTTP 200 OK to bypass the 10-second timeout ceiling while n8n continues processing in the background.`,
        height: 220,
        width: 420,
        color: 4
      },
      id: "sticky-step-1",
      name: "Sticky: Step 1 Ingestion",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [80, 20]
    },
    {
      parameters: {
        content: `### 2. Lead Qualification & Scoring
Extracts custom fields (budget, timeline, intent), validates phone/email, and assigns an algorithmic lead score (Hot, Warm, Nurture).`,
        height: 220,
        width: 240,
        color: 2
      },
      id: "sticky-step-2",
      name: "Sticky: Step 2 Lead Scoring",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [560, 20]
    },
    {
      parameters: {
        content: `### 3. Parallel AI Generation & CRM Sync
- **AI WhatsApp Copy**: Uses GPT-4o-mini to draft a context-aware reply.
- **Brevo CRM**: Upserts the lead with tags and lead score in parallel.`,
        height: 380,
        width: 320,
        color: 6
      },
      id: "sticky-step-3",
      name: "Sticky: Step 3 AI & CRM",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [840, -100]
    },
    {
      parameters: {
        content: `### 4. WhatsApp Delivery & Alerts
- **Format Payload**: Prepares text and contact IDs.
- **ManyChat Callback**: Pushes WhatsApp message via \`sendContent\` API.
- **Slack Alert**: Alerts sales team if lead is scored as HOT.`,
        height: 380,
        width: 580,
        color: 1
      },
      id: "sticky-step-4",
      name: "Sticky: Step 4 WhatsApp Push",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [1200, -100]
    },
    {
      parameters: {
        content: `### ⚠️ Error Catch & Monitoring
Catches failed API handshakes or network drops and routes diagnostic logs to your designated error channel.`,
        height: 200,
        width: 360,
        color: 3
      },
      id: "sticky-step-5",
      name: "Sticky: Error Handling",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [1200, 320]
    }
  ];

  raw.nodes = [...stickyNotes, ...nonStickyNodes];
  fs.writeFileSync(filePath, JSON.stringify(raw, null, 2));
  console.log('✅ Successfully upgraded ManyChat template with 7 explanatory sticky notes!');
}

// 2. Upgrade Apollo to Brevo Template
function upgradeApolloTemplate() {
  const filePath = path.resolve(__dirname, '../ecosystem/n8n-templates/apollo-to-brevo-enrichment-pipeline.json');
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const nonStickyNodes = raw.nodes.filter(n => !n.type.includes('sticky'));

  const stickyNotes = [
    {
      parameters: {
        content: `## 🚀 Apollo.io to Brevo B2B Lead Enrichment Pipeline
**Author:** Alfaz Mahmud Rizve ([whoisalfaz.me](https://whoisalfaz.me))
**Category:** Sales & Lead Generation / RevOps

### 💡 Overview
Automates inbound B2B lead enrichment. Captures form webhooks, filters out consumer emails (Gmail, Yahoo), enriches prospect and company intelligence via Apollo.io, scores ICP fit, and syncs contacts into Brevo CRM.`,
        height: 280,
        width: 480,
        color: 5
      },
      id: "sticky-apollo-overview",
      name: "Sticky: Overview",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [100, -320]
    },
    {
      parameters: {
        content: `### 🔑 Credentials Setup
- **Apollo API Key**: For People & Organization match endpoints
- **Brevo API Key**: For contact upsert and list segmentation
- **Slack Webhook URL**: For Enterprise ICP notifications`,
        height: 280,
        width: 340,
        color: 7
      },
      id: "sticky-apollo-creds",
      name: "Sticky: Credentials",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [620, -320]
    },
    {
      parameters: {
        content: `### 1. Ingestion & Security Validation
- Receives inbound lead webhook from website or landing page.
- Validates cryptographic HMAC signature and prevents circular sync loops via \`AUTOMATION_ORIGIN\`.`,
        height: 200,
        width: 360,
        color: 4
      },
      id: "sticky-apollo-step-1",
      name: "Sticky: Ingestion & Validation",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [80, 50]
    },
    {
      parameters: {
        content: `### 2. Corporate Domain Filter
Filters out 15+ generic email domains (gmail, yahoo, hotmail, proton) to protect Apollo API credits for genuine corporate inbounds.`,
        height: 200,
        width: 240,
        color: 2
      },
      id: "sticky-apollo-step-2",
      name: "Sticky: Domain Filter",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [480, 50]
    },
    {
      parameters: {
        content: `### 3. Apollo Match & ICP Scoring
- Enriches job title, seniority, company headcount, revenue, and industry.
- Calculates a 100-point ICP Score to separate Tier 1 Enterprise from standard leads.`,
        height: 240,
        width: 440,
        color: 6
      },
      id: "sticky-apollo-step-3",
      name: "Sticky: Apollo Match",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [760, 50]
    },
    {
      parameters: {
        content: `### 4. CRM Ingestion & Tier Routing
- Syncs enriched data to Brevo CRM.
- Automatically routes lead into Tier 1 Enterprise List vs Standard Nurture Pool.
- Pushes instant Slack notification for high-value prospects.`,
        height: 240,
        width: 500,
        color: 1
      },
      id: "sticky-apollo-step-4",
      name: "Sticky: CRM Sync",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [1240, 50]
    }
  ];

  raw.nodes = [...stickyNotes, ...nonStickyNodes];
  fs.writeFileSync(filePath, JSON.stringify(raw, null, 2));
  console.log('✅ Successfully upgraded Apollo template with explanatory sticky notes!');
}

// 3. Upgrade Qdrant Multi-Tenant RAG Template
function upgradeQdrantTemplate() {
  const filePath = path.resolve(__dirname, '../ecosystem/n8n-templates/qdrant-multi-tenant-rag-engine.json');
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const nonStickyNodes = raw.nodes.filter(n => !n.type.includes('sticky'));

  const stickyNotes = [
    {
      parameters: {
        content: `## 🧠 Multi-Tenant Qdrant RAG & AI Agent Engine
**Author:** Alfaz Mahmud Rizve ([whoisalfaz.me](https://whoisalfaz.me))
**Category:** AI / Vector Databases / RAG

### 💡 Overview
Enterprise RAG pipeline supporting multi-tenant vector searches. Isolates client datasets using payload metadata pre-filters (\`tenant_id\`, \`workspace_id\`), validates vector relevance via cosine similarity threshold, and synthesizes answers using GPT-4o with grounded citations.`,
        height: 280,
        width: 480,
        color: 5
      },
      id: "sticky-qdrant-overview",
      name: "Sticky: Overview",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [100, -320]
    },
    {
      parameters: {
        content: `### 🔑 Credentials Setup
- **OpenAI API Key**: For \`text-embedding-3-small\` & GPT-4o synthesis
- **Qdrant URL & API Key**: Endpoint for self-hosted or cloud Qdrant cluster (e.g. \`http://qdrant:6333\`)`,
        height: 280,
        width: 340,
        color: 7
      },
      id: "sticky-qdrant-creds",
      name: "Sticky: Credentials",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [620, -320]
    },
    {
      parameters: {
        content: `### 1. Inbound Query & Tenant Authentication
Captures query payload and extracts \`tenant_id\` / \`workspace_id\` from headers or body to enforce strict security boundaries.`,
        height: 200,
        width: 360,
        color: 4
      },
      id: "sticky-qdrant-step-1",
      name: "Sticky: Tenant Ingest",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [80, 50]
    },
    {
      parameters: {
        content: `### 2. Dense Embeddings & Quantized Search
Generates 1536-dimensional embeddings and executes vector search in Qdrant with pre-filters on \`tenant_id\`.`,
        height: 200,
        width: 320,
        color: 6
      },
      id: "sticky-qdrant-step-2",
      name: "Sticky: Vector Search",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [480, 50]
    },
    {
      parameters: {
        content: `### 3. Relevance Gate & GPT-4o Synthesis
- Cosine Similarity Gate: Filters out documents below threshold (0.68).
- Grounded RAG Agent: Synthesizes final response with exact source document references.`,
        height: 200,
        width: 480,
        color: 1
      },
      id: "sticky-qdrant-step-3",
      name: "Sticky: RAG Synthesis",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [840, 50]
    }
  ];

  raw.nodes = [...stickyNotes, ...nonStickyNodes];
  fs.writeFileSync(filePath, JSON.stringify(raw, null, 2));
  console.log('✅ Successfully upgraded Qdrant template with explanatory sticky notes!');
}

upgradeManychatTemplate();
upgradeApolloTemplate();
upgradeQdrantTemplate();
console.log('\n🎉 All 3 n8n templates upgraded with official n8n-nodes-base.stickyNote visual guidelines!');
