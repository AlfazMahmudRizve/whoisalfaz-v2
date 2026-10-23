const { createClient } = require('@sanity/client');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function run() {
  const slugs = [
    "manychat-to-n8n-integration-lead-scoring",
    "manychat-n8n-async-timeout-fix",
    "manychat-n8n-whatsapp-voice-bot",
    "manychat-whatsapp-b2b-lead-capture-agency",
    "manychat-pricing-2026",
    "manychat-alternatives-2026-top-tools-by-use-case",
    "manychat-instagram-summit-2026-agenda-review-bonus",
    "zero-data-retention-enterprise-rag-vultr-vps"
  ];

  const posts = await client.fetch(`*[_type == "post" && slug.current in $slugs]{
    _id,
    "slug": slug.current,
    title,
    affiliates,
    body
  }`, { slugs });

  for (const post of posts) {
    console.log(`\n======================================================`);
    console.log(`SLUG: ${post.slug}`);
    console.log(`TITLE: ${post.title}`);
    console.log(`AFFILIATES: ${JSON.stringify(post.affiliates)}`);
    
    // Find all links in body
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    const links = [];
    while ((match = linkRegex.exec(post.body || '')) !== null) {
      links.push(`[${match[1]}](${match[2]})`);
    }
    console.log(`TOTAL LINKS (${links.length}):`);
    links.forEach(l => {
      if (l.toLowerCase().includes('manychat') || l.toLowerCase().includes('/go/')) {
        console.log(`  * ${l}`);
      }
    });

    // Check for instances of bold **ManyChat** that might have been links
    const boldManychatCount = (post.body.match(/\*\*ManyChat\*\*/g) || []).length;
    console.log(`COUNT of **ManyChat** (plain bold text): ${boldManychatCount}`);

    // Check if #blueprints is present
    if (post.body.includes('#blueprints')) {
      console.log(`⚠️ Contains '#blueprints' placeholder link!`);
    }
    if (post.body.includes('github.com/AlfazMahmudRizve')) {
      console.log(`⚠️ Contains fallback GitHub link!`);
    }
  }
}

run();
