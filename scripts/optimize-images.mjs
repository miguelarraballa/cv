import sharp from 'sharp';
import { optimize } from 'svgo';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const LOGOS_DIR = 'public/logos';

// Display size: max-h-16 (64px) in a ~160px wide cell
const SIZE_1X = { width: 160, height: 64 };
const SIZE_2X = { width: 320, height: 128 };

async function convertPng(filePath) {
  const name = basename(filePath, '.png');
  const dir = filePath.replace(/\/[^/]+$/, '');

  await sharp(filePath)
    .resize(SIZE_1X.width, SIZE_1X.height, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(join(dir, `${name}.webp`));

  await sharp(filePath)
    .resize(SIZE_2X.width, SIZE_2X.height, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(join(dir, `${name}@2x.webp`));

  // Compress original PNG in place
  const compressed = await sharp(filePath)
    .resize(SIZE_2X.width, SIZE_2X.height, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  await writeFile(filePath, compressed);

  console.log(`  ✓ ${name}.png → .webp + @2x.webp + compressed`);
}

async function optimizeSvg(filePath) {
  const input = await readFile(filePath, 'utf8');
  const { data } = optimize(input, {
    path: filePath,
    plugins: ['preset-default'],
  });
  await writeFile(filePath, data, 'utf8');
  console.log(`  ✓ ${basename(filePath)} optimizado`);
}

async function run() {
  console.log('Optimizando imágenes…');
  const files = await readdir(LOGOS_DIR);

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const full = join(LOGOS_DIR, file);

    if (ext === '.png') await convertPng(full);
    else if (ext === '.svg') await optimizeSvg(full);
  }

  console.log('Listo.');
}

run().catch((e) => { console.error(e); process.exit(1); });
