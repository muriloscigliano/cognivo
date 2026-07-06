import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiDetectionCanvas } from '../components/ai-detection-canvas/ai-detection-canvas.js';
import type { Detection } from '../components/ai-detection-canvas/ai-detection-canvas.js';

if (!customElements.get('ai-detection-canvas')) {
  customElements.define('ai-detection-canvas', AiDetectionCanvas);
}

const detections: Detection[] = [
  { id: 'd1', label: 'cat', confidence: 0.92, bbox: [0, 0, 50, 50] },
];

// The bbox divs only render once the image reports natural dimensions.
function primeImage(el: AiDetectionCanvas) {
  const img = el.shadowRoot!.querySelector('img') as HTMLImageElement;
  Object.defineProperty(img, 'naturalWidth', { value: 100, configurable: true });
  Object.defineProperty(img, 'naturalHeight', { value: 100, configurable: true });
  img.dispatchEvent(new Event('load'));
}

describe('ai-detection-canvas', () => {
  let el: AiDetectionCanvas;

  beforeEach(async () => {
    el = document.createElement('ai-detection-canvas') as AiDetectionCanvas;
    el.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
    el.detections = detections;
    document.body.appendChild(el);
    await el.updateComplete;
    primeImage(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('exposes role=button on boxes only when interactive', async () => {
    let box = el.shadowRoot!.querySelector('.bbox')!;
    expect(box.getAttribute('role')).toBe('button');

    el.interactive = false;
    await el.updateComplete;
    box = el.shadowRoot!.querySelector('.bbox')!;
    expect(box.getAttribute('role')).toBeNull();
    expect(box.getAttribute('tabindex')).toBe('-1');
    // aria-label is retained so the detection is still described.
    expect(box.getAttribute('aria-label')).toContain('cat');
  });

  it('shows the confidence tooltip on keyboard focus, not just hover', async () => {
    const box = el.shadowRoot!.querySelector('.bbox') as HTMLElement;
    expect(el.shadowRoot!.querySelector('.tooltip')).toBeNull();
    box.dispatchEvent(new FocusEvent('focus'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.tooltip')).not.toBeNull();

    box.dispatchEvent(new FocusEvent('blur'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.tooltip')).toBeNull();
  });

  it('uses a caller-supplied imageAlt, defaulting to a meaningful description', async () => {
    let img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('alt')).toBe('Image with object detections');

    el.imageAlt = 'A cat on a sofa';
    await el.updateComplete;
    img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('alt')).toBe('A cat on a sofa');
  });
});
