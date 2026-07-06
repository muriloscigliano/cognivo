import { describe, it, expect, afterEach } from 'vitest';
import { AiTransformSlider } from '../components/ai-transform-slider/ai-transform-slider.js';

if (!customElements.get('ai-transform-slider')) {
  customElements.define('ai-transform-slider', AiTransformSlider);
}

async function mount(props: Partial<AiTransformSlider> = {}): Promise<AiTransformSlider> {
  const element = document.createElement('ai-transform-slider') as AiTransformSlider;
  Object.assign(element, { beforeSrc: '/a.jpg', afterSrc: '/b.jpg', ...props });
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-transform-slider', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-transform-slider').forEach((el) => el.remove());
  });

  it('renders SVG chevron paths in the correct namespace', async () => {
    const el = await mount();
    const paths = el.shadowRoot!.querySelectorAll('.handle svg path');
    expect(paths.length).toBe(2);
    paths.forEach((p) => expect(p.namespaceURI).toBe('http://www.w3.org/2000/svg'));
  });

  it('exposes aria-orientation matching the orientation prop', async () => {
    const el = await mount({ orientation: 'vertical' });
    const handle = el.shadowRoot!.querySelector('[role="slider"]')!;
    expect(handle.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('Home and End keys jump to the extremes', async () => {
    const el = await mount({ position: 50 });
    const handle = el.shadowRoot!.querySelector('[role="slider"]') as HTMLElement;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(el.position).toBe(100);
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(el.position).toBe(0);
  });

  it('arrow keys still nudge by the small step', async () => {
    const el = await mount({ position: 50, orientation: 'horizontal' });
    const handle = el.shadowRoot!.querySelector('[role="slider"]') as HTMLElement;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(el.position).toBe(52);
  });

  it('disabled slider ignores keyboard input and drops from tab order', async () => {
    const el = await mount({ position: 40, disabled: true });
    const handle = el.shadowRoot!.querySelector('[role="slider"]')!;
    expect(handle.getAttribute('tabindex')).toBe('-1');
    expect(handle.getAttribute('aria-disabled')).toBe('true');
    (handle as HTMLElement).dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(el.position).toBe(40);
  });
});
