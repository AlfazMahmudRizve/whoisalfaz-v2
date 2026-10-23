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

const slug = 'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes';

async function run() {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  if (!body.includes('https://whoisalfaz.me/go/dify')) {
    const target = '## How Do Performance, Latency, and Self-Hosting Unit Economics Compare?';
    const cta = `\n\n> 🚀 **Deploying Your Stack:** Whether you choose the visual RAG strength of [Dify.ai](https://whoisalfaz.me/go/dify) or the multi-system execution engine of [n8n](https://whoisalfaz.me/go/n8n), both platforms run with zero licensing fees on high-frequency NVMe cloud compute via [Vultr (Claim $250 Free Credit)](https://whoisalfaz.me/go/vultr-promo/).\n`;
    if (body.includes(target)) {
      body = body.replace(target, target + cta);
      await client.patch(post._id).set({
        body,
        affiliates: ['dify', 'n8n', 'vultr', 'qdrant']
      }).commit();
      console.log('✅ Updated Dify vs n8n pillar with affiliate links!');
    }
  } else {
    console.log('Affiliate links already present in pillar.');
  }
}

run().catch(console.error);
