import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../index.js';
import type { CgLens } from '../cg-lens.js';

async function tick(): Promise<void> {
  // Wait two microtasks: one for connectedCallback's Promise.resolve(), one
  // for the engine.register() promise to flush. Add an await for Lit's update.
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

/**
 * Wait until the lens emits scan-complete (auto-scan path) or its findings
 * become non-empty. Auto-scan is fire-and-forget from connectedCallback;
 * `await tick()` isn't enough because corePack.register() resolves a chain
 * of dynamic imports.
 */
function waitForScan(lens: HTMLElement): Promise<void> {
  return new Promise<void>((resolve) => {
    const handler = (): void => {
      lens.removeEventListener('cg-lens:scan-complete', handler);
      resolve();
    };
    lens.addEventListener('cg-lens:scan-complete', handler);
  });
}

describe('<cg-lens> mount + scan', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('mounts and runs an initial scan against document.body', async () => {
    document.body.innerHTML = `
      <div id="audit"><img src="cat.jpg"><button></button></div>
      <cg-lens></cg-lens>
    `;
    const lens = document.querySelector('cg-lens') as CgLens;
    await waitForScan(lens);
    expect(lens.findings.length).toBeGreaterThan(0);
    expect(lens.score).not.toBeNull();
  });

  it('respects the target attribute', async () => {
    document.body.innerHTML = `
      <div id="ok"><p>plain</p></div>
      <div id="bad"><img src="x.jpg"></div>
      <cg-lens target="#ok"></cg-lens>
    `;
    const lens = document.querySelector('cg-lens') as CgLens;
    await waitForScan(lens);
    const ids = lens.findings.map((f) => f.ruleId);
    expect(ids.includes('core/a11y/img-without-alt')).toBe(false);
  });

  it('does not scan in paused mode until rescan() is called', async () => {
    document.body.innerHTML = `
      <div><img src="x.jpg"></div>
      <cg-lens paused></cg-lens>
    `;
    const lens = document.querySelector('cg-lens') as CgLens;
    await tick();
    await lens.updateComplete;
    expect(lens.findings.length).toBe(0);
    await lens.rescan();
    await lens.updateComplete;
    expect(lens.findings.length).toBeGreaterThan(0);
  });

  it('honors the disabled-rules attribute', async () => {
    document.body.innerHTML = `
      <div><img src="x.jpg"></div>
      <cg-lens disabled-rules="core/a11y/img-without-alt"></cg-lens>
    `;
    const lens = document.querySelector('cg-lens') as CgLens;
    await waitForScan(lens);
    const ids = lens.findings.map((f) => f.ruleId);
    expect(ids.includes('core/a11y/img-without-alt')).toBe(false);
  });

  it('does not flag its own UI as findings (filters cg-lens descendants)', async () => {
    document.body.innerHTML = '<cg-lens></cg-lens>';
    const lens = document.querySelector('cg-lens') as CgLens;
    await waitForScan(lens);
    expect(lens.findings.every((f) => !f.targetNodeId.startsWith('cg-lens'))).toBe(true);
  });

  it('emits cg-lens:scan-complete with findings + score + durationMs', async () => {
    document.body.innerHTML = `
      <div><img src="x.jpg"></div>
      <cg-lens paused></cg-lens>
    `;
    const lens = document.querySelector('cg-lens') as CgLens;
    const onComplete = vi.fn();
    lens.addEventListener('cg-lens:scan-complete', onComplete);
    await lens.rescan();
    expect(onComplete).toHaveBeenCalledTimes(1);
    const detail = onComplete.mock.calls[0]![0].detail;
    expect(Array.isArray(detail.findings)).toBe(true);
    expect(detail.score).toBeDefined();
    expect(typeof detail.durationMs).toBe('number');
  });

  it('rescan() returns undefined when called concurrently', async () => {
    document.body.innerHTML = '<cg-lens paused></cg-lens>';
    const lens = document.querySelector('cg-lens') as CgLens;
    const a = lens.rescan();
    const b = lens.rescan(); // concurrent — should bail
    const [ra, rb] = await Promise.all([a, b]);
    expect(ra).toBeDefined();
    expect(rb).toBeUndefined();
  });

  it('selectFinding(id) opens the drawer and emits cg-lens:finding-selected', async () => {
    document.body.innerHTML = `
      <div><img src="x.jpg"></div>
      <cg-lens></cg-lens>
    `;
    const lens = document.querySelector('cg-lens') as CgLens;
    await waitForScan(lens);
    const first = lens.findings[0]!;
    const onSelected = vi.fn();
    lens.addEventListener('cg-lens:finding-selected', onSelected);
    lens.selectFinding(first.id);
    expect(onSelected).toHaveBeenCalledTimes(1);
    expect(lens.selectedFindingId).toBe(first.id);
    expect(lens.drawerOpen).toBe(true);
  });

  it('dismiss() removes the element and emits cg-lens:dismiss', async () => {
    document.body.innerHTML = '<cg-lens paused></cg-lens>';
    const lens = document.querySelector('cg-lens') as CgLens;
    const onDismiss = vi.fn();
    lens.addEventListener('cg-lens:dismiss', onDismiss);
    lens.dismiss();
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(document.querySelector('cg-lens')).toBeNull();
  });

  it('surfaces an error when target selector matches no element', async () => {
    document.body.innerHTML = '<cg-lens target="#nope" paused></cg-lens>';
    const lens = document.querySelector('cg-lens') as CgLens;
    const result = await lens.rescan();
    expect(result).toBeUndefined();
    await lens.updateComplete;
    const status = lens.shadowRoot?.querySelector('[data-cg-lens-status]');
    expect(status?.textContent).toMatch(/Error.*not found/);
  });
});

describe('<cg-lens> multi-pack support', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('default packs = lens-pack-core only (one pack)', async () => {
    document.body.innerHTML = `
      <div><img src="x.jpg"></div>
      <cg-lens></cg-lens>
    `;
    const lens = document.querySelector('cg-lens') as CgLens;
    await waitForScan(lens);
    // Core pack flags img-without-alt; ethics pack rule ids should not appear.
    const ids = new Set(lens.findings.map((f) => f.ruleId));
    expect(Array.from(ids).some((id) => id.startsWith('core/'))).toBe(true);
    expect(Array.from(ids).some((id) => id.startsWith('ethics/'))).toBe(false);
  });

  it('custom packs property registers additional packs', async () => {
    const corePack = (await import('@cognivo/lens-pack-core')).default;
    const ethicsPack = (await import('@cognivo/lens-pack-ethics')).default;
    document.body.innerHTML = `
      <div>
        <p>Only 3 left in stock!</p>
        <img src="x.jpg">
      </div>
      <cg-lens paused></cg-lens>
    `;
    const lens = document.querySelector('cg-lens') as CgLens;
    lens.packs = [corePack, ethicsPack];
    await lens.rescan();
    const ids = new Set(lens.findings.map((f) => f.ruleId));
    expect(Array.from(ids).some((id) => id.startsWith('core/'))).toBe(true);
    expect(Array.from(ids).some((id) => id.startsWith('ethics/'))).toBe(true);
  });
});

describe('ScanController integration', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns a populated LensScore with composite + sub-scores', async () => {
    const { ScanController } = await import('../internal/scan-controller.js');
    document.body.innerHTML = '<div><img src="x.jpg"><button></button></div>';
    const ctrl = new ScanController();
    const result = await ctrl.run(document.body);
    expect(result.score.composite).toBeGreaterThanOrEqual(0);
    expect(result.score.composite).toBeLessThanOrEqual(100);
    expect(result.score.subScores).toBeDefined();
    expect(typeof result.durationMs).toBe('number');
  });

  it('disabledRules suppress matching findings', async () => {
    const { ScanController } = await import('../internal/scan-controller.js');
    document.body.innerHTML = '<div><img src="x.jpg"></div>';
    const ctrl = new ScanController({ disabledRules: ['core/a11y/img-without-alt'] });
    const result = await ctrl.run(document.body);
    expect(result.findings.every((f) => f.ruleId !== 'core/a11y/img-without-alt')).toBe(true);
  });
});
