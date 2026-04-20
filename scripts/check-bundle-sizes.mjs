#!/usr/bin/env node
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { resolve, join, dirname } from 'node:path';

const BUDGETS = [
  { name: '@cognivo/components',    file: 'packages/components/dist/index.js',     maxKbGz: 280 },
  { name: '@cognivo/gen-ui',        file: 'packages/gen-ui/dist/index.js',         maxKbGz: 32  },
  { name: '@cognivo/core',          file: 'packages/core/dist/index.js',           maxKbGz: 14  },
  { name: '@cognivo/adapter-react', file: 'packages/adapter-react/dist/index.js',  maxKbGz: 8   },
  { name: '@cognivo/adapter-vue',   file: 'packages/adapter-vue/dist/index.js',    maxKbGz: 10  },
  // design-advisor bias category chunks (hashed filenames, matched by prefix)
  { name: 'design-advisor · biases-cognitive',       dir: 'packages/design-advisor/dist', prefix: 'biases-cognitive-',       maxKbGz: 920 },
  { name: 'design-advisor · biases-decision-making', dir: 'packages/design-advisor/dist', prefix: 'biases-decision-making-', maxKbGz: 580 },
  { name: 'design-advisor · biases-memory',          dir: 'packages/design-advisor/dist', prefix: 'biases-memory-',          maxKbGz: 560 },
  { name: 'design-advisor · biases-social',          dir: 'packages/design-advisor/dist', prefix: 'biases-social-',          maxKbGz: 540 },
  { name: 'design-advisor · biases-perception',      dir: 'packages/design-advisor/dist', prefix: 'biases-perception-',      maxKbGz: 20  },
  { name: 'design-advisor · atlas-library',          dir: 'packages/design-advisor/dist', prefix: 'atlas-library-',          maxKbGz: 20  },
  { name: 'design-advisor · atlas-registry',         dir: 'packages/design-advisor/dist', prefix: 'atlas-registry-',         maxKbGz: 12  },
  { name: 'design-advisor · bias-registry',          dir: 'packages/design-advisor/dist', prefix: 'bias-registry-',          maxKbGz: 8   },
  { name: 'design-advisor · index',                  file: 'packages/design-advisor/dist/index.js',                          maxKbGz: 6   },
];

let failed = 0;
const rows = [];

function resolveEntry(entry) {
  if (entry.file) return resolve(process.cwd(), entry.file);
  const dir = resolve(process.cwd(), entry.dir);
  const match = readdirSync(dir).find((f) => f.startsWith(entry.prefix) && f.endsWith('.js'));
  return match ? join(dir, match) : null;
}

for (const entry of BUDGETS) {
  const { name, maxKbGz } = entry;
  const path = resolveEntry(entry);
  if (!path) {
    rows.push([name, 'MISSING', `${maxKbGz} KB`, '❌']);
    failed++;
    continue;
  }
  try {
    statSync(path);
  } catch {
    rows.push([name, 'MISSING', `${maxKbGz} KB`, '❌']);
    failed++;
    continue;
  }
  const buf = readFileSync(path);
  const gzKb = gzipSync(buf).length / 1024;
  const status = gzKb <= maxKbGz ? '✓' : '❌';
  if (gzKb > maxKbGz) failed++;
  rows.push([name, `${gzKb.toFixed(1)} KB`, `${maxKbGz} KB`, status]);
}

const colw = [
  Math.max(...rows.map(r => r[0].length), 7),
  Math.max(...rows.map(r => r[1].length), 7),
  Math.max(...rows.map(r => r[2].length), 6),
  2,
];

const pad = (s, n) => s + ' '.repeat(n - s.length);
console.log(`${pad('Package', colw[0])}  ${pad('Size gz', colw[1])}  ${pad('Budget', colw[2])}  Status`);
console.log('-'.repeat(colw[0] + colw[1] + colw[2] + 12));
for (const r of rows) {
  console.log(`${pad(r[0], colw[0])}  ${pad(r[1], colw[1])}  ${pad(r[2], colw[2])}  ${r[3]}`);
}

if (failed > 0) {
  console.error(`\n${failed} package(s) over budget`);
  process.exit(1);
}
console.log('\nAll packages within budget ✓');
