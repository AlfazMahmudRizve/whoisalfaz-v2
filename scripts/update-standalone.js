const fs = require('fs');
const path = require('path');

const updates = {
  'outstanding-ideas-for-youtube-shorts.mdx': {
    seoTitle: 'YouTube Shorts Ideas for Tech Creators (2026)',
    newCategory: 'AI Lead Generation'
  },
  'outstanding-ideas-for-saas-mvps.mdx': {
    seoTitle: 'SaaS MVP Ideas: 10 Products You Can Build This Weekend',
    newCategory: 'Tool Comparisons'
  },
  'outstanding-ideas-for-b2b-lead-generation.mdx': {
    seoTitle: 'B2B Lead Generation Strategies That Actually Work (2026)',
    newCategory: 'AI Lead Generation'
  },
  'outstanding-ideas-for-b2b-lead-capture.mdx': {
    seoTitle: 'B2B Lead Capture: Landing Page Tactics & Form Optimization',
    newCategory: 'AI Lead Generation'
  }
};

const dir = path.join(__dirname, 'content/blog');

for (const [filename, data] of Object.entries(updates)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filename}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace seoTitle
  content = content.replace(/seoTitle:\s*".*?"/, `seoTitle: "${data.seoTitle}"`);
  
  // Replace categories
  // Currently they are like: categories: ["AI Content Systems"] or similar
  content = content.replace(/categories:\s*\[.*?\]/, `categories: ["${data.newCategory}"]`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filename}`);
}

// Now update the 30-day series category
const seriesDir = path.join(dir, '30-days-of-n8n-automation');
if (fs.existsSync(seriesDir)) {
  const files = fs.readdirSync(seriesDir).filter(f => f.endsWith('.mdx'));
  for (const file of files) {
    const filePath = path.join(seriesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace:
    // categories:
    //   - Learn Automation in 30 Days
    // with:
    // categories:
    //   - 30 Days of n8n & Automation
    
    content = content.replace(/categories:\s*\n\s*-\s*['"]?Learn Automation in 30 Days['"]?/, `categories:\n  - "30 Days of n8n & Automation"`);
    
    fs.writeFileSync(filePath, content);
  }
  console.log(`Updated 30-day series categories`);
}

// Update case studies categories as well if they exist
const caseStudyDir = path.join(dir, 'case-studies');
if (fs.existsSync(caseStudyDir)) {
  const files = fs.readdirSync(caseStudyDir).filter(f => f.endsWith('.mdx'));
  for (const file of files) {
    const filePath = path.join(caseStudyDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace category
    content = content.replace(/categories:\s*\n\s*-\s*['"]?Case Studies['"]?/, `categories:\n  - "Automation Case Studies"`);
    content = content.replace(/categories:\s*\[['"]?Case Studies['"]?\]/, `categories: ["Automation Case Studies"]`);
    
    fs.writeFileSync(filePath, content);
  }
}
