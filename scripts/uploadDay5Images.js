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

const tmpImagesDir = path.resolve(__dirname, '../tmp_images');
const outputMetaPath = path.resolve(__dirname, '../uploaded_images.json');

async function uploadImage(localName, cdnFilename) {
  const filePath = path.join(tmpImagesDir, `${localName}.webp`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`WebP image not found: ${filePath}`);
  }

  console.log(`Uploading ${cdnFilename} to Sanity CDN...`);
  const fileStream = fs.createReadStream(filePath);
  
  const asset = await client.assets.upload('image', fileStream, {
    filename: cdnFilename,
    contentType: 'image/webp',
  });

  console.log(`✅ Uploaded ${cdnFilename} successfully. Asset ID: ${asset._id}`);
  return {
    _id: asset._id,
    url: asset.url
  };
}

async function run() {
  try {
    const featured = await uploadImage('aisdr_vs_human_featured', 'aisdr_vs_human_featured.webp');
    const body1 = await uploadImage('aisdr_vs_human_body1', 'aisdr_vs_human_body1.webp');
    const body2 = await uploadImage('aisdr_vs_human_body2', 'aisdr_vs_human_body2.webp');

    // Read existing metadata to prevent overwriting other posts' data
    let existingMeta = {};
    if (fs.existsSync(outputMetaPath)) {
      try {
        existingMeta = JSON.parse(fs.readFileSync(outputMetaPath, 'utf-8'));
        console.log('Loaded existing uploaded_images.json metadata.');
      } catch (e) {
        console.warn('⚠️ Warning: Failed to parse existing uploaded_images.json. Initializing fresh object.');
      }
    }

    // Merge new metadata
    existingMeta.aisdr_vs_human_featured = featured;
    existingMeta.aisdr_vs_human_body1 = body1;
    existingMeta.aisdr_vs_human_body2 = body2;

    fs.writeFileSync(outputMetaPath, JSON.stringify(existingMeta, null, 2), 'utf-8');
    console.log(`💾 Day 5 image assets merged and saved successfully to: ${outputMetaPath}`);
  } catch (error) {
    console.error('❌ Programmatic images upload failed:', error.message);
    process.exit(1);
  }
}

run();
