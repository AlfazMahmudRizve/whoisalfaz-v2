const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

async function run() {
  console.log('Fetching all posts to fix H1->H3 skips...');
  const posts = await client.fetch('*[_type == "post"] { _id, "slug": slug.current, body }');
  
  let fixedCount = 0;

  for (const post of posts) {
    if (typeof post.body !== 'string') continue;

    let updated = post.body;
    let modified = false;

    // Specifically target the known H3 insertions that need to be H2
    const replacements = [
      ['### Lead Scoring Methodologies: Precision & Operational Velocity Matrix', '## Lead Scoring Methodologies: Precision & Operational Velocity Matrix'],
      ['### SaaS Operational Architectures: Point-to-Point iPaaS vs Unified Automation OS', '## SaaS Operational Architectures: Point-to-Point iPaaS vs Unified Automation OS'],
      ['### Outbound Lead Pipeline Integration Comparison: Cost, Rate Limits & Synchronization', '## Outbound Lead Pipeline Integration Comparison: Cost, Rate Limits & Synchronization'],
      ['### SERP Scraping Architectures: Cost, Precision & Scalability Teardown', '## SERP Scraping Architectures: Cost, Precision & Scalability Teardown'],
      ['### Production Security Architecture: Self-Hosted n8n Hardening vs Cloud Automation Platforms', '## Production Security Architecture: Self-Hosted n8n Hardening vs Cloud Automation Platforms'],
      ['### Core Node Selection Matrix: When to Use Code Nodes vs Native Logic', '## Core Node Selection Matrix: When to Use Code Nodes vs Native Logic'],
      ['### Custom Agent Tool Architecture: Comparison of n8n Tool Types', '## Custom Agent Tool Architecture: Comparison of n8n Tool Types'],
      ['### Agency Growth Models: Project Builds vs Workflow Retainers vs Performance Partnerships', '## Agency Growth Models: Project Builds vs Workflow Retainers vs Performance Partnerships'],
      ['### Enterprise API Architectures: n8n vs Custom Microservices vs Serverless Functions', '## Enterprise API Architectures: n8n vs Custom Microservices vs Serverless Functions'],
      ['### Enterprise Error Management: Isolated Node Errors vs Global Watchtower Architecture', '## Enterprise Error Management: Isolated Node Errors vs Global Watchtower Architecture'],
      ['### B2B Data Enrichment Strategies: Single-Source vs Waterfall Architectures', '## B2B Data Enrichment Strategies: Single-Source vs Waterfall Architectures'],
      ['### Production Error Architecture: Unhandled vs Local Recovery vs Dead-Letter Queue', '## Production Error Architecture: Unhandled vs Local Recovery vs Dead-Letter Queue'],
      ['### Architecture Comparison: Single-Turn Chains vs LangChain Agents vs Supervisor Swarms', '## Architecture Comparison: Single-Turn Chains vs LangChain Agents vs Supervisor Swarms'],
      ['### Video Automation Platforms: Creatomate Cloud vs Remotion Docker vs Shotstack API', '## Video Automation Platforms: Creatomate Cloud vs Remotion Docker vs Shotstack API'],
      ['### Voice AI Architecture: n8n + Twilio Voice vs Custom WebSockets vs Bland.ai/Vapi', '## Voice AI Architecture: n8n + Twilio Voice vs Custom WebSockets vs Bland.ai/Vapi'],
      ['### Vector Indexing Strategies: Fixed-Size Chunking vs Semantic vs Hybrid Reranking', '## Vector Indexing Strategies: Fixed-Size Chunking vs Semantic vs Hybrid Reranking'],
      ['### Execution Optimization: Multi-Node Canvas Chains vs Single Code Node vs Sub-Workflows', '## Execution Optimization: Multi-Node Canvas Chains vs Single Code Node vs Sub-Workflows'],
      ['### Form Automation Comparison: Native Webhooks vs WP Plugins vs Third-Party iPaaS', '## Form Automation Comparison: Native Webhooks vs WP Plugins vs Third-Party iPaaS'],
      ['### Self-Hosted vs Cloud: Architectural Comparison Matrix', '## Self-Hosted vs Cloud: Architectural Comparison Matrix'],
      ['### Workflow Design Standards: Amateur Spaghetti Anti-Patterns vs Production Architectures', '## Workflow Design Standards: Amateur Spaghetti Anti-Patterns vs Production Architectures']
    ];

    for (const [from, to] of replacements) {
      if (updated.includes(from)) {
        updated = updated.replace(from, to);
        modified = true;
      }
    }

    // Check if the very first heading in post.body is H3 or H4
    const lines = updated.split('\n');
    let firstHeadingIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/^#{1,6}\s+/)) {
        firstHeadingIdx = i;
        break;
      }
    }

    if (firstHeadingIdx !== -1) {
      const firstHeading = lines[firstHeadingIdx];
      if (firstHeading.startsWith('### ')) {
        lines[firstHeadingIdx] = firstHeading.replace('### ', '## ');
        updated = lines.join('\n');
        modified = true;
      } else if (firstHeading.startsWith('#### ')) {
        lines[firstHeadingIdx] = firstHeading.replace('#### ', '## ');
        updated = lines.join('\n');
        modified = true;
      }
    }

    if (modified) {
      console.log(`Patching heading skips in ${post.slug} (${post._id})...`);
      await client.patch(post._id).set({ body: updated }).commit();
      fixedCount++;
    }
  }

  console.log(`\n🎉 Successfully patched heading skips in ${fixedCount} posts!`);
}

run().catch(console.error);
