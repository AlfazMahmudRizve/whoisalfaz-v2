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

async function run() {
  const p = await client.fetch('*[_type == "post" && slug.current == "dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes"][0]{ affiliates, body }');
  console.log('Affiliates field:', p.affiliates);
  const links = (p.body.match(/https?:\/\/[^\s)]*\/go\/[a-zA-Z0-9_-]+/g) || []);
  console.log('Affiliate links in body:', links);
}

run().catch(console.error);
