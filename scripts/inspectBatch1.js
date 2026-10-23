const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

const diamondSlugs = [
  'screaming-frog-alternatives-free-seo-audit-tools',
  'manychat-pricing-2026',
  'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
  'ai-automation-agency-business-model',
  'pinecone-vs-qdrant-vultr-benchmark'
];

async function check() {
  const fs = require('fs');
  for (const s of diamondSlugs) {
    const query = `*[_type == "post" && slug.current == "${s}"][0] {
      _id,
      title,
      seoTitle,
      seoDescription,
      "bodyLength": length(body),
      body
    }`;
    const post = await client.fetch(query);
    if (post) {
      console.log(`=== ${s} ===`);
      console.log(`ID: ${post._id}`);
      console.log(`Title: ${post.title}`);
      console.log(`seoTitle: ${post.seoTitle} (Length: ${post.seoTitle?.length})`);
      console.log(`seoDescription: ${post.seoDescription}`);
      console.log(`Body Length: ${post.bodyLength}`);
      console.log(`First 350 chars of body:\n${post.body?.slice(0, 350)}`);
      console.log(`Last 250 chars of body:\n${post.body?.slice(-250)}`);
      console.log('-----------------------------------------------------\n');
      
      fs.writeFileSync(`scratch/${s}_current.md`, post.body || '');
    } else {
      console.log(`NOT FOUND: ${s}`);
    }
  }
}

check().catch(console.error);
