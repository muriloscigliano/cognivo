import { describe, it, expect, afterEach } from 'vitest';
import { applyFloatingPosition } from '../utils/floating.js';

describe('applyFloatingPosition', () => {
  let reference: HTMLDivElement;
  let floating: HTMLDivElement;

  afterEach(() => {
    reference?.remove();
    floating?.remove();
  });

  function mockRect(el: HTMLElement, rect: { top: number; left: number; width: number; height: number }): void {
    el.getBoundingClientRect = (): DOMRect => ({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      bottom: rect.top + rect.height,
      right: rect.left + rect.width,
      x: rect.left,
      y: rect.top,
      toJSON() { return this; },
    }) as DOMRect;
  }

  it('applies top/left styles from the computed position', () => {
    reference = document.createElement('div');
    floating = document.createElement('div');
    document.body.appendChild(reference);
    document.body.appendChild(floating);

    mockRect(reference, { top: 100, left: 50, width: 80, height: 20 });
    mockRect(floating, { top: 0, left: 0, width: 120, height: 40 });

    const result = applyFloatingPosition(reference, floating, {
      placement: 'bottom-start',
      offset: 4,
      flip: false,
      shift: false,
    });

    // bottom-start → y = ref.top + ref.height + offset = 124, x = ref.left = 50
    expect(result.y).toBe(124);
    expect(result.x).toBe(50);
    expect(floating.style.top).toBe('124px');
    expect(floating.style.left).toBe('50px');
    expect(result.placement).toBe('bottom-start');
  });

  it('returns the (possibly flipped) final placement', () => {
    reference = document.createElement('div');
    floating = document.createElement('div');
    document.body.appendChild(reference);
    document.body.appendChild(floating);

    // Reference near the bottom of the viewport — bottom placement should flip to top.
    mockRect(reference, { top: window.innerHeight - 20, left: 100, width: 80, height: 20 });
    mockRect(floating, { top: 0, left: 0, width: 100, height: 200 });

    const result = applyFloatingPosition(reference, floating, {
      placement: 'bottom',
      offset: 8,
      flip: true,
      shift: true,
    });

    expect(result.placement).toBe('top');
    expect(floating.style.top).toBe(`${result.y}px`);
    expect(floating.style.left).toBe(`${result.x}px`);
  });
});
