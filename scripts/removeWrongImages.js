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

const affectedPosts = [
  'omnichannel-ai-voice-note-handler',
  'tapstitch-vs-printful-ecommerce-pipeline',
  'emergent-ai-autonomous-gtm-guide',
  'accelerated-growth-studio-plg-playbook',
  'self-hosted-qdrant-docker-vultr',
  'pinecone-vs-qdrant-vultr-benchmark',
  'n8n-multi-tenant-vector-schema',
  'cometchat-dify-inapp-voice',
  'corrective-rag-crag-n8n-blueprint',
  'adcreative-ai-review-n8n-ad-refresh-loop',
  'trainual-alternatives-active-agency-sop-engine'
];

async function removeImages() {
  console.log(`🚨 Unsetting image fields for ${affectedPosts.length} posts in Sanity CMS...`);
  
  for (const docId of affectedPosts) {
    try {
      await client.patch(docId).unset(['image']).commit();
      console.log(`✅ Unset image for post: ${docId}`);
    } catch (err) {
      console.error(`❌ Failed unsetting image for ${docId}: ${err.message}`);
    }
  }

  console.log(`\n🎉 Done! All wrong images have been completely removed from live Sanity posts.`);
}

removeImages();
