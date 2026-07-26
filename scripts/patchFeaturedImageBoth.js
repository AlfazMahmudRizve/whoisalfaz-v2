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

const slug = process.argv[2];
const imagePath = process.argv[3];

if (!slug || !imagePath) {
  console.error('Usage: node scripts/patchFeaturedImageBoth.js <slug> <imagePath>');
  process.exit(1);
}

async function patchBoth() {
  const cleanSlug = slug.replace(/^drafts\./, '');
  const draftId = `drafts.${cleanSlug}`;
  const pubId = cleanSlug;

  console.log(`🔍 Ingesting image for slug [${cleanSlug}]...`);

  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Image file not found: ${imagePath}`);
    process.exit(1);
  }

  try {
    // 1. Upload asset to Sanity CDN once
    const fileStream = fs.createReadStream(imagePath);
    const asset = await client.assets.upload('image', fileStream, {
      filename: `${cleanSlug}-featured.jpg`,
    });
    console.log(`  ✅ Asset uploaded to Sanity CDN: ${asset._id}`);

    const imageRef = {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };

    // 2. Patch draft document if exists
    try {
      await client.patch(draftId).set({ image: imageRef }).commit();
      console.log(`  🎉 Document [${draftId}] successfully updated!`);
    } catch (e1) {
      console.warn(`  ⚠️ Draft doc [${draftId}] update notice: ${e1.message}`);
    }

    // 3. Patch published document if exists
    try {
      await client.patch(pubId).set({ image: imageRef }).commit();
      console.log(`  🎉 Document [${pubId}] successfully updated!`);
    } catch (e2) {
      console.warn(`  ⚠️ Published doc [${pubId}] update notice: ${e2.message}`);
    }

    console.log(`\n✅ Image patching complete for [${cleanSlug}]!`);
  } catch (err) {
    console.error(`❌ Global error patching ${cleanSlug}: ${err.message}`);
  }
}

patchBoth();
