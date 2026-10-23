const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function findTech() {
  const cats = await client.fetch(`*[_type == "category"]{ _id, title, "slug": slug.current }`);
  console.log('Categories in Sanity:', cats);

  const posts = await client.fetch(`*[_type == "post" && (body match "*technology*" || defined(categories))] {
    _id,
    "slug": slug.current,
    "categoryTitles": categories[]->title,
    "categorySlugs": categories[]->slug.current
  }`);

  console.log('Posts referencing category technology:');
  posts.forEach(p => {
    if (p.categorySlugs && p.categorySlugs.includes('technology')) {
      console.log('👉 Matched post with category technology:', p.slug);
    }
  });

  const rawMatches = await client.fetch(`*[body match "*category/technology*"] { _id, "slug": slug.current }`);
  console.log('Posts with in-body link to category/technology:', rawMatches);
}

findTech().catch(console.error);
