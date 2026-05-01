import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { RuleEngine, scan } from '@cognivo/lens-core';
import corePack from '@cognivo/lens-pack-core';
import ethicsPack from '../../index.js';

describe('@cognivo/lens-pack-ethics end-to-end', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('registers all 5 rules', async () => {
    const engine = new RuleEngine();
    await engine.register(ethicsPack);
    expect(engine.size()).toBe(5);
  });

  it('a multi-violation page surfaces every ethics rule id', async () => {
    document.body.innerHTML = `
      <main>
        <!-- preselected-optional-checkbox -->
        <form><label><input type="checkbox" checked> Subscribe to our newsletter</label></form>

        <!-- scarcity-claim -->
        <p>Only 2 left in stock — selling fast!</p>

        <!-- countdown-without-anchor -->
        <div>Sale ends in 02:14:33</div>

        <!-- asymmetric-action-buttons -->
        <div role="dialog">
          <button style="color: rgb(255, 255, 255); background: rgb(34, 197, 94)">Accept all</button>
          <button style="color: rgb(160, 160, 160)">Decline</button>
        </div>

        <!-- sponsored-without-label -->
        <article class="sponsored-card"><h3>Brand promotion</h3></article>
      </main>
    `;
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);
    const engine = new RuleEngine();
    await engine.register(ethicsPack);
    const ruleIds = new Set(engine.evaluate(graph, 'unknown').map((f) => f.ruleId));

    expect(ruleIds).toContain('ethics/dark-pattern/preselected-optional-checkbox');
    expect(ruleIds).toContain('ethics/dark-pattern/scarcity-claim');
    expect(ruleIds).toContain('ethics/dark-pattern/countdown-without-anchor');
    expect(ruleIds).toContain('ethics/dark-pattern/asymmetric-action-buttons');
    expect(ruleIds).toContain('ethics/transparency/sponsored-without-label');
  });

  it('co-registers cleanly with @cognivo/lens-pack-core (no rule-id collisions)', async () => {
    const engine = new RuleEngine();
    await engine.register(corePack);
    await engine.register(ethicsPack);
    // 20 core rules + 5 ethics rules = 25
    expect(engine.size()).toBe(25);
  });

  it('produces no findings on a clean page', async () => {
    document.body.innerHTML = `
      <main>
        <h1>Welcome</h1>
        <p>This page has no dark patterns.</p>
      </main>
    `;
    const graph = scan(document.body.firstElementChild as Element);
    const engine = new RuleEngine();
    await engine.register(ethicsPack);
    const findings = engine.evaluate(graph, 'unknown');
    expect(findings).toHaveLength(0);
  });
});
