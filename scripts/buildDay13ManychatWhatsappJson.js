const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-manychat-whatsapp-b2b-lead-capture-agency-body.md');
const imagesMetaPath = path.resolve(__dirname, '../uploaded_images.json');
const outputPath = path.resolve(__dirname, '../draft-manychat-whatsapp-b2b-lead-capture-agency.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for ManyChat WhatsApp B2B Lead Capture...');

    if (!fs.existsSync(bodyPath)) throw new Error(`Body markdown file not found: ${bodyPath}`);
    let bodyContent = fs.readFileSync(bodyPath, 'utf-8');

    let featuredAssetId = '';
    let featuredUrl = '';
    let body1Url = '';
    let body2Url = '';

    if (fs.existsSync(imagesMetaPath)) {
      const imagesMeta = JSON.parse(fs.readFileSync(imagesMetaPath, 'utf-8'));
      if (imagesMeta.manychat_whatsapp_b2b_featured) {
        featuredAssetId = imagesMeta.manychat_whatsapp_b2b_featured._id;
        featuredUrl = imagesMeta.manychat_whatsapp_b2b_featured.url;
      }
      if (imagesMeta.manychat_whatsapp_b2b_body1) body1Url = imagesMeta.manychat_whatsapp_b2b_body1.url;
      if (imagesMeta.manychat_whatsapp_b2b_body2) body2Url = imagesMeta.manychat_whatsapp_b2b_body2.url;
    }

    if (body1Url) {
      bodyContent = bodyContent.split('manychat_whatsapp_b2b_body1.webp').join(body1Url);
      console.log('✅ Replaced body1 placeholder.');
    }
    if (body2Url) {
      bodyContent = bodyContent.split('manychat_whatsapp_b2b_body2.webp').join(body2Url);
      console.log('✅ Replaced body2 placeholder.');
    }

    if (!featuredAssetId) {
      console.warn('⚠️ Featured image not found — using fallback.');
      featuredAssetId = 'image-37899dd19b98cde16cc8b3c835fea1965575137e-1024x1024-jpg';
    }

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "ManyChat WhatsApp B2B Lead Capture: The Agency Blueprint (With n8n + Brevo CRM Sync)",
      "description": "Build a production-grade WhatsApp B2B lead capture system using ManyChat, n8n, and Brevo. Covers the 10-second timeout fix, Meta compliance, AI lead scoring, human handoff, and multi-tenant agency architecture.",
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
        "@id": "https://whoisalfaz.me/blog/manychat-whatsapp-b2b-lead-capture-agency/"
      }
    };

    const postJson = {
      _id: 'manychat-whatsapp-b2b-lead-capture-agency',
      _type: 'post',
      title: "ManyChat WhatsApp B2B Lead Capture: The Agency Blueprint (With n8n + Brevo CRM Sync)",
      slug: { _type: 'slug', current: 'manychat-whatsapp-b2b-lead-capture-agency' },
      description: "Build a production-grade WhatsApp B2B lead capture system using ManyChat, n8n, and Brevo. Covers the 10-second timeout fix, Meta compliance, AI lead scoring, human handoff, and multi-tenant agency architecture.",
      date: new Date().toISOString(),
      seoTitle: "ManyChat WhatsApp B2B Lead Capture: Agency Blueprint With n8n & Brevo",
      seoDescription: "Production guide: Build a WhatsApp B2B lead capture engine using ManyChat + n8n. Solves the 10-second timeout, Meta 24h compliance window, AI lead scoring, and multi-client agency templates.",
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredAssetId }
      },
      categories: [
        { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' } // 30 Days of n8n & Automation
      ],
      affiliates: ['manychat', 'n8n', 'brevo'],
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
