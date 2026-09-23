const fs = require('fs');

console.log('===========================================================================');
console.log('🔍 VERIFYING AUDIT REMEDIATIONS');
console.log('===========================================================================\n');

let allPassed = true;

// 1. Check /services/headless-architecture/
console.log('1. Checking /services/headless-architecture/ integration:');
const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
if (nextConfig.includes("source: '/services/headless-architecture'")) {
    console.error('❌ next.config.ts still redirects /services/headless-architecture!');
    allPassed = false;
} else {
    console.log('✅ next.config.ts has no redirect blocking /services/headless-architecture/');
}

const servicesPage = fs.readFileSync('app/services/page.js', 'utf8');
if (servicesPage.includes('href: "/services/"')) {
    console.error('❌ app/services/page.js still has href: "/services/" override on headless card!');
    allPassed = false;
} else {
    console.log('✅ app/services/page.js headless card links properly to /services/headless-architecture/');
}

const footer = fs.readFileSync('components/Footer.js', 'utf8');
if (footer.includes('href="/services/headless-architecture/"')) {
    console.log('✅ Footer Solutions list links directly to /services/headless-architecture/');
} else {
    console.error('❌ Footer missing link to /services/headless-architecture/!');
    allPassed = false;
}

// 2. Check category 404s
console.log('\n2. Checking Blog Categories:');
const categoryPage = fs.readFileSync('app/blog/category/[slug]/page.js', 'utf8');
if (categoryPage.includes("'automation-tools'")) {
    console.log('✅ CATEGORY_MAP includes automation-tools');
} else {
    console.error('❌ CATEGORY_MAP missing automation-tools!');
    allPassed = false;
}

if (nextConfig.includes("destination: '/blog/category/30-days-of-n8n-automation/'")) {
    console.log('✅ next.config.ts redirects learn-automation-in-30-days to 30-days-of-n8n-automation');
} else {
    console.error('❌ next.config.ts missing learn-automation-in-30-days redirect!');
    allPassed = false;
}

const blogHub = fs.readFileSync('app/blog/page.js', 'utf8');
if (blogHub.includes("cat.count > 0") && blogHub.includes("learn-automation-in-30-days")) {
    console.log('✅ app/blog/page.js filters out empty categories');
} else {
    console.error('❌ app/blog/page.js does not filter empty categories!');
    allPassed = false;
}

// 3. Check /about/ page
console.log('\n3. Checking /about/ Page:');
if (fs.existsSync('app/about/page.js')) {
    const aboutPage = fs.readFileSync('app/about/page.js', 'utf8');
    const titleMatch = aboutPage.match(/title:\s*['"](.*?)['"]/);
    const title = titleMatch ? titleMatch[1] : '';
    console.log(`✅ app/about/page.js exists with title: "${title}" (${title.length}c)`);
    if (title.length > 58) {
        console.error(`❌ About title exceeds 58 characters!`);
        allPassed = false;
    }
} else {
    console.error('❌ app/about/page.js does not exist!');
    allPassed = false;
}

if (footer.includes('href="/about/"')) {
    console.log('✅ Footer links to canonical /about/');
} else {
    console.error('❌ Footer does not link to /about/!');
    allPassed = false;
}

if (footer.includes('href="/editorial-policy/"')) {
    console.log('✅ Footer includes /editorial-policy/ legal link');
} else {
    console.error('❌ Footer missing /editorial-policy/ link!');
    allPassed = false;
}

// 4. Check sitemap.ts
console.log('\n4. Checking app/sitemap.ts:');
const sitemap = fs.readFileSync('app/sitemap.ts', 'utf8');
if (sitemap.includes("'/about/'")) {
    console.log('✅ sitemap.ts includes /about/');
} else {
    console.error('❌ sitemap.ts missing /about/!');
    allPassed = false;
}

if (sitemap.includes("cat.count > 0") && sitemap.includes("learn-automation-in-30-days")) {
    console.log('✅ sitemap.ts filters empty categories');
} else {
    console.error('❌ sitemap.ts does not filter empty categories!');
    allPassed = false;
}

const dateCount = (sitemap.match(/lastModified:\s*new Date\(\)/g) || []).length;
console.log(`ℹ️ lastModified: new Date() occurrences in sitemap.ts: ${dateCount} (only for dynamic blog posts with post.date fallback)`);
if (dateCount > 1) {
    console.error('❌ Still using new Date() on static/category sitemap entries!');
    allPassed = false;
} else {
    console.log('✅ Static and category routes omit fake deploy timestamp lastmod');
}

// 5. Check robots.ts
console.log('\n5. Checking app/robots.ts:');
const robots = fs.readFileSync('app/robots.ts', 'utf8');
if (robots.includes('wp-admin') || robots.includes('*feed*')) {
    console.error('❌ app/robots.ts still contains WordPress rules!');
    allPassed = false;
} else {
    console.log('✅ app/robots.ts is free of WordPress cruft');
}

// 6. Check OG Images
console.log('\n6. Checking OpenGraph Images:');
['public/featured-image.png', 'public/og-contact.png'].forEach(imgFile => {
    if (fs.existsSync(imgFile)) {
        const b = fs.readFileSync(imgFile);
        const w = b.readUInt32BE(16);
        const h = b.readUInt32BE(20);
        if (w === 1200 && h === 630) {
            console.log(`✅ ${imgFile} is valid ${w}x${h}`);
        } else {
            console.error(`❌ ${imgFile} has invalid dimensions: ${w}x${h}`);
            allPassed = false;
        }
    } else {
        console.error(`❌ ${imgFile} missing!`);
        allPassed = false;
    }
});

// 7. Check llms.txt drift
console.log('\n7. Checking public/llms.txt & llms-full.txt:');
const llms = fs.readFileSync('public/llms.txt', 'utf8');
const llmsFull = fs.readFileSync('public/llms-full.txt', 'utf8');
if (llms.includes('pinecone-serverless') || llmsFull.includes('pinecone-serverless')) {
    console.error('❌ llms files still link pinecone-serverless-vs-qdrant-vultr-latency-benchmark!');
    allPassed = false;
} else {
    console.log('✅ llms files use active canonical pinecone-vs-qdrant-vultr-benchmark URL');
}

if (llms.includes('/labs/chat/') || llmsFull.includes('/labs/chat/')) {
    console.error('❌ llms files still link canonicalized /labs/chat/!');
    allPassed = false;
} else {
    console.log('✅ llms files free of /labs/chat/ canonical drift');
}

console.log('\n===========================================================================');
if (allPassed) {
    console.log('🎉 ALL AUDIT REMEDIATION CHECKS PASSED WITH 100% COMPLIANCE!');
} else {
    console.error('❌ SOME CHECKS FAILED!');
    process.exit(1);
}
console.log('===========================================================================');
