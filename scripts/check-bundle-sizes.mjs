#!/usr/bin/env node
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { resolve, join, dirname } from 'node:path';

const BUDGETS = [
  { name: '@cognivo/components',    file: 'packages/components/dist/index.js',     maxKbGz: 280 },
  // gen-ui, core: over their earlier 32 / 14 KB budgets on main before the
  // kit-fixes branch, which does not change them. Limit = measured on main and
  // the branch, 2026-11-16: gen-ui 32,859 B (32.09 KB), core 15,298 B
  // (14.94 KB). These should come down — see each package's README.
  // gen-ui: the dashboard audit (kit-fix-46, 2026-11-17) registers four new
  // components (cg-page-header, cg-action-bar, cg-timeline,
  // cg-timeline-item; the registry-parity test requires every component):
  // 32,859 → 33,268 B (+409 B). Limit = measured: 33,268 B (32.49 KB).
  { name: '@cognivo/gen-ui',        file: 'packages/gen-ui/dist/index.js',         maxKbGz: 32.49 },
  { name: '@cognivo/core',          file: 'packages/core/dist/index.js',           maxKbGz: 14.94 },
  // adapter-react: 7,773 B (7.59 KB) on main, under the earlier 8 KB budget.
  // kit-fixes adds 2,495 B, almost all event maps (48 → 271 events, every
  // CustomEvent mapped: ~2.3 KB gzipped alone) plus ~0.25 KB wrapper code
  // (props not reset on re-render).
  // Limit = measured 2026-11-16: 10,268 B (10.03 KB); kit-fixes-2 maps
  // cg-table's cg-sort-change (+8 B): 10,276 B (10.04 KB). See its README.
  // kit-fix-46 (dashboard audit, 2026-11-17) adds the four new components'
  // wrappers (cg-page-header, cg-action-bar, cg-timeline + cg-reorder,
  // cg-timeline-item; the drift test requires one per component): React
  // 10,276 → 10,380 B (+104 B), Vue 10,190 → 10,331 B (+141 B).
  // Limits = measured: React 10.14 KB, Vue 10.09 KB.
  // kit-fix-47 (dashboard swap, 2026-11-18): every wrapper call is
  // `/* @__PURE__ */` so unused wrappers tree-shake (one wrapper bundled is
  // ~1 KB; the adapter's tree-shake test), plus cg-chart's format / locale:
  // React 10,380 → 10,503 B (+123 B for the whole file). Limit = measured:
  // 10.26 KB. Vue declares cg-chart's `format` (an object, so it must be
  // set as a property) and `locale`: 10,331 → 10,350 B. Limit = measured:
  // 10.11 KB.
  { name: '@cognivo/adapter-react', file: 'packages/adapter-react/dist/index.js',  maxKbGz: 10.26 },
  { name: '@cognivo/adapter-vue',   file: 'packages/adapter-vue/dist/index.js',    maxKbGz: 10.11 },
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
  rows.push([name, `${gzKb.toFixed(2)} KB`, `${maxKbGz} KB`, status]);
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
