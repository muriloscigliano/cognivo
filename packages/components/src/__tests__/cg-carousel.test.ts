import { describe, it, expect, afterEach } from 'vitest';
import { CgCarousel } from '../components/cg-carousel/cg-carousel.js';

if (!customElements.get('cg-carousel')) {
  customElements.define('cg-carousel', CgCarousel);
}

describe('cg-carousel', () => {
  let el: CgCarousel;

  async function create(props?: Partial<CgCarousel>): Promise<CgCarousel> {
    el = document.createElement('cg-carousel') as CgCarousel;
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

  it('has a scrollable track', async () => {
    await create();
    const track = el.shadowRoot!.querySelector('.track');
    expect(track).not.toBeNull();
  });

  it('renders a slot for content', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).not.toBeNull();
  });

  it('showDots defaults to true', async () => {
    await create();
    expect(el.showDots).toBe(true);
  });

  it('showArrows defaults to true', async () => {
    await create();
    expect(el.showArrows).toBe(true);
  });

  it('has carousel ARIA role', async () => {
    await create();
    const region = el.shadowRoot!.querySelector('[aria-roledescription="carousel"]');
    expect(region).not.toBeNull();
  });

  it('has keyboard handler on track wrapper', async () => {
    await create();
    const wrapper = el.shadowRoot!.querySelector('.track-wrapper');
    expect(wrapper).not.toBeNull();
    expect(wrapper!.getAttribute('tabindex')).toBe('0');
  });

  it('scroll-snap style exists on track', () => {
    const styles = CgCarousel.styles;
    const cssText = Array.isArray(styles)
      ? styles.map(s => s.cssText).join('')
      : (styles as { cssText: string }).cssText;
    expect(cssText).toContain('scroll-snap-type');
  });
});
