import { describe, it, expect, afterEach } from 'vitest';
import { CgImageGallery, type GalleryImage } from '../components/cg-image-gallery/cg-image-gallery.js';

if (!customElements.get('cg-image-gallery')) {
  customElements.define('cg-image-gallery', CgImageGallery);
}

const sampleImages: GalleryImage[] = [
  { src: 'img1.jpg', alt: 'Image 1' },
  { src: 'img2.jpg', alt: 'Image 2' },
  { src: 'img3.jpg', alt: 'Image 3' },
  { src: 'img4.jpg', alt: 'Image 4' },
  { src: 'img5.jpg', alt: 'Image 5' },
  { src: 'img6.jpg', alt: 'Image 6' },
  { src: 'img7.jpg', alt: 'Image 7' },
];

describe('cg-image-gallery', () => {
  let el: CgImageGallery;

  async function create(props?: Partial<CgImageGallery>): Promise<CgImageGallery> {
    el = document.createElement('cg-image-gallery') as CgImageGallery;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        (el as any)[k] = v;
      }
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
  });

  it('renders images from array', async () => {
    await create({ images: sampleImages });
    const imgs = el.shadowRoot!.querySelectorAll('img');
    // Default maxVisible is 5
    expect(imgs.length).toBe(5);
  });

  it('accepts images array', async () => {
    await create({ images: sampleImages });
    expect(el.images).toHaveLength(7);
  });

  it('respects maxVisible prop', async () => {
    await create({ images: sampleImages, maxVisible: 3 });
    const imgs = el.shadowRoot!.querySelectorAll('img');
    expect(imgs.length).toBe(3);
  });

  it('shows overflow badge when images exceed maxVisible', async () => {
    await create({ images: sampleImages, maxVisible: 4 });
    const badge = el.shadowRoot!.querySelector('.overflow-badge');
    expect(badge).not.toBeNull();
    expect(badge!.textContent).toContain('+3');
  });

  it('does not show overflow when all images fit', async () => {
    await create({ images: sampleImages.slice(0, 3), maxVisible: 5 });
    const badge = el.shadowRoot!.querySelector('.overflow-badge');
    expect(badge).toBeNull();
  });

  it('renders grid container', async () => {
    await create({ images: sampleImages.slice(0, 2) });
    const grid = el.shadowRoot!.querySelector('.grid');
    expect(grid).not.toBeNull();
    expect(grid!.classList.contains('count-2')).toBe(true);
  });

  it('applies count-1 class for single image', async () => {
    await create({ images: sampleImages.slice(0, 1) });
    const grid = el.shadowRoot!.querySelector('.grid');
    expect(grid!.classList.contains('count-1')).toBe(true);
  });

  it('default rounded is lg', async () => {
    await create();
    expect(el.rounded).toBe('lg');
    expect(el.getAttribute('rounded')).toBe('lg');
  });

  it('images use lazy loading', async () => {
    await create({ images: sampleImages.slice(0, 2) });
    const imgs = el.shadowRoot!.querySelectorAll('img');
    imgs.forEach(img => {
      expect(img.getAttribute('loading')).toBe('lazy');
    });
  });
});
