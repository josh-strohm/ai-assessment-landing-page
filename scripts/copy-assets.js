const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outputRoot = path.join(root, 'dist');
const assets = [
  'favicon-32.png',
  'ai-tools-assessment-logo.png',
  'apple-touch-icon.png',
];

fs.mkdirSync(outputRoot, { recursive: true });
for (const asset of assets) {
  fs.copyFileSync(path.join(root, asset), path.join(outputRoot, asset));
}
