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
  const target = '## How to Export Dify Workflows to Python Code & Agent Pipelines';
  const linkText = '\n\n> 📘 **Deep-Dive Tutorial:** For a complete code implementation with Dify DSL exports and autonomous execution scripts, read our dedicated [Dify Workflow to Python Agent Export Guide](/blog/dify-workflow-to-python-agent-export-guide).\n';

  if (body.includes(target) && !body.includes('dify-workflow-to-python-agent-export-guide')) {
    body = body.replace(target, target + linkText);
    await client.patch(post._id).set({ body }).commit();
    console.log('✅ Injected contextual link into Dify comparison post');
  } else {
    console.log('Link already present or target not found');
  }
}

run().catch(console.error);
