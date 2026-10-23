const fs = require('fs');

const posts = JSON.parse(fs.readFileSync('./data/existing_sanity_posts.json', 'utf8'));
const targets = [
  'manychat', 'n8n', 'screaming', 'dify', 'teal', 'jobscan', 
  'tapstitch', 'printful', 'qdrant', 'pinecone', 'apollo', 
  'lusha', 'aisdr', 'trainual', 'adcreative', 'brevo', 
  'turbotic', 'waterfall', 'whatconverts', 'databox'
];

const matches = [];
for (const post of posts) {
  const text = (post.slug + ' ' + post.title + ' ' + (post.description || '')).toLowerCase();
  for (const t of targets) {
    if (text.includes(t)) {
      matches.push({ slug: post.slug, title: post.title, match: t });
      break;
    }
  }
}
console.log(`Found ${matches.length} matching posts out of ${posts.length}`);
console.log(JSON.stringify(matches, null, 2));
