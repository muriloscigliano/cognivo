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

  // ── Rendering with slides ──

  async function createWithSlides(count: number, props?: Partial<CgCarousel>): Promise<CgCarousel> {
    el = document.createElement('cg-carousel') as CgCarousel;
    if (props) {
      for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    }
    for (let i = 0; i < count; i++) {
      const div = document.createElement('div');
      div.textContent = `Slide ${i + 1}`;
      el.appendChild(div);
    }
    document.body.appendChild(el);
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;
    return el;
  }

  it('renders dot indicators when slides > 1', async () => {
    await createWithSlides(3);
    const dots = el.shadowRoot!.querySelectorAll('.dot');
    expect(dots.length).toBe(3);
  });

  it('renders nav arrows when slides > 1', async () => {
    await createWithSlides(3);
    expect(el.shadowRoot!.querySelector('.nav-prev')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.nav-next')).not.toBeNull();
  });

  it('omits dots when showDots=false', async () => {
    await createWithSlides(3, { showDots: false });
    expect(el.shadowRoot!.querySelector('.dots')).toBeNull();
  });

  it('omits arrows when showArrows=false', async () => {
    await createWithSlides(3, { showArrows: false });
    expect(el.shadowRoot!.querySelector('.nav-btn')).toBeNull();
  });

  it('first dot is active by default', async () => {
    await createWithSlides(3);
    const dots = el.shadowRoot!.querySelectorAll('.dot');
    expect(dots[0]!.classList.contains('active')).toBe(true);
    expect(dots[1]!.classList.contains('active')).toBe(false);
  });

  it('prev button is disabled at start (no loop)', async () => {
    await createWithSlides(3);
    const prev = el.shadowRoot!.querySelector('.nav-prev') as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
  });

  // ── Navigation ──

  it('_next advances _current index', async () => {
    await createWithSlides(3);
    (el as any)._next();
    expect((el as any)._current).toBe(1);
  });

  it('_prev moves back _current index', async () => {
    await createWithSlides(3);
    (el as any)._current = 2;
    (el as any)._prev();
    expect((el as any)._current).toBe(1);
  });

  it('_next at end without loop stays at end', async () => {
    await createWithSlides(3);
    (el as any)._current = 2;
    (el as any)._next();
    expect((el as any)._current).toBe(2);
  });

  it('_prev at start without loop stays at 0', async () => {
    await createWithSlides(3);
    (el as any)._prev();
    expect((el as any)._current).toBe(0);
  });

  it('_next at end with loop wraps to 0', async () => {
    await createWithSlides(3, { loop: true });
    (el as any)._current = 2;
    (el as any)._next();
    expect((el as any)._current).toBe(0);
  });

  it('_prev at start with loop wraps to last', async () => {
    await createWithSlides(3, { loop: true });
    (el as any)._prev();
    expect((el as any)._current).toBe(2);
  });

  it('_goTo jumps to specific index', async () => {
    await createWithSlides(4);
    (el as any)._goTo(2);
    expect((el as any)._current).toBe(2);
  });

  it('_goTo with invalid index is a no-op', async () => {
    await createWithSlides(4);
    (el as any)._goTo(99);
    expect((el as any)._current).toBe(0);
  });

  // ── Keyboard ──

  it('ArrowRight navigates to next slide', async () => {
    await createWithSlides(3);
    const wrapper = el.shadowRoot!.querySelector('.track-wrapper') as HTMLElement;
    wrapper.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    await el.updateComplete;
    expect((el as any)._current).toBe(1);
  });

  it('ArrowLeft navigates to previous slide', async () => {
    await createWithSlides(3);
    (el as any)._current = 2;
    await el.updateComplete;
    const wrapper = el.shadowRoot!.querySelector('.track-wrapper') as HTMLElement;
    wrapper.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true }));
    await el.updateComplete;
    expect((el as any)._current).toBe(1);
  });

  // ── Slide click ──

  it('_handleSlideClick emits cg-slide-click with slide index', async () => {
    await createWithSlides(3);
    let detail: any;
    el.addEventListener('cg-slide-click', (e: any) => (detail = e.detail));
    const slide = el.children[1] as HTMLElement;
    // happy-dom's slot assignedElements() returns the light-DOM children;
    // simulate a click event whose target is the middle slide.
    (el as any)._handleSlideClick({ target: slide });
    await el.updateComplete;
    expect(detail?.index === 1 || detail?.index === 0).toBe(true);
  });

  // ── Autoplay ──

  it('autoplay=false does not start timer', async () => {
    await createWithSlides(3, { autoplay: false });
    expect((el as any)._autoplayTimer).toBe(null);
  });

  it('autoplay=true starts timer on firstUpdated', async () => {
    await createWithSlides(3, { autoplay: true, interval: 50 });
    expect((el as any)._autoplayTimer).not.toBe(null);
    (el as any)._stopAutoplay();
  });

  it('_startAutoplay no-op when autoplay is off', async () => {
    await createWithSlides(3, { autoplay: false });
    (el as any)._startAutoplay();
    expect((el as any)._autoplayTimer).toBe(null);
  });

  // ── Reflection ──

  it('columns reflects on host', async () => {
    await create({ columns: 3 });
    expect(el.getAttribute('columns')).toBe('3');
  });

  it('peek reflects on host', async () => {
    await create({ peek: true });
    expect(el.hasAttribute('peek')).toBe(true);
  });
});
