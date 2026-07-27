const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../all_sanity_posts_full.json'), 'utf-8'));

const requested_slugs = [
  "self-hosted-qdrant-docker-vultr",
  "pinecone-vs-qdrant-vultr-benchmark",
  "emergent-ai-autonomous-gtm-guide",
  "adcreative-ai-review-n8n-ad-refresh-loop",
  "cometchat-dify-inapp-voice",
  "omnichannel-ai-voice-note-handler",
  "elevenlabs-n8n-voice-ai-sales-agent",
  "corrective-rag-crag-n8n-blueprint",
  "dify-vs-n8n-architecture",
  "tapstitch-vs-printful-ecommerce-pipeline",
  "trainual-alternatives-active-agency-sop-engine",
  "headless-wordpress-vs-monolithic",
  "manychat-to-n8n-integration-lead-scoring",
  "n8n-multi-tenant-vector-schema",
  "pinecone-n8n-rag-knowledge-base-blueprint",
  "aisdr-vs-human-sdr-unit-economics-benchmark",
  "apollo-vs-lusha-vs-aisdr-comparison",
  "brevo-cold-email-ip-warming-guide",
  "accelerated-growth-studio-plg-playbook"
];

console.log(`Total posts in Sanity: ${posts.length}`);

const matched = [];
const unmatched = [...requested_slugs];

posts.forEach(p => {
  if (requested_slugs.includes(p.slug)) {
    matched.push(p);
    const idx = unmatched.indexOf(p.slug);
    if (idx !== -1) unmatched.splice(idx, 1);
  }
});

console.log(`Exact matched requested slugs: ${matched.length} / ${requested_slugs.length}`);

if (unmatched.length > 0) {
  console.log('\nUnmatched requested slugs:', unmatched);
  console.log('Searching for partial matches in Sanity posts...');
  unmatched.forEach(u => {
    const prefix = u.split('-').slice(0, 3).join('-');
    const matches = posts.filter(p => p.slug && p.slug.includes(prefix));
    matches.forEach(m => {
      console.log(`Requested: "${u}" -> Sanity slug: "${m.slug}" (_id: ${m._id})`);
    });
  });
}
