import sharp from 'sharp';
import { readdirSync, statSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, parse } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');

const PNG_SOURCES = [
  'favicon-32.png',
  'ai-tools-assessment-logo.png',
  'apple-touch-icon.png',
];

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });

for (const file of PNG_SOURCES) {
  const srcPath = join(ROOT, file);
  if (!existsSync(srcPath)) {
    console.warn(`Skipping ${file}: not found`);
    continue;
  }

  const name = parse(file).name;

  sharp(srcPath)
    .webp({ quality: 85 })
    .toFile(join(DIST, `${name}.webp`))
    .then(() => console.log(`Created ${name}.webp`));

  sharp(srcPath)
    .avif({ quality: 70 })
    .toFile(join(DIST, `${name}.avif`))
    .then(() => console.log(`Created ${name}.avif`));

  copyFileSync(srcPath, join(DIST, file));
  console.log(`Copied ${file} (fallback)`);
}

console.log('Done.');
