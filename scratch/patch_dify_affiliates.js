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

const slug = 'dify-workflow-to-python-agent-export-guide';

async function run() {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) throw new Error('Not found: ' + slug);

  let body = post.body;

  // 1. Dify Affiliate Callout
  const difyTarget = '## <mark>How Dify DSL Works: The Bridge Between Visual Canvas and Code</mark>';
  const difyCallout = `\n\n> 🚀 **Deploy on Dify:** If you haven't set up your visual canvas yet, you can [start for free on Dify.ai](https://whoisalfaz.me/go/dify) to prototype and test your multi-model agent workflows before exporting.\n`;
  if (body.includes(difyTarget) && !body.includes('whoisalfaz.me/go/dify')) {
    body = body.replace(difyTarget, difyTarget + difyCallout);
  }

  // 2. Vultr VPS Affiliate Callout
  const vultrTarget = "### Why You Don't Convert DSL to Raw Python";
  const vultrCallout = `\n\n> 💡 **Self-Hosting Dify on Private Infrastructure:** For enterprise workloads requiring zero-data-retention and dedicated GPU/NVMe vector storage, deploy Dify via Docker Compose on [Vultr High-Frequency Compute (Claim $250 Free Credit)](https://whoisalfaz.me/go/vultr-promo/) to slash API latency and retain 100% data governance.\n`;
  if (body.includes(vultrTarget) && !body.includes('whoisalfaz.me/go/vultr')) {
    body = body.replace(vultrTarget, vultrTarget + vultrCallout);
  }

  // 3. n8n Affiliate Callout
  const n8nTarget = '## <mark>Hybrid Architecture: Triggering Dify via n8n Orchestration</mark>';
  const n8nCallout = `\n\n> ⚡ **n8n Orchestration Engine:** To automate your ingestion webhooks, cron scheduling, and multi-channel CMS distribution without maintenance headaches, deploy on [n8n Automation Engine](https://whoisalfaz.me/go/n8n).\n`;
  if (body.includes(n8nTarget) && !body.includes('whoisalfaz.me/go/n8n')) {
    body = body.replace(n8nTarget, n8nTarget + n8nCallout);
  }

  const affiliates = ['dify', 'vultr', 'n8n'];

  console.log('Patching post with affiliate links and metadata...');
  await client.patch(post._id).set({
    body,
    affiliates
  }).commit();

  console.log('✅ Successfully updated post with affiliate links!');
}

run().catch(console.error);
