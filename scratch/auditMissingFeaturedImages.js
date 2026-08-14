const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13'
});

async function auditImages() {
  console.log('Auditing Sanity CMS posts for missing featured images...');
  const posts = await client.fetch(`*[_type == "post"]{ _id, title, "slug": slug.current, "hasImage": defined(image.asset) }`);

  const missing = posts.filter(p => !p.hasImage);
  const present = posts.filter(p => p.hasImage);

  console.log(`\n📊 Audit Summary:`);
  console.log(`Total Posts: ${posts.length}`);
  console.log(`Posts with Featured Image: ${present.length}`);
  console.log(`Posts MISSING Featured Image: ${missing.length}\n`);

  if (missing.length > 0) {
    console.log('🚨 Posts missing a featured image:');
    missing.forEach((p, idx) => {
      console.log(`${idx + 1}. [${p.slug}] "${p.title}" (ID: ${p._id})`);
    });
  } else {
    console.log('🎉 All posts have featured images!');
  }
}

auditImages().catch(err => console.error(err));
