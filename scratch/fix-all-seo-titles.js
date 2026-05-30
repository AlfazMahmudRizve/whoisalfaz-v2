const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

// Explicit override mapping for known mismatched slugs to ensure 100% precision
const explicitOverrides = {
  "what-is-n8n-and-how-to-set-it-up": {
    seoTitle: "n8n Cloud vs Self-Hosted: Infrastructure Setup Guide",
    seoDescription: "An in-depth guide comparing n8n Cloud vs Self-Hosted deployments. Learn server setups, Docker hosting, cost comparisons, and scalability rules."
  },
  "n8n-workflow-design-best-practices": {
    seoTitle: "n8n Workflow Design: Best Practices & Reliability Guide",
    seoDescription: "Learn how to build production-grade n8n workflows. Discover best practices for structuring inputs, processing, error paths, and outputs."
  },
  "n8n-slack-notifications-by-alfaz-mahmud-rizve": {
    seoTitle: "n8n Slack Notifications: Real-Time Lead Alert Setup Guide",
    seoDescription: "Set up real-time n8n Slack notifications for incoming leads. Improve response times and never miss a qualified prospect with dynamic alerts."
  },
  "automated-email-follow-up-n8n-brevo": {
    seoTitle: "n8n Email Follow-Up: Automate Drip Campaigns with Brevo",
    seoDescription: "Learn how to build a stateful automated email follow-up sequence using n8n and Brevo. Save hours of sales follow-up and grow reply rates."
  },
  "facebook-lead-ads-automation-by-alfaz-mahmud-rizve": {
    seoTitle: "Facebook Lead Ads to n8n: Sync Leads to CRM for Free",
    seoDescription: "Stop paying Zapier taxes. Build a real-time Facebook Lead Ads automation pipeline using n8n to instantly sync lead data to your B2B CRM."
  }
};

async function fixAllSeoTitles() {
  try {
    console.log('Querying all posts from Sanity...');
    const posts = await client.fetch('*[_type == "post"] { _id, slug, title, seoTitle, seoDescription }');
    console.log(`Auditing ${posts.length} posts...`);
    
    let fixCount = 0;
    const transaction = client.transaction();

    for (const post of posts) {
      const slug = post.slug?.current;
      if (!slug) continue;

      let newSeoTitle = '';
      let newSeoDesc = '';

      // Check explicit overrides first
      if (explicitOverrides[slug]) {
        newSeoTitle = explicitOverrides[slug].seoTitle;
        newSeoDesc = explicitOverrides[slug].seoDescription;
      } else {
        // Run heuristic check for mismatches
        const titleWords = (post.title || '').toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .split(/\s+/)
          .filter(w => w.length > 3);
          
        const seoTitleLower = (post.seoTitle || '').toLowerCase();
        
        let wordMatchCount = 0;
        titleWords.forEach(word => {
          if (seoTitleLower.includes(word)) {
            wordMatchCount++;
          }
        });

        // If less than 2 matching significant words and slug doesn't match, it is highly likely mismatched!
        const isMismatched = wordMatchCount < 2 && !seoTitleLower.includes(slug.split('-')[0]);

        if (isMismatched) {
          console.log(`⚠️ Detected mismatch on slug: ${slug}`);
          console.log(`   Title: "${post.title}"`);
          console.log(`   Current SEO Title: "${post.seoTitle}"`);
          
          // Generate clean SEO Title from Main Title
          // Strip 30 days suffix
          let cleanTitle = post.title.split('– 30 Days')[0].split('- 30 Days')[0].split('– Day')[0].split('- Day')[0].trim();
          if (cleanTitle.length > 50) {
            cleanTitle = cleanTitle.substring(0, 50).trim() + '...';
          }
          newSeoTitle = `${cleanTitle} | n8n Guide`;
          
          // Generate clean SEO description if existing is also mismatched or short
          if (!post.seoDescription || post.seoDescription.length < 30) {
            newSeoDesc = `Learn how to master n8n workflows: ${cleanTitle}. Read the full technical blueprint by Alfaz Mahmud Rizve.`;
          }
        }
      }

      if (newSeoTitle) {
        console.log(`🚀 Queueing optimization patch for: ${slug}`);
        console.log(`   -> New SEO Title: "${newSeoTitle}"`);
        
        const patches = { seoTitle: newSeoTitle };
        if (newSeoDesc) {
          patches.seoDescription = newSeoDesc;
          console.log(`   -> New SEO Desc: "${newSeoDesc}"`);
        }
        
        transaction.patch(post._id, { set: patches });
        fixCount++;
      }
    }

    if (fixCount > 0) {
      console.log(`\nExecuting transaction to update ${fixCount} posts...`);
      const result = await transaction.commit();
      console.log(`✅ Successfully committed patches for ${fixCount} posts in Sanity CMS!`);
    } else {
      console.log('🎉 Audit complete. No legacy mismatches found in remaining posts.');
    }
  } catch (error) {
    console.error('❌ Failed to run SEO title fix transaction:', error);
  }
}

fixAllSeoTitles();
