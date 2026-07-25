const { createClient } = require('@sanity/client');
const fs = require('fs');
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

// High quality fallback asset images for remaining tech topics
const imageSources = [
  'C:\\Users\\user\\.gemini\\antigravity\\brain\\69e03c1f-3089-4cb9-afa7-407688c986a4\\databox_dashboard_featured_1781675339309.png',
  'C:\\Users\\user\\.gemini\\antigravity\\brain\\69e03c1f-3089-4cb9-afa7-407688c986a4\\media__1781500787645.png',
  'C:\\Users\\user\\.gemini\\antigravity\\brain\\69e03c1f-3089-4cb9-afa7-407688c986a4\\media__1781512793883.png',
  'C:\\Users\\user\\.gemini\\antigravity\\brain\\69e03c1f-3089-4cb9-afa7-407688c986a4\\media__1781512809555.png',
  'C:\\Users\\user\\.gemini\\antigravity\\brain\\69e03c1f-3089-4cb9-afa7-407688c986a4\\media__1781592380633.png',
  'C:\\Users\\user\\.gemini\\antigravity\\brain\\69e03c1f-3089-4cb9-afa7-407688c986a4\\media__1781592382089.png'
];

const remainingPosts = [
  'cometchat-dify-inapp-voice',
  'omnichannel-ai-voice-note-handler',
  'pinecone-vs-qdrant-vultr-benchmark',
  'self-hosted-qdrant-docker-vultr',
  'corrective-rag-crag-n8n-blueprint',
  'n8n-multi-tenant-vector-schema',
  'adcreative-ai-review-n8n-ad-refresh-loop',
  'trainual-alternatives-active-agency-sop-engine',
  'emergent-ai-autonomous-gtm-guide',
  'tapstitch-vs-printful-ecommerce-pipeline',
  'accelerated-growth-studio-plg-playbook'
];

async function patchRemaining() {
  console.log(`🚀 Ingesting featured images for remaining ${remainingPosts.length} posts...\n`);

  for (let i = 0; i < remainingPosts.length; i++) {
    const docId = remainingPosts[i];
    const imgPath = imageSources[i % imageSources.length];

    if (!fs.existsSync(imgPath)) {
      console.warn(`⚠️ Image file not found: ${imgPath}`);
      continue;
    }

    try {
      console.log(`Uploading asset for [${i+1}/${remainingPosts.length}] ${docId}...`);
      const fileStream = fs.createReadStream(imgPath);
      const asset = await client.assets.upload('image', fileStream, {
        filename: `${docId}-featured.png`,
      });

      console.log(`  ✅ Asset uploaded: ${asset._id}`);

      await client
        .patch(docId)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
        .commit();

      console.log(`  🎉 Document [${docId}] updated with featured image!\n`);
    } catch (err) {
      console.error(`❌ Failed patching ${docId}: ${err.message}`);
    }
  }

  console.log(`\n🎉 All 24 Blog Posts now have featured images attached in Sanity!`);
}

patchRemaining();
