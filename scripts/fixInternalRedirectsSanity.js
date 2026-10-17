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

// Paths that should not have trailing slashes (files, images, etc.)
function shouldHaveTrailingSlash(url) {
  if (url.includes('#') || url.includes('?')) {
    const [base, rest] = url.split(/[#?]/);
    return shouldHaveTrailingSlash(base);
  }
  if (url.endsWith('/')) return false;
  if (url.includes('.')) return false; // .png, .pdf, .txt, etc.
  if (url.includes('/go/')) return true; // /go/link/ or /go/link
  return true;
}

function normalizeUrl(url) {
  // If internal relative or full domain
  const hasDomain = url.startsWith('https://whoisalfaz.me');
  let pathOnly = hasDomain ? url.replace('https://whoisalfaz.me', '') : url;
  
  if (!pathOnly.startsWith('/')) return url;

  let hash = '';
  let query = '';
  if (pathOnly.includes('#')) {
    const parts = pathOnly.split('#');
    pathOnly = parts[0];
    hash = '#' + parts[1];
  }
  if (pathOnly.includes('?')) {
    const parts = pathOnly.split('?');
    pathOnly = parts[0];
    query = '?' + parts[1];
  }

  // Handle known renamed paths
  if (pathOnly === '/blog/category/learn-automation-in-30-days') {
    pathOnly = '/blog/category/30-days-of-n8n-automation';
  }
  if (pathOnly === '/blog/category/technology') {
    pathOnly = '/blog/category/architecture-teardowns';
  }

  // Add trailing slash if appropriate
  if (!pathOnly.endsWith('/') && !pathOnly.includes('.')) {
    pathOnly += '/';
  }

  const finalPath = `${pathOnly}${query}${hash}`;
  return hasDomain ? `https://whoisalfaz.me${finalPath}` : finalPath;
}

async function run() {
  console.log('🔄 Scanning and fixing internal links in Sanity posts...');
  const posts = await client.fetch(`*[_type == "post" && defined(body)]{ _id, "slug": slug.current, body }`);
  console.log(`Fetched ${posts.length} posts.`);

  let patchedCount = 0;
  let totalLinksFixed = 0;

  for (const post of posts) {
    let body = post.body;
    let modified = false;

    // Match markdown links: [text](url)
    const linkRegex = /\[([^\]]+)\]\((https:\/\/whoisalfaz\.me\/[^\)\s]+|\/[^\)\s]+)\)/g;

    body = body.replace(linkRegex, (match, text, url) => {
      // Don't modify external links or anchor only
      if (!url.startsWith('/') && !url.startsWith('https://whoisalfaz.me')) return match;

      const normalized = normalizeUrl(url);
      if (normalized !== url) {
        modified = true;
        totalLinksFixed++;
        return `[${text}](${normalized})`;
      }
      return match;
    });

    if (modified) {
      await client.patch(post._id).set({ body }).commit();
      patchedCount++;
      console.log(`✅ Patched internal links in: ${post.slug}`);
    }
  }

  console.log(`\n🎉 Completed! Patched ${totalLinksFixed} internal links across ${patchedCount} posts.`);
}

run().catch(console.error);
