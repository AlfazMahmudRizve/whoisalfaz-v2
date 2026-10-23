const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function upgradeAdCreative() {
  const slug = 'adcreative-ai-review-n8n-ad-refresh-loop';
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  // Ensure FAQ block exists and contains the exact question from Search Console
  const faqHeader = '## Frequently Asked Questions';
  const newFaq = `
## Frequently Asked Questions

### How does AI handle automatic creative rotation and refreshing of ads?
AI handles automatic creative rotation by connecting Meta Marketing API performance telemetry to an automated pipeline. When an ad reaches fatigue thresholds (e.g. ad frequency exceeds 2.8 or click-through rates drop below your benchmark), a webhook triggers an orchestration engine like n8n. The system invokes an AI design model (such as AdCreative.ai) to generate brand-compliant ad creatives, uploads the new visual assets into the existing campaign ad set, and pauses fatigued variants—all without manual media buyer intervention.

### How often should automated ad creative refresh loops run in Meta Ads?
For ad spends between $5,000 and $20,000 per month, automated refresh loops should evaluate ad frequency and ROAS every 48 to 72 hours. Running rotation loops weekly allows Meta's auction algorithm sufficient time to exit the learning phase while ensuring ad fatigue never degrades return on ad spend.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaq.replace('## Frequently Asked Questions\n', ''));
  } else {
    body = body + '\n\n' + newFaq;
  }

  const metaDesc = 'Learn how AI automates creative rotation and refreshing of Meta ads using AdCreative.ai and n8n. Prevent creative fatigue with automated weekly ad loops.';

  await client.patch(post._id).set({
    body,
    metaDescription: metaDesc
  }).commit();
  console.log('✅ Updated:', slug);
}

async function upgradeTapstitch() {
  const slug = 'tapstitch-vs-printful-ecommerce-pipeline';
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  const faqHeader = '## Frequently Asked Questions';
  const newFaq = `
## Frequently Asked Questions

### Tapstitch vs Printful: Which has higher profit margins for print-on-demand?
Tapstitch generally delivers 25% to 40% higher gross margins compared to Printful on core streetwear garments (such as heavyweight oversized tees and luxury french terry hoodies), because Tapstitch operates factory-direct manufacturing out of Asia. Printful offers faster domestic US/EU fulfillment (3–5 business days) but charges significantly higher base product fees.

### Can you automate order routing between Tapstitch and Printful in Shopify?
Yes. Using an n8n webhook routing workflow, Shopify stores can dynamically route orders based on customer destination and delivery speed requirements: routing standard overseas orders to Tapstitch for maximum profit margin, and domestic express orders to Printful for rapid delivery.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaq.replace('## Frequently Asked Questions\n', ''));
  } else {
    body = body + '\n\n' + newFaq;
  }

  const newSeoTitle = 'Tapstitch vs Printful [2026]: POD Cost & Margin Teardown'; // 56 chars
  const metaDesc = 'Tapstitch vs Printful POD comparison for 2026: Compare base garment costs, print quality, shipping times, and automated n8n order routing on Shopify.';

  await client.patch(post._id).set({
    body,
    seoTitle: newSeoTitle,
    metaDescription: metaDesc
  }).commit();
  console.log('✅ Updated:', slug);
}

async function upgradePineconeVsQdrant() {
  const slug = 'pinecone-vs-qdrant-n8n-rag-comparison';
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  const faqHeader = '## Frequently Asked Questions';
  const newFaq = `
## Frequently Asked Questions

### Pinecone vs Qdrant: Which vector database is cheaper for 1M embeddings?
Qdrant is substantially cheaper for 1 million embeddings when self-hosted on a cloud VPS (e.g., $12–$24/month on Vultr or Hetzner with Docker). With scalar quantization enabled, 1M OpenAI 1536-dimensional vectors consume less than 2GB of RAM. Pinecone Serverless charges based on read/write units and storage, which can easily scale past $70–$150/month under sustained query throughput.

### Are there good n8n alternatives for RAG pipelines?
While n8n is one of the most flexible workflow orchestrators with native LangChain nodes, Dify.ai is a leading specialized alternative for pure conversational RAG, offering built-in document chunking, prompt evaluation, and hybrid search out of the box. Flowise and Langflow are visual UI alternatives dedicated strictly to LangChain graphs.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaq.replace('## Frequently Asked Questions\n', ''));
  } else {
    body = body + '\n\n' + newFaq;
  }

  const metaDesc = 'Compare Pinecone vs Qdrant vector databases for n8n RAG pipelines. Benchmark zero-ops serverless costs, latency, RAM quantization, and Docker deployment.';

  await client.patch(post._id).set({
    body,
    metaDescription: metaDesc
  }).commit();
  console.log('✅ Updated:', slug);
}

async function upgradeMultiTenantQdrant() {
  const slug = 'building-multi-tenant-vector-search-n8n-qdrant';
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  const faqHeader = '## Frequently Asked Questions';
  const newFaq = `
## Frequently Asked Questions

### How do you achieve tenant isolation in Qdrant vector databases?
Tenant isolation in Qdrant is best implemented using a single collection partitioned by payload filters. Every vector point is tagged with a \`tenant_id\` metadata field. During similarity searches, Qdrant applies payload index filters directly during HNSW graph traversal, guaranteeing that an enterprise client's search never accesses or leaks vectors belonging to other tenants.

### What is the latency impact of payload filtering in multi-tenant Qdrant?
Because Qdrant builds dedicated payload indices (keyword and integer indices) alongside its HNSW graph, filtered vector searches introduce less than 2ms of overhead compared to unpartitioned searches, maintaining sub-15ms p95 retrieval latency.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaq.replace('## Frequently Asked Questions\n', ''));
  } else {
    body = body + '\n\n' + newFaq;
  }

  const metaDesc = 'Architect secure multi-tenant vector search in n8n with Qdrant payload filters. Isolate tenant embeddings, validate JWT tokens, and scale B2B SaaS RAG.';

  await client.patch(post._id).set({
    body,
    metaDescription: metaDesc
  }).commit();
  console.log('✅ Updated:', slug);
}

async function upgradePdfChunking() {
  const slug = 'automated-pdf-document-chunking-vectorization-n8n';
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  const faqHeader = '## Frequently Asked Questions';
  const newFaq = `
## Frequently Asked Questions

### What is the best chunking strategy for complex PDF documents in n8n?
The optimal strategy is **Recursive Character Splitting with Semantic Hierarchy Preservation**. In n8n, split documents using double newlines (\`\\n\\n\`) as primary paragraph delimiters with a target chunk size of 512 to 1,000 tokens and 10% to 15% overlap. Ensure metadata (document ID, page number, section header) is injected into each chunk payload so downstream RAG models maintain source context.

### How do you handle scanned PDFs with tables in n8n?
For scanned PDFs or complex tables, standard text extraction yields jumbled characters. The production solution routes the PDF through an OCR document parser (such as Unstructured.io, Marker, or Claude 3.5 Sonnet Vision) before feeding clean markdown tables into the n8n vectorization pipeline.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaq.replace('## Frequently Asked Questions\n', ''));
  } else {
    body = body + '\n\n' + newFaq;
  }

  const metaDesc = 'Step-by-step SOP for automated PDF document chunking and vectorization in n8n. Semantic splitting, hierarchical metadata extraction, and Qdrant ingestion.';

  await client.patch(post._id).set({
    body,
    metaDescription: metaDesc
  }).commit();
  console.log('✅ Updated:', slug);
}

async function runAll() {
  console.log('🚀 Running Batch 3 Sanity Upgrades...');
  await upgradeAdCreative();
  await upgradeTapstitch();
  await upgradePineconeVsQdrant();
  await upgradeMultiTenantQdrant();
  await upgradePdfChunking();
  console.log('🎉 All Batch 3 posts upgraded successfully!');
}

runAll().catch(console.error);
