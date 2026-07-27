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

  console.log(`Total posts fetched from Sanity: ${posts.length}`);

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
    'accelerated-growth-studio-plg-playbook'
  ];

  const matched = [];
  const unmatchedSlugs = [];

  for (const slug of targetSlugs) {
    const found = posts.find(p => p.slug === slug);
    if (found) {
      matched.push(found);
    } else {
      unmatchedSlugs.push(slug);
    }
  }

  console.log(`Matched target slugs: ${matched.length} / ${targetSlugs.length}`);
  if (unmatchedSlugs.length > 0) {
    console.log('Unmatched target slugs:', unmatchedSlugs);
  }

  console.log('\nSearching all posts for similar slugs or Cluster #2 documents...');
  posts.forEach(p => {
    if (targetSlugs.includes(p.slug) || unmatchedSlugs.some(u => p.slug && p.slug.includes(u.slice(0, 10)))) {
      console.log(`- Slug: ${p.slug} | ID: ${p._id}`);
      console.log(`  Title: ${p.title}`);
      console.log(`  seoDesc (${(p.seoDescription||'').length} chars): ${p.seoDescription || 'MISSING'}`);
      console.log(`  desc (${(p.description||'').length} chars): ${p.description || 'MISSING'}\n`);
    }
  });
}

main().catch(console.error);
