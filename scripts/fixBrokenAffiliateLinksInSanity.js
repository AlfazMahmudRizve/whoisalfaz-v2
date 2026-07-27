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

async function fixAffiliateLinks() {
  console.log("🚀 REPLACING EXPIRED 404 AFFILIATE LINKS AND SAMPLE URLS ACROSS SANITY POSTS...\n");

  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    "slug": slug.current,
    title,
    body
  }`);

  let updatedCount = 0;

  for (const p of posts) {
    if (!p.body) continue;
    let bodyText = typeof p.body === 'string' ? p.body : JSON.stringify(p.body);

    let modified = false;

    // Replace 404 Brevo link
    if (bodyText.includes('get.brevo.com/60gns0w2n9o1')) {
      bodyText = bodyText.replace(/https:\/\/get\.brevo\.com\/60gns0w2n9o1/g, 'https://whoisalfaz.me/go/brevo');
      modified = true;
    }

    // Replace dummy Brevo link
    if (bodyText.includes('get.brevo.com/6p79p9p9p9p9')) {
      bodyText = bodyText.replace(/https:\/\/get\.brevo\.com\/6p79p9p9p9p9/g, 'https://whoisalfaz.me/go/brevo');
      modified = true;
    }

    // Replace 404 n8n partner link
    if (bodyText.includes('n8n.partnerlinks.io/8qovl1a3y7q6')) {
      bodyText = bodyText.replace(/https:\/\/n8n\.partnerlinks\.io\/8qovl1a3y7q6/g, 'https://whoisalfaz.me/go/n8n');
      modified = true;
    }

    // Wrap un-backticked sample URLs in code backticks
    const sampleUrls = [
      'https://your-n8n-instance.com',
      'https://www.example.com',
      'https://cms.example.com',
      'https://competitor.com',
      'https://api.pdf-engine.com'
    ];

    for (const sUrl of sampleUrls) {
      if (bodyText.includes(sUrl)) {
        // Regex to wrap un-backticked sample URLs in backticks
        const reg = new RegExp(`(?<![\`"])` + sUrl.replace(/\./g, '\\.') + `[^\\s\\)\\]"'<]*`, 'g');
        if (reg.test(bodyText)) {
          bodyText = bodyText.replace(reg, (match) => `\`${match.trim()}\``);
          modified = true;
        }
      }
    }

    if (modified) {
      try {
        await client.patch(p._id)
          .set({ body: typeof p.body === 'string' ? bodyText : JSON.parse(bodyText) })
          .commit();
        updatedCount++;
        console.log(`  ✅ Cleaned broken/sample links in [${p.slug}]`);
      } catch (err) {
        console.error(`❌ Error patching [${p.slug}]: ${err.message}`);
      }
    }
  }

  console.log(`\n🎉 Processed ${posts.length} posts. Updated ${updatedCount} posts!`);
}

fixAffiliateLinks();
