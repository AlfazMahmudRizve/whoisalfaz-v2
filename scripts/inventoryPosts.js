const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

async function run() {
  const query = `*[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    "categories": categories[]->name,
    "bodyLength": length(body),
    date
  }`;
  
  const posts = await client.fetch(query);
  console.log(`TOTAL_POSTS: ${posts.length}`);
  
  const fs = require('fs');
  fs.writeFileSync('scratch/all_posts_inventory.json', JSON.stringify(posts, null, 2));
  console.log('Saved to scratch/all_posts_inventory.json');
  
  // Print breakdown by category
  const catCount = {};
  posts.forEach(p => {
    const cats = p.categories || ['Uncategorized'];
    cats.forEach(c => {
      catCount[c] = (catCount[c] || 0) + 1;
    });
  });
  console.log('\n--- BY CATEGORY ---');
  console.table(catCount);
}

run().catch(console.error);
