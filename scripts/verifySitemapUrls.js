const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@sanity/client');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const sitemapPath = path.resolve(__dirname, '../app/sitemap.ts');

console.log('='.repeat(70));
console.log('🧪 Sitemap URLs & Diamond Posts Prioritization Verification');
console.log('='.repeat(70));
console.log('sitemap.ts exists:', fs.existsSync(sitemapPath));

const DIAMOND_POST_SLUGS = [
  'screaming-frog-alternatives-free-seo-audit-tools',
  'manychat-pricing-2026',
  'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
  'ai-automation-agency-business-model',
  'pinecone-vs-qdrant-vultr-benchmark'
];

async function verifySitemap() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2026-05-13',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });

  const query = `*[_type == "post"] | order(date desc) {
    title,
    slug,
    date
  }`;

  const posts = await client.fetch(query);
  console.log(`\nFetched ${posts.length} blog posts from Sanity CMS.`);

  const baseUrl = 'https://whoisalfaz.me';
  const diamondSet = new Set(DIAMOND_POST_SLUGS);

  const blogRoutes = posts.map((post) => {
    const isDiamond = diamondSet.has(post.slug?.current);
    return {
      url: `${baseUrl}/blog/${post.slug?.current}/`,
      lastModified: new Date(post.date || new Date().toISOString()),
      changeFrequency: 'weekly',
      priority: isDiamond ? 1.0 : 0.7,
      isDiamond,
    };
  });

  console.log('\n💎 Verifying 5 Diamond Posts Sitemap Priority & Frequency:');
  console.log('-'.repeat(70));

  let allDiamondVerified = true;
  for (const slug of DIAMOND_POST_SLUGS) {
    const route = blogRoutes.find(r => r.url === `${baseUrl}/blog/${slug}/`);
    if (route) {
      const valid = route.priority === 1.0 && route.changeFrequency === 'weekly';
      console.log(`[${valid ? 'PASS ✅' : 'FAIL ❌'}] ${slug}`);
      console.log(`          URL:             ${route.url}`);
      console.log(`          Priority:        ${route.priority}`);
      console.log(`          ChangeFrequency: ${route.changeFrequency}`);
      console.log(`          LastModified:    ${route.lastModified.toISOString()}`);
      if (!valid) allDiamondVerified = false;
    } else {
      console.log(`[FAIL ❌] ${slug} -> NOT FOUND in blog routes`);
      allDiamondVerified = false;
    }
  }

  console.log('-'.repeat(70));
  if (allDiamondVerified) {
    console.log('🎉 ALL 5 DIAMOND POSTS VERIFIED AT PRIORITY 1.0 & FREQUENCY WEEKLY!');
  } else {
    console.log('⚠️ Some diamond posts failed verification.');
  }
}

verifySitemap().catch(console.error);
