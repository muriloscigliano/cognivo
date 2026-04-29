import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../components/cg-lens-overlay.js';
import '../components/cg-lens-pin.js';
import type { CgLensOverlay } from '../components/cg-lens-overlay.js';
import type { CgLensPin } from '../components/cg-lens-pin.js';
import type { Finding, SceneGraph, SceneNode } from '@cognivo/lens-core';
import { pageRectToViewportRect } from '../internal/viewport-rect.js';

const ZERO_RECT = { x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 };

function makeNode(id: string, rect: Partial<typeof ZERO_RECT> = {}): SceneNode {
  return {
    id,
    tag: 'div',
    attributes: {},
    rect: { ...ZERO_RECT, ...rect },
    computedStyle: {},
    tokenUsage: [],
    children: [],
    visible: true,
  };
}

function makeFinding(id: string, severity: Finding['severity'], targetId: string): Finding {
  return {
    id,
    ruleId: 'test/rule',
    severity,
    confidence: 90,
    targetNodeId: targetId,
    category: 'system-health',
    message: 'msg',
    why: 'why',
    citations: [],
    detectedAt: '2026-04-29T00:00:00.000Z',
  };
}

function makeGraph(nodes: SceneNode[]): SceneGraph {
  return {
    nodes,
    root: nodes[0]!,
    snapshottedAt: '2026-04-29T00:00:00.000Z',
    viewport: { width: 1024, height: 768 },
  };
}

describe('viewport-rect helper', () => {
  it('subtracts scroll from page coords', () => {
    const result = pageRectToViewportRect(
      { x: 0, y: 0, width: 100, height: 50, top: 200, left: 300, right: 400, bottom: 250 },
      50,
      150
    );
    expect(result).toEqual({ top: 50, left: 250, width: 100, height: 50 });
  });

  it('passes through dimensions unchanged', () => {
    const r = pageRectToViewportRect(
      { x: 0, y: 0, width: 42, height: 17, top: 0, left: 0, right: 42, bottom: 17 },
      10,
      10
    );
    expect(r.width).toBe(42);
    expect(r.height).toBe(17);
  });
});

describe('<cg-lens-pin>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('emits cg-lens-pin:select on click', async () => {
    const pin = document.createElement('cg-lens-pin') as CgLensPin;
    pin.findingId = 'f1';
    document.body.appendChild(pin);
    await pin.updateComplete;
    const onSelect = vi.fn();
    pin.addEventListener('cg-lens-pin:select', onSelect);
    pin.shadowRoot!.querySelector('button')!.click();
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect((onSelect.mock.calls[0]![0] as CustomEvent).detail).toEqual({ findingId: 'f1' });
  });

  it('emits select on Enter key', async () => {
    const pin = document.createElement('cg-lens-pin') as CgLensPin;
    pin.findingId = 'f2';
    document.body.appendChild(pin);
    await pin.updateComplete;
    const onSelect = vi.fn();
    pin.addEventListener('cg-lens-pin:select', onSelect);
    const btn = pin.shadowRoot!.querySelector('button') as HTMLElement;
    btn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('emits select on Space key', async () => {
    const pin = document.createElement('cg-lens-pin') as CgLensPin;
    document.body.appendChild(pin);
    await pin.updateComplete;
    const onSelect = vi.fn();
    pin.addEventListener('cg-lens-pin:select', onSelect);
    pin.shadowRoot!
      .querySelector('button')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('renders a count badge when groupCount > 1', async () => {
    const pin = document.createElement('cg-lens-pin') as CgLensPin;
    pin.groupCount = 3;
    document.body.appendChild(pin);
    await pin.updateComplete;
    const badge = pin.shadowRoot!.querySelector('.badge');
    expect(badge?.textContent?.trim()).toBe('3');
  });

  it('omits the badge when groupCount is 1', async () => {
    const pin = document.createElement('cg-lens-pin') as CgLensPin;
    pin.groupCount = 1;
    document.body.appendChild(pin);
    await pin.updateComplete;
    expect(pin.shadowRoot!.querySelector('.badge')).toBeNull();
  });

  it('aria-label includes severity, message, and group count', async () => {
    const pin = document.createElement('cg-lens-pin') as CgLensPin;
    pin.severity = 'blocker';
    pin.message = 'Hello';
    pin.groupCount = 3;
    document.body.appendChild(pin);
    await pin.updateComplete;
    const label = pin.shadowRoot!.querySelector('button')!.getAttribute('aria-label');
    expect(label).toContain('Blocker');
    expect(label).toContain('Hello');
    expect(label).toContain('+2 more');
  });

  it('reflects selected state via aria-pressed', async () => {
    const pin = document.createElement('cg-lens-pin') as CgLensPin;
    pin.selected = true;
    document.body.appendChild(pin);
    await pin.updateComplete;
    expect(pin.shadowRoot!.querySelector('button')!.getAttribute('aria-pressed')).toBe('true');
  });
});

describe('<cg-lens-overlay>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  async function mountOverlay(setup: (o: CgLensOverlay) => void): Promise<CgLensOverlay> {
    const overlay = document.createElement('cg-lens-overlay') as CgLensOverlay;
    document.body.appendChild(overlay);
    setup(overlay);
    await overlay.updateComplete;
    // Lit may schedule a follow-up update for reactive prop changes after
    // the first render; one extra await catches them.
    await overlay.updateComplete;
    return overlay;
  }

  it('renders one pin per finding when findings target distinct nodes', async () => {
    const overlay = await mountOverlay((o) => {
      o.graph = makeGraph([
        makeNode('a', { top: 10, left: 10, width: 100, height: 50 }),
        makeNode('b', { top: 100, left: 100, width: 80, height: 40 }),
      ]);
      o.findings = [makeFinding('f1', 'blocker', 'a'), makeFinding('f2', 'consider', 'b')];
    });
    expect(overlay.shadowRoot!.querySelectorAll('cg-lens-pin').length).toBe(2);
  });

  it('groups findings on the same node into a single pin with count', async () => {
    const overlay = await mountOverlay((o) => {
      o.graph = makeGraph([makeNode('a')]);
      o.findings = [
        makeFinding('f1', 'blocker', 'a'),
        makeFinding('f2', 'consider', 'a'),
        makeFinding('f3', 'consider', 'a'),
      ];
    });
    const pins = overlay.shadowRoot!.querySelectorAll('cg-lens-pin');
    expect(pins.length).toBe(1);
    expect((pins[0] as CgLensPin).groupCount).toBe(3);
  });

  it('the grouped pin uses the highest-severity finding as representative', async () => {
    const overlay = await mountOverlay((o) => {
      o.graph = makeGraph([makeNode('a')]);
      o.findings = [makeFinding('low', 'consider', 'a'), makeFinding('high', 'blocker', 'a')];
    });
    const pin = overlay.shadowRoot!.querySelector('cg-lens-pin') as CgLensPin;
    expect(pin.findingId).toBe('high');
    expect(pin.severity).toBe('blocker');
  });

  it('does not render when graph is null', async () => {
    const overlay = await mountOverlay((o) => {
      o.findings = [makeFinding('f1', 'blocker', 'a')];
      o.graph = null;
    });
    expect(overlay.shadowRoot!.querySelector('cg-lens-pin')).toBeNull();
  });

  it('skips findings whose target node is missing from the graph', async () => {
    const overlay = await mountOverlay((o) => {
      o.graph = makeGraph([makeNode('a')]);
      o.findings = [makeFinding('orphan', 'blocker', 'unknown-node')];
    });
    expect(overlay.shadowRoot!.querySelector('cg-lens-pin')).toBeNull();
  });

  it('marks the selected pin via the selected prop', async () => {
    const overlay = await mountOverlay((o) => {
      o.graph = makeGraph([makeNode('a'), makeNode('b')]);
      o.findings = [makeFinding('f1', 'blocker', 'a'), makeFinding('f2', 'strong', 'b')];
      o.selectedFindingId = 'f2';
    });
    const pins = Array.from(
      overlay.shadowRoot!.querySelectorAll('cg-lens-pin')
    ) as CgLensPin[];
    const selected = pins.find((p) => p.findingId === 'f2')!;
    const other = pins.find((p) => p.findingId === 'f1')!;
    expect(selected.selected).toBe(true);
    expect(other.selected).toBe(false);
  });
});
