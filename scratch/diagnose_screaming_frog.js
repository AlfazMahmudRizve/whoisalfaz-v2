const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const baseUrl = 'https://whoisalfaz.me';

async function diagnose() {
  console.log('🔍 Starting comprehensive Screaming Frog issue diagnosis...');

  // 1. Fetch all blog posts and pages
  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    seoTitle,
    description,
    seoDescription,
    "slug": slug.current,
    body
  }`);

  console.log(`Fetched ${posts.length} posts from Sanity.`);

  // Check 1: Title over 60 chars or over 58 chars
  const titleOver60 = [];
  const metaOver155 = [];
  posts.forEach(p => {
    const title = p.seoTitle || p.title || '';
    if (title.length > 58) {
      titleOver60.push({ slug: p.slug, title, length: title.length });
    }
    const desc = p.seoDescription || p.description || '';
    if (desc.length > 155) {
      metaOver155.push({ slug: p.slug, desc: desc.slice(0, 40) + '...', length: desc.length });
    }
  });

  console.log('\n--- 1. TITLES OVER 58 CHARS ---');
  console.log(titleOver60);

  console.log('\n--- 2. META DESCRIPTIONS OVER 155 CHARS ---');
  console.log(metaOver155);

  // Check 3: Internal links in Sanity posts pointing to:
  // - /go/ (robots.txt blocked)
  // - Non-trailing-slash URLs (3xx redirect)
  // - 404 links
  let goLinksInPosts = 0;
  let nonTrailingSlashInternalLinks = 0;
  const sampleInternalRedirects = [];

  const markdownLinkRegex = /\[([^\]]+)\]\((https:\/\/whoisalfaz\.me[^\)]+|\/[^\)]+)\)/g;

  posts.forEach(p => {
    if (!p.body) return;
    let match;
    while ((match = markdownLinkRegex.exec(p.body)) !== null) {
      const url = match[2];
      if (url.includes('/go/')) {
        goLinksInPosts++;
      } else if (url.startsWith('/') || url.startsWith('https://whoisalfaz.me')) {
        // check if internal link lacks trailing slash and isn't a file/anchor
        const clean = url.split('#')[0].split('?')[0];
        if (!clean.endsWith('/') && !clean.includes('.') && clean !== 'https://whoisalfaz.me' && clean !== '') {
          nonTrailingSlashInternalLinks++;
          if (sampleInternalRedirects.length < 10) {
            sampleInternalRedirects.push({ post: p.slug, url });
          }
        }
      }
    }
  });

  console.log(`\n--- 3. INTERNAL LINKS IN SANITY POSTS ---`);
  console.log(`Internal links to /go/ (blocked by robots.txt): ${goLinksInPosts}`);
  console.log(`Internal links without trailing slash (causes 308 redirect): ${nonTrailingSlashInternalLinks}`);
  console.log('Sample internal redirects:', sampleInternalRedirects);
}

diagnose().catch(console.error);
