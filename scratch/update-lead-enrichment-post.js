const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function optimizePost() {
  const filePath = path.resolve(__dirname, 'lead-enrichment-with-n8n-raw.json');
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Raw post JSON not found: ${filePath}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const postData = JSON.parse(fileContent);

    console.log('Original SEO Title:', postData.seoTitle);
    
    // 1. Update metadata fields
    postData.seoTitle = "Lead Enrichment with n8n: Build a B2B Data Pipeline";
    postData.seoDescription = "Stop manually researching B2B leads. Learn how to build an automated n8n lead enrichment workflow with Apollo.io and Explorium to append company data instantly.";

    let body = postData.body || '';

    // 2. Insert reciprocal link for Apollo CRM pipelines
    const insertionText = `\n\n> [!NOTE]\n> **AI-Powered Upgrade:** If you want to connect your enrichment layer to a localized LLM scoring engine and automate CRM upsert patterns, check out our production-grade architecture tutorial on **[How to Build an AI-Powered Lead Enrichment Pipeline with n8n and Apollo.io](/blog/n8n-apollo-lead-enrichment-pipeline/)**.\n\n`;
    
    body = body.replace(
      'By integrating this architecture with the [Lead Capture Engine from Day 8](/blog/capture-n8n-lead-data-from-wordpress-elementor/) and the [Lead Scoring Logic from Day 9](/blog/lead-scoring-automation-with-alfaz-mahmud-rizve/), you will transform your basic web forms into an autonomous intelligence gathering system.',
      'By integrating this architecture with the [Lead Capture Engine from Day 8](/blog/capture-n8n-lead-data-from-wordpress-elementor/) and the [Lead Scoring Logic from Day 9](/blog/lead-scoring-automation-with-alfaz-mahmud-rizve/), you will transform your basic web forms into an autonomous intelligence gathering system.' + insertionText
    );

    // 3. Update Headings with optimized <mark> questions and direct answers for AEO/Featured Snippets
    body = body.replace(
      '## The Architectural Philosophy of Data Enrichment',
      '## <mark>What is B2B Lead Enrichment in Revenue Operations?</mark>\n\nB2B lead enrichment in Revenue Operations (RevOps) is the automated process of programmatically appending firmographic and demographic data—such as company headcount, revenue metrics, industry, and headquarters location—to a prospect\'s raw contact record (like an email address) immediately upon capture.'
    );

    body = body.replace(
      '## Selecting the Right Enrichment API Engine',
      '## <mark>What is the best API engine for n8n lead enrichment?</mark>\n\nThe best API engines for building n8n lead enrichment pipelines are Apollo.io and Explorium.ai because they offer comprehensive, developer-friendly B2B contact databases, sub-second API request latency, and native integration nodes designed for high-throughput GTM workflows.'
    );

    body = body.replace(
      '### Advanced Engineering: The Caching Architecture',
      '### <mark>How do you build a cost-effective enrichment caching layer in n8n?</mark>\n\nA cost-effective n8n enrichment caching layer is built by routing inbound domain lookups through a localized database (such as PostgreSQL or Google Sheets) first; if the firmographic data already exists in the cache, n8n retrieves it at zero API cost, otherwise it executes a fresh API call and updates the cache.'
    );

    postData.body = body;

    // 4. Clean system system-generated fields before replacing
    const updateId = postData._id;
    delete postData._createdAt;
    delete postData._updatedAt;
    delete postData._rev;

    console.log(`Optimizing live post in Sanity: "${postData.title}"...`);
    const result = await client.createOrReplace({
      ...postData,
      _id: updateId,
      _type: 'post'
    });

    console.log('✅ Successfully optimized and updated lead-enrichment-with-n8n in Sanity:', result._id);
    console.log('New SEO Title:', result.seoTitle);
    console.log('New SEO Description:', result.seoDescription);

    fs.writeFileSync(path.resolve(__dirname, 'lead-enrichment-with-n8n-optimized.json'), JSON.stringify(result, null, 2), 'utf-8');
  } catch (error) {
    console.error('❌ Failed to optimize post:', error);
  }
}

optimizePost();
