#!/usr/bin/env node
/**
 * Drift gate: docs registry (docs/src/data/registry.ts) must describe exactly
 * the same component tags as the generated MCP catalog. Run after build
 * (catalog.json is generated). Exit 1 on any drift, listing both directions.
 */
import { readFileSync } from 'node:fs';

const catalog = JSON.parse(
  readFileSync('packages/mcp-server/src/catalog/catalog.json', 'utf8'),
);
const catalogTags = new Set(catalog.components.map((c) => c.tag));

const registrySrc = readFileSync('docs/src/data/registry.ts', 'utf8');
const registryTags = new Set(
  [...registrySrc.matchAll(/tag:\s*'((?:cg|ai|bias)-[a-z0-9-]+)'/g)].map((m) => m[1]),
);

const undocumented = [...catalogTags].filter((t) => !registryTags.has(t)).sort();
const stale = [...registryTags].filter((t) => !catalogTags.has(t)).sort();

for (const t of stale) console.error(`STALE:        ${t} in docs registry but not in catalog`);
for (const t of undocumented) console.error(`UNDOCUMENTED: ${t} in catalog but missing from docs registry`);

if (stale.length || undocumented.length) {
  console.error(`\nDrift: ${stale.length} stale, ${undocumented.length} undocumented. Fix docs/src/data/registry.ts.`);
  process.exit(1);
}
console.log(`OK: docs registry and catalog agree on ${catalogTags.size} component tags.`);
