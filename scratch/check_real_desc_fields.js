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

async function run() {
  const query = `*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    description,
    metaDescription
  }`;
  
  const posts = await client.fetch(query);
  console.log(`Total posts: ${posts.length}`);

  let missingSeoDesc = 0;
  let missingBoth = 0;
  let populatedSeoDesc = 0;
  let populatedDesc = 0;
  let populatedMetaDesc = 0;

  const missingBothList = [];

  posts.forEach(p => {
    const hasSeoDesc = p.seoDescription && p.seoDescription.trim().length > 0;
    const hasDesc = p.description && p.description.trim().length > 0;
    const hasMetaDesc = p.metaDescription && p.metaDescription.trim().length > 0;

    if (hasSeoDesc) populatedSeoDesc++;
    if (hasDesc) populatedDesc++;
    if (hasMetaDesc) populatedMetaDesc++;

    if (!hasSeoDesc && !hasDesc) {
      missingBoth++;
      missingBothList.push(p);
    } else if (!hasSeoDesc) {
      missingSeoDesc++;
    }
  });

  console.log(`\n=== FIELD AUDIT ===`);
  console.log(`Posts with seoDescription: ${populatedSeoDesc} / ${posts.length}`);
  console.log(`Posts with description: ${populatedDesc} / ${posts.length}`);
  console.log(`Posts with metaDescription: ${populatedMetaDesc} / ${posts.length}`);
  console.log(`Posts missing BOTH seoDescription and description: ${missingBoth} / ${posts.length}`);
  console.log(`Posts with description but MISSING seoDescription: ${missingSeoDesc} / ${posts.length}`);

  if (missingBothList.length > 0) {
    console.log(`\n--- POSTS COMPLETELY MISSING ANY DESCRIPTION (${missingBothList.length}) ---`);
    missingBothList.forEach((p, idx) => {
      console.log(`${idx + 1}. [${p.slug}] - Title: "${p.title}"`);
    });
  }

  // Also check sample descriptions
  console.log(`\n--- SAMPLE CHECK ---`);
  posts.slice(0, 5).forEach(p => {
    console.log(`[${p.slug}]`);
    console.log(`  seoDescription: ${p.seoDescription || 'NONE'}`);
    console.log(`  description: ${p.description || 'NONE'}`);
    console.log(`  metaDescription: ${p.metaDescription || 'NONE'}`);
  });
}

run().catch(console.error);
