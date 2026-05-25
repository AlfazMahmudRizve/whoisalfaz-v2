const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-n8n-apollo-body.md');
const imagesPath = path.resolve(__dirname, '../uploaded_images.json');
const outputPath = path.resolve(__dirname, '../draft-n8n-apollo.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for Day 1 blog post...');
    
    if (!fs.existsSync(bodyPath)) {
      throw new Error(`Body markdown file not found: ${bodyPath}`);
    }
    const bodyContent = fs.readFileSync(bodyPath, 'utf-8');
    
    const featuredAssetId = 'image-cbdbd1a6aa21c16c814a7261972e29643e8d8365-1024x1024-webp';
    
    const postJson = {
      _id: 'drafts.n8n-apollo-lead-enrichment-pipeline', // Prefix with 'drafts.' to mark as draft in Sanity!
      _type: 'post',
      title: 'How to Build an AI-Powered Lead Enrichment Pipeline with n8n and Apollo.io',
      slug: {
        _type: 'slug',
        current: 'n8n-apollo-lead-enrichment-pipeline'
      },
      description: 'Step-by-step guide to automating B2B lead enrichment using n8n + Apollo.io API. Build a self-healing outbound data pipeline in under 2 hours.',
      date: new Date().toISOString(),
      seoTitle: 'AI-Powered Lead Enrichment Pipeline: n8n + Apollo.io (2026)',
      seoDescription: 'Learn how to build a production-grade B2B lead enrichment pipeline using n8n and Apollo.io. Step-by-step walkthrough covering AI lead scoring, async callbacks, and error handling.',
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
          _ref: 'Al3E26R37amzsHAqPF1yCU' // Automation Tools
        },
        {
          _type: 'reference',
          _ref: 'pJmrsKLAWC800vFHegUEU1' // Architecture Teardowns
        }
      ],
      affiliates: [
        'n8n',
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
