const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

const batch6Slugs = [
  'manychat-n8n-whatsapp-voice-bot',
  'lead-enrichment-with-n8n',
  'zero-data-retention-enterprise-rag-vultr-vps',
  'building-an-enterprise-knowledge-graph-rag-n8n',
  'building-multi-tenant-vector-search-n8n-qdrant'
];

async function pull() {
  console.log('Pulling Batch 6 articles from Sanity CMS...\n');
  for (const slug of batch6Slugs) {
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
    fs.writeFileSync(`scratch/batch6_${slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved scratch/batch6_${slug}.json (Title: ${post.title}, ID: ${post._id}, Length: ${post.body?.length})`);
  }
}

pull().catch(console.error);
