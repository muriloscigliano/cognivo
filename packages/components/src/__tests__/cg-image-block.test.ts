import { describe, it, expect, afterEach } from 'vitest';
import { CgImageBlock } from '../components/cg-image-block/cg-image-block.js';

if (!customElements.get('cg-image-block')) {
  customElements.define('cg-image-block', CgImageBlock);
}

describe('cg-image-block', () => {
  let el: CgImageBlock;

  async function create(props?: Partial<CgImageBlock>): Promise<CgImageBlock> {
    el = document.createElement('cg-image-block') as CgImageBlock;
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

  it('renders a figure element', async () => {
    await create({ src: 'test.jpg' });
    const figure = el.shadowRoot!.querySelector('figure');
    expect(figure).not.toBeNull();
  });

  it('renders img with src', async () => {
    await create({ src: 'https://example.com/img.jpg' });
    const img = el.shadowRoot!.querySelector('img');
    expect(img).not.toBeNull();
    expect(img!.getAttribute('src')).toBe('https://example.com/img.jpg');
  });

  it('sets alt on img', async () => {
    await create({ src: 'test.jpg', alt: 'Photo description' });
    const img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('alt')).toBe('Photo description');
  });

  it('displays caption in figcaption', async () => {
    await create({ src: 'test.jpg', caption: 'A beautiful scene' });
    const figcaption = el.shadowRoot!.querySelector('figcaption');
    expect(figcaption).not.toBeNull();
    expect(figcaption!.textContent).toContain('A beautiful scene');
  });

  it('hides figcaption when no caption or source', async () => {
    await create({ src: 'test.jpg' });
    const figcaption = el.shadowRoot!.querySelector('figcaption');
    expect(figcaption).toBeNull();
  });

  it('displays source attribution', async () => {
    await create({ src: 'test.jpg', caption: 'Photo', source: 'Unsplash', sourceUrl: 'https://unsplash.com' });
    const sourceLink = el.shadowRoot!.querySelector('.source');
    expect(sourceLink).not.toBeNull();
    expect(sourceLink!.textContent).toBe('Unsplash');
  });

  it('ratio attribute reflects', async () => {
    await create({ ratio: '16:9' });
    expect(el.getAttribute('ratio')).toBe('16:9');
  });

  it('clickable attribute reflects', async () => {
    await create({ clickable: true });
    expect(el.hasAttribute('clickable')).toBe(true);
  });

  it('default rounded is lg', async () => {
    await create();
    expect(el.rounded).toBe('lg');
    expect(el.getAttribute('rounded')).toBe('lg');
  });
});
