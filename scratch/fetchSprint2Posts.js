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

async function main() {
  const slugs = [
    'manychat-pricing-2026',
    'screaming-frog-alternatives-free-seo-audit-tools',
    'manychat-instagram-summit-2026-agenda-review-bonus'
  ];

  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body
  }`;

  const posts = await client.fetch(query, { slugs });
  fs.writeFileSync(path.resolve(__dirname, 'sprint2_posts.json'), JSON.stringify(posts, null, 2));
  console.log(`Fetched ${posts.length} posts from Sanity.`);
  for (const p of posts) {
    console.log(`- [${p.slug}] (ID: ${p._id}) SEO Title: "${p.seoTitle}" (${p.seoTitle?.length || 0} chars)`);
  }
}

main().catch(console.error);
