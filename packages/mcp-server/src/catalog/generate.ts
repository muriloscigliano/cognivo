/**
 * Catalog generator — orchestrates all parsers and writes catalog.json.
 * Run via: node --import tsx src/scripts/build-catalog.ts
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseTokens } from './parsers/token-parser.js';
import { parseComponents } from './parsers/component-parser.js';
import { parseBiases } from './parsers/bias-parser.js';
import { parsePatterns } from './parsers/pattern-parser.js';
import type { CognivoCatalog } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function generateCatalog(rootDir: string): CognivoCatalog {
  const start = Date.now();

  // Parse all data sources
  const tokens = parseTokens(join(rootDir, 'packages/tokens'));
  const components = parseComponents(
    join(rootDir, 'packages/components/src/components'),
    join(rootDir, 'packages/components/src/index.ts'),
  );
  const { biases } = parseBiases(join(rootDir, 'packages/design-advisor/src/biases'));
  const patterns = parsePatterns();

  const elapsed = Date.now() - start;

  const catalog: CognivoCatalog = {
    components,
    tokens,
    biases,
    patterns,
    meta: {
      version: '0.1.0',
      generatedAt: new Date().toISOString(),
      generationTimeMs: elapsed,
      counts: {
        components: components.length,
        tokens: tokens.length,
        biases: biases.length,
        patterns: patterns.length,
      },
    },
  };

  return catalog;
}

export function writeCatalog(catalog: CognivoCatalog, outputPath: string): void {
  writeFileSync(outputPath, JSON.stringify(catalog, null, 2), 'utf-8');
}

export function getDefaultOutputPath(): string {
  return join(__dirname, 'catalog.json');
}
