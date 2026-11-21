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

const rawPosts = JSON.parse(
  fs.readFileSync(
    'C:/Users/user/.gemini/antigravity/brain/61c13703-00a5-4ae4-9836-3db63e30d377/scratch/scratch_day7_posts.json',
    'utf-8'
  )
);

const post1FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When did Claude Meetings launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Meetings launched in beta on 12 November 2026, for Claude Team and Enterprise plans on Google Meet only."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use Claude Meetings on a Pro plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Personal plans — Free, Pro, Max and Ultra — do not get it. It is restricted to Team and Enterprise plans."
      }
    },
    {
      "@type": "Question",
      "name": "Does Claude Meetings work on Zoom or Microsoft Teams?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not yet. Google Meet is the only platform supported at launch. Anthropic has stated additional video platforms are coming soon."
      }
    },
    {
      "@type": "Question",
      "name": "Does Claude record the audio of my meetings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Claude saves a transcript, a summary and screen descriptions — not audio recordings."
      }
    },
    {
      "@type": "Question",
      "name": "What does Claude Meetings cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notes, transcripts and answers are included in Team and Enterprise plans during the beta. Documents and whiteboards created during a call are free through 10 February 2027."
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
      "name": "When did the Google November 2026 core update start?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The update started on 10 November 2026 at 10:06 a.m. Pacific time, rolling out globally across all languages."
      }
    },
    {
      "@type": "Question",
      "name": "When will the November 2026 core update finish?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google estimates the rollout may take up to two weeks, pointing to completion around 24 November 2026."
      }
    },
    {
      "@type": "Question",
      "name": "What changed in the November 2026 core update?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google has not specified target signals, describing it as a regular update designed to better surface relevant, satisfying content from all types of sites."
      }
    },
    {
      "@type": "Question",
      "name": "Should I rewrite pages that dropped during the update?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. You should avoid rewriting pages mid-rollout. Wait until Google marks the update complete, then wait one full week before analyzing comparative baseline data."
      }
    },
    {
      "@type": "Question",
      "name": "Why do Search Console AI numbers look low for 9 to 11 November?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This was caused by a known Google logging error in the Search Console Generative AI report, not the core update itself."
      }
    }
  ]
};

const post1Doc = {
  _id: 'post-claude-meetings-google-meet-review',
  _type: 'post',
  title: rawPosts.post1.title,
  slug: { _type: 'slug', current: rawPosts.post1.slug },
  description: rawPosts.post1.description,
  seoTitle: rawPosts.post1.title, // 53 chars <= 58
  seoDescription: 'Claude joins Google Meet calls live, writes transcripts, and builds docs. The catch: Team and Enterprise plans only, Google Meet only, and currently in beta.',
  date: '2026-11-20T10:00:00.000Z',
  categories: [
    { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' }, // Automation Tools
    { _type: 'reference', _ref: '4BipTcqouNrKxIUq92q9HG' }  // Tool Comparisons
  ],
  affiliates: [],
  schemaMarkup: JSON.stringify(post1FaqSchema, null, 2),
  body: rawPosts.post1.body
};

const post2Doc = {
  _id: 'post-google-november-2026-core-update-what-changed',
  _type: 'post',
  title: rawPosts.post2.title,
  slug: { _type: 'slug', current: rawPosts.post2.slug },
  description: rawPosts.post2.description,
  seoTitle: rawPosts.post2.title, // 46 chars <= 58
  seoDescription: 'Google rolled out its November 2026 core update on 10 November. What Google confirmed, what changed, and what to do (and not do) while rankings settle.',
  date: '2026-11-20T16:00:00.000Z', // 6 hours after Post 1
  categories: [
    { _type: 'reference', _ref: 'h5g7gmeO9wOK6amcKFpnOQ' }, // SEO & Optimization
    { _type: 'reference', _ref: 'pJmrsKLAWC800vFHegUEU1' }  // Architecture Teardowns
  ],
  affiliates: [],
  schemaMarkup: JSON.stringify(post2FaqSchema, null, 2),
  body: rawPosts.post2.body
};

async function refreshScreamingFrogPost() {
  console.log('3. Refreshing Screaming Frog Alternatives post targeting "best screaming frog alternative"...');
  const existing = await client.fetch('*[_type == "post" && slug.current == "screaming-frog-alternatives-free-seo-audit-tools"][0]');
  if (!existing) {
    console.error('❌ Could not find Screaming Frog post in Sanity.');
    return;
  }

  const updatedDoc = {
    ...existing,
    title: 'Best Screaming Frog Alternatives: 5 Free SEO Crawlers',
    seoTitle: 'Best Screaming Frog Alternative: 5 Free Tools [2026]', // 52 chars <= 58
    description: 'Compare the best Screaming Frog alternatives in 2026. Test 5 free browser-based and cloud web crawlers with zero URL limits and no local RAM bottlenecks.',
    seoDescription: 'Looking for the best Screaming Frog alternative? Compare 5 free browser-based and cloud web crawlers with zero URL limits and no local RAM bottlenecks.',
  };

  const res = await client.createOrReplace(updatedDoc);
  console.log('✅ Successfully refreshed Screaming Frog post:', res._id);
}

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

async function run() {
  console.log('1. Publishing Post 1 (Claude Meetings)...');
  const res1 = await client.createOrReplace(post1Doc);
  console.log('✅ Successfully published Post 1 in Sanity:', res1._id);

  console.log('2. Publishing Post 2 (Google November 2026 Core Update)...');
  const res2 = await client.createOrReplace(post2Doc);
  console.log('✅ Successfully published Post 2 in Sanity:', res2._id);

  // Refresh Screaming Frog post
  await refreshScreamingFrogPost();

  // Sync post ledger
  await syncExistingSanityPostsJson();

  console.log('\nAll Day 7 actions completed successfully in Sanity!');
}

run().catch(err => {
  console.error('❌ Error executing Day 7 publish:', err);
  process.exit(1);
});
