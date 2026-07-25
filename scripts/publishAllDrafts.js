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

const draftFiles = [
  'draft-closed-loop-lead-attribution-engine.json',
  'draft-databox-revops-dashboard-pipeline-velocity.json',
  'draft-turbotic-automation-governance.json',
  'draft-whatconverts-vs-callrail-attribution.json',
  'draft-monday-crm-advanced-lead-scoring.json',
  'draft-2-1-apollo-brevo-n8n-pipeline.json',
  'draft-2-2-apollo-vs-lusha-vs-aisdr.json',
  'draft-2-3-aisdr-vs-human-sdr-unit-economics.json',
  'draft-2-4-waterfall-data-enrichment-pipeline.json',
  'draft-2-5-brevo-cold-email-ip-warming-guide.json',
  'draft-elevenlabs-n8n-voice-ai-sales-agent.json',
  'draft-dify-vs-n8n-architecture.json',
  'draft-manychat-n8n-whatsapp-voice-bot.json',
  'draft-cometchat-dify-inapp-voice.json',
  'draft-omnichannel-ai-voice-note-handler.json',
  'draft-pinecone-vs-qdrant-vultr-benchmark.json',
  'draft-self-hosted-qdrant-docker-vultr.json',
  'draft-corrective-rag-crag-n8n.json',
  'draft-n8n-multi-tenant-vector-schema.json',
  'draft-adcreative-ai-n8n-ad-refresh.json',
  'draft-trainual-alternatives-active-agency-sop.json',
  'draft-emergent-ai-autonomous-gtm-guide.json',
  'draft-tapstitch-vs-printful-ecommerce-pipeline.json',
  'draft-accelerated-growth-studio-plg-playbook.json'
];

async function publishAll() {
  console.log(`🚀 Starting bulk Sanity ingestion for ${draftFiles.length} blog posts...\n`);
  let successCount = 0;
  let failCount = 0;

  for (const fileName of draftFiles) {
    const filePath = path.resolve(__dirname, '..', fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${fileName}`);
      failCount++;
      continue;
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const draftData = JSON.parse(fileContent);

      // Ensure document ID is formatted without 'drafts.' prefix for live publication
      if (draftData._id && draftData._id.startsWith('drafts.')) {
        draftData._id = draftData._id.replace('drafts.', '');
      }

      draftData._type = 'post';

      // Clean up un-uploaded dummy image references to prevent Sanity reference errors
      if (draftData.image && draftData.image.asset && draftData.image.asset._ref) {
        const ref = draftData.image.asset._ref;
        const isValidSanityAsset = /^image-[a-f0-9]{40}-\d+x\d+-[a-z]+$/.test(ref);
        if (!isValidSanityAsset) {
          delete draftData.image;
        }
      }

      console.log(`Publishing [${successCount + 1}/${draftFiles.length}]: ${draftData.title}...`);
      const result = await client.createOrReplace(draftData);
      console.log(`  ✅ Published to Sanity: ${result._id} (${result.slug?.current || 'no-slug'})`);
      successCount++;
    } catch (err) {
      console.error(`  ❌ Failed to publish ${fileName}: ${err.message}`);
      failCount++;
    }
  }

  console.log(`\n🎉 Bulk Sanity Ingestion Complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
}

publishAll();
