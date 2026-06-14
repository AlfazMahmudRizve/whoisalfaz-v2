const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-screaming-frog-alternatives-body.md');
const imagesMetaPath = path.resolve(__dirname, '../uploaded_images.json');
const outputPath = path.resolve(__dirname, '../draft-screaming-frog-alternatives.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for Screaming Frog Alternatives...');

    if (!fs.existsSync(bodyPath)) throw new Error(`Body markdown file not found: ${bodyPath}`);
    let bodyContent = fs.readFileSync(bodyPath, 'utf-8');

    let featuredAssetId = '';
    let featuredUrl = '';
    let body1Url = '';
    let body2Url = '';

    if (fs.existsSync(imagesMetaPath)) {
      const imagesMeta = JSON.parse(fs.readFileSync(imagesMetaPath, 'utf-8'));
      if (imagesMeta.screaming_frog_alternatives_featured) {
        featuredAssetId = imagesMeta.screaming_frog_alternatives_featured._id;
        featuredUrl = imagesMeta.screaming_frog_alternatives_featured.url;
      }
      if (imagesMeta.screaming_frog_alternatives_body1) body1Url = imagesMeta.screaming_frog_alternatives_body1.url;
      if (imagesMeta.screaming_frog_alternatives_body2) body2Url = imagesMeta.screaming_frog_alternatives_body2.url;
    }

    if (body1Url) {
      bodyContent = bodyContent.split('screaming_frog_alternatives_body1.webp').join(body1Url);
      console.log('✅ Replaced body1 placeholder.');
    }
    if (body2Url) {
      bodyContent = bodyContent.split('screaming_frog_alternatives_body2.webp').join(body2Url);
      console.log('✅ Replaced body2 placeholder.');
    }

    if (!featuredAssetId) {
      console.warn('⚠️ Featured image not found — using fallback.');
      featuredAssetId = 'image-e085754cf8ce5734076df26bd9765b4fc37aa338-1280x720-webp';
    }

    // Ingest BlogPosting JSON-LD schema
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "5 Best Screaming Frog Alternatives: Free Browser-Based SEO Audit Tools",
      "description": "Looking for Screaming Frog alternatives? Discover the top 5 browser-based free website crawlers that require no software install, no registration, and no domain verification.",
      "image": [
        featuredUrl || "https://whoisalfaz.me/images/blog/default.jpg"
      ],
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": "Alfaz Mahmud Rizve",
        "url": "https://whoisalfaz.me/about/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "whoisalfaz.me",
        "logo": {
          "@type": "ImageObject",
          "url": "https://whoisalfaz.me/icon.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/"
      }
    };

    const postJson = {
      _id: 'screaming-frog-alternatives-free-seo-audit-tools',
      _type: 'post',
      title: "5 Best Screaming Frog Alternatives: Free Browser-Based SEO Audit Tools",
      slug: { _type: 'slug', current: 'screaming-frog-alternatives-free-seo-audit-tools' },
      description: "Looking for Screaming Frog alternatives? Discover the top 5 browser-based free website crawlers that require no software install, no registration, and no domain verification.",
      date: new Date().toISOString(),
      seoTitle: "5 Best Screaming Frog Alternatives (Free Online SEO Crawlers)",
      seoDescription: "Looking for Screaming Frog alternatives? Discover the top 5 browser-based free website crawlers that require no software install, no registration, and no domain verification.",
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredAssetId }
      },
      categories: [
        { _type: 'reference', _ref: 'pJmrsKLAWC800vFHegUEU1' } // Automation Tools
      ],
      affiliates: ['n8n'],
      body: bodyContent,
      schemaMarkup: JSON.stringify(blogSchema)
    };

    fs.writeFileSync(outputPath, JSON.stringify(postJson, null, 2), 'utf-8');
    console.log(`✅ Generated Sanity JSON at ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed to compile JSON:', error.message);
  }
}

buildJson();
