import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../components/cg-lens-drawer.js';
import '../components/cg-lens-finding-card.js';
import type { CgLensDrawer } from '../components/cg-lens-drawer.js';
import type { CgLensFindingCard } from '../components/cg-lens-finding-card.js';
import type { Finding } from '@cognivo/lens-core';

function makeFinding(
  id: string,
  severity: Finding['severity'],
  partial: Partial<Finding> = {}
): Finding {
  return {
    id,
    ruleId: 'test/rule',
    severity,
    confidence: 90,
    targetNodeId: 'n0',
    category: 'system-health',
    message: 'msg',
    why: 'why',
    citations: [],
    detectedAt: '2026-04-29T00:00:00.000Z',
    ...partial,
  };
}

async function mountDrawer(setup: (d: CgLensDrawer) => void): Promise<CgLensDrawer> {
  const el = document.createElement('cg-lens-drawer') as CgLensDrawer;
  document.body.appendChild(el);
  setup(el);
  await el.updateComplete;
  await el.updateComplete;
  return el;
}

async function mountCard(setup: (c: CgLensFindingCard) => void): Promise<CgLensFindingCard> {
  const el = document.createElement('cg-lens-finding-card') as CgLensFindingCard;
  document.body.appendChild(el);
  setup(el);
  await el.updateComplete;
  await el.updateComplete;
  return el;
}

describe('<cg-lens-finding-card>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the finding’s message, ruleId, and confidence', async () => {
    const card = await mountCard((c) => {
      c.finding = makeFinding('f1', 'blocker', {
        ruleId: 'core/a11y/img-without-alt',
        message: 'missing alt',
        confidence: 85,
      });
    });
    const root = card.shadowRoot!;
    expect(root.querySelector('.message')?.textContent).toBe('missing alt');
    expect(root.querySelector('.rid')?.textContent).toBe('core/a11y/img-without-alt');
    expect(root.querySelector('.confidence')?.textContent).toBe('85%');
  });

  it('renders nothing when finding is null', async () => {
    const card = await mountCard((c) => {
      c.finding = null;
    });
    expect(card.shadowRoot!.querySelector('.card')).toBeNull();
  });

  it('expands citations only when present', async () => {
    const cardA = await mountCard((c) => {
      c.finding = makeFinding('f1', 'blocker', { citations: [] });
    });
    expect(cardA.shadowRoot!.querySelector('.citations')).toBeNull();

    const cardB = await mountCard((c) => {
      c.finding = makeFinding('f2', 'blocker', { citations: ['wcag/2.1/SC1.1.1'] });
    });
    expect(cardB.shadowRoot!.querySelector('.citations')).not.toBeNull();
  });

  it('reflects the selected attribute', async () => {
    const card = await mountCard((c) => {
      c.finding = makeFinding('f1', 'blocker');
      c.selected = true;
    });
    expect(card.hasAttribute('selected')).toBe(true);
  });

  it('emits cg-lens-finding-card:copy on copy click', async () => {
    const card = await mountCard((c) => {
      c.finding = makeFinding('f1', 'strong', { message: 'hi' });
    });
    const onCopy = vi.fn();
    card.addEventListener('cg-lens-finding-card:copy', onCopy);
    const button = card.shadowRoot!.querySelector('.copy') as HTMLButtonElement;
    button.click();
    // copy is async (await navigator.clipboard.writeText, then dispatch).
    // Several microtasks deep — wait a macrotask to settle.
    await new Promise((r) => setTimeout(r, 0));
    expect(onCopy).toHaveBeenCalledTimes(1);
    const detail = (onCopy.mock.calls[0]![0] as CustomEvent).detail;
    expect(detail.findingId).toBe('f1');
    expect(detail.text).toContain('hi');
  });

  it('describes the fix in human-readable copy text', async () => {
    const card = await mountCard((c) => {
      c.finding = makeFinding('f1', 'strong', {
        fixHint: {
          kind: 'token-swap',
          property: 'color',
          from: '--cg-gray-500',
          to: '--cg-color-text-default',
          reason: 'Use semantic.',
        },
      });
    });
    const fixBody = card.shadowRoot!.querySelector('.fix-body');
    expect(fixBody?.textContent).toContain('Replace --cg-gray-500');
    expect(fixBody?.textContent).toContain('Use semantic');
  });
});

describe('<cg-lens-drawer>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('is hidden when open is false', async () => {
    const d = await mountDrawer((x) => {
      x.findings = [makeFinding('f1', 'blocker')];
      x.open = false;
    });
    expect(d.hasAttribute('open')).toBe(false);
  });

  it('shows findings when open', async () => {
    const d = await mountDrawer((x) => {
      x.findings = [makeFinding('f1', 'blocker'), makeFinding('f2', 'consider')];
      x.open = true;
    });
    expect(d.hasAttribute('open')).toBe(true);
    const cards = d.shadowRoot!.querySelectorAll('cg-lens-finding-card');
    expect(cards.length).toBe(2);
  });

  it('filters by severity when filter chips switch', async () => {
    const d = await mountDrawer((x) => {
      x.findings = [
        makeFinding('a', 'blocker'),
        makeFinding('b', 'strong'),
        makeFinding('c', 'consider'),
      ];
      x.open = true;
      x.filter = 'blocker';
    });
    expect(d.shadowRoot!.querySelectorAll('cg-lens-finding-card').length).toBe(1);
  });

  it('emits cg-lens-drawer:filter-change when a chip is clicked', async () => {
    const d = await mountDrawer((x) => {
      x.findings = [makeFinding('a', 'blocker')];
      x.open = true;
    });
    const onFilter = vi.fn();
    d.addEventListener('cg-lens-drawer:filter-change', onFilter);
    const chips = Array.from(d.shadowRoot!.querySelectorAll('.chip')) as HTMLButtonElement[];
    const blockerChip = chips.find((c) => c.textContent?.includes('Blocker'))!;
    blockerChip.click();
    expect(onFilter).toHaveBeenCalledTimes(1);
    expect((onFilter.mock.calls[0]![0] as CustomEvent).detail).toEqual({ filter: 'blocker' });
  });

  it('shows an empty state when filter matches nothing', async () => {
    const d = await mountDrawer((x) => {
      x.findings = [makeFinding('a', 'blocker')];
      x.open = true;
      x.filter = 'positive';
    });
    expect(d.shadowRoot!.querySelector('.empty')).not.toBeNull();
    expect(d.shadowRoot!.querySelectorAll('cg-lens-finding-card').length).toBe(0);
  });

  it('emits cg-lens-drawer:close when the close button is clicked', async () => {
    const d = await mountDrawer((x) => {
      x.open = true;
    });
    const onClose = vi.fn();
    d.addEventListener('cg-lens-drawer:close', onClose);
    (d.shadowRoot!.querySelector('.close') as HTMLButtonElement).click();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('emits close on Escape key when open', async () => {
    const d = await mountDrawer((x) => {
      x.open = true;
    });
    const onClose = vi.fn();
    d.addEventListener('cg-lens-drawer:close', onClose);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT emit close on Escape when closed', async () => {
    const d = await mountDrawer((x) => {
      x.open = false;
    });
    const onClose = vi.fn();
    d.addEventListener('cg-lens-drawer:close', onClose);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('sorts findings blocker-first then by confidence-desc', async () => {
    const d = await mountDrawer((x) => {
      x.findings = [
        makeFinding('mid-strong', 'strong', { confidence: 70 }),
        makeFinding('top-blocker', 'blocker', { confidence: 80 }),
        makeFinding('hi-strong', 'strong', { confidence: 95 }),
      ];
      x.open = true;
    });
    const cards = Array.from(d.shadowRoot!.querySelectorAll('cg-lens-finding-card')) as CgLensFindingCard[];
    expect(cards[0]!.finding!.id).toBe('top-blocker');
    expect(cards[1]!.finding!.id).toBe('hi-strong');
    expect(cards[2]!.finding!.id).toBe('mid-strong');
  });

  it('marks the selected card', async () => {
    const d = await mountDrawer((x) => {
      x.findings = [makeFinding('a', 'blocker'), makeFinding('b', 'strong')];
      x.open = true;
      x.selectedFindingId = 'b';
    });
    const cards = Array.from(d.shadowRoot!.querySelectorAll('cg-lens-finding-card')) as CgLensFindingCard[];
    const sel = cards.find((c) => c.finding?.id === 'b')!;
    const other = cards.find((c) => c.finding?.id === 'a')!;
    expect(sel.selected).toBe(true);
    expect(other.selected).toBe(false);
  });

  it('shows count of each severity in chip labels', async () => {
    const d = await mountDrawer((x) => {
      x.findings = [
        makeFinding('a', 'blocker'),
        makeFinding('b', 'blocker'),
        makeFinding('c', 'strong'),
      ];
      x.open = true;
    });
    const chips = Array.from(d.shadowRoot!.querySelectorAll('.chip')) as HTMLElement[];
    const blocker = chips.find((c) => (c.textContent ?? '').trim().startsWith('Blocker'))!;
    expect(blocker.textContent).toContain('2');
  });
});
