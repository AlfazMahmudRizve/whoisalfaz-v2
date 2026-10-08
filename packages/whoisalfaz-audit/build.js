const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('⚡ Building whoisalfaz-audit dual ESM/CJS & TypeScript declarations...');

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Build ESM (dist/index.mjs)
console.log('📦 Compiling ESM (dist/index.mjs)...');
execSync('npx esbuild src/index.ts --bundle --format=esm --target=es2022 --outfile=dist/index.mjs', {
  cwd: __dirname,
  stdio: 'inherit'
});

// 2. Build CJS (dist/index.js)
console.log('📦 Compiling CJS (dist/index.js)...');
execSync('npx esbuild src/index.ts --bundle --format=cjs --target=es2022 --outfile=dist/index.js', {
  cwd: __dirname,
  stdio: 'inherit'
});

// 3. Emit TypeScript Declarations (dist/index.d.ts)
console.log('📦 Emitting typings (dist/index.d.ts)...');
execSync('npx tsc --project tsconfig.json', {
  cwd: __dirname,
  stdio: 'inherit'
});

console.log('✅ Build successful! All artifacts created in dist/');
