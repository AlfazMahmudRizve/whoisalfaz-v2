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

async function main() {
  const query = process.argv[2];
  if (!query) {
    console.error('Usage: node searchSanityBodies.js <search-term-or-phrase>');
    process.exit(1);
  }

  try {
    console.log(`Searching published Sanity posts for phrase: "${query}"...`);
    const posts = await client.fetch(
      `*[_type == "post"] { _id, title, "slug": slug.current, body }`
    );

    const matches = [];
    posts.forEach(p => {
      if (p.body && p.body.toLowerCase().includes(query.toLowerCase())) {
        // Find the context (lines surrounding the match)
        const lines = p.body.split('\n');
        const matchingLines = [];
        lines.forEach((line, index) => {
          if (line.toLowerCase().includes(query.toLowerCase())) {
            matchingLines.push({ lineNum: index + 1, content: line.trim() });
          }
        });
        matches.push({
          id: p._id,
          title: p.title,
          slug: p.slug,
          lines: matchingLines
        });
      }
    });

    console.log(`\nFound ${matches.length} matching posts:`);
    matches.forEach(m => {
      console.log(`\n📄 "${m.title}" (slug: ${m.slug} | ID: ${m.id})`);
      m.lines.slice(0, 3).forEach(l => {
        console.log(`   [Line ${l.lineNum}]: ${l.content}`);
      });
      if (m.lines.length > 3) {
        console.log(`   ... and ${m.lines.length - 3} more matching line(s)`);
      }
    });

  } catch (error) {
    console.error('❌ Search failed:', error.message);
  }
}

main().catch(console.error);
