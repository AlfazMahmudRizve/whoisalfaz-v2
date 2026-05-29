const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-aisdr-vs-human-sdr-body.md');
const imagesMetaPath = path.resolve(__dirname, '../uploaded_images.json');
const outputPath = path.resolve(__dirname, '../draft-aisdr-vs-human.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for Day 5 blog post...');
    
    if (!fs.existsSync(bodyPath)) {
      throw new Error(`Body markdown file not found: ${bodyPath}`);
    }
    let bodyContent = fs.readFileSync(bodyPath, 'utf-8');
    
    let featuredAssetId = '';
    let featuredUrl = '';
    let body1Url = '';
    let body2Url = '';

    if (fs.existsSync(imagesMetaPath)) {
      const imagesMeta = JSON.parse(fs.readFileSync(imagesMetaPath, 'utf-8'));
      
      if (imagesMeta.aisdr_vs_human_featured) {
        featuredAssetId = imagesMeta.aisdr_vs_human_featured._id;
        featuredUrl = imagesMeta.aisdr_vs_human_featured.url;
      }
      if (imagesMeta.aisdr_vs_human_body1) {
        body1Url = imagesMeta.aisdr_vs_human_body1.url;
      }
      if (imagesMeta.aisdr_vs_human_body2) {
        body2Url = imagesMeta.aisdr_vs_human_body2.url;
      }
    }
    
    // Replace placeholder image paths in the body text with live CDN URLs
    if (featuredUrl) {
      bodyContent = bodyContent.split('aisdr_vs_human_featured').join(featuredUrl);
      console.log('✅ Replaced aisdr_vs_human_featured placeholder with live CDN URL.');
    }
    if (body1Url) {
      bodyContent = bodyContent.split('aisdr_vs_human_body1').join(body1Url);
      console.log('✅ Replaced aisdr_vs_human_body1 placeholder with live CDN URL.');
    }
    if (body2Url) {
      bodyContent = bodyContent.split('aisdr_vs_human_body2').join(body2Url);
      console.log('✅ Replaced aisdr_vs_human_body2 placeholder with live CDN URL.');
    }
    
    if (!featuredAssetId) {
      console.warn('⚠️ Warning: Featured image asset ID not found in uploaded_images.json. Using fallback.');
      featuredAssetId = 'image-07eb0d7215a8bf36acde7d1f3fba6e7dcfb8e309-1024x1024-webp';
    }
    
    const postJson = {
      _id: 'aisdr-vs-human-sdr-performance-teardown',
      _type: 'post',
      title: 'AiSDR vs Human SDR: A Technical Performance Teardown for B2B SaaS Sales Teams',
      slug: {
        _type: 'slug',
        current: 'aisdr-vs-human-sdr-performance-teardown'
      },
      description: "A deep-dive technical comparison of AiSDR vs Human SDR fully loaded costs, outreach volumes, reply rates, show rates, and a complete hybrid stack architecture utilizing n8n, Apollo.io, and Brevo.",
      date: new Date().toISOString(),
      seoTitle: 'AiSDR vs Human SDR: B2B SaaS Outbound Teardown & Hybrid Blueprint',
      seoDescription: "A deep-dive technical comparison of AiSDR vs Human SDR fully loaded costs, outreach volumes, reply rates, show rates, and a complete hybrid stack architecture utilizing n8n, Apollo.io, and Brevo.",
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: featuredAssetId
        }
      },
      categories: [
        {
          _type: 'reference',
          _ref: 'pJmrsKLAWC800vFHegUEU1' // Sales Operations / RevOps Strategy
        }
      ],
      affiliates: [
        'AiSDR, Inc.',
        'Apollo.io'
      ],
      body: bodyContent
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(postJson, null, 2), 'utf-8');
    console.log(`✅ Successfully generated Sanity JSON at ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed to compile post JSON:', error);
  }
}

buildJson();
