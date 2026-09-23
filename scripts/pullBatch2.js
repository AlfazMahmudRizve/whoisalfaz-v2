const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

const batch2Slugs = [
  'elevenlabs-n8n-voice-ai-sales-agent',
  'corrective-rag-crag-blueprint-n8n-tavily-fallback',
  'self-hosted-qdrant-docker-vultr',
  'emergent-ai-autonomous-gtm-guide',
  'dify-vs-n8n-architecture'
];

async function pull() {
  console.log('Pulling Batch 2 articles from Sanity CMS...\n');
  for (const slug of batch2Slugs) {
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
    fs.writeFileSync(`scratch/batch2_${slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved scratch/batch2_${slug}.json (Title: ${post.title}, Length: ${post.body?.length})`);
  }
}

pull().catch(console.error);
