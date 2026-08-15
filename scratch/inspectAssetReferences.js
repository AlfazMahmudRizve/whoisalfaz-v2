const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13'
});

async function inspectAssets() {
  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    "hasImageAsset": defined(image.asset),
    "assetRef": image.asset._ref,
    "assetUrl": image.asset->url,
    "assetExtension": image.asset->extension,
    "assetMime": image.asset->mimeType
  }`);

  console.log(`Total posts: ${posts.length}`);
  const broken = posts.filter(p => !p.assetUrl);
  console.log(`Posts with null assetUrl: ${broken.length}`);
  if (broken.length > 0) {
    console.log('Broken asset references:', JSON.stringify(broken, null, 2));
  }

  // List all 4 specific ones from screenshot
  const specific = posts.filter(p => 
    p.slug.includes('cometchat') || 
    p.slug.includes('dify') || 
    p.slug.includes('manychat') || 
    p.slug.includes('apollo')
  );
  console.log('\nSpecific posts inspected:');
  specific.forEach(p => {
    console.log(`- [${p.slug}] URL: ${p.assetUrl} (Ext: ${p.assetExtension})`);
  });
}

inspectAssets().catch(console.error);
