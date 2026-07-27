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

const cluster1Slugs = [
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

function getRawText(body) {
  if (!body) return '';
  if (typeof body === 'string') return body;
  if (Array.isArray(body)) {
    let text = '';
    body.forEach(block => {
      if (block.children) {
        block.children.forEach(c => { text += ' ' + (c.text || ''); });
      }
    });
    return text;
  }
  return '';
}

function getShingles(text, n = 5) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
  const shingles = new Set();
  for (let i = 0; i <= words.length - n; i++) {
    shingles.add(words.slice(i, i + n).join(' '));
  }
  return shingles;
}

function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return (intersection / union) * 100;
}

async function auditDuplication() {
  console.log("🔍 CHECKING DUPLICATION & SHINGLE OVERLAP IN CLUSTER #1 POSTS...\n");
  const posts = await client.fetch(`*[_type == "post" && slug.current in $slugs]{
    "slug": slug.current,
    title,
    body
  }`, { slugs: cluster1Slugs });

  const postData = posts.map(p => ({
    slug: p.slug,
    title: p.title,
    shingles: getShingles(getRawText(p.body), 5)
  }));

  const comparisons = [];
  for (let i = 0; i < postData.length; i++) {
    for (let j = i + 1; j < postData.length; j++) {
      const sim = jaccardSimilarity(postData[i].shingles, postData[j].shingles);
      if (sim > 10) {
        comparisons.push({
          postA: postData[i].slug,
          postB: postData[j].slug,
          similarity: sim.toFixed(2) + "%"
        });
      }
    }
  }

  console.log("High Similarity Pairs (>10% 5-gram overlap):");
  console.log(JSON.stringify(comparisons, null, 2));
  console.log(`Total comparisons analyzed: ${(postData.length * (postData.length - 1)) / 2}`);
}

auditDuplication();
