import { describe, it, expect, afterEach } from 'vitest';
import { BiasAnchoring } from '../components/bias-anchoring/bias-anchoring.js';

if (!customElements.get('bias-anchoring')) {
  customElements.define('bias-anchoring', BiasAnchoring);
}

describe('bias-anchoring', () => {
  let el: BiasAnchoring;

  async function create(props?: Partial<BiasAnchoring>): Promise<BiasAnchoring> {
    el = document.createElement('bias-anchoring') as BiasAnchoring;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.wrap')).not.toBeNull();
  });

  it('exposes biasId = anchoring-bias', () => {
    expect(BiasAnchoring.biasId).toBe('anchoring-bias');
  });

  it('renders anchor and current values', async () => {
    await create({ anchor: '$199', current: '$99' });
    const wrap = el.shadowRoot!.querySelector('.wrap')!;
    expect(wrap.textContent).toContain('$199');
    expect(wrap.textContent).toContain('$99');
  });

  it('wrap has role="group" and descriptive aria-label', async () => {
    await create({ anchor: '$199', current: '$99' });
    const wrap = el.shadowRoot!.querySelector('.wrap')!;
    expect(wrap.getAttribute('role')).toBe('group');
    expect(wrap.getAttribute('aria-label')).toBe('Original $199, now $99');
  });

  it('aria-label includes label when provided', async () => {
    await create({ anchor: '$199', current: '$99', label: 'Save 50%' });
    const wrap = el.shadowRoot!.querySelector('.wrap')!;
    expect(wrap.getAttribute('aria-label')).toBe('Original $199, now $99. Save 50%');
  });

  it('default orientation is horizontal', async () => {
    await create();
    expect(el.getAttribute('orientation')).toBe('horizontal');
  });

  it('reflects orientation="vertical"', async () => {
    await create({ orientation: 'vertical' });
    expect(el.getAttribute('orientation')).toBe('vertical');
  });

  it('default variant is default', async () => {
    await create();
    expect(el.getAttribute('variant')).toBe('default');
  });

  it('reflects variant="emphasized"', async () => {
    await create({ variant: 'emphasized' });
    expect(el.getAttribute('variant')).toBe('emphasized');
  });

  it('anchor is strikethrough styled and marked aria-hidden', async () => {
    await create({ anchor: '$199', current: '$99' });
    const anchor = el.shadowRoot!.querySelector('.anchor')!;
    expect(anchor.getAttribute('aria-hidden')).toBe('true');
  });
});
