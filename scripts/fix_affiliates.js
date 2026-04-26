const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dir = path.join(process.cwd(), 'content/blog/30-days-of-n8n-automation');

// Precise mapping of which stacks were ACTUALLY used in each architectural breakdown
const map = {
    1: ['n8n', 'vultr'],
    2: ['n8n', 'vultr', 'brevo'],
    3: ['n8n', 'vultr', 'brevo', 'databox'],
    4: ['n8n', 'vultr', 'brevo'],
    5: ['n8n', 'vultr', 'pinecone'],
    6: ['n8n', 'vultr', 'brevo'],
    7: ['n8n', 'vultr', 'brevo', 'apollo'],
    8: ['n8n', 'vultr', 'brevo', 'apollo']
};

Object.keys(map).forEach(day => {
    const filePath = path.join(dir, `day-${day}.mdx`);
    if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(raw);
        parsed.data.affiliates = map[day];
        fs.writeFileSync(filePath, matter.stringify(parsed.content, parsed.data), 'utf8');
        console.log(`Fixed day-${day}.mdx with -> ${map[day].join(', ')}`);
    } else {
        console.log(`Could not find day-${day}.mdx`);
    }
});

console.log('Matrix Aligned');
