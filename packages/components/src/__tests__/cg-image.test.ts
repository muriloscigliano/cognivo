import { describe, it, expect, afterEach } from 'vitest';
import { CgImage } from '../components/cg-image/cg-image.js';

if (!customElements.get('cg-image')) {
  customElements.define('cg-image', CgImage);
}

describe('cg-image', () => {
  let el: CgImage;

  async function create(props?: Partial<CgImage>): Promise<CgImage> {
    el = document.createElement('cg-image') as CgImage;
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

  it('renders an img element', async () => {
    await create({ src: 'https://example.com/photo.jpg', alt: 'Test photo' });
    const img = el.shadowRoot!.querySelector('img');
    expect(img).not.toBeNull();
  });

  it('sets src attribute on img', async () => {
    await create({ src: 'https://example.com/photo.jpg' });
    const img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('src')).toBe('https://example.com/photo.jpg');
  });

  it('sets alt attribute on img', async () => {
    await create({ src: 'test.jpg', alt: 'A description' });
    const img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('alt')).toBe('A description');
  });

  it('lazy loading is enabled by default', async () => {
    await create({ src: 'test.jpg' });
    const img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('loading')).toBe('lazy');
  });

  it('eager loading when lazy is false', async () => {
    await create({ src: 'test.jpg', lazy: false });
    const img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('loading')).toBe('eager');
  });

  it('default fit is cover', async () => {
    await create();
    expect(el.fit).toBe('cover');
  });

  it('default rounded is lg', async () => {
    await create();
    expect(el.rounded).toBe('lg');
    expect(el.getAttribute('rounded')).toBe('lg');
  });

  it('ratio attribute reflects', async () => {
    await create({ ratio: '16:9' });
    expect(el.getAttribute('ratio')).toBe('16:9');
  });

  it('shows skeleton while loading', async () => {
    await create({ src: 'test.jpg' });
    const skeleton = el.shadowRoot!.querySelector('.skeleton');
    expect(skeleton).not.toBeNull();
  });
});
