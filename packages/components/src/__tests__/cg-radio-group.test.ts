import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CgRadioGroup } from '../components/cg-radio-group/cg-radio-group.js';
import { CgRadio } from '../components/cg-radio/cg-radio.js';

// Register custom elements if not already registered
if (!customElements.get('cg-radio')) {
  customElements.define('cg-radio', CgRadio);
}
if (!customElements.get('cg-radio-group')) {
  customElements.define('cg-radio-group', CgRadioGroup);
}

/**
 * Helper: create a radio group with child radios and wait for rendering.
 */
async function createRadioGroup(options: {
  name?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  radios: Array<{ label: string; value: string; disabled?: boolean }>;
}): Promise<CgRadioGroup> {
  const group = document.createElement('cg-radio-group') as CgRadioGroup;
  if (options.name) group.name = options.name;
  if (options.value) group.value = options.value;
  if (options.label) group.label = options.label;
  if (options.disabled) group.disabled = true;
  if (options.orientation) group.orientation = options.orientation;

  for (const opt of options.radios) {
    const radio = document.createElement('cg-radio') as CgRadio;
    radio.label = opt.label;
    radio.value = opt.value;
    if (opt.disabled) radio.disabled = true;
    group.appendChild(radio);
  }

  document.body.appendChild(group);
  await group.updateComplete;

  // Wait a tick for slotchange to fire and sync radios
  await new Promise(r => setTimeout(r, 0));
  await group.updateComplete;

  return group;
}

describe('cg-radio-group', () => {
  let el: CgRadioGroup;

  afterEach(() => {
    if (el && el.parentNode) el.remove();
  });

  it('creates and renders with shadow DOM', async () => {
    el = await createRadioGroup({
      name: 'color',
      label: 'Pick a color',
      radios: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
      ],
    });

    expect(el).toBeDefined();
    expect(el.shadowRoot).toBeDefined();
  });

  it('has role="radiogroup" with aria-label', async () => {
    el = await createRadioGroup({
      name: 'color',
      label: 'Pick a color',
      radios: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
      ],
    });

    const groupDiv = el.shadowRoot!.querySelector('.group');
    expect(groupDiv!.getAttribute('role')).toBe('radiogroup');
    expect(groupDiv!.getAttribute('aria-label')).toBe('Pick a color');
  });

  it('syncs name to child cg-radio elements', async () => {
    el = await createRadioGroup({
      name: 'fruit',
      radios: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ],
    });

    const radios = el.querySelectorAll('cg-radio');
    for (const radio of radios) {
      expect((radio as CgRadio).name).toBe('fruit');
    }
  });

  it('selects radio matching value prop', async () => {
    el = await createRadioGroup({
      name: 'color',
      value: 'blue',
      radios: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ],
    });

    const radios = el.querySelectorAll('cg-radio');
    expect((radios[0] as CgRadio).checked).toBe(false);
    expect((radios[1] as CgRadio).checked).toBe(true);
    expect((radios[2] as CgRadio).checked).toBe(false);
  });

  it('Arrow Down selects next radio', async () => {
    el = await createRadioGroup({
      name: 'color',
      value: 'red',
      label: 'Pick a color',
      radios: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ],
    });

    const groupDiv = el.shadowRoot!.querySelector('.group') as HTMLElement;
    groupDiv.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('blue');
    const radios = el.querySelectorAll('cg-radio');
    expect((radios[1] as CgRadio).checked).toBe(true);
  });

  it('Arrow Up selects previous radio', async () => {
    el = await createRadioGroup({
      name: 'color',
      value: 'blue',
      label: 'Pick a color',
      radios: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ],
    });

    const groupDiv = el.shadowRoot!.querySelector('.group') as HTMLElement;
    groupDiv.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('red');
  });

  it('wraps around at boundaries (ArrowDown on last goes to first)', async () => {
    el = await createRadioGroup({
      name: 'color',
      value: 'green',
      label: 'Pick a color',
      radios: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ],
    });

    const groupDiv = el.shadowRoot!.querySelector('.group') as HTMLElement;
    groupDiv.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('red');
  });

  it('wraps around at boundaries (ArrowUp on first goes to last)', async () => {
    el = await createRadioGroup({
      name: 'color',
      value: 'red',
      label: 'Pick a color',
      radios: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ],
    });

    const groupDiv = el.shadowRoot!.querySelector('.group') as HTMLElement;
    groupDiv.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('green');
  });

  it('dispatches cg-change with {value} on keyboard selection', async () => {
    el = await createRadioGroup({
      name: 'color',
      value: 'red',
      label: 'Pick a color',
      radios: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
      ],
    });

    let eventDetail: unknown = null;
    el.addEventListener('cg-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const groupDiv = el.shadowRoot!.querySelector('.group') as HTMLElement;
    groupDiv.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    expect(eventDetail).not.toBeNull();
    expect((eventDetail as { value: string }).value).toBe('blue');
  });

  it('disabled group disables all children', async () => {
    el = await createRadioGroup({
      name: 'color',
      disabled: true,
      radios: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
      ],
    });

    const radios = el.querySelectorAll('cg-radio');
    for (const radio of radios) {
      expect((radio as CgRadio).disabled).toBe(true);
    }
  });

  it('horizontal orientation applies correct layout attribute', async () => {
    el = await createRadioGroup({
      name: 'color',
      orientation: 'horizontal',
      radios: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
      ],
    });

    expect(el.getAttribute('orientation')).toBe('horizontal');
  });
});
