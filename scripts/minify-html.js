const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const root = path.resolve(__dirname, '..');
const outputRoot = path.join(root, 'dist');
const htmlFiles = [
  'index.html',
  'booking/index.html',
  'ai-services-playbook.html',
];

const options = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
};

async function main() {
  for (const relativePath of htmlFiles) {
    const inputPath = path.join(root, relativePath);
    const outputPath = path.join(outputRoot, relativePath);
    const html = fs.readFileSync(inputPath, 'utf8');
    const minified = await minify(html, options);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, minified);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
