const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\405637ef-39a5-48a2-8637-cb7a83c0babc';
const destDir = path.resolve(__dirname, '../tmp_images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Find files in srcDir matching our generated pattern
const files = fs.readdirSync(srcDir);
const targets = {
  featured: files.find(f => f.startsWith('pinecone_rag_featured_') && f.endsWith('.png')),
  body1: files.find(f => f.startsWith('pinecone_rag_body1_') && f.endsWith('.png')),
  body2: files.find(f => f.startsWith('pinecone_rag_body2_') && f.endsWith('.png')),
};

for (const [key, filename] of Object.entries(targets)) {
  if (filename) {
    const srcPath = path.join(srcDir, filename);
    const destPath = path.join(destDir, `${key}.png`);
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied ${filename} to ${destPath}`);
  } else {
    console.error(`❌ Failed to find image matching key: ${key}`);
  }
}
