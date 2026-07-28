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

const c1_files = [
  'draft-2-1-apollo-brevo-n8n-pipeline.json',
  'draft-2-2-apollo-vs-lusha-vs-aisdr.json',
  'draft-2-3-aisdr-vs-human-sdr-unit-economics.json',
  'draft-2-4-waterfall-data-enrichment-pipeline.json',
  'draft-2-5-brevo-cold-email-ip-warming-guide.json',
  'draft-accelerated-growth-studio-plg-playbook.json',
  'draft-adcreative-ai-n8n-ad-refresh.json',
  'draft-closed-loop-lead-attribution-engine.json',
  'draft-cometchat-dify-inapp-voice.json',
  'draft-competitor-seo-audit.json',
  'draft-corrective-rag-crag-n8n.json',
  'draft-databox-revops-dashboard-pipeline-velocity.json',
  'draft-dify-vs-n8n-architecture.json',
  'draft-elevenlabs-n8n-voice-ai-sales-agent.json',
  'draft-emergent-ai-autonomous-gtm-guide.json',
  'draft-manychat-n8n-whatsapp-voice-bot.json',
  'draft-monday-crm-advanced-lead-scoring.json',
  'draft-n8n-multi-tenant-vector-schema.json',
  'draft-omnichannel-ai-voice-note-handler.json',
  'draft-pinecone-vs-qdrant-vultr-benchmark.json',
  'draft-self-hosted-qdrant-docker-vultr.json',
  'draft-tapstitch-vs-printful-ecommerce-pipeline.json',
  'draft-trainual-alternatives-active-agency-sop.json',
  'draft-turbotic-automation-governance.json'
];

const c2_files = [
  'draft-cluster2-01-self-hosted-qdrant-cluster-vultr-docker-sop.json',
  'draft-cluster2-02-vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide.json',
  'draft-cluster2-03-securing-self-hosted-vector-databases-ssl-vultr-firewall.json',
  'draft-cluster2-04-the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n.json',
  'draft-cluster2-05-pinecone-serverless-vs-qdrant-vultr-latency-benchmark.json',
  'draft-cluster2-06-pinecone-namespaces-vs-qdrant-payload-filters-comparison.json',
  'draft-cluster2-07-hybrid-vector-keyword-search-qdrant-n8n-pipeline.json',
  'draft-cluster2-08-scaling-qdrant-vector-database-to-10-million-embeddings.json',
  'draft-cluster2-09-corrective-rag-crag-blueprint-n8n-tavily-fallback.json',
  'draft-cluster2-10-automated-pdf-document-chunking-vectorization-n8n.json',
  'draft-cluster2-11-building-an-enterprise-knowledge-graph-rag-n8n.json',
  'draft-cluster2-12-open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark.json',
  'draft-cluster2-13-dify-ai-vultr-gpu-docker-deployment-guide.json',
  'draft-cluster2-14-dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes.json',
  'draft-cluster2-15-semantic-search-api-n8n-qdrant-fastapi-bridge.json',
  'draft-cluster2-16-zero-data-retention-enterprise-rag-vultr-vps.json',
  'draft-cluster2-17-building-multi-tenant-vector-search-n8n-qdrant.json',
  'draft-cluster2-18-n8n-vector-store-memory-management-production-guide.json',
  'draft-cluster2-19-high-throughput-batch-vector-ingestion-n8n-qdrant.json',
  'draft-cluster2-20-n8n-ai-agent-memory-persistence-qdrant-vector-store.json'
];

const allFiles = [...c1_files, ...c2_files];

async function publishMaster() {
  console.log(`🚀 Starting Master Sanity CMS Publication for ALL ${allFiles.length} blog posts...\n`);
  let successCount = 0;
  let failCount = 0;

  for (let idx = 0; idx < allFiles.length; idx++) {
    const fileName = allFiles[idx];
    const filePath = path.resolve(__dirname, '..', fileName);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${fileName}`);
      failCount++;
      continue;
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const docData = JSON.parse(fileContent);

      const slugStr = typeof docData.slug === 'object' ? docData.slug.current : docData.slug;
      if (!slugStr) {
        console.error(`❌ No slug found in ${fileName}`);
        failCount++;
        continue;
      }

      // Use clean live slug as document ID
      docData._id = slugStr;
      docData._type = 'post';

      // Ensure slug object structure
      if (typeof docData.slug === 'string') {
        docData.slug = { _type: 'slug', current: slugStr };
      }

      // Remove invalid image asset references
      if (docData.image && docData.image.asset && docData.image.asset._ref) {
        const ref = docData.image.asset._ref;
        const isValidSanityAsset = /^image-[a-f0-9]{40}-\d+x\d+-[a-z]+$/.test(ref);
        if (!isValidSanityAsset) {
          delete docData.image;
        }
      }

      delete docData.author;

      const result = await client.createOrReplace(docData);
      console.log(`  ✅ Published to Sanity [${idx + 1}/${allFiles.length}]: ${result._id} ("${result.title.substring(0, 45)}...")`);
      successCount++;
    } catch (err) {
      console.error(`  ❌ Failed to publish ${fileName}: ${err.message}`);
      failCount++;
    }
  }

  console.log(`\n🎉 Master Sanity Publication Complete!`);
  console.log(`   Successfully Published: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
}

publishMaster();
