const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

const batch3Slugs = [
  'headless-wordpress-vs-monolithic',
  'case-study-veloryc-premium-ecommerce',
  'open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark',
  'n8n-multi-tenant-vector-schema',
  'pinecone-vs-qdrant-vultr-benchmark'
];

async function pull() {
  console.log('Pulling Batch 3 articles from Sanity CMS...\n');
  for (const slug of batch3Slugs) {
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
    fs.writeFileSync(`scratch/batch3_${slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved scratch/batch3_${slug}.json (Title: ${post.title}, ID: ${post._id}, Length: ${post.body?.length})`);
  }
}

pull().catch(console.error);
