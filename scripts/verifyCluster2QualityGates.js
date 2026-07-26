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

async function run3LayerAudit() {
  console.log("==========================================================");
  console.log("🛡️ RUNNING 3-LAYER QUALITY & COMPLIANCE AUDIT FOR CLUSTER #2");
  console.log("==========================================================\n");

  let totalPassed = 0;
  const auditResults = [];

  for (let idx = 0; idx < cluster2Slugs.length; idx++) {
    const slug = cluster2Slugs[idx];
    const draftId = `drafts.${slug}`;

    try {
      const doc = await client.getDocument(draftId) || await client.getDocument(slug);

      if (!doc) {
        console.error(`❌ LAYER 1 FAIL: Document [${slug}] not found in Sanity!`);
        continue;
      }

      // Layer 1: Title Tag & SEO
      const titleLen = (doc.title || "").length;
      const layer1Pass = titleLen <= 60 && titleLen > 10;

      // Layer 2: Featured Image Attachment
      const layer2Pass = !!(doc.image && doc.image.asset && doc.image.asset._ref);

      // Layer 3: Affiliate Links & MarkDefs Verification
      let affiliateLinksFound = 0;
      let hasVultrPromo = false;
      let internalLinksFound = 0;

      if (doc.body && Array.isArray(doc.body)) {
        doc.body.forEach(block => {
          if (block.markDefs && Array.isArray(block.markDefs)) {
            block.markDefs.forEach(mark => {
              if (mark._type === 'link' && mark.href) {
                if (mark.href.includes('/go/')) {
                  affiliateLinksFound++;
                  if (mark.href.includes('vultr-promo')) {
                    hasVultrPromo = true;
                  }
                }
                if (mark.href.includes('/services/') || mark.href.includes('/blog/')) {
                  internalLinksFound++;
                }
              }
            });
          }
        });
      }

      const layer3Pass = hasVultrPromo || affiliateLinksFound > 0;

      const is100PercentPassed = layer1Pass && layer2Pass && layer3Pass;
      if (is100PercentPassed) totalPassed++;

      auditResults.push({
        num: idx + 1,
        slug: slug,
        title: doc.title,
        titleLen: titleLen,
        layer1_seo: layer1Pass ? "PASS (<=60c)" : "FAIL",
        layer2_image: layer2Pass ? "PASS (Attached)" : "FAIL",
        layer3_affiliate: layer3Pass ? `PASS (${affiliateLinksFound} /go/ links)` : "FAIL",
        status: is100PercentPassed ? "100% PASSED ✅" : "NEEDS REVIEW ⚠️"
      });

    } catch (err) {
      console.error(`Error auditing ${slug}: ${err.message}`);
    }
  }

  console.log(JSON.stringify(auditResults, null, 2));

  console.log("\n==========================================================");
  console.log(`🎉 3-LAYER AUDIT COMPLETE: ${totalPassed}/${cluster2Slugs.length} POSTS PASSED ALL 3 QUALITY LAYERS WITH 100% SCORE!`);
  console.log("==========================================================\n");
}

run3LayerAudit();
