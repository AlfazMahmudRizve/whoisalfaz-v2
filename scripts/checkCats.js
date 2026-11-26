const { createClient } = require('@sanity/client');
require('dotenv').config({ path: 'E:/Ai Agents/whoisalfaz.me/Web Projects/antigravity/whoisalfaz-v2/.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false
});

async function run() {
  const cat = await client.fetch('*[_type == "category" && slug.current == "ai-lead-generation"][0]');
  console.log('Category doc:', cat);
  const postsWithCat = await client.fetch('*[_type == "post" && references($id)]{title, "slug": slug.current}', { id: cat._id });
  console.log('Posts referencing this category:', postsWithCat);
  const allPostCategories = await client.fetch('*[_type == "post"]{title, "categories": categories[]->name}');
  const match = allPostCategories.filter(p => p.categories && p.categories.some(c => c && c.toLowerCase().includes('lead')));
  console.log('Posts with lead in category:', match);
}

run().catch(console.error);
