const { createClient } = require('@sanity/client');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function main() {
  console.log('🔄 Fetching automated-youtube-shorts-generator from Sanity...');
  const post = await client.fetch('*[_type == "post" && slug.current == "automated-youtube-shorts-generator"][0]');
  if (!post) {
    throw new Error('Post not found in Sanity');
  }

  let body = post.body;

  // 1. Inject Flowjam link into the manual workflow comparison section
  const flowjamCallout = `
> [!NOTE]
> **Manual vs. Automated Workflows:** If you'd rather start by hand to master the creative fundamentals before automating, this step-by-step guide to [making a YouTube Short with AI](https://www.flowjam.com/blog/how-to-make-a-youtube-short-with-ai-2026) covers the manual workflow for scripting, visuals, voiceovers, and captions. Once your baseline template is dialed in, the automated pipeline below scales that exact production loop on autopilot.
`;

  const targetAnchor = '**That is 3-4 hours of skilled work for 30 seconds of content.** At any scale, this is unworkable.';

  if (!body.includes('https://www.flowjam.com/blog/how-to-make-a-youtube-short-with-ai-2026')) {
    if (body.includes(targetAnchor)) {
      body = body.replace(targetAnchor, `${targetAnchor}\n${flowjamCallout}`);
      console.log('✅ Flowjam backlink callout injected into manual vs automated section');
    } else {
      console.warn('⚠️ Target anchor not found, appending before Programmatic Video Factory');
      body = body.replace('As an Automation Architect, I refuse', `${flowjamCallout}\n\nAs an Automation Architect, I refuse`);
    }
  } else {
    console.log('ℹ️ Flowjam link already present');
  }

  // 2. Convert markdown comparison table to responsive Tailwind HTML table
  const htmlTable = `
<table className="block overflow-x-auto w-full text-left border-collapse text-sm my-6">
  <thead>
    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <th className="p-4 font-bold text-slate-900 dark:text-white">Feature / Performance Metric</th>
      <th className="p-4 font-bold text-teal-600 dark:text-teal-400">Creatomate Cloud API</th>
      <th className="p-4 font-bold text-purple-600 dark:text-purple-400">Self-Hosted Remotion Docker Node</th>
      <th className="p-4 font-bold text-slate-900 dark:text-white">Shotstack Video API</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Rendering Speed (60s Short)</td>
      <td className="p-4 text-teal-600 dark:text-teal-400 font-bold">12s–25s (serverless distributed cluster)</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">30s–75s (dependent on VPS CPU/GPU cores)</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">15s–30s (cloud rendering queue)</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Setup Complexity in n8n</td>
      <td className="p-4 text-teal-600 dark:text-teal-400 font-bold">Minimal — single HTTP Request node</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Moderate — requires Docker container setup</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Low — standard REST API integration</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Dynamic Typography & Motion</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Visual editor with dynamic keyframes</td>
      <td className="p-4 text-purple-600 dark:text-purple-400 font-bold">Full programmatic React/CSS animation freedom</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">JSON template schema styling</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Cost per 100 Rendered Videos</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">~$12–$18 based on subscription tiers</td>
      <td className="p-4 text-teal-600 dark:text-teal-400 font-bold">$0 software fee (pay only VPS compute)</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">~$15–$25 based on compute minutes</td>
    </tr>
    <tr>
      <td className="p-4 font-semibold text-slate-900 dark:text-white">Auto-Captioning & Word Highlights</td>
      <td className="p-4 text-teal-600 dark:text-teal-400 font-bold">Built-in automated word-level subtitles</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Requires Whisper alignment script</td>
      <td className="p-4 text-slate-600 dark:text-slate-300">Supported via transcription add-on</td>
    </tr>
  </tbody>
</table>
`;

  if (body.includes('| Feature / Performance Metric | Creatomate Cloud API |')) {
    const tableRegex = /\| Feature \/ Performance Metric \| Creatomate Cloud API \|[\s\S]*?\| Supported via transcription add-on \|/m;
    if (tableRegex.test(body)) {
      body = body.replace(tableRegex, htmlTable.trim());
      console.log('✅ Markdown table replaced with responsive Tailwind HTML table');
    }
  }

  console.log('💾 Committing patch to Sanity CMS...');
  const patch = client.patch(post._id).set({ body });
  const updated = await patch.commit();
  console.log('🎉 Sanity post updated successfully! Document ID:', updated._id);
}

main().catch(console.error);
