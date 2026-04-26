import fs from 'fs';
import path from 'path';

const BLOG_DIR = './content/blog';
const BASE_URL = 'https://whoisalfaz.me';

function getMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getMdxFiles(filePath, fileList);
    } else if (file.endsWith('.mdx')) {
      // Get slug from filename (assuming filename matches slug or is the slug)
      // If the folder name is the slug (e.g. 30-days/day-1.mdx -> day-1), handle it.
      // For now, simplicity: if it's in a subfolder, we might need a better mapper.
      // But usually slugs are just the leaf name minus extension.
      fileList.push(file.replace('.mdx', ''));
    }
  });
  return fileList;
}

async function generateUrlList() {
  try {
    const urls = [
      `${BASE_URL}/`,
      `${BASE_URL}/blog`,
      `${BASE_URL}/portfolio`,
      `${BASE_URL}/services`,
      `${BASE_URL}/contact`,
      `${BASE_URL}/audit`,
      `${BASE_URL}/labs`,
      `${BASE_URL}/privacy-policy`,
      `${BASE_URL}/terms`
    ];

    const slugs = getMdxFiles(BLOG_DIR);
    slugs.forEach(slug => {
      urls.push(`${BASE_URL}/blog/${slug}`);
    });

    console.log(urls.join('\n'));
  } catch (err) {
    console.error('Generation failed:', err);
  }
}

generateUrlList();
