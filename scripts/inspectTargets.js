const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function run() {
  const posts = await client.fetch('*[_type == "post"] { _id, title, seoTitle, "slug": slug.current, excerpt, seoDescription }');
  console.log('Total posts fetched:', posts.length);
  
  const longTitles = posts.filter(p => ((p.seoTitle || p.title) || '').length > 60);
  console.log(`\n--- Titles > 60 chars (${longTitles.length}) ---`);
  longTitles.forEach(p => console.log(`${p.slug} => ${(p.seoTitle || p.title).length} chars: "${p.seoTitle || p.title}"`));

  const longMetas = posts.filter(p => ((p.seoDescription || p.excerpt) || '').length > 158);
  console.log(`\n--- Metas > 158 chars (${longMetas.length}) ---`);
  longMetas.forEach(p => console.log(`${p.slug} => ${(p.seoDescription || p.excerpt).length} chars: "${p.seoDescription || p.excerpt}"`));

  const striking = [
    'what-is-n8n-and-how-to-set-it-up',
    'screaming-frog-alternatives-free-seo-audit-tools',
    'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
    'tapstitch-vs-printful-ecommerce-pipeline',
    'manychat-pricing-2026'
  ];
  console.log('\n--- Striking Distance Posts Details ---');
  posts.filter(p => striking.includes(p.slug)).forEach(p => {
    console.log(`\nSlug: ${p.slug}`);
    console.log(`Title: ${p.title}`);
    console.log(`SeoTitle: "${p.seoTitle || ''}" (Len: ${(p.seoTitle || '').length})`);
    console.log(`SeoDescription: "${p.seoDescription || ''}" (Len: ${(p.seoDescription || '').length})`);
  });
}

run().catch(console.error);
