import { describe, it, expect } from 'vitest';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import * as adapter from '../index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentsDir = resolve(__dirname, '../../../components/src/components');

const kebabToPascal = (kebab: string) =>
  kebab.split('-').map((s) => s[0]!.toUpperCase() + s.slice(1)).join('');

const coreTags = readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && (d.name.startsWith('cg-') || d.name.startsWith('ai-')))
  .map((d) => d.name);

const wrapperNames = new Set(
  Object.keys(adapter).filter(
    (n) => /^[A-Z]/.test(n) && !n.endsWith('Props') && n !== 'CgGenerativeUi',
  ),
);

describe('React adapter drift guard', () => {
  it('every cg-/ai- core component has a React wrapper', () => {
    const missing = coreTags
      .map(kebabToPascal)
      .filter((name) => !wrapperNames.has(name));
    expect(missing, `Missing React wrappers: ${missing.join(', ')}`).toEqual([]);
  });

  it('wrapper count meets or exceeds core component count', () => {
    expect(wrapperNames.size).toBeGreaterThanOrEqual(coreTags.length);
  });
});
