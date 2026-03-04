const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'content', 'blog');
let modifiedCount = 0;

fs.readdirSync(dataDir).forEach(file => {
    if (file.endsWith('.mdx')) {
        const filePath = path.join(dataDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let titleMatch = content.match(/title:\s*['"](.*?)['"]/);
        let title = titleMatch ? titleMatch[1] : 'Blog Post Image';

        // Regex for matching markdown images with empty alt: `![](/path/to/image.png)`
        const emptyAltRegex = /!\[\]\((.*?)\)/g;

        if (emptyAltRegex.test(content)) {
            content = content.replace(emptyAltRegex, (match, imageUrl) => {
                // Create a generic alt text using the title or filename
                const filename = imageUrl.split('/').pop().split('.')[0].replace(/[-_]/g, ' ');
                return `![${title} - ${filename}](${imageUrl})`;
            });
            fs.writeFileSync(filePath, content, 'utf8');
            modifiedCount++;
            console.log(`Updated empty alt tags in ${file}`);
        }
    }
});

console.log(`Finished auditing and fixing MDX alt texts. Modified ${modifiedCount} files.`);
