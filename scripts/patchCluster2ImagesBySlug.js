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
  console.error('Usage: node scripts/patchCluster2ImagesBySlug.js <slug> <imagePath>');
  process.exit(1);
}

async function patchBySlug() {
  try {
    const posts = await client.fetch(`*[_type == "post" && slug.current == $slug]`, { slug });
    
    if (!posts || posts.length === 0) {
      console.error(`❌ Post with slug [${slug}] not found in Sanity!`);
      process.exit(1);
    }

    const docId = posts[0]._id;
    console.log(`✅ Found document ID [${docId}] for slug [${slug}]`);

    const fileStream = fs.createReadStream(imagePath);
    const asset = await client.assets.upload('image', fileStream, {
      filename: `${slug}-featured.jpg`,
    });

    console.log(`  ✅ Asset uploaded to Sanity CDN: ${asset._id}`);

    await client
      .patch(docId)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      })
      .commit();

    console.log(`  🎉 Document [${docId}] updated with featured image!`);

  } catch (err) {
    console.error(`❌ Error patching image for ${slug}: ${err.message}`);
  }
}

patchBySlug();
