const fs = require('fs');
const path = require('path');

// Test if sitemap file or route exists
const sitemapPath = path.resolve(__dirname, '../app/sitemap.ts');
const sitemapJsPath = path.resolve(__dirname, '../app/sitemap.js');

console.log("Checking sitemap configuration...");
console.log("sitemap.ts exists:", fs.existsSync(sitemapPath));
console.log("sitemap.js exists:", fs.existsSync(sitemapJsPath));
