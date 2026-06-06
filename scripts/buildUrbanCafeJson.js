const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-urban-cafe-foodtech-platform-body.md');
const imagesMetaPath = path.resolve(__dirname, '../uploaded_images.json');
const outputPath = path.resolve(__dirname, '../draft-urban-cafe-foodtech-platform.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for Urban Cafe case study...');

    if (!fs.existsSync(bodyPath)) throw new Error(`Body markdown file not found: ${bodyPath}`);
    const bodyContent = fs.readFileSync(bodyPath, 'utf-8');

    let featuredAssetId = '';
    if (fs.existsSync(imagesMetaPath)) {
      const imagesMeta = JSON.parse(fs.readFileSync(imagesMetaPath, 'utf-8'));
      if (imagesMeta.case_study_urban_cafe_featured) {
        featuredAssetId = imagesMeta.case_study_urban_cafe_featured._id;
      }
    }

    if (!featuredAssetId) {
      console.warn('⚠️ Featured image not found — using fallback.');
      featuredAssetId = 'image-07eb0d7215a8bf36acde7d1f3fba6e7dcfb8e309-1024x1024-webp';
    }

    const postJson = {
      _id: 'Al3E26R37amzsHAqPF24Uo', // The Sanity document ID for Urban Cafe post
      _type: 'post',
      title: 'Zero-Hardware Kitchen OS: How I Replaced a $2,000 POS System With a Next.js PWA',
      slug: { _type: 'slug', current: 'case-study-urban-cafe-foodtech-platform' },
      description: 'A deep dive into how I built a real-time, browser-native restaurant OS to automate orders, kitchen queues, and voice alerts with zero hardware cost.',
      date: '2026-06-06T13:00:00.000Z',
      seoTitle: 'Autonomous Kitchen Ordering System: Next.js Case Study',
      seoDescription: 'How I built an autonomous kitchen ordering system with Next.js and Supabase. Read the full case study on real-time sync & audio notifications.',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredAssetId }
      },
      categories: [
        { _type: 'reference', _ref: 'pJmrsKLAWC800vFHegUEU1' } // Architecture Teardowns
      ],
      affiliates: ['nextjs', 'supabase', 'zustand'],
      body: bodyContent
    };

    fs.writeFileSync(outputPath, JSON.stringify(postJson, null, 2), 'utf-8');
    console.log(`✅ Generated Sanity JSON at ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
}

buildJson();
