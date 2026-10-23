const { createClient } = require('@sanity/client');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function run() {
  const posts = await client.fetch('*[_type == "post"]{ _id, "slug": slug.current, title, body }');
  const matching = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]*manychat[^)]*)\)/gi;

  for (const p of posts) {
    if (!p.body) continue;
    let match;
    const links = [];
    while ((match = linkRegex.exec(p.body)) !== null) {
      links.push({ anchor: match[1], url: match[2] });
    }
    if (links.length > 0) {
      matching.push({ slug: p.slug, title: p.title, links });
    }
  }

  console.log(`Found ${matching.length} posts with ManyChat links:`);
  for (const m of matching) {
    console.log(`\n📄 ${m.slug}:`);
    m.links.forEach(l => console.log(`   - [${l.anchor}](${l.url})`));
  }
}

run();
