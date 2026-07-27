import { mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import { generateContext, runContext, MARKER_PREFIX } from '../commands/context.js';
import type { CognivoCatalog } from '@cognivo/mcp-server/catalog-types';

const require = createRequire(import.meta.url);
const catalog = require('@cognivo/mcp-server/catalog.json') as CognivoCatalog;

function mkdtemp(): string {
  return mkdtempSync(join(tmpdir(), 'cognivo-context-'));
}

describe('generateContext (pure)', () => {
  it('includes the marker header with the version', () => {
    const out = generateContext('codex', catalog, '1.2.3');
    expect(out).toContain(`${MARKER_PREFIX} v1.2.3 -->`);
  });

  it('includes a real component tag in the index', () => {
    for (const agent of ['claude', 'cursor', 'codex'] as const) {
      expect(generateContext(agent, catalog, '0.1.0')).toContain('cg-alert-dialog');
    }
  });

  it('includes the self-check questions and answers', () => {
    const out = generateContext('claude', catalog, '0.1.0');
    expect(out).toContain('Which component confirms a destructive action');
    expect(out).toContain('alertdialog');
    expect(out).toContain('Tier 1 palette');
    expect(out).toContain('cg-input');
  });

  it('includes the agent workflow and behavioral rules', () => {
    const out = generateContext('claude', catalog, '0.1.0');
    expect(out).toContain('cognivo components list');
    expect(out).toContain('cognivo components get');
    expect(out).toContain('cognivo tokens for');
    expect(out).toContain('cognivo audit');
  });
});

describe('cognivo context (file writing)', () => {
  it('writes all three agent files by default', () => {
    const dir = mkdtemp();
    const r = runContext({ agent: 'all', path: dir });
    expect(r.exitCode).toBe(0);
    for (const f of ['CLAUDE.md', '.cursorrules', 'AGENTS.md']) {
      expect(existsSync(join(dir, f)), f).toBe(true);
      const content = readFileSync(join(dir, f), 'utf8');
      expect(content).toContain(MARKER_PREFIX);
      expect(content).toContain('cg-alert-dialog');
      expect(content).toContain('Which component confirms a destructive action');
    }
  });

  it('writes only the requested agent file', () => {
    const dir = mkdtemp();
    const r = runContext({ agent: 'codex', path: dir });
    expect(r.exitCode).toBe(0);
    expect(existsSync(join(dir, 'AGENTS.md'))).toBe(true);
    expect(existsSync(join(dir, 'CLAUDE.md'))).toBe(false);
    expect(existsSync(join(dir, '.cursorrules'))).toBe(false);
  });

  it('skips an existing hand-written file without --force', () => {
    const dir = mkdtemp();
    writeFileSync(join(dir, 'AGENTS.md'), '# my hand-written agents file\n');
    const r = runContext({ agent: 'codex', path: dir });
    expect(r.exitCode).toBe(0);
    expect(r.text).toMatch(/skip/i);
    expect(readFileSync(join(dir, 'AGENTS.md'), 'utf8')).toBe('# my hand-written agents file\n');
  });

  it('overwrites a hand-written file with --force', () => {
    const dir = mkdtemp();
    writeFileSync(join(dir, 'AGENTS.md'), '# my hand-written agents file\n');
    const r = runContext({ agent: 'codex', path: dir, force: true });
    expect(r.exitCode).toBe(0);
    const content = readFileSync(join(dir, 'AGENTS.md'), 'utf8');
    expect(content).toContain(MARKER_PREFIX);
    expect(content).not.toContain('my hand-written agents file');
  });

  it('regenerates marker-bearing files in place without --force', () => {
    const dir = mkdtemp();
    runContext({ agent: 'codex', path: dir });
    const file = join(dir, 'AGENTS.md');
    writeFileSync(file, readFileSync(file, 'utf8') + '\nstale edit\n');
    const r = runContext({ agent: 'codex', path: dir });
    expect(r.exitCode).toBe(0);
    expect(r.text).toMatch(/regenerat|updat/i);
    expect(readFileSync(file, 'utf8')).not.toContain('stale edit');
  });

  it('rejects an unknown agent with exit 2', () => {
    const dir = mkdtemp();
    const r = runContext({ agent: 'emacs' as never, path: dir });
    expect(r.exitCode).toBe(2);
  });
});
