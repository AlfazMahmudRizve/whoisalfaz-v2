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

async function upgradeManychatPricing() {
  console.log('🔄 Upgrading manychat-pricing-2026 in Sanity...');
  const post = await client.fetch(`*[_type == "post" && slug.current == "manychat-pricing-2026"][0]`);
  if (!post) throw new Error('manychat-pricing-2026 not found');

  let body = post.body;

  // 1. Inject ManyChat vs GoHighLevel Section if not present
  if (!body.includes('ManyChat vs GoHighLevel')) {
    const ghlSection = `
## ManyChat vs GoHighLevel (GHL) — Head-to-Head Comparison [2026]

A common question from scaling agencies is whether to deploy **ManyChat** or **GoHighLevel (GHL)** for conversational sales. While some marketers attempt to use GoHighLevel for everything, technical RevOps architects treat them as complementary layers rather than direct substitutes:

<table className="block overflow-x-auto w-full text-left border-collapse text-sm my-6">
  <thead>
    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <th className="p-4 font-bold text-slate-900 dark:text-white">Evaluation Factor</th>
      <th className="p-4 font-bold text-teal-600 dark:text-teal-400">ManyChat (Conversational DM Engine)</th>
      <th className="p-4 font-bold text-purple-600 dark:text-purple-400">GoHighLevel (All-in-One Agency CRM)</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Primary Architecture</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Front-of-the-funnel social conversation engine (Instagram, WhatsApp, TikTok, Messenger).</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Full CRM, sales pipelines, white-label subaccounts, funnels, and marketing automation.</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Pricing Model</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Starts at $15/mo for 500 contacts; scales exponentially ($800+/mo for 100k contacts) + Meta fees.</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Flat subscription ($97, $297, or $497/mo) with unlimited contacts and subaccounts.</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Instagram DM Builder</td>
      <td className="p-4 text-slate-600 dark:text-slate-300"><strong>Industry Leader:</strong> Native Story replies, live Reels comment triggers, audio/carousel messages.</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Basic DM support; rigid flow builder lacking ManyChat's interactive UI components.</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">CRM & Opportunity Pipeline</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">None. Pure conversational interface requiring third-party CRM webhook sync.</td>
      <td className="p-4 text-slate-600 dark:text-slate-300"><strong>Enterprise Grade:</strong> Drag-and-drop opportunity stages, deal tracking, and calendar booking.</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">The Ideal Agency Architecture</td>
      <td className="p-4 text-slate-600 dark:text-slate-300" colSpan="2">
        <strong>The Hybrid Stack:</strong> Use ManyChat for high-converting Instagram/WhatsApp lead capture &rarr; trigger an n8n webhook on qualified responses &rarr; create opportunity, assign rep, and fire SMS sequences inside GoHighLevel.
      </td>
    </tr>
  </tbody>
</table>

> **The Architectural Rule:** Never replace ManyChat with GoHighLevel for front-end social media lead capture. GHL's social bot builder lacks the conversational fluidity, Story automation, and button carousels needed for high conversion rates. Run ManyChat on top of GoHighLevel via an automated API handshake.
`;
    // Insert before "## ManyChat Alternatives in 2026"
    body = body.replace('## ManyChat Alternatives in 2026', `${ghlSection}\n\n## ManyChat Alternatives in 2026`);
  }

  // 2. Inject GHL FAQ if not present
  if (!body.includes('Can ManyChat replace GoHighLevel')) {
    const faqItem = `
### Can ManyChat replace GoHighLevel (or vice versa)?
No. ManyChat is a dedicated social conversation engine specializing in Instagram DM, WhatsApp, and TikTok conversational automation. GoHighLevel is an all-in-one agency CRM, funnel builder, and client management platform. Replacing ManyChat with GoHighLevel often degrades social conversion rates due to GHL's rigid bot builder. Instead, top agencies use ManyChat to capture top-of-funnel social leads and stream them into GoHighLevel via an n8n webhook bridge.
`;
    body = body.replace('## Frequently Asked Questions', `## Frequently Asked Questions\n${faqItem}`);
  }

  const patch = client.patch(post._id).set({ body });
  const updated = await patch.commit();
  console.log('✅ manychat-pricing-2026 updated successfully:', updated._id);
}

async function upgradeScreamingFrogAlternatives() {
  console.log('🔄 Upgrading screaming-frog-alternatives-free-seo-audit-tools in Sanity...');
  const post = await client.fetch(`*[_type == "post" && slug.current == "screaming-frog-alternatives-free-seo-audit-tools"][0]`);
  if (!post) throw new Error('screaming-frog-alternatives post not found');

  let body = post.body;

  // 1. Inject Featured Snippet Quick Answer Block if not present
  if (!body.includes('Quick Answer (Is Screaming Frog Free?):')) {
    const snippetBox = `
<div className="p-6 my-6 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-slate-800 dark:text-slate-200">
  <p className="text-xs font-bold mb-1.5 text-teal-600 dark:text-teal-400 uppercase tracking-widest">Quick Answer (Is Screaming Frog Free?):</p>
  <p className="text-base font-medium leading-relaxed m-0">
    <strong>Yes, Screaming Frog offers a free version</strong> of its desktop SEO Spider software, but it is strictly capped at crawling <strong>500 URLs per session</strong>. The free edition disables JavaScript rendering, Google Search Console API integrations, automated scheduled crawls, and project saving. For websites over 500 pages, free cloud crawlers like the <a href="/audit/" className="text-teal-600 dark:text-teal-400 font-bold underline">WhoisAlfaz Website Audit Tool</a> provide unlimited parallel audits without desktop RAM crashes.
  </p>
</div>
`;
    body = body.replace('## Is Screaming Frog Free? Exact Free Version Limits (2026)', `## Is Screaming Frog Free? Exact Free Version Limits (2026)\n${snippetBox}`);
  }

  // 2. Convert markdown table to HTML table if markdown table is present
  if (body.includes('| Feature / Limit | Screaming Frog Free |')) {
    const htmlTable = `
<table className="block overflow-x-auto w-full text-left border-collapse text-sm my-6">
  <thead>
    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <th className="p-4 font-bold text-slate-900 dark:text-white">Feature / Limit</th>
      <th className="p-4 font-bold text-slate-900 dark:text-white">Screaming Frog Free</th>
      <th className="p-4 font-bold text-slate-900 dark:text-white">Screaming Frog Paid ($259/yr)</th>
      <th className="p-4 font-bold text-teal-600 dark:text-teal-400">WhoisAlfaz Audit Tool (Free)</th>
      <th className="p-4 font-bold text-slate-900 dark:text-white">Ahrefs Webmaster Tools</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Crawl URL Cap</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">500 URLs / session</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Unlimited (RAM bound)</td>
      <td className="p-4 text-teal-600 dark:text-teal-400 font-bold">Unlimited Single-Run</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">5,000 URLs / month</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Installation</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Desktop Download</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Desktop Download</td>
      <td className="p-4 text-teal-600 dark:text-teal-400 font-bold">Zero (Runs in Browser)</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Cloud SaaS</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Verification Needed</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">None</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">None</td>
      <td className="p-4 text-teal-600 dark:text-teal-400 font-bold">None (Audit Any Domain)</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Mandatory (DNS / GSC)</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">JavaScript Rendering</td>
      <td className="p-4 text-red-500 font-semibold">Disabled (HTML Only)</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Enabled (Chromium Headless)</td>
      <td className="p-4 text-teal-600 dark:text-teal-400 font-bold">Native Server Rendering</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Cloud JS Execution</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Google Search Console API</td>
      <td className="p-4 text-red-500 font-semibold">Disabled</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">OAuth API Integration</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Public Protocol Audit</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Native Integration</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Automation & Webhooks</td>
      <td className="p-4 text-red-500 font-semibold">None</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">CLI & Scheduling</td>
      <td className="p-4 text-teal-600 dark:text-teal-400 font-bold">n8n / API Webhooks</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Scheduled Email Reports</td>
    </tr>
  </tbody>
</table>
`;

    // Regex to match the markdown table in section 5
    const tableRegex = /\| Feature \/ Limit \| Screaming Frog Free \|[\s\S]*?\| Scheduled Email Reports \|/m;
    if (tableRegex.test(body)) {
      body = body.replace(tableRegex, htmlTable.trim());
    } else {
      // Fallback slice replacement
      const beforeTable = body.split('| Feature / Limit |')[0];
      const afterTable = body.split('| Scheduled Email Reports |')[1] || '';
      body = `${beforeTable}${htmlTable.trim()}${afterTable}`;
    }
  }

  const patch = client.patch(post._id).set({ body });
  const updated = await patch.commit();
  console.log('✅ screaming-frog-alternatives updated successfully:', updated._id);
}

async function upgradeSummitPost() {
  console.log('🔄 Upgrading manychat-instagram-summit-2026-agenda-review-bonus in Sanity...');
  const post = await client.fetch(`*[_type == "post" && slug.current == "manychat-instagram-summit-2026-agenda-review-bonus"][0]`);
  if (!post) throw new Error('summit post not found');

  let body = post.body;

  // 1. Convert Ticket Tiers markdown table to HTML table if present
  if (body.includes('| Ticket Tier | Price | Access Format |')) {
    const htmlTable = `
<table className="block overflow-x-auto w-full text-left border-collapse text-sm my-6">
  <thead>
    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <th className="p-4 font-bold text-slate-900 dark:text-white">Ticket Tier</th>
      <th className="p-4 font-bold text-slate-900 dark:text-white">Price</th>
      <th className="p-4 font-bold text-slate-900 dark:text-white">Access Format</th>
      <th className="p-4 font-bold text-slate-900 dark:text-white">Included Features</th>
      <th className="p-4 font-bold text-slate-900 dark:text-white">Target Persona</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
    <tr>
      <td className="p-4 font-bold text-teal-600 dark:text-teal-400">Virtual Pass</td>
      <td className="p-4 font-bold text-slate-900 dark:text-white">$20</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Live Online Stream</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">All keynote streams, live chat Q&A, 30-day session replays, plus our <strong>Free Community n8n Blueprint Pack</strong>.</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Agencies, Solopreneurs, Automation Engineers, International Attendees</td>
    </tr>
    <tr>
      <td className="p-4 font-bold text-purple-600 dark:text-purple-400">In-Person (IRL)</td>
      <td className="p-4 font-bold text-slate-900 dark:text-white">$299 - $399</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Hollywood, CA</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Live stage access, VIP networking lounges, afterparty, and hands-on masterclass workshops.</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Agency Founders, Venture-Backed Founders, Marketing Directors</td>
    </tr>
    <tr>
      <td className="p-4 font-bold text-amber-600 dark:text-amber-400">VIP All-Access</td>
      <td className="p-4 font-bold text-slate-900 dark:text-white">$699+</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Hybrid + VIP Lounge</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Private speaker dinners, 1-on-1 ManyChat product team triage, lifetime replay library.</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">7-Figure Agency Executives & High-Volume E-Commerce Brands</td>
    </tr>
  </tbody>
</table>
`;
    const tableRegex = /\| Ticket Tier \| Price \| Access Format \|[\s\S]*?\| 7-Figure Agency Executives & High-Volume E-Commerce Brands \|/m;
    if (tableRegex.test(body)) {
      body = body.replace(tableRegex, htmlTable.trim());
    }
  }

  // 2. Inject n8n Code Blueprint into the 10-Second Webhook Section
  if (!body.includes('// Production n8n Webhook Immediate Response Node')) {
    const codeSnippet = `
\`\`\`json
// Production n8n Webhook Immediate Response Node Configuration
{
  "parameters": {
    "httpMethod": "POST",
    "path": "manychat-async-handshake",
    "responseMode": "responseNode",
    "options": {}
  },
  "id": "e8f192b0-4a11-4cb3-9118-manychat-handshake",
  "name": "ManyChat Instant Webhook Ingestion",
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 2,
  "position": [240, 300],
  "webhookId": "manychat-async-handshake"
}
\`\`\`

> **Instant Handshake Pattern:** The node above returns an HTTP \`200 OK\` payload within **85 milliseconds**, freeing ManyChat's client thread before routing the heavy multi-second operations (Apollo company domain lookup, OpenAI semantic qualification, Brevo list sync) to an asynchronous background worker.
`;
    body = body.replace('To solve this permanently, we engineer a **decoupled queue pattern**:', `To solve this permanently, we engineer a **decoupled queue pattern**:\n${codeSnippet}`);
  }

  // 3. Add prominent Conversion CTA Box
  if (!body.includes('Claim Your Free Automation Pack &rarr;')) {
    const ctaButton = `
<div className="p-8 my-8 text-center rounded-3xl bg-gradient-to-br from-purple-900/30 via-slate-900 to-teal-900/30 border border-purple-500/30 shadow-2xl">
  <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">Claim Your Free Summit Automation Pack</h3>
  <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
    Get instant access to our 3 production-grade n8n blueprints: ManyChat Async Timeout Handshake, Apollo Waterfall Lead Enrichment, and Qdrant RAG Memory Engine.
  </p>
  <a href="/claim-manychat-bonus/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-teal-500 to-emerald-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
    Claim Your Free Automation Pack &rarr;
  </a>
</div>
`;
    body = body.replace('## 📋 Step-by-Step: How to Register & Claim Your Free Bonus Pack', `${ctaButton}\n\n## 📋 Step-by-Step: How to Register & Claim Your Free Bonus Pack`);
  }

  const patch = client.patch(post._id).set({ body });
  const updated = await patch.commit();
  console.log('✅ summit post updated successfully:', updated._id);
}

async function main() {
  await upgradeManychatPricing();
  await upgradeScreamingFrogAlternatives();
  await upgradeSummitPost();
  console.log('\n🎉 All 3 Sprint 2 content upgrades successfully committed to Sanity CMS!');
}

main().catch(console.error);
