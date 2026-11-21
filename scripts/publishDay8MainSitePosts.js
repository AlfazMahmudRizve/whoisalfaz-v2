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
    'C:/Users/user/.gemini/antigravity/brain/61c13703-00a5-4ae4-9836-3db63e30d377/scratch/scratch_day8_posts.json',
    'utf-8'
  )
);

const post1FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When does OpenAI Agent Builder shut down?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OpenAI Agent Builder shuts down on 30 November 2026, along with the Evals dashboard/API and the v1/prompts API for reusable prompts."
      }
    },
    {
      "@type": "Question",
      "name": "What stays after the OpenAI Agent Builder shutdown?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ChatKit, the Agents SDK, the Responses API, and Model Context Protocol (MCP) tooling remain fully active."
      }
    },
    {
      "@type": "Question",
      "name": "What is OpenAI's recommended migration path?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OpenAI recommends exporting workflows as Agents SDK code (Python or TypeScript) or migrating them to ChatGPT Workspace Agents."
      }
    },
    {
      "@type": "Question",
      "name": "Can I rebuild an Agent Builder workflow in n8n instead?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. n8n provides a visual canvas for multi-step agent workflows. While there is no direct import, you can rebuild node-by-node and retain full visual workflow orchestration."
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
      "name": "What was patched in the n8n November 2026 security update?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "n8n patched five security advisories on 13 November 2026, including two High-severity flaws (GHSA-m7qq-gm3x-v79g and GHSA-q8rc-7m84-mfvj) affecting invitation account takeover and custom role privilege escalation."
      }
    },
    {
      "@type": "Question",
      "name": "Does n8n Cloud need manual patching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. n8n Cloud instances were patched automatically by n8n. Only self-hosted deployments require manual upgrading."
      }
    },
    {
      "@type": "Question",
      "name": "Which versions contain the n8n security fixes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fixed versions include 1.123.96 (v1 line), 2.47.6 (2.x stable), 2.48.3 (2.x beta), and 3.2.2 (v3 line)."
      }
    }
  ]
};

const post1Doc = {
  _id: 'post-openai-agent-builder-shutdown-rebuild-n8n',
  _type: 'post',
  title: 'OpenAI Agent Builder Shuts Down: Rebuild It in n8n',
  slug: { _type: 'slug', current: rawPosts.post1.slug },
  description: rawPosts.post1.description,
  seoTitle: 'OpenAI Agent Builder Shuts Down: Rebuild in n8n [2026]', // 54 chars <= 58
  seoDescription: 'OpenAI Agent Builder shuts down 30 November. If you built on the visual canvas, here is how to export test sets and rebuild workflows in n8n.',
  date: '2026-11-21T10:00:00.000Z',
  categories: [
    { _type: 'reference', _ref: '5qLcvm16UXS9Z7siVOpgIN' }, // n8n Automation
    { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' }  // Automation Tools
  ],
  affiliates: ['n8n'],
  schemaMarkup: JSON.stringify(post1FaqSchema, null, 2),
  body: rawPosts.post1.body
};

const post2Doc = {
  _id: 'post-n8n-security-update-november-2026-patch-now',
  _type: 'post',
  title: 'n8n Patched 5 Flaws: Self-Hosters Must Upgrade Now',
  slug: { _type: 'slug', current: rawPosts.post2.slug },
  description: rawPosts.post2.description,
  seoTitle: 'n8n Security Patch: Self-Hosters Must Upgrade Now', // 49 chars <= 58
  seoDescription: 'n8n patched 5 security advisories (2 High) on 13 November. Cloud is safe; self-hosters must upgrade to fixed versions 1.123.96, 2.47.6, or 3.2.2 now.',
  date: '2026-11-21T16:00:00.000Z', // 6 hours after Post 1
  categories: [
    { _type: 'reference', _ref: '5qLcvm16UXS9Z7siVOpgIN' }, // n8n Automation
    { _type: 'reference', _ref: 'pJmrsKLAWC800vFHegUEU1' }  // Architecture Teardowns
  ],
  affiliates: [],
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

async function run() {
  console.log('1. Publishing Post 1 (OpenAI Agent Builder Shutdown)...');
  const res1 = await client.createOrReplace(post1Doc);
  console.log('✅ Successfully published Post 1 in Sanity:', res1._id);

  console.log('2. Publishing Post 2 (n8n Security Patch)...');
  const res2 = await client.createOrReplace(post2Doc);
  console.log('✅ Successfully published Post 2 in Sanity:', res2._id);

  // Sync post ledger
  await syncExistingSanityPostsJson();

  console.log('\nAll Day 8 posts published successfully in Sanity!');
}

run().catch(err => {
  console.error('❌ Error executing Day 8 publish:', err);
  process.exit(1);
});
