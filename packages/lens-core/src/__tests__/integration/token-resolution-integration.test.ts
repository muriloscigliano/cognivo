import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { scan } from '../../observer/scan';
import { createSceneQuery } from '../../helpers/scene-query';

// happy-dom serializes computed colors back as `rgb(R, G, B)` for hex inputs,
// which is the form the runtime normalizer expects. These tests verify the
// full path: DOM → scan → tokenUsage → scene.tokenViolations() / contrast().

describe('token resolution end-to-end via scan()', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('populates tokenUsage on a node with inline color', () => {
    document.body.innerHTML = '<div style="color: #71717a"></div>';
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);
    const usage = graph.root.tokenUsage;
    const colorEntry = usage.find((u) => u.property === 'color');
    expect(colorEntry).toBeDefined();
    expect(colorEntry!.tier).toBe(1);
    expect(colorEntry!.candidates).toContain('--cg-gray-500');
  });

  it('flags off-grid colors as tier 0', () => {
    document.body.innerHTML = '<div style="color: #123456"></div>';
    const graph = scan(document.body.firstElementChild as Element);
    const colorEntry = graph.root.tokenUsage.find((u) => u.property === 'color');
    expect(colorEntry?.tier).toBe(0);
    expect(colorEntry?.candidates).toEqual([]);
  });

  it('captures token usage on multiple elements independently', () => {
    document.body.innerHTML = `
      <div style="color: #000">a</div>
      <div style="color: #fff">b</div>
    `;
    const root = document.body;
    const graph = scan(root);
    const colors = graph.nodes
      .filter((n) => n.tag === 'div')
      .map((n) => n.tokenUsage.find((u) => u.property === 'color')?.rawValue);
    expect(colors).toContain('rgb(0, 0, 0)');
    expect(colors).toContain('rgb(255, 255, 255)');
  });

  it('does not surface tokenUsage entries for inherit / unset', () => {
    document.body.innerHTML = '<div style="color: inherit"></div>';
    const graph = scan(document.body.firstElementChild as Element);
    expect(graph.root.tokenUsage.find((u) => u.property === 'color')).toBeUndefined();
  });
});

describe('scene.tokenViolations()', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns tier-1 entries for elements consuming primitive palette colors', () => {
    document.body.innerHTML = `
      <div style="color: #71717a">tier-1 gray</div>
      <span style="color: #123456">off-grid</span>
    `;
    const graph = scan(document.body);
    const q = createSceneQuery(graph);
    const tier1 = q.tokenViolations({ tier: 1 });
    expect(tier1.length).toBeGreaterThanOrEqual(1);
    expect(tier1.some((v) => v.usage.candidates.includes('--cg-gray-500'))).toBe(true);
  });

  it('returns tier-0 entries for off-grid colors', () => {
    document.body.innerHTML = '<div style="color: #abcdef">off</div>';
    const graph = scan(document.body);
    const q = createSceneQuery(graph);
    const offGrid = q.tokenViolations({ tier: 0 });
    expect(offGrid.length).toBeGreaterThanOrEqual(1);
    expect(offGrid[0]!.usage.tier).toBe(0);
  });

  it('respects the exclude prefix list', () => {
    document.body.innerHTML = '<div style="color: #71717a; padding-top: 8px;">x</div>';
    const graph = scan(document.body);
    const q = createSceneQuery(graph);
    const tier1 = q.tokenViolations({ tier: 1, exclude: ['padding'] });
    // The padding-top tier-1 (matches --cg-spacing-8) must be excluded;
    // the color tier-1 must remain.
    expect(tier1.some((v) => v.usage.property.startsWith('padding'))).toBe(false);
    expect(tier1.some((v) => v.usage.property === 'color')).toBe(true);
  });

  it('returns empty when nothing matches the requested tier', () => {
    // happy-dom defaults paint many resolved values that incidentally match
    // tier-1 primitives (rgb(0,0,0) → --cg-gray-black, 0px → --cg-spacing-0
    // if it exists). What we really want to test is that asking for a tier
    // with no offenders returns []. Tier 3 is component-scoped — bare HTML
    // elements never match — so it's reliably empty.
    document.body.innerHTML = '<div>plain</div>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);
    expect(q.tokenViolations({ tier: 3 })).toEqual([]);
  });
});

describe('scene.contrast() over a real ancestor chain', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('computes contrast using the nearest ancestor with a non-transparent background', () => {
    document.body.innerHTML = `
      <div style="background-color: #fff">
        <span style="color: #000">text</span>
      </div>
    `;
    const graph = scan(document.body);
    const q = createSceneQuery(graph);
    const span = graph.nodes.find((n) => n.tag === 'span')!;
    const result = q.contrast(span, { against: 'background', wcag: 'AA' });
    expect(result.ratio).toBe(21);
    expect(result.passes).toBe(true);
  });

  it('walks past transparent ancestors to find an opaque background', () => {
    document.body.innerHTML = `
      <div style="background-color: #fff">
        <div style="background-color: transparent">
          <span style="color: #000">text</span>
        </div>
      </div>
    `;
    const graph = scan(document.body);
    const q = createSceneQuery(graph);
    const span = graph.nodes.find((n) => n.tag === 'span')!;
    const result = q.contrast(span, { against: 'background', wcag: 'AA' });
    expect(result.ratio).toBe(21);
  });

  it('flags low-contrast text as not passing', () => {
    document.body.innerHTML = `
      <div style="background-color: #fff">
        <span style="color: #ccc">text</span>
      </div>
    `;
    const graph = scan(document.body);
    const q = createSceneQuery(graph);
    const span = graph.nodes.find((n) => n.tag === 'span')!;
    const result = q.contrast(span, { against: 'background', wcag: 'AA' });
    expect(result.passes).toBe(false);
  });

  it('returns sane values when no background is set anywhere (defaults to white)', () => {
    document.body.innerHTML = '<span style="color: #000">text</span>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);
    const result = q.contrast(graph.root, { against: 'background', wcag: 'AA' });
    expect(result.ratio).toBe(21);
    expect(result.passes).toBe(true);
  });
});

describe('token resolution — performance microbenchmark', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('scans a 1000-node tree in well under the per-scan budget', () => {
    // Spec §7.1 sets evaluate() at 50ms p95 on a 5k-node page; scan()
    // should be a fraction of that. We use 1000 nodes here because
    // happy-dom is slower per-node than a real browser, so this gives a
    // conservative ceiling on real-world perf without requiring jsdom.
    const sb: string[] = [];
    for (let i = 0; i < 1000; i++) {
      // Mix tier-1 hits, off-grid, and untokenized to exercise both code paths.
      const color = i % 3 === 0 ? '#71717a' : i % 3 === 1 ? '#abcdef' : 'inherit';
      sb.push(`<div style="color: ${color}; padding-top: 8px;">x</div>`);
    }
    document.body.innerHTML = sb.join('');

    const runs = 10;
    const samples: number[] = [];
    for (let i = 0; i < runs; i++) {
      const t0 = performance.now();
      const graph = scan(document.body);
      // Force token-resolution to actually run on every node.
      const total = graph.nodes.reduce((acc, n) => acc + n.tokenUsage.length, 0);
      expect(total).toBeGreaterThan(0);
      samples.push(performance.now() - t0);
    }
    samples.sort((a, b) => a - b);
    const p95 = samples[Math.floor(samples.length * 0.95)] ?? samples[samples.length - 1]!;
    // Generous 250ms ceiling — happy-dom is slow at getComputedStyle. Real
    // browsers will be ~10x faster. The point of the assertion is to catch a
    // catastrophic regression (e.g. an O(N²) bug), not to enforce production
    // perf in the test environment.
    expect(p95).toBeLessThan(250);
  });
});
