import { describe, it, expect, vi, beforeEach } from 'vitest';
import '../components/cg-lens-toolbar.js';
import type { CgLensToolbar } from '../components/cg-lens-toolbar.js';
import type { Finding, LensScore } from '@cognivo/lens-core';

function makeFinding(severity: Finding['severity'], i = 0): Finding {
  return {
    id: `f${i}`,
    ruleId: 'test/rule',
    severity,
    confidence: 90,
    targetNodeId: 'n0',
    category: 'system-health',
    message: 'msg',
    why: 'why',
    citations: [],
    detectedAt: '2026-04-29T00:00:00.000Z',
  };
}

function makeScore(composite = 73): LensScore {
  return {
    composite,
    subScores: {
      'cognitive-clarity': { name: 'cognitive-clarity', score: 80, deductions: [] },
      'persuasive-integrity': { name: 'persuasive-integrity', score: 90, deductions: [] },
      accessibility: { name: 'accessibility', score: 50, deductions: [] },
      'system-health': { name: 'system-health', score: 70, deductions: [] },
    },
    formulaVersion: 'v2026.04',
    computedAt: '2026-04-29T00:00:00.000Z',
    engineVersion: '0.1.0',
  };
}

async function mount(setup: (el: CgLensToolbar) => void): Promise<CgLensToolbar> {
  const el = document.createElement('cg-lens-toolbar') as CgLensToolbar;
  setup(el);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('<cg-lens-toolbar>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the composite score from the LensScore prop', async () => {
    const el = await mount((t) => {
      t.score = makeScore(87.4);
      t.findings = [];
    });
    const value = el.shadowRoot!.querySelector('.score .value');
    expect(value?.textContent).toBe('87');
  });

  it('shows "—" when score is null (initial state)', async () => {
    const el = await mount((t) => {
      t.score = null;
      t.findings = [];
    });
    const value = el.shadowRoot!.querySelector('.score .value');
    expect(value?.textContent).toBe('—');
  });

  it('renders one chip per non-zero severity', async () => {
    const el = await mount((t) => {
      t.findings = [
        makeFinding('blocker', 0),
        makeFinding('blocker', 1),
        makeFinding('strong', 2),
      ];
    });
    const chips = el.shadowRoot!.querySelectorAll('.chip:not(.chip-clean)');
    expect(chips.length).toBe(2); // blocker + strong
  });

  it('shows the clean state when there are no findings', async () => {
    const el = await mount((t) => {
      t.findings = [];
    });
    expect(el.shadowRoot!.querySelector('.chip-clean')).not.toBeNull();
  });

  it('shows the last scan duration', async () => {
    const el = await mount((t) => {
      t.lastScanMs = 12.345;
    });
    const time = el.shadowRoot!.querySelector('.time');
    expect(time?.textContent).toMatch(/12\.3ms/);
  });

  it('emits cg-lens-toolbar:rescan when the rescan button is clicked', async () => {
    const el = await mount(() => {});
    const onRescan = vi.fn();
    el.addEventListener('cg-lens-toolbar:rescan', onRescan);
    const btn = el.shadowRoot!.querySelector(
      'button[aria-label="Re-scan"]'
    ) as HTMLButtonElement;
    btn.click();
    expect(onRescan).toHaveBeenCalledTimes(1);
  });

  it('disables the rescan button when scanInProgress is true', async () => {
    const el = await mount((t) => {
      t.scanInProgress = true;
    });
    const btn = el.shadowRoot!.querySelector(
      'button[aria-label="Re-scan"]'
    ) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('emits cg-lens-toolbar:open-drawer on the list button', async () => {
    const el = await mount(() => {});
    const onOpen = vi.fn();
    el.addEventListener('cg-lens-toolbar:open-drawer', onOpen);
    (
      el.shadowRoot!.querySelector('button[aria-label="Open findings"]') as HTMLButtonElement
    ).click();
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('emits cg-lens-toolbar:dismiss on the close button', async () => {
    const el = await mount(() => {});
    const onDismiss = vi.fn();
    el.addEventListener('cg-lens-toolbar:dismiss', onDismiss);
    (
      el.shadowRoot!.querySelector('button[aria-label="Dismiss lens"]') as HTMLButtonElement
    ).click();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('region has an accessible name (aria-label)', async () => {
    const el = await mount(() => {});
    const region = el.shadowRoot!.querySelector('[role="region"]');
    expect(region?.getAttribute('aria-label')).toBe('Lens audit toolbar');
  });

  it('all icon buttons have aria-labels (no name-less buttons)', async () => {
    const el = await mount(() => {});
    const buttons = el.shadowRoot!.querySelectorAll('button');
    for (const btn of buttons) {
      expect(btn.getAttribute('aria-label')).toBeTruthy();
    }
  });
});
