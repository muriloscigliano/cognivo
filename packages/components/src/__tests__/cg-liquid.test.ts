import { describe, it, expect, afterEach } from 'vitest';
import { CgLiquid } from '../components/cg-liquid/cg-liquid.js';
import { CgLiquidItem } from '../components/cg-liquid-item/cg-liquid-item.js';

if (!customElements.get('cg-liquid')) {
  customElements.define('cg-liquid', CgLiquid);
}
if (!customElements.get('cg-liquid-item')) {
  customElements.define('cg-liquid-item', CgLiquidItem);
}

describe('cg-liquid', () => {
  let group: CgLiquid;

  async function create(itemCount = 0): Promise<CgLiquid> {
    group = document.createElement('cg-liquid') as CgLiquid;
    for (let i = 0; i < itemCount; i++) {
      group.appendChild(document.createElement('cg-liquid-item'));
    }
    document.body.appendChild(group);
    await group.updateComplete;
    await Promise.resolve();
    await group.updateComplete;
    return group;
  }

  afterEach(() => group?.remove());

  it('renders a shadow root with an SVG silhouette layer and a slot', async () => {
    await create();
    expect(group.shadowRoot!.querySelector('svg.goo')).not.toBeNull();
    expect(group.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('applies the goo filter: blur feeds an alpha-contrast color matrix', async () => {
    await create();
    const blurEl = group.shadowRoot!.querySelector('feGaussianBlur')!;
    expect(blurEl.getAttribute('stdDeviation')).toBe('6');
    const matrix = group.shadowRoot!.querySelector('feColorMatrix')!;
    expect(matrix.getAttribute('values')).toContain('18');
  });

  it('blur and contrast props flow into the filter primitives', async () => {
    await create();
    group.blurRadius = 10;
    group.contrast = 24;
    await group.updateComplete;
    expect(group.shadowRoot!.querySelector('feGaussianBlur')!.getAttribute('stdDeviation')).toBe('10');
    expect(group.shadowRoot!.querySelector('feColorMatrix')!.getAttribute('values')).toContain('24');
  });

  it('hides the silhouette layer when no items are registered', async () => {
    await create(0);
    const svg = group.shadowRoot!.querySelector('svg.goo')!;
    expect(svg.hasAttribute('hidden')).toBe(true);
  });

  it('renders one blob per registered item', async () => {
    await create(2);
    const blobs = group.shadowRoot!.querySelectorAll('rect.blob');
    expect(blobs.length).toBe(2);
    const svg = group.shadowRoot!.querySelector('svg.goo')!;
    expect(svg.hasAttribute('hidden')).toBe(false);
  });

  it('removes the blob when an item disconnects', async () => {
    await create(2);
    group.querySelector('cg-liquid-item')!.remove();
    await group.updateComplete;
    expect(group.shadowRoot!.querySelectorAll('rect.blob').length).toBe(1);
  });

  it('morph items get a morphing blob', async () => {
    await create(1);
    const blob = group.shadowRoot!.querySelector('rect.blob')!;
    expect(blob.classList.contains('morph')).toBe(true);
  });
});

describe('cg-liquid-item', () => {
  let group: CgLiquid;
  let item: CgLiquidItem;

  afterEach(() => {
    group?.remove();
    item?.remove();
  });

  async function createInGroup(): Promise<void> {
    group = document.createElement('cg-liquid') as CgLiquid;
    item = document.createElement('cg-liquid-item') as CgLiquidItem;
    group.appendChild(item);
    document.body.appendChild(group);
    await group.updateComplete;
    await item.updateComplete;
  }

  it('defaults: effect=morph, transition=smooth, x/y 0, scale 1', async () => {
    await createInGroup();
    expect(item.effect).toBe('morph');
    expect(item.transition).toBe('smooth');
    expect(item.x).toBe(0);
    expect(item.y).toBe(0);
    expect(item.scale).toBe(1);
    expect(item.getAttribute('effect')).toBe('morph');
  });

  it('move effect applies a spring transition and transform', async () => {
    await createInGroup();
    item.effect = 'move';
    item.x = 40;
    item.y = -10;
    item.scale = 1.2;
    await item.updateComplete;
    expect(item.style.transform).toBe('translate(40px, -10px) scale(1.2)');
    expect(item.style.transition).toContain('linear(');
    expect(item.style.transition).toContain('transform');
  });

  it('transition presets produce different durations', async () => {
    await createInGroup();
    item.effect = 'move';
    item.transition = 'snappy';
    item.x = 10;
    await item.updateComplete;
    const snappy = item.style.transition;
    item.transition = 'bouncy';
    item.x = 20;
    await item.updateComplete;
    expect(item.style.transition).not.toBe(snappy);
  });

  it('does not throw without a cg-liquid ancestor', async () => {
    item = document.createElement('cg-liquid-item') as CgLiquidItem;
    expect(() => document.body.appendChild(item)).not.toThrow();
    await item.updateComplete;
    item.x = 5;
    await item.updateComplete;
  });

  it('unregisters from the group on disconnect', async () => {
    await createInGroup();
    expect(group.shadowRoot!.querySelectorAll('rect.blob').length).toBe(1);
    item.remove();
    await group.updateComplete;
    expect(group.shadowRoot!.querySelectorAll('rect.blob').length).toBe(0);
  });

  it('move suppresses the spring under prefers-reduced-motion', async () => {
    const { vi } = await import('vitest');
    const mm = vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList);
    try {
      await createInGroup();
      item.effect = 'move';
      item.x = 40;
      await item.updateComplete;
      expect(item.style.transition).toBe('none');
      expect(item.style.transform).toBe('translate(40px, 0px) scale(1)');
    } finally {
      mm.mockRestore();
    }
  });

  it('radius flows through to the blob rx', async () => {
    await createInGroup();
    item.radius = 14;
    await item.updateComplete;
    await group.updateComplete;
    const blob = group.shadowRoot!.querySelector('rect.blob')!;
    expect(blob.getAttribute('rx')).toBe('14');
  });
});
