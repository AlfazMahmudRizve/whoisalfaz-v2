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

const brainDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\64c9a70c-f003-45c7-a4f8-0a372322e422';
const outputMetaPath = path.resolve(__dirname, '../uploaded_images.json');

const imageMapping = {
  manychat_whatsapp_b2b_featured: 'manychat_whatsapp_b2b_featured_1782161829289.png',
  manychat_whatsapp_b2b_body1:    'manychat_whatsapp_b2b_body1_1782161837214.png',
  manychat_whatsapp_b2b_body2:    'manychat_whatsapp_b2b_body2_1782161845698.png',
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
    const featured = await uploadImage(imageMapping.manychat_whatsapp_b2b_featured, 'manychat_whatsapp_b2b_featured.png');
    const body1    = await uploadImage(imageMapping.manychat_whatsapp_b2b_body1,    'manychat_whatsapp_b2b_body1.png');
    const body2    = await uploadImage(imageMapping.manychat_whatsapp_b2b_body2,    'manychat_whatsapp_b2b_body2.png');

    let existingMeta = {};
    if (fs.existsSync(outputMetaPath)) {
      try { existingMeta = JSON.parse(fs.readFileSync(outputMetaPath, 'utf-8')); } catch (e) {}
    }
    existingMeta.manychat_whatsapp_b2b_featured = featured;
    existingMeta.manychat_whatsapp_b2b_body1    = body1;
    existingMeta.manychat_whatsapp_b2b_body2    = body2;

    fs.writeFileSync(outputMetaPath, JSON.stringify(existingMeta, null, 2), 'utf-8');
    console.log('💾 ManyChat WhatsApp B2B image metadata saved to uploaded_images.json.');
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }
}

run();
