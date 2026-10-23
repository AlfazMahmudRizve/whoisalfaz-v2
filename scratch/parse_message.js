const fs = require('fs');
let raw = fs.readFileSync('scratch/auditor_message.txt', 'utf8');
if (raw.startsWith('"') && raw.endsWith('"')) {
  raw = JSON.parse(raw);
}
fs.writeFileSync('scratch/auditor_message_clean.md', raw);
console.log('Saved! Length:', raw.length);

