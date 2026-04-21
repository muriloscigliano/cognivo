import { describe, it, expect, afterEach } from 'vitest';
import { BiasReciprocity } from '../components/bias-reciprocity/bias-reciprocity.js';

if (!customElements.get('bias-reciprocity')) {
  customElements.define('bias-reciprocity', BiasReciprocity);
}

describe('bias-reciprocity', () => {
  let el: BiasReciprocity;

  async function create(props?: Partial<BiasReciprocity>): Promise<BiasReciprocity> {
    el = document.createElement('bias-reciprocity') as BiasReciprocity;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create({ gift: 'Free shipping' });
    expect(el.shadowRoot!.querySelector('.wrap')).not.toBeNull();
  });

  it('exposes biasId = reciprocity', () => {
    expect(BiasReciprocity.biasId).toBe('reciprocity');
  });

  it('renders gift label', async () => {
    await create({ gift: 'Bonus chapter' });
    const wrap = el.shadowRoot!.querySelector('.wrap')!;
    expect(wrap.textContent).toContain('Bonus chapter');
    expect(wrap.textContent).toContain("You're getting");
  });

  it('wrap has role="group" with aria-label', async () => {
    await create({ gift: 'Free shipping' });
    const wrap = el.shadowRoot!.querySelector('.wrap')!;
    expect(wrap.getAttribute('role')).toBe('group');
    expect(wrap.getAttribute('aria-label')).toContain('Free shipping');
  });

  it('default prominence is standard', async () => {
    await create({ gift: 'X' });
    expect(el.getAttribute('prominence')).toBe('standard');
  });

  it('reflects prominence="subtle"', async () => {
    await create({ gift: 'X', prominence: 'subtle' });
    expect(el.getAttribute('prominence')).toBe('subtle');
  });

  it('reflects prominence="hero"', async () => {
    await create({ gift: 'X', prominence: 'hero' });
    expect(el.getAttribute('prominence')).toBe('hero');
  });

  it('renders default slot for CTA children', async () => {
    el = document.createElement('bias-reciprocity') as BiasReciprocity;
    el.gift = 'Free trial';
    const btn = document.createElement('button');
    btn.textContent = 'Start';
    el.appendChild(btn);
    document.body.appendChild(el);
    await el.updateComplete;
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    const assigned = slot.assignedNodes({ flatten: true }).filter(n => n.nodeType === 1);
    expect(assigned.length).toBe(1);
    expect((assigned[0] as HTMLElement).tagName).toBe('BUTTON');
  });

  it('no gift pill when gift prop is empty', async () => {
    await create({ gift: '' });
    expect(el.shadowRoot!.querySelector('.gift')).toBeNull();
  });
});
