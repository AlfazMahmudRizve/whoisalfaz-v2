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

async function main() {
  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    description,
    seoDescription
  }`);

  console.log(`Total Sanity posts: ${posts.length}`);

  // Cluster 2 list from prompt and repo context
  const cluster2Candidates = [
    'self-hosted-qdrant-docker-vultr',
    'pinecone-vs-qdrant-vultr-benchmark',
    'emergent-ai-autonomous-gtm-guide',
    'adcreative-ai-review-n8n-ad-refresh-loop',
    'cometchat-dify-inapp-voice',
    'omnichannel-ai-voice-note-handler',
    'elevenlabs-n8n-voice-ai-sales-agent',
    'corrective-rag-crag-n8n-blueprint',
    'dify-vs-n8n-architecture',
    'tapstitch-vs-printful-ecommerce-pipeline',
    'trainual-alternatives-active-agency-sop-engine',
    'headless-wordpress-vs-monolithic',
    'manychat-to-n8n-integration-lead-scoring',
    'n8n-multi-tenant-vector-schema',
    'pinecone-n8n-rag-knowledge-base-blueprint',
    'aisdr-vs-human-sdr-unit-economics-benchmark',
    'apollo-vs-lusha-vs-aisdr-comparison',
    'brevo-cold-email-ip-warming-guide',
    'accelerated-growth-studio-plg-playbook'
  ];

  posts.forEach(p => {
    const isCandidate = cluster2Candidates.some(c => p.slug && (p.slug.includes(c) || c.includes(p.slug)));
    if (isCandidate) {
      console.log(`[MATCH] _id: ${p._id} | slug: ${p.slug}`);
      console.log(`        title: ${p.title}`);
      console.log(`        seoDescription (${(p.seoDescription||'').length}): ${p.seoDescription}`);
      console.log(`        description (${(p.description||'').length}): ${p.description}\n`);
    }
  });
}

main().catch(console.error);
