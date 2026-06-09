import { describe, it, expect, afterEach } from 'vitest';
import { CgHoverCard } from '../components/cg-hover-card/cg-hover-card.js';

if (!customElements.get('cg-hover-card')) {
  customElements.define('cg-hover-card', CgHoverCard);
}

describe('cg-hover-card', () => {
  let el: CgHoverCard;

  async function create(props?: Partial<CgHoverCard>): Promise<CgHoverCard> {
    el = document.createElement('cg-hover-card') as CgHoverCard;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.card')).not.toBeNull();
  });

  it('is closed by default', async () => {
    await create();
    expect(el.open).toBe(false);
  });

  it('reflects open attribute', async () => {
    await create({ open: true });
    expect(el.hasAttribute('open')).toBe(true);
  });

  it('default placement is top', async () => {
    await create();
    expect(el.placement).toBe('top');
  });

  it('default openDelay is 700', async () => {
    await create();
    expect(el.openDelay).toBe(700);
  });

  it('dispatches cg-hover-card-open on open', async () => {
    await create();
    let fired = false;
    el.addEventListener('cg-hover-card-open', () => { fired = true; });
    el.open = true;
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('dispatches cg-hover-card-close on close', async () => {
    await create({ open: true });
    let fired = false;
    el.addEventListener('cg-hover-card-close', () => { fired = true; });
    el.open = false;
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('card has role="dialog" (rich interactive content, not a tooltip)', async () => {
    await create();
    const card = el.shadowRoot!.querySelector('.card')!;
    expect(card.getAttribute('role')).toBe('dialog');
    expect(card.getAttribute('aria-modal')).toBe('false');
  });

  it('closes on Escape', async () => {
    await create();
    el.open = true;
    await el.updateComplete;
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('renders content slot', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot[name="content"]');
    expect(slot).not.toBeNull();
  });

  it('renders trigger element', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('.trigger')).not.toBeNull();
  });
});
