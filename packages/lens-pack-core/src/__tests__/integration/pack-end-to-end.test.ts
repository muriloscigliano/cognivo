import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { RuleEngine, scan } from '@cognivo/lens-core';
import corePack from '../../index.js';

describe('@cognivo/lens-pack-core end-to-end', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('registers all 20 rules', async () => {
    const engine = new RuleEngine();
    await engine.register(corePack);
    expect(engine.size()).toBe(20);
  });

  it('reports findings on a multi-violation page', async () => {
    document.body.innerHTML = `
      <main>
        <h1>Welcome</h1>
        <h3>Buried section</h3>
        <img src="cat.jpg">
        <button><svg></svg></button>
        <input type="email">
        <div tabindex="3">positive tabindex</div>
        <span id="dup">a</span><span id="dup">b</span>
        <button disabled tabindex="0">disabled-tabbable</button>
        <button aria-hidden="true">silent stop</button>
        <div role="navigation"></div>
        <dialog><p>body</p></dialog>
        <div style="transition: all 200ms ease;">animated</div>
      </main>
    `;
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);
    const engine = new RuleEngine();
    await engine.register(corePack);
    const findings = engine.evaluate(graph, 'unknown');

    const ruleIds = new Set(findings.map((f) => f.ruleId));
    const expected = [
      'core/a11y/img-without-alt',
      'core/a11y/button-without-name',
      'core/a11y/input-without-label',
      'core/a11y/positive-tabindex',
      'core/a11y/duplicate-id',
      'core/a11y/aria-hidden-focusable',
      'core/a11y/landmark-without-name',
      'core/a11y/dialog-without-name',
      'core/a11y/heading-skipped-level',
      'core/focus/disabled-with-tabindex',
      'core/system-health/transition-all',
    ];
    for (const id of expected) {
      expect(ruleIds, `missing finding for ${id}`).toContain(id);
    }
  });

  it('sorts findings blocker-first by severity', async () => {
    document.body.innerHTML = `
      <main>
        <img src="x.jpg">
        <h1>A</h1><h3>B</h3>
        <div role="navigation"></div>
      </main>
    `;
    const graph = scan(document.body.firstElementChild as Element);
    const engine = new RuleEngine();
    await engine.register(corePack);
    const findings = engine.evaluate(graph, 'unknown');

    const severityRank = (s: string) =>
      s === 'blocker' ? 0 : s === 'strong' ? 1 : s === 'consider' ? 2 : 3;
    for (let i = 1; i < findings.length; i++) {
      const prev = findings[i - 1]!;
      const cur = findings[i]!;
      expect(severityRank(cur.severity)).toBeGreaterThanOrEqual(severityRank(prev.severity));
    }
  });

  it('produces no findings on a clean, well-labeled page', async () => {
    document.body.innerHTML = `
      <main>
        <h1>Hello</h1>
        <h2>Sub</h2>
        <p>plain content with no images, no buttons, no inputs</p>
      </main>
    `;
    const graph = scan(document.body.firstElementChild as Element);
    const engine = new RuleEngine();
    await engine.register(corePack);
    const findings = engine.evaluate(graph, 'unknown');
    expect(findings).toHaveLength(0);
  });
});
