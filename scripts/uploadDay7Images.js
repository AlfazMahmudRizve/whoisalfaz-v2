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
  if (!fs.existsSync(filePath)) throw new Error(`WebP not found: ${filePath}`);
  console.log(`Uploading ${cdnFilename}...`);
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: cdnFilename,
    contentType: 'image/webp',
  });
  console.log(`✅ Uploaded ${cdnFilename} — Asset ID: ${asset._id}`);
  return { _id: asset._id, url: asset.url };
}

async function run() {
  try {
    const featured = await uploadImage('revops_definition_featured', 'revops_definition_featured.webp');
    const body1    = await uploadImage('revops_definition_body1',    'revops_definition_body1.webp');
    const body2    = await uploadImage('revops_definition_body2',    'revops_definition_body2.webp');

    let existingMeta = {};
    if (fs.existsSync(outputMetaPath)) {
      try { existingMeta = JSON.parse(fs.readFileSync(outputMetaPath, 'utf-8')); } catch (e) {}
    }
    existingMeta.revops_definition_featured = featured;
    existingMeta.revops_definition_body1    = body1;
    existingMeta.revops_definition_body2    = body2;

    fs.writeFileSync(outputMetaPath, JSON.stringify(existingMeta, null, 2), 'utf-8');
    console.log('💾 Day 7 image metadata saved.');
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }
}

run();
