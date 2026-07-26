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

function portableTextToMarkdown(body) {
  if (!body) return '';
  if (typeof body === 'string') return body;
  if (!Array.isArray(body)) return '';

  return body.map(block => {
    if (!block) return '';

    // Handle Code Blocks
    if (block._type === 'code' || block.style === 'code') {
      const lang = block.language || block.lang || '';
      const codeText = block.code || (block.children ? block.children.map(c => c.text).join('') : '');
      return `\`\`\`${lang}\n${codeText}\n\`\`\`\n\n`;
    }

    // Handle Standard Block
    if (block._type === 'block') {
      let markDefsMap = {};
      if (Array.isArray(block.markDefs)) {
        block.markDefs.forEach(def => {
          if (def._key) markDefsMap[def._key] = def;
        });
      }

      let inlineText = '';
      if (Array.isArray(block.children)) {
        inlineText = block.children.map(child => {
          let text = child.text || '';
          if (Array.isArray(child.marks)) {
            child.marks.forEach(markKey => {
              if (markKey === 'bold') {
                text = `**${text}**`;
              } else if (markKey === 'italic') {
                text = `*${text}*`;
              } else if (markKey === 'code') {
                text = `\`${text}\``;
              } else if (markDefsMap[markKey]) {
                const def = markDefsMap[markKey];
                if (def._type === 'link' && def.href) {
                  text = `[${text}](${def.href})`;
                }
              }
            });
          }
          return text;
        }).join('');
      }

      const style = block.style || 'normal';
      if (style === 'h1') return `# ${inlineText}\n\n`;
      if (style === 'h2') return `## ${inlineText}\n\n`;
      if (style === 'h3') return `### ${inlineText}\n\n`;
      if (style === 'h4') return `#### ${inlineText}\n\n`;
      if (style === 'blockquote') return `> ${inlineText}\n\n`;
      if (block.listItem === 'bullet') return `* ${inlineText}\n`;
      if (block.listItem === 'number') return `1. ${inlineText}\n`;

      return `${inlineText}\n\n`;
    }

    return '';
  }).join('');
}

async function testConverter() {
  const posts = await client.fetch(`*[_type == "post"] { title, slug, body }`);
  console.log(`Auditing ${posts.length} total published posts in Sanity...`);

  let missingCount = 0;

  posts.forEach((p, idx) => {
    const markdown = portableTextToMarkdown(p.body);
    const len = markdown.length;
    if (len === 0) {
      missingCount++;
      console.error(`❌ [EMPTY BODY]: Post #${idx + 1} (${p.slug?.current}) has 0 bytes rendered!`);
    } else {
      console.log(`✅ Post #${idx + 1} (${p.slug?.current}): ${len} chars of converted markdown`);
    }
  });

  console.log(`\nResults: ${posts.length - missingCount}/${posts.length} posts render valid markdown content (${missingCount} empty).`);
}

testConverter();
