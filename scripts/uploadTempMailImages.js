const { createClient } = require('@sanity/client');
const sharp = require('sharp');
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

const featuredSrc = 'C:/Users/user/.gemini/antigravity/brain/8485ec22-3d86-4195-94a9-e000e85bf877/tempmail_featured_1789635741732.jpg';
const flowSrc = 'C:/Users/user/.gemini/antigravity/brain/8485ec22-3d86-4195-94a9-e000e85bf877/tempmail_audit_flow_1789635759322.jpg';

const publicBlogDir = path.resolve(__dirname, '../public/images/blog');

async function processAndUpload() {
  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const featuredWebpPath = path.join(publicBlogDir, 'tempmail10min-technical-seo-featured.webp');
  const flowWebpPath = path.join(publicBlogDir, 'tempmail10min-architecture-crawl-audit.webp');

  console.log('Converting images to webp...');
  await sharp(featuredSrc).webp({ quality: 85 }).toFile(featuredWebpPath);
  await sharp(flowSrc).webp({ quality: 85 }).toFile(flowWebpPath);

  console.log('Uploading featured image to Sanity...');
  const featuredAsset = await client.assets.upload('image', fs.createReadStream(featuredWebpPath), {
    filename: 'tempmail10min-technical-seo-featured.webp',
    contentType: 'image/webp'
  });
  console.log('✅ Featured Image Asset ID:', featuredAsset._id, featuredAsset.url);

  console.log('Uploading diagram image to Sanity...');
  const flowAsset = await client.assets.upload('image', fs.createReadStream(flowWebpPath), {
    filename: 'tempmail10min-architecture-crawl-audit.webp',
    contentType: 'image/webp'
  });
  console.log('✅ Flow Asset ID:', flowAsset._id, flowAsset.url);

  const result = {
    featured: { _id: featuredAsset._id, url: featuredAsset.url },
    flow: { _id: flowAsset._id, url: flowAsset.url }
  };

  fs.writeFileSync(path.resolve(__dirname, '../scratch/tempmail_images.json'), JSON.stringify(result, null, 2));
  console.log('Saved image references to scratch/tempmail_images.json');
}

processAndUpload().catch(console.error);
