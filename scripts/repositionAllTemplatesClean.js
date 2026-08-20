const fs = require('fs');
const path = require('path');

// 1. Clean Apollo to Brevo Template
function fixApollo() {
  const filePath = path.resolve(__dirname, '../ecosystem/n8n-templates/apollo-to-brevo-enrichment-pipeline.json');
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const nonSticky = raw.nodes.filter(n => !n.type.includes('sticky'));

  const stickies = [
    {
      parameters: {
        content: "## 🚀 Apollo.io to Brevo B2B Lead Enrichment Pipeline\n**Author:** Alfaz Mahmud Rizve ([whoisalfaz.me](https://whoisalfaz.me))\n**Category:** Sales & Lead Gen / RevOps\n\n### 💡 Problem & Solution\nEnriches incoming B2B web leads via Apollo.io, filters out consumer emails (gmail, yahoo), calculates a 100-point ICP fit score, and routes contacts into segmented Brevo CRM lists.",
        height: 260,
        width: 560,
        color: 5
      },
      id: "sticky-apollo-overview",
      name: "Sticky: Overview",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [0, -350]
    },
    {
      parameters: {
        content: "### 🔑 Required Credentials & Setup\n- **Apollo API Key**: Used for People & Org Match endpoints\n- **Brevo API Key**: Used for contact creation & tier segmentation\n- **Slack Webhook URL**: Used for Tier 1 Enterprise SDR alerts",
        height: 260,
        width: 480,
        color: 7
      },
      id: "sticky-apollo-creds",
      name: "Sticky: Credentials",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [620, -350]
    },
    {
      parameters: {
        content: "### 1. Ingestion & Security\nCaptures inbound lead webhook, validates HMAC authorization, and prevents circular sync loops.",
        height: 160,
        width: 480,
        color: 4
      },
      id: "sticky-apollo-step-1",
      name: "Sticky: Ingestion & Validation",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [0, -50]
    },
    {
      parameters: {
        content: "### 2. Corporate Domain Filter\nFilters out generic consumer webmail (gmail, yahoo, proton) to save Apollo API credits.",
        height: 160,
        width: 320,
        color: 2
      },
      id: "sticky-apollo-step-2",
      name: "Sticky: Domain Filter",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [540, -50]
    },
    {
      parameters: {
        content: "### 3. Apollo Intelligence & Scoring\nEnriches company size, revenue, seniority, and computes a 100-point ICP Score.",
        height: 160,
        width: 480,
        color: 6
      },
      id: "sticky-apollo-step-3",
      name: "Sticky: Apollo Match",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [920, -50]
    },
    {
      parameters: {
        content: "### 4. Brevo CRM Segmentation & Slack Alert\nUpserts contacts into Tier-1 Enterprise vs Standard Nurture pools and alerts sales reps.",
        height: 160,
        width: 580,
        color: 1
      },
      id: "sticky-apollo-step-4",
      name: "Sticky: CRM Sync",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [1460, -50]
    }
  ];

  // Re-position executable nodes in a clean linear grid at Y >= 180
  const nodePositions = {
    "Apollo Webhook Ingest": [0, 180],
    "Security & Sync Guard": [260, 180],
    "Is Authorized & Valid?": [540, 180],
    "Company Domain Filter": [820, 180],
    "Is Corporate B2B Domain?": [1100, 180],
    "Apollo Person & Org Match": [1380, 120],
    "Generic B2C Route Normalizer": [1380, 360],
    "Compute ICP Score & Tier": [1660, 120],
    "Brevo CRM Lead Upsert": [1940, 120],
    "Brevo Standard List Sync": [1940, 360],
    "Is Tier 1 Enterprise Lead?": [2220, 120],
    "Slack Enterprise SDR Alert": [2500, 120]
  };

  nonSticky.forEach(n => {
    if (nodePositions[n.name]) {
      n.position = nodePositions[n.name];
    }
  });

  raw.nodes = [...stickies, ...nonSticky];
  fs.writeFileSync(filePath, JSON.stringify(raw, null, 2));
}

// 2. Clean Qdrant RAG Template
function fixQdrant() {
  const filePath = path.resolve(__dirname, '../ecosystem/n8n-templates/qdrant-multi-tenant-rag-engine.json');
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const nonSticky = raw.nodes.filter(n => !n.type.includes('sticky'));

  const stickies = [
    {
      parameters: {
        content: "## 🧠 Multi-Tenant Qdrant RAG & AI Agent Engine\n**Author:** Alfaz Mahmud Rizve ([whoisalfaz.me](https://whoisalfaz.me))\n**Category:** AI / Vector Databases / RAG\n\n### 💡 Problem & Solution\nEnterprise RAG pipeline supporting multi-tenant vector searches. Isolates client datasets using payload metadata pre-filters (`tenant_id`), validates vector relevance via cosine similarity threshold, and synthesizes answers using GPT-4o with grounded citations.",
        height: 260,
        width: 560,
        color: 5
      },
      id: "sticky-qdrant-overview",
      name: "Sticky: Overview",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [0, -350]
    },
    {
      parameters: {
        content: "### 🔑 Required Credentials & Setup\n- **OpenAI API Key**: Used for `text-embedding-3-small` & GPT-4o synthesis\n- **Qdrant URL & Key**: Self-hosted or cloud Qdrant cluster endpoint",
        height: 260,
        width: 480,
        color: 7
      },
      id: "sticky-qdrant-creds",
      name: "Sticky: Credentials",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [620, -350]
    },
    {
      parameters: {
        content: "### 1. Inbound Ingress & Tenant Auth\nReceives user query and validates tenant authorization headers.",
        height: 160,
        width: 480,
        color: 4
      },
      id: "sticky-qdrant-step-1",
      name: "Sticky: Tenant Ingest",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [0, -50]
    },
    {
      parameters: {
        content: "### 2. Embeddings & Quantized Vector Search\nGenerates 1536-dim embeddings and queries Qdrant with tenant payload filters.",
        height: 160,
        width: 480,
        color: 6
      },
      id: "sticky-qdrant-step-2",
      name: "Sticky: Vector Search",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [540, -50]
    },
    {
      parameters: {
        content: "### 3. Relevance Gate & Grounded Synthesis\nEnforces cosine similarity threshold and synthesizes response with citations.",
        height: 160,
        width: 580,
        color: 1
      },
      id: "sticky-qdrant-step-3",
      name: "Sticky: RAG Synthesis",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [1080, -50]
    }
  ];

  const nodePositions = {
    "RAG Query Ingress Webhook": [0, 180],
    "Tenant Auth & Payload Middleware": [260, 180],
    "Is Tenant Authenticated?": [540, 180],
    "Respond Unauthorized": [540, 380],
    "Generate Vector Embeddings": [820, 180],
    "Build Qdrant Tenant Filter": [1100, 180],
    "Qdrant Quantized Vector Search": [1380, 180],
    "Relevance Threshold Gate": [1660, 180],
    "GPT-4o Grounded RAG Agent": [1940, 180],
    "Format RAG JSON Response": [2220, 180],
    "Respond to Client": [2500, 180]
  };

  nonSticky.forEach(n => {
    if (nodePositions[n.name]) {
      n.position = nodePositions[n.name];
    }
  });

  raw.nodes = [...stickies, ...nonSticky];
  fs.writeFileSync(filePath, JSON.stringify(raw, null, 2));
}

fixApollo();
fixQdrant();
console.log('✅ Repositioned all templates with zero overlaps!');
