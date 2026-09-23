const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const batch14Slugs = [
  'n8n-data-privacy-security-guide',
  'automated-marketing-reporting-with-n8n-at-whoisalfaz',
  'automated-email-follow-up-n8n-brevo',
  'case-study-careerops-ai-resume-builder',
  'case-study-cashops-financial-dashboard'
];

async function pullBatch14() {
  console.log('Fetching Batch 14 articles from Sanity CMS...\n');
  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    publishedAt
  }`;

  const posts = await client.fetch(query, { slugs: batch14Slugs });

  for (const post of posts) {
    fs.writeFileSync(`scratch/batch14_${post.slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved: scratch/batch14_${post.slug}.json (title: "${post.title}")`);
  }

  console.log('\nAll Batch 14 raw articles saved to scratch/.');
}

pullBatch14().catch(err => {
  console.error('Error pulling Batch 14:', err);
  process.exit(1);
});
