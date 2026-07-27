import { describe, expect, it } from 'vitest';
import { listComponents, getComponent } from '../commands/components.js';

describe('cognivo components', () => {
  it('lists all components with count', () => {
    const r = listComponents();
    expect(r.text).toContain('cg-button');
    expect(r.exitCode).toBe(0);
  });

  it('filters by category', () => {
    const all = listComponents().text.split('\n').length;
    const filtered = listComponents({ category: 'foundation' });
    expect(filtered.exitCode).toBe(0);
    expect(filtered.text.split('\n').length).toBeLessThan(all);
  });

  it('gets a single component with props', () => {
    const r = getComponent('cg-button');
    expect(r.exitCode).toBe(0);
    expect(r.text).toContain('cg-button');
  });

  it('exit 2 + suggestion on unknown tag', () => {
    const r = getComponent('cg-buttno');
    expect(r.exitCode).toBe(2);
    expect(r.text).toMatch(/did you mean|unknown/i);
  });

  describe('dense output', () => {
    it('getComponent dense: compact single-line-per-section form', () => {
      const r = getComponent('cg-button', { dense: true });
      expect(r.exitCode).toBe(0);
      expect(r.text).toContain('cg-button');
      // props rendered inline as name:type=default
      expect(r.text).toMatch(/cg-button props: \w+:[^\s=]+(=\S*)?( \w+:[^\s=]+(=\S*)?)*/);
    });

    it('getComponent dense: no markdown table pipes or headers', () => {
      const r = getComponent('cg-button', { dense: true });
      expect(r.text).not.toContain('|');
      expect(r.text).not.toContain('Props:');
      expect(r.text).not.toContain('—');
    });

    it('getComponent dense: < 60% the byte length of non-dense', () => {
      const dense = getComponent('cg-button', { dense: true });
      const full = getComponent('cg-button');
      expect(Buffer.byteLength(dense.text)).toBeLessThan(0.6 * Buffer.byteLength(full.text));
    });

    it('listComponents dense: one line per component, no header', () => {
      const dense = listComponents({ dense: true });
      const full = listComponents();
      expect(dense.exitCode).toBe(0);
      const lines = dense.text.split('\n');
      // no "N components:" header line — every line is `<tag> <category>`
      expect(dense.text).not.toMatch(/^\d+ components:/m);
      expect(lines.every((l) => /^[a-z][a-z0-9-]* (foundation|ai)$/.test(l))).toBe(true);
      expect(lines.length).toBe(full.text.split('\n').length - 1);
      expect(Buffer.byteLength(dense.text)).toBeLessThan(0.6 * Buffer.byteLength(full.text));
    });
  });
});
