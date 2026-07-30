import sharp from 'sharp';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, parse } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');

const PNG_SOURCES = [
  'favicon-32.png',
  'ai-tools-assessment-logo.png',
  'apple-touch-icon.png',
];

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });

(async () => {
  try {
    const tasks = [];

    for (const file of PNG_SOURCES) {
      const srcPath = join(ROOT, file);
      if (!existsSync(srcPath)) {
        console.warn(`Skipping ${file}: not found`);
        continue;
      }

      const name = parse(file).name;

      tasks.push(
        sharp(srcPath)
          .webp({ quality: 85 })
          .toFile(join(DIST, `${name}.webp`))
          .then(() => console.log(`Created ${name}.webp`))
      );

      tasks.push(
        sharp(srcPath)
          .avif({ quality: 70 })
          .toFile(join(DIST, `${name}.avif`))
          .then(() => console.log(`Created ${name}.avif`))
      );

      copyFileSync(srcPath, join(DIST, file));
      console.log(`Copied ${file} (fallback)`);
    }

    await Promise.all(tasks);
    console.log('Done.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
