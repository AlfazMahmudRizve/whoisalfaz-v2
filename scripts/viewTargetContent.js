const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function run() {
  const slugs = [
    'what-is-n8n-and-how-to-set-it-up',
    'screaming-frog-alternatives-free-seo-audit-tools',
    'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
    'tapstitch-vs-printful-ecommerce-pipeline'
  ];

  for (const slug of slugs) {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        seoTitle,
        seoDescription,
        body
      }`,
      { slug }
    );
    if (post) {
      fs.writeFileSync(path.resolve(__dirname, `../scratch/${slug}.md`), post.body || '');
      console.log(`Saved ${slug}.md (${(post.body || '').length} chars)`);
    }
  }
}

run().catch(console.error);
