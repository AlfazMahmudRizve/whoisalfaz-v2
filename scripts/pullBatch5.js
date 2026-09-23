const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

const batch5Slugs = [
  'automated-pdf-document-chunking-vectorization-n8n',
  'semantic-search-api-n8n-qdrant-fastapi-bridge',
  'closed-loop-lead-attribution-engine',
  'databox-revops-dashboard-pipeline-velocity',
  'whatconverts-vs-callrail-attribution'
];

async function pull() {
  console.log('Pulling Batch 5 articles from Sanity CMS...\n');
  for (const slug of batch5Slugs) {
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
    fs.writeFileSync(`scratch/batch5_${slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved scratch/batch5_${slug}.json (Title: ${post.title}, ID: ${post._id}, Length: ${post.body?.length})`);
  }
}

pull().catch(console.error);
