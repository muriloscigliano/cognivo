import { describe, it, expect, afterEach } from 'vitest';
import { CgVisuallyHidden } from '../components/cg-visually-hidden/cg-visually-hidden.js';

if (!customElements.get('cg-visually-hidden')) {
  customElements.define('cg-visually-hidden', CgVisuallyHidden);
}

describe('cg-visually-hidden', () => {
  let el: CgVisuallyHidden;

  async function create(): Promise<CgVisuallyHidden> {
    el = document.createElement('cg-visually-hidden') as CgVisuallyHidden;
    el.textContent = 'hidden label';
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.sr-only')).not.toBeNull();
  });

  it('contains a slot for children', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('applies clip styles', async () => {
    await create();
    const span = el.shadowRoot!.querySelector<HTMLElement>('.sr-only')!;
    const styles = getComputedStyle(span);
    expect(styles.position).toBe('absolute');
  });

  it('renders children via light DOM', async () => {
    await create();
    expect(el.textContent).toBe('hidden label');
  });
});
