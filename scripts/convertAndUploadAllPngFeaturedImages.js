const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const SVG_DIR = path.resolve(__dirname, '../scratch/featured_images');
const PNG_DIR = path.resolve(__dirname, '../scratch/featured_images_png');

if (!fs.existsSync(PNG_DIR)) {
  fs.mkdirSync(PNG_DIR, { recursive: true });
}

async function convertAndUploadPngs() {
  console.log('🔍 Fetching all posts from Sanity to audit featured image formats...');
  const posts = await client.fetch(`*[_type == "post"]{ _id, title, "slug": slug.current, "imageUrl": image.asset->url, "extension": image.asset->extension }`);

  // Target posts whose image is SVG or missing
  const targetPosts = posts.filter(p => !p.imageUrl || p.extension === 'svg' || p.imageUrl.endsWith('.svg'));
  console.log(`\n📦 Found ${targetPosts.length} posts with SVG or missing PNG image.`);

  let successCount = 0;
  let failCount = 0;

  const CHUNK_SIZE = 5;
  for (let i = 0; i < targetPosts.length; i += CHUNK_SIZE) {
    const chunk = targetPosts.slice(i, i + CHUNK_SIZE);
    console.log(`\n🚀 Processing PNG batch ${Math.floor(i / CHUNK_SIZE) + 1} of ${Math.ceil(targetPosts.length / CHUNK_SIZE)} (Posts ${i + 1} to ${Math.min(i + CHUNK_SIZE, targetPosts.length)})...`);

    await Promise.all(chunk.map(async (post) => {
      const cleanSlug = post.slug || post._id.replace(/^drafts\./, '');
      const svgPath = path.join(SVG_DIR, `${cleanSlug}.svg`);
      const pngPath = path.join(PNG_DIR, `${cleanSlug}.png`);

      if (!fs.existsSync(svgPath)) {
        console.warn(`  ⚠️ SVG not found for [${cleanSlug}]: ${svgPath}`);
        failCount++;
        return;
      }

      try {
        // 1. Convert SVG to high-res PNG (1200x630)
        await sharp(svgPath)
          .resize(1200, 630)
          .png({ quality: 90, compressionLevel: 8 })
          .toFile(pngPath);

        // 2. Upload PNG to Sanity CDN
        const fileStream = fs.createReadStream(pngPath);
        const asset = await client.assets.upload('image', fileStream, {
          filename: `${cleanSlug}-featured.png`,
          contentType: 'image/png'
        });

        const imageRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        };

        // 3. Patch published document
        await client.patch(post._id).set({ image: imageRef }).commit();

        // 4. Also patch draft if exists
        const altId = post._id.startsWith('drafts.') ? post._id.replace('drafts.', '') : `drafts.${post._id}`;
        try {
          await client.patch(altId).set({ image: imageRef }).commit();
        } catch (_) {}

        console.log(`  ✅ [${cleanSlug}] PNG Image attached (Asset ID: ${asset._id})`);
        successCount++;
      } catch (err) {
        console.error(`  ❌ [${cleanSlug}] Error:`, err.message);
        failCount++;
      }
    }));

    if (i + CHUNK_SIZE < targetPosts.length) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }

  console.log(`\n======================================================`);
  console.log(`🏁 PNG Batch Conversion & Ingestion Complete!`);
  console.log(`✅ Successfully uploaded & attached: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`======================================================\n`);
}

convertAndUploadPngs().catch(console.error);
