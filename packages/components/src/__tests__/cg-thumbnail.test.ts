import { describe, it, expect, afterEach, vi } from 'vitest';
import { CgThumbnail } from '../components/cg-thumbnail/cg-thumbnail.js';

if (!customElements.get('cg-thumbnail')) {
  customElements.define('cg-thumbnail', CgThumbnail);
}

describe('cg-thumbnail', () => {
  let el: CgThumbnail;

  async function create(props?: Partial<CgThumbnail>): Promise<CgThumbnail> {
    el = document.createElement('cg-thumbnail') as CgThumbnail;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders an img when src is set', async () => {
    await create({ src: '/x.jpg', alt: 'X' });
    const img = el.shadowRoot!.querySelector('img')!;
    expect(img).not.toBeNull();
    expect(img.getAttribute('alt')).toBe('X');
  });

  it('renders a placeholder when no src', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('.placeholder')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('img')).toBeNull();
  });

  it('is a static span when not selectable', async () => {
    await create({ src: '/x.jpg' });
    expect(el.shadowRoot!.querySelector('button')).toBeNull();
    expect(el.shadowRoot!.querySelector('span.tile')).not.toBeNull();
  });

  it('renders a checkbox button when selectable', async () => {
    await create({ selectable: true, alt: 'Pick me' });
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('role')).toBe('checkbox');
    expect(btn.getAttribute('aria-checked')).toBe('false');
    expect(btn.getAttribute('aria-label')).toBe('Pick me');
  });

  it('toggles selected and fires event on click', async () => {
    await create({ selectable: true });
    const spy = vi.fn();
    el.addEventListener('cg-thumbnail-select', spy);
    el.shadowRoot!.querySelector('button')!.click();
    await el.updateComplete;
    expect(el.selected).toBe(true);
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0][0] as CustomEvent).detail.selected).toBe(true);
  });

  it('does not toggle when disabled', async () => {
    await create({ selectable: true, disabled: true });
    el.shadowRoot!.querySelector('button')!.click();
    await el.updateComplete;
    expect(el.selected).toBe(false);
  });

  it('reflects size and rounded', async () => {
    await create({ size: 'lg', rounded: 'full' });
    expect(el.getAttribute('size')).toBe('lg');
    expect(el.getAttribute('rounded')).toBe('full');
  });
});
