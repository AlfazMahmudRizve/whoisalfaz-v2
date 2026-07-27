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

function replaceInObj(obj) {
  if (!obj) return false;
  let modified = false;

  if (typeof obj === 'string') {
    if (obj.includes('get.brevo.com/60gns0w2n9o1') || 
        obj.includes('get.brevo.com/6p79p9p9p9p9') || 
        obj.includes('n8n.partnerlinks.io/8qovl1a3y7q6')) {
      modified = true;
    }
  } else if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === 'string') {
        const orig = obj[i];
        let next = orig.replace(/https:\/\/get\.brevo\.com\/60gns0w2n9o1/g, 'https://whoisalfaz.me/go/brevo')
                      .replace(/https:\/\/get\.brevo\.com\/6p79p9p9p9p9/g, 'https://whoisalfaz.me/go/brevo')
                      .replace(/https:\/\/n8n\.partnerlinks\.io\/8qovl1a3y7q6/g, 'https://whoisalfaz.me/go/n8n');
        if (next !== orig) {
          obj[i] = next;
          modified = true;
        }
      } else if (typeof obj[i] === 'object') {
        if (replaceInObj(obj[i])) modified = true;
      }
    }
  } else if (typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        const orig = obj[key];
        let next = orig.replace(/https:\/\/get\.brevo\.com\/60gns0w2n9o1/g, 'https://whoisalfaz.me/go/brevo')
                      .replace(/https:\/\/get\.brevo\.com\/6p79p9p9p9p9/g, 'https://whoisalfaz.me/go/brevo')
                      .replace(/https:\/\/n8n\.partnerlinks\.io\/8qovl1a3y7q6/g, 'https://whoisalfaz.me/go/n8n');
        if (next !== orig) {
          obj[key] = next;
          modified = true;
        }
      } else if (typeof obj[key] === 'object') {
        if (replaceInObj(obj[key])) modified = true;
      }
    }
  }
  return modified;
}

async function fixDeep() {
  console.log("🚀 DEEP TRAVERSING SANITY POST BODIES TO REPLACE ALL EXPIRED AFFILIATE LINKS...\n");

  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    "slug": slug.current,
    title,
    body,
    description,
    seoDescription
  }`);

  let patchedCount = 0;

  for (const p of posts) {
    let modified = false;

    if (p.body) {
      if (replaceInObj(p.body)) modified = true;
    }
    if (p.description) {
      const orig = p.description;
      const next = orig.replace(/https:\/\/get\.brevo\.com\/60gns0w2n9o1/g, 'https://whoisalfaz.me/go/brevo')
                       .replace(/https:\/\/n8n\.partnerlinks\.io\/8qovl1a3y7q6/g, 'https://whoisalfaz.me/go/n8n');
      if (next !== orig) {
        p.description = next;
        modified = true;
      }
    }

    if (modified) {
      try {
        await client.patch(p._id)
          .set({ body: p.body, description: p.description })
          .commit();
        patchedCount++;
        console.log(`  ✅ Deep Patched 404 links in [${p.slug}]`);
      } catch (err) {
        console.error(`❌ Error patching [${p.slug}]: ${err.message}`);
      }
    }
  }

  console.log(`\n🎉 Deep traversal completed. Updated ${patchedCount} Sanity posts!`);
}

fixDeep();
