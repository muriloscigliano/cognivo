/**
 * Dark Mode Tests — verify all components use dark-first fallback values.
 *
 * The rule: every CSS fallback value must be readable on a #09090B dark background.
 * This means text fallbacks should be light (#FAFAFA range), surface fallbacks dark (#18181B range).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const COMP_DIR = join(__dirname, '..', 'components');

// Light-only values that should NOT appear as fallbacks (they're invisible on dark)
const LIGHT_ONLY_TEXT = ['#09090b', '#0a0a0a', '#171717', '#18181b', '#111827', '#212529', '#0f172a', '#1e293b'];
const LIGHT_ONLY_SURFACE = ['#ffffff', '#f4f4f5', '#fafafa', '#f9fafb', '#f8f9fa', '#f3f4f6', '#f1f5f9'];
const LIGHT_ONLY_BORDER = ['#d4d4d8', '#e4e4e7', '#e5e5e5', '#e5e7eb', '#e2e8f0', '#dee2e6', '#d1d5db', '#cbd5e1'];

function getComponentFiles(): { name: string; content: string }[] {
  const dirs = readdirSync(COMP_DIR).filter(d => d.startsWith('cg-'));
  return dirs.map(dir => {
    const fp = join(COMP_DIR, dir, `${dir}.ts`);
    if (!existsSync(fp)) return null;
    return { name: dir, content: readFileSync(fp, 'utf8') };
  }).filter(Boolean) as { name: string; content: string }[];
}

function extractFallbacks(content: string): { token: string; fallback: string }[] {
  const matches: { token: string; fallback: string }[] = [];
  const re = /var\((--cg-[a-zA-Z0-9_-]+),\s*([^)]+)\)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    matches.push({ token: m[1]!, fallback: m[2]!.trim().toLowerCase() });
  }
  return matches;
}

describe('Dark-first fallbacks', () => {
  const files = getComponentFiles();

  it('found component files to test', () => {
    expect(files.length).toBeGreaterThan(30);
  });

  for (const file of files) {
    describe(file.name, () => {
      const fallbacks = extractFallbacks(file.content);

      it('has no light-only text fallbacks (dark text invisible on dark bg)', () => {
        const bad = fallbacks.filter(f => {
          // Skip tokens that are SUPPOSED to be dark (text on accent, etc.)
          if (f.token.includes('action-primary-text')) return false;
          if (f.token.includes('accent-text') || f.token.includes('on-accent')) return false;
          // Check if fallback is a light-only text color being used as text
          if (f.token.includes('text') || f.token.includes('color') && !f.token.includes('background') && !f.token.includes('border') && !f.token.includes('surface')) {
            return LIGHT_ONLY_TEXT.includes(f.fallback);
          }
          return false;
        });
        if (bad.length > 0) {
          const details = bad.map(b => `  ${b.token}: ${b.fallback}`).join('\n');
          expect(bad.length, `Found light-only text fallbacks:\n${details}`).toBe(0);
        }
      });

      it('has no white surface fallbacks (invisible on dark)', () => {
        const bad = fallbacks.filter(f => {
          if (f.token.includes('background') || f.token.includes('surface')) {
            return f.fallback === '#ffffff';
          }
          return false;
        });
        if (bad.length > 0) {
          const details = bad.map(b => `  ${b.token}: ${b.fallback}`).join('\n');
          expect(bad.length, `Found white surface fallbacks:\n${details}`).toBe(0);
        }
      });
    });
  }
});

describe('No standalone hardcoded values', () => {
  const files = getComponentFiles();

  for (const file of files) {
    it(`${file.name} has no standalone hex colors outside var()`, () => {
      // Find hex colors not inside var() fallbacks
      const lines = file.content.split('\n');
      const bad: string[] = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]!;
        // Skip comments
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        // Skip lines that have var() — the hex is a fallback
        if (line.includes('var(--cg-')) continue;
        // Check for standalone hex
        const hexMatch = line.match(/#[0-9a-fA-F]{3,8}/);
        if (hexMatch) {
          bad.push(`Line ${i + 1}: ${line.trim()}`);
        }
      }
      expect(bad.length, `Standalone hex:\n${bad.join('\n')}`).toBe(0);
    });
  }
});

describe('All var() have fallbacks', () => {
  const files = getComponentFiles();

  for (const file of files) {
    it(`${file.name} has no var() without fallback`, () => {
      const noFallback = file.content.match(/var\(--cg-[a-zA-Z0-9_-]+\)(?![,\s])/g) || [];
      expect(noFallback.length, `var() without fallback:\n${noFallback.join('\n')}`).toBe(0);
    });
  }
});
