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

function getWordCountFromPortableText(body) {
  if (!body) return 0;
  if (typeof body === 'string') {
    return body.split(/\s+/g).filter(Boolean).length;
  }
  if (Array.isArray(body)) {
    const text = body.map(block => {
      if (block && Array.isArray(block.children)) {
        return block.children.map(c => c.text || '').join(' ');
      }
      return '';
    }).join(' ');
    return text.split(/\s+/g).filter(Boolean).length;
  }
  return 0;
}

async function validateClaims() {
  console.log("==========================================================");
  console.log("🔍 VALIDATING USER CLAIMS FOR CLUSTER #2 POSTS IN SANITY");
  console.log("==========================================================\n");

  const results = [];
  let thinCount = 0;
  let tagIssueCount = 0;
  let dateIssueCount = 0;

  for (let i = 0; i < cluster2Slugs.length; i++) {
    const slug = cluster2Slugs[i];
    const posts = await client.fetch(`*[_type == "post" && slug.current == $slug]`, { slug });

    if (posts.length === 0) {
      console.error(`❌ Post missing in Sanity: ${slug}`);
      continue;
    }

    const post = posts[0];
    const wordCount = getWordCountFromPortableText(post.body);
    const hasFunnelTag = (post.description || "").includes('[') || (post.seoDescription || "").includes('[');
    const dateVal = post.date;
    const hasDateIssue = !dateVal || dateVal.includes('1970');

    if (wordCount < 1500) thinCount++;
    if (hasFunnelTag) tagIssueCount++;
    if (hasDateIssue) dateIssueCount++;

    results.push({
      num: i + 1,
      slug: slug,
      title: post.title,
      wordCount: wordCount,
      isThin: wordCount < 1500 ? "⚠️ THIN (<1500w)" : "✅ GOOD (>=1500w)",
      hasFunnelTag: hasFunnelTag ? "❌ HAS [BOFU/MOFU] TAG" : "✅ CLEAN",
      date: dateVal || "NULL/MISSING",
      dateValid: hasDateIssue ? "❌ INVALID DATE (1970)" : "✅ VALID DATE"
    });
  }

  console.log(JSON.stringify(results, null, 2));

  console.log("\n==========================================================");
  console.log(`📊 SUMMARY OF AUDIT FINDINGS:`);
  console.log(`- Thin Content Posts (<1500 words): ${thinCount} / 20`);
  console.log(`- Posts with [BOFU/MOFU] tags in description: ${tagIssueCount} / 20`);
  console.log(`- Posts with Invalid Date (1970/null): ${dateIssueCount} / 20`);
  console.log("==========================================================\n");
}

validateClaims();
