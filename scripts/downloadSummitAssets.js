const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../public/images/manychat-summit');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const fileIds = [
  { id: '1ZWYMyC8jsxxLGhPhgSK2YfKoK09JYBUB', name: 'summit-promo-portrait.png' }
];

async function downloadFile(fileId, destPath) {
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 303) {
        https.get(res.headers.location, (redirectRes) => {
          const fileStream = fs.createWriteStream(destPath);
          redirectRes.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`✅ Downloaded: ${destPath}`);
            resolve();
          });
        }).on('error', reject);
      } else {
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${destPath}`);
          resolve();
        });
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const item of fileIds) {
    const dest = path.join(targetDir, item.name);
    try {
      await downloadFile(item.id, dest);
    } catch (e) {
      console.warn(`Failed to download ${item.name}:`, e.message);
    }
  }
}

run();
