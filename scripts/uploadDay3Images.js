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
    const featured = await uploadImage('featured', 'pinecone_rag_featured_1779961680231.webp');
    const body1 = await uploadImage('body1', 'pinecone_rag_body1_1779961701219.webp');
    const body2 = await uploadImage('body2', 'pinecone_rag_body2_1779961727456.webp');

    const metadata = {
      pinecone_rag_featured: featured,
      pinecone_rag_body1: body1,
      pinecone_rag_body2: body2,
    };

    fs.writeFileSync(outputMetaPath, JSON.stringify(metadata, null, 2), 'utf-8');
    console.log(`💾 All image assets meta saved successfully to: ${outputMetaPath}`);
  } catch (error) {
    console.error('❌ Programmatic images upload failed:', error.message);
    process.exit(1);
  }
}

run();
