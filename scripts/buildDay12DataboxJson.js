const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-databox-revops-dashboard-pipeline-velocity-body.md');
const imagesMetaPath = path.resolve(__dirname, '../uploaded_images.json');
const outputPath = path.resolve(__dirname, '../draft-databox-revops-dashboard-pipeline-velocity.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for Databox RevOps Dashboard...');

    if (!fs.existsSync(bodyPath)) throw new Error(`Body markdown file not found: ${bodyPath}`);
    let bodyContent = fs.readFileSync(bodyPath, 'utf-8');

    let featuredAssetId = '';
    let featuredUrl = '';
    let body1Url = '';
    let body2Url = '';

    if (fs.existsSync(imagesMetaPath)) {
      const imagesMeta = JSON.parse(fs.readFileSync(imagesMetaPath, 'utf-8'));
      if (imagesMeta.databox_revops_dashboard_featured) {
        featuredAssetId = imagesMeta.databox_revops_dashboard_featured._id;
        featuredUrl = imagesMeta.databox_revops_dashboard_featured.url;
      }
      if (imagesMeta.databox_revops_dashboard_body1) body1Url = imagesMeta.databox_revops_dashboard_body1.url;
      if (imagesMeta.databox_revops_dashboard_body2) body2Url = imagesMeta.databox_revops_dashboard_body2.url;
    }

    if (body1Url) {
      bodyContent = bodyContent.split('databox_revops_dashboard_body1.webp').join(body1Url);
      console.log('✅ Replaced body1 placeholder.');
    }
    if (body2Url) {
      bodyContent = bodyContent.split('databox_revops_dashboard_body2.webp').join(body2Url);
      console.log('✅ Replaced body2 placeholder.');
    }

    if (!featuredAssetId) {
      console.warn('⚠️ Featured image not found — using fallback.');
      featuredAssetId = 'image-37899dd19b98cde16cc8b3c835fea1965575137e-1024x1024-jpg';
    }

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Databox RevOps Dashboard: How to Track Pipeline Velocity, Win Rate, and ARR in Real Time",
      "description": "Build a real-time RevOps dashboard using monday.com, n8n, and Databox. Calculate sales velocity, win rates, and track AI outbound SDR metrics automatically.",
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
        "@id": "https://whoisalfaz.me/blog/databox-revops-dashboard-pipeline-velocity/"
      }
    };

    const postJson = {
      _id: 'databox-revops-dashboard-pipeline-velocity',
      _type: 'post',
      title: "Databox RevOps Dashboard: How to Track Pipeline Velocity, Win Rate, and ARR in Real Time",
      slug: { _type: 'slug', current: 'databox-revops-dashboard-pipeline-velocity' },
      description: "Build a real-time RevOps dashboard using monday.com, n8n, and Databox. Calculate sales velocity, win rates, and track AI outbound SDR metrics automatically.",
      date: new Date().toISOString(),
      seoTitle: "Databox RevOps Dashboard: Track Pipeline Velocity & ARR in Real Time",
      seoDescription: "Build a real-time RevOps dashboard using monday.com, n8n, and Databox. Calculate sales velocity, win rates, and track AI outbound SDR metrics automatically.",
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredAssetId }
      },
      categories: [
        { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' } // 30 Days of n8n & Automation
      ],
      affiliates: ['databox', 'monday', 'n8n'],
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
