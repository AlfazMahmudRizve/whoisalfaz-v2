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

function repairText(str) {
  if (typeof str !== 'string') return str;

  let content = str;

  // 1. Replace capture-n8n-lead-data when not followed by -from-wordpress-elementor
  content = content.replace(/capture-n8n-lead-data(?!-from-wordpress-elementor)/g, 'capture-n8n-lead-data-from-wordpress-elementor');

  // 2. Replace automated-facebook-leads-n8n with facebook-lead-ads-automation-by-alfaz-mahmud-rizve
  content = content.replace(/automated-facebook-leads-n8n/g, 'facebook-lead-ads-automation-by-alfaz-mahmud-rizve');

  // 3. Clean up any repeated -from-wordpress-elementor fragments
  content = content.replace(/-from-wordpress-elementor(-from-wordpress-elementor)+/g, '-from-wordpress-elementor');

  return content;
}

function processBlocks(blocks) {
  let changed = false;
  if (!Array.isArray(blocks)) return { blocks, changed };

  const newBlocks = blocks.map(block => {
    if (block._type === 'block' && Array.isArray(block.children)) {
      const newChildren = block.children.map(child => {
        if (child._type === 'span' && typeof child.text === 'string') {
          const repaired = repairText(child.text);
          if (repaired !== child.text) {
            changed = true;
            return { ...child, text: repaired };
          }
        }
        return child;
      });
      return { ...block, children: newChildren };
    }
    return block;
  });

  return { blocks: newBlocks, changed };
}

async function fixBrokenSanityLinks() {
  console.log('🔍 Fetching all Sanity posts to scan and repair broken links...\n');

  try {
    const posts = await client.fetch(`*[_type == "post"]{ _id, title, "slug": slug.current, body, description }`);
    console.log(`Total posts fetched from Sanity: ${posts.length}`);

    let updatedCount = 0;

    for (const post of posts) {
      let isDocChanged = false;
      const patches = {};

      // Handle body (string or portable text array)
      if (typeof post.body === 'string') {
        const repairedBody = repairText(post.body);
        if (repairedBody !== post.body) {
          patches.body = repairedBody;
          isDocChanged = true;
          console.log(`  [Body Modified] Post "${post.title}" (${post.slug})`);
        }
      } else if (Array.isArray(post.body)) {
        const { blocks: repairedBlocks, changed } = processBlocks(post.body);
        if (changed) {
          patches.body = repairedBlocks;
          isDocChanged = true;
          console.log(`  [PortableText Body Modified] Post "${post.title}" (${post.slug})`);
        }
      }

      // Handle description
      if (typeof post.description === 'string') {
        const repairedDesc = repairText(post.description);
        if (repairedDesc !== post.description) {
          patches.description = repairedDesc;
          isDocChanged = true;
          console.log(`  [Description Modified] Post "${post.title}" (${post.slug})`);
        }
      }

      if (isDocChanged) {
        console.log(`  Patching document ${post._id} in Sanity...`);
        await client.patch(post._id).set(patches).commit();
        updatedCount++;
        console.log(`  ✅ Successfully patched ${post.slug}\n`);
      }
    }

    console.log(`\n🎉 Sanity Link Repair Complete! Updated ${updatedCount} post(s).`);
  } catch (err) {
    console.error('❌ Error executing fixBrokenSanityLinks:', err);
    process.exit(1);
  }
}

fixBrokenSanityLinks();
