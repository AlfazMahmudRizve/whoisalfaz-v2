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

async function uploadAndAttach() {
  const imagePath = path.resolve(__dirname, '../public/blog/how-stripe-quietly-takes-more-fees-featured.webp');
  const targetDocId = 'post-how-stripe-quietly-takes-more-fees-than-advertised';
  const targetSlug = 'how-stripe-quietly-takes-more-fees-than-advertised';

  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Image not found: ${imagePath}`);
    process.exit(1);
  }

  console.log(`📤 Uploading featured image asset to Sanity CDN: ${path.basename(imagePath)}...`);
  const fileStream = fs.createReadStream(imagePath);

  const asset = await client.assets.upload('image', fileStream, {
    filename: 'how-stripe-quietly-takes-more-fees-featured.webp',
    contentType: 'image/webp',
  });

  console.log(`✅ Asset uploaded! Asset ID: ${asset._id}`);
  console.log(`🔗 Sanity CDN URL: ${asset.url}`);

  const imageObj = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
    alt: 'How Stripe Quietly Takes 3.4% Instead of 2.9% - Unit Economics and Fee Breakdown',
  };

  // Find doc by ID or by slug
  const post = await client.fetch(`*[_type == "post" && (slug.current == $slug || _id == $id)][0]`, {
    slug: targetSlug,
    id: targetDocId,
  });

  if (!post) {
    console.error(`❌ Post not found in Sanity for slug: ${targetSlug}`);
    process.exit(1);
  }

  console.log(`🎯 Found Sanity post: [${post._id}] - ${post.title}`);

  // Patch document
  await client
    .patch(post._id)
    .set({ image: imageObj })
    .commit();

  console.log(`🎉 Successfully attached featured image to post [${post._id}]!`);

  // Verify
  const updatedPost = await client.fetch(`*[_type == "post" && _id == $id][0]{ _id, title, "imageUrl": image.asset->url }`, {
    id: post._id,
  });
  console.log(`✨ Verified Updated Post Image URL: ${updatedPost.imageUrl}`);
}

uploadAndAttach().catch((err) => {
  console.error('❌ Error uploading/attaching image:', err);
  process.exit(1);
});
