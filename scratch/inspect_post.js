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

const slug = process.argv[2] || 'manychat-pricing-2026';

async function run() {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });
  if (!post) {
    console.log('Post not found for slug:', slug);
    return;
  }
  console.log('=== POST METADATA ===');
  console.log('ID:', post._id);
  console.log('Title:', post.title);
  console.log('SEOTitle:', post.seoTitle, 'len:', (post.seoTitle || '').length);
  console.log('MetaDescription:', post.metaDescription, 'len:', (post.metaDescription || '').length);
  const headings = (post.body || '').split('\n').filter(l => l.startsWith('#'));
  console.log('\nHeadings:\n' + headings.join('\n'));
}

run().catch(console.error);
