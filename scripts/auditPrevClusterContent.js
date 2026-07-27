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

const prevClusterSlugs = [
  "closed-loop-lead-attribution-engine",
  "databox-revops-dashboard-pipeline-velocity",
  "turbotic-automation-governance",
  "whatconverts-vs-callrail-attribution",
  "monday-crm-advanced-lead-scoring",
  "apollo-to-brevo-n8n-pipeline-guide",
  "apollo-vs-lusha-vs-aisdr-comparison",
  "aisdr-vs-human-sdr-unit-economics-benchmark",
  "waterfall-data-enrichment-pipeline-n8n-guide",
  "brevo-cold-email-ip-warming-guide",
  "elevenlabs-n8n-voice-ai-sales-agent",
  "dify-vs-n8n-architecture",
  "manychat-n8n-whatsapp-voice-bot",
  "cometchat-dify-inapp-voice",
  "omnichannel-ai-voice-note-handler",
  "pinecone-vs-qdrant-vultr-benchmark",
  "self-hosted-qdrant-docker-vultr",
  "corrective-rag-crag-n8n-blueprint",
  "n8n-multi-tenant-vector-schema",
  "adcreative-ai-review-n8n-ad-refresh-loop",
  "trainual-alternatives-active-agency-sop-engine",
  "emergent-ai-autonomous-gtm-guide",
  "tapstitch-vs-printful-ecommerce-pipeline",
  "accelerated-growth-studio-plg-playbook"
];

function getWordCount(body) {
  if (!body) return 0;
  if (typeof body === 'string') return body.split(/\s+/).filter(Boolean).length;
  if (Array.isArray(body)) {
    let text = '';
    body.forEach(block => {
      if (block.children) {
        block.children.forEach(c => { text += ' ' + (c.text || ''); });
      }
    });
    return text.split(/\s+/).filter(Boolean).length;
  }
  return 0;
}

async function auditPrevCluster() {
  console.log("🔍 AUDITING PREVIOUS CLUSTER (24 POSTS) IN SANITY CMS...\n");
  const posts = await client.fetch(`*[_type == "post" && slug.current in $slugs]{
    "slug": slug.current,
    title,
    description,
    body
  }`, { slugs: prevClusterSlugs });

  const results = [];
  posts.forEach((p, idx) => {
    const wc = getWordCount(p.body);
    const desc = p.description || '';
    results.push({
      num: idx + 1,
      slug: p.slug,
      title: p.title,
      wordCount: wc,
      isThin: wc < 1500 ? "⚠️ THIN (<1500w)" : "✅ GOOD (>=1500w)",
      hasTag: desc.includes('[') ? "❌ HAS BRACKET TAG" : "✅ CLEAN"
    });
  });

  console.log(JSON.stringify(results, null, 2));
}

auditPrevCluster();
