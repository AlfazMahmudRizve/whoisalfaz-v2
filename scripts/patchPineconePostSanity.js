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

async function run() {
  const post = await client.fetch('*[_type == "post" && slug.current == "pinecone-vs-qdrant-n8n-rag-comparison"][0] { _id, title, seoTitle, seoDescription, body }');
  if (!post) {
    console.error('Post pinecone-vs-qdrant-n8n-rag-comparison not found!');
    return;
  }

  console.log('Found post ID:', post._id);
  console.log('Current seoTitle:', post.seoTitle);
  console.log('Current seoDescription length:', (post.seoDescription || '').length);

  const updatedSeoTitle = 'Pinecone vs Qdrant: Vector DB Guide for n8n RAG (2026)';
  const updatedSeoDesc = 'Compare Pinecone vs Qdrant for n8n RAG pipelines: In-depth benchmark on p95 latency, RAM sizing, Vultr hosting costs, and production Docker setups.';

  let currentBody = typeof post.body === 'string' ? post.body : '';

  // Fix the bash instruction headings to be proper ### or code comments
  currentBody = currentBody
    .replace(/## Apply immediately/g, '### Apply Kernel Tuning Immediately')
    .replace(/## Persist across reboots/g, '### Persist Settings Across Reboots');

  // Check if FAQ section already exists
  if (!/## Frequently Asked Questions/i.test(currentBody)) {
    const faqSection = `

---

## Frequently Asked Questions

### What is the main architectural difference between Pinecone and Qdrant in n8n?
Pinecone is a closed-source, proprietary managed serverless cloud vector database optimized for zero-operational maintenance. Qdrant is an open-source, Rust-native vector search engine designed for raw speed, memory efficiency (via Scalar/Product Quantization), and flexible self-hosting on single-node VPS (e.g., Vultr) or Kubernetes.

### How do you handle metadata filtering quirks in n8n with Qdrant?
When passing dynamic metadata filters from an n8n AI Agent tool into Qdrant, ensure keys are nested under Qdrant's payload object (\`payload.metadata\`). Using an n8n Code node to validate and structure the filter JSON object prevents vector query rejection errors during multi-tenant retrieval.

### When should an agency choose self-hosted Qdrant over Pinecone Serverless?
Agencies handling over 1 million vectors or multiple client tenants should choose self-hosted Qdrant on a Vultr NVMe VPS ($20–$40/mo flat rate) to bypass Pinecone's Standard plan minimums ($50/mo account floor plus per-query charges), while guaranteeing strict GDPR data residency and sub-20ms p95 latency.
`;
    currentBody = currentBody + faqSection;
  }

  console.log('Updating document in Sanity...');
  const res = await client
    .patch(post._id)
    .set({
      seoTitle: updatedSeoTitle,
      seoDescription: updatedSeoDesc,
      body: currentBody,
    })
    .commit();

  console.log('Successfully updated post in Sanity! New SEO Title len:', res.seoTitle.length, '| New SEO Desc len:', res.seoDescription.length);
}

run().catch(console.error);
