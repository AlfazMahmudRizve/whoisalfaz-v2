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

function trimDesc(text, max = 154) {
  if (!text || text.length <= max) return text;
  let trimmed = text.slice(0, max);
  // Cut at last space
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace > 120) {
    trimmed = trimmed.slice(0, lastSpace);
  }
  if (!trimmed.endsWith('.')) {
    trimmed += '.';
  }
  return trimmed;
}

async function fixMeta() {
  console.log('✂️ Trimming meta descriptions over 155 chars in Sanity...');
  const posts = await client.fetch(`*[_type == "post" && (defined(seoDescription) || defined(description))]{
    _id,
    "slug": slug.current,
    seoDescription,
    description
  }`);

  let trimmedCount = 0;
  for (const p of posts) {
    let changed = false;
    const patch = {};

    if (p.seoDescription && p.seoDescription.length > 155) {
      patch.seoDescription = trimDesc(p.seoDescription);
      changed = true;
      console.log(`[${p.slug}] Trimmed seoDescription: ${p.seoDescription.length} -> ${patch.seoDescription.length}`);
    }
    if (p.description && p.description.length > 155) {
      patch.description = trimDesc(p.description);
      changed = true;
      console.log(`[${p.slug}] Trimmed description: ${p.description.length} -> ${patch.description.length}`);
    }

    if (changed) {
      await client.patch(p._id).set(patch).commit();
      trimmedCount++;
    }
  }

  console.log(`\n🎉 Trimmed meta descriptions across ${trimmedCount} posts!`);
}

fixMeta().catch(console.error);
