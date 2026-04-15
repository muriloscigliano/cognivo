#!/usr/bin/env node
import { readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { resolve } from 'node:path';

const BUDGETS = [
  { name: '@cognivo/components',    file: 'packages/components/dist/index.js',     maxKbGz: 280 },
  { name: '@cognivo/gen-ui',        file: 'packages/gen-ui/dist/index.js',         maxKbGz: 32  },
  { name: '@cognivo/core',          file: 'packages/core/dist/index.js',           maxKbGz: 14  },
  { name: '@cognivo/adapter-react', file: 'packages/adapter-react/dist/index.js',  maxKbGz: 8   },
  { name: '@cognivo/adapter-vue',   file: 'packages/adapter-vue/dist/index.js',    maxKbGz: 10  },
];

let failed = 0;
const rows = [];

for (const { name, file, maxKbGz } of BUDGETS) {
  const path = resolve(process.cwd(), file);
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
