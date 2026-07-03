import { describe, it, expect, afterEach, vi } from 'vitest';
import { CgLightbox } from '../components/cg-lightbox/cg-lightbox.js';

if (!customElements.get('cg-lightbox')) {
  customElements.define('cg-lightbox', CgLightbox);
}

const IMAGES = [
  { src: '/a.jpg', alt: 'A', caption: 'First' },
  { src: '/b.jpg', alt: 'B', caption: 'Second' },
  { src: '/c.jpg', alt: 'C' },
];

describe('cg-lightbox', () => {
  let el: CgLightbox;

  async function create(props?: Partial<CgLightbox>): Promise<CgLightbox> {
    el = document.createElement('cg-lightbox') as CgLightbox;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => {
    el?.remove();
    document.body.style.overflow = '';
  });

  it('renders nothing when closed', async () => {
    await create({ images: IMAGES });
    expect(el.shadowRoot!.querySelector('.backdrop')).toBeNull();
  });

  it('renders a dialog when open', async () => {
    await create({ images: IMAGES, open: true });
    const dialog = el.shadowRoot!.querySelector('[role="dialog"]')!;
    expect(dialog).not.toBeNull();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('shows the current image', async () => {
    await create({ images: IMAGES, open: true, index: 1 });
    const img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('src')).toBe('/b.jpg');
    expect(img.getAttribute('alt')).toBe('B');
  });

  it('locks body scroll while open', async () => {
    await create({ images: IMAGES, open: true });
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores scroll on close', async () => {
    await create({ images: IMAGES, open: true });
    el.open = false;
    await el.updateComplete;
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('ArrowRight advances and wraps, firing change', async () => {
    await create({ images: IMAGES, open: true, index: 2 });
    const spy = vi.fn();
    el.addEventListener('cg-lightbox-change', spy);
    el.shadowRoot!.querySelector('.backdrop')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(el.index).toBe(0);
    expect(spy).toHaveBeenCalledOnce();
  });

  it('hides nav buttons for a single image', async () => {
    await create({ images: [IMAGES[0]], open: true });
    expect(el.shadowRoot!.querySelector('.nav')).toBeNull();
  });

  it('clamps index to range', async () => {
    await create({ images: IMAGES, open: true, index: 99 });
    expect(el.index).toBe(2);
  });

  it('emits close when the close button is clicked', async () => {
    await create({ images: IMAGES, open: true });
    const spy = vi.fn();
    el.addEventListener('cg-lightbox-close', spy);
    (el.shadowRoot!.querySelector('.close') as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.open).toBe(false);
    expect(spy).toHaveBeenCalledOnce();
  });
});
