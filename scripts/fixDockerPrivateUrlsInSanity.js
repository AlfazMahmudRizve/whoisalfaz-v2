const { createClient } = require('@sanity/client');
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

async function fixPrivateUrls() {
  console.log("🚀 WRAPPING PRIVATE DOCKER/LOCAL URLS IN CODE BACKTICKS ACROSS SANITY POSTS...\n");

  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    "slug": slug.current,
    title,
    body
  }`);

  // Regex to match raw http:// private/local/docker URLs NOT inside backticks or code fences
  const privateUrlRegex = /(?<![`"'])http:\/\/(qdrant|dify_api|fastapi_bridge|neo4j|nodejs_frontend|127\.0\.0\.1|10\.13\.0\.\d+|172\.17\.0\.\d+)[^\s\)\]"<']*/g;

  let updateCount = 0;

  for (const p of posts) {
    if (!p.body) continue;
    let bodyText = typeof p.body === 'string' ? p.body : JSON.stringify(p.body);

    if (privateUrlRegex.test(bodyText)) {
      // Replace raw private URLs with backticked code representation
      const cleanedBody = bodyText.replace(privateUrlRegex, (match) => {
        return `\`${match.trim()}\``;
      });

      try {
        await client.patch(p._id)
          .set({ body: typeof p.body === 'string' ? cleanedBody : JSON.parse(cleanedBody) })
          .commit();
        updateCount++;
        console.log(`  ✅ Cleaned private Docker URLs in [${p.slug}]`);
      } catch (err) {
        console.error(`❌ Error patching [${p.slug}]: ${err.message}`);
      }
    }
  }

  console.log(`\n🎉 Processed ${posts.length} posts. Updated ${updateCount} posts with clean code backticks!`);
}

fixPrivateUrls();
