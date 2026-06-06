const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-revops-definition-body.md');
const imagesMetaPath = path.resolve(__dirname, '../uploaded_images.json');
const outputPath = path.resolve(__dirname, '../draft-revops-definition.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for Day 7 blog post...');

    if (!fs.existsSync(bodyPath)) throw new Error(`Body markdown file not found: ${bodyPath}`);
    let bodyContent = fs.readFileSync(bodyPath, 'utf-8');

    let featuredAssetId = '';
    let featuredUrl = '';
    let body1Url = '';
    let body2Url = '';

    if (fs.existsSync(imagesMetaPath)) {
      const imagesMeta = JSON.parse(fs.readFileSync(imagesMetaPath, 'utf-8'));
      if (imagesMeta.revops_definition_featured) {
        featuredAssetId = imagesMeta.revops_definition_featured._id;
        featuredUrl = imagesMeta.revops_definition_featured.url;
      }
      if (imagesMeta.revops_definition_body1) body1Url = imagesMeta.revops_definition_body1.url;
      if (imagesMeta.revops_definition_body2) body2Url = imagesMeta.revops_definition_body2.url;
    }

    if (featuredUrl) { bodyContent = bodyContent.split('revops_definition_featured').join(featuredUrl); console.log('✅ Replaced featured placeholder.'); }
    if (body1Url)    { bodyContent = bodyContent.split('revops_definition_body1').join(body1Url);    console.log('✅ Replaced body1 placeholder.'); }
    if (body2Url)    { bodyContent = bodyContent.split('revops_definition_body2').join(body2Url);    console.log('✅ Replaced body2 placeholder.'); }

    if (!featuredAssetId) {
      console.warn('⚠️  Featured image not found — using fallback.');
      featuredAssetId = 'image-07eb0d7215a8bf36acde7d1f3fba6e7dcfb8e309-1024x1024-webp';
    }

    const postJson = {
      _id: 'what-is-revops-technical-definition-saas',
      _type: 'post',
      title: 'What Is RevOps? The Technical Definition for SaaS Teams',
      slug: { _type: 'slug', current: 'what-is-revops-technical-definition-saas' },
      description: "RevOps isn't a team rename. Here's the precise technical definition — data unification, pipeline governance, automation architecture, and n8n orchestration — built for SaaS founders and ops leads.",
      date: new Date().toISOString(),
      seoTitle: 'What Is RevOps? SaaS Technical Definition (2026)',
      seoDescription: "RevOps isn't a team rename. Here's the precise technical definition — data unification, pipeline governance, automation architecture — built for SaaS founders.",
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredAssetId }
      },
      categories: [
        { _type: 'reference', _ref: 'pJmrsKLAWC800vFHegUEU1' } // RevOps Strategy
      ],
      affiliates: ['n8n', 'monday', 'databox', 'brevo'],
      body: bodyContent
    };

    fs.writeFileSync(outputPath, JSON.stringify(postJson, null, 2), 'utf-8');
    console.log(`✅ Generated Sanity JSON at ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
}

buildJson();
