const { createClient } = require('@sanity/client');
const fs = require('fs');
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

async function auditExistingBlogs() {
  console.log('🔍 Fetching all published blog posts from Sanity CMS...\n');

  try {
    const posts = await client.fetch(`*[_type == "post"]{
      _id,
      title,
      "slug": slug.current,
      description,
      publishedAt
    } | order(publishedAt desc)`);

    console.log(`TOTAL PUBLISHED POSTS FOUND IN SANITY: ${posts.length}\n`);

    const summary = posts.map((p, index) => ({
      index: index + 1,
      id: p._id,
      slug: p.slug,
      title: p.title,
      description: p.description || ''
    }));

    fs.writeFileSync(
      path.resolve(__dirname, '../existing_sanity_posts.json'),
      JSON.stringify(summary, null, 2)
    );

    console.log(`Saved audit log to existing_sanity_posts.json\n`);
    
    summary.forEach(p => {
      console.log(`[${p.index}] ${p.slug}`);
      console.log(`    Title: "${p.title}"`);
    });

  } catch (err) {
    console.error(`❌ Error fetching from Sanity: ${err.message}`);
    
    // Fallback: Read local draft files
    console.log('\nReading local draft files instead...');
    const rootDir = path.resolve(__dirname, '..');
    const files = fs.readdirSync(rootDir).filter(f => f.startsWith('draft-') && f.endsWith('.json'));
    
    console.log(`FOUND ${files.length} LOCAL DRAFT FILES:`);
    files.forEach((f, i) => {
      const data = JSON.parse(fs.readFileSync(path.join(rootDir, f), 'utf-8'));
      console.log(`[${i+1}] ${data.slug?.current || f}`);
      console.log(`    Title: "${data.title}"`);
    });
  }
}

auditExistingBlogs();
