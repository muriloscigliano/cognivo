import { describe, it, expect, afterEach } from 'vitest';
import { CgRating } from '../components/cg-rating/cg-rating.js';

if (!customElements.get('cg-rating')) {
  customElements.define('cg-rating', CgRating);
}

describe('cg-rating', () => {
  let el: CgRating;

  async function create(props?: Partial<CgRating>): Promise<CgRating> {
    el = document.createElement('cg-rating') as CgRating;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.rating')).not.toBeNull();
  });

  it('default max is 5', async () => {
    await create();
    expect(el.max).toBe(5);
  });

  it('renders max stars', async () => {
    await create({ max: 5 });
    const stars = el.shadowRoot!.querySelectorAll('.star');
    expect(stars.length).toBe(5);
  });

  it('rating has role="radiogroup"', async () => {
    await create();
    const r = el.shadowRoot!.querySelector('.rating')!;
    expect(r.getAttribute('role')).toBe('radiogroup');
  });

  it('fills stars up to value', async () => {
    await create({ value: 3 });
    const stars = el.shadowRoot!.querySelectorAll('.star');
    expect(stars[0]!.getAttribute('data-filled')).toBe('full');
    expect(stars[2]!.getAttribute('data-filled')).toBe('full');
    expect(stars[3]!.getAttribute('data-filled')).toBe('empty');
  });

  it('ArrowRight increments value', async () => {
    await create({ value: 2 });
    const r = el.shadowRoot!.querySelector('.rating') as HTMLElement;
    r.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(el.value).toBe(3);
  });

  it('ArrowLeft decrements value', async () => {
    await create({ value: 2 });
    const r = el.shadowRoot!.querySelector('.rating') as HTMLElement;
    r.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await el.updateComplete;
    expect(el.value).toBe(1);
  });

  it('dispatches cg-rating-change on keyboard change', async () => {
    await create({ value: 1 });
    let detail: any = null;
    el.addEventListener('cg-rating-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const r = el.shadowRoot!.querySelector('.rating') as HTMLElement;
    r.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(detail.value).toBe(2);
  });

  it('readonly reflects to attribute', async () => {
    await create({ readonly: true });
    expect(el.hasAttribute('readonly')).toBe(true);
  });

  it('size reflects to attribute', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('is form-associated', () => {
    expect((CgRating as any).formAssociated).toBe(true);
  });
});
