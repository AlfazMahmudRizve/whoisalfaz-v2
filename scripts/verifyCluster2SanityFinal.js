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

async function verify() {
  console.log('🔍 Final Live Sanity Verification for Cluster #2 Posts...\n');

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

  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    seoDescription,
    description
  }`);

  const seenDescs = new Set();
  let passCount = 0;

  targetSlugs.forEach((slug, idx) => {
    const p = posts.find(item => item.slug === slug);
    if (!p) {
      console.error(`❌ [${idx + 1}] MISSING IN SANITY: ${slug}`);
      return;
    }

    const sDesc = p.seoDescription || '';
    const desc = p.description || '';
    const sLen = sDesc.length;
    const dLen = desc.length;

    const isValidLen = sLen >= 140 && sLen <= 160;
    const isUnique = !seenDescs.has(sDesc);
    seenDescs.add(sDesc);

    if (isValidLen && isUnique && sDesc === desc) {
      console.log(`✅ [${idx + 1}] PASS | (${sLen} chars) ${slug}`);
      console.log(`       ID: ${p._id}`);
      console.log(`       Title: "${p.title}"`);
      console.log(`       seoDescription: "${sDesc}"\n`);
      passCount++;
    } else {
      console.error(`❌ [${idx + 1}] FAIL | (${sLen} chars, unique=${isUnique}, matchDesc=${sDesc === desc}) ${slug}`);
      console.error(`       seoDescription: "${sDesc}"\n`);
    }
  });

  console.log(`SUMMARY: ${passCount} / ${targetSlugs.length} Cluster #2 documents verified successfully.`);
  if (passCount === targetSlugs.length) {
    console.log('🎉 ALL CLUSTER #2 SANITY POST DOCUMENTS ARE FULLY VERIFIED!');
  } else {
    process.exit(1);
  }
}

verify().catch(console.error);
