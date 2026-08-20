const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function applyPhase2Tables() {
  console.log('🚀 Executing Phase 2 Structured Comparison Table Updates...\n');

  // -------------------------------------------------------------
  // POST 1: screaming-frog-alternatives-free-seo-audit-tools
  // -------------------------------------------------------------
  console.log('📌 Updating Post 1: screaming-frog-alternatives-free-seo-audit-tools...');
  const post1 = await client.fetch(`*[_type == "post" && slug.current == "screaming-frog-alternatives-free-seo-audit-tools"][0]`);
  if (post1 && typeof post1.body === 'string') {
    let body1 = post1.body;
    
    const table5ToolMatrix = `## <mark>Comprehensive 5-Tool Free SEO Crawler Comparison Matrix [2026]</mark>

The table below summarizes the key differences between the top free SEO crawlers and audit tools:

| SEO Audit Tool | Platform Type | Free Crawl Limit | Domain Verification | Security & SSL Analysis | Ideal Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **WhoisAlfaz Audit Tool** | Cloud (Browser) | Unlimited Single-Page Scans | ❌ None (Instant scan) | ✅ Full TLS, SSL & Security Headers | Competitor audits & rapid client audits |
| **Screaming Frog (Free)** | Desktop App (Mac/Win) | Capped at 500 URLs / crawl | ❌ None | ⚠️ Basic HTTP header inspection | Deep on-page crawling for small sites |
| **Ahrefs Webmaster Tools** | Cloud (SaaS) | 5,000 URLs / month | ✅ Required (DNS / HTML tag) | ❌ No SSL / security audit | Ongoing site health for verified domains |
| **SEOptimer** | Cloud (Browser) | 1 Free Audit / day | ❌ None | ⚠️ Basic SSL check only | Quick client-facing PDF report generation |
| **Spotibo** | Cloud (SaaS) | 500 URLs / month | ❌ None | ❌ Basic on-page only | Beginner-friendly visual link analysis |

`;

    if (!body1.includes('Comprehensive 5-Tool Free SEO Crawler Comparison Matrix')) {
      // Insert before "## <mark>How Does the WhoisAlfaz Website Audit Tool Compare to Screaming Frog?</mark>"
      if (body1.includes('## <mark>How Does the WhoisAlfaz Website Audit Tool Compare')) {
        body1 = body1.replace('## <mark>How Does the WhoisAlfaz Website Audit Tool Compare', `${table5ToolMatrix}\n## <mark>How Does the WhoisAlfaz Website Audit Tool Compare`);
      } else {
        body1 = `${body1}\n\n${table5ToolMatrix}`;
      }

      await client.patch(post1._id).set({ body: body1 }).commit();
      console.log(`   ✅ Post 1 updated with 5-tool comparison table.`);
      try {
        const altId1 = post1._id.startsWith('drafts.') ? post1._id.replace('drafts.', '') : `drafts.${post1._id}`;
        await client.patch(altId1).set({ body: body1 }).commit();
      } catch (_) {}
    } else {
      console.log('   ℹ️ Post 1 already contains 5-tool table.');
    }
  }

  // -------------------------------------------------------------
  // POST 2: manychat-pricing-2026
  // -------------------------------------------------------------
  console.log('📌 Checking Post 2: manychat-pricing-2026...');
  const post2 = await client.fetch(`*[_type == "post" && slug.current == "manychat-pricing-2026"][0]`);
  if (post2 && typeof post2.body === 'string') {
    let body2 = post2.body;
    console.log(`   ✅ Post 2 contains ${ (body2.match(/<table[\s\S]*?<\/table>/gi) || []).length } tables.`);
  }

  // -------------------------------------------------------------
  // POST 3: dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes
  // -------------------------------------------------------------
  console.log('📌 Updating Post 3: dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes...');
  const post3 = await client.fetch(`*[_type == "post" && slug.current == "dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes"][0]`);
  if (post3 && typeof post3.body === 'string') {
    let body3 = post3.body;
    // Check if the markdown table is duplicated multiple times
    const mdTableStr = `| Feature Dimension | Dify.ai | n8n AI Agent Nodes |
| :--- | :--- | :--- |
| **Primary Execution Paradigm** | Graph-based LLM Workflow & Agentic State Machine | Node-based Asynchronous ETL & Data Flow Automation |
| **Execution Runtime** | Python (Flask / Gunicorn / Celery async workers) | Node.js (V8 engine event loop with Worker threads) |
| **RAG & Knowledge Base** | Native multi-segment chunking, vector indexing, hybrid search | External integration (Qdrant, Pinecone, LangChain nodes) |
| **Tool Calling Specification** | OpenAPI v3 / YAML schema definitions | Native JavaScript Code Nodes / LangChain Tool abstractions |
| **Memory Management** | Native session history with automatic token window truncation | PostgreSQL / Qdrant vector memory buffer sub-nodes |
| **Human-in-the-Loop** | Native UI chat pause & annotation review panel | Wait node with webhook callback / manual approvals |
| **Multi-Agent Coordination** | Dedicated Multi-Agent Orchestration graph & Delegation nodes | Sub-workflow calls with JSON RPC style messaging |`;

    const occurrences = body3.split(mdTableStr).length - 1;
    if (occurrences > 1) {
      console.log(`   Found ${occurrences} duplicate markdown table blocks in Post 3. Cleaning to 1...`);
      // Keep only first occurrence
      let first = true;
      body3 = body3.replace(new RegExp(mdTableStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), (match) => {
        if (first) {
          first = false;
          return match;
        }
        return '';
      });

      await client.patch(post3._id).set({ body: body3 }).commit();
      console.log(`   ✅ Post 3 deduplicated successfully.`);
      try {
        const altId3 = post3._id.startsWith('drafts.') ? post3._id.replace('drafts.', '') : `drafts.${post3._id}`;
        await client.patch(altId3).set({ body: body3 }).commit();
      } catch (_) {}
    } else {
      console.log('   ℹ️ Post 3 tables are clean.');
    }
  }

  // -------------------------------------------------------------
  // POST 4: ai-automation-agency-business-model
  // -------------------------------------------------------------
  console.log('📌 Updating Post 4: ai-automation-agency-business-model...');
  const post4 = await client.fetch(`*[_type == "post" && slug.current == "ai-automation-agency-business-model"][0]`);
  if (post4 && typeof post4.body === 'string') {
    let body4 = post4.body;

    const agencyComparisonTables = `## <mark>The 3 Core Productized AI Agency Offers Matrix [2026]</mark>

The table below outlines the three foundational productized packages high-performing AI automation agencies use to scale to $10,000+ monthly recurring retainers:

| Offer Package | Target Client Profile | Pricing Model | Core Tech Stack | Time to Deploy | Client Value & ROI |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Content-as-a-Service** | B2B Creators, Coaches & Founders | $1,500 – $3,000 / mo retainer | n8n + OpenAI GPT-4o + Blotato / Social APIs | 48 – 72 Hours | 30+ hours saved/mo on multi-channel syndication |
| **The Iron Receptionist** | High-Ticket Local Services (Law, Dental, Real Estate) | $2,500 Setup + $300–$500 / mo | n8n + Retell / Vapi AI + Brevo / HubSpot CRM | 3 – 5 Business Days | 1 recovered lead pays for entire year of service ($15k+ deal) |
| **The Executive Brain (AIOS)** | Scaling SaaS, E-commerce & VC-backed SMBs | $5,000 – $10,000 One-Time Setup | n8n + Qdrant Vector DB + Telegram / Slack Bot | 7 – 14 Business Days | Instant executive clarity; replaces $20k/yr custom BI tools |

---

## <mark>Agency Tech Stack Comparison: Self-Hosted n8n vs Zapier vs Custom Python</mark>

When choosing your agency technical infrastructure, evaluate compute costs, data privacy, and execution reliability:

| Evaluation Dimension | Self-Hosted n8n (Docker VPS) | Zapier / Make (SaaS) | Custom Python Scripts |
| :--- | :--- | :--- | :--- |
| **Monthly Compute Cost (500k ops/mo)** | Flat $20 – $40 / month VPS | $500 – $1,200+ / month | Flat $20 – $50 / month VPS |
| **Custom Code & Transform Flexibility** | Native JS & Python in-node execution | Sandboxed / limited step timeouts | Complete programming language freedom |
| **Data Privacy & Client GDPR Compliance** | 100% On-premise; zero third-party leakage | Data passes through multi-tenant cloud | 100% Private on self-managed infrastructure |
| **Client Multi-Tenancy Architecture** | Docker container / sub-account isolation | Shared organization account folders | Virtualenvs / process isolation |
| **Failure Recovery & Self-Healing** | Global error trigger nodes + auto retries | Hard task stops; manual error replay | Requires custom logging & retry queues |

`;

    if (!body4.includes('The 3 Core Productized AI Agency Offers Matrix')) {
      if (body4.includes('## Pricing Strategy: The Value-Based Equation')) {
        body4 = body4.replace('## Pricing Strategy: The Value-Based Equation', `${agencyComparisonTables}\n## Pricing Strategy: The Value-Based Equation`);
      } else {
        body4 = `${body4}\n\n${agencyComparisonTables}`;
      }

      await client.patch(post4._id).set({ body: body4 }).commit();
      console.log(`   ✅ Post 4 updated with structured comparison tables.`);
      try {
        const altId4 = post4._id.startsWith('drafts.') ? post4._id.replace('drafts.', '') : `drafts.${post4._id}`;
        await client.patch(altId4).set({ body: body4 }).commit();
      } catch (_) {}
    } else {
      console.log('   ℹ️ Post 4 already contains comparison tables.');
    }
  }

  // -------------------------------------------------------------
  // POST 5: pinecone-vs-qdrant-vultr-benchmark
  // -------------------------------------------------------------
  console.log('📌 Updating Post 5: pinecone-vs-qdrant-vultr-benchmark...');
  const post5 = await client.fetch(`*[_type == "post" && slug.current == "pinecone-vs-qdrant-vultr-benchmark"][0]`);
  if (post5 && typeof post5.body === 'string') {
    let body5 = post5.body;

    // Check for duplicate benchmark sections
    const duplicateAnchor = '## <mark>Comprehensive Vector DB Benchmark & Hardware Specifications</mark>';
    const parts = body5.split(duplicateAnchor);
    if (parts.length > 2) {
      console.log(`   Found ${parts.length - 1} repeated sections in Post 5. Cleaning up duplicate tail...`);
      // Keep up to second occurrence's FAQ section
      const secondPart = parts[2];
      const faqIndex = secondPart.indexOf('## Frequently Asked Questions');
      let faqSection = '';
      if (faqIndex !== -1) {
        faqSection = secondPart.substring(faqIndex);
      }
      body5 = parts[0] + duplicateAnchor + parts[1] + '\n\n' + faqSection;

      await client.patch(post5._id).set({ body: body5 }).commit();
      console.log(`   ✅ Post 5 deduplicated and cleaned successfully.`);
      try {
        const altId5 = post5._id.startsWith('drafts.') ? post5._id.replace('drafts.', '') : `drafts.${post5._id}`;
        await client.patch(altId5).set({ body: body5 }).commit();
      } catch (_) {}
    } else {
      console.log('   ℹ️ Post 5 duplicate check clean.');
    }
  }

  console.log('\n✨ Phase 2 Updates Complete!');
}

applyPhase2Tables().catch(console.error);
