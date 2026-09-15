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

  const targets = [
    'pinecone-vs-qdrant-n8n-rag-comparison',
    'pinecone-vs-qdrant-vultr-benchmark',
    'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
    'dify-vs-n8n-architecture',
    'open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark',
    'n8n-rag-tutorial',
    'screaming-frog-alternatives-free-seo-audit-tools',
    'what-is-n8n-and-how-to-set-it-up',
    'manychat-pricing-2026',
    'self-hosted-qdrant-docker-vultr',
  ];
  console.log('\n--- TARGET POSTS IN SANITY ---');
  posts.filter(p => targets.includes(p.slug) || targets.some(t => p.slug.includes(t))).forEach(p => {
    console.log(`\nSlug: ${p.slug}`);
    console.log(`Title: ${p.title}`);
    console.log(`SeoTitle: "${p.seoTitle || ''}" (Len: ${(p.seoTitle || '').length})`);
    console.log(`SeoDescription: "${p.seoDescription || ''}" (Len: ${(p.seoDescription || '').length})`);
  });

  console.log('\n--- ALL POSTS WITH RAG, PINECONE, QDRANT, EMBEDDING, DIFY ---');
  posts.filter(p => /rag|pinecone|qdrant|embedding|voyage|dify/i.test(p.slug)).forEach(p => {
    console.log(`- ${p.slug} => "${p.seoTitle || p.title}"`);
  });

  const detailedPosts = await client.fetch('*[_type == "post" && slug.current in $targets] { "slug": slug.current, body, schemaMarkup }', { targets });
  console.log('\n--- HEADING HIERARCHY & FAQ CHECK ---');
  detailedPosts.forEach(p => {
    if (p.slug === 'pinecone-vs-qdrant-n8n-rag-comparison') {
      console.log('pinecone-vs-qdrant-n8n-rag-comparison raw body type:', typeof p.body, Array.isArray(p.body) ? `Array length ${p.body.length}` : '');
      const headingsFound = (typeof p.body === 'string' ? p.body : '').split(/\r?\n/).filter(l => l.trim().startsWith('#'));
      console.log('Headings found in pinecone-vs-qdrant-n8n-rag-comparison:', headingsFound);
    }
    let text = typeof p.body === 'string' ? p.body : '';
    if (Array.isArray(p.body)) {
      text = p.body.map(b => (b.children ? b.children.map(c => c.text).join('') : '')).join('\n');
    }
    const lines = text.split(/\r?\n/);
    const headings = [];
    lines.forEach(l => {
      const m = l.match(/^(#{1,6})\s+(.+)$/);
      if (m) {
        headings.push({ level: m[1].length, text: m[2] });
      }
    });

    let prevLevel = 1; // assuming page title is H1
    let skips = [];
    headings.forEach(h => {
      if (h.level > prevLevel + 1) {
        skips.push(`H${prevLevel} -> H${h.level}: "${h.text}"`);
      }
      prevLevel = h.level;
    });

    const hasFaq = /faq|frequently asked/i.test(text) || (p.schemaMarkup && /FAQPage/i.test(p.schemaMarkup));
    console.log(`- Headings total: ${headings.length}`);
    console.log(`- Has FAQ section: ${hasFaq ? 'YES' : 'NO'}`);
    if (skips.length > 0) {
      console.log(`- Heading Skips Found:`, skips);
    } else {
      console.log(`- Heading Hierarchy: CLEAN (No skips)`);
    }
  });
}

run().catch(console.error);

