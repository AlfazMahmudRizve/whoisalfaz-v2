const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

// Candidate pages with high impressions and striking positions
const candidateSlugs = [
  'manychat-n8n-async-timeout-fix',
  'manychat-alternatives-2026-top-tools-by-use-case',
  'open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark',
  'elevenlabs-n8n-voice-ai-sales-agent',
  'automate-personal-branding-with-n8n',
  'pinecone-vs-qdrant-n8n-rag-comparison',
  'brevo-cold-email-ip-warming-guide',
  'manychat-whatsapp-b2b-lead-capture-agency',
  'building-multi-tenant-vector-search-n8n-qdrant',
  'automated-pdf-document-chunking-vectorization-n8n',
  'tapstitch-vs-printful-ecommerce-pipeline',
  'adcreative-ai-review-n8n-ad-refresh-loop'
];

async function run() {
  const query = `*[_type == "post" && slug.current in $candidateSlugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    metaDescription,
    "bodyLength": length(body)
  }`;
  
  const posts = await client.fetch(query, { candidateSlugs });
  const map = {};
  posts.forEach(p => map[p.slug] = p);

  console.log('=== CANDIDATE PAGES AUDIT ===\n');
  candidateSlugs.forEach(slug => {
    const p = map[slug];
    if (!p) {
      console.log(`❌ Slug not found in Sanity: ${slug}`);
      return;
    }
    console.log(`Slug: ${slug}`);
    console.log(`  Title: ${p.title}`);
    console.log(`  SEOTitle: ${p.seoTitle || 'MISSING'} (Len: ${(p.seoTitle || '').length})`);
    console.log(`  MetaDescription: ${p.metaDescription ? 'PRESENT (' + p.metaDescription.length + ' chars)' : 'MISSING'}`);
    console.log(`  Body length: ${p.bodyLength}`);
    console.log('');
  });
}

run().catch(console.error);
