const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const bodyContent = fs.readFileSync(path.resolve(__dirname, 'draft-tempmail10min-technical-seo-body.md'), 'utf-8');

// Embed diagram in body right after Section 2
const enhancedBody = bodyContent.replace(
  '--- \n\n## <mark>3. The Competitor Benchmarking Lab',
  '<img src="https://cdn.sanity.io/images/gfd4n1nu/production/2b3a70d3206b8c1815390d2715328d35b2d05d78-1376x768.webp" alt="TempMail10min Technical Optimization and Crawl Audit Flowchart" width="100%" />\n\n---\n\n## <mark>3. The Competitor Benchmarking Lab'
).replace(
  '---\r\n\r\n## <mark>3. The Competitor Benchmarking Lab',
  '<img src="https://cdn.sanity.io/images/gfd4n1nu/production/2b3a70d3206b8c1815390d2715328d35b2d05d78-1376x768.webp" alt="TempMail10min Technical Optimization and Crawl Audit Flowchart" width="100%" />\n\n---\n\n## <mark>3. The Competitor Benchmarking Lab'
);

const postDoc = {
  _id: 'post-tempmail10min-technical-seo',
  _type: 'post',
  title: 'Technical SEO Case Study: Optimizing Architecture & Benchmarking for TempMail10min',
  slug: { _type: 'slug', current: 'tempmail10min-technical-seo' },
  description: 'How I resolved crawl debt, eradicated render-blocking preloader delays, engineered a 5-in-1 schema graph, and built competitor benchmarks as SEO Lead for TempMail10min.',
  seoTitle: 'Technical SEO Case Study: TempMail10min Architecture',
  seoDescription: 'Technical SEO case study on resolving root mirrors, crawl debt, preloader paint delays, and deploying 5-in-1 schema for TempMail10min.',
  date: '2026-09-17T15:00:00.000Z',
  image: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-6efa1dd65cc4f90b3318c5224287449abc8a7f89-1376x768-webp'
    }
  },
  categories: [
    { _type: 'reference', _ref: 'pJmrsKLAWC800vFHegUEU1' }, // Architecture Teardowns
    { _type: 'reference', _ref: 'h5g7gmeO9wOK6amcKFpnOQ' }  // SEO & Optimization
  ],
  affiliates: [],
  body: enhancedBody
};

async function publish() {
  console.log('Publishing post to Sanity...');
  const res = await client.createOrReplace(postDoc);
  console.log('✅ Successfully published post to Sanity! ID:', res._id);
  
  // Write to draft JSON as record
  fs.writeFileSync(path.resolve(__dirname, '../draft-tempmail10min-technical-seo.json'), JSON.stringify(postDoc, null, 2), 'utf-8');
  console.log('Saved local JSON record at draft-tempmail10min-technical-seo.json');
}

publish().catch(console.error);
