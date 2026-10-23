const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const slug = 'aisdr-vs-human-sdr-performance-teardown';

async function updatePost() {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });
  if (!post) {
    console.error('Post not found:', slug);
    process.exit(1);
  }

  let body = post.body;

  const targetFaqHeader = '## Frequently Asked Questions';
  const newFaq = `
### What is the cost and conversion comparison between an AI SDR and a Human SDR?
A dedicated Human SDR costs $75,000 to $95,000 per year fully loaded (salary, benefits, tech stack, commissions) and generates 15–22 qualified meetings monthly at a cost of $380–$450 per meeting. In contrast, an automated AI SDR pipeline costs $14,400 per year ($1,200/month flat) and books 20–35 qualified meetings monthly at $65–$90 per meeting—yielding an 83% direct cost reduction while processing inbound leads within 2 minutes.
`;

  if (body.includes(targetFaqHeader)) {
    body = body.replace(targetFaqHeader, targetFaqHeader + '\n' + newFaq);
  } else {
    body = body + '\n\n' + targetFaqHeader + '\n' + newFaq;
  }

  const newSeoTitle = 'AiSDR vs Human SDR [2026]: Cost & Conversion Benchmark'; // 54 chars
  const newMetaDesc = 'Compare AiSDR vs Human SDR cost and conversion benchmarks: $85k/yr human vs $14.4k/yr AI outbound, reply rates, cost per meeting, and unit economics.'; // 151 chars

  console.log('Updating AI SDR Post ID:', post._id);
  console.log('New SEOTitle:', newSeoTitle, 'Length:', newSeoTitle.length);
  console.log('New MetaDescription:', newMetaDesc, 'Length:', newMetaDesc.length);

  await client
    .patch(post._id)
    .set({
      body: body,
      seoTitle: newSeoTitle,
      metaDescription: newMetaDesc,
    })
    .commit();

  console.log('✅ Successfully updated AI SDR post in Sanity');
}

updatePost().catch(console.error);
