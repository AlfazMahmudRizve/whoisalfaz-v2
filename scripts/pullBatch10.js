const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

const batch10Slugs = [
  'pinecone-serverless-vs-qdrant-vultr-latency-benchmark',
  'scaling-qdrant-vector-database-to-10-million-embeddings',
  'securing-self-hosted-vector-databases-ssl-vultr-firewall',
  'self-hosted-qdrant-cluster-vultr-docker-sop',
  'the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n'
];

async function pull() {
  console.log('Pulling Batch 10 articles from Sanity CMS...\n');
  for (const slug of batch10Slugs) {
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
    fs.writeFileSync(`scratch/batch10_${slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved scratch/batch10_${slug}.json (Title: ${post.title}, ID: ${post._id}, Length: ${post.body?.length})`);
  }
}

pull().catch(console.error);
