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
});
