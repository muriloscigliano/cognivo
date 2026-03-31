import { describe, it, expect, afterEach } from 'vitest';
import '../index.js';

async function createElement(tag: string, props?: Record<string, unknown>): Promise<HTMLElement> {
  const el = document.createElement(tag);
  if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
  document.body.appendChild(el);
  if ('updateComplete' in el) await (el as any).updateComplete;
  return el;
}

describe('cg-slider', () => {
  let el: HTMLElement;

  afterEach(() => {
    el?.remove();
  });

  it('renders with shadow DOM', async () => {
    el = await createElement('cg-slider');
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot).not.toBeNull();
  });

  it('has default value=50, min=0, max=100', async () => {
    el = await createElement('cg-slider');
    expect((el as any).value).toBe(50);
    expect((el as any).min).toBe(0);
    expect((el as any).max).toBe(100);

    const input = el.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input.value).toBe('50');
    expect(input.min).toBe('0');
    expect(input.max).toBe('100');
  });

  it('dispatches cg-change on input', async () => {
    el = await createElement('cg-slider', { value: 50 });
    let detail: unknown = null;
    el.addEventListener('cg-change', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    const input = el.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    input.value = '75';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect(detail).not.toBeNull();
    expect((detail as { value: number }).value).toBe(75);
  });

  it('renders label text', async () => {
    el = await createElement('cg-slider', { label: 'Volume' });
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toBe('Volume');
  });

  it('renders value display by default', async () => {
    el = await createElement('cg-slider', { value: 42 });
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display).not.toBeNull();
    expect(display!.textContent).toBe('42');
  });

  it('hides value display when showValue=false', async () => {
    el = await createElement('cg-slider', { showValue: false, label: '' });
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display).toBeNull();
  });

  it('renders value display with unit', async () => {
    el = await createElement('cg-slider', { value: 80, unit: '%' });
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display).not.toBeNull();
    expect(display!.textContent).toBe('80%');
  });

  it('disabled prevents interaction', async () => {
    el = await createElement('cg-slider', { disabled: true });
    const input = el.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('defaults to size="md"', async () => {
    el = await createElement('cg-slider');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('reflects size="sm"', async () => {
    el = await createElement('cg-slider', { size: 'sm' });
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('reflects size="lg"', async () => {
    el = await createElement('cg-slider', { size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('shows min/max labels when showRange=true', async () => {
    el = await createElement('cg-slider', { showRange: true, min: 0, max: 100 });
    const labels = el.shadowRoot!.querySelectorAll('.range-label');
    expect(labels.length).toBe(2);
    expect(labels[0]!.textContent).toBe('0');
    expect(labels[1]!.textContent).toBe('100');
  });

  it('hides min/max labels when showRange=false', async () => {
    el = await createElement('cg-slider', { showRange: false });
    const labels = el.shadowRoot!.querySelectorAll('.range-label');
    expect(labels.length).toBe(0);
  });

  it('step property works', async () => {
    el = await createElement('cg-slider', { step: 5 });
    const input = el.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input.step).toBe('5');
  });

  it('name attribute set on native input', async () => {
    el = await createElement('cg-slider', { name: 'brightness' });
    const input = el.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input.getAttribute('name')).toBe('brightness');
  });

  it('updates value display when value changes', async () => {
    el = await createElement('cg-slider', { value: 30 });
    expect(el.shadowRoot!.querySelector('.value-display')!.textContent).toBe('30');

    (el as any).value = 70;
    await (el as any).updateComplete;
    expect(el.shadowRoot!.querySelector('.value-display')!.textContent).toBe('70');
  });

  it('shows min/max labels with unit', async () => {
    el = await createElement('cg-slider', { showRange: true, min: 0, max: 100, unit: 'px' });
    const labels = el.shadowRoot!.querySelectorAll('.range-label');
    expect(labels[0]!.textContent).toBe('0px');
    expect(labels[1]!.textContent).toBe('100px');
  });
});
