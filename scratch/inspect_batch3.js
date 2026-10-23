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

const slugs = [
  'tapstitch-vs-printful-ecommerce-pipeline',
  'adcreative-ai-review-n8n-ad-refresh-loop',
  'pinecone-vs-qdrant-n8n-rag-comparison',
  'building-multi-tenant-vector-search-n8n-qdrant',
  'automated-pdf-document-chunking-vectorization-n8n'
];

async function run() {
  const query = `*[_type == "post" && slug.current in $slugs]{
    "slug": slug.current,
    title,
    seoTitle,
    metaDescription,
    body
  }`;
  const posts = await client.fetch(query, { slugs });
  posts.forEach(p => {
    console.log(`=== Slug: ${p.slug} ===`);
    console.log(`Title: ${p.title}`);
    console.log(`SEOTitle: ${p.seoTitle} (len: ${(p.seoTitle || '').length})`);
    console.log(`MetaDescription: ${p.metaDescription}`);
    const headings = p.body.split('\n').filter(l => l.startsWith('#'));
    console.log(`Headings:\n` + headings.slice(0, 6).join('\n'));
    console.log('');
  });
}

run().catch(console.error);
