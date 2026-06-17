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

const brainDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\69e03c1f-3089-4cb9-afa7-407688c986a4';
const outputMetaPath = path.resolve(__dirname, '../uploaded_images.json');

const imageMapping = {
  databox_revops_dashboard_featured: 'databox_dashboard_featured_1781675339309.png',
  databox_revops_dashboard_body1: 'databox_dashboard_body1_1781675359098.png',
  databox_revops_dashboard_body2: 'databox_dashboard_body2_1781675377481.png',
  databox_revops_dashboard_social: 'databox_dashboard_social_1781675397837.png'
};

async function uploadImage(localFilename, cdnFilename) {
  const filePath = path.join(brainDir, localFilename);
  if (!fs.existsSync(filePath)) throw new Error(`File not found: filePath=${filePath}`);
  console.log(`Uploading ${cdnFilename}...`);
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: cdnFilename,
    contentType: 'image/png',
  });
  console.log(`✅ Uploaded ${cdnFilename} — Asset ID: ${asset._id}`);
  return { _id: asset._id, url: asset.url };
}

async function run() {
  try {
    const featured = await uploadImage(imageMapping.databox_revops_dashboard_featured, 'databox_revops_dashboard_featured.png');
    const body1    = await uploadImage(imageMapping.databox_revops_dashboard_body1,    'databox_revops_dashboard_body1.png');
    const body2    = await uploadImage(imageMapping.databox_revops_dashboard_body2,    'databox_revops_dashboard_body2.png');
    const social   = await uploadImage(imageMapping.databox_revops_dashboard_social,   'databox_revops_dashboard_social.png');

    let existingMeta = {};
    if (fs.existsSync(outputMetaPath)) {
      try { existingMeta = JSON.parse(fs.readFileSync(outputMetaPath, 'utf-8')); } catch (e) {}
    }
    existingMeta.databox_revops_dashboard_featured = featured;
    existingMeta.databox_revops_dashboard_body1    = body1;
    existingMeta.databox_revops_dashboard_body2    = body2;
    existingMeta.databox_revops_dashboard_social   = social;

    fs.writeFileSync(outputMetaPath, JSON.stringify(existingMeta, null, 2), 'utf-8');
    console.log('💾 Databox Dashboard image metadata saved to uploaded_images.json.');
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }
}

run();
