/**
 * Copy hand-authored static CSS assets into dist/.
 * dist/ is gitignored and rebuilt from scratch, so anything shipped from it
 * must be regenerated (or copied) by the build — this is the copy step.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const STATIC_ASSETS = [
  ['css/motion.css', 'dist/motion.css'],
];

fs.mkdirSync(path.join(PKG_ROOT, 'dist'), { recursive: true });

for (const [from, to] of STATIC_ASSETS) {
  fs.copyFileSync(path.join(PKG_ROOT, from), path.join(PKG_ROOT, to));
  console.log(`[copy-static] ${from} → ${to}`);
}
