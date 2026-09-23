const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

const batch9Slugs = [
  'outstanding-ideas-for-b2b-lead-capture',
  'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
  'high-throughput-batch-vector-ingestion-n8n-qdrant',
  'hybrid-vector-keyword-search-qdrant-n8n-pipeline',
  'pinecone-namespaces-vs-qdrant-payload-filters-comparison'
];

async function pull() {
  console.log('Pulling Batch 9 articles from Sanity CMS...\n');
  for (const slug of batch9Slugs) {
    const query = `*[_type == "post" && slug.current == "${slug}"][0] {
      _id,
      title,
      "slug": slug.current,
      seoTitle,
      seoDescription,
      description,
      body,
      date,
      "categories": categories[]->name
    }`;
    const post = await client.fetch(query);
    if (!post) {
      console.error(`Post not found: ${slug}`);
      continue;
    }
    fs.writeFileSync(`scratch/batch9_${slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved scratch/batch9_${slug}.json (Title: ${post.title}, ID: ${post._id}, Length: ${post.body?.length})`);
  }
}

pull().catch(console.error);
