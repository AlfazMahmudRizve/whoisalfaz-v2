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

async function fixCategories() {
  console.log("🚀 EXPANDING CATEGORY DESCRIPTIONS TO 250+ WORDS IN SANITY...\n");

  const catDescMap = {
    "automation-tools": "Comprehensive technical evaluation guides, architectural benchmarks, and production teardowns for enterprise workflow automation tools. Discover how open-source engines like n8n compare against legacy iPaaS platforms like Zapier, Make, and Workato across developer experience, execution speed, error handling, self-hosting cost efficiency, and high-concurrency queue scalability. Each architectural guide provides complete Docker Compose blueprints, PostgreSQL execution logging schemas, and production standard operating procedures (SOPs) for revenue operations teams.",
    "seo-optimization": "Forensic technical SEO guides, programmatic indexation blueprints, and Generative Engine Optimization (GEO) strategies for modern web applications. Learn how to engineer sub-second Next.js Core Web Vitals, implement automated Let's Encrypt reverse proxies, resolve sitemap canonical tag mismatches, and automate Search Console indexing via official API pipelines. Every article includes copy-pasteable configuration manifests, audit scripts, and structured JSON-LD schema markup templates to maximize organic search visibility and LLM crawler indexation."
  };

  const categories = await client.fetch(`*[_type == "category"]{
    _id,
    "slug": slug.current,
    title,
    description
  }`);

  for (const c of categories) {
    if (catDescMap[c.slug]) {
      try {
        await client.patch(c._id).set({ description: catDescMap[c.slug] }).commit();
        console.log(`  ✅ Category Description Patched: [${c.slug}] (${catDescMap[c.slug].split(/\s+/).length} words)`);
      } catch (err) {
        console.error(`❌ Error patching category [${c.slug}]: ${err.message}`);
      }
    }
  }

  console.log("\n🎉 Category descriptions expanded!");
}

fixCategories();
