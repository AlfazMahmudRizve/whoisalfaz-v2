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

async function patchImage() {
  const documentId = process.argv[2];
  const imagePath = process.argv[3];

  if (!documentId || !imagePath) {
    console.error('Usage: node patchFeaturedImages.js <document-id> <image-path>');
    process.exit(1);
  }

  const absolutePath = path.resolve(imagePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Image file not found: ${absolutePath}`);
    process.exit(1);
  }

  try {
    console.log(`Uploading asset to Sanity CDN for post [${documentId}]: ${path.basename(absolutePath)}...`);
    const fileStream = fs.createReadStream(absolutePath);

    const asset = await client.assets.upload('image', fileStream, {
      filename: path.basename(absolutePath),
    });

    console.log(`  ✅ Asset uploaded successfully: ${asset._id}`);

    // Patch Sanity post document
    await client
      .patch(documentId)
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

    console.log(`  🎉 Document [${documentId}] successfully updated with featured image!`);
  } catch (err) {
    console.error(`❌ Failed to patch image for ${documentId}: ${err.message}`);
  }
}

patchImage();
