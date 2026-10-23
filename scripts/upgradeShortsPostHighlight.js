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
  if (!post) throw new Error('Post not found');

  let body = post.body;

  // Replace any existing blockquote callout with a prominent, beautifully styled HTML card
  const newCallout = `
<div className="p-6 my-8 rounded-2xl bg-teal-500/10 border-l-4 border-teal-500 text-slate-800 dark:text-slate-200 shadow-sm">
  <p className="text-xs font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-2">
    💡 Manual vs. Automated Workflows
  </p>
  <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed m-0 font-medium">
    If you'd rather start by hand to master the creative fundamentals before automating, this step-by-step guide to <a href="https://www.flowjam.com/blog/how-to-make-a-youtube-short-with-ai-2026" target="_blank" rel="noopener noreferrer" className="font-bold text-teal-600 dark:text-teal-400 underline underline-offset-4 decoration-2 decoration-teal-500 bg-teal-500/15 dark:bg-teal-400/20 px-2 py-0.5 rounded hover:bg-teal-500/25 transition-all">making a YouTube Short with AI</a> covers the manual workflow for scripting, visuals, voiceovers, and captions. Once your baseline template is dialed in, the automated pipeline below scales that exact production loop on autopilot.
  </p>
</div>
`;

  // Check if old blockquote with [!NOTE] exists
  const oldRegex = />\s*\[!NOTE\][\s\S]*?scales that exact production loop on autopilot\./m;
  if (oldRegex.test(body)) {
    body = body.replace(oldRegex, newCallout.trim());
    console.log('✅ Replaced raw [!NOTE] blockquote with highlighted HTML callout');
  } else if (body.includes('https://www.flowjam.com/blog/how-to-make-a-youtube-short-with-ai-2026')) {
    // If it's already there in another format, replace the section
    const startIdx = body.indexOf('Manual vs. Automated Workflows');
    if (startIdx !== -1) {
      const before = body.slice(0, body.lastIndexOf('\n', startIdx - 10));
      const endMarker = 'scales that exact production loop on autopilot.';
      const afterIdx = body.indexOf(endMarker) + endMarker.length;
      const after = body.slice(afterIdx);
      body = `${before}\n\n${newCallout.trim()}\n\n${after.trimStart()}`;
      console.log('✅ Replaced Flowjam section with highlighted HTML callout');
    }
  }

  console.log('💾 Committing patch to Sanity CMS...');
  const patch = client.patch(post._id).set({ body });
  const updated = await patch.commit();
  console.log('🎉 Sanity post updated successfully! ID:', updated._id);
}

main().catch(console.error);
