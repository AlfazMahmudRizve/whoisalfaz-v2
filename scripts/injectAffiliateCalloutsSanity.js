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

const affiliateCalloutBlock = {
  _type: 'block',
  style: 'normal',
  children: [
    { _type: 'span', text: '⚡ ' },
    { _type: 'span', marks: ['bold'], text: 'Special Infrastructure Offer: ' },
    { _type: 'span', text: 'Claim your ' },
    { _type: 'span', marks: ['link_vultr_promo'], text: '$300 Free Cloud GPU & Compute Credit on Vultr' },
    { _type: 'span', text: ' to deploy self-hosted Qdrant, Dify.ai, and n8n with $0 upfront cost.' }
  ],
  markDefs: [
    {
      _key: 'link_vultr_promo',
      _type: 'link',
      href: 'https://whoisalfaz.me/go/vultr-promo'
    }
  ]
};

async function injectCallouts() {
  console.log('⚡ Injecting affiliate callout markDefs into Sanity posts...\n');

  for (const slug of cluster2Slugs) {
    const draftId = `drafts.${slug}`;
    const pubId = slug;

    try {
      let doc = await client.getDocument(draftId) || await client.getDocument(pubId);

      if (!doc) {
        console.warn(`⚠️ Document [${slug}] not found!`);
        continue;
      }

      let body = Array.isArray(doc.body) ? [...doc.body] : [];
      
      // Check if callout already exists
      const hasCallout = body.some(b => 
        b && Array.isArray(b.markDefs) && b.markDefs.some(m => m.href && m.href.includes('/go/'))
      );

      if (!hasCallout) {
        body.splice(1, 0, affiliateCalloutBlock);

        const targetId = doc._id;
        await client.patch(targetId).set({ body: body }).commit();
        console.log(`  ✅ Injected affiliate callout into document [${targetId}]`);
      } else {
        console.log(`  ℹ️ Document [${doc._id}] already has affiliate markDefs.`);
      }

    } catch (err) {
      console.error(`❌ Error updating ${slug}: ${err.message}`);
    }
  }

  console.log('\n🎉 Affiliate markDefs injection complete!');
}

injectCallouts();
