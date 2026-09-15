const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

async function run() {
  const posts = await client.fetch('*[_type == "post"] { _id, "slug": slug.current, body }');
  console.log(`Checking ${posts.length} posts for heading hierarchy issues...`);

  const skips = [];

  for (const post of posts) {
    if (typeof post.body !== 'string') continue;

    const lines = post.body.split('\n');
    let lastLevel = 1; // H1 is on page header
    const headingTrail = ['H1'];
    let postHasSkip = false;
    const skipDetails = [];

    for (const line of lines) {
      const match = line.match(/^(#{1,6})\s+(.*)/);
      if (match) {
        const level = match[1].length;
        if (level > lastLevel + 1) {
          postHasSkip = true;
          skipDetails.push(`Jumped from H${lastLevel} to H${level}: "${match[2]}"`);
        }
        lastLevel = level;
        headingTrail.push(`H${level}`);
      }
    }

    if (postHasSkip) {
      skips.push({
        slug: post.slug,
        skipDetails
      });
    }
  }

  console.log(`\nFound ${skips.length} posts with internal markdown heading skips:`);
  skips.forEach(s => {
    console.log(`\nSlug: ${s.slug}`);
    s.skipDetails.forEach(d => console.log(`  - ${d}`));
  });
}

run().catch(console.error);
