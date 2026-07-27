const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../all_sanity_posts_full.json'), 'utf-8'));

const targetSlugs = [
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
  'accelerated-growth-studio-plg-playbook',
  'waterfall-data-enrichment-pipeline-n8n-guide',
  'closed-loop-lead-attribution-engine'
];

console.log("Checking target slugs against Sanity dump:");
targetSlugs.forEach(slug => {
  const p = posts.find(item => item.slug === slug);
  if (p) {
    console.log(`FOUND: ${slug} | _id: ${p._id}`);
  } else {
    console.log(`NOT FOUND: ${slug}`);
  }
});
