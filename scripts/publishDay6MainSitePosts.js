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

const rawPosts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../scratch_posts.json'), 'utf-8'));

const post1FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does Stripe charge for a $100 payment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On standard US domestic card processing (2.9% + $0.30), Stripe deducts $3.20 from a $100 payment, depositing $96.80 into your account."
      }
    },
    {
      "@type": "Question",
      "name": "What additional fees does Stripe charge for international cards?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stripe assesses an additional 1.5% fee for international credit cards (4.4% + $0.30 total). If currency conversion is also required, an additional 1% conversion fee applies (5.4% + $0.30 total)."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a dispute or chargeback cost on Stripe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stripe charges a $15 fee to receive a dispute, plus an additional $15 if you choose to submit evidence to contest it. The second $15 is refunded only if you win the dispute, but original transaction processing fees are not returned."
      }
    }
  ]
};

const post2FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does n8n Cloud cost compared to self-hosted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "n8n Cloud starts at $20/month on annual billing ($24/month billed monthly) for 2,500 executions. Self-hosting n8n Community Edition on a cloud VPS (like Vultr) costs approximately $5–$6/month for server hosting with unlimited executions."
      }
    },
    {
      "@type": "Question",
      "name": "What counts as an execution in n8n Cloud?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An execution counts as one complete run of a workflow from trigger to completion, regardless of the number of nodes or steps inside the workflow."
      }
    },
    {
      "@type": "Question",
      "name": "When should you choose self-hosted n8n over n8n Cloud?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Self-hosted n8n is ideal when your workload exceeds 10,000 executions per month (such as polling triggers running every 5 minutes), when data sovereignty requires private infrastructure, or when you already operate Docker environments. n8n Cloud is recommended for client builds to offload maintenance, updates, and SLAs."
      }
    }
  ]
};

const post1Doc = {
  _id: 'post-what-stripe-takes-from-100-payment',
  _type: 'post',
  title: rawPosts.post1.title,
  slug: { _type: 'slug', current: rawPosts.post1.slug },
  description: rawPosts.post1.description,
  seoTitle: rawPosts.post1.title, // 46 chars <= 58
  seoDescription: 'A $100 Stripe sale puts $96.80 in your account. The exact math on card processing, international surcharges, and the three fees that catch people out.',
  date: '2026-11-16T10:00:00.000Z',
  categories: [
    { _type: 'reference', _ref: '4BipTcqouNrKxIUq92q9HG' }, // Tool Comparisons
    { _type: 'reference', _ref: 'pJmrsKLAWC800vFHegUEU1' }  // Architecture Teardowns
  ],
  affiliates: [],
  schemaMarkup: JSON.stringify(post1FaqSchema, null, 2),
  body: rawPosts.post1.body
};

const post2Doc = {
  _id: 'post-n8n-cloud-vs-self-hosted',
  _type: 'post',
  title: rawPosts.post2.title,
  slug: { _type: 'slug', current: rawPosts.post2.slug },
  description: rawPosts.post2.description,
  seoTitle: rawPosts.post2.title, // 58 chars <= 58
  seoDescription: 'n8n Cloud costs $20/mo for 2,500 runs; self-hosted costs ~$5/mo with no cap except your time. The execution math and trade-offs to choose the right setup.',
  date: '2026-11-16T11:00:00.000Z',
  categories: [
    { _type: 'reference', _ref: '5qLcvm16UXS9Z7siVOpgIN' }, // n8n Automation
    { _type: 'reference', _ref: '4BipTcqouNrKxIUq92q9HG' }, // Tool Comparisons
    { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' }  // Automation Tools
  ],
  affiliates: ['n8n', 'vultr'],
  schemaMarkup: JSON.stringify(post2FaqSchema, null, 2),
  body: rawPosts.post2.body
};

async function syncExistingSanityPostsJson() {
  console.log('Fetching latest post inventory from Sanity to sync data/existing_sanity_posts.json...');
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc, date desc){
    _id,
    title,
    "slug": slug.current,
    description
  }`);

  const formatted = posts.map((p, idx) => ({
    index: idx + 1,
    id: p._id,
    slug: p.slug,
    title: p.title,
    description: p.description
  }));

  const targetPath = path.resolve(__dirname, '../data/existing_sanity_posts.json');
  fs.writeFileSync(targetPath, JSON.stringify(formatted, null, 2), 'utf-8');
  console.log(`✅ Synced data/existing_sanity_posts.json with ${formatted.length} posts!`);
}

async function publishBoth() {
  console.log('1. Publishing Post 1 (Stripe)...');
  const res1 = await client.createOrReplace(post1Doc);
  console.log('✅ Successfully published Post 1 in Sanity:', res1._id);

  console.log('2. Publishing Post 2 (n8n Cloud vs self-hosted)...');
  const res2 = await client.createOrReplace(post2Doc);
  console.log('✅ Successfully published Post 2 in Sanity:', res2._id);

  // Sync existing_sanity_posts.json
  await syncExistingSanityPostsJson();

  console.log('\nAll Day 6 main-site posts published successfully!');
}

publishBoth().catch(err => {
  console.error('❌ Error publishing Day 6 posts:', err);
  process.exit(1);
});
