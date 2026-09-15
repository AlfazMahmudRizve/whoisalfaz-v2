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

async function run() {
  console.log('Fetching all published posts from Sanity CMS...');
  const posts = await client.fetch(`*[_type == "post"] {
    _id,
    title,
    seoTitle,
    "slug": slug.current,
    seoDescription,
    excerpt,
    date,
    modified,
    image,
    categories[]->{ name, "slug": slug.current },
    body
  }`);

  console.log(`Total Posts Fetched: ${posts.length}`);

  const report = {
    totalPosts: posts.length,
    wordCountDistribution: {
      under1000: 0,
      between1000and2000: 0,
      between2000and3000: 0,
      over3000: 0
    },
    titleStats: {
      hasBrackets: 0,
      missingBrackets: 0,
      over60Chars: 0,
      under40Chars: 0
    },
    metaStats: {
      over155Chars: 0,
      under120Chars: 0,
      missing: 0
    },
    contentElements: {
      hasTable: 0,
      missingTable: 0,
      hasCodeBlock: 0,
      hasFAQ: 0,
      missingFAQ: 0,
      hasInternalLinks: 0,
      missingInternalLinks: 0
    },
    postsNeedingAttention: []
  };

  for (const p of posts) {
    const rawBody = typeof p.body === 'string' ? p.body : '';
    const words = rawBody.split(/\s+/).filter(Boolean).length;
    
    // Word counts
    if (words < 1000) report.wordCountDistribution.under1000++;
    else if (words < 2000) report.wordCountDistribution.between1000and2000++;
    else if (words < 3000) report.wordCountDistribution.between2000and3000++;
    else report.wordCountDistribution.over3000++;

    // Title analysis
    const title = p.seoTitle || p.title || '';
    const hasBracket = /[\[\(].*?[\]\)]/.test(title);
    if (hasBracket) report.titleStats.hasBrackets++;
    else report.titleStats.missingBrackets++;
    if (title.length > 60) report.titleStats.over60Chars++;
    if (title.length < 40) report.titleStats.under40Chars++;

    // Meta analysis
    const meta = p.seoDescription || p.excerpt || '';
    if (!meta) report.metaStats.missing++;
    else if (meta.length > 158) report.metaStats.over155Chars++;
    else if (meta.length < 120) report.metaStats.under120Chars++;

    // Structure elements
    const hasTable = rawBody.includes('| ---') || rawBody.includes('<table');
    const hasCode = rawBody.includes('```');
    const hasFAQ = rawBody.toLowerCase().includes('frequently asked questions') || rawBody.includes('## FAQ');
    const hasInternalLink = rawBody.includes('/blog/') || rawBody.includes('whoisalfaz.me');

    if (hasTable) report.contentElements.hasTable++;
    else report.contentElements.missingTable++;

    if (hasCode) report.contentElements.hasCodeBlock++;
    if (hasFAQ) report.contentElements.hasFAQ++;
    else report.contentElements.missingFAQ++;

    if (hasInternalLink) report.contentElements.hasInternalLinks++;
    else report.contentElements.missingInternalLinks++;

    const flags = [];
    if (words < 1200) flags.push(`Thin Content (${words} words)`);
    if (!hasTable) flags.push('No Comparison Table');
    if (!hasFAQ) flags.push('No FAQ Section');
    if (!hasBracket) flags.push('No Bracket CTR Hook');
    if (!hasInternalLink) flags.push('No In-Body Internal Links');

    if (flags.length >= 2) {
      report.postsNeedingAttention.push({
        slug: p.slug,
        title: title,
        words,
        flags
      });
    }
  }

  console.log('\n=== COMPREHENSIVE CONTENT AUDIT METRICS ===');
  console.log(JSON.stringify(report, null, 2));

  fs.writeFileSync(path.resolve(__dirname, '../scratch/comprehensive_audit_report.json'), JSON.stringify(report, null, 2));
}

run().catch(console.error);
