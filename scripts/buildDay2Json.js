const fs = require('fs');
const path = require('path');

const bodyPath = path.resolve(__dirname, './draft-revops-stack-body.md');
const imagesPath = path.resolve(__dirname, '../uploaded_images.json');
const outputPath = path.resolve(__dirname, '../draft-revops-stack.json');

function buildJson() {
  try {
    console.log('Compiling Sanity JSON for Day 2 blog post...');
    
    if (!fs.existsSync(bodyPath)) {
      throw new Error(`Body markdown file not found: ${bodyPath}`);
    }
    const bodyContent = fs.readFileSync(bodyPath, 'utf-8');
    
    const featuredAssetId = 'image-c3810c6135c4b9d02930a88e21e61e9d1479e1c6-1024x1024-webp';
    
    const postJson = {
      _id: 'revops-automation-stack-saas-2026', // Direct live publish (without drafts. prefix for direct live publishing)
      _type: 'post',
      title: 'The RevOps Automation Stack: How SaaS Teams Eliminate Manual Bottlenecks in 2026',
      slug: {
        _type: 'slug',
        current: 'revops-automation-stack-saas-2026'
      },
      description: 'Learn how to eliminate B2B GTM bottlenecks using an API-first RevOps stack foundation with n8n, monday.com, and Databox. Real architectural blueprints and bidirectional sync schema guides inside.',
      date: new Date().toISOString(),
      seoTitle: 'SaaS RevOps Automation Stack Teardown (2026) | n8n + monday + Databox',
      seoDescription: 'Eliminate B2B manual bottlenecks. Explore our 3-tier SaaS RevOps lifecycle blueprint, weighted Round-Robin routing math, and circular sync resolution techniques.',
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
          _ref: 'pJmrsKLAWC800vFHegUEU1' // Architecture Teardowns
        },
        {
          _type: 'reference',
          _ref: 'Al3E26R37amzsHAqPF1yCU' // Automation Tools
        }
      ],
      affiliates: [
        'n8n',
        'monday',
        'databox'
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
