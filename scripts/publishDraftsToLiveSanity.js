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

const cluster2Slugs = [
  "self-hosted-qdrant-cluster-vultr-docker-sop",
  "vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide",
  "securing-self-hosted-vector-databases-ssl-vultr-firewall",
  "the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n",
  "pinecone-serverless-vs-qdrant-vultr-latency-benchmark",
  "pinecone-namespaces-vs-qdrant-payload-filters-comparison",
  "hybrid-vector-keyword-search-qdrant-n8n-pipeline",
  "scaling-qdrant-vector-database-to-10-million-embeddings",
  "corrective-rag-crag-blueprint-n8n-tavily-fallback",
  "automated-pdf-document-chunking-vectorization-n8n",
  "building-an-enterprise-knowledge-graph-rag-n8n",
  "open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark",
  "dify-ai-vultr-gpu-docker-deployment-guide",
  "dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes",
  "semantic-search-api-n8n-qdrant-fastapi-bridge",
  "zero-data-retention-enterprise-rag-vultr-vps",
  "building-multi-tenant-vector-search-n8n-qdrant",
  "n8n-vector-store-memory-management-production-guide",
  "high-throughput-batch-vector-ingestion-n8n-qdrant",
  "n8n-ai-agent-memory-persistence-qdrant-vector-store"
];

async function publishLive() {
  console.log("🚀 Publishing all 20 Cluster #2 expanded posts directly to live Sanity documents...\n");

  for (let idx = 0; idx < cluster2Slugs.length; idx++) {
    const slug = cluster2Slugs[idx];
    const numStr = (idx + 1).toString().padStart(2, '0');
    const draftFile = path.resolve(__dirname, `../draft-cluster2-${numStr}.json`);

    if (!fs.existsSync(draftFile)) {
      console.error(`❌ Draft file not found: draft-cluster2-${numStr}.json`);
      continue;
    }

    const draftData = JSON.parse(fs.readFileSync(draftFile, 'utf-8'));
    delete draftData.author;
    delete draftData.image; // Keep image untouched if already patched

    // Create live document (without drafts. prefix)
    const liveDoc = {
      ...draftData,
      _id: slug
    };

    try {
      await client.createOrReplace(liveDoc);
      console.log(`  ✅ Live Document Published: [${slug}] (${liveDoc.title})`);
    } catch (err) {
      console.error(`❌ Error publishing [${slug}]: ${err.message}`);
    }
  }

  console.log("\n🎉 Live Publication Complete across all 20 Cluster #2 Posts!");
}

publishLive();
