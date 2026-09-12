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
  const slugs = [
    'what-is-n8n-and-how-to-set-it-up',
    'screaming-frog-alternatives-free-seo-audit-tools',
    'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
    'tapstitch-vs-printful-ecommerce-pipeline',
    'manychat-pricing-2026'
  ];

  for (const slug of slugs) {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        seoTitle,
        seoDescription,
        excerpt,
        body
      }`,
      { slug }
    );

    if (!post) {
      console.log(`Post not found for slug: ${slug}`);
      continue;
    }

    console.log(`\n======================================================`);
    console.log(`SLUG: ${slug} (ID: ${post._id})`);
    console.log(`TITLE: ${post.title}`);
    console.log(`SEO TITLE: ${post.seoTitle}`);
    console.log(`SEO DESC: ${post.seoDescription}`);
    
    // Check if body is string or array
    let text = '';
    if (typeof post.body === 'string') {
      text = post.body;
    } else if (Array.isArray(post.body)) {
      text = post.body.map(b => {
        if (b._type === 'block') {
          return (b.children || []).map(c => c.text).join('');
        }
        return '';
      }).join('\n');
    }
    console.log(`BODY TYPE: ${typeof post.body}, ARRAY LENGTH: ${Array.isArray(post.body) ? post.body.length : 'N/A'}`);
    console.log(`ESTIMATED WORDS: ${text.split(/\s+/).filter(Boolean).length}`);
    console.log(`HEADINGS FOUND:`);
    if (Array.isArray(post.body)) {
      post.body.forEach((b, i) => {
        if (b._type === 'block' && b.style && b.style.startsWith('h')) {
          const hText = (b.children || []).map(c => c.text).join('');
          console.log(`  [${b.style}] ${hText}`);
        }
      });
    } else {
      const lines = text.split('\n');
      lines.forEach(l => {
        if (l.startsWith('#')) {
          console.log(`  ${l}`);
        }
      });
    }
  }
}

run().catch(console.error);
